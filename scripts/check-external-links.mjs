import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  failIfErrors,
  repositoryRoot,
  walkFiles,
  writeEvidence,
} from "./lib/validation.mjs";
import { isVerifiedOwnedCloudflareChallenge } from "./lib/external-links.mjs";

const timeoutMilliseconds = 15_000;
const productionOrigin = "https://docs.l-it.io";

function normalizedExternalUrls(content) {
  const urls = new Set();
  const patterns = [
    /\b(?:href|src)=["'](https:\/\/[^"']+)["']/gi,
    /<(https:\/\/[^>]+)>/gi,
    /\]\((https:\/\/[^\s)]+)\)/gi,
  ];
  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      try {
        const url = new URL(match[1]);
        url.hash = "";
        if (url.hostname === "github.com") {
          const [owner, repository] = url.pathname.split("/").filter(Boolean);
          if (owner && repository) {
            url.pathname = `/${owner}/${repository}`;
            url.search = "";
          }
        }
        if (
          url.hostname !== "docs.l-it.io" &&
          !url.hostname.endsWith(".example.com") &&
          url.hostname !== "example.com"
        ) {
          urls.add(url.href);
        }
      } catch {
        // Malformed URLs are rejected by content or generated-site validation.
      }
    }
  }
  return urls;
}

async function request(url, method) {
  const response = await fetch(url, {
    method,
    redirect: "follow",
    headers: {
      Accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
      "User-Agent": "Lightning-IT-Documentation-Link-Validator/1.0",
      ...(method === "GET" ? { Range: "bytes=0-1023" } : {}),
    },
    signal: AbortSignal.timeout(timeoutMilliseconds),
  });
  await response.body?.cancel();
  return response;
}

async function checkUrl(url) {
  let response;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "github.com") {
      const [owner, repository] = parsed.pathname.split("/").filter(Boolean);
      const apiUrl = repository
        ? `https://api.github.com/repos/${owner}/${repository}`
        : `https://api.github.com/orgs/${owner}`;
      response = await fetch(apiUrl, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Lightning-IT-Documentation-Link-Validator/1.0",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        signal: AbortSignal.timeout(timeoutMilliseconds),
      });
      if (response.ok && repository) {
        const repositoryMetadata = await response.json();
        if (repositoryMetadata.private === true) {
          return { url, ok: false, status: "private" };
        }
      } else {
        await response.body?.cancel();
      }
    } else {
      response = await request(url, "HEAD");
      if ([400, 403, 405, 406, 501].includes(response.status)) {
        response = await request(url, "GET");
      }
    }
  } catch (error) {
    return {
      url,
      ok: false,
      error: error.name === "TimeoutError" ? "timeout" : "network",
    };
  }
  const verifiedChallenge = isVerifiedOwnedCloudflareChallenge(url, response);
  return {
    url,
    ok: (response.status >= 200 && response.status < 400) || verifiedChallenge,
    status: response.status,
    finalUrl: response.url || url,
    verification: verifiedChallenge ? "owned-cloudflare-challenge" : "http",
  };
}

async function main() {
  const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  })
    .trim()
    .toLowerCase();
  if (!/^[0-9a-f]{40,64}$/.test(sourceCommit)) {
    throw new Error("Checked-out source is not a full Git commit ID.");
  }
  const sourceFiles = [
    ...(await walkFiles(path.join(repositoryRoot, "docs"), (filePath) =>
      /\.mdx?$/.test(filePath),
    )),
  ];
  const buildDirectory = path.join(repositoryRoot, "build");
  try {
    sourceFiles.push(
      ...(await walkFiles(buildDirectory, (filePath) =>
        filePath.endsWith(".html"),
      )),
    );
  } catch {
    // Source extraction remains available before a local build.
  }
  for (const rootFile of ["README.md", "SECURITY.md", "SUPPORT.md"]) {
    sourceFiles.push(path.join(repositoryRoot, rootFile));
  }

  const urls = new Set();
  for (const filePath of sourceFiles) {
    for (const url of normalizedExternalUrls(
      await readFile(filePath, "utf8"),
    )) {
      urls.add(url);
    }
  }

  const queue = [...urls].sort();
  const results = [];
  const workers = Array.from(
    { length: Math.min(8, queue.length) },
    async () => {
      while (queue.length > 0) {
        const url = queue.shift();
        results.push(await checkUrl(url));
      }
    },
  );
  await Promise.all(workers);
  results.sort((left, right) => left.url.localeCompare(right.url));
  const errors = results
    .filter(({ ok }) => !ok)
    .map(({ url, status, error }) => {
      const parsed = new URL(url);
      return `${parsed.hostname}${parsed.pathname}: ${status ?? error}`;
    });
  await writeEvidence("external-link-validation.json", {
    schemaVersion: 1,
    status: errors.length === 0 ? "passed" : "failed",
    origin: productionOrigin,
    sourceCommit,
    checkedLinks: results.length,
    passingLinks: results.filter(({ ok }) => ok).length,
    failingLinks: errors.length,
    results: results.map(
      ({ url, ok, status, finalUrl, error, verification }) => ({
        url,
        ok,
        status,
        finalUrl,
        error,
        verification,
      }),
    ),
  });
  failIfErrors("External-link validation", errors);
  console.log(`Validated ${results.length} external HTTPS links.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
