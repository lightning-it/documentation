import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativeRoutes = [
  "/",
  "/getting-started/",
  "/modulix/overview/",
  "/architecture/",
  "/security/",
  "/compliance/bsi-mapping/",
  "/modulix/installation/",
];

for (const theme of ["light", "dark"] as const) {
  for (const route of representativeRoutes) {
    test(`accessibility — ${theme} mode ${route}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations).toEqual([]);
      expect(
        result.passes.some(({ id }) => id === "color-contrast"),
        "axe must execute computed color-contrast checks",
      ).toBe(true);
    });
  }
}

test("accessibility — @mobile mobile navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Toggle navigation bar/i }).click();
  const result = await new AxeBuilder({ page })
    .include(".navbar-sidebar")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
