import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  generatedEvidenceDirectory,
  sha256,
  writeEvidence,
} from "./lib/validation.mjs";

const requiredEvidence = [
  "deployment-commit-validation.json",
  "production-validation.json",
  "external-link-validation.json",
  "lighthouse-validation.json",
];

async function main() {
  const expectedCommit = (process.env.EXPECTED_COMMIT ?? "")
    .trim()
    .toLowerCase();
  if (!/^[0-9a-f]{40,64}$/.test(expectedCommit)) {
    throw new Error("EXPECTED_COMMIT must be a full hexadecimal commit ID.");
  }

  const evidence = [];
  for (const name of requiredEvidence) {
    const content = await readFile(
      path.join(generatedEvidenceDirectory, name),
      "utf8",
    );
    const parsed = JSON.parse(content);
    if (parsed.status !== "passed") {
      throw new Error(`${name} does not record a passing validation.`);
    }
    evidence.push({
      path: `evidence/generated/${name}`,
      sha256: sha256(content),
    });
  }

  await writeEvidence("production-acceptance.json", {
    schemaVersion: 1,
    status: "passed",
    productionCommit: expectedCommit,
    publicUrl: "https://docs.l-it.io",
    checks: [
      "deployed commit",
      "DNS, TLS, and HTTP-to-HTTPS redirect",
      "security headers and caching",
      "complete sitemap canonical crawl and custom 404",
      "pages.dev noindex and optional branch-preview noindex",
      "navigation and search smoke journey",
      "accessibility",
      "external links",
      "mobile Lighthouse budgets",
    ],
    evidence,
    browserReport: "playwright-report/index.html",
  });
  console.log(`Recorded production acceptance for ${expectedCommit}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
