import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import path from "node:path";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import { validateIhr } from "./ihr-validation.mjs";

const root = path.resolve(import.meta.dirname, "../..");
const schema = JSON.parse(
  await readFile(path.join(root, "schemas/ihr.schema.json"), "utf8"),
);
const template = await readFile(
  path.join(root, "templates/installation-and-handover-record.md"),
  "utf8",
);
function validate(source) {
  const parsed = matter(source, { engines: { yaml: parseYaml } });
  return validateIhr({
    data: parsed.data,
    markdown: parsed.content,
    schema,
    path: "fixture.md",
  });
}

test("supports en-GB readiness drafts with post-install fields pending", () => {
  assert.deepEqual(validate(template), []);
});

test("supports de-DE while machine lifecycle values stay neutral", () => {
  const source = template
    .replace("language: en-GB", "language: de-DE")
    .replace("Document language", "Dokumentensprache")
    .replace("Source language", "Ausgangssprache")
    .replace("Translation status", "Übersetzungsstatus")
    .replace("Technical identifiers", "Technische Bezeichner");
  assert.equal(
    validate(source).some(({ rule_id }) => rule_id === "IHR-LANG-001"),
    false,
  );
});

test("supports en-US as a required BCP-47 variant", () => {
  const source = template.replace("language: en-GB", "language: en-US");
  assert.equal(
    validate(source).some(({ rule_id }) => rule_id === "IHR-LANG-001"),
    false,
  );
});

test("rejects missing language metadata", () => {
  assert.ok(
    validate(template.replace("  language: en-GB\n", "")).some(
      ({ rule_id }) => rule_id === "IHR-LANG-001",
    ),
  );
});

test("READY_FOR_INSTALLATION rejects missing commands and pending authorisation", () => {
  const source = template
    .replace(
      "target_gate: requirements-shared",
      "target_gate: ready-for-installation",
    )
    .replace("Check command", "Removed field");
  const ids = validate(source).map(({ rule_id }) => rule_id);
  assert.ok(ids.includes("IHR-PLAN-003"));
  assert.ok(ids.includes("IHR-READY-001"));
});

test("TECHNICALLY_COMPLETED rejects missing actual commands and recaps", () => {
  const source = template.replace(
    "target_gate: requirements-shared",
    "target_gate: technically-completed",
  );
  assert.ok(
    validate(source).some(({ rule_id }) => rule_id === "IHR-ACTUAL-001"),
  );
});

test("DNS and NTP do not require product flow rows", () => {
  assert.equal(
    validate(template).some(({ message }) => /DNS|NTP/.test(message)),
    false,
  );
});
