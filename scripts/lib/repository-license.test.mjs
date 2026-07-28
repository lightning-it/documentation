import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateRepositoryLicense } from "./repository-license.mjs";

function validInputs() {
  return {
    metadata: { license_spdx: "MIT" },
    licenseText: "MIT License\n\nPermission is hereby granted",
    packageManifest: { license: "MIT" },
    lockManifest: { packages: { "": { license: "MIT" } } },
    citationMetadata: { license: "MIT" },
    readme:
      "[![License: MIT](badge)]\nlicensed under the [MIT License](./LICENSE).",
    contributing: "Your contribution is licensed under the MIT License.",
    siteConfig: "Documentation source licensed under MIT.",
    assetProvenance: {
      assets: [
        {
          path: "static/img/example.svg",
          origin: "Raster rendition of the repository-native example",
          license: "MIT",
        },
        {
          path: "static/img/vendor.svg",
          origin: "Third-party example",
          license: "CC-BY-4.0",
        },
      ],
    },
  };
}

describe("validateRepositoryLicense", () => {
  it("accepts consistent MIT declarations", () => {
    assert.deepEqual(validateRepositoryLicense(validInputs()), []);
  });

  it("rejects a representative package metadata mismatch", () => {
    const inputs = validInputs();
    inputs.packageManifest.license = "Apache-2.0";

    assert.deepEqual(validateRepositoryLicense(inputs), [
      "package.json license must be MIT, found Apache-2.0",
    ]);
  });

  it("reports missing text inputs instead of throwing", () => {
    const inputs = validInputs();
    inputs.licenseText = undefined;
    inputs.readme = undefined;
    inputs.contributing = undefined;
    inputs.siteConfig = undefined;
    inputs.assetProvenance = undefined;

    assert.deepEqual(validateRepositoryLicense(inputs), [
      "LICENSE does not start with MIT License",
      "README.md must contain the MIT license badge",
      "README.md must contain the MIT license declaration",
      "CONTRIBUTING.md must contain the MIT contribution declaration",
      "docusaurus.config.ts must contain the MIT license declaration",
      "evidence/asset-provenance.json must contain repository-native assets",
    ]);
  });

  it("preserves third-party licenses while rejecting first-party drift", () => {
    const inputs = validInputs();
    inputs.assetProvenance.assets[0].license = "Apache-2.0";

    assert.deepEqual(validateRepositoryLicense(inputs), [
      "evidence/asset-provenance.json static/img/example.svg license must be MIT, found Apache-2.0",
    ]);
  });

  it("reports every inconsistent first-party declaration", () => {
    const inputs = validInputs();
    inputs.licenseText = "Apache License";
    inputs.lockManifest.packages[""].license = "Apache-2.0";
    inputs.readme = "licensed under Apache License 2.0.";
    inputs.contributing = "Contributions use Apache License 2.0.";

    assert.deepEqual(validateRepositoryLicense(inputs), [
      "LICENSE does not start with MIT License",
      "package-lock.json root license must be MIT, found Apache-2.0",
      "README.md must contain the MIT license badge",
      "README.md must contain the MIT license declaration",
      "CONTRIBUTING.md must contain the MIT contribution declaration",
    ]);
  });
});
