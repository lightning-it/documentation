import assert from "node:assert/strict";
import test from "node:test";
import { digest } from "./evidence-records.mjs";
import {
  createLocaleSearchManifest,
  validateLocaleSearch,
} from "./locale-search.mjs";

const registry = () => ({
  canonical_locale: "en",
  locales: [{ id: "en" }, { id: "de" }],
  versions: [{ id: "current", lifecycle: "current", search_default: true }],
  translations: [
    {
      document_id: "one",
      locale: "de",
      source_version: "1.0",
      route: "/de/one/",
      source_path: "source",
      translation_path: "translation",
      source_sha256: digest("source"),
      translation_status: "current",
      reviewer: "reviewer",
      reviewer_role: "owner",
      reviewed_at: "2026-01-01",
      review_at: "2027-01-01",
    },
  ],
  search: { engine: "pagefind", version: "1", never_index: ["draft"] },
});

test("source drift fails closed instead of silently publishing stale text", () => {
  const inputs = new Map([
    ["source", "changed"],
    ["translation", "translated"],
  ]);
  assert.match(
    validateLocaleSearch(registry(), inputs).join("\n"),
    /must become stale/,
  );
});

test("unreviewed machine output cannot be current", () => {
  const set = registry();
  delete set.translations[0].reviewer;
  const inputs = new Map([
    ["source", "source"],
    ["translation", "translated"],
  ]);
  assert.match(
    validateLocaleSearch(set, inputs).join("\n"),
    /lacks human review/,
  );
});

test("current translations require a bounded parseable review expiry", () => {
  const set = registry();
  delete set.translations[0].review_at;
  const inputs = new Map([
    ["source", "source"],
    ["translation", "translated"],
  ]);
  assert.match(
    validateLocaleSearch(set, inputs).join("\n"),
    /lacks human review/,
  );
});

test("manifest partitions locale and version and disables silent fallback", () => {
  const inputs = new Map([
    ["source", "source"],
    ["translation", "translated"],
  ]);
  const manifest = createLocaleSearchManifest(registry(), inputs);
  assert.equal(manifest.partitions.length, 2);
  assert.equal(manifest.silent_fallback, false);
  assert.equal(manifest.query_telemetry, false);
  assert.equal(manifest.translations[0].route, "/de/one/");
});

test("missing translation arrays remain deterministic and do not crash", () => {
  const set = registry();
  delete set.translations;
  assert.deepEqual(validateLocaleSearch(set, new Map()), []);
  assert.deepEqual(createLocaleSearchManifest(set, new Map()).translations, []);
});

test("translation routes are explicit and locale-scoped", () => {
  const set = registry();
  set.translations[0].route = "/de/wrong";
  const inputs = new Map([
    ["source", "source"],
    ["translation", "translated"],
  ]);
  assert.match(
    validateLocaleSearch(set, inputs).join("\n"),
    /translation route is missing or invalid/,
  );
});
