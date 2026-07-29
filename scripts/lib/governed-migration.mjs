import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import { canonicalJson, digest } from "./evidence-records.mjs";

const yamlEngine = (value) => parseYaml(value);

export async function evaluateMigration(
  config,
  summary,
  legacyIndex,
  approval,
  repositoryRoot,
) {
  const errors = [];
  const paths = config.public_target_paths ?? [];
  const uniquePaths = new Set(paths);
  if (uniquePaths.size !== paths.length)
    errors.push("public migration targets are duplicated");
  if (summary.tracked_item_total !== config.tracked_item_total)
    errors.push("tracked inventory total differs from restricted review");
  if (
    paths.length + config.protected_external_dependency?.count !==
    config.tracked_item_total
  )
    errors.push("migration dispositions do not cover the complete inventory");
  if (
    config.protected_external_dependency?.source_deletion_authorized !==
      false ||
    config.protected_external_dependency?.details_public !== false ||
    !config.protected_external_dependency?.owner
  )
    errors.push("protected external dependency boundary is incomplete");
  const legacyPaths = (legacyIndex.entries ?? []).map(
    (entry) => entry.target_path,
  );
  if (canonicalJson(legacyPaths) !== canonicalJson(paths))
    errors.push(
      "public target scope differs from the approved legacy inventory",
    );
  const approvedById = new Map();
  for (const record of approval.approvals ?? []) {
    if (record.decision !== "approved") continue;
    for (const id of record.document_ids ?? []) {
      const roles = approvedById.get(id) ?? new Set();
      roles.add(record.approver_role);
      approvedById.set(id, roles);
    }
  }
  const entries = [];
  const routes = new Set();
  for (const targetPath of paths) {
    if (!/^docs\/[a-z0-9/_-]+\.mdx?$/.test(targetPath)) {
      errors.push(
        `${targetPath}: target path is outside the public documentation tree`,
      );
      continue;
    }
    let source;
    try {
      source = await readFile(path.join(repositoryRoot, targetPath), "utf8");
    } catch {
      errors.push(`${targetPath}: target is missing`);
      continue;
    }
    let parsed;
    try {
      parsed = matter(source, { engines: { yaml: yamlEngine } });
    } catch {
      errors.push(`${targetPath}: front matter is invalid`);
      continue;
    }
    const { id, slug, document } = parsed.data;
    if (
      typeof id !== "string" ||
      id.length === 0 ||
      typeof slug !== "string" ||
      !/^\/[a-z0-9/_-]+\/$/.test(slug) ||
      routes.has(slug)
    ) {
      errors.push(
        `${targetPath}: stable ID or unique canonical route is missing`,
      );
      continue;
    }
    routes.add(slug);
    if (
      document?.classification !== "PUBLIC" ||
      document?.approval_status !== "approved"
    )
      errors.push(
        `${targetPath}: public classification or approval metadata is incomplete`,
      );
    const roles = approvedById.get(id) ?? new Set();
    if (![...roles].some((role) => config.review_requirements.includes(role)))
      errors.push(`${targetPath}: exact document approval is missing`);
    entries.push({
      target_path: targetPath,
      document_id: id,
      canonical_route: slug,
      owner: document?.owner,
      classification: "PUBLIC",
      disposition: "RECONCILED_AND_APPROVED",
      sha256: `sha256:${digest(source)}`,
    });
  }
  const inventory = {
    schema_version: 1,
    generator: "governed-migration-generator@1.0",
    issue: config.issue,
    tracked_item_total: config.tracked_item_total,
    disposition_counts: {
      reconciled_public_targets: entries.length,
      owned_protected_external_dependencies:
        config.protected_external_dependency.count,
    },
    public_targets: entries,
    protected_external_dependency: config.protected_external_dependency,
    source_deletion_authorized: false,
    duplicate_canonical_content: 0,
    unclassified_sources: 0,
    approval_content_tree_sha256: approval.content_tree_sha256,
    rollback: config.rollback,
  };
  return {
    errors,
    inventory: {
      ...inventory,
      inventory_sha256: digest(canonicalJson(inventory)),
    },
  };
}
