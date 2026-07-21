import { copyFile, stat } from "node:fs/promises";
import path from "node:path";

import {
  generatedEvidenceDirectory,
  repositoryRoot,
} from "./lib/validation.mjs";

async function main() {
  const source = path.join(
    generatedEvidenceDirectory,
    "THIRD_PARTY_NOTICES.txt",
  );
  const destination = path.join(
    repositoryRoot,
    "build",
    "THIRD_PARTY_NOTICES.txt",
  );
  const sourceStat = await stat(source);
  if (sourceStat.size < 1_000) {
    throw new Error(
      "Generated third-party notices are unexpectedly incomplete.",
    );
  }
  await copyFile(source, destination);
  console.log(
    "Published third-party license and NOTICE attribution with the static artifact.",
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
