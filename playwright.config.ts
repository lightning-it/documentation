import { execFileSync } from "node:child_process";

import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.BASE_URL;
const externalTestMode = process.env.EXTERNAL_TEST_MODE ?? "production";
const localBaseUrl = "http://127.0.0.1:3000";
const externalModes = new Set(["preview", "production"]);
if (externalBaseUrl && !externalModes.has(externalTestMode)) {
  throw new Error("EXTERNAL_TEST_MODE must be preview or production.");
}

const expectedCommit = externalBaseUrl
  ? (externalTestMode === "preview"
      ? process.env.EXPECTED_PREVIEW_COMMIT
      : process.env.EXPECTED_COMMIT
    )
      ?.trim()
      .toLowerCase()
  : undefined;
if (externalBaseUrl && !/^[0-9a-f]{40,64}$/.test(expectedCommit ?? "")) {
  throw new Error(
    externalTestMode === "preview"
      ? "EXPECTED_PREVIEW_COMMIT must be a full hexadecimal commit ID."
      : "EXPECTED_COMMIT must be a full hexadecimal commit ID.",
  );
}
const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
  encoding: "utf8",
})
  .trim()
  .toLowerCase();
if (!/^[0-9a-f]{40,64}$/.test(sourceCommit)) {
  throw new Error("Playwright source commit must be a full commit ID.");
}
if (externalBaseUrl && sourceCommit !== expectedCommit) {
  throw new Error(
    "Playwright checked-out source commit does not match the expected deployment commit.",
  );
}
const testMode = externalBaseUrl ? externalTestMode : "local";
const targetOrigin = new URL(externalBaseUrl ?? localBaseUrl).origin;
const testOrigin = process.env.CANONICAL_ORIGIN
  ? new URL(process.env.CANONICAL_ORIGIN).origin
  : targetOrigin;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  metadata: {
    schemaVersion: 1,
    mode: testMode,
    origin: testOrigin,
    targetOrigin,
    expectedCommit: expectedCommit ?? null,
    sourceCommit,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  outputDir: "test-results",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL: externalBaseUrl ?? localBaseUrl,
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  webServer: externalBaseUrl
    ? undefined
    : {
        command: "npm run serve -- --port 3000",
        url: localBaseUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: externalBaseUrl
    ? [
        {
          name: externalTestMode,
          testMatch: new RegExp(`${externalTestMode}\\.spec\\.ts$`),
          use: { ...devices["Desktop Chrome"] },
        },
      ]
    : [
        {
          name: "chromium",
          testIgnore: /(?:preview|production)\.spec\.ts/,
          grepInvert: /@mobile/,
          use: { ...devices["Desktop Chrome"] },
        },
        {
          name: "mobile-chromium",
          testIgnore: /(?:preview|production)\.spec\.ts/,
          grep: /@mobile/,
          use: { ...devices["Pixel 7"] },
        },
      ],
});
