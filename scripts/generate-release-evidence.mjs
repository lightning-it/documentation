import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { repositoryRoot, sha256, writeEvidence } from "./lib/validation.mjs";

async function main() {
  const commit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  }).trim();
  const artifact = await readFile(
    path.join(repositoryRoot, "documentation-build.tgz"),
  );
  const sbom = await readFile(
    path.join(repositoryRoot, "evidence", "generated", "sbom.cdx.json"),
  );
  const productionSbom = await readFile(
    path.join(
      repositoryRoot,
      "evidence",
      "generated",
      "sbom-production.cdx.json",
    ),
  );
  const packageLock = await readFile(
    path.join(repositoryRoot, "package-lock.json"),
  );
  await writeEvidence("release-manifest.json", {
    schemaVersion: 1,
    productionCommit: commit,
    publicUrl: "https://docs.l-it.io",
    artifact: {
      path: "documentation-build.tgz",
      sha256: sha256(artifact),
    },
    sbom: {
      path: "evidence/generated/sbom.cdx.json",
      scope: "full locked runtime, build, and validation graph",
      sha256: sha256(sbom),
    },
    productionSbom: {
      path: "evidence/generated/sbom-production.cdx.json",
      scope: "npm production dependency subset",
      sha256: sha256(productionSbom),
    },
    packageLockSha256: sha256(packageLock),
    rollback: {
      method:
        "restore the previous accepted immutable Cloudflare Pages deployment",
      verificationUrl: "https://docs.l-it.io",
    },
  });
  console.log(`Generated release evidence for commit ${commit}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
