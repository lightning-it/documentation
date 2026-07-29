import { canonicalJson, digest } from "./evidence-records.mjs";

const allowedTranslationStates = new Set([
  "missing",
  "draft",
  "in-review",
  "current",
  "stale",
  "deprecated",
  "retired",
]);
const publicStates = new Set(["current", "deprecated"]);

export function validateLocaleSearch(registry, inputs) {
  const errors = [];
  const localeIds = new Set();
  for (const locale of registry.locales ?? []) {
    if (localeIds.has(locale.id)) errors.push(`${locale.id}: duplicate locale`);
    localeIds.add(locale.id);
  }
  if (!localeIds.has(registry.canonical_locale))
    errors.push("canonical locale is not registered");
  if (!localeIds.has("de")) errors.push("German locale is not registered");
  if (
    (registry.versions ?? []).filter((entry) => entry.search_default).length !==
    1
  ) {
    errors.push("exactly one version must be the search default");
  }
  for (const record of registry.translations ?? []) {
    const id = `${record.document_id}:${record.locale}`;
    if (
      !localeIds.has(record.locale) ||
      record.locale === registry.canonical_locale
    ) {
      errors.push(`${id}: invalid translation locale`);
    }
    if (!allowedTranslationStates.has(record.translation_status)) {
      errors.push(`${id}: invalid translation status`);
    }
    if (
      typeof record.route !== "string" ||
      !record.route.startsWith(`/${record.locale}/`) ||
      !record.route.endsWith("/")
    ) {
      errors.push(`${id}: translation route is missing or invalid`);
    }
    const source = inputs.get(record.source_path);
    const translation = inputs.get(record.translation_path);
    if (!source) errors.push(`${id}: source is missing`);
    if (!translation) errors.push(`${id}: translation is missing`);
    if (source && digest(source) !== record.source_sha256) {
      errors.push(
        `${id}: source digest changed; translation must become stale`,
      );
    }
    if (record.translation_status === "current") {
      const reviewedAt = Date.parse(`${record.reviewed_at}T00:00:00Z`);
      const reviewAt = Date.parse(`${record.review_at}T00:00:00Z`);
      if (!record.reviewer || !record.reviewer_role) {
        errors.push(`${id}: current translation lacks human review`);
      }
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(record.reviewed_at ?? "") ||
        !/^\d{4}-\d{2}-\d{2}$/.test(record.review_at ?? "") ||
        !Number.isFinite(reviewedAt) ||
        !Number.isFinite(reviewAt)
      ) {
        errors.push(`${id}: translation review dates are missing or invalid`);
      }
      if (
        Number.isFinite(reviewedAt) &&
        Number.isFinite(reviewAt) &&
        reviewedAt >= reviewAt
      )
        errors.push(`${id}: review expiry is invalid`);
    }
    if (!publicStates.has(record.translation_status) && translation) {
      errors.push(
        `${id}: non-public translation exists in the public locale tree`,
      );
    }
  }
  const forbidden =
    /\b(?:restricted-search-sentinel|draft-search-sentinel|private-query-sentinel)\b/i;
  for (const [path, value] of inputs) {
    if (typeof value === "string" && forbidden.test(value)) {
      errors.push(`${path}: forbidden search sentinel leaked`);
    }
  }
  return errors;
}

export function createLocaleSearchManifest(registry, inputs) {
  const translations = [...(registry.translations ?? [])]
    .sort((a, b) =>
      `${a.document_id}:${a.locale}`.localeCompare(
        `${b.document_id}:${b.locale}`,
        "en",
      ),
    )
    .map((record) => ({
      document_id: record.document_id,
      locale: record.locale,
      version: record.source_version,
      state: record.translation_status,
      source_sha256: record.source_sha256,
      translation_sha256: digest(inputs.get(record.translation_path) ?? ""),
      route: record.route,
      reviewed_at: record.reviewed_at,
      review_at: record.review_at,
    }));
  const partitions = registry.locales.flatMap((locale) =>
    registry.versions.map((version) => ({
      locale: locale.id,
      version: version.id,
      lifecycle: version.lifecycle,
      index_prefix: "/pagefind/",
      engine_partition: `language:${locale.id}`,
      status: "required",
    })),
  );
  const manifest = {
    schema_version: 1,
    generator: "locale-search-generator@1.0",
    engine: `${registry.search.engine}@${registry.search.version}`,
    canonical_locale: registry.canonical_locale,
    locales: registry.locales.map(({ id, html_language, route_prefix }) => ({
      id,
      html_language,
      route_prefix,
    })),
    partitions,
    translations,
    search_policy: registry.search,
    query_telemetry: false,
    silent_fallback: false,
  };
  return { ...manifest, manifest_sha256: digest(canonicalJson(manifest)) };
}
