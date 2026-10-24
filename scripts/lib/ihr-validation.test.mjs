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
  path.join(root, "scripts/fixtures/ihr-readiness.md"),
  "utf8",
);
const currentTemplate = await readFile(
  path.join(root, "templates/installation-and-handover-record.md"),
  "utf8",
);
const catalog = parseYaml(
  await readFile(path.join(root, "rules/ihr-rules.yml"), "utf8"),
);
const validatorSource = await readFile(
  path.join(root, "scripts/lib/ihr-validation.mjs"),
  "utf8",
);
const digestValeRule = parseYaml(
  await readFile(
    path.join(root, "rules/vale/LIT/NoAbbreviatedDigest.yml"),
    "utf8",
  ),
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

test("the current German IHR template passes draft validation", () => {
  assert.deepEqual(validate(currentTemplate), []);
});

test("supports en-GB readiness drafts with post-install fields pending", () => {
  assert.deepEqual(validate(template), []);
});

test("catalogued rule IDs remain implemented by the standalone validator", () => {
  for (const rule of catalog.rules) {
    assert.match(validatorSource, new RegExp(`\\b${rule.id}\\b`), rule.id);
  }
});

test("Vale flags abbreviated digests without matching full SHA-256 digests", () => {
  const pattern = new RegExp(digestValeRule.tokens[0], "i");
  assert.equal(pattern.test(`sha256:${"a".repeat(63)}`), true);
  assert.equal(pattern.test(`sha256:${"a".repeat(20)}…`), true);
  assert.equal(pattern.test(`sha256:${"a".repeat(64)}`), false);
});

test("supports draft as a target gate", () => {
  const source = template.replace(
    "target_gate: requirements-shared",
    "target_gate: draft",
  );
  assert.deepEqual(validate(source), []);
});

test("target_gate cannot weaken validation required by document status", () => {
  const source = template
    .replace("status: requirements-shared", "status: accepted")
    .replace("target_gate: requirements-shared", "target_gate: draft");
  const ids = validate(source).map(({ rule_id }) => rule_id);
  assert.ok(ids.includes("IHR-ACTUAL-001"));
  assert.ok(ids.includes("IHR-ACCEPT-001"));
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

test("supports digit-prefixed BCP-47 variants", () => {
  const source = template.replace("language: en-GB", "language: de-DE-1901");
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

test("maps non-language schema failures to IHR-SCHEMA-001", () => {
  assert.ok(
    validate(template.replace("  type: IHR", "  type: OTHER")).some(
      ({ rule_id }) => rule_id === "IHR-SCHEMA-001",
    ),
  );
});

test("standalone validation detects representative secret values", () => {
  const source = `${template}\npassword: ${"not-a-" + "real-secret-value"}`;
  assert.ok(
    validate(source).some(({ rule_id }) => rule_id === "IHR-SECRET-001"),
  );
});

test("standalone validation scans front matter for secret values", () => {
  const source = template.replace(
    "  classification: PUBLIC",
    `  classification: PUBLIC\n  password: ${"not-a-" + "metadata-secret-value"}`,
  );
  assert.ok(
    validate(source).some(({ rule_id }) => rule_id === "IHR-SECRET-001"),
  );
});

test("READY_FOR_INSTALLATION rejects missing commands and pending authorisation", () => {
  const source = template
    .replace(
      "target_gate: requirements-shared",
      "target_gate: ready-for-installation",
    )
    .replace("Check command", "Removed field")
    .replace("sha256:", "sha512:");
  const ids = validate(source).map(({ rule_id }) => rule_id);
  assert.ok(ids.includes("IHR-PLAN-002"));
  assert.ok(ids.includes("IHR-PLAN-003"));
  assert.ok(ids.includes("IHR-READY-001"));
});

test("localized headings do not replace stable phase identifiers", () => {
  const source = template
    .replace(
      "target_gate: requirements-shared",
      "target_gate: ready-for-installation",
    )
    .replace("### Initial Preflight", "### Initiale Vorprüfung");
  const findings = validate(source);
  assert.equal(
    findings.some(
      ({ rule_id, message }) =>
        rule_id === "IHR-PLAN-001" && message.includes("section"),
    ),
    false,
  );
});

const germanExecutionFields = [
  ["Working directory", "Arbeitsverzeichnis"],
  ["Inventory", "Inventar"],
  ["Check command", "Zielauswahl und Syntax prüfen"],
  ["Real-run command", "Installationsaufruf"],
  ["Idempotency command", "Wiederholbarkeit prüfen"],
  ["Verification commands", "Funktionsprüfung"],
  ["Safe stop", "Fehler eingrenzen"],
  ["Restart", "Wiederaufnahme"],
  ["Rollback / recovery", "Wiederherstellung"],
  ["Planned evidence", "Prüfergebnisse und Nachweise"],
];

function germanReadinessPlan() {
  let source = template.replace(
    "target_gate: requirements-shared",
    "target_gate: ready-for-installation",
  );
  for (const [english, german] of germanExecutionFields) {
    source = source.replaceAll(english, german);
  }
  return source;
}

test("recognises German execution fields outside the phase overview", () => {
  const findings = validate(germanReadinessPlan());
  assert.equal(
    findings.some(({ rule_id }) => rule_id === "IHR-PLAN-003"),
    false,
  );
});

test("every execution field remains required in German plans", () => {
  for (const [english, german] of germanExecutionFields) {
    const findings = validate(germanReadinessPlan().replaceAll(german, ""));
    assert.ok(
      findings.some(
        ({ rule_id, message }) =>
          rule_id === "IHR-PLAN-003" && message.includes(english),
      ),
      english,
    );
  }
});

test("numeric run identifiers and dates are not abbreviated hashes", () => {
  const source = `${germanReadinessPlan()}\nhttps://example.com/actions/runs/12345678901\n20261024\n`;
  assert.equal(
    validate(source).some(({ rule_id }) => rule_id === "IHR-IMMUTABLE-001"),
    false,
  );
});

test("abbreviated hashes remain errors including explicitly named numeric hashes", () => {
  for (const reference of [
    "abcdef1",
    "commit 1234567",
    "SHA: `1234567890`",
    "https://example.com/commit/12345678",
    `sha256:${"1".repeat(63)}`,
  ]) {
    assert.ok(
      validate(`${germanReadinessPlan()}\n${reference}\n`).some(
        ({ rule_id }) => rule_id === "IHR-IMMUTABLE-001",
      ),
      reference,
    );
  }
});

test("TECHNICALLY_COMPLETED rejects missing actual commands and recaps", () => {
  const source = template.replace(
    "target_gate: requirements-shared",
    "target_gate: technically-completed",
  );
  assert.ok(
    validate(source).some(({ rule_id }) => rule_id === "IHR-ACTUAL-001"),
  );
  assert.ok(
    validate(source).some(({ rule_id }) => rule_id === "IHR-DEVIATION-001"),
  );
});

test("DNS and NTP do not require product flow rows", () => {
  assert.equal(
    validate(template).some(({ message }) => /DNS|NTP/.test(message)),
    false,
  );
});
