import { readFile } from "node:fs/promises";
import path from "node:path";

import { createContentApprovalSnapshot } from "./lib/content-approval.mjs";
import {
  failIfErrors,
  repositoryRoot,
  writeEvidence,
} from "./lib/validation.mjs";

const approvalEvidencePath = path.join(
  repositoryRoot,
  "evidence",
  "document-approval.json",
);
const approvalAuthoritiesPath = path.join(
  repositoryRoot,
  "evidence",
  "document-approval-authorities.json",
);

function uniqueStrings(value) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    return undefined;
  }
  const unique = new Set(value);
  return unique.size === value.length ? unique : undefined;
}

function isValidReviewDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.valueOf()) &&
    date.toISOString().slice(0, 10) === value &&
    date <= new Date()
  );
}

function parseAuthorityPolicy(policy, errors) {
  const authorizations = new Map();
  if (
    policy.schema_version !== 1 ||
    !Array.isArray(policy.role_authorizations)
  ) {
    errors.push("approval-authority policy has an unsupported structure");
    return authorizations;
  }
  if (policy.status !== "AUTHORIZED") {
    errors.push(
      "approval-authority policy is not authorized by the organization",
    );
  }

  for (const authorization of policy.role_authorizations) {
    const role = authorization.approver_role;
    const reviewers = uniqueStrings(authorization.github_reviewers);
    if (typeof role !== "string" || role.trim().length < 3 || !reviewers) {
      errors.push("approval-authority policy contains an invalid role mapping");
      continue;
    }
    if (authorizations.has(role)) {
      errors.push(
        "approval-authority policy contains a duplicate role mapping",
      );
      continue;
    }
    if (
      [...reviewers].some(
        (reviewer) =>
          !/^@[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})(?:\/[A-Za-z0-9_.-]+)?$/.test(
            reviewer,
          ),
      )
    ) {
      errors.push(
        "approval-authority policy contains an invalid GitHub identity",
      );
      continue;
    }
    authorizations.set(role, reviewers);
  }
  return authorizations;
}

async function main() {
  const snapshot = await createContentApprovalSnapshot();
  const [evidence, policy] = await Promise.all(
    [approvalEvidencePath, approvalAuthoritiesPath].map(async (filePath) =>
      JSON.parse(await readFile(filePath, "utf8")),
    ),
  );
  const errors = [];
  const authorizations = parseAuthorityPolicy(policy, errors);
  const documentsById = new Map(
    snapshot.documents.map((document) => [document.id, document]),
  );
  const requiredRoles = new Set(
    snapshot.documents.map(({ approverRole }) => approverRole),
  );
  const pending = snapshot.documents.filter(
    ({ approvalStatus, status }) =>
      approvalStatus !== "approved" || status !== "maintained",
  );

  if (pending.length > 0) {
    errors.push(
      `${pending.length} document(s) are not marked maintained and approved`,
    );
  }
  for (const role of requiredRoles) {
    if (typeof role !== "string" || !authorizations.has(role)) {
      errors.push(
        "a document approver role has no protected authority mapping",
      );
    } else if (authorizations.get(role).size === 0) {
      errors.push("a document approver role has no authorized GitHub reviewer");
    }
  }
  if (evidence.schema_version !== 2 || !Array.isArray(evidence.approvals)) {
    errors.push("review evidence does not use the supported approval schema");
  }
  const approvalRecords = Array.isArray(evidence.approvals)
    ? evidence.approvals
    : [];
  if (evidence.content_tree_sha256 !== snapshot.contentTreeSha256) {
    errors.push(
      "review evidence does not cover the current documentation tree",
    );
  }

  const topLevelIds = uniqueStrings(evidence.document_ids);
  if (!topLevelIds) {
    errors.push(
      "review evidence has invalid or duplicate top-level document IDs",
    );
  } else if (
    topLevelIds.size !== snapshot.documentIds.length ||
    snapshot.documentIds.some((id) => !topLevelIds.has(id))
  ) {
    errors.push("review evidence does not cover the exact document ID set");
  }

  const coverage = new Map();
  for (const approval of approvalRecords) {
    const role = approval.approver_role;
    const approvedIds = uniqueStrings(approval.document_ids);
    const allowedReviewers = authorizations.get(role);
    if (typeof role !== "string" || !allowedReviewers) {
      errors.push("an approval record uses an unknown approver role");
      continue;
    }
    if (!approvedIds || approvedIds.size === 0) {
      errors.push("an approval record has invalid or duplicate document IDs");
      continue;
    }
    if (approval.decision !== "approved") {
      errors.push("an approval record does not contain an approved decision");
    }
    if (
      typeof approval.reviewer !== "string" ||
      !allowedReviewers.has(approval.reviewer)
    ) {
      errors.push("an approval record reviewer is not authorized for its role");
    }
    if (!isValidReviewDate(approval.review_date)) {
      errors.push("an approval record has no valid, non-future review date");
    }
    for (const id of approvedIds) {
      const document = documentsById.get(id);
      if (!document) {
        errors.push("an approval record contains an unknown document ID");
        continue;
      }
      if (document.approverRole !== role) {
        errors.push("an approval record role does not match document metadata");
      }
      coverage.set(id, (coverage.get(id) ?? 0) + 1);
    }
  }

  const uncovered = snapshot.documentIds.filter(
    (id) => (coverage.get(id) ?? 0) === 0,
  );
  const duplicateCoverage = snapshot.documentIds.filter(
    (id) => (coverage.get(id) ?? 0) > 1,
  );
  if (uncovered.length > 0) {
    errors.push(
      `${uncovered.length} document(s) have no role-matched approval`,
    );
  }
  if (duplicateCoverage.length > 0) {
    errors.push(
      `${duplicateCoverage.length} document(s) have duplicate approval coverage`,
    );
  }

  await writeEvidence("release-approval.json", {
    status: errors.length === 0 ? "passed" : "blocked",
    schemaVersion: evidence.schema_version,
    documents: snapshot.documents.length,
    pendingDocuments: pending.length,
    contentTreeSha256: snapshot.contentTreeSha256,
    evidenceMatchesTree:
      evidence.content_tree_sha256 === snapshot.contentTreeSha256,
    requiredApproverRoles: requiredRoles.size,
    rolesWithAuthorizedReviewers: [...requiredRoles].filter(
      (role) => authorizations.get(role)?.size > 0,
    ).length,
    approvalRecords: approvalRecords.length,
    uncoveredDocuments: uncovered.length,
    duplicateCoverageDocuments: duplicateCoverage.length,
  });
  failIfErrors("Production documentation approval gate", errors);
  console.log(
    `Verified role-matched human approval for ${snapshot.documents.length} documents at ${snapshot.contentTreeSha256}.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
