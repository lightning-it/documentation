import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  createTraceabilityOutput,
  validateTraceability,
} from "./github-traceability.mjs";

const read = async (path) =>
  JSON.parse(await readFile(new URL(`../../${path}`, import.meta.url)));

const readText = async (path) =>
  readFile(new URL(`../../${path}`, import.meta.url), "utf8");

test("the accepted public fixture is complete and deterministic", async () => {
  const config = await read("config/github-traceability.json");
  const snapshot = await read("evidence/github-traceability-snapshot.json");
  const committed = await read("static/traceability/index.json");
  assert.deepEqual(
    validateTraceability(config, snapshot, new Date("2026-08-29T08:00:00Z")),
    [],
  );
  assert.deepEqual(createTraceabilityOutput(config, snapshot), committed);
});

test("private, partial, rate-limited, and stale candidates fail visibly", async () => {
  const config = await read("config/github-traceability.json");
  const snapshot = await read("evidence/github-traceability-snapshot.json");
  snapshot.repository.visibility = "PRIVATE";
  snapshot.complete = false;
  snapshot.rate_limit.remaining = 0;
  snapshot.repository.observed_at = "2020-01-01T00:00:00Z";
  const errors = validateTraceability(
    config,
    snapshot,
    new Date("2026-07-29T08:00:00Z"),
  ).join("\n");
  assert.match(errors, /not public/);
  assert.match(errors, /partial/);
  assert.match(errors, /rate limit/);
  assert.match(errors, /stale/);
});

test("malformed numeric and URL inputs are rejected without coercion", async () => {
  const config = await read("config/github-traceability.json");
  const snapshot = await read("evidence/github-traceability-snapshot.json");
  snapshot.pagination.pages = "1";
  snapshot.rate_limit.remaining = "4999";
  snapshot.objects[0].url = 42;
  const errors = validateTraceability(
    config,
    snapshot,
    new Date("2026-07-29T08:00:00Z"),
  ).join("\n");
  assert.match(errors, /page count is invalid/);
  assert.match(errors, /rate limit value is invalid/);
  assert.match(errors, /URL is outside/);
});

test("an existing aged snapshot is isolated without accepting invalid time", async () => {
  const config = await read("config/github-traceability.json");
  const snapshot = await read("evidence/github-traceability-snapshot.json");
  const now = new Date("2026-08-29T08:00:00Z");

  snapshot.repository.observed_at = "2020-01-01T00:00:00Z";
  assert.match(validateTraceability(config, snapshot, now).join("\n"), /stale/);
  assert.doesNotMatch(
    validateTraceability(config, snapshot, now, {
      allowStaleExisting: true,
    }).join("\n"),
    /stale/,
  );

  for (const observedAt of ["not-a-date", "2026-08-30T00:00:00Z"]) {
    snapshot.repository.observed_at = observedAt;
    assert.match(
      validateTraceability(config, snapshot, now, {
        allowStaleExisting: true,
      }).join("\n"),
      /invalid observation time/,
    );
  }
});

test("CI keeps changed contracts and the weekly monitor on strict freshness", async () => {
  const pullRequestWorkflow = await readText(
    ".github/workflows/documentation-ci.yml",
  );
  const scheduledWorkflow = await readText(
    ".github/workflows/scheduled-validation.yml",
  );

  for (const protectedPath of [
    ".github/workflows/documentation-ci.yml",
    ".github/workflows/scheduled-validation.yml",
    "config/github-traceability.json",
    "evidence/github-traceability-review.json",
    "evidence/github-traceability-snapshot.json",
    "package.json",
    "scripts/generate-github-traceability.mjs",
    "scripts/lib/github-traceability.mjs",
    "scripts/lib/github-traceability.test.mjs",
    "static/traceability/index.json",
  ]) {
    assert.match(
      pullRequestWorkflow,
      new RegExp(`^\\s*${protectedPath.replaceAll(".", "\\.")}$`, "m"),
    );
  }
  assert.match(pullRequestWorkflow, /npm run test:github-traceability:fresh/);
  assert.match(scheduledWorkflow, /npm run test:github-traceability:fresh/);
});
