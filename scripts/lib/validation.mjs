import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { htmlFragmentText } from "./html.mjs";

export const repositoryRoot = process.cwd();
export const generatedEvidenceDirectory = path.join(
  repositoryRoot,
  "evidence",
  "generated",
);

export async function walkFiles(directory, predicate = () => true) {
  const files = [];

  async function visit(currentDirectory) {
    const entries = await readdir(currentDirectory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const entryPath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (entry.isFile() && predicate(entryPath)) {
        files.push(entryPath);
      }
    }
  }

  await visit(directory);
  return files;
}

export function repositoryPath(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join("/");
}

export async function readText(filePath) {
  return readFile(filePath, "utf8");
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export async function writeEvidence(name, value) {
  await mkdir(generatedEvidenceDirectory, { recursive: true });
  const target = path.join(generatedEvidenceDirectory, name);
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  return target;
}

export function failIfErrors(label, errors) {
  if (errors.length === 0) {
    return;
  }

  const rendered = errors.map((error) => `- ${error}`).join("\n");
  throw new Error(
    `${label} failed with ${errors.length} error(s):\n${rendered}`,
  );
}

export function normalizedHeadingId(heading) {
  return htmlFragmentText(heading)
    .replace(/\{#[^}]+\}\s*$/, "")
    .replace(/[`*_~]/g, "")
    .trim()
    .toLocaleLowerCase("en-US")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sameOriginPathname(reference, pageUrl, expectedOrigin) {
  try {
    const url = new URL(reference, pageUrl);
    return url.origin === expectedOrigin ? url.pathname : undefined;
  } catch {
    return undefined;
  }
}

export function isMixedContentReference(reference, pageUrl) {
  try {
    return new URL(reference, pageUrl).protocol === "http:";
  } catch {
    return false;
  }
}

export function generatedPageUrl(relativePath, expectedOrigin) {
  const buildPrefix = "build/";
  const buildRelativePath = relativePath.startsWith(buildPrefix)
    ? relativePath.slice(buildPrefix.length)
    : relativePath;
  const indexName = "index.html";
  const publicPath =
    path.posix.basename(buildRelativePath) === indexName
      ? `/${buildRelativePath.slice(0, -indexName.length)}`
      : `/${buildRelativePath}`;
  return new URL(publicPath, `${expectedOrigin}/`);
}

export function canonicalMatchesGeneratedRoute(canonicalUrl, pageUrl) {
  try {
    const canonical = new URL(canonicalUrl);
    const generated = new URL(pageUrl);
    return (
      canonical.origin === generated.origin &&
      canonical.pathname === generated.pathname
    );
  } catch {
    return false;
  }
}

export function isSafeErrorPageReference(reference) {
  if (typeof reference !== "string" || reference.length === 0) {
    return false;
  }
  if (reference.startsWith("#") || reference.startsWith("/")) {
    return true;
  }
  try {
    new URL(reference);
    return true;
  } catch {
    return false;
  }
}

export function stripMarkdownCode(markdown) {
  return markdown
    .replace(/^(```|~~~)[\s\S]*?^\1\s*$/gm, "")
    .replace(/`[^`\n]+`/g, "");
}

export function extractHeadings(markdown) {
  const headings = [];
  const withoutCode = stripMarkdownCode(markdown);

  for (const match of withoutCode.matchAll(/^(#{1,6})\s+(.+?)\s*#*\s*$/gm)) {
    const explicitId = match[2].match(/\{#([^}]+)\}\s*$/)?.[1];
    headings.push({
      level: match[1].length,
      text: match[2].replace(/\s*\{#[^}]+\}\s*$/, "").trim(),
      id: explicitId ?? normalizedHeadingId(match[2]),
    });
  }

  return headings;
}

export function isIpv4(value) {
  const octets = value.split(".").map(Number);
  return (
    octets.length === 4 &&
    octets.every(
      (octet) => Number.isInteger(octet) && octet >= 0 && octet <= 255,
    )
  );
}

export function isApprovedExampleIpv4(value) {
  const [first, second] = value.split(".").map(Number);
  return (
    value === "0.0.0.0" ||
    value === "127.0.0.1" ||
    (first === 192 && second === 0 && value.split(".")[2] === "2") ||
    (first === 198 && second === 51 && value.split(".")[2] === "100") ||
    (first === 203 && second === 0 && value.split(".")[2] === "113")
  );
}

export function cadenceMonths(cadence) {
  return { quarterly: 3, semiannual: 6, annual: 12 }[cadence];
}

export function addUtcMonths(date, months) {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() + months);
  return result;
}
