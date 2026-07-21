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
