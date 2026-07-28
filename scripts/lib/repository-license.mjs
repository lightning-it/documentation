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

const SITE_DECLARATIONS = {
  MIT: "Documentation source licensed under MIT.",
};

export function validateRepositoryLicense({
  metadata,
  licenseText,
  packageManifest,
  lockManifest,
  citationMetadata,
  readme,
  contributing,
  siteConfig,
  assetProvenance,
}) {
  const errors = [];
  const expected = metadata?.license_spdx;

  if (!LICENSE_HEADERS[expected]) {
    errors.push(
      `.lit/repository.yml: unsupported license_spdx ${expected ?? "(missing)"}`,
    );
    return errors;
  }

  if (
    typeof licenseText !== "string" ||
    !licenseText.startsWith(LICENSE_HEADERS[expected])
  ) {
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
  if (citationMetadata?.license !== expected) {
    errors.push(
      `CITATION.cff license must be ${expected}, found ${citationMetadata?.license ?? "(missing)"}`,
    );
  }
  if (typeof readme !== "string" || !readme.includes(README_BADGES[expected])) {
    errors.push(`README.md must contain the ${expected} license badge`);
  }
  if (
    typeof readme !== "string" ||
    !readme.includes(README_DECLARATIONS[expected])
  ) {
    errors.push(`README.md must contain the ${expected} license declaration`);
  }
  if (
    typeof contributing !== "string" ||
    !contributing.includes(CONTRIBUTION_DECLARATIONS[expected])
  ) {
    errors.push(
      `CONTRIBUTING.md must contain the ${expected} contribution declaration`,
    );
  }
  if (
    typeof siteConfig !== "string" ||
    !siteConfig.includes(SITE_DECLARATIONS[expected])
  ) {
    errors.push(
      `docusaurus.config.ts must contain the ${expected} license declaration`,
    );
  }

  const firstPartyAssets = Array.isArray(assetProvenance?.assets)
    ? assetProvenance.assets.filter((record) =>
        /repository-native/i.test(record?.origin ?? ""),
      )
    : [];
  if (firstPartyAssets.length === 0) {
    errors.push(
      "evidence/asset-provenance.json must contain repository-native assets",
    );
  }
  for (const record of firstPartyAssets) {
    if (record.license !== expected) {
      errors.push(
        `evidence/asset-provenance.json ${record.path ?? "(missing path)"} license must be ${expected}, found ${record.license ?? "(missing)"}`,
      );
    }
  }

  return errors;
}
