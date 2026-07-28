import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

async function expectPage(page: Page, path: string, heading: RegExp) {
  const response = await page.goto(path);
  expect(response, `navigation response for ${path}`).not.toBeNull();
  expect(response?.ok(), `successful response for ${path}`).toBe(true);
  await expect(
    page.getByRole("heading", { level: 1, name: heading }),
  ).toBeVisible();
}

test("01 — load the documentation home page", async ({ page }) => {
  await expectPage(page, "/", /Build, run, host, and observe/i);
  await expect(page).toHaveTitle(/Lightning IT Documentation/);
  await expect(page.getByRole("search")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Search products/i }),
  ).toBeVisible();
});

test("02 — search for ModuLix with safe same-origin results", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Search products/i }).click();
  const searchbox = page.getByRole("searchbox", { name: "Search terms" });
  await searchbox.fill("ModuLix");
  const result = page
    .getByRole("dialog")
    .getByRole("link", { name: /ModuLix/ })
    .first();
  await expect(result).toBeVisible();
  const resultLinks = page.getByRole("dialog").getByRole("link");
  for (let index = 0; index < (await resultLinks.count()); index += 1) {
    const href = await resultLinks.nth(index).getAttribute("href");
    expect(href).toMatch(/^\/[A-Za-z0-9/_#.-]*$/);
  }
  await result.click();
  await expect(page).toHaveURL(/\/modulix\//);
});

test("search covers every required product, task, and migrated public role term", async ({
  page,
}) => {
  const requiredQueries = [
    { query: "Wunderbox", expectedPath: "/wunderbox/" },
    { query: "Atlas", expectedPath: "/atlas/" },
    {
      query: "Platform Governance & Evidence",
      expectedPath: "/platform-governance-evidence/",
    },
    { query: "installation", expectedPath: "/modulix/installation/" },
    { query: "architecture", expectedPath: "/architecture/" },
    { query: "BSI", expectedPath: "/compliance/bsi-mapping/" },
    {
      query: "Definition of Ready",
      expectedPath: "/contributing/github-issues/",
    },
    { query: "backup", expectedPath: "/security/backup-and-recovery/" },
    { query: "troubleshooting", expectedPath: "/atlas/troubleshooting/" },
    { query: "lit.rhel.baseline", expectedPath: "/modulix/roles/" },
  ];

  await page.goto("/");
  await page.getByRole("button", { name: /Search products/i }).click();
  const dialog = page.getByRole("dialog", {
    name: "Search public documentation",
  });
  const searchbox = dialog.getByRole("searchbox", { name: "Search terms" });

  for (const { query, expectedPath } of requiredQueries) {
    await test.step(query, async () => {
      await searchbox.fill(query);
      await expect(
        dialog.locator(`a[href^="${expectedPath}"]`).first(),
        `search result for ${query}`,
      ).toBeVisible();
    });
  }
});

test("03 — open ModuLix documentation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Build reusable automation/i }).click();
  await expect(page).toHaveURL(/\/modulix\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /ModuLix overview/i }),
  ).toBeVisible();
});

test("04 — redirect retired IO routes directly to AIO", async ({ page }) => {
  const redirects = readFileSync("static/_redirects", "utf8");
  const expectedMappings = [
    "/io/ /aio/ 301",
    "/io/overview/ /aio/overview/ 301",
    "/io/concepts/ /aio/concepts/ 301",
    "/io/architecture/ /aio/architecture/ 301",
    "/io/operations/ /aio/operations/ 301",
    "/io/security/ /aio/security/ 301",
    "/io/troubleshooting/ /aio/troubleshooting/ 301",
  ];

  for (const mapping of expectedMappings) {
    expect(redirects).toContain(mapping);
  }

  await expectPage(page, "/aio/security/", /AIO security/i);
  await expect(
    page.getByRole("heading", { level: 1, name: /AIO security/i }),
  ).toBeVisible();
});

test("05 — navigate to Wunderbox", async ({ page }) => {
  await expectPage(page, "/wunderbox/", /Wunderbox documentation/i);
  await page
    .getByRole("link", { name: /Wunderbox overview/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/wunderbox\/overview\/$/);
});

test("06 — navigate to Atlas", async ({ page }) => {
  await expectPage(page, "/atlas/", /Atlas documentation/i);
  await page
    .getByRole("link", { name: /Atlas overview/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/atlas\/overview\/$/);
});

test("07 — navigate to Platform Governance & Evidence", async ({ page }) => {
  await expectPage(
    page,
    "/platform-governance-evidence/",
    /Platform Governance & Evidence documentation/i,
  );
  await page
    .getByRole("link", {
      name: /Platform Governance & Evidence overview/i,
    })
    .first()
    .click();
  await expect(page).toHaveURL(/\/platform-governance-evidence\/overview\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Platform Governance & Evidence overview/i,
    }),
  ).toBeVisible();
});

test("08 — open architecture documentation", async ({ page }) => {
  await expectPage(page, "/architecture/", /Portfolio architecture/i);
});

test("09 — open security documentation", async ({ page }) => {
  await expectPage(page, "/security/", /Security overview/i);
  const metadata = page.getByRole("region", { name: "Document metadata" });
  await expect(metadata).toBeVisible();
  await expect(metadata).toContainText("Maintained");
  await expect(metadata).toContainText("Approved");
  await expect(metadata).toContainText(
    "Lightning IT Documentation Maintainers",
  );
  await expect(metadata.locator("time")).toHaveCount(2);
});

test("10 — open compliance documentation", async ({ page }) => {
  await expectPage(page, "/compliance/", /Compliance documentation/i);
});

test("render accessible audience tabs and approved product taxonomy", async ({
  page,
}) => {
  await expectPage(page, "/getting-started/", /Get started/i);
  const tabs = page.getByRole("tablist");
  await expect(tabs).toBeVisible();
  const operators = page.getByRole("tab", { name: "Platform operators" });
  await operators.click();
  await expect(operators).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "backup and recovery model",
  );

  await expectPage(page, "/architecture/", /Portfolio architecture/i);
  const main = page.getByRole("main");
  await expect(main).toContainText("five sellable products");
  await expect(main).toContainText("AIO");
  await expect(main).toContainText("Wunderbox");
  await expect(main).toContainText("Workbench");
  await expect(main).toContainText("Atlas");
  await expect(main).toContainText("Platform Governance & Evidence");
  await expect(main).toContainText("not a sixth sellable product");
});

test("11 — switch between light and dark modes", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("theme", "light"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-theme", "light");
  await expect(root).toHaveAttribute("data-theme-choice", "light");
  await page
    .getByRole("button", { name: /Switch between dark and light mode/i })
    .click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("button", { name: /Switch between dark and light mode/i })
    .click();
  await expect(root).toHaveAttribute("data-theme", "light");
});

test("12 — @mobile use navigation at a mobile viewport", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Toggle navigation bar/i }).click();
  const navigation = page.locator(".navbar-sidebar");
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Architecture" }).click();
  await expect(page).toHaveURL(/\/architecture\/$/);
});

test("global navigation exposes the governed portfolio and foundation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Products", exact: true }).click();
  const navbar = page.locator(".navbar");
  for (const destination of [
    "AIO — Run",
    "Wunderbox — Host",
    "Workbench — Develop & Validate",
    "Atlas — Observe",
    "Platform Governance & Evidence — Verify",
  ]) {
    await expect(navbar.getByRole("link", { name: destination })).toBeVisible();
  }
  await expect(
    navbar.getByRole("link", { name: "Foundation", exact: true }),
  ).toHaveAttribute("href", "/modulix/");
});

test("13 — emit no browser console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  for (const route of [
    "/",
    "/modulix/overview/",
    "/architecture/",
    "/security/",
  ]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
  }
  expect(errors).toEqual([]);
});

test("14 — make no failed first-party requests", async ({ page, baseURL }) => {
  const failures: string[] = [];
  const origin = new URL(baseURL ?? "http://127.0.0.1:3000").origin;
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).origin === origin) {
      failures.push(`${request.method()} ${new URL(request.url()).pathname}`);
    }
  });
  page.on("response", (response) => {
    if (new URL(response.url()).origin === origin && response.status() >= 400) {
      failures.push(`${response.status()} ${new URL(response.url()).pathname}`);
    }
  });
  await page.goto("/");
  await page.getByRole("button", { name: /Search products/i }).click();
  await page.getByRole("searchbox").fill("security");
  await expect(
    page.getByRole("dialog").getByRole("link").first(),
  ).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(failures).toEqual([]);
});

test("15 — TYPO3 links return to l-it.io", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('a[href^="https://l-it.io"]');
  expect(await links.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await links.count()); index += 1) {
    const url = new URL((await links.nth(index).getAttribute("href")) ?? "");
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("l-it.io");
  }
});

test("16 — GitHub links target public repository URLs", async ({ page }) => {
  await page.goto("/reference/public-sources/");
  const links = page.locator('a[href^="https://github.com/lightning-it/"]');
  expect(await links.count()).toBeGreaterThan(5);
  for (let index = 0; index < (await links.count()); index += 1) {
    const url = new URL((await links.nth(index).getAttribute("href")) ?? "");
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("github.com");
    expect(url.pathname).toMatch(/^\/lightning-it\/[A-Za-z0-9_.-]+(?:\/.*)?$/);
  }
});

test("17 — unknown paths return the custom 404 page and are absent from search", async ({
  page,
}) => {
  const response = await page.goto("/not-a-real-public-documentation-path/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute(
    "data-has-hydrated",
    "true",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /does not lead to a documentation page/i,
    }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/i,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page
    .getByRole("button", { name: "Search documentation" })
    .first()
    .click();
  await page
    .getByRole("searchbox")
    .fill("does not lead to a documentation page");
  const searchDialog = page.getByRole("dialog");
  await expect(
    searchDialog.getByText(/^(?:No results for|\d+ results?)\b/),
  ).toBeVisible();
  const resultLinks = searchDialog.getByRole("link");
  for (let index = 0; index < (await resultLinks.count()); index += 1) {
    await expect(resultLinks.nth(index)).not.toHaveAttribute(
      "href",
      /(?:404|not-a-real-public-documentation-path)/,
    );
    await expect(resultLinks.nth(index)).not.toContainText(
      "This path does not lead to a documentation page",
    );
  }
});

test("search keyboard behavior restores focus and supports repeated use", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /Search products/i });
  await trigger.focus();
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", {
    name: "Search public documentation",
  });
  const searchbox = page.getByRole("searchbox", { name: "Search terms" });
  await expect(dialog).toBeVisible();
  await searchbox.fill("architecture");
  const results = dialog.getByRole("link");
  await expect(results.first()).toBeVisible();
  await searchbox.press("ArrowUp");
  await expect(results.last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Control+k");
  await expect(dialog).toBeVisible();
});

test("all canonical routes from the sitemap load successfully", async ({
  page,
  request,
}) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  const paths = [
    ...sitemap.matchAll(/<loc>https:\/\/docs\.l-it\.io([^<]+)<\/loc>/g),
  ]
    .map((match) => match[1])
    .filter((path): path is string => Boolean(path));
  expect(paths.length).toBeGreaterThan(40);
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.ok(), path).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://docs.l-it.io${path}`,
    );
  }
});

test("code-block copy behavior works without navigation", async ({ page }) => {
  await page.goto("/modulix/installation/");
  const copyButton = page.locator('button[title="Copy"]').first();
  await expect(copyButton).toBeVisible();
  await expect(copyButton).toHaveAccessibleName(/Copy code to clipboard/i);
  await copyButton.click();
  await expect(copyButton).toHaveAccessibleName(/Copied/i);
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).length,
  ).toBeGreaterThan(5);
});

test("keyboard navigation exposes a visible focus indicator", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus-visible");
  await expect(focused).toBeVisible();
  const outline = await focused.evaluate((element) => {
    const style = getComputedStyle(element);
    return { width: style.outlineWidth, style: style.outlineStyle };
  });
  expect(outline.style).not.toBe("none");
  expect(Number.parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
});
