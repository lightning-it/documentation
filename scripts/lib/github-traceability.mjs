import { canonicalJson, digest } from "./evidence-records.mjs";

const requiredTypes = new Set([
  "goal",
  "task",
  "adr",
  "pull_request",
  "review",
  "commit",
  "test",
  "evidence",
  "release",
  "version",
]);
const edgeTypes = new Set([
  "parent_of",
  "decides",
  "implements",
  "reviewed_by",
  "verified_by",
  "produces",
  "promotes",
  "releases",
  "deployed_as",
  "accepted_by",
  "supports_version",
  "supersedes",
  "deprecates",
  "maintains",
]);

export function validateTraceability(
  config,
  snapshot,
  now = new Date(),
  { allowStaleExisting = false } = {},
) {
  const errors = [];
  const allowed = new Map(
    (config.repositories ?? []).map((entry) => [entry.node_id, entry]),
  );
  const repository = allowed.get(snapshot.repository?.node_id);
  if (!repository) errors.push("repository is not allowlisted");
  if (
    snapshot.repository?.visibility !== "PUBLIC" ||
    repository?.visibility !== "PUBLIC"
  )
    errors.push("repository visibility is not public");
  if (snapshot.query_contract_version !== config.query_contract_version)
    errors.push("query contract version mismatch");
  if (!snapshot.complete || snapshot.pagination?.has_next_page)
    errors.push("snapshot is partial or pagination is incomplete");
  const pages = snapshot.pagination?.pages;
  if (!Number.isInteger(pages) || pages < 1)
    errors.push("pagination page count is invalid");
  else if (pages > config.maximum_pages)
    errors.push("pagination exceeds bounded contract");
  const remaining = snapshot.rate_limit?.remaining;
  if (!Number.isFinite(remaining) || remaining < 0)
    errors.push("rate limit value is invalid");
  else if (remaining < config.minimum_remaining_rate_limit)
    errors.push("rate limit is below the safe threshold");
  const observed = Date.parse(snapshot.repository?.observed_at ?? "");
  const age = now.getTime() - observed;
  if (!Number.isFinite(observed) || age < 0)
    errors.push("snapshot is stale or has an invalid observation time");
  else if (
    age > config.maximum_snapshot_age_days * 86400000 &&
    !allowStaleExisting
  )
    errors.push("snapshot is stale or has an invalid observation time");
  const objects = new Map();
  const seenTypes = new Set();
  for (const object of snapshot.objects ?? []) {
    if (!object.immutable_id || objects.has(object.immutable_id))
      errors.push("object has missing or duplicate immutable identity");
    if (!requiredTypes.has(object.type))
      errors.push(`${object.type}: unsupported object type`);
    if (
      typeof object.url !== "string" ||
      !object.url.startsWith(`${repository?.url}/`)
    )
      errors.push(
        `${object.immutable_id}: URL is outside the public repository`,
      );
    objects.set(object.immutable_id, object);
    seenTypes.add(object.type);
  }
  for (const type of requiredTypes)
    if (!seenTypes.has(type))
      errors.push(`${type}: required lifecycle object is missing`);
  for (const edge of snapshot.edges ?? []) {
    if (!edgeTypes.has(edge.type))
      errors.push(`${edge.type}: unsupported edge type`);
    if (
      !objects.has(edge.from) ||
      !objects.has(edge.to) ||
      !objects.has(edge.source)
    )
      errors.push(`${edge.type}: unresolved lifecycle relationship`);
  }
  return errors;
}

export function createTraceabilityOutput(config, snapshot) {
  const objects = [...snapshot.objects].sort((a, b) =>
    `${a.type}:${a.immutable_id}:${a.version ?? ""}`.localeCompare(
      `${b.type}:${b.immutable_id}:${b.version ?? ""}`,
      "en",
    ),
  );
  const edges = [...snapshot.edges].sort((a, b) =>
    `${a.from}:${a.type}:${a.to}`.localeCompare(
      `${b.from}:${b.type}:${b.to}`,
      "en",
    ),
  );
  const snapshotSha256 = digest(canonicalJson(snapshot));
  const index = {
    schema_version: 1,
    generator: "github-traceability-generator@1.0",
    query_contract_version: config.query_contract_version,
    repository: snapshot.repository,
    objects,
    edges,
    snapshot_sha256: snapshotSha256,
  };
  return { ...index, output_sha256: digest(canonicalJson(index)) };
}
