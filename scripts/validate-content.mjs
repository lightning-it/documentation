import { execFileSync } from "node:child_process";
import { access, readFile, readdir } from "node:fs/promises";
import { isIP } from "node:net";
import { TextDecoder } from "node:util";
import path from "node:path";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";

import {
  extractHeadings,
  failIfErrors,
  isApprovedExampleIpv4,
  isIpv4,
  readText,
  repositoryPath,
  repositoryRoot,
  sha256,
  stripMarkdownCode,
  walkFiles,
  writeEvidence,
} from "./lib/validation.mjs";

const docsDirectory = path.join(repositoryRoot, "docs");
const schemaPath = path.join(
  repositoryRoot,
  "config",
  "document-metadata.schema.json",
);
const textExtensions = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsonc",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);
const scanRoots = [
  ".github",
  ".lit",
  "config",
  "docs",
  "evidence",
  "scripts",
  "src",
  "static",
  "tests",
];
const rootScanFiles = [
  "AGENTS.md",
  "ARCHITECTURE.md",
  "CHANGELOG.md",
  "CITATION.cff",
  "CONTRIBUTING.md",
  "OPENSSF.md",
  "README.md",
  "RELEASE.md",
  "SECURITY.md",
  "SUPPORT.md",
  "TESTING.md",
  "docusaurus.config.ts",
  "eslint.config.mjs",
  "package.json",
  "playwright.config.ts",
  "sidebars.ts",
  "tsconfig.json",
  "vitest.config.ts",
];

function yamlEngine(value) {
  return parseYaml(value);
}

function removeFrontMatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function lineNumberAt(value, index) {
  return value.slice(0, index).split("\n").length;
}

function linkDestination(rawDestination) {
  const trimmed = rawDestination.trim();
  if (trimmed.startsWith("<") && trimmed.includes(">")) {
    return trimmed.slice(1, trimmed.indexOf(">"));
  }

  return trimmed.replace(/\s+(?:"[^"]*"|'[^']*'|\([^)]*\))\s*$/, "");
}

function markdownLinks(markdown) {
  const links = [];
  const content = stripMarkdownCode(removeFrontMatter(markdown));
  const expression = /(!?)\[([^\]]*)\]\(([^)\n]*)\)/g;

  for (const match of content.matchAll(expression)) {
    links.push({
      image: match[1] === "!",
      label: match[2].trim(),
      destination: linkDestination(match[3]),
      line: lineNumberAt(content, match.index ?? 0),
    });
  }

  for (const match of content.matchAll(/<(https?:\/\/[^>]+)>/g)) {
    links.push({
      image: false,
      label: match[1],
      destination: match[1],
      line: lineNumberAt(content, match.index ?? 0),
    });
  }

  return links;
}

function normalizeAnchor(value) {
  try {
    return decodeURIComponent(value).toLocaleLowerCase("en-US");
  } catch {
    return value.toLocaleLowerCase("en-US");
  }
}

function secretFindings(filePath, content, { scanContactData = true } = {}) {
  const findings = [];
  const patterns = [
    [
      "private key material",
      /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
    ],
    ["GitHub token", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/],
    ["GitHub fine-grained token", /\bgithub_pat_[A-Za-z0-9_]{20,}\b/],
    ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
    ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
    ["bearer credential", /\bBearer\s+[A-Za-z0-9._~+/-]{20,}={0,2}\b/i],
    ["credential in URL", /https?:\/\/[^\s/@:]+:[^\s/@]+@/i],
    ["Ansible Vault payload", new RegExp("\\$" + "ANSIBLE_VAULT;")],
    [
      "private DNS suffix",
      /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:internal|intranet|lan|local)\b/i,
    ],
  ];

  for (const [label, pattern] of patterns) {
    if (pattern.test(content)) {
      findings.push(`${repositoryPath(filePath)}: possible ${label}`);
    }
  }

  for (const match of content.matchAll(
    /(?<![\w.])(?:\d{1,3}\.){3}\d{1,3}(?![\w.])/g,
  )) {
    const value = match[0];
    const containingLine = content.slice(
      content.lastIndexOf("\n", match.index ?? 0) + 1,
      content.indexOf("\n", match.index ?? 0) === -1
        ? content.length
        : content.indexOf("\n", match.index ?? 0),
    );
    if (
      isIpv4(value) &&
      !isApprovedExampleIpv4(value) &&
      !containingLine.includes("data:image/svg+xml")
    ) {
      findings.push(
        `${repositoryPath(filePath)}:${lineNumberAt(content, match.index ?? 0)}: non-example IPv4 address`,
      );
    }
  }

  for (const match of content.matchAll(
    /(?<![A-Za-z0-9])(?:[A-Fa-f0-9]{0,4}:){2,7}[A-Fa-f0-9]{0,4}(?![A-Za-z0-9])/g,
  )) {
    const value = match[0];
    if (
      isIP(value) === 6 &&
      value !== "::" &&
      value !== "::1" &&
      !value.toLocaleLowerCase("en-US").startsWith("2001:db8:")
    ) {
      findings.push(
        `${repositoryPath(filePath)}:${lineNumberAt(content, match.index ?? 0)}: non-example IPv6 address`,
      );
    }
  }

  if (scanContactData) {
    for (const match of content.matchAll(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    )) {
      if (match[0].toLocaleLowerCase("en-US").endsWith("@example.com")) {
        continue;
      }
      findings.push(
        `${repositoryPath(filePath)}:${lineNumberAt(content, match.index ?? 0)}: non-example email address`,
      );
    }

    for (const match of content.matchAll(
      /(?:\+\d[\d ().-]{7,}\d|\b\d{3}[- ]\d{3}[- ]\d{4}\b)/g,
    )) {
      findings.push(
        `${repositoryPath(filePath)}:${lineNumberAt(content, match.index ?? 0)}: possible telephone number`,
      );
    }
  }

  const assignmentPattern =
    /\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|password|passwd|secret)\s*[:=]\s*["']?([^\s"'`,;}{]{8,})/gi;
  for (const match of content.matchAll(assignmentPattern)) {
    const candidate = match[1];
    if (
      !/^(?:example|placeholder|redacted|changeme|<|\$\{|process\.)/i.test(
        candidate,
      )
    ) {
      findings.push(
        `${repositoryPath(filePath)}:${lineNumberAt(content, match.index ?? 0)}: possible assigned credential`,
      );
    }
  }

  const genericSecretPattern =
    /\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|cloudflare[_-]?(?:api[_-]?)?token|password|passwd|secret)\s*[:=]\s*["']?([A-Za-z0-9_+/-]{20,}={0,2})/gi;
  for (const match of content.matchAll(genericSecretPattern)) {
    const candidate = match[1];
    const counts = new Map();
    for (const character of candidate) {
      counts.set(character, (counts.get(character) ?? 0) + 1);
    }
    const entropy = [...counts.values()].reduce((total, count) => {
      const probability = count / candidate.length;
      return total - probability * Math.log2(probability);
    }, 0);
    if (
      entropy >= 3.5 &&
      !/^(?:example|placeholder|redacted|changeme)/i.test(candidate)
    ) {
      findings.push(
        `${repositoryPath(filePath)}:${lineNumberAt(content, match.index ?? 0)}: high-entropy credential candidate`,
      );
    }
  }

  return findings;
}

function gitObjectRecord(line) {
  const separator = line.indexOf(" ");
  const objectId = separator === -1 ? line : line.slice(0, separator);
  const objectPath = separator === -1 ? null : line.slice(separator + 1);

  if (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(objectId)) {
    throw new Error("Git returned an invalid object identifier");
  }

  return { objectId, objectPath: objectPath || null };
}

function decodeHistoryTextBlob(buffer) {
  if (buffer.includes(0)) {
    return null;
  }

  try {
    const content = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    for (const character of content) {
      const codePoint = character.codePointAt(0);
      if (
        codePoint !== undefined &&
        codePoint < 32 &&
        ![9, 10, 12, 13].includes(codePoint)
      ) {
        return null;
      }
    }
    return content;
  } catch {
    return null;
  }
}

function isGeneratedNpmLockfile(objectPath) {
  return objectPath === "package-lock.json";
}

async function walkPublicTree(directory) {
  const ignoredDirectories = new Set([
    ".docusaurus",
    ".git",
    "build",
    "node_modules",
    "playwright-report",
    "test-results",
  ]);
  const files = [];

  async function visit(currentDirectory) {
    for (const entry of await readdir(currentDirectory, {
      withFileTypes: true,
    })) {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
        continue;
      }
      const entryPath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (
        entry.isFile() &&
        !repositoryPath(entryPath).startsWith("evidence/generated/")
      ) {
        files.push(entryPath);
      }
    }
  }

  await visit(directory);
  return files;
}

function pngMetadataChunks(buffer) {
  const metadataChunks = [];
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    if (["eXIf", "iCCP", "iTXt", "tEXt", "tIME", "zTXt"].includes(type)) {
      metadataChunks.push(type);
    }
    offset += length + 12;
    if (type === "IEND") {
      break;
    }
  }
  return metadataChunks;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const errors = [];
  const schema = JSON.parse(await readText(schemaPath));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validateMetadata = ajv.compile(schema);
  const documentationFiles = await walkFiles(
    docsDirectory,
    (filePath) => filePath.endsWith(".md") || filePath.endsWith(".mdx"),
  );
  const documentByPath = new Map();
  const ids = new Map();
  const routes = new Map();
  const routeSet = new Set(["/"]);
  const sidebarSource = await readText(
    path.join(repositoryRoot, "sidebars.ts"),
  );

  for (const match of sidebarSource.matchAll(/\bslug:\s*["'](\/[^"']*)["']/g)) {
    routeSet.add(match[1]);
  }

  for (const filePath of documentationFiles) {
    const relativePath = repositoryPath(filePath);
    const source = await readText(filePath);
    let parsed;

    try {
      parsed = matter(source, { engines: { yaml: yamlEngine } });
    } catch (error) {
      errors.push(
        `${relativePath}: invalid YAML front matter (${error.message})`,
      );
      continue;
    }

    if (!validateMetadata(parsed.data)) {
      for (const validationError of validateMetadata.errors ?? []) {
        errors.push(
          `${relativePath}: front matter${validationError.instancePath || "/"} ${validationError.message}`,
        );
      }
    }

    if (
      parsed.data.document?.approval_status === "pending" &&
      parsed.data.document?.status !== "review-candidate"
    ) {
      errors.push(
        `${relativePath}: pending human approval requires review-candidate status`,
      );
    }
    if (
      parsed.data.document?.approval_status === "approved" &&
      parsed.data.document?.status === "review-candidate"
    ) {
      errors.push(
        `${relativePath}: approved content must advance beyond review-candidate status`,
      );
    }

    const { id, slug } = parsed.data;
    if (typeof id === "string") {
      if (ids.has(id)) {
        errors.push(
          `${relativePath}: duplicate document id ${id} (also ${ids.get(id)})`,
        );
      } else {
        ids.set(id, relativePath);
      }
    }

    if (typeof slug === "string") {
      if (slug !== "/" && !slug.endsWith("/")) {
        errors.push(
          `${relativePath}: slug must end with / for the source URL convention`,
        );
      }
      if (slug.includes("//") || /[?#]/.test(slug)) {
        errors.push(`${relativePath}: slug is not a clean absolute route`);
      }
      if (routes.has(slug)) {
        errors.push(
          `${relativePath}: duplicate slug ${slug} (also ${routes.get(slug)})`,
        );
      } else {
        routes.set(slug, relativePath);
        routeSet.add(slug);
      }
    }

    const headings = extractHeadings(parsed.content);
    const headingIds = new Set();
    if (headings.filter(({ level }) => level === 1).length !== 1) {
      errors.push(`${relativePath}: expected exactly one level-one heading`);
    }
    for (let index = 0; index < headings.length; index += 1) {
      const heading = headings[index];
      if (!heading.id) {
        errors.push(
          `${relativePath}: heading has no stable generated anchor (${heading.text})`,
        );
      } else if (headingIds.has(heading.id)) {
        errors.push(`${relativePath}: duplicate heading anchor #${heading.id}`);
      }
      headingIds.add(heading.id);
      if (index > 0 && heading.level > headings[index - 1].level + 1) {
        errors.push(
          `${relativePath}: heading level jumps before “${heading.text}”`,
        );
      }
    }

    documentByPath.set(path.normalize(filePath), {
      relativePath,
      source,
      headings: headingIds,
      links: markdownLinks(source),
    });
  }

  for (const [filePath, document] of documentByPath) {
    for (const link of document.links) {
      const { destination } = link;
      const location = `${document.relativePath}:${link.line}`;
      if (!destination || destination.startsWith("#")) {
        if (destination.startsWith("#")) {
          const anchor = normalizeAnchor(destination.slice(1));
          if (!document.headings.has(anchor)) {
            errors.push(`${location}: missing local heading anchor #${anchor}`);
          }
        }
        continue;
      }
      if (/^(?:mailto:|tel:)/i.test(destination)) {
        continue;
      }
      if (/^(?:javascript|data|file|vscode):/i.test(destination)) {
        errors.push(`${location}: unsafe link scheme`);
        continue;
      }
      if (/^http:\/\//i.test(destination)) {
        errors.push(`${location}: external links must use HTTPS`);
        continue;
      }
      if (/^https:\/\//i.test(destination)) {
        if (link.image) {
          errors.push(
            `${location}: remote images are not reproducible; store a reviewed asset locally`,
          );
        }
        continue;
      }

      const [withoutFragment, rawFragment] = destination.split("#", 2);
      const withoutQuery = withoutFragment.split("?", 1)[0];
      if (withoutQuery.startsWith("/")) {
        if (link.image) {
          const staticTarget = path.join(
            repositoryRoot,
            "static",
            withoutQuery,
          );
          if (!(await exists(staticTarget))) {
            errors.push(`${location}: missing static image ${withoutQuery}`);
          }
        } else if (!routeSet.has(withoutQuery)) {
          errors.push(
            `${location}: unknown absolute documentation route ${withoutQuery}`,
          );
        }
        continue;
      }

      const resolvedTarget = path.normalize(
        path.resolve(path.dirname(filePath), withoutQuery),
      );
      if (!resolvedTarget.startsWith(repositoryRoot + path.sep)) {
        errors.push(`${location}: relative link escapes the repository`);
        continue;
      }
      if (!(await exists(resolvedTarget))) {
        errors.push(`${location}: missing relative target ${withoutQuery}`);
        continue;
      }
      if (rawFragment && documentByPath.has(resolvedTarget)) {
        const anchor = normalizeAnchor(rawFragment);
        if (!documentByPath.get(resolvedTarget).headings.has(anchor)) {
          errors.push(`${location}: target has no heading anchor #${anchor}`);
        }
      }
      if (link.image && !link.label) {
        errors.push(`${location}: image requires meaningful alternative text`);
      }
    }
  }

  const scanFiles = [];
  for (const scanRoot of scanRoots) {
    const absoluteRoot = path.join(repositoryRoot, scanRoot);
    if (!(await exists(absoluteRoot))) {
      continue;
    }
    scanFiles.push(
      ...(await walkFiles(
        absoluteRoot,
        (filePath) =>
          textExtensions.has(path.extname(filePath)) &&
          !repositoryPath(filePath).startsWith("evidence/generated/"),
      )),
    );
  }
  for (const rootFile of rootScanFiles) {
    const filePath = path.join(repositoryRoot, rootFile);
    if (await exists(filePath)) {
      scanFiles.push(filePath);
    }
  }

  const uniqueScanFiles = [
    ...new Set(scanFiles.map((filePath) => path.normalize(filePath))),
  ];
  for (const filePath of uniqueScanFiles) {
    const content = await readFile(filePath, "utf8");
    errors.push(...secretFindings(filePath, content));

    if (/\bModulix\b/.test(content)) {
      errors.push(
        `${repositoryPath(filePath)}: use the product spelling ModuLix`,
      );
    }
    if (/\bWunderBox\b/.test(content)) {
      errors.push(
        `${repositoryPath(filePath)}: use the product spelling Wunderbox`,
      );
    }
  }

  const publicTreeFiles = await walkPublicTree(repositoryRoot);
  const prohibitedFilePatterns = [
    ["secret environment file", /(?:^|\/)\.env(?:\.|$)/i],
    [
      "private package credential file",
      /(?:^|\/)(?:\.npmrc|\.pypirc|\.netrc)$/i,
    ],
    ["credential or key container", /\.(?:jks|key|kdbx|p12|pfx|pem)$/i],
    ["archive", /\.(?:7z|bz2|gz|rar|tar|tgz|xz|zip)$/i],
  ];
  for (const filePath of publicTreeFiles) {
    const relativePath = repositoryPath(filePath);
    for (const [kind, pattern] of prohibitedFilePatterns) {
      if (pattern.test(relativePath)) {
        errors.push(
          `${relativePath}: unexpected ${kind} in the public source tree`,
        );
      }
    }
  }

  const assetManifestPath = path.join(
    repositoryRoot,
    "evidence",
    "asset-provenance.json",
  );
  const assetManifest = JSON.parse(await readText(assetManifestPath));
  const manifestAssets = new Map(
    (assetManifest.assets ?? []).map((asset) => [asset.path, asset]),
  );
  const assetExtensions = new Set([
    ".gif",
    ".jpeg",
    ".jpg",
    ".png",
    ".svg",
    ".webp",
  ]);
  const actualAssets = publicTreeFiles.filter((filePath) =>
    assetExtensions.has(path.extname(filePath).toLocaleLowerCase("en-US")),
  );
  for (const filePath of actualAssets) {
    const relativePath = repositoryPath(filePath);
    const record = manifestAssets.get(relativePath);
    if (!record) {
      errors.push(`${relativePath}: asset has no reviewed provenance record`);
      continue;
    }
    const buffer = await readFile(filePath);
    if (sha256(buffer) !== record.sha256) {
      errors.push(
        `${relativePath}: asset checksum differs from its provenance record`,
      );
    }
    if (
      record.license !== "Apache-2.0" ||
      !record.origin ||
      !record.metadata_review
    ) {
      errors.push(`${relativePath}: asset provenance record is incomplete`);
    }
    if (filePath.endsWith(".png") && pngMetadataChunks(buffer).length > 0) {
      errors.push(`${relativePath}: PNG contains unreviewed metadata chunks`);
    }
    if (filePath.endsWith(".svg")) {
      const svg = buffer.toString("utf8");
      if (
        /<(?:script|foreignObject)\b|\son\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|data:)/i.test(
          svg,
        )
      ) {
        errors.push(`${relativePath}: SVG contains active or external content`);
      }
      if (
        /(?:documentation-mark|social-card)\.svg$/.test(filePath) &&
        !/<title\b|aria-(?:label|labelledby)=/i.test(svg)
      ) {
        errors.push(
          `${relativePath}: SVG has no accessible name or explicit decorative semantics`,
        );
      }
    }
  }
  for (const manifestPath of manifestAssets.keys()) {
    if (
      !actualAssets.some(
        (filePath) => repositoryPath(filePath) === manifestPath,
      )
    ) {
      errors.push(
        `${manifestPath}: provenance record has no corresponding asset`,
      );
    }
  }

  let historyBlobsScanned = 0;
  let historyBinaryBlobsSkipped = 0;
  let historySensitiveBlobs = 0;
  try {
    const objects = execFileSync("git", ["rev-list", "--objects", "--all"], {
      cwd: repositoryRoot,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    const visitedObjectIds = new Set();
    for (const line of objects.split("\n").filter(Boolean)) {
      const { objectId, objectPath } = gitObjectRecord(line);
      if (visitedObjectIds.has(objectId)) {
        continue;
      }
      visitedObjectIds.add(objectId);
      const type = execFileSync("git", ["cat-file", "-t", objectId], {
        cwd: repositoryRoot,
        encoding: "utf8",
      }).trim();
      if (type !== "blob") {
        continue;
      }
      if (objectPath === null) {
        throw new Error("Git returned a blob without its repository path");
      }
      const size = Number(
        execFileSync("git", ["cat-file", "-s", objectId], {
          cwd: repositoryRoot,
          encoding: "utf8",
        }).trim(),
      );
      if (!Number.isSafeInteger(size) || size < 0 || size > 5 * 1024 * 1024) {
        throw new Error("Git returned a blob outside the safe scan limit");
      }
      const blob = execFileSync("git", ["cat-file", "-p", objectId], {
        cwd: repositoryRoot,
        maxBuffer: 6 * 1024 * 1024,
      });
      const content = decodeHistoryTextBlob(blob);
      if (content === null) {
        historyBinaryBlobsSkipped += 1;
        continue;
      }
      historyBlobsScanned += 1;
      if (
        secretFindings(path.join(repositoryRoot, "history-blob"), content, {
          // npm copies public registry deprecation notices into this generated
          // file. Credential and private-network checks remain enabled.
          scanContactData: !isGeneratedNpmLockfile(objectPath),
        }).length > 0
      ) {
        historySensitiveBlobs += 1;
      }
    }
    const authorEmails = execFileSync(
      "git",
      ["log", "--all", "--format=%ae%n%ce"],
      {
        cwd: repositoryRoot,
        encoding: "utf8",
      },
    )
      .split("\n")
      .filter(Boolean);
    if (
      authorEmails.some(
        (email) =>
          !email.endsWith("@users.noreply.github.com") &&
          !email.endsWith("@github.com") &&
          !email.endsWith("@example.com"),
      )
    ) {
      errors.push(
        "Git history contains a non-masked author or committer email address",
      );
    }
  } catch {
    errors.push("Git history could not be inspected safely");
  }
  if (historySensitiveBlobs > 0) {
    errors.push(
      `Git history contains ${historySensitiveBlobs} blob(s) with potential sensitive values`,
    );
  }

  const workflowFiles = uniqueScanFiles.filter((filePath) =>
    repositoryPath(filePath).startsWith(".github/workflows/"),
  );
  for (const filePath of workflowFiles) {
    const content = await readText(filePath);
    for (const match of content.matchAll(
      /^\s*uses:\s*([^\s#]+)\s*(?:#.*)?$/gm,
    )) {
      const action = match[1];
      if (action.startsWith("./")) {
        continue;
      }
      const revision = action.split("@").at(-1);
      if (!/^[a-f0-9]{40}$/.test(revision ?? "")) {
        errors.push(
          `${repositoryPath(filePath)}: action reference must use a full commit SHA`,
        );
      }
    }
  }

  const evidence = {
    schema: repositoryPath(schemaPath),
    documents: documentationFiles.length,
    uniqueDocumentIds: ids.size,
    uniqueDocumentRoutes: routes.size,
    generatedSidebarRoutes: routeSet.size - routes.size - 1,
    scannedTextFiles: uniqueScanFiles.length,
    reviewedAssets: actualAssets.length,
    historyBlobsScanned,
    historyBinaryBlobsSkipped,
    status: errors.length === 0 ? "passed" : "failed",
    sourceDigest: sha256(
      [...documentByPath.values()].map(({ source }) => source).join("\n"),
    ),
  };
  await writeEvidence("content-validation.json", evidence);
  failIfErrors("Content validation", errors);
  console.log(
    `Validated ${evidence.documents} documents, ${evidence.uniqueDocumentRoutes} routes, and ${evidence.scannedTextFiles} public text files.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
