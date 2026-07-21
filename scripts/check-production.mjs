import { resolve4, resolve6 } from "node:dns/promises";
import { connect as tlsConnect } from "node:tls";

import {
  deploymentMarkerPath,
  validateDeploymentMarker,
} from "./lib/deployment.mjs";
import { exactCacheControlOneOf } from "./lib/cache-control.mjs";
import { hasExactCanonicalUrl } from "./lib/html.mjs";
import {
  productionContentOrigin,
  productionMarkerOrigin,
  productionUserAgent,
} from "./lib/production-acceptance.mjs";
import { failIfErrors, writeEvidence } from "./lib/validation.mjs";

const expectedOrigin = "https://docs.l-it.io";
const pagesOrigin = "https://lightning-it-documentation.pages.dev";
let productionEvidenceWritten = false;

function inspectTls(hostname) {
  return new Promise((resolve, reject) => {
    const socket = tlsConnect(
      {
        host: hostname,
        port: 443,
        servername: hostname,
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
      () => {
        const certificate = socket.getPeerCertificate();
        const result = {
          authorized: socket.authorized,
          protocol: socket.getProtocol(),
          validTo: certificate.valid_to,
        };
        socket.end();
        resolve(result);
      },
    );
    socket.setTimeout(15_000, () => socket.destroy(new Error("TLS timeout")));
    socket.once("error", reject);
  });
}

async function fetchWithoutBody(url, options = {}) {
  const headers = new Headers(options.headers);
  headers.set("user-agent", productionUserAgent);
  const response = await fetch(url, {
    headers,
    redirect: options.redirect ?? "manual",
    signal: AbortSignal.timeout(15_000),
  });
  const body = options.body ? await response.text() : undefined;
  if (!options.body) {
    await response.body?.cancel();
  }
  return { response, body };
}

async function main() {
  const baseUrl = new URL(process.env.BASE_URL ?? expectedOrigin);
  if (baseUrl.origin !== expectedOrigin || baseUrl.pathname !== "/") {
    throw new Error(
      `Production validation is restricted to ${expectedOrigin}/.`,
    );
  }
  const errors = [];
  const expectedHeaders = new Map([
    ["content-security-policy", /default-src 'self'/i],
    ["permissions-policy", /camera=\(\)/i],
    ["referrer-policy", /^strict-origin-when-cross-origin$/i],
    ["strict-transport-security", /max-age=/i],
    ["x-content-type-options", /^nosniff$/i],
    ["x-frame-options", /^DENY$/i],
  ]);
  const compressedRequest = { "accept-encoding": "br, gzip" };

  const [ipv4, ipv6, tls] = await Promise.all([
    resolve4(baseUrl.hostname).catch(() => []),
    resolve6(baseUrl.hostname).catch(() => []),
    inspectTls(baseUrl.hostname),
  ]);
  if (ipv4.length + ipv6.length === 0) {
    errors.push("production hostname has no public DNS answer");
  }
  if (!tls.authorized || !["TLSv1.2", "TLSv1.3"].includes(tls.protocol)) {
    errors.push("production TLS is not authorized with TLS 1.2 or newer");
  }
  const certificateDaysRemaining = Math.floor(
    (new Date(tls.validTo).valueOf() - Date.now()) / 86_400_000,
  );
  if (
    !Number.isInteger(certificateDaysRemaining) ||
    certificateDaysRemaining < 14
  ) {
    errors.push(
      "production TLS certificate expiry is invalid or fewer than 14 days away",
    );
  }

  const { response: insecureHome } = await fetchWithoutBody(
    "http://docs.l-it.io/",
  );
  const insecureLocation = insecureHome.headers.get("location");
  if (
    ![301, 302, 307, 308].includes(insecureHome.status) ||
    insecureLocation !== `${expectedOrigin}/`
  ) {
    errors.push("plain HTTP does not redirect directly to canonical HTTPS");
  }

  const { response: pagesHome } = await fetchWithoutBody(`${pagesOrigin}/`);
  const pagesNoindex = /\bnoindex\b/i.test(
    pagesHome.headers.get("x-robots-tag") ?? "",
  );
  if (pagesHome.status !== 200 || !pagesNoindex) {
    errors.push("production pages.dev host is not available with noindex");
  }

  const { response: edgeHome } = await fetchWithoutBody(baseUrl);
  const edgeIsCloudflare =
    edgeHome.headers.get("server")?.toLowerCase() === "cloudflare" &&
    Boolean(edgeHome.headers.get("cf-ray"));
  const edgeMitigation = edgeHome.headers.get("cf-mitigated");
  const edgeStatusIsValid =
    edgeHome.status === 200 ||
    (edgeHome.status === 403 && edgeMitigation === "challenge");
  if (!edgeStatusIsValid || !edgeIsCloudflare) {
    errors.push("canonical HTTPS edge is not served directly by Cloudflare");
  }

  const { response: home, body: homeHtml } = await fetchWithoutBody(
    `${productionContentOrigin}/`,
    {
      body: true,
      headers: compressedRequest,
    },
  );
  if (home.status !== 200 || home.url !== `${productionContentOrigin}/`) {
    errors.push(
      "immutable production content endpoint does not return 200 directly",
    );
  }
  if (!/^text\/html\b/i.test(home.headers.get("content-type") ?? "")) {
    errors.push("production home endpoint is not served as HTML");
  }
  for (const [header, pattern] of expectedHeaders) {
    if (!pattern.test(home.headers.get(header) ?? "")) {
      errors.push(`production response is missing a safe ${header} header`);
    }
  }
  if (/\bnoindex\b/i.test(edgeHome.headers.get("x-robots-tag") ?? "")) {
    errors.push(
      "production canonical host is incorrectly excluded from indexing",
    );
  }
  if (
    !exactCacheControlOneOf(home.headers.get("cache-control") ?? "", [
      ["public", "max-age=0", "must-revalidate"],
      ["public", "max-age=0", "must-revalidate", "no-transform"],
    ])
  ) {
    errors.push("production HTML cache policy does not require revalidation");
  }
  if (!/^(?:br|gzip)$/i.test(home.headers.get("content-encoding") ?? "")) {
    errors.push(
      "production HTML is not served with Brotli or gzip compression",
    );
  }
  const csp = home.headers.get("content-security-policy") ?? "";
  const scriptSource = csp.match(/(?:^|;)\s*script-src\s+([^;]+)/i)?.[1] ?? "";
  if (
    scriptSource.includes("'unsafe-inline'") ||
    scriptSource.includes("'unsafe-eval'") ||
    !/'sha256-[A-Za-z0-9+/=]+'/.test(scriptSource)
  ) {
    errors.push(
      "production script-src lacks exact hashes or permits unsafe execution",
    );
  }
  if (!hasExactCanonicalUrl(homeHtml, `${expectedOrigin}/`)) {
    errors.push("production home page has no exact canonical URL");
  }

  let deployedCommit;
  const { response: markerResponse, body: markerBody } = await fetchWithoutBody(
    `${productionMarkerOrigin}${deploymentMarkerPath}`,
    {
      body: true,
    },
  );
  if (
    markerResponse.status !== 200 ||
    !/^application\/json\b/i.test(
      markerResponse.headers.get("content-type") ?? "",
    )
  ) {
    errors.push(
      "production deployment commit marker is unavailable or not JSON",
    );
  } else {
    try {
      deployedCommit = validateDeploymentMarker(JSON.parse(markerBody));
    } catch (error) {
      errors.push(
        `production deployment commit marker is invalid: ${error.message}`,
      );
    }
  }
  const expectedCommit = (process.env.EXPECTED_COMMIT ?? "")
    .trim()
    .toLowerCase();
  if (!/^[0-9a-f]{40,64}$/.test(expectedCommit)) {
    errors.push("EXPECTED_COMMIT must be a full hexadecimal commit ID");
  } else if (deployedCommit !== expectedCommit) {
    errors.push("production deployment commit does not match EXPECTED_COMMIT");
  }

  const assetPaths = [".js", ".css"].map((extension) =>
    [...homeHtml.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)]
      .map((match) => match[1])
      .find((assetPath) => assetPath.endsWith(extension)),
  );
  if (assetPaths.some((assetPath) => !assetPath)) {
    errors.push(
      "production home page exposes no hashed JavaScript and CSS assets",
    );
  }
  for (const assetPath of assetPaths.filter(Boolean)) {
    const { response } = await fetchWithoutBody(
      `${productionContentOrigin}${assetPath}`,
      {
        headers: compressedRequest,
      },
    );
    const cacheControl = response.headers.get("cache-control") ?? "";
    const contentEncoding = response.headers.get("content-encoding") ?? "";
    const contentType = response.headers.get("content-type") ?? "";
    const extension = assetPath.endsWith(".js") ? "js" : "css";
    if (
      response.status !== 200 ||
      !new RegExp(`\\.[a-f0-9]{8,}\\.${extension}$`, "i").test(assetPath) ||
      (extension === "js"
        ? !/javascript/i.test(contentType)
        : !/^text\/css\b/i.test(contentType))
    ) {
      errors.push(
        `production asset ${assetPath} lacks a 200 response, fingerprint, or expected media type`,
      );
    }
    if (
      !exactCacheControlOneOf(cacheControl, [
        ["public", "max-age=31536000", "immutable"],
        ["public", "max-age=31536000", "immutable", "no-transform"],
      ])
    ) {
      errors.push(
        `production hashed asset ${assetPath} is not immutable for one year`,
      );
    }
    if (!/^(?:br|gzip)$/i.test(contentEncoding)) {
      errors.push(`production hashed asset ${assetPath} is not compressed`);
    }
  }
  const { response: pagefind } = await fetchWithoutBody(
    `${productionContentOrigin}/pagefind/pagefind.js`,
    { headers: compressedRequest },
  );
  if (
    pagefind.status !== 200 ||
    !/javascript/i.test(pagefind.headers.get("content-type") ?? "")
  ) {
    errors.push("production Pagefind JavaScript is unavailable or mistyped");
  }
  if (
    !exactCacheControlOneOf(pagefind.headers.get("cache-control") ?? "", [
      ["public", "max-age=14400", "must-revalidate"],
      ["public", "max-age=14400", "must-revalidate", "no-transform"],
    ])
  ) {
    errors.push("production Pagefind cache policy is not bounded");
  }
  if (!/^(?:br|gzip)$/i.test(pagefind.headers.get("content-encoding") ?? "")) {
    errors.push("production Pagefind JavaScript is not compressed");
  }

  const { response: missing, body: missingHtml } = await fetchWithoutBody(
    `${productionContentOrigin}/production-validation-missing-path/`,
    { body: true },
  );
  if (
    missing.status !== 404 ||
    !/^text\/html\b/i.test(missing.headers.get("content-type") ?? "") ||
    !/<meta[^>]+name="robots"[^>]+noindex/i.test(missingHtml)
  ) {
    errors.push(
      "production custom 404 does not return HTML with 404 and noindex",
    );
  }
  if (/<link[^>]+rel="canonical"/i.test(missingHtml)) {
    errors.push("production custom 404 incorrectly emits a canonical URL");
  }
  const missingCsp = missing.headers.get("content-security-policy") ?? "";
  const missingScriptSource =
    missingCsp.match(/(?:^|;)\s*script-src\s+([^;]+)/i)?.[1] ?? "";
  if (
    !missingCsp.includes("default-src 'self'") ||
    !/'sha256-[A-Za-z0-9+/=]+'/.test(missingScriptSource) ||
    missingScriptSource.includes("'unsafe-inline'") ||
    missingScriptSource.includes("'unsafe-eval'")
  ) {
    errors.push(
      "production arbitrary-path 404 lacks the same strict executable CSP",
    );
  }

  for (const path of ["/robots.txt", "/THIRD_PARTY_NOTICES.txt"]) {
    const { response } = await fetchWithoutBody(
      `${productionContentOrigin}${path}`,
    );
    if (
      response.status !== 200 ||
      !/^text\/plain\b/i.test(response.headers.get("content-type") ?? "")
    ) {
      errors.push(`production artifact ${path} is unavailable or not text`);
    }
  }

  const { response: sitemapResponse, body: sitemap } = await fetchWithoutBody(
    `${productionContentOrigin}/sitemap.xml`,
    { body: true },
  );
  if (
    sitemapResponse.status !== 200 ||
    !/^(?:application|text)\/xml\b/i.test(
      sitemapResponse.headers.get("content-type") ?? "",
    )
  ) {
    errors.push("production artifact /sitemap.xml is unavailable or not XML");
  }
  const rawSitemapLocations = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(
    (match) => match[1]?.trim(),
  );
  const sitemapLocationTagCount = (sitemap.match(/<loc(?:\s|>)/g) ?? []).length;
  if (
    rawSitemapLocations.length !== sitemapLocationTagCount ||
    rawSitemapLocations.some((location) => !location)
  ) {
    errors.push("production sitemap contains a malformed location element");
  }
  const sitemapLocations = [];
  const seenSitemapLocations = new Set();
  for (const location of rawSitemapLocations.filter(Boolean)) {
    try {
      const url = new URL(location);
      if (
        url.origin !== expectedOrigin ||
        !url.pathname.endsWith("/") ||
        url.search ||
        url.hash ||
        url.href !== location
      ) {
        errors.push("production sitemap contains a non-canonical URL");
        continue;
      }
      if (seenSitemapLocations.has(url.href)) {
        errors.push("production sitemap contains a duplicate URL");
        continue;
      }
      seenSitemapLocations.add(url.href);
      sitemapLocations.push(url.href);
    } catch {
      errors.push("production sitemap contains an invalid URL");
    }
  }
  if (sitemapLocations.length < 40) {
    errors.push("production sitemap does not contain the complete route set");
  }
  let canonicalRoutesPassed = 0;
  const routeQueue = [...sitemapLocations];
  await Promise.all(
    Array.from({ length: Math.min(8, routeQueue.length) }, async () => {
      while (routeQueue.length > 0) {
        const location = routeQueue.shift();
        try {
          const url = new URL(location);
          const contentUrl = new URL(url.pathname, productionContentOrigin);
          const { response, body } = await fetchWithoutBody(contentUrl, {
            body: true,
          });
          if (
            response.status !== 200 ||
            !/^text\/html\b/i.test(
              response.headers.get("content-type") ?? "",
            ) ||
            !hasExactCanonicalUrl(body, url.href)
          ) {
            errors.push(
              `production route ${url.pathname} does not return its exact canonical HTML page`,
            );
          } else {
            canonicalRoutesPassed += 1;
          }
        } catch {
          errors.push("production sitemap route request failed");
        }
      }
    }),
  );

  await writeEvidence("production-validation.json", {
    schemaVersion: 1,
    status: errors.length === 0 ? "passed" : "failed",
    origin: expectedOrigin,
    contentOrigin: productionContentOrigin,
    markerOrigin: productionMarkerOrigin,
    markerPath: deploymentMarkerPath,
    dnsAnswerFamilies: {
      ipv4: ipv4.length > 0,
      ipv6: ipv6.length > 0,
    },
    tls: {
      authorized: tls.authorized,
      protocol: tls.protocol,
      certificateDaysRemaining,
    },
    httpRedirectStatus: insecureHome.status,
    httpRedirectLocation: insecureLocation,
    pagesHost: {
      status: pagesHome.status,
      noindex: pagesNoindex,
    },
    edgeStatus: edgeHome.status,
    edgeCloudflare: edgeIsCloudflare,
    edgeMitigation,
    homeStatus: home.status,
    missingStatus: missing.status,
    deployedCommit,
    expectedCommit,
    sitemapRoutes: sitemapLocations.length,
    canonicalRoutesPassed,
  });
  productionEvidenceWritten = true;
  failIfErrors(
    "Production DNS, TLS, header, cache, and route validation",
    errors,
  );
  console.log(
    `Validated production DNS, ${tls.protocol}, headers, caching, and routes.`,
  );
}

main().catch(async (error) => {
  if (!productionEvidenceWritten) {
    await writeEvidence("production-validation.json", {
      schemaVersion: 1,
      status: "failed",
      origin: expectedOrigin,
      expectedCommit: process.env.EXPECTED_COMMIT?.trim().toLowerCase(),
      failure: {
        name: error.name,
        message: String(error.message).replace(/\?[^\s]*/g, "?[redacted]"),
      },
    });
  }
  console.error(error.message);
  process.exitCode = 1;
});
