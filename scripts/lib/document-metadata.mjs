function stringSet(value) {
  return new Set(Array.isArray(value) ? value : []);
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values ?? []) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }
  return [...duplicates].sort();
}

export function metadataSchemaVersion(metadata) {
  return metadata?.document?.schema_version ?? "1.0";
}

export function validateMetadataRegistry(registry) {
  const errors = [];
  if (registry?.schema_version !== 2) {
    errors.push("metadata registry must use schema_version 2");
  }
  for (const key of [
    "owners",
    "approvers",
    "content_types",
    "audiences",
    "review_triggers",
    "relationship_fields",
  ]) {
    if (!Array.isArray(registry?.[key]) || registry[key].length === 0) {
      errors.push(`metadata registry ${key} must be a non-empty array`);
      continue;
    }
    if (duplicateValues(registry[key]).length > 0) {
      errors.push(`metadata registry ${key} contains duplicate values`);
    }
  }
  const products = registry?.products;
  if (!Array.isArray(products) || products.length === 0) {
    errors.push("metadata registry products must be a non-empty array");
  } else {
    const productIds = products.map(({ id }) => id);
    if (duplicateValues(productIds).length > 0) {
      errors.push("metadata registry products contains duplicate IDs");
    }
    for (const product of products) {
      if (
        typeof product?.id !== "string" ||
        !["product", "foundation", "transitional"].includes(product?.kind)
      ) {
        errors.push("metadata registry contains an invalid product record");
      }
    }
  }
  return errors;
}

export function validateDocumentMetadata(
  metadata,
  registry,
  { documentIds = new Set(), today = new Date() } = {},
) {
  const errors = [];
  const document = metadata?.document ?? {};
  const version = metadataSchemaVersion(metadata);
  const owners = stringSet(registry?.owners);
  const approvers = stringSet(registry?.approvers);

  if (!owners.has(document.owner)) {
    errors.push(`unknown owner ${String(document.owner)}`);
  }
  if (!approvers.has(document.approver)) {
    errors.push(`unknown approver ${String(document.approver)}`);
  }
  if (
    document.approval_status === "pending" &&
    !["draft", "review-candidate"].includes(document.status)
  ) {
    errors.push("pending approval requires draft or review-candidate status");
  }
  if (
    document.approval_status === "approved" &&
    ["draft", "review-candidate"].includes(document.status)
  ) {
    errors.push("approved content cannot remain draft or review-candidate");
  }

  if (version === "1.0") {
    return errors;
  }
  if (version !== "2.0") {
    errors.push(`unsupported metadata schema version ${String(version)}`);
    return errors;
  }

  const products = new Set((registry?.products ?? []).map(({ id }) => id));
  if (document.product !== undefined && !products.has(document.product)) {
    errors.push(`unknown product ${String(document.product)}`);
  }
  if (!stringSet(registry?.content_types).has(document.content_type)) {
    errors.push(`unknown content type ${String(document.content_type)}`);
  }
  if (!Array.isArray(document.audience)) {
    errors.push("audience must be an array");
  } else {
    for (const audience of document.audience) {
      if (!stringSet(registry?.audiences).has(audience)) {
        errors.push(`unknown audience ${String(audience)}`);
      }
    }
  }
  if (!Array.isArray(document.review_triggers)) {
    errors.push("review triggers must be an array");
  } else {
    for (const trigger of document.review_triggers) {
      if (!stringSet(registry?.review_triggers).has(trigger)) {
        errors.push(`unknown review trigger ${String(trigger)}`);
      }
    }
  }

  const relationshipFields = stringSet(registry?.relationship_fields);
  for (const [field, values] of Object.entries(document.relationships ?? {})) {
    if (!relationshipFields.has(field)) {
      errors.push(`unknown relationship field ${field}`);
      continue;
    }
    if (duplicateValues(values).length > 0) {
      errors.push(`relationship field ${field} contains duplicate values`);
    }
    if (field === "related_documents") {
      for (const target of values ?? []) {
        if (!documentIds.has(target)) {
          errors.push(`stale related document ${String(target)}`);
        }
      }
    }
  }

  const exception = document.exception;
  if (exception !== undefined) {
    const expiry = new Date(`${exception.expires_on}T00:00:00.000Z`);
    if (Number.isNaN(expiry.valueOf()) || expiry < today) {
      errors.push("metadata exception is expired or invalid");
    }
  }
  return errors;
}

export function effectiveApproval({
  metadata,
  documentId,
  contentTreeSha256,
  approvalEvidence,
  authorizedReviewers,
}) {
  const document = metadata?.document ?? {};
  if (
    document.approval_status !== "approved" ||
    !["maintained", "deprecated", "archived", "retired"].includes(
      document.status,
    )
  ) {
    return "pending";
  }
  if (
    approvalEvidence?.content_tree_sha256 !== contentTreeSha256 ||
    !approvalEvidence?.document_ids?.includes(documentId)
  ) {
    return "pending";
  }
  const approval = approvalEvidence?.approvals?.find(
    (record) =>
      record.approver_role === document.approver &&
      record.decision === "approved" &&
      record.document_ids?.includes(documentId),
  );
  if (
    !approval ||
    !authorizedReviewers?.get(document.approver)?.has(approval.reviewer)
  ) {
    return "pending";
  }
  return "approved";
}
