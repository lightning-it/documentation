import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { canonicalJson, digest } from "./lib/evidence-records.mjs";
import {
  createTraceabilityOutput,
  validateTraceability,
} from "./lib/github-traceability.mjs";
import { failIfErrors, repositoryRoot } from "./lib/validation.mjs";

const checkOnly = process.argv.includes("--check");
const read = async (name) =>
  JSON.parse(await readFile(path.join(repositoryRoot, name), "utf8"));
const config = await read("config/github-traceability.json");
const snapshot = await read("evidence/github-traceability-snapshot.json");
const errors = validateTraceability(config, snapshot);
const output = createTraceabilityOutput(config, snapshot);
const expected = canonicalJson(output);
const target = path.join(
  repositoryRoot,
  "static",
  "traceability",
  "index.json",
);
if (checkOnly) {
  let actual = "";
  try {
    actual = await readFile(target, "utf8");
  } catch {
    // Missing output is reported as stale below.
  }
  if (actual !== expected) errors.push("traceability index is stale");
  const approval = await read("evidence/github-traceability-review.json");
  if (
    approval.decision !== "approved" ||
    approval.classification_result !== "PUBLIC_SAFE"
  )
    errors.push("traceability publication is not approved");
  if (approval.output_sha256 !== digest(expected))
    errors.push("traceability approval digest is stale");
} else {
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, expected);
}
failIfErrors("GitHub lifecycle traceability", errors);
console.log(
  `${checkOnly ? "Verified" : "Generated"} ${output.objects.length} objects and ${output.edges.length} typed edges.`,
);
