import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { canonicalJson, digest } from "./lib/evidence-records.mjs";
import {
  createComplianceOutputs,
  validateComplianceMappings,
} from "./lib/compliance-mappings.mjs";
import { failIfErrors, repositoryRoot, walkFiles } from "./lib/validation.mjs";

const checkOnly = process.argv.includes("--check");
const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const targetDirectory = path.join(repositoryRoot, "static", "compliance");

async function main() {
  const [schema, set, evidenceFiles] = await Promise.all([
    readJson(
      path.join(repositoryRoot, "config", "compliance-mapping.schema.json"),
    ),
    readJson(
      path.join(repositoryRoot, "config", "compliance-mapping-set.json"),
    ),
    walkFiles(path.join(repositoryRoot, "evidence", "records"), (file) =>
      file.endsWith(".json"),
    ),
  ]);
  const evidence = await Promise.all(evidenceFiles.map(readJson));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const errors = [];
  if (!validate(set)) {
    errors.push(
      ...(validate.errors ?? []).map(
        (entry) => `${entry.instancePath}: ${entry.message}`,
      ),
    );
  } else {
    errors.push(...validateComplianceMappings(set, evidence));
  }
  failIfErrors("Compliance mapping validation", errors);

  const outputs = createComplianceOutputs(set);
  if (checkOnly) {
    let attestation = {};
    try {
      attestation = await readJson(
        path.join(repositoryRoot, "evidence", "compliance-mapping-review.json"),
      );
    } catch {
      errors.push(
        "compliance mapping review attestation is missing or invalid",
      );
    }
    const catalogText = canonicalJson(outputs.catalog);
    const manifestText = canonicalJson(outputs.manifest);
    if (
      attestation.decision !== "approved" ||
      attestation.approval_basis !== "single-maintainer-exception" ||
      attestation.classification_result !== "PUBLIC_SAFE" ||
      attestation.certification_claimed !== false
    ) {
      errors.push("compliance mapping review does not authorize publication");
    }
    if (attestation.catalog_sha256 !== digest(catalogText))
      errors.push("compliance catalog approval digest is stale");
    if (attestation.manifest_sha256 !== digest(manifestText))
      errors.push("compliance manifest approval digest is stale");
  }
  if (!checkOnly) await mkdir(targetDirectory, { recursive: true });
  for (const [name, output] of Object.entries(outputs)) {
    const target = path.join(targetDirectory, `${name}.json`);
    const expected = canonicalJson(output);
    if (checkOnly) {
      let actual = "";
      try {
        actual = await readFile(target, "utf8");
      } catch {
        // A missing generated file is reported as stale below.
      }
      if (actual !== expected)
        errors.push(`${path.relative(repositoryRoot, target)} is stale`);
    } else {
      await writeFile(target, expected, "utf8");
    }
  }
  failIfErrors("Compliance mapping deterministic output", errors);
  const mappingLabel = set.mappings.length === 1 ? "mapping" : "mappings";
  console.log(
    `${checkOnly ? "Verified" : "Generated"} ${set.frameworks.length} frameworks and ${set.mappings.length} ${mappingLabel}.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
