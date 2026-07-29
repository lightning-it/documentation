import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { canonicalJson, digest } from "./lib/evidence-records.mjs";
import { evaluateMigration } from "./lib/governed-migration.mjs";
import { failIfErrors, repositoryRoot } from "./lib/validation.mjs";

const checkOnly = process.argv.includes("--check");
const read = async (name) =>
  JSON.parse(await readFile(path.join(repositoryRoot, name), "utf8"));
const [config, summary, legacyIndex, approval] = await Promise.all([
  read("config/governed-migration.json"),
  read("evidence/migration-summary.json"),
  read("evidence/migration-target-index.json"),
  read("evidence/document-approval.json"),
]);
const { errors, inventory } = await evaluateMigration(
  config,
  summary,
  legacyIndex,
  approval,
  repositoryRoot,
);
failIfErrors("Governed migration input", errors);
const expected = canonicalJson(inventory);
const target = path.join(
  repositoryRoot,
  "static",
  "migration",
  "inventory.json",
);
if (checkOnly) {
  let actual = "";
  try {
    actual = await readFile(target, "utf8");
  } catch {
    /* reported below */
  }
  if (actual !== expected) errors.push("governed migration inventory is stale");
  const review = await read("evidence/governed-migration-review.json");
  if (
    review.decision !== "approved" ||
    review.classification_result !== "PUBLIC_SAFE" ||
    review.source_deletion_authorized !== false
  )
    errors.push("governed migration is not approved");
  if (review.inventory_sha256 !== digest(expected))
    errors.push("governed migration approval digest is stale");
} else {
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, expected);
}
failIfErrors("Governed migration deterministic output", errors);
console.log(
  `Verified dispositions for ${inventory.tracked_item_total} inventory items (${inventory.public_targets.length} public, ${inventory.protected_external_dependency.count} protected external).`,
);
