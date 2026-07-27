import fs from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import { validateRepositoryLicense } from "./lib/repository-license.mjs";
import { failIfErrors, repositoryRoot } from "./lib/validation.mjs";

async function readText(relativePath) {
  return fs.readFile(path.join(repositoryRoot, relativePath), "utf8");
}

async function readJson(relativePath) {
  return JSON.parse(await readText(relativePath));
}

async function main() {
  const metadata = parseYaml(await readText(".lit/repository.yml"));
  const errors = validateRepositoryLicense({
    metadata,
    licenseText: await readText("LICENSE"),
    packageManifest: await readJson("package.json"),
    lockManifest: await readJson("package-lock.json"),
    citationMetadata: parseYaml(await readText("CITATION.cff")),
    readme: await readText("README.md"),
    contributing: await readText("CONTRIBUTING.md"),
    siteConfig: await readText("docusaurus.config.ts"),
    assetProvenance: await readJson("evidence/asset-provenance.json"),
  });

  failIfErrors("First-party repository license consistency", errors);
  console.log(
    `Validated first-party ${metadata.license_spdx} license consistency.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
