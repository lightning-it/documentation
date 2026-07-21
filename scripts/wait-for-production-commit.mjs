import {
  deploymentMarkerPath,
  validateDeploymentMarker,
} from "./lib/deployment.mjs";
import { writeEvidence } from "./lib/validation.mjs";
import { productionUserAgent } from "./lib/production-acceptance.mjs";

const expectedOrigin = "https://docs.l-it.io";

function boundedInteger(name, fallback, minimum, maximum) {
  const raw = process.env[name];
  const value = raw === undefined ? fallback : Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(
      `${name} must be an integer from ${minimum} to ${maximum}.`,
    );
  }
  return value;
}

async function main() {
  const expectedCommit = (process.env.EXPECTED_COMMIT ?? "")
    .trim()
    .toLowerCase();
  if (!/^[0-9a-f]{40,64}$/.test(expectedCommit)) {
    throw new Error("EXPECTED_COMMIT must be a full hexadecimal commit ID.");
  }
  const baseUrl = new URL(process.env.BASE_URL ?? expectedOrigin);
  if (baseUrl.origin !== expectedOrigin || baseUrl.pathname !== "/") {
    throw new Error(`Production polling is restricted to ${expectedOrigin}/.`);
  }

  const maximumAttempts = boundedInteger(
    "PRODUCTION_POLL_MAX_ATTEMPTS",
    60,
    1,
    120,
  );
  const intervalMilliseconds = boundedInteger(
    "PRODUCTION_POLL_INTERVAL_MS",
    10_000,
    100,
    60_000,
  );
  let observedCommit;
  let lastStatus;
  let lastError;
  let lastCloudflareRay;

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    try {
      const markerUrl = new URL(deploymentMarkerPath, baseUrl);
      markerUrl.searchParams.set("expected", expectedCommit);
      markerUrl.searchParams.set("attempt", String(attempt));
      const response = await fetch(markerUrl, {
        cache: "no-store",
        headers: {
          accept: "application/json",
          "cache-control": "no-cache, no-store",
          pragma: "no-cache",
          "user-agent": productionUserAgent,
        },
        redirect: "manual",
        signal: AbortSignal.timeout(5_000),
      });
      lastStatus = response.status;
      lastCloudflareRay = response.headers.get("cf-ray") ?? undefined;
      if (response.ok) {
        observedCommit = validateDeploymentMarker(await response.json());
        if (observedCommit === expectedCommit) {
          await writeEvidence("deployment-commit-validation.json", {
            schemaVersion: 1,
            status: "passed",
            origin: expectedOrigin,
            markerPath: deploymentMarkerPath,
            expectedCommit,
            observedCommit,
            attempts: attempt,
          });
          console.log(
            `Production serves expected commit ${expectedCommit} after ${attempt} attempt(s).`,
          );
          return;
        }
      } else {
        await response.body?.cancel();
        if (attempt === 1 || attempt % 10 === 0) {
          console.warn(
            `Production marker attempt ${attempt} returned HTTP ${lastStatus}` +
              (lastCloudflareRay
                ? ` (Cloudflare Ray ${lastCloudflareRay}).`
                : "."),
          );
        }
      }
      lastError = undefined;
    } catch (error) {
      // A transport failure has no HTTP response of its own. Do not retain
      // diagnostics from a prior polling attempt in the final evidence.
      lastStatus = undefined;
      lastCloudflareRay = undefined;
      lastError =
        error.name === "TimeoutError" ? "request timeout" : error.message;
    }

    if (attempt < maximumAttempts) {
      await new Promise((resolve) => setTimeout(resolve, intervalMilliseconds));
    }
  }

  await writeEvidence("deployment-commit-validation.json", {
    schemaVersion: 1,
    status: "failed",
    origin: expectedOrigin,
    markerPath: deploymentMarkerPath,
    expectedCommit,
    observedCommit,
    attempts: maximumAttempts,
    lastStatus,
    lastCloudflareRay,
    lastError,
  });
  throw new Error(
    `Production did not serve expected commit ${expectedCommit} within ${maximumAttempts} attempt(s).`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
