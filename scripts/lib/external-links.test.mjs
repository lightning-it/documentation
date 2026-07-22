import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isRetryableExternalLinkResult,
  isVerifiedOwnedCloudflareChallenge,
} from "./external-links.mjs";

function response(overrides = {}) {
  return {
    status: 403,
    url: "https://www.l-it.io/produkte/lcp",
    headers: new Headers({
      "cf-mitigated": "challenge",
      "cf-ray": "test-ray",
      server: "cloudflare",
    }),
    ...overrides,
  };
}

describe("isVerifiedOwnedCloudflareChallenge", () => {
  it("accepts an exact owned target with Cloudflare challenge evidence", () => {
    assert.equal(
      isVerifiedOwnedCloudflareChallenge(
        "https://l-it.io/produkte/lcp",
        response(),
      ),
      true,
    );
    assert.equal(
      isVerifiedOwnedCloudflareChallenge(
        "https://l-it.io",
        response({ url: "https://www.l-it.io/" }),
      ),
      true,
    );
  });

  it("rejects unknown paths, external hosts, and incomplete evidence", () => {
    assert.equal(
      isVerifiedOwnedCloudflareChallenge("https://l-it.io/missing", response()),
      false,
    );
    assert.equal(
      isVerifiedOwnedCloudflareChallenge(
        "https://example.org/produkte/lcp",
        response(),
      ),
      false,
    );
    assert.equal(
      isVerifiedOwnedCloudflareChallenge(
        "https://l-it.io/produkte/lcp",
        response({ headers: new Headers({ server: "cloudflare" }) }),
      ),
      false,
    );
  });
});

describe("isRetryableExternalLinkResult", () => {
  it("retries transient network and server failures", () => {
    for (const result of [
      { error: "network" },
      { error: "timeout" },
      { status: 429 },
      { status: 500 },
      { status: 503 },
      { status: 599 },
    ]) {
      assert.equal(isRetryableExternalLinkResult(result), true);
    }
  });

  it("does not retry permanent HTTP failures", () => {
    for (const result of [
      { status: 400 },
      { status: 403 },
      { status: 404 },
      { status: 600 },
    ]) {
      assert.equal(isRetryableExternalLinkResult(result), false);
    }
  });
});
