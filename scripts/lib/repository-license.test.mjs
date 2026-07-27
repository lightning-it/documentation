import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateRepositoryLicense } from "./repository-license.mjs";

function validInputs() {
  return {
    metadata: { license_spdx: "MIT" },
    licenseText: "MIT License\n\nPermission is hereby granted",
    packageManifest: { license: "MIT" },
    lockManifest: { packages: { "": { license: "MIT" } } },
    readme:
      "[![License: MIT](badge)]\nlicensed under the [MIT License](./LICENSE).",
    contributing: "Your contribution is licensed under the MIT License.",
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
