import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { promisify } from "node:util";
import { brotliCompress, constants as zlibConstants } from "node:zlib";

import { chromium } from "@playwright/test";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

import {
  failIfErrors,
  repositoryRoot,
  writeEvidence,
} from "./lib/validation.mjs";

const localPortRaw = process.env.LIGHTHOUSE_PORT;
const localPort = localPortRaw == null ? 3100 : Number(localPortRaw);
if (!Number.isInteger(localPort) || localPort < 1 || localPort > 65_535) {
  throw new Error("LIGHTHOUSE_PORT must be an integer from 1 to 65535.");
}
const localBaseUrl = `http://127.0.0.1:${localPort}`;
const buildDirectory = path.join(repositoryRoot, "build");
const routes = ["/", "/modulix/overview/", "/security/"];
const thresholds = {
  performance: 0.9,
  accessibility: 0.95,
  "best-practices": 0.95,
  seo: 0.95,
};
const diagnosticAuditIds = [
  "largest-contentful-paint-element",
  "lcp-discovery",
  "render-blocking-resources",
  "unused-javascript",
];
const compressBrotli = promisify(brotliCompress);
const compressedContentTypes = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".txt",
  ".xml",
]);
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function summarizeNode(node) {
  if (!node || typeof node !== "object") {
    return undefined;
  }
  return {
    selector: node.selector,
    snippet: node.snippet,
    nodeLabel: node.nodeLabel,
    explanation: node.explanation,
  };
}

function summarizeDetails(details) {
  if (!Array.isArray(details?.items)) {
    return undefined;
  }
  return details.items.slice(0, 10).map((item) => ({
    url: item.url,
    wastedMs: item.wastedMs,
    wastedBytes: item.wastedBytes,
    totalBytes: item.totalBytes,
    node: summarizeNode(item.node),
    items: Array.isArray(item.items)
      ? item.items.slice(0, 10).map((nestedItem) => ({
          url: nestedItem.url,
          wastedMs: nestedItem.wastedMs,
          wastedBytes: nestedItem.wastedBytes,
          totalBytes: nestedItem.totalBytes,
          node: summarizeNode(nestedItem.node),
        }))
      : undefined,
  }));
}

function summarizeAudit(audit) {
  if (!audit) {
    return undefined;
  }
  return {
    score: audit.score,
    displayValue: audit.displayValue,
    numericValue: audit.numericValue,
    details: summarizeDetails(audit.details),
  };
}

function resolveBuildFile(requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestUrl, localBaseUrl).pathname);
  } catch {
    return undefined;
  }
  let relativePath = pathname.replace(/^\/+/, "");
  if (relativePath.length === 0 || relativePath.endsWith("/")) {
    relativePath += "index.html";
  }
  const filePath = path.resolve(buildDirectory, relativePath);
  if (
    filePath !== buildDirectory &&
    !filePath.startsWith(`${buildDirectory}${path.sep}`)
  ) {
    return undefined;
  }
  return filePath;
}

function createLocalServer() {
  const compressedCache = new Map();
  return createServer(async (request, response) => {
    try {
      if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { Allow: "GET, HEAD" });
        response.end();
        return;
      }

      let filePath = resolveBuildFile(request.url ?? "/");
      let statusCode = 200;
      if (!filePath) {
        filePath = path.join(buildDirectory, "404.html");
        statusCode = 404;
      }
      let content;
      try {
        content = await readFile(filePath);
      } catch (error) {
        if (error.code !== "ENOENT" && error.code !== "EISDIR") {
          throw error;
        }
        filePath = path.join(buildDirectory, "404.html");
        content = await readFile(filePath);
        statusCode = 404;
      }

      const extension = path.extname(filePath).toLowerCase();
      const acceptsBrotli = /(?:^|,)\s*br\s*(?:,|$)/i.test(
        request.headers["accept-encoding"] ?? "",
      );
      if (acceptsBrotli && compressedContentTypes.has(extension)) {
        let compressed = compressedCache.get(filePath);
        if (!compressed) {
          compressed = await compressBrotli(content, {
            params: {
              [zlibConstants.BROTLI_PARAM_QUALITY]: 5,
            },
          });
          compressedCache.set(filePath, compressed);
        }
        content = compressed;
        response.setHeader("Content-Encoding", "br");
        response.setHeader("Vary", "Accept-Encoding");
      }

      response.statusCode = statusCode;
      response.setHeader(
        "Content-Type",
        contentTypes.get(extension) ?? "application/octet-stream",
      );
      response.setHeader("Content-Length", String(content.byteLength));
      response.setHeader("X-Content-Type-Options", "nosniff");
      response.setHeader(
        "Cache-Control",
        filePath.includes(`${path.sep}assets${path.sep}`)
          ? "public, max-age=31536000, immutable"
          : "public, max-age=0, must-revalidate",
      );
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      if (!response.headersSent) {
        response.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
      }
      response.end("Internal server error");
    }
  });
}

async function startLocalServer() {
  const server = createLocalServer();
  await new Promise((resolve, reject) => {
    const handleError = (error) => reject(error);
    server.once("error", handleError);
    server.listen(localPort, "127.0.0.1", () => {
      server.off("error", handleError);
      resolve();
    });
  });
  return server;
}

async function waitForServer(url, requireCompression) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "Accept-Encoding": "br" },
        signal: AbortSignal.timeout(1_000),
      });
      const compressionValid =
        !requireCompression ||
        response.headers.get("content-encoding") === "br";
      const contentTypeValid = response.headers
        .get("content-type")
        ?.startsWith("text/html");
      await response.body?.cancel();
      if (response.ok && compressionValid && contentTypeValid) {
        return;
      }
    } catch {
      // The bounded loop reports a single clear error if startup never succeeds.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Static server did not become ready for Lighthouse.");
}

async function stopServer(server) {
  if (!server) {
    return;
  }
  await new Promise((resolve) => {
    const timeout = setTimeout(() => {
      server.closeAllConnections();
      resolve();
    }, 5_000);
    server.close(() => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

async function main() {
  const baseUrl = process.env.LIGHTHOUSE_BASE_URL ?? localBaseUrl;
  const origin = new URL(baseUrl).origin;
  const external = Boolean(process.env.LIGHTHOUSE_BASE_URL);
  const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  })
    .trim()
    .toLowerCase();
  if (!/^[0-9a-f]{40,64}$/.test(sourceCommit)) {
    throw new Error("Checked-out source is not a full Git commit ID.");
  }
  let server;
  let chrome;
  const errors = [];
  const results = [];
  try {
    if (!external) {
      server = await startLocalServer();
      await waitForServer(localBaseUrl, true);
    }
    chrome = await launch({
      chromePath: chromium.executablePath(),
      chromeFlags: [
        "--headless=new",
        "--no-sandbox",
        "--disable-dev-shm-usage",
      ],
      logLevel: "silent",
    });
    for (const route of routes) {
      const run = await lighthouse(new URL(route, baseUrl).href, {
        port: chrome.port,
        logLevel: "error",
        output: "json",
        onlyCategories: Object.keys(thresholds),
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 915,
          deviceScaleFactor: 2.625,
          disabled: false,
        },
        throttlingMethod: "simulate",
      });
      if (!run) {
        errors.push(`${route}: Lighthouse returned no result`);
        continue;
      }
      const scores = {};
      const failingAudits = {};
      for (const [category, minimum] of Object.entries(thresholds)) {
        const categoryResult = run.lhr.categories[category];
        const score = categoryResult?.score;
        scores[category] = score;
        if (typeof score !== "number" || score < minimum) {
          errors.push(
            `${route}: ${category} score ${score ?? "missing"} is below ${minimum}`,
          );
        }
        for (const { id, weight } of categoryResult?.auditRefs ?? []) {
          const audit = run.lhr.audits[id];
          if (
            weight > 0 &&
            typeof audit?.score === "number" &&
            audit.score < 1
          ) {
            failingAudits[id] = {
              category,
              ...summarizeAudit(audit),
            };
          }
        }
      }
      const diagnosticAudits = Object.fromEntries(
        diagnosticAuditIds
          .map((id) => [id, summarizeAudit(run.lhr.audits[id])])
          .filter(([, audit]) => audit !== undefined),
      );
      results.push({ route, scores, failingAudits, diagnosticAudits });
    }
  } finally {
    await chrome?.kill();
    await stopServer(server);
  }

  await writeEvidence("lighthouse-validation.json", {
    schemaVersion: 1,
    status: errors.length === 0 ? "passed" : "failed",
    origin,
    sourceCommit,
    profile: "mobile",
    serverProfile: external
      ? "external-production"
      : "local-brotli-production-representative",
    thresholds,
    results,
  });
  failIfErrors("Lighthouse performance and quality budgets", errors);
  console.log(
    `Lighthouse budgets passed for ${results.length} representative routes.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
