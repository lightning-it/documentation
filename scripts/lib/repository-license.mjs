const LICENSE_HEADERS = {
  MIT: "MIT License",
};

const README_BADGES = {
  MIT: "[![License: MIT]",
};

const README_DECLARATIONS = {
  MIT: "licensed under the [MIT License](./LICENSE).",
};

const CONTRIBUTION_DECLARATIONS = {
  MIT: "licensed under the MIT License.",
};

export function validateRepositoryLicense({
  metadata,
  licenseText,
  packageManifest,
  lockManifest,
  readme,
  contributing,
}) {
  const errors = [];
  const expected = metadata?.license_spdx;

  if (!LICENSE_HEADERS[expected]) {
    errors.push(
      `.lit/repository.yml: unsupported license_spdx ${expected ?? "(missing)"}`,
    );
    return errors;
  }

  if (!licenseText.startsWith(LICENSE_HEADERS[expected])) {
    errors.push(`LICENSE does not start with ${LICENSE_HEADERS[expected]}`);
  }
  if (packageManifest?.license !== expected) {
    errors.push(
      `package.json license must be ${expected}, found ${packageManifest?.license ?? "(missing)"}`,
    );
  }
  if (lockManifest?.packages?.[""]?.license !== expected) {
    errors.push(
      `package-lock.json root license must be ${expected}, found ${lockManifest?.packages?.[""]?.license ?? "(missing)"}`,
    );
  }
  if (!readme.includes(README_BADGES[expected])) {
    errors.push(`README.md must contain the ${expected} license badge`);
  }
  if (!readme.includes(README_DECLARATIONS[expected])) {
    errors.push(`README.md must contain the ${expected} license declaration`);
  }
  if (!contributing.includes(CONTRIBUTION_DECLARATIONS[expected])) {
    errors.push(
      `CONTRIBUTING.md must contain the ${expected} contribution declaration`,
    );
  }

  return errors;
}
