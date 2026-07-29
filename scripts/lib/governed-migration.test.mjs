import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { evaluateMigration } from "./governed-migration.mjs";

test("every inventory item is reconciled or owned externally", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "migration-"));
  await mkdir(path.join(root, "docs"));
  await writeFile(
    path.join(root, "docs", "one.md"),
    "---\nid: one\nslug: /one/\ndocument:\n  classification: PUBLIC\n  approval_status: approved\n  owner: owner\n---\ntext\n",
  );
  const config = {
    issue: "issue",
    tracked_item_total: 2,
    public_target_paths: ["docs/one.md"],
    protected_external_dependency: {
      count: 1,
      owner: "protected owner",
      details_public: false,
      source_deletion_authorized: false,
    },
    review_requirements: ["reviewer"],
    rollback: {},
  };
  const summary = { tracked_item_total: 2 };
  const legacy = { entries: [{ target_path: "docs/one.md" }] };
  const approval = {
    content_tree_sha256: "tree",
    approvals: [
      {
        decision: "approved",
        approver_role: "reviewer",
        document_ids: ["one"],
      },
    ],
  };
  const { errors, inventory } = await evaluateMigration(
    config,
    summary,
    legacy,
    approval,
    root,
  );
  assert.deepEqual(errors, []);
  assert.equal(inventory.disposition_counts.reconciled_public_targets, 1);
  assert.equal(
    inventory.disposition_counts.owned_protected_external_dependencies,
    1,
  );
  assert.equal(inventory.source_deletion_authorized, false);
});

test("uncovered or disclosure-unsafe inventories fail closed", async () => {
  const config = {
    tracked_item_total: 2,
    public_target_paths: [],
    protected_external_dependency: {
      count: 1,
      owner: "",
      details_public: true,
      source_deletion_authorized: true,
    },
    review_requirements: [],
  };
  const { errors } = await evaluateMigration(
    config,
    { tracked_item_total: 2 },
    { entries: [] },
    { approvals: [] },
    ".",
  );
  assert.match(errors.join("\n"), /do not cover/);
  assert.match(errors.join("\n"), /boundary is incomplete/);
});
