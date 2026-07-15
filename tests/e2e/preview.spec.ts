import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("protected develop preview passes the public browser journey", async ({
  page,
  baseURL,
}) => {
  const expectedHost = "develop.lightning-it-documentation.pages.dev";
  expect(new URL(baseURL ?? "").hostname).toBe(expectedHost);
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).hostname === expectedHost) {
      failedRequests.push(new URL(request.url()).pathname);
    }
  });

  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["x-robots-tag"]).toMatch(/noindex/i);
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

  const missing = await page.goto("/preview-browser-missing-path/");
  expect(missing?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/i,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
