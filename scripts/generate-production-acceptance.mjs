import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  deploymentMarkerPath,
  validateDeploymentMarker,
} from "./lib/deployment.mjs";
import {
  productionMarkerOrigin,
  productionOrigin,
  productionUserAgent,
  safeAcceptanceFailure,
  validateExpectedProductionCommit,
  validateProductionAcceptanceArtifacts,
} from "./lib/production-acceptance.mjs";
import {
  generatedEvidenceDirectory,
  repositoryRoot,
  sha256,
  writeEvidence,
} from "./lib/validation.mjs";

const requiredEvidence = [
  "deployment-commit-validation.json",
  "production-validation.json",
  "external-link-validation.json",
  "lighthouse-validation.json",
];

async function fetchFreshDeploymentMarker(expectedCommit) {
  const markerUrl = new URL(deploymentMarkerPath, productionMarkerOrigin);
  markerUrl.searchParams.set("expected", expectedCommit);
  markerUrl.searchParams.set("acceptance", randomUUID());
  const response = await fetch(markerUrl, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache, no-store",
      pragma: "no-cache",
      "user-agent": productionUserAgent,
    },
    // Keep redirects observable in the final acceptance evidence rather than
    // following them or turning them into an opaque fetch error.
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
  });
  const contentType = response.headers.get("content-type") ?? "";
  const cloudflareRay = response.headers.get("cf-ray") ?? undefined;
  if (response.status !== 200 || !/^application\/json\b/i.test(contentType)) {
    await response.body?.cancel();
    throw new Error(
      `fresh production deployment marker is unavailable or not JSON (HTTP ${response.status}${
        cloudflareRay ? `, Cloudflare Ray ${cloudflareRay}` : ""
      })`,
    );
  }
  const markerText = await response.text();
  let observedCommit;
  try {
    observedCommit = validateDeploymentMarker(JSON.parse(markerText));
  } catch (error) {
    throw new Error(
      `fresh production deployment marker is invalid: ${error.message}`,
    );
  }
  if (observedCommit !== expectedCommit) {
    throw new Error(
      "fresh production deployment marker does not match EXPECTED_COMMIT",
    );
  }
  return {
    origin: productionOrigin,
    markerOrigin: productionMarkerOrigin,
    markerPath: deploymentMarkerPath,
    status: response.status,
    contentType,
    expectedCommit,
    observedCommit,
  };
}

async function main() {
  const expectedCommit = validateExpectedProductionCommit(
    process.env.EXPECTED_COMMIT,
  );

  const evidence = [];
  const records = new Map();
  for (const name of requiredEvidence) {
    const content = await readFile(
      path.join(generatedEvidenceDirectory, name),
      "utf8",
    );
    const parsed = JSON.parse(content);
    records.set(name, parsed);
    evidence.push({
      path: `evidence/generated/${name}`,
      sha256: sha256(content),
    });
  }

  const browserEvidencePath = path.join(
    generatedEvidenceDirectory,
    "production-playwright.json",
  );
  const browserEvidenceContent = await readFile(browserEvidencePath, "utf8");
  const browserEvidence = JSON.parse(browserEvidenceContent);
  validateProductionAcceptanceArtifacts({
    expectedCommit,
    deployment: records.get("deployment-commit-validation.json"),
    production: records.get("production-validation.json"),
    externalLinks: records.get("external-link-validation.json"),
    lighthouse: records.get("lighthouse-validation.json"),
    playwright: browserEvidence,
  });
  evidence.push({
    path: "evidence/generated/production-playwright.json",
    sha256: sha256(browserEvidenceContent),
  });

  const browserReportPath = path.join(
    repositoryRoot,
    "playwright-report",
    "index.html",
  );
  const browserReportContent = await readFile(browserReportPath);
  if (
    browserReportContent.byteLength === 0 ||
    !browserReportContent.subarray(0, 1_024).toString("utf8").includes("html")
  ) {
    throw new Error("Playwright HTML report is empty or malformed.");
  }
  evidence.push({
    path: "playwright-report/index.html",
    sha256: sha256(browserReportContent),
  });

  // This is intentionally the final network operation before recording
  // acceptance, closing the window in which an earlier marker check can age.
  const freshDeploymentMarker =
    await fetchFreshDeploymentMarker(expectedCommit);

  await writeEvidence("production-acceptance.json", {
    schemaVersion: 1,
    status: "passed",
    productionCommit: expectedCommit,
    publicUrl: productionOrigin,
    checks: [
      "deployed commit",
      "DNS, TLS, and HTTP-to-HTTPS redirect",
      "security headers and caching",
      "Brotli or gzip compression for HTML, JavaScript, CSS, and search",
      "complete sitemap canonical crawl and custom 404",
      "pages.dev recovery host noindex",
      "navigation and search smoke journey",
      "accessibility",
      "external links",
      "mobile Lighthouse budgets",
    ],
    evidence,
    browserReport: {
      path: "playwright-report/index.html",
      sha256: sha256(browserReportContent),
    },
    freshDeploymentMarker,
  });
  console.log(`Recorded production acceptance for ${expectedCommit}.`);
}

main().catch(async (error) => {
  try {
    await writeEvidence("production-acceptance.json", {
      schemaVersion: 1,
      status: "failed",
      productionCommit:
        process.env.EXPECTED_COMMIT?.trim().toLowerCase() ?? null,
      publicUrl: productionOrigin,
      failure: safeAcceptanceFailure(error),
    });
  } catch (writeError) {
    console.error(
      `Could not overwrite failed production acceptance evidence: ${writeError.message}`,
    );
  }
  console.error(error.message);
  process.exitCode = 1;
});
