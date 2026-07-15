import { defineConfig, devices } from "@playwright/test";

const productionBaseUrl = process.env.BASE_URL;
const localBaseUrl = "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  outputDir: "test-results",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL: productionBaseUrl ?? localBaseUrl,
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  webServer: productionBaseUrl
    ? undefined
    : {
        command: "npm run serve -- --port 3000",
        url: localBaseUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: productionBaseUrl
    ? [
        {
          name: "production",
          testMatch: /production\.spec\.ts/,
          use: { ...devices["Desktop Chrome"] },
        },
      ]
    : [
        {
          name: "chromium",
          testIgnore: /production\.spec\.ts/,
          grepInvert: /@mobile/,
          use: { ...devices["Desktop Chrome"] },
        },
        {
          name: "mobile-chromium",
          testIgnore: /production\.spec\.ts/,
          grep: /@mobile/,
          use: { ...devices["Pixel 7"] },
        },
      ],
});
