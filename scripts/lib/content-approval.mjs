import { readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { parse as parseYaml } from "yaml";

import {
  repositoryPath,
  repositoryRoot,
  sha256,
  walkFiles,
} from "./validation.mjs";

function yamlEngine(value) {
  return parseYaml(value);
}

export async function createContentApprovalSnapshot() {
  const files = await walkFiles(
    path.join(repositoryRoot, "docs"),
    (filePath) => filePath.endsWith(".md") || filePath.endsWith(".mdx"),
  );
  const documents = [];

  for (const filePath of files) {
    const content = await readFile(filePath, "utf8");
    const { data } = matter(content, { engines: { yaml: yamlEngine } });
    documents.push({
      id: data.id,
      path: repositoryPath(filePath),
      sha256: sha256(content),
      status: data.document?.status,
      approvalStatus: data.document?.approval_status,
      approverRole: data.document?.approver,
    });
  }

  documents.sort((left, right) => left.path.localeCompare(right.path));
  const tree = documents
    .map(({ path: filePath, sha256: digest }) => `${digest}  ${filePath}`)
    .join("\n");
  return {
    contentTreeSha256: sha256(tree),
    documents,
    documentIds: documents.map(({ id }) => id).sort(),
  };
}
