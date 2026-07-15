import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { failIfErrors, repositoryRoot } from "./lib/validation.mjs";

const indexPath = path.join(
  repositoryRoot,
  "evidence",
  "migration-target-index.json",
);
const expectedContentCommit = "7727957e35b720ad22f81df9986b350e07c9e691";
const expectedTargetPaths = [
  "docs/compliance/bsi-mapping.md",
  "docs/contributing/index.md",
  "docs/modulix/blueprints/aap-ansible-vault.md",
  "docs/modulix/blueprints/aap-disconnected-runtime.md",
  "docs/modulix/blueprints/aap-hashicorp-vault.md",
  "docs/modulix/blueprints/aap-rhel10-host-preparation.md",
  "docs/modulix/blueprints/ubuntu-container-aio.md",
  "docs/modulix/blueprints/vsphere-template-lifecycle.md",
  "docs/modulix/building-blocks/coredns.md",
  "docs/modulix/building-blocks/dhcp.md",
  "docs/modulix/building-blocks/forgejo.md",
  "docs/modulix/building-blocks/keycloak.md",
  "docs/modulix/building-blocks/nexus.md",
  "docs/modulix/installation/disconnected-runtime.md",
  "docs/wunderbox/architecture/incus-runtime.md",
  "docs/wunderbox/architecture/service-stack.md",
  "docs/wunderbox/installation/incus-host.md",
  "docs/wunderbox/installation/openshift-agent-on-incus.md",
  "docs/wunderbox/operations/incus-image-deployment.md",
  "docs/wunderbox/operations/incus-rhel-images.md",
];
const topLevelKeys = [
  "approval_record_digest",
  "content_commit",
  "entries",
  "evidence_classification",
  "human_licensing_review",
  "human_security_review",
  "human_semantic_review",
  "migration_method",
  "schema_version",
  "target_repository",
];
const entryKeys = [
  "approval_status",
  "document_status",
  "sha256",
  "target_path",
];

function exactKeys(value, expected) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    JSON.stringify(Object.keys(value).sort()) === JSON.stringify(expected)
  );
}

function git(...arguments_) {
  return execFileSync("git", arguments_, {
    cwd: repositoryRoot,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function main() {
  const errors = [];
  let index;
  try {
    index = JSON.parse(await readFile(indexPath, "utf8"));
  } catch (error) {
    throw new Error(`Migration target index is not valid JSON: ${error}`);
  }

  if (!exactKeys(index, topLevelKeys)) {
    errors.push("migration target index has missing or unexpected fields");
  }
  if (
    index.schema_version !== 1 ||
    index.evidence_classification !== "PUBLIC" ||
    index.target_repository !== "lightning-it/documentation" ||
    index.content_commit !== expectedContentCommit ||
    index.migration_method !== "INDEPENDENT_REAUTHORING_AND_SANITIZATION"
  ) {
    errors.push("migration target index identity or method is invalid");
  }
  for (const field of [
    "human_semantic_review",
    "human_security_review",
    "human_licensing_review",
  ]) {
    if (index[field] !== "PENDING") {
      errors.push(`${field} must remain PENDING without an approval record`);
    }
  }
  if (index.approval_record_digest !== null) {
    errors.push(
      "approval_record_digest must remain null while reviews are pending",
    );
  }

  try {
    git("merge-base", "--is-ancestor", expectedContentCommit, "HEAD");
  } catch {
    errors.push(
      "indexed content commit is not an ancestor of the current tree",
    );
  }

  const entries = Array.isArray(index.entries) ? index.entries : [];
  const indexedPaths = entries.map((entry) => entry?.target_path);
  if (JSON.stringify(indexedPaths) !== JSON.stringify(expectedTargetPaths)) {
    errors.push(
      "migration target entries are missing, duplicated, or out of order",
    );
  }

  for (const entry of entries) {
    if (!exactKeys(entry, entryKeys)) {
      errors.push("a migration target entry has missing or unexpected fields");
      continue;
    }
    if (
      entry.document_status !== "review-candidate" ||
      entry.approval_status !== "pending"
    ) {
      errors.push(`${entry.target_path}: review status is not pending`);
    }
    if (!/^sha256:[0-9a-f]{64}$/.test(entry.sha256)) {
      errors.push(`${entry.target_path}: checksum is malformed`);
      continue;
    }
    let content;
    try {
      content = git("show", `${expectedContentCommit}:${entry.target_path}`);
    } catch {
      errors.push(
        `${entry.target_path}: file is absent from the indexed commit`,
      );
      continue;
    }
    const checksum = `sha256:${createHash("sha256").update(content).digest("hex")}`;
    if (checksum !== entry.sha256) {
      errors.push(
        `${entry.target_path}: checksum does not match the indexed commit`,
      );
    }
    const text = content.toString("utf8");
    if (
      !/\n\s*status:\s*review-candidate\s*\n/.test(text) ||
      !/\n\s*approval_status:\s*pending\s*\n/.test(text) ||
      !/\n\s*classification:\s*PUBLIC\s*\n/.test(text)
    ) {
      errors.push(
        `${entry.target_path}: indexed metadata is not public and pending`,
      );
    }
  }

  failIfErrors("Public migration target index validation", errors);
  console.log(
    `Validated ${entries.length} public migration targets at ${expectedContentCommit}.`,
  );
}

await main();
