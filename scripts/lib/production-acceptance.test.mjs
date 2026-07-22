import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  productionContentOrigin,
  productionLighthouseExcludedAudits,
  productionLighthouseThresholds,
  productionMarkerOrigin,
  productionOrigin,
  representativeLighthouseRoutes,
  validateProductionAcceptanceArtifacts,
} from "./production-acceptance.mjs";

const expectedCommit = "a".repeat(40);

function passingArtifacts() {
  return {
    expectedCommit,
    deployment: {
      schemaVersion: 1,
      status: "passed",
      origin: productionOrigin,
      markerOrigin: productionMarkerOrigin,
      markerPath: "/deployment-commit.json",
      expectedCommit,
      observedCommit: expectedCommit,
      attempts: 2,
    },
    production: {
      schemaVersion: 1,
      status: "passed",
      origin: productionOrigin,
      contentOrigin: productionContentOrigin,
      markerOrigin: productionMarkerOrigin,
      markerPath: "/deployment-commit.json",
      dnsAnswerFamilies: { ipv4: true, ipv6: false },
      tls: {
        authorized: true,
        protocol: "TLSv1.3",
        certificateDaysRemaining: 30,
      },
      httpRedirectStatus: 301,
      httpRedirectLocation: `${productionOrigin}/`,
      pagesHost: { status: 200, noindex: true },
      edgeStatus: 403,
      edgeCloudflare: true,
      edgeMitigation: "challenge",
      homeStatus: 200,
      missingStatus: 404,
      expectedCommit,
      deployedCommit: expectedCommit,
      sitemapRoutes: 71,
      canonicalRoutesPassed: 71,
    },
    externalLinks: {
      schemaVersion: 1,
      status: "passed",
      origin: productionOrigin,
      sourceCommit: expectedCommit,
      checkedLinks: 1,
      passingLinks: 1,
      failingLinks: 0,
      results: [
        {
          url: "https://www.rfc-editor.org/rfc/rfc9110",
          ok: true,
          status: 200,
        },
      ],
    },
    lighthouse: {
      schemaVersion: 1,
      status: "passed",
      origin: productionOrigin,
      targetOrigin: productionOrigin,
      sourceCommit: expectedCommit,
      profile: "mobile",
      serverProfile: "external-production",
      excludedAudits: [...productionLighthouseExcludedAudits],
      thresholds: { ...productionLighthouseThresholds },
      results: representativeLighthouseRoutes.map((route) => ({
        route,
        scores: {
          performance: 0.92,
          accessibility: 1,
          "best-practices": 1,
          seo: 1,
        },
      })),
    },
    playwright: {
      config: {
        metadata: {
          schemaVersion: 1,
          mode: "production",
          origin: productionOrigin,
          targetOrigin: productionContentOrigin,
          expectedCommit,
          sourceCommit: expectedCommit,
        },
        projects: [{ id: "production", name: "production" }],
      },
      suites: [
        {
          file: "production.spec.ts",
          specs: [
            {
              file: "production.spec.ts",
              ok: true,
              tests: [
                {
                  projectId: "production",
                  projectName: "production",
                  expectedStatus: "passed",
                  status: "expected",
                  results: [{ status: "passed" }],
                },
              ],
            },
          ],
        },
      ],
      errors: [],
      stats: {
        expected: 1,
        skipped: 0,
        unexpected: 0,
        flaky: 0,
        duration: 100,
      },
    },
  };
}

describe("validateProductionAcceptanceArtifacts", () => {
  it("accepts a complete set bound to one origin and commit", () => {
    assert.equal(
      validateProductionAcceptanceArtifacts(passingArtifacts()),
      expectedCommit,
    );

    const unchallengedArtifacts = passingArtifacts();
    unchallengedArtifacts.production.edgeStatus = 200;
    delete unchallengedArtifacts.production.edgeMitigation;
    assert.equal(
      validateProductionAcceptanceArtifacts(unchallengedArtifacts),
      expectedCommit,
    );
  });

  it("rejects missing, fractional, small, or unequal canonical route counts", () => {
    for (const [sitemapRoutes, canonicalRoutesPassed] of [
      [undefined, undefined],
      [39, 39],
      [71.5, 71.5],
      [71, 70],
    ]) {
      const artifacts = passingArtifacts();
      artifacts.production.sitemapRoutes = sitemapRoutes;
      artifacts.production.canonicalRoutesPassed = canonicalRoutesPassed;
      assert.throws(
        () => validateProductionAcceptanceArtifacts(artifacts),
        /complete healthy route set/,
      );
    }
  });

  it("rejects deployment evidence from a marker host other than the native Pages origin", () => {
    const artifacts = passingArtifacts();
    artifacts.deployment.markerOrigin = productionOrigin;
    assert.throws(
      () => validateProductionAcceptanceArtifacts(artifacts),
      /deployment evidence is not bound/,
    );
  });

  it("rejects production evidence from a marker host other than the native Pages origin", () => {
    const artifacts = passingArtifacts();
    artifacts.production.markerOrigin = productionOrigin;
    assert.throws(
      () => validateProductionAcceptanceArtifacts(artifacts),
      /complete healthy route set/,
    );
  });

  it("rejects stale source evidence and unsafe production facts", () => {
    const stale = passingArtifacts();
    stale.externalLinks.sourceCommit = "b".repeat(40);
    assert.throws(
      () => validateProductionAcceptanceArtifacts(stale),
      /external-link evidence is stale/,
    );

    const unsafeTls = passingArtifacts();
    unsafeTls.production.tls.certificateDaysRemaining = 13;
    assert.throws(
      () => validateProductionAcceptanceArtifacts(unsafeTls),
      /complete healthy route set/,
    );

    const indexedRecoveryHost = passingArtifacts();
    indexedRecoveryHost.production.pagesHost.noindex = false;
    assert.throws(
      () => validateProductionAcceptanceArtifacts(indexedRecoveryHost),
      /complete healthy route set/,
    );
  });

  it("rejects missing Lighthouse routes, weakened thresholds, and low scores", () => {
    const missingRoute = passingArtifacts();
    missingRoute.lighthouse.results.pop();
    assert.throws(
      () => validateProductionAcceptanceArtifacts(missingRoute),
      /Lighthouse evidence is stale/,
    );

    const weakThreshold = passingArtifacts();
    weakThreshold.lighthouse.thresholds.performance = 0.1;
    assert.throws(
      () => validateProductionAcceptanceArtifacts(weakThreshold),
      /Lighthouse evidence is stale/,
    );

    const lowScore = passingArtifacts();
    lowScore.lighthouse.results[0].scores.performance = 0.89;
    assert.throws(
      () => validateProductionAcceptanceArtifacts(lowScore),
      /Lighthouse evidence is stale/,
    );
  });

  it("rejects additional Playwright projects/specs and non-passing stats", () => {
    const extraProject = passingArtifacts();
    extraProject.playwright.config.projects.push({
      id: "other",
      name: "other",
    });
    assert.throws(
      () => validateProductionAcceptanceArtifacts(extraProject),
      /Playwright evidence is stale/,
    );

    const skipped = passingArtifacts();
    skipped.playwright.stats.expected = 0;
    skipped.playwright.stats.skipped = 1;
    assert.throws(
      () => validateProductionAcceptanceArtifacts(skipped),
      /Playwright evidence is stale/,
    );
  });
});
