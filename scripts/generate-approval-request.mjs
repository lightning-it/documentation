import { createContentApprovalSnapshot } from "./lib/content-approval.mjs";
import { writeEvidence } from "./lib/validation.mjs";

async function main() {
  const snapshot = await createContentApprovalSnapshot();
  const documentsByApprover = new Map();
  for (const { id, approverRole } of snapshot.documents) {
    const documentIds = documentsByApprover.get(approverRole) ?? [];
    documentIds.push(id);
    documentsByApprover.set(approverRole, documentIds);
  }
  await writeEvidence("document-approval-request.json", {
    schema_version: 2,
    content_tree_sha256: snapshot.contentTreeSha256,
    document_ids: snapshot.documentIds,
    approvals: [...documentsByApprover]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([approverRole, documentIds]) => ({
        approver_role: approverRole,
        document_ids: documentIds.sort(),
        decision: "pending",
        reviewer: null,
        review_date: null,
      })),
  });
  console.log(
    `Generated a non-circular approval request for ${snapshot.documents.length} documents at ${snapshot.contentTreeSha256}.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
