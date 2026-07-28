import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isKnownPublisherAccessBlock,
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

describe("isKnownPublisherAccessBlock", () => {
  it("accepts only exact allowlisted publisher URLs returning 403", () => {
    for (const url of [
      "https://www.iso.org/information-security/it-change-management",
      "https://www.iso.org/standard/78974.html",
    ]) {
      assert.equal(
        isKnownPublisherAccessBlock(url, { status: 403, url }),
        true,
      );
    }
  });

  it("rejects redirects, other paths, other statuses, and malformed URLs", () => {
    assert.equal(
      isKnownPublisherAccessBlock("https://www.iso.org/standard/missing.html", {
        status: 403,
        url: "https://www.iso.org/standard/missing.html",
      }),
      false,
    );
    assert.equal(
      isKnownPublisherAccessBlock("https://www.iso.org/standard/78974.html", {
        status: 403,
        url: "https://example.org/",
      }),
      false,
    );
    assert.equal(
      isKnownPublisherAccessBlock("https://www.iso.org/standard/78974.html", {
        status: 404,
        url: "https://www.iso.org/standard/78974.html",
      }),
      false,
    );
    assert.equal(
      isKnownPublisherAccessBlock("not a URL", {
        status: 403,
        url: "not a URL",
      }),
      false,
    );
  });
});
