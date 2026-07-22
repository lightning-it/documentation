import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isVerifiedOwnedCloudflareChallenge } from "./external-links.mjs";

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
