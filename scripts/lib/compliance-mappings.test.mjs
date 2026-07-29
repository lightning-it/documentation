import assert from "node:assert/strict";
import test from "node:test";
import {
  createComplianceOutputs,
  validateComplianceMappings,
} from "./compliance-mappings.mjs";

const evidence = [
  { evidence_id: "ev-test", record_version: "1.0", status: "passed" },
];
const base = () => ({
  mapping_set: {},
  frameworks: [
    ...[
      "bsi-it-grundschutz",
      "bsi-200-1",
      "bsi-200-2",
      "bsi-200-3",
      "bsi-200-4",
      "cis-benchmarks",
      "openssf-best-practices",
      "openssf-scorecard",
      "slsa",
      "spdx",
      "cyclonedx",
      "in-toto",
      "sigstore",
      "nist-ssdf",
    ].map((id) => ({ id, version: "1" })),
  ],
  requirements: [
    { id: "req-one", framework: "nist-ssdf", framework_version: "1" },
  ],
  mappings: [
    {
      id: "map-one",
      requirement_id: "req-one",
      scope: { products: ["aio"], components: [] },
      applicability: "applicable",
      implementation_status: "implemented",
      assurance_types: ["automated-validation"],
      evidence: [{ reference: "ev-test@1.0", relation: "supports" }],
      assessed_at: "2026-01-01",
      review_at: "2027-01-01",
      approved_by: "owner",
      review_triggers: ["change"],
    },
  ],
});

test("implemented mappings require current admissible evidence", () => {
  const set = base();
  assert.deepEqual(validateComplianceMappings(set, evidence), []);
  assert.match(
    validateComplianceMappings(set, [
      { ...evidence[0], status: "expired" },
    ]).join("\n"),
    /lacks current admissible evidence/,
  );
});

test("not-applicable records cannot become successes", () => {
  const set = base();
  set.mappings[0].applicability = "not-applicable";
  set.mappings[0].implementation_status = "not-applicable";
  const output = createComplianceOutputs(set);
  assert.equal(
    output.manifest.implementation_status_counts["not-applicable"],
    1,
  );
  assert.equal(output.manifest.success_percentage, null);
});

test("unknown evidence and mismatched applicability fail closed", () => {
  const set = base();
  set.mappings[0].evidence[0].reference = "ev-missing@1.0";
  set.mappings[0].implementation_status = "not-applicable";
  assert.match(
    validateComplianceMappings(set, evidence).join("\n"),
    /missing evidence/,
  );
  assert.match(
    validateComplianceMappings(set, evidence).join("\n"),
    /requires applicability decision/,
  );
});
