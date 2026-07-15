import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { inlineScriptBodies } from "./lib/html.mjs";
import { repositoryRoot, walkFiles, writeEvidence } from "./lib/validation.mjs";

const marker = "__LIGHTNING_IT_SCRIPT_HASHES__";

function cspHash(script) {
  return `'sha256-${createHash("sha256").update(script, "utf8").digest("base64")}'`;
}

async function main() {
  const buildDirectory = path.join(repositoryRoot, "build");
  const headersPath = path.join(buildDirectory, "_headers");
  const htmlFiles = await walkFiles(buildDirectory, (filePath) =>
    filePath.endsWith(".html"),
  );
  const uniqueHashes = new Set();
  let inlineScriptInstances = 0;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    for (const script of inlineScriptBodies(html)) {
      inlineScriptInstances += 1;
      uniqueHashes.add(cspHash(script));
    }
  }

  if (inlineScriptInstances === 0) {
    throw new Error(
      "No inline scripts were found; refusing to emit an unverified CSP.",
    );
  }

  const headers = await readFile(headersPath, "utf8");
  const markerCount = headers.split(marker).length - 1;
  if (markerCount !== 1) {
    throw new Error(
      `Expected exactly one ${marker} marker in build/_headers; found ${markerCount}.`,
    );
  }

  const hashes = [...uniqueHashes].sort();
  const generatedHeaders = headers.replace(marker, hashes.join(" "));
  if (generatedHeaders.includes(marker)) {
    throw new Error("The CSP script-hash marker survived generation.");
  }
  const lines = generatedHeaders.split(/\r?\n/);
  const longestLine = Math.max(...lines.map((line) => line.length));
  const headerRules = lines.filter(
    (line) => line.length > 0 && !/^\s/.test(line) && !line.startsWith("#"),
  ).length;
  if (longestLine > 2_000) {
    throw new Error(
      `Generated _headers line is ${longestLine} characters; Cloudflare Pages permits 2,000.`,
    );
  }
  if (headerRules > 100) {
    throw new Error(
      `Generated _headers contains ${headerRules} rules; Cloudflare Pages permits 100.`,
    );
  }
  await writeFile(headersPath, generatedHeaders, "utf8");
  await writeEvidence("csp-generation.json", {
    status: "passed",
    htmlFiles: htmlFiles.length,
    inlineScriptInstances,
    uniqueInlineScripts: hashes.length,
    algorithm: "sha256",
    headerRules,
    longestHeaderLine: longestLine,
  });
  console.log(
    `Authorized ${hashes.length} unique inline scripts across ${htmlFiles.length} HTML files.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
