import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isValidGitHubUserIdentity } from "./approval.mjs";

describe("isValidGitHubUserIdentity", () => {
  it("accepts valid GitHub user identities", () => {
    assert.equal(isValidGitHubUserIdentity("@litroc"), true);
    assert.equal(isValidGitHubUserIdentity("@user-name-2"), true);
  });

  it("rejects trailing, consecutive, or leading hyphens", () => {
    assert.equal(isValidGitHubUserIdentity("@user-"), false);
    assert.equal(isValidGitHubUserIdentity("@user--name"), false);
    assert.equal(isValidGitHubUserIdentity("@-user"), false);
  });

  it("rejects teams and usernames longer than GitHub permits", () => {
    assert.equal(isValidGitHubUserIdentity("@lightning-it/maintainers"), false);
    assert.equal(isValidGitHubUserIdentity(`@${"a".repeat(40)}`), false);
  });
});
