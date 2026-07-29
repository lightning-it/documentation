import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { canonicalJson, digest } from "./lib/evidence-records.mjs";
import {
  createLocaleSearchManifest,
  validateLocaleSearch,
} from "./lib/locale-search.mjs";
import { failIfErrors, repositoryRoot } from "./lib/validation.mjs";

const checkOnly = process.argv.includes("--check");
const registryPath = path.join(
  repositoryRoot,
  "config",
  "locale-search-registry.json",
);
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const inputs = new Map();
for (const record of registry.translations) {
  for (const relativePath of [record.source_path, record.translation_path]) {
    try {
      inputs.set(
        relativePath,
        await readFile(path.join(repositoryRoot, relativePath), "utf8"),
      );
    } catch {
      inputs.set(relativePath, undefined);
    }
  }
}
const errors = validateLocaleSearch(registry, inputs);
failIfErrors("Locale and search validation", errors);
const manifest = createLocaleSearchManifest(registry, inputs);
const expected = canonicalJson(manifest);
const target = path.join(repositoryRoot, "static", "search", "manifest.json");
if (checkOnly) {
  let actual = "";
  try {
    actual = await readFile(target, "utf8");
  } catch {
    errors.push("search manifest is missing");
  }
  if (actual !== expected) errors.push("static/search/manifest.json is stale");
  const approval = JSON.parse(
    await readFile(
      path.join(repositoryRoot, "evidence", "locale-search-review.json"),
      "utf8",
    ),
  );
  if (
    approval.decision !== "approved" ||
    approval.approval_basis !== "single-maintainer-exception"
  ) {
    errors.push("locale/search publication is not approved");
  }
  if (approval.manifest_sha256 !== digest(expected))
    errors.push("locale/search approval digest is stale");
} else {
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, expected);
}
failIfErrors("Locale and search deterministic output", errors);
console.log(
  `${checkOnly ? "Verified" : "Generated"} ${manifest.translations.length} reviewed translation and ${manifest.partitions.length} search partitions.`,
);
