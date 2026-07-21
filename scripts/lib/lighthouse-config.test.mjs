import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveLighthouseRunConfig } from "./lighthouse-config.mjs";

describe("resolveLighthouseRunConfig", () => {
  it("treats blank LIGHTHOUSE_PORT as unset", () => {
    assert.deepEqual(
      resolveLighthouseRunConfig({ LIGHTHOUSE_PORT: "   " }),
      {
        externalBaseUrl: undefined,
        localBaseUrl: "http://127.0.0.1:3100",
        localPort: 3100,
      },
    );
  });

  it("rejects malformed LIGHTHOUSE_PORT values", () => {
    assert.throws(
      () => resolveLighthouseRunConfig({ LIGHTHOUSE_PORT: "3100abc" }),
      /LIGHTHOUSE_PORT must be an integer from 1 to 65535/,
    );
  });

  it("skips local port parsing for external Lighthouse runs", () => {
    assert.deepEqual(
      resolveLighthouseRunConfig({
        LIGHTHOUSE_BASE_URL: " https://example.com/docs ",
        LIGHTHOUSE_PORT: "not-a-number",
      }),
      {
        externalBaseUrl: "https://example.com/docs",
        localBaseUrl: "http://127.0.0.1:3100",
        localPort: 3100,
      },
    );
  });
});
