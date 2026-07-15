import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  deploymentMarker,
  deploymentMarkerPath,
  resolveBuildCommit,
} from "./lib/deployment.mjs";
import { repositoryRoot, sha256, writeEvidence } from "./lib/validation.mjs";

async function main() {
  const { commit, source } = resolveBuildCommit();
  const content = `${JSON.stringify(deploymentMarker(commit), null, 2)}\n`;
  const target = path.join(
    repositoryRoot,
    "build",
    deploymentMarkerPath.slice(1),
  );
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
  await writeEvidence("deployment-marker-generation.json", {
    status: "passed",
    commit,
    source,
    publicPath: deploymentMarkerPath,
    sha256: sha256(content),
  });
  console.log(`Published deterministic deployment marker for ${commit}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
