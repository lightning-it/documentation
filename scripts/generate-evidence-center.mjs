import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

import {
  canonicalJson,
  createEvidenceOutputs,
  digest,
  validateEvidenceRecords,
} from "./lib/evidence-records.mjs";
import { failIfErrors, repositoryRoot, walkFiles } from "./lib/validation.mjs";

const checkOnly = process.argv.includes("--check");
const configDirectory = path.join(repositoryRoot, "config");
const recordsDirectory = path.join(repositoryRoot, "evidence", "records");
const outputDirectory = path.join(repositoryRoot, "static", "evidence");
const targets = {
  catalog: path.join(outputDirectory, "catalog.json"),
  manifest: path.join(outputDirectory, "manifest.json"),
};

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function main() {
  const [schema, registry, recordFiles] = await Promise.all([
    readJson(path.join(configDirectory, "evidence-record.schema.json")),
    readJson(path.join(configDirectory, "evidence-record-registry.json")),
    walkFiles(recordsDirectory, (filePath) => filePath.endsWith(".json")),
  ]);
  const records = await Promise.all(recordFiles.map(readJson));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const errors = [];
  records.forEach((record, index) => {
    if (!validate(record)) {
      for (const error of validate.errors ?? []) {
        errors.push(
          `${path.basename(recordFiles[index])}${error.instancePath}: ${error.message}`,
        );
      }
    }
  });
  errors.push(...validateEvidenceRecords(records, registry));
  failIfErrors("Evidence Center validation", errors);

  const outputs = createEvidenceOutputs(records, registry);
  const expectedCatalog = canonicalJson(outputs.catalog);
  const expectedManifest = canonicalJson(outputs.manifest);
  if (checkOnly) {
    let attestation;
    try {
      attestation = await readJson(
        path.join(
          repositoryRoot,
          "evidence",
          "evidence-center-protected-review.json",
        ),
      );
    } catch {
      errors.push("protected-review attestation is missing or invalid");
      attestation = {};
    }
    if (
      attestation.decision !== "approved" ||
      attestation.classification_result !== "PUBLIC_SAFE" ||
      attestation.approval_basis !== "single-maintainer-exception" ||
      attestation.protected_source_locations_published !== false ||
      attestation.raw_restricted_artifacts_published !== false
    ) {
      errors.push(
        "protected-review attestation does not authorize publication",
      );
    }
    if (attestation.catalog_sha256 !== digest(expectedCatalog)) {
      errors.push("protected-review catalog digest is stale");
    }
    if (attestation.manifest_sha256 !== digest(expectedManifest)) {
      errors.push("protected-review manifest digest is stale");
    }
  }
  if (!checkOnly) {
    await mkdir(outputDirectory, { recursive: true });
  }
  for (const [name, target] of Object.entries(targets)) {
    const expected = name === "catalog" ? expectedCatalog : expectedManifest;
    if (checkOnly) {
      let actual;
      try {
        actual = await readFile(target, "utf8");
      } catch {
        actual = "";
      }
      if (actual !== expected) {
        errors.push(`${path.relative(repositoryRoot, target)} is stale`);
      }
    } else {
      await writeFile(target, expected, "utf8");
    }
  }
  failIfErrors("Evidence Center deterministic output", errors);
  console.log(
    `${checkOnly ? "Verified" : "Generated"} ${records.length} public evidence records and exact manifest.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
