import assert from "node:assert/strict";
import test from "node:test";

import {
  effectiveApproval,
  metadataSchemaVersion,
  validateDocumentMetadata,
  validateMetadataRegistry,
} from "./document-metadata.mjs";

const registry = {
  schema_version: 2,
  owners: ["Documentation Owners"],
  approvers: ["Product Owners"],
  products: [{ id: "aio", kind: "product" }],
  content_types: ["overview"],
  audiences: ["practitioner"],
  review_triggers: ["source-change"],
  relationship_fields: ["related_documents"],
};

const v2Metadata = {
  id: "aio-overview",
  document: {
    schema_version: "2.0",
    status: "maintained",
    approval_status: "approved",
    owner: "Documentation Owners",
    approver: "Product Owners",
    product: "aio",
    content_type: "overview",
    audience: ["practitioner"],
    review_triggers: ["source-change"],
    relationships: { related_documents: ["aio-boundary"] },
  },
};

test("version-1 metadata remains version 1 without semantic defaults", () => {
  assert.equal(metadataSchemaVersion({ document: {} }), "1.0");
});

test("registry validation rejects duplicate and incomplete controls", () => {
  assert.deepEqual(validateMetadataRegistry(registry), []);
  assert.ok(
    validateMetadataRegistry({ ...registry, owners: ["x", "x"] }).some(
      (error) => error.includes("duplicate"),
    ),
  );
});

test("version-2 metadata resolves controlled values and relationships", () => {
  assert.deepEqual(
    validateDocumentMetadata(v2Metadata, registry, {
      documentIds: new Set(["aio-overview", "aio-boundary"]),
    }),
    [],
  );
  const invalid = structuredClone(v2Metadata);
  invalid.document.product = "unknown";
  invalid.document.relationships.related_documents = ["missing"];
  const errors = validateDocumentMetadata(invalid, registry, {
    documentIds: new Set(["aio-overview"]),
  });
  assert.ok(errors.some((error) => error.includes("unknown product")));
  assert.ok(errors.some((error) => error.includes("stale related document")));
});

test("invalid approval and expired exceptions fail closed", () => {
  const invalid = structuredClone(v2Metadata);
  invalid.document.status = "review-candidate";
  invalid.document.exception = { expires_on: "2026-01-01" };
  const errors = validateDocumentMetadata(invalid, registry, {
    documentIds: new Set(["aio-overview", "aio-boundary"]),
    today: new Date("2026-07-28T00:00:00.000Z"),
  });
  assert.ok(errors.some((error) => error.includes("approved content")));
  assert.ok(errors.some((error) => error.includes("expired")));
});

test("drafts may remain pending and malformed arrays fail deterministically", () => {
  const draft = structuredClone(v2Metadata);
  draft.document.status = "draft";
  draft.document.approval_status = "pending";
  assert.deepEqual(
    validateDocumentMetadata(draft, registry, {
      documentIds: new Set(["aio-overview", "aio-boundary"]),
    }),
    [],
  );
  draft.document.audience = "practitioner";
  draft.document.review_triggers = "source-change";
  const errors = validateDocumentMetadata(draft, registry, {
    documentIds: new Set(["aio-overview", "aio-boundary"]),
  });
  assert.ok(errors.includes("audience must be an array"));
  assert.ok(errors.includes("review triggers must be an array"));
  assert.equal(
    errors.some((error) => error.includes("unknown audience p")),
    false,
  );
});

test("effective approval requires exact digest, role, reviewer, and document", () => {
  const approvalEvidence = {
    content_tree_sha256: "digest",
    document_ids: ["aio-overview"],
    approvals: [
      {
        approver_role: "Product Owners",
        decision: "approved",
        reviewer: "@reviewer",
        document_ids: ["aio-overview"],
      },
    ],
  };
  const authorizedReviewers = new Map([
    ["Product Owners", new Set(["@reviewer"])],
  ]);
  assert.equal(
    effectiveApproval({
      metadata: v2Metadata,
      documentId: "aio-overview",
      contentTreeSha256: "digest",
      approvalEvidence,
      authorizedReviewers,
    }),
    "approved",
  );
  for (const status of ["deprecated", "archived", "retired"]) {
    const lifecycleMetadata = structuredClone(v2Metadata);
    lifecycleMetadata.document.status = status;
    assert.equal(
      effectiveApproval({
        metadata: lifecycleMetadata,
        documentId: "aio-overview",
        contentTreeSha256: "digest",
        approvalEvidence,
        authorizedReviewers,
      }),
      "approved",
    );
  }
  assert.equal(
    effectiveApproval({
      metadata: v2Metadata,
      documentId: "aio-overview",
      contentTreeSha256: "other",
      approvalEvidence,
      authorizedReviewers,
    }),
    "pending",
  );
});
