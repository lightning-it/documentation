import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalJson,
  createEvidenceOutputs,
  validateEvidenceRecords,
} from "./evidence-records.mjs";

const registry = {
  categories: ["tests"],
  statuses: [
    "passed",
    "failed",
    "unavailable",
    "withheld",
    "expired",
    "superseded",
    "revoked",
  ],
  retention_classes: ["transient-validation"],
  environments: ["preview"],
  owners: ["Evidence Owner"],
  protected_field_names: ["customer", "customer_id", "raw_log", "token"],
};

function record(overrides = {}) {
  return {
    schema_version: "1.0",
    evidence_id: "ev-example",
    record_version: "1.0",
    category: "tests",
    status: "passed",
    title: "Bounded test result",
    subject: { type: "candidate", identifier: "public-example" },
    scope: {
      products: [],
      components: [],
      product_versions: [],
      environment: "preview",
    },
    source: { repository: "example/docs", commit: "a".repeat(40) },
    method: {
      identifier: "test",
      version: "1.0",
      acceptance_rule: { identifier: "must-pass", version: "1.0" },
    },
    observed_at: "2026-07-29T00:00:00Z",
    result: { summary: "The bounded test passed.", measurements: {} },
    relationships: {
      supports_claims: ["claim-example"],
      issues: [],
      pull_requests: [],
      supersedes: [],
    },
    limitations: ["Applies only to the example candidate."],
    owner: "Evidence Owner",
    review: {
      status: "approved",
      reviewed_at: "2026-07-29T00:00:00Z",
      reviewer_role: "Reviewer",
    },
    retention: {
      class: "transient-validation",
      review_at: "2027-07-29",
      tombstone: false,
    },
    ...overrides,
  };
}

test("canonical output is independent of object key insertion order", () => {
  assert.equal(canonicalJson({ b: 2, a: 1 }), canonicalJson({ a: 1, b: 2 }));
});

test("status views retain explicit zero counts", () => {
  const { manifest } = createEvidenceOutputs([record()], registry);
  assert.equal(manifest.status_counts.passed, 1);
  assert.equal(manifest.status_counts.failed, 0);
  assert.equal(manifest.status_counts.withheld, 0);
});

test("all non-success states remain explicit in the catalog", () => {
  const statuses = [
    "failed",
    "unavailable",
    "withheld",
    "expired",
    "revoked",
    "superseded",
  ];
  const records = statuses.map((status, index) =>
    record({
      evidence_id: `ev-${status}`,
      status,
      result: {
        summary: `The bounded result is ${status}.`,
        measurements: {},
        ...(["unavailable", "withheld", "expired", "revoked"].includes(status)
          ? { reason_category: "public-safe-test-fixture" }
          : {}),
      },
      retention: {
        class: "transient-validation",
        review_at: "2027-07-29",
        tombstone: ["expired", "revoked", "superseded"].includes(status),
      },
      relationships: {
        supports_claims: [],
        issues: [],
        pull_requests: [],
        supersedes:
          status === "superseded" && index > 0
            ? [`ev-${statuses[index - 1]}@1.0`]
            : [],
      },
    }),
  );
  assert.deepEqual(validateEvidenceRecords(records, registry), []);
  const { catalog, manifest } = createEvidenceOutputs(records, registry);
  assert.deepEqual(
    catalog.map(({ status }) => status).sort(),
    [...statuses].sort(),
  );
  statuses.forEach((status) => assert.equal(manifest.status_counts[status], 1));
});

test("protected fields and credential-like text fail closed", () => {
  const protectedRecord = record({
    result: {
      summary: "Bounded output.",
      measurements: {},
      raw_log: "not allowed",
    },
  });
  assert.match(
    validateEvidenceRecords([protectedRecord], registry).join("\n"),
    /protected field/,
  );
});

test("protected field matching normalizes common naming conventions", () => {
  for (const protectedKey of ["customerId", "customer_id", "customer-id"]) {
    const protectedRecord = record({
      result: {
        summary: "Bounded output.",
        measurements: { [protectedKey]: "not allowed" },
      },
    });
    assert.match(
      validateEvidenceRecords([protectedRecord], registry).join("\n"),
      /protected field/,
    );
  }
});

test("unsafe text inside arrays fails closed", () => {
  const unsafeRecord = record({
    limitations: [["Bearer", "abcdefghijklmnopqrstuvwxyz"].join(" ")],
  });
  assert.match(
    validateEvidenceRecords([unsafeRecord], registry).join("\n"),
    /unsafe public text/,
  );
});

test("unavailable evidence requires a safe reason category", () => {
  const unavailable = record({
    status: "unavailable",
    result: { summary: "Evidence is unavailable.", measurements: {} },
  });
  assert.match(
    validateEvidenceRecords([unavailable], registry).join("\n"),
    /requires a safe reason category/,
  );
});

test("missing supersession targets and cycles fail closed", () => {
  const invalid = record({
    relationships: {
      supports_claims: [],
      issues: [],
      pull_requests: [],
      supersedes: ["ev-missing@1.0"],
    },
  });
  assert.match(
    validateEvidenceRecords([invalid], registry).join("\n"),
    /missing superseded record/,
  );
});

test("non-terminal tombstones fail closed", () => {
  const invalid = record({
    retention: {
      class: "transient-validation",
      review_at: "2027-07-29",
      tombstone: true,
    },
  });
  assert.match(
    validateEvidenceRecords([invalid], registry).join("\n"),
    /tombstone status is not terminal/,
  );
});
