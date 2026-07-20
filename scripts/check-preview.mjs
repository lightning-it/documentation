import {
  deploymentMarkerPath,
  validateDeploymentMarker,
} from "./lib/deployment.mjs";
import { exactCacheControlOneOf } from "./lib/cache-control.mjs";
import { hasExactCanonicalUrl } from "./lib/html.mjs";
import { failIfErrors, writeEvidence } from "./lib/validation.mjs";

const expectedOrigin = "https://develop.lightning-it-documentation.pages.dev";
let previewEvidenceWritten = false;

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

async function fetchResponse(
  url,
  { body = false, headers = {}, timeoutMilliseconds = 15_000 } = {},
) {
  const response = await fetch(url, {
    cache: "no-store",
    headers,
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMilliseconds),
  });
  const responseBody = body ? await response.text() : undefined;
  if (!body) {
    await response.body?.cancel();
  }
  return { response, body: responseBody };
}

async function waitForCommit(previewUrl, expectedCommit) {
  const maximumAttempts = boundedInteger(
    "PREVIEW_POLL_MAX_ATTEMPTS",
    60,
    1,
    120,
  );
  const intervalMilliseconds = boundedInteger(
    "PREVIEW_POLL_INTERVAL_MS",
    10_000,
    100,
    60_000,
  );
  const deadlineMilliseconds = boundedInteger(
    "PREVIEW_POLL_DEADLINE_MS",
    360_000,
    30_000,
    480_000,
  );
  const startedAt = Date.now();
  const deadline = startedAt + deadlineMilliseconds;
  let observedCommit;
  let lastStatus;
  let lastError;
  let attempts = 0;

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    const remainingMilliseconds = deadline - Date.now();
    if (remainingMilliseconds <= 0) {
      break;
    }
    attempts = attempt;
    try {
      const markerUrl = new URL(deploymentMarkerPath, previewUrl);
      markerUrl.searchParams.set("expected", expectedCommit);
      markerUrl.searchParams.set("attempt", String(attempt));
      const { response, body } = await fetchResponse(markerUrl, {
        body: true,
        headers: { "cache-control": "no-cache" },
        timeoutMilliseconds: Math.max(
          1,
          Math.min(5_000, remainingMilliseconds),
        ),
      });
      lastStatus = response.status;
      if (response.status === 200) {
        const contentType = response.headers.get("content-type") ?? "";
        if (!/^application\/json\b/i.test(contentType)) {
          lastError = "deployment marker is not JSON";
        } else {
          observedCommit = validateDeploymentMarker(JSON.parse(body));
          if (observedCommit === expectedCommit) {
            return {
              attempts: attempt,
              elapsedMilliseconds: Date.now() - startedAt,
              observedCommit,
            };
          }
          lastError = "commit mismatch";
        }
      } else {
        lastError = `HTTP ${response.status}`;
      }
    } catch (error) {
      lastError =
        error.name === "TimeoutError" ? "request timeout" : error.message;
    }
    const remainingAfterRequest = deadline - Date.now();
    if (attempt < maximumAttempts && remainingAfterRequest > 0) {
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          Math.min(intervalMilliseconds, remainingAfterRequest),
        ),
      );
    }
  }
  throw new Error(
    `preview did not serve the expected commit after ${attempts} attempt(s) within ${deadlineMilliseconds}ms; status=${lastStatus ?? "none"}; ${lastError ?? "commit mismatch"}`,
  );
}

async function main() {
  const previewUrl = new URL(process.env.PREVIEW_URL ?? expectedOrigin);
  if (previewUrl.origin !== expectedOrigin || previewUrl.pathname !== "/") {
    throw new Error(`Preview validation is restricted to ${expectedOrigin}/.`);
  }
  const expectedCommit = (process.env.EXPECTED_PREVIEW_COMMIT ?? "")
    .trim()
    .toLowerCase();
  if (!/^[0-9a-f]{40,64}$/.test(expectedCommit)) {
    throw new Error(
      "EXPECTED_PREVIEW_COMMIT must be a full hexadecimal commit ID.",
    );
  }

  const deployment = await waitForCommit(previewUrl, expectedCommit);
  const compressedHeaders = { "accept-encoding": "br, gzip" };
  const [{ response: home, body: homeHtml }, { response: search }, missing] =
    await Promise.all([
      fetchResponse(previewUrl, { body: true, headers: compressedHeaders }),
      fetchResponse(new URL("pagefind/pagefind.js", previewUrl), {
        headers: compressedHeaders,
      }),
      fetchResponse(new URL("preview-validation-missing-path/", previewUrl), {
        body: true,
      }),
    ]);

  const errors = [];
  const requiredHeaders = new Map([
    ["content-security-policy", /default-src 'self'/i],
    ["permissions-policy", /camera=\(\)/i],
    ["referrer-policy", /^strict-origin-when-cross-origin$/i],
    ["strict-transport-security", /max-age=/i],
    ["x-content-type-options", /^nosniff$/i],
    ["x-frame-options", /^DENY$/i],
  ]);
  if (
    home.status !== 200 ||
    !/^text\/html\b/i.test(home.headers.get("content-type") ?? "")
  ) {
    errors.push("preview home does not return HTML with status 200");
  }
  if (!/\bnoindex\b/i.test(home.headers.get("x-robots-tag") ?? "")) {
    errors.push("preview home is not excluded from indexing");
  }
  for (const [header, pattern] of requiredHeaders) {
    if (!pattern.test(home.headers.get(header) ?? "")) {
      errors.push(`preview response is missing a safe ${header} header`);
    }
  }
  if (
    !exactCacheControlOneOf(home.headers.get("cache-control") ?? "", [
      ["public", "max-age=0", "must-revalidate"],
      ["public", "max-age=0", "must-revalidate", "no-transform"],
    ])
  ) {
    errors.push("preview HTML cache policy is not exact revalidation");
  }
  if (!/^(?:br|gzip)$/i.test(home.headers.get("content-encoding") ?? "")) {
    errors.push("preview HTML is not compressed");
  }
  if (
    !hasExactCanonicalUrl(homeHtml, "https://docs.l-it.io/") ||
    !homeHtml.includes("Search public documentation")
  ) {
    errors.push("preview home lacks canonical or search markup");
  }
  if (
    search.status !== 200 ||
    !/javascript/i.test(search.headers.get("content-type") ?? "") ||
    !exactCacheControlOneOf(search.headers.get("cache-control") ?? "", [
      ["public", "max-age=3600", "must-revalidate"],
      ["public", "max-age=3600", "must-revalidate", "no-transform"],
    ]) ||
    !/^(?:br|gzip)$/i.test(search.headers.get("content-encoding") ?? "")
  ) {
    errors.push(
      "preview search asset lacks status, type, cache, or compression",
    );
  }
  if (
    missing.response.status !== 404 ||
    !/^text\/html\b/i.test(
      missing.response.headers.get("content-type") ?? "",
    ) ||
    !/<meta[^>]+name="robots"[^>]+noindex/i.test(missing.body) ||
    /<link[^>]+rel="canonical"/i.test(missing.body)
  ) {
    errors.push("preview custom 404 is unsafe or incorrectly canonicalized");
  }

  await writeEvidence("preview-validation.json", {
    schemaVersion: 1,
    status: errors.length === 0 ? "passed" : "failed",
    origin: expectedOrigin,
    expectedCommit,
    observedCommit: deployment.observedCommit,
    attempts: deployment.attempts,
    pollElapsedMilliseconds: deployment.elapsedMilliseconds,
    homeStatus: home.status,
    noindex: /\bnoindex\b/i.test(home.headers.get("x-robots-tag") ?? ""),
    searchStatus: search.status,
    missingStatus: missing.response.status,
  });
  previewEvidenceWritten = true;
  failIfErrors("Protected develop preview validation", errors);
  console.log(`Validated exact-commit preview ${expectedCommit}.`);
}

main().catch(async (error) => {
  if (!previewEvidenceWritten) {
    await writeEvidence("preview-validation.json", {
      schemaVersion: 1,
      status: "failed",
      origin: expectedOrigin,
      expectedCommit: process.env.EXPECTED_PREVIEW_COMMIT?.trim().toLowerCase(),
      failure: {
        name: error.name,
        message: String(error.message).replace(/\?[^\s]*/g, "?[redacted]"),
      },
    });
  }
  console.error(error.message);
  process.exitCode = 1;
});
