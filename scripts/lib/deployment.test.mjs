import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveBuildCommit } from "./deployment.mjs";

const cloudflareCommit = "a".repeat(40);
const checkedOutCommit = "b".repeat(40);
const githubEventCommit = "c".repeat(40);

describe("resolveBuildCommit", () => {
  it("prefers the Cloudflare Pages deployment commit", () => {
    assert.deepEqual(
      resolveBuildCommit({
        CF_PAGES_COMMIT_SHA: cloudflareCommit,
        DOCUMENTATION_BUILD_COMMIT: checkedOutCommit,
        GITHUB_SHA: githubEventCommit,
      }),
      { commit: cloudflareCommit, source: "CF_PAGES_COMMIT_SHA" },
    );
  });

  it("can bind a scheduled build to the checked-out branch instead of the event SHA", () => {
    assert.deepEqual(
      resolveBuildCommit({
        DOCUMENTATION_BUILD_COMMIT: checkedOutCommit,
        GITHUB_SHA: githubEventCommit,
      }),
      { commit: checkedOutCommit, source: "DOCUMENTATION_BUILD_COMMIT" },
    );
  });

  it("rejects a malformed explicit checked-out commit", () => {
    assert.throws(
      () =>
        resolveBuildCommit({
          DOCUMENTATION_BUILD_COMMIT: "main",
          GITHUB_SHA: githubEventCommit,
        }),
      /DOCUMENTATION_BUILD_COMMIT does not contain a full hexadecimal commit ID/,
    );
  });
});
