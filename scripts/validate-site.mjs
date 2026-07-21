import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

import {
  deploymentMarkerPath,
  resolveBuildCommit,
  validateDeploymentMarker,
} from "./lib/deployment.mjs";
import {
  htmlAttribute,
  htmlElements,
  htmlText,
  inlineScriptBodies,
  parseHtmlDocument,
} from "./lib/html.mjs";
import { exactCacheControl } from "./lib/cache-control.mjs";
import {
  canonicalMatchesGeneratedRoute,
  failIfErrors,
  generatedPageUrl,
  isMixedContentReference,
  isSafeErrorPageReference,
  repositoryPath,
  repositoryRoot,
  sameOriginPathname,
  sha256,
  walkFiles,
  writeEvidence,
} from "./lib/validation.mjs";

const expectedOrigin = "https://docs.l-it.io";

function inlineScriptHashes(html) {
  return inlineScriptBodies(html).map(
    (body) =>
      `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`,
  );
}

function headerBlock(headers, pattern, errors) {
  const lines = headers.split(/\r?\n/);
  const matchingBlocks = lines
    .map((line, index) => (line.trim() === pattern ? index : -1))
    .filter((index) => index !== -1);
  const start = matchingBlocks[0] ?? -1;
  if (start === -1) {
    return new Map();
  }
  if (matchingBlocks.length > 1) {
    errors.push(`${pattern}: duplicate header rule blocks are forbidden`);
  }
  const values = new Map();
  for (let index = start + 1; index < lines.length; index += 1) {
    if (lines[index] && !/^\s/.test(lines[index])) {
      break;
    }
    const match = lines[index].match(/^\s+([^:]+):\s*(.+)$/);
    if (match) {
      const name = match[1].toLocaleLowerCase("en-US");
      if (values.has(name)) {
        errors.push(
          `${pattern}: duplicate ${match[1]} header is forbidden because Cloudflare combines its values`,
        );
      } else {
        values.set(name, match[2]);
      }
    }
  }
  return values;
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
  const buildDirectory = path.join(repositoryRoot, "build");
  const errors = [];
  const htmlFiles = await walkFiles(buildDirectory, (filePath) =>
    filePath.endsWith(".html"),
  );
  if (htmlFiles.length < 10) {
    errors.push(
      `expected a complete static site, found only ${htmlFiles.length} HTML files`,
    );
  }

  const canonicalRoutes = new Set();
  const allInlineHashes = new Set();
  let inlineScriptInstances = 0;
  let firstPartyReferences = 0;
  for (const htmlFile of htmlFiles) {
    const relativePath = repositoryPath(htmlFile);
    const html = await readFile(htmlFile, "utf8");
    const document = parseHtmlDocument(html);
    const elements = htmlElements(document);
    const elementsNamed = (name) =>
      elements.filter((element) => element.tagName === name);
    const pageUrl = generatedPageUrl(relativePath, expectedOrigin);
    const is404 =
      relativePath === "build/404.html" ||
      relativePath === "build/404/index.html";
    const htmlTag = elementsNamed("html")[0];
    if (!htmlTag || htmlAttribute(htmlTag, "lang") !== "en") {
      errors.push(`${relativePath}: missing English document language`);
    }
    if (
      !elementsNamed("title").some((title) => htmlText(title).trim().length > 0)
    ) {
      errors.push(`${relativePath}: missing non-empty title`);
    }
    if (
      !elementsNamed("meta").some(
        (element) => htmlAttribute(element, "name") === "viewport",
      )
    ) {
      errors.push(`${relativePath}: missing viewport metadata`);
    }
    if (
      !elementsNamed("meta").some(
        (element) =>
          htmlAttribute(element, "name") === "description" &&
          (htmlAttribute(element, "content")?.length ?? 0) >= 20,
      )
    ) {
      errors.push(`${relativePath}: missing useful meta description`);
    }

    const canonicalTags = elementsNamed("link").filter(
      (element) => htmlAttribute(element, "rel") === "canonical",
    );
    if (elementsNamed("base").length > 0) {
      errors.push(
        `${relativePath}: base elements are forbidden because references resolve from the generated route`,
      );
    }
    const robots = elementsNamed("meta").find(
      (element) => htmlAttribute(element, "name") === "robots",
    );
    const mainElements = elementsNamed("main");
    if (is404) {
      if (canonicalTags.length !== 0) {
        errors.push(
          `${relativePath}: error pages must not declare a canonical URL`,
        );
      }
      if (
        !/(?:^|,)\s*noindex\b/i.test(
          htmlAttribute(robots ?? {}, "content") ?? "",
        )
      ) {
        errors.push(`${relativePath}: error pages must declare robots noindex`);
      }
      if (
        !elementsNamed("title").some((element) =>
          /Page not found/i.test(htmlText(element)),
        )
      ) {
        errors.push(`${relativePath}: custom not-found content is missing`);
      }
      if (
        !mainElements.some(
          (element) => htmlAttribute(element, "data-pagefind-ignore") === "all",
        )
      ) {
        errors.push(
          `${relativePath}: error content must be excluded from Pagefind`,
        );
      }
    } else if (canonicalTags.length !== 1) {
      errors.push(`${relativePath}: expected exactly one canonical URL`);
    } else {
      if (
        !mainElements.some(
          (element) =>
            htmlAttribute(element, "data-pagefind-body") !== undefined,
        )
      ) {
        errors.push(
          `${relativePath}: canonical page does not identify its Pagefind content body`,
        );
      }
      const canonical = htmlAttribute(canonicalTags[0], "href");
      try {
        const canonicalUrl = new URL(canonical);
        if (canonicalUrl.origin !== expectedOrigin) {
          errors.push(`${relativePath}: canonical URL uses the wrong origin`);
        } else if (!canonicalMatchesGeneratedRoute(canonicalUrl, pageUrl)) {
          errors.push(
            `${relativePath}: canonical URL path does not match the generated route`,
          );
        }
        if (
          canonicalUrl.search ||
          canonicalUrl.hash ||
          !canonicalUrl.pathname.endsWith("/")
        ) {
          errors.push(
            `${relativePath}: canonical URL violates the trailing-slash convention`,
          );
        }
        if (canonicalRoutes.has(canonicalUrl.href)) {
          errors.push(
            `${relativePath}: duplicate canonical URL ${canonicalUrl.pathname}`,
          );
        }
        canonicalRoutes.add(canonicalUrl.href);
      } catch {
        errors.push(`${relativePath}: canonical URL is invalid`);
      }
      if (/\bnoindex\b/i.test(htmlAttribute(robots ?? {}, "content") ?? "")) {
        errors.push(`${relativePath}: public documentation must be indexable`);
      }
    }

    if (
      elements.some((element) =>
        ["src", "href"].some((attribute) => {
          const reference = htmlAttribute(element, attribute);
          if (!reference) {
            return false;
          }
          return isMixedContentReference(reference, pageUrl);
        }),
      )
    ) {
      errors.push(
        `${relativePath}: generated HTML contains mixed-content references`,
      );
    }
    if (
      is404 &&
      elements.some((element) =>
        ["src", "href"].some((attribute) => {
          const reference = htmlAttribute(element, attribute);
          return (
            reference !== undefined && !isSafeErrorPageReference(reference)
          );
        }),
      )
    ) {
      errors.push(
        `${relativePath}: error pages must use root-relative or absolute resource references`,
      );
    }
    for (const hash of inlineScriptHashes(html)) {
      inlineScriptInstances += 1;
      allInlineHashes.add(hash);
    }

    for (const element of elements.filter((candidate) =>
      ["a", "link", "script", "img"].includes(candidate.tagName),
    )) {
      const reference =
        htmlAttribute(element, "href") ?? htmlAttribute(element, "src");
      if (!reference || reference.startsWith("#")) {
        continue;
      }
      const localPath = sameOriginPathname(reference, pageUrl, expectedOrigin);
      if (!localPath) {
        continue;
      }
      firstPartyReferences += 1;
      if (localPath.endsWith("/")) {
        if (
          !(await exists(path.join(buildDirectory, localPath, "index.html")))
        ) {
          errors.push(`${relativePath}: broken first-party route ${localPath}`);
        }
      } else {
        const assetPath = path.join(buildDirectory, localPath);
        const routePath = path.join(buildDirectory, localPath, "index.html");
        if (!(await exists(assetPath)) && !(await exists(routePath))) {
          errors.push(
            `${relativePath}: broken first-party asset or route ${localPath}`,
          );
        }
      }
    }
  }

  const sitemapPath = path.join(buildDirectory, "sitemap.xml");
  const sitemap = await readFile(sitemapPath, "utf8");
  const sitemapLocations = new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
  );
  if (
    [...sitemapLocations].some((location) =>
      /\/404(?:\.html)?\/?$/.test(location),
    )
  ) {
    errors.push("sitemap.xml: error routes must be excluded");
  }
  for (const route of canonicalRoutes) {
    if (!sitemapLocations.has(route)) {
      errors.push(
        `sitemap.xml: missing canonical route ${new URL(route).pathname}`,
      );
    }
  }
  for (const location of sitemapLocations) {
    if (!canonicalRoutes.has(location)) {
      errors.push(
        `sitemap.xml: non-canonical route ${new URL(location).pathname}`,
      );
    }
  }

  const robots = await readFile(
    path.join(buildDirectory, "robots.txt"),
    "utf8",
  );
  if (!/^User-agent:\s*\*$/m.test(robots) || !/^Allow:\s*\/$/m.test(robots)) {
    errors.push("robots.txt: public crawling policy is missing");
  }
  if (!robots.includes(`${expectedOrigin}/sitemap.xml`)) {
    errors.push("robots.txt: canonical sitemap URL is missing");
  }

  const headersPath = path.join(buildDirectory, "_headers");
  const headersSource = await readFile(headersPath, "utf8");
  const headerLines = headersSource.split(/\r?\n/);
  const longestHeaderLine = Math.max(...headerLines.map((line) => line.length));
  const headerRules = headerLines.filter(
    (line) => line.length > 0 && !/^\s/.test(line) && !line.startsWith("#"),
  ).length;
  if (longestHeaderLine > 2_000) {
    errors.push(
      `build/_headers: ${longestHeaderLine}-character line exceeds Cloudflare Pages limit`,
    );
  }
  if (headerRules > 100) {
    errors.push(
      `build/_headers: ${headerRules} rules exceed Cloudflare Pages limit`,
    );
  }
  const globalHeaders = headerBlock(headersSource, "/*", errors);
  const requiredHeaders = new Map([
    ["content-security-policy", /default-src 'self'/i],
    ["cross-origin-opener-policy", /^same-origin$/i],
    ["cross-origin-resource-policy", /^same-origin$/i],
    ["permissions-policy", /camera=\(\)/i],
    ["referrer-policy", /^strict-origin-when-cross-origin$/i],
    ["strict-transport-security", /max-age=31536000/i],
    ["x-content-type-options", /^nosniff$/i],
    ["x-frame-options", /^DENY$/i],
  ]);
  for (const [header, expected] of requiredHeaders) {
    if (!expected.test(globalHeaders.get(header) ?? "")) {
      errors.push(`build/_headers: ${header} is missing or unsafe`);
    }
  }
  if (globalHeaders.has("cache-control")) {
    errors.push(
      "build/_headers: the catch-all must not override or combine with path-specific cache policy",
    );
  }
  const csp = globalHeaders.get("content-security-policy") ?? "";
  const scriptSource = csp.match(/(?:^|;)\s*script-src\s+([^;]+)/i)?.[1] ?? "";
  for (const directive of [
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ]) {
    if (!csp.includes(directive)) {
      errors.push(`build/_headers: CSP is missing ${directive}`);
    }
  }
  if (
    scriptSource.includes("'unsafe-inline'") ||
    scriptSource.includes("'unsafe-eval'")
  ) {
    errors.push(
      "build/_headers: script-src must not allow unsafe-inline or unsafe-eval",
    );
  }
  if (headersSource.includes("__LIGHTNING_IT_SCRIPT_HASHES__")) {
    errors.push("build/_headers: unresolved CSP hash marker");
  }
  const authorizedHashes = new Set(
    scriptSource.match(/'sha256-[A-Za-z0-9+/=]+'/g) ?? [],
  );
  for (const hash of allInlineHashes) {
    if (!authorizedHashes.has(hash)) {
      errors.push(
        "build/_headers: an emitted inline script is not authorized by its exact SHA-256 hash",
      );
    }
  }
  for (const hash of authorizedHashes) {
    if (!allInlineHashes.has(hash)) {
      errors.push(
        "build/_headers: script-src contains a stale inline-script hash",
      );
    }
  }

  const assetHeaders = headerBlock(headersSource, "/assets/*", errors);
  if (
    !exactCacheControl(assetHeaders.get("cache-control") ?? "", [
      "public",
      "max-age=31536000",
      "immutable",
    ])
  ) {
    errors.push(
      "build/_headers: hashed assets require a one-year immutable cache policy",
    );
  }
  const searchHeaders = headerBlock(headersSource, "/pagefind/*", errors);
  if (
    !exactCacheControl(searchHeaders.get("cache-control") ?? "", [
      "public",
      "max-age=3600",
      "must-revalidate",
    ])
  ) {
    errors.push("build/_headers: Pagefind assets require bounded revalidation");
  }
  const imageHeaders = headerBlock(headersSource, "/img/*", errors);
  if (
    !exactCacheControl(imageHeaders.get("cache-control") ?? "", [
      "public",
      "max-age=604800",
      "stale-while-revalidate=86400",
    ])
  ) {
    errors.push(
      "build/_headers: image assets require bounded stale revalidation",
    );
  }
  for (const previewRule of [
    "https://:project.pages.dev/*",
    "https://:version.:project.pages.dev/*",
  ]) {
    const previewHeaders = headerBlock(headersSource, previewRule, errors);
    if (!/^noindex$/i.test(previewHeaders.get("x-robots-tag") ?? "")) {
      errors.push(
        `build/_headers: ${previewRule} must be excluded from indexing`,
      );
    }
  }
  if (/\bnoindex\b/i.test(globalHeaders.get("x-robots-tag") ?? "")) {
    errors.push(
      "build/_headers: the canonical custom domain must remain indexable",
    );
  }

  let deploymentCommit;
  try {
    deploymentCommit = validateDeploymentMarker(
      JSON.parse(
        await readFile(
          path.join(buildDirectory, deploymentMarkerPath.slice(1)),
          "utf8",
        ),
      ),
    );
    const expectedCommit = resolveBuildCommit().commit;
    if (deploymentCommit !== expectedCommit) {
      errors.push(
        `build${deploymentMarkerPath}: commit does not match the build source`,
      );
    }
  } catch (error) {
    errors.push(`build${deploymentMarkerPath}: ${error.message}`);
  }

  for (const requiredFile of [
    "404.html",
    "THIRD_PARTY_NOTICES.txt",
    deploymentMarkerPath.slice(1),
    "manifest.webmanifest",
    "pagefind/pagefind.js",
    "pagefind/pagefind-entry.json",
    "robots.txt",
    "sitemap.xml",
  ]) {
    if (!(await exists(path.join(buildDirectory, requiredFile)))) {
      errors.push(
        `build/${requiredFile}: required generated artifact is missing`,
      );
    }
  }

  const pagefindEntry = JSON.parse(
    await readFile(
      path.join(buildDirectory, "pagefind", "pagefind-entry.json"),
      "utf8",
    ),
  );
  const indexedPages = Object.values(pagefindEntry.languages ?? {}).reduce(
    (total, language) => total + (language.page_count ?? 0),
    0,
  );
  if (indexedPages !== canonicalRoutes.size) {
    errors.push(
      `build/pagefind: expected exactly ${canonicalRoutes.size} canonical pages, indexed ${indexedPages}`,
    );
  }

  const redirects = await readFile(
    path.join(buildDirectory, "_redirects"),
    "utf8",
  );
  const redirectSources = new Set();
  const redirectDestinations = new Set();
  const emittedRedirects = [];
  for (const line of redirects.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const [source, destination, status] = trimmed.split(/\s+/);
    if (
      !source ||
      !destination ||
      !/^(?:301|302|307|308)$/.test(status ?? "")
    ) {
      errors.push("build/_redirects: invalid redirect entry");
      continue;
    }
    if (source === destination) {
      errors.push(`build/_redirects: self redirect ${source}`);
    }
    redirectSources.add(source);
    redirectDestinations.add(destination);
    emittedRedirects.push({ source, destination, status: Number(status) });
  }
  for (const destination of redirectDestinations) {
    if (redirectSources.has(destination)) {
      errors.push(`build/_redirects: redirect chain through ${destination}`);
    }
  }

  const redirectManifest = JSON.parse(
    await readFile(
      path.join(repositoryRoot, "evidence", "redirect-manifest.json"),
      "utf8",
    ),
  );
  const expectedRedirects = (redirectManifest.redirects ?? []).map(
    (redirect) => ({
      source: redirect.old_url ?? redirect.old_path ?? redirect.source,
      destination:
        redirect.new_url ?? redirect.new_path ?? redirect.destination,
      status: Number(redirect.redirect_type ?? redirect.status),
    }),
  );
  const redirectIdentity = (redirect) =>
    `${redirect.source}\u0000${redirect.destination}\u0000${redirect.status}`;
  const emittedIdentities = emittedRedirects.map(redirectIdentity).sort();
  const expectedIdentities = expectedRedirects.map(redirectIdentity).sort();
  if (
    JSON.stringify(emittedIdentities) !== JSON.stringify(expectedIdentities)
  ) {
    errors.push(
      "build/_redirects: emitted rules do not exactly match the reviewed redirect manifest",
    );
  }

  const evidence = {
    status: errors.length === 0 ? "passed" : "failed",
    htmlFiles: htmlFiles.length,
    canonicalRoutes: canonicalRoutes.size,
    sitemapRoutes: sitemapLocations.size,
    firstPartyReferences,
    indexedPages,
    inlineScriptInstances,
    uniqueInlineScripts: allInlineHashes.size,
    cspHashes: authorizedHashes.size,
    headerRules,
    longestHeaderLine,
    deploymentCommit,
    buildHeadersSha256: sha256(headersSource),
    sitemapSha256: sha256(sitemap),
  };
  await writeEvidence("static-site-validation.json", evidence);
  failIfErrors("Generated static-site validation", errors);
  console.log(
    `Validated ${evidence.htmlFiles} HTML files, ${evidence.canonicalRoutes} canonical routes, and ${evidence.firstPartyReferences} first-party references.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
