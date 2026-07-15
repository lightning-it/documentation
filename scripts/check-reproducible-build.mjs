import { execFileSync } from "node:child_process";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import {
  failIfErrors,
  repositoryPath,
  repositoryRoot,
  sha256,
  walkFiles,
  writeEvidence,
} from "./lib/validation.mjs";

async function buildManifest() {
  const buildDirectory = path.join(repositoryRoot, "build");
  await rm(buildDirectory, { recursive: true, force: true });
  const commitTimestamp = execFileSync("git", ["log", "-1", "--format=%ct"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  }).trim();
  execFileSync("npm", ["run", "build"], {
    cwd: repositoryRoot,
    env: {
      ...process.env,
      LC_ALL: "C",
      SOURCE_DATE_EPOCH: commitTimestamp || "0",
      TZ: "UTC",
    },
    stdio: "inherit",
  });
  const files = await walkFiles(buildDirectory);
  const manifest = new Map();
  for (const filePath of files) {
    manifest.set(repositoryPath(filePath), sha256(await readFile(filePath)));
  }
  return manifest;
}

function manifestDigest(manifest) {
  return sha256(
    [...manifest]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([filePath, digest]) => `${digest}  ${filePath}`)
      .join("\n"),
  );
}

async function main() {
  const first = await buildManifest();
  const second = await buildManifest();
  const errors = [];
  const paths = new Set([...first.keys(), ...second.keys()]);
  for (const filePath of [...paths].sort()) {
    if (first.get(filePath) !== second.get(filePath)) {
      errors.push(
        `${filePath}: content or presence differs between clean builds`,
      );
    }
  }
  const firstDigest = manifestDigest(first);
  const secondDigest = manifestDigest(second);
  await writeEvidence("reproducible-build.json", {
    status: errors.length === 0 ? "passed" : "failed",
    files: second.size,
    firstTreeSha256: firstDigest,
    secondTreeSha256: secondDigest,
    normalizedVariance: [],
  });
  failIfErrors("Reproducible build validation", errors);
  console.log(
    `Two clean builds reproduced ${second.size} files at ${secondDigest}.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
