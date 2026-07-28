import path from "node:path";

import matter from "gray-matter";
import { parse as parseYaml } from "yaml";

import {
  failIfErrors,
  readText,
  repositoryPath,
  repositoryRoot,
  sha256,
  walkFiles,
  writeEvidence,
} from "./lib/validation.mjs";

const docsDirectory = path.join(repositoryRoot, "docs");

function yamlEngine(value) {
  return parseYaml(value);
}

function sidebarId(filePath, documentId) {
  const directory = path.posix.dirname(
    repositoryPath(filePath).replace(/^docs\//, ""),
  );
  return directory === "." ? documentId : `${directory}/${documentId}`;
}

function quotedOccurrences(source, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...source.matchAll(new RegExp(`["']${escaped}["']`, "g"))].length;
}

async function main() {
  const errors = [];
  const sidebarSource = await readText(
    path.join(repositoryRoot, "sidebars.ts"),
  );
  const registrySource = await readText(
    path.join(repositoryRoot, "config", "canonical-route-registry.json"),
  );
  const registry = JSON.parse(registrySource);
  const areas = registry.areas ?? [];
  const documents = [];

  for (const filePath of await walkFiles(docsDirectory, (candidate) =>
    /\.mdx?$/.test(candidate),
  )) {
    const relativePath = repositoryPath(filePath);
    const parsed = matter(await readText(filePath), {
      engines: { yaml: yamlEngine },
    });
    const { id, slug, document } = parsed.data;
    const canonicalRoute = typeof slug === "string" ? slug : "";
    if (!canonicalRoute) {
      errors.push(`${relativePath}: canonical slug must be a non-empty string`);
    }
    const matches = areas.filter(({ path_prefix: prefix }) =>
      prefix === "/" ? true : canonicalRoute.startsWith(prefix),
    );
    const mostSpecificLength = Math.max(
      ...matches.map(({ path_prefix: prefix }) => prefix.length),
    );
    const owners = matches.filter(
      ({ path_prefix: prefix }) => prefix.length === mostSpecificLength,
    );
    const qualifiedSidebarId = sidebarId(filePath, id);
    const sidebarOccurrences = quotedOccurrences(
      sidebarSource,
      qualifiedSidebarId,
    );

    if (owners.length !== 1) {
      errors.push(`${relativePath}: expected exactly one canonical area owner`);
    }
    if (owners.length === 1 && owners[0].owner !== document?.owner) {
      errors.push(
        `${relativePath}: metadata owner does not match canonical area owner`,
      );
    }
    if (sidebarOccurrences !== 1) {
      errors.push(
        `${relativePath}: sidebar ID ${qualifiedSidebarId} occurs ${sidebarOccurrences} times`,
      );
    }

    documents.push({
      id,
      route: canonicalRoute,
      source: relativePath,
      owner: document?.owner,
      area: owners[0]?.kind ?? "unresolved",
      sidebar_id: qualifiedSidebarId,
    });
  }

  documents.sort((left, right) => left.route.localeCompare(right.route));
  const evidence = {
    schema_version: 1,
    status: errors.length === 0 ? "passed" : "failed",
    canonical_origin: registry.canonical_origin,
    documents,
    totals: {
      canonical_documents: documents.length,
      orphan_documents: errors.filter((error) => error.includes("sidebar ID"))
        .length,
      unresolved_owners: errors.filter((error) =>
        error.includes("canonical area owner"),
      ).length,
    },
    registry_sha256: sha256(registrySource),
  };
  await writeEvidence("canonical-route-inventory.json", evidence);
  failIfErrors("Canonical route and navigation inventory", errors);
  console.log(
    `Validated ${documents.length} canonical documents with one owner and one sidebar location.`,
  );
}

await main();
