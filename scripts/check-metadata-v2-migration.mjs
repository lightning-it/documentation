import { readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { parse as parseYaml } from "yaml";

import { metadataSchemaVersion } from "./lib/document-metadata.mjs";
import {
  failIfErrors,
  repositoryRoot,
  sha256,
  walkFiles,
  writeEvidence,
} from "./lib/validation.mjs";

function yamlEngine(value) {
  return parseYaml(value);
}

async function main() {
  const report = JSON.parse(
    await readFile(
      path.join(
        repositoryRoot,
        "evidence",
        "metadata-v2-migration-report.json",
      ),
      "utf8",
    ),
  );
  const approval = JSON.parse(
    await readFile(
      path.join(repositoryRoot, "evidence", "document-approval.json"),
      "utf8",
    ),
  );
  const files = await walkFiles(
    path.join(repositoryRoot, "docs"),
    (filePath) => filePath.endsWith(".md") || filePath.endsWith(".mdx"),
  );
  const records = [];
  for (const filePath of files) {
    const source = await readFile(filePath, "utf8");
    const { data } = matter(source, { engines: { yaml: yamlEngine } });
    records.push({
      id: data.id,
      schemaVersion: metadataSchemaVersion(data),
    });
  }
  records.sort((left, right) => left.id.localeCompare(right.id));

  const errors = [];
  const v1Count = records.filter(
    ({ schemaVersion }) => schemaVersion === "1.0",
  ).length;
  const v2Count = records.filter(
    ({ schemaVersion }) => schemaVersion === "2.0",
  ).length;
  const documentIds = records.map(({ id }) => id);
  const approvedIds = [...(approval.document_ids ?? [])].sort();
  if (
    report.schema_version !== 1 ||
    report.metadata_contract !== "2.0" ||
    report.compatibility_reader?.missing_schema_version_means !== "1.0" ||
    report.compatibility_reader?.semantic_broadening !== false
  ) {
    errors.push(
      "metadata migration report has an invalid compatibility contract",
    );
  }
  if (
    report.inventory?.document_count !== records.length ||
    report.inventory?.version_1_compatible !== v1Count ||
    report.inventory?.version_2_native !== v2Count ||
    report.inventory?.unresolved !== 0
  ) {
    errors.push(
      "metadata migration report does not match the current inventory",
    );
  }
  if (
    JSON.stringify(documentIds) !== JSON.stringify(approvedIds) ||
    new Set(documentIds).size !== records.length
  ) {
    errors.push(
      "metadata migration inventory does not match approved document IDs",
    );
  }

  await writeEvidence("metadata-v2-migration-validation.json", {
    schemaVersion: 1,
    status: errors.length === 0 ? "passed" : "failed",
    metadataContract: "2.0",
    documents: records.length,
    version1Compatible: v1Count,
    version2Native: v2Count,
    documentIdSetSha256: sha256(documentIds.join("\n")),
  });
  failIfErrors("Metadata v2 migration validation", errors);
  console.log(
    `Validated metadata compatibility for ${records.length} documents (${v1Count} v1, ${v2Count} v2).`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
