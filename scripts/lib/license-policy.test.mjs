import assert from "node:assert/strict";
import test from "node:test";
import { spellingDictionaryException } from "./license-policy.mjs";

const fixture = () => ({
  packagePath: "node_modules/@cspell/dict-de-de",
  packageName: "@cspell/dict-de-de",
  packageVersion: "4.1.3",
  expression: "LGPL-3.0",
  lockMetadata: { version: "4.1.3", dev: true },
  rootManifest: { devDependencies: { "@cspell/dict-de-de": "4.1.3" } },
  files: [{ content: "GNU LESSER GENERAL PUBLIC LICENSE" }],
});

test("permits the pinned spelling-only dictionary with retained license text", () => {
  assert.equal(spellingDictionaryException(fixture()).license, "LGPL-3.0");
});

test("does not allow other packages, versions, licenses, runtime dependencies or missing notices", () => {
  for (const change of [
    { packagePath: "node_modules/other" },
    { packageName: "other" },
    { packageVersion: "4.1.4" },
    { expression: "GPL-3.0" },
    { expression: "LGPL-3.0 OR GPL-3.0" },
    { lockMetadata: { version: "4.1.4", dev: true } },
    { lockMetadata: { version: "4.1.3", dev: false } },
    { rootManifest: { dependencies: { "@cspell/dict-de-de": "4.1.3" } } },
    { rootManifest: { devDependencies: { "@cspell/dict-de-de": "^4.1.3" } } },
    { files: [] },
  ]) {
    assert.equal(
      spellingDictionaryException({ ...fixture(), ...change }),
      undefined,
    );
  }
});
