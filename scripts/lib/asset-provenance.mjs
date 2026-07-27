const REPOSITORY_LICENSE = "MIT";

export function validateAssetProvenanceRecord(relativePath, record) {
  const errors = [];

  if (!record?.license || !record?.origin || !record?.metadata_review) {
    errors.push(`${relativePath}: asset provenance record is incomplete`);
    return errors;
  }

  if (
    /repository-native/i.test(record.origin) &&
    record.license !== REPOSITORY_LICENSE
  ) {
    errors.push(
      `${relativePath}: repository-native asset license must be ${REPOSITORY_LICENSE}, found ${record.license}`,
    );
  }

  return errors;
}
