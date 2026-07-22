import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("17 — immutable production content passes the public browser journey", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL is required for production acceptance");
  }
  expect(new URL(baseURL).hostname).toBe(
    "lightning-it-documentation.pages.dev",
  );
  const consoleErrors: Array<{ text: string; url: string }> = [];
  const failedRequests: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push({
        text: message.text(),
        url: message.location().url,
      });
    }
  });
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).hostname === new URL(baseURL).hostname) {
      failedRequests.push(new URL(request.url()).pathname);
    }
  });

  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["content-security-policy"]).toContain(
    "default-src 'self'",
  );
  expect(response?.headers()["strict-transport-security"]).toContain(
    "max-age=",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://docs.l-it.io/",
  );
  await page.getByRole("button", { name: /Search products/i }).click();
  await page.getByRole("searchbox").fill("ModuLix");
  await expect(
    page.getByRole("dialog").getByRole("link").first(),
  ).toBeVisible();
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);

  for (const route of ["/modulix/overview/", "/security/"]) {
    const representativeResponse = await page.goto(route);
    expect(representativeResponse?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute(
      "data-has-hydrated",
      "true",
    );
  }
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);

  const missingPath = "/production-acceptance-missing-path/";
  const missing = await page.goto(missingPath);
  expect(missing?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute(
    "data-has-hydrated",
    "true",
  );
  expect(missing?.headers()["content-security-policy"]).toContain(
    "default-src 'self'",
  );
  expect(missing?.headers()["content-security-policy"]).toContain("'sha256-");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/i,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  const expectedMissingUrl = new URL(missingPath, baseURL).href;
  expect(
    consoleErrors.filter(
      (message) =>
        !(
          message.url === expectedMissingUrl &&
          /^Failed to load resource: the server responded with a status of 404\b/.test(
            message.text,
          )
        ),
    ),
  ).toEqual([]);
  expect(failedRequests).toEqual([]);
});
