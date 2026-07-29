import { createHash } from "node:crypto";

const identifierReference = (record) =>
  `${record.evidence_id}@${record.record_version}`;

function canonicalize(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([key, entry]) => [key, canonicalize(entry)]),
    );
  }
  return value;
}

export function canonicalJson(value) {
  return `${JSON.stringify(canonicalize(value), null, 2)}\n`;
}

export function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function visitFields(value, callback, path = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      const entryPath = [...path, String(index)];
      callback(String(index), entry, entryPath);
      visitFields(entry, callback, entryPath);
    });
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => {
      callback(key, entry, [...path, key]);
      visitFields(entry, callback, [...path, key]);
    });
  }
}

export function validateEvidenceRecords(records, registry) {
  const errors = [];
  const references = new Map();
  const normalizeFieldName = (value) =>
    value.toLocaleLowerCase("en-US").replace(/[^a-z0-9]/g, "");
  const protectedNames = new Set(
    registry.protected_field_names.map(normalizeFieldName),
  );
  const unsafeText =
    /\b(?:github_pat_|gh[pousr]_|bearer\s+[a-z0-9._~+/-]{20,}|(?:customer|client)[-_ ]?(?:id|name)\s*[:=]|(?:hostname|private[_ -]?url|raw[_ -]?log|topology)\s*[:=])/i;

  for (const record of records) {
    const reference = identifierReference(record);
    if (references.has(reference)) {
      errors.push(`${reference}: duplicate evidence record`);
    }
    references.set(reference, record);

    if (!registry.categories.includes(record.category)) {
      errors.push(`${reference}: unknown category ${record.category}`);
    }
    if (!registry.statuses.includes(record.status)) {
      errors.push(`${reference}: unknown status ${record.status}`);
    }
    if (!registry.retention_classes.includes(record.retention?.class)) {
      errors.push(
        `${reference}: unknown retention class ${record.retention?.class}`,
      );
    }
    if (!registry.environments.includes(record.scope?.environment)) {
      errors.push(
        `${reference}: unknown environment ${record.scope?.environment}`,
      );
    }
    if (!registry.owners.includes(record.owner)) {
      errors.push(`${reference}: unknown owner ${record.owner}`);
    }
    if (
      ["unavailable", "withheld", "expired", "revoked"].includes(
        record.status,
      ) &&
      !record.result?.reason_category
    ) {
      errors.push(
        `${reference}: ${record.status} requires a safe reason category`,
      );
    }
    if (
      record.retention?.tombstone &&
      !["expired", "superseded", "revoked"].includes(record.status)
    ) {
      errors.push(`${reference}: tombstone status is not terminal`);
    }
    if (
      record.review?.status === "approved" &&
      record.review?.reviewed_at === null
    ) {
      errors.push(`${reference}: approved record has no review timestamp`);
    }

    visitFields(record, (key, value, fieldPath) => {
      if (protectedNames.has(normalizeFieldName(key))) {
        errors.push(`${reference}: protected field ${fieldPath.join(".")}`);
      }
      if (typeof value === "string" && unsafeText.test(value)) {
        errors.push(
          `${reference}: unsafe public text at ${fieldPath.join(".")}`,
        );
      }
    });
  }

  for (const record of records) {
    const reference = identifierReference(record);
    for (const target of record.relationships?.supersedes ?? []) {
      if (!references.has(target)) {
        errors.push(`${reference}: missing superseded record ${target}`);
      }
      if (target === reference) {
        errors.push(`${reference}: record cannot supersede itself`);
      }
    }
  }

  const visiting = new Set();
  const visited = new Set();
  function detectCycle(reference) {
    if (visiting.has(reference)) {
      errors.push(`${reference}: supersession cycle`);
      return;
    }
    if (visited.has(reference)) return;
    visiting.add(reference);
    const record = references.get(reference);
    for (const target of record?.relationships?.supersedes ?? []) {
      if (references.has(target)) detectCycle(target);
    }
    visiting.delete(reference);
    visited.add(reference);
  }
  references.forEach((_, reference) => detectCycle(reference));

  return errors;
}

export function createEvidenceOutputs(records, registry) {
  const ordered = [...records].sort((left, right) => {
    const leftReference = identifierReference(left);
    const rightReference = identifierReference(right);
    return leftReference < rightReference
      ? -1
      : leftReference > rightReference
        ? 1
        : 0;
  });
  const catalog = ordered.map((record) => ({
    reference: identifierReference(record),
    title: record.title,
    category: record.category,
    status: record.status,
    subject: record.subject,
    observed_at: record.observed_at,
    owner: record.owner,
    review: record.review.status,
    reviewed_at: record.review.reviewed_at,
    retention_review_at: record.retention.review_at,
    supports_claims: record.relationships.supports_claims,
    limitations: record.limitations,
    tombstone: record.retention.tombstone,
  }));
  const recordDigests = ordered.map((record) => ({
    reference: identifierReference(record),
    sha256: digest(canonicalJson(record)),
  }));
  const statusCounts = Object.fromEntries(
    registry.statuses.map((status) => [
      status,
      ordered.filter((record) => record.status === status).length,
    ]),
  );
  const manifest = {
    schema_version: 1,
    generator: "evidence-center-generator@1.0",
    records: recordDigests,
    catalog_sha256: digest(canonicalJson(catalog)),
    status_counts: statusCounts,
  };
  return { catalog, manifest };
}
