import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { exactCacheControl, exactCacheControlOneOf } from "./cache-control.mjs";

const revalidatedHtml = ["public", "max-age=0", "must-revalidate"];

describe("exactCacheControl", () => {
  it("accepts the exact directives independent of order and case", () => {
    assert.equal(
      exactCacheControl(
        "Must-Revalidate, PUBLIC, MAX-AGE = 0",
        revalidatedHtml,
      ),
      true,
    );
  });

  it("rejects missing, duplicate, malformed, or conflicting policies", () => {
    for (const value of [
      "public, max-age=0, max-age=31536000, must-revalidate, immutable",
      "public, max-age=0, must-revalidate, private",
      "public, must-revalidate",
      "public, max-age=0, max-age=0, must-revalidate",
      "public, max-age=, must-revalidate",
      "",
    ]) {
      assert.equal(exactCacheControl(value, revalidatedHtml), false, value);
    }
  });

  it("permits only an explicitly enumerated live-response addition", () => {
    assert.equal(
      exactCacheControlOneOf(
        "public, max-age=0, must-revalidate, no-transform",
        [revalidatedHtml, [...revalidatedHtml, "no-transform"]],
      ),
      true,
    );
    assert.equal(
      exactCacheControlOneOf("public, max-age=0, must-revalidate, private", [
        revalidatedHtml,
        [...revalidatedHtml, "no-transform"],
      ]),
      false,
    );
  });
});
