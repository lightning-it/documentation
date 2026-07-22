import { spawnSync } from "node:child_process";
import path from "node:path";

import {
  productionContentOrigin,
  productionOrigin,
} from "./lib/production-acceptance.mjs";
import {
  generatedEvidenceDirectory,
  repositoryRoot,
} from "./lib/validation.mjs";

const mode = process.argv[2];
if (!new Set(["preview", "production"]).has(mode)) {
  throw new Error("Browser evidence mode must be preview or production.");
}
const previewBaseUrl = process.env.BASE_URL?.trim();
if (mode === "preview" && !previewBaseUrl) {
  throw new Error("BASE_URL is required for preview browser evidence.");
}
const productionContentBaseUrl = (
  process.env.PRODUCTION_CONTENT_BASE_URL ?? productionContentOrigin
).trim();
let productionContentUrl;
if (mode === "production") {
  try {
    productionContentUrl = new URL(productionContentBaseUrl);
  } catch {
    throw new Error("PRODUCTION_CONTENT_BASE_URL must be a valid URL.");
  }
  if (productionContentUrl.href !== `${productionContentOrigin}/`) {
    throw new Error(
      `PRODUCTION_CONTENT_BASE_URL must be exactly ${productionContentOrigin}/.`,
    );
  }
}

const result = spawnSync(
  process.execPath,
  [
    path.join(repositoryRoot, "node_modules", "@playwright", "test", "cli.js"),
    "test",
    `tests/e2e/${mode}.spec.ts`,
    `--project=${mode}`,
    "--reporter=line,html,json",
  ],
  {
    cwd: repositoryRoot,
    env: {
      ...process.env,
      BASE_URL:
        mode === "production" ? productionContentUrl.href : previewBaseUrl,
      CANONICAL_ORIGIN:
        process.env.CANONICAL_ORIGIN ??
        (mode === "production"
          ? process.env.BASE_URL || productionOrigin
          : process.env.BASE_URL),
      EXTERNAL_TEST_MODE: mode,
      PLAYWRIGHT_JSON_OUTPUT_NAME: path.join(
        generatedEvidenceDirectory,
        `${mode}-playwright.json`,
      ),
    },
    stdio: "inherit",
  },
);

if (result.error) {
  throw result.error;
}
process.exitCode = result.status ?? 1;
