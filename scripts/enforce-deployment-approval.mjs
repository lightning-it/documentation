import { execFileSync } from "node:child_process";

import { repositoryRoot } from "./lib/validation.mjs";

if (process.env.CF_PAGES_BRANCH === "main") {
  try {
    execFileSync(process.execPath, ["scripts/check-release-approval.mjs"], {
      cwd: repositoryRoot,
      env: process.env,
      stdio: "inherit",
    });
  } catch (error) {
    console.error(
      "Cloudflare production build blocked by the documentation approval gate.",
    );
    process.exitCode = error.status ?? 1;
  }
} else {
  console.log(
    "Production approval gate deferred: this is not a Cloudflare main-branch build.",
  );
}
