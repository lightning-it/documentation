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

  if (
    /repository-native/i.test(record.origin) &&
    record.license !== expectedRepositoryLicense
  ) {
    errors.push(
      `${relativePath}: repository-native asset license must be ${expectedRepositoryLicense ?? "(missing)"}, found ${record.license}`,
    );
  }

  return errors;
}
