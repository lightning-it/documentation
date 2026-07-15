import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("17 — production at docs.l-it.io passes the public browser journey", async ({
  page,
  baseURL,
}) => {
  expect(new URL(baseURL ?? "").hostname).toBe("docs.l-it.io");
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).hostname === "docs.l-it.io") {
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

  const missing = await page.goto("/production-acceptance-missing-path/");
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
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
