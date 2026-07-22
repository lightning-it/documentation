#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import { validateIhr } from "./lib/ihr-validation.mjs";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/validate-ihr.mjs <ihr.md>");
  process.exit(2);
}
const root = path.resolve(import.meta.dirname, "..");
const source = await readFile(path.resolve(input), "utf8");
const schema = JSON.parse(
  await readFile(path.join(root, "schemas/ihr.schema.json"), "utf8"),
);
const parsed = matter(source, { engines: { yaml: parseYaml } });
const findings = validateIhr({
  data: parsed.data,
  markdown: parsed.content,
  schema,
  path: input,
});
console.log(
  JSON.stringify(
    { ruleset: "LIT-DOC-IHR", version: "1.0.0", findings },
    null,
    2,
  ),
);
process.exit(findings.some(({ severity }) => severity === "error") ? 1 : 0);
