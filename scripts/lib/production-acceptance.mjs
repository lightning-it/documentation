export const productionOrigin = "https://docs.l-it.io";
// The custom domain is protected by Cloudflare's public WAF.  The Pages host
// is the same deployment and supplies an immutable marker without weakening
// that protection for GitHub-hosted production acceptance runners.
export const productionMarkerOrigin =
  "https://lightning-it-documentation.pages.dev";
export const productionMarkerPath = "/deployment-commit.json";
export const productionUserAgent =
  "Lightning-IT-Documentation-Production-Acceptance/1.0";
export const representativeLighthouseRoutes = [
  "/",
  "/modulix/overview/",
  "/security/",
];
export const productionLighthouseThresholds = {
  performance: 0.9,
  accessibility: 0.95,
  "best-practices": 0.95,
  seo: 0.95,
};

const fullCommitPattern = /^[0-9a-f]{40,64}$/;

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function exactKeys(value, keys) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).sort().join("\n") === [...keys].sort().join("\n")
  );
}

function hasArtifactIdentity(record, expectedCommit) {
  return (
    record?.schemaVersion === 1 &&
    record.status === "passed" &&
    record.origin === productionOrigin &&
    record.sourceCommit === expectedCommit
  );
}

export function validateExpectedProductionCommit(value) {
  const commit = value?.trim().toLowerCase();
  if (!commit || !fullCommitPattern.test(commit)) {
    throw new Error("EXPECTED_COMMIT must be a full hexadecimal commit ID.");
  }
  return commit;
}

function validateDeploymentEvidence(record, expectedCommit) {
  requireCondition(
    record?.schemaVersion === 1 &&
      record.status === "passed" &&
      record.origin === productionOrigin &&
      record.markerOrigin === productionMarkerOrigin &&
      record.markerPath === productionMarkerPath &&
      record.expectedCommit === expectedCommit &&
      record.observedCommit === expectedCommit &&
      Number.isInteger(record.attempts) &&
      record.attempts >= 1,
    "deployment evidence is not bound to the accepted production commit",
  );
}

function validateProductionEvidence(record, expectedCommit) {
  const routeCountsAreComplete =
    Number.isInteger(record?.sitemapRoutes) &&
    Number.isInteger(record?.canonicalRoutesPassed) &&
    record.sitemapRoutes >= 40 &&
    record.canonicalRoutesPassed === record.sitemapRoutes;
  const dnsIsAvailable =
    typeof record?.dnsAnswerFamilies?.ipv4 === "boolean" &&
    typeof record?.dnsAnswerFamilies?.ipv6 === "boolean" &&
    (record.dnsAnswerFamilies.ipv4 || record.dnsAnswerFamilies.ipv6);
  const tlsIsSafe =
    record?.tls?.authorized === true &&
    new Set(["TLSv1.2", "TLSv1.3"]).has(record.tls.protocol) &&
    Number.isInteger(record.tls.certificateDaysRemaining) &&
    record.tls.certificateDaysRemaining >= 14;
  const redirectIsExact =
    new Set([301, 302, 307, 308]).has(record?.httpRedirectStatus) &&
    record.httpRedirectLocation === `${productionOrigin}/`;

  requireCondition(
    record?.schemaVersion === 1 &&
      record.status === "passed" &&
      record.origin === productionOrigin &&
      record.expectedCommit === expectedCommit &&
      record.deployedCommit === expectedCommit &&
      dnsIsAvailable &&
      tlsIsSafe &&
      redirectIsExact &&
      record.pagesHost?.status === 200 &&
      record.pagesHost?.noindex === true &&
      record.homeStatus === 200 &&
      record.missingStatus === 404 &&
      routeCountsAreComplete,
    "production evidence is not bound to the exact origin, commit, and complete healthy route set",
  );
}

function validateExternalLinkEvidence(record, expectedCommit) {
  const countsAreComplete =
    Number.isInteger(record?.checkedLinks) &&
    record.checkedLinks > 0 &&
    Number.isInteger(record.passingLinks) &&
    Number.isInteger(record.failingLinks) &&
    record.failingLinks === 0 &&
    record.passingLinks === record.checkedLinks &&
    Array.isArray(record.results) &&
    record.results.length === record.checkedLinks;
  const seenUrls = new Set();
  const resultsArePassing =
    countsAreComplete &&
    record.results.every((result) => {
      if (
        result?.ok !== true ||
        !Number.isInteger(result.status) ||
        result.status < 200 ||
        result.status >= 400
      ) {
        return false;
      }
      try {
        const url = new URL(result.url);
        if (
          url.protocol !== "https:" ||
          url.origin === productionOrigin ||
          seenUrls.has(url.href)
        ) {
          return false;
        }
        seenUrls.add(url.href);
        return true;
      } catch {
        return false;
      }
    });

  requireCondition(
    hasArtifactIdentity(record, expectedCommit) && resultsArePassing,
    "external-link evidence is stale, incomplete, or contains failing results",
  );
}

function validateLighthouseEvidence(record, expectedCommit) {
  const thresholdKeys = Object.keys(productionLighthouseThresholds);
  const thresholdsAreExact =
    exactKeys(record?.thresholds, thresholdKeys) &&
    thresholdKeys.every(
      (category) =>
        typeof record.thresholds[category] === "number" &&
        record.thresholds[category] ===
          productionLighthouseThresholds[category],
    );
  const resultsAreExact =
    Array.isArray(record?.results) &&
    record.results.length === representativeLighthouseRoutes.length &&
    record.results.every((result, index) => {
      if (
        result?.route !== representativeLighthouseRoutes[index] ||
        !exactKeys(result.scores, thresholdKeys)
      ) {
        return false;
      }
      return thresholdKeys.every((category) => {
        const score = result.scores[category];
        return (
          typeof score === "number" &&
          Number.isFinite(score) &&
          score >= record.thresholds[category] &&
          score <= 1
        );
      });
    });

  requireCondition(
    hasArtifactIdentity(record, expectedCommit) &&
      record.profile === "mobile" &&
      record.serverProfile === "external-production" &&
      thresholdsAreExact &&
      resultsAreExact,
    "Lighthouse evidence is stale, below budget, or not the exact external production route set",
  );
}

function validatePlaywrightEvidence(record, expectedCommit) {
  const metadata = record?.config?.metadata;
  const project = record?.config?.projects?.[0];
  const suite = record?.suites?.[0];
  const spec = suite?.specs?.[0];
  const browserTest = spec?.tests?.[0];
  const lastResult = browserTest?.results?.at(-1);
  const metadataIsExact =
    metadata?.schemaVersion === 1 &&
    metadata.mode === "production" &&
    metadata.origin === productionOrigin &&
    metadata.expectedCommit === expectedCommit &&
    metadata.sourceCommit === expectedCommit;
  const soleProjectAndSpec =
    Array.isArray(record?.config?.projects) &&
    record.config.projects.length === 1 &&
    project?.id === "production" &&
    project.name === "production" &&
    Array.isArray(record.suites) &&
    record.suites.length === 1 &&
    suite?.file === "production.spec.ts" &&
    (!Array.isArray(suite.suites) || suite.suites.length === 0) &&
    Array.isArray(suite.specs) &&
    suite.specs.length === 1 &&
    spec?.file === "production.spec.ts" &&
    spec.ok === true &&
    Array.isArray(spec.tests) &&
    spec.tests.length === 1 &&
    browserTest?.projectId === "production" &&
    browserTest.projectName === "production" &&
    browserTest.expectedStatus === "passed" &&
    browserTest.status === "expected" &&
    Array.isArray(browserTest.results) &&
    browserTest.results.length >= 1 &&
    lastResult?.status === "passed";
  const errorsAndStatsPass =
    Array.isArray(record?.errors) &&
    record.errors.length === 0 &&
    record.stats?.expected === 1 &&
    record.stats?.skipped === 0 &&
    record.stats?.unexpected === 0 &&
    record.stats?.flaky === 0 &&
    typeof record.stats.duration === "number" &&
    Number.isFinite(record.stats.duration) &&
    record.stats.duration >= 0;

  requireCondition(
    metadataIsExact && soleProjectAndSpec && errorsAndStatsPass,
    "Playwright evidence is stale, incomplete, flaky, or not the sole production browser journey",
  );
}

export function validateProductionAcceptanceArtifacts({
  expectedCommit,
  deployment,
  production,
  externalLinks,
  lighthouse,
  playwright,
}) {
  const commit = validateExpectedProductionCommit(expectedCommit);
  validateDeploymentEvidence(deployment, commit);
  validateProductionEvidence(production, commit);
  validateExternalLinkEvidence(externalLinks, commit);
  validateLighthouseEvidence(lighthouse, commit);
  validatePlaywrightEvidence(playwright, commit);
  return commit;
}

export function safeAcceptanceFailure(error) {
  return {
    name: typeof error?.name === "string" ? error.name : "Error",
    message: String(error?.message ?? error).replace(
      /\?[^\s]*/g,
      "?[redacted]",
    ),
  };
}
