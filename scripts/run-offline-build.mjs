import { execFileSync } from "node:child_process";

import { repositoryRoot } from "./lib/validation.mjs";

try {
  execFileSync("npm", ["run", "build"], {
    cwd: repositoryRoot,
    env: {
      ...process.env,
      ALL_PROXY: "http://127.0.0.1:9",
      HTTP_PROXY: "http://127.0.0.1:9",
      HTTPS_PROXY: "http://127.0.0.1:9",
      NO_PROXY: "127.0.0.1,localhost",
      npm_config_offline: "true",
    },
    stdio: "inherit",
  });
  console.log(
    "Completed the production build with outbound package/network access disabled.",
  );
} catch (error) {
  console.error("Offline production build failed.");
  process.exitCode = error.status ?? 1;
}
