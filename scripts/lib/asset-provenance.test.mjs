import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateAssetProvenanceRecord } from "./asset-provenance.mjs";

const relativePath = "static/img/example.svg";
const repositoryLicense = "MIT";

function validRecord(overrides = {}) {
  return {
    license: "MIT",
    origin: "Repository-native example",
    metadata_review: "No embedded metadata",
    ...overrides,
  };
}

describe("validateAssetProvenanceRecord", () => {
  it("accepts a complete repository-native MIT record", () => {
    assert.deepEqual(
      validateAssetProvenanceRecord(
        relativePath,
        validRecord(),
        repositoryLicense,
      ),
      [],
    );
  });

  it("uses the expected repository license supplied by managed metadata", () => {
    assert.deepEqual(
      validateAssetProvenanceRecord(
        relativePath,
        validRecord({ license: "Apache-2.0" }),
        "Apache-2.0",
      ),
      [],
    );
  });

  it("accepts a complete third-party record under its own license", () => {
    assert.deepEqual(
      validateAssetProvenanceRecord(
        relativePath,
        validRecord({
          license: "CC-BY-4.0",
          origin: "Third-party example",
        }),
        repositoryLicense,
      ),
      [],
    );
  });

  it("rejects a repository-native record under another license", () => {
    assert.deepEqual(
      validateAssetProvenanceRecord(
        relativePath,
        validRecord({
          license: "CC-BY-4.0",
          origin: "Raster rendition of the repository-native example",
        }),
        repositoryLicense,
      ),
      [
        "static/img/example.svg: repository-native asset license must be MIT, found CC-BY-4.0",
      ],
    );
  });

  it("rejects incomplete provenance records", () => {
    assert.deepEqual(
      validateAssetProvenanceRecord(
        relativePath,
        validRecord({ license: "" }),
        repositoryLicense,
      ),
      ["static/img/example.svg: asset provenance record is incomplete"],
    );
  });
});
