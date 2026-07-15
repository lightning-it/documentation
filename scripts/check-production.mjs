import { resolve4, resolve6 } from "node:dns/promises";
import { connect as tlsConnect } from "node:tls";

import {
  deploymentMarkerPath,
  validateDeploymentMarker,
} from "./lib/deployment.mjs";
import { failIfErrors, writeEvidence } from "./lib/validation.mjs";

const expectedOrigin = "https://docs.l-it.io";
const pagesOrigin = "https://lightning-it-documentation.pages.dev";

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
  const response = await fetch(url, {
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
  if (certificateDaysRemaining < 14) {
    errors.push("production TLS certificate expires in fewer than 14 days");
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

  let branchPreview = { status: "not-provided" };
  if (process.env.PREVIEW_URL) {
    const previewUrl = new URL(process.env.PREVIEW_URL);
    const validPreviewHost =
      previewUrl.protocol === "https:" &&
      previewUrl.hostname.endsWith(".lightning-it-documentation.pages.dev") &&
      previewUrl.origin !== pagesOrigin;
    if (!validPreviewHost || previewUrl.pathname !== "/") {
      errors.push("PREVIEW_URL is not a recognized branch-preview origin");
      branchPreview = { status: "invalid" };
    } else {
      const { response } = await fetchWithoutBody(previewUrl);
      const noindex = /\bnoindex\b/i.test(
        response.headers.get("x-robots-tag") ?? "",
      );
      branchPreview = {
        status: response.status === 200 && noindex ? "passed" : "failed",
        hostname: previewUrl.hostname,
        responseStatus: response.status,
        noindex,
      };
      if (branchPreview.status !== "passed") {
        errors.push("branch-preview host is not available with noindex");
      }
    }
  }

  const { response: home, body: homeHtml } = await fetchWithoutBody(baseUrl, {
    body: true,
  });
  if (home.status !== 200 || home.url !== `${expectedOrigin}/`) {
    errors.push("canonical HTTPS home endpoint does not return 200 directly");
  }
  const expectedHeaders = new Map([
    ["content-security-policy", /default-src 'self'/i],
    ["permissions-policy", /camera=\(\)/i],
    ["referrer-policy", /^strict-origin-when-cross-origin$/i],
    ["strict-transport-security", /max-age=/i],
    ["x-content-type-options", /^nosniff$/i],
    ["x-frame-options", /^DENY$/i],
  ]);
  for (const [header, pattern] of expectedHeaders) {
    if (!pattern.test(home.headers.get(header) ?? "")) {
      errors.push(`production response is missing a safe ${header} header`);
    }
  }
  if (/\bnoindex\b/i.test(home.headers.get("x-robots-tag") ?? "")) {
    errors.push(
      "production canonical host is incorrectly excluded from indexing",
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
  if (!homeHtml.includes(`<link rel="canonical" href="${expectedOrigin}/"`)) {
    errors.push("production home page has no exact canonical URL");
  }

  let deployedCommit;
  const { response: markerResponse, body: markerBody } = await fetchWithoutBody(
    `${expectedOrigin}${deploymentMarkerPath}`,
    {
      body: true,
    },
  );
  if (markerResponse.status !== 200) {
    errors.push("production deployment commit marker is unavailable");
  } else {
    try {
      deployedCommit = validateDeploymentMarker(JSON.parse(markerBody));
    } catch (error) {
      errors.push(
        `production deployment commit marker is invalid: ${error.message}`,
      );
    }
  }
  const expectedCommit = process.env.EXPECTED_COMMIT?.trim().toLowerCase();
  if (expectedCommit && !/^[0-9a-f]{40,64}$/.test(expectedCommit)) {
    errors.push("EXPECTED_COMMIT is not a full hexadecimal commit ID");
  } else if (expectedCommit && deployedCommit !== expectedCommit) {
    errors.push("production deployment commit does not match EXPECTED_COMMIT");
  }

  const assetPath = homeHtml.match(/(?:src|href)="(\/assets\/[^"?#]+)"/)?.[1];
  if (!assetPath) {
    errors.push("production home page exposes no hashed static asset");
  } else {
    const { response } = await fetchWithoutBody(
      `${expectedOrigin}${assetPath}`,
    );
    if (
      !/max-age=31536000.*immutable/i.test(
        response.headers.get("cache-control") ?? "",
      )
    ) {
      errors.push(
        "production hashed asset cache policy is not immutable for one year",
      );
    }
  }
  const { response: pagefind } = await fetchWithoutBody(
    `${expectedOrigin}/pagefind/pagefind.js`,
  );
  if (
    !/max-age=3600.*must-revalidate/i.test(
      pagefind.headers.get("cache-control") ?? "",
    )
  ) {
    errors.push("production Pagefind cache policy is not bounded");
  }

  const { response: missing, body: missingHtml } = await fetchWithoutBody(
    `${expectedOrigin}/production-validation-missing-path/`,
    { body: true },
  );
  if (
    missing.status !== 404 ||
    !/<meta[^>]+name="robots"[^>]+noindex/i.test(missingHtml)
  ) {
    errors.push("production custom 404 does not return 404 with noindex");
  }
  if (/<link[^>]+rel="canonical"/i.test(missingHtml)) {
    errors.push("production custom 404 incorrectly emits a canonical URL");
  }
  const missingCsp = missing.headers.get("content-security-policy") ?? "";
  if (
    !missingCsp.includes("default-src 'self'") ||
    !missingCsp.includes("'sha256-") ||
    missingCsp.includes("'unsafe-inline'") ||
    missingCsp.includes("'unsafe-eval'")
  ) {
    errors.push(
      "production arbitrary-path 404 lacks the same strict executable CSP",
    );
  }

  for (const path of ["/robots.txt", "/THIRD_PARTY_NOTICES.txt"]) {
    const { response } = await fetchWithoutBody(`${expectedOrigin}${path}`);
    if (response.status !== 200) {
      errors.push(`production artifact ${path} is unavailable`);
    }
  }

  const { response: sitemapResponse, body: sitemap } = await fetchWithoutBody(
    `${expectedOrigin}/sitemap.xml`,
    { body: true },
  );
  if (sitemapResponse.status !== 200) {
    errors.push("production artifact /sitemap.xml is unavailable");
  }
  const sitemapLocations = [
    ...sitemap.matchAll(/<loc>(https:\/\/docs\.l-it\.io\/[^<]*)<\/loc>/g),
  ]
    .map((match) => match[1])
    .filter(Boolean);
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
          if (
            url.origin !== expectedOrigin ||
            !url.pathname.endsWith("/") ||
            url.search ||
            url.hash
          ) {
            errors.push("production sitemap contains a non-canonical URL");
            continue;
          }
          const { response, body } = await fetchWithoutBody(url, {
            body: true,
          });
          if (
            response.status !== 200 ||
            !body.includes(`<link rel="canonical" href="${url.href}"`)
          ) {
            errors.push(
              `production route ${url.pathname} does not return its exact canonical page`,
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
    status: errors.length === 0 ? "passed" : "failed",
    origin: expectedOrigin,
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
    branchPreview,
    homeStatus: home.status,
    missingStatus: missing.status,
    deployedCommit,
    expectedCommit,
    sitemapRoutes: sitemapLocations.length,
    canonicalRoutesPassed,
  });
  failIfErrors(
    "Production DNS, TLS, header, cache, and route validation",
    errors,
  );
  console.log(
    `Validated production DNS, ${tls.protocol}, headers, caching, and routes.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
