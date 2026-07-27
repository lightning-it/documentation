export function validateAssetProvenanceRecord(
  relativePath,
  record,
  expectedRepositoryLicense,
) {
  const errors = [];

  if (!record?.license || !record?.origin || !record?.metadata_review) {
    errors.push(`${relativePath}: asset provenance record is incomplete`);
    return errors;
  }

  if (!/repository-native/i.test(record.origin)) {
    return errors;
  }

  if (!expectedRepositoryLicense) {
    errors.push(
      `${relativePath}: repository-native asset license cannot be validated because .lit/repository.yml license_spdx is missing`,
    );
  } else if (record.license !== expectedRepositoryLicense) {
    errors.push(
      `${relativePath}: repository-native asset license must be ${expectedRepositoryLicense}, found ${record.license}`,
    );
  }

  return errors;
}
