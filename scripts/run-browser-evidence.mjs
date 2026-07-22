import { spawnSync } from "node:child_process";
import path from "node:path";

import {
  generatedEvidenceDirectory,
  repositoryRoot,
} from "./lib/validation.mjs";

const mode = process.argv[2];
if (!new Set(["preview", "production"]).has(mode)) {
  throw new Error("Browser evidence mode must be preview or production.");
}
if (mode === "production" && !process.env.PRODUCTION_CONTENT_BASE_URL) {
  throw new Error(
    "PRODUCTION_CONTENT_BASE_URL is required for production browser evidence.",
  );
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
        mode === "production"
          ? process.env.PRODUCTION_CONTENT_BASE_URL
          : process.env.BASE_URL,
      CANONICAL_ORIGIN: process.env.BASE_URL,
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
