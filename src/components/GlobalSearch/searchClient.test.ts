import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetSearchClientForTests, searchDocumentation } from "./searchClient";

interface ResultData {
  url: string;
  excerpt: string;
  meta: Record<string, string | undefined>;
  sub_results?: Array<{
    url: string;
    title: string;
    excerpt: string;
  }>;
}

function providePagefindResults(results: ResultData[]): void {
  window.__LIGHTNING_IT_PAGEFIND__ = {
    search: vi.fn().mockResolvedValue({
      results: results.map((result) => ({
        data: vi.fn().mockResolvedValue(result),
      })),
    }),
  };
}

describe("searchDocumentation", () => {
  beforeEach(() => {
    resetSearchClientForTests();
    delete window.__LIGHTNING_IT_PAGEFIND__;
  });

  it("normalizes relative and same-origin Pagefind URLs", async () => {
    providePagefindResults([
      {
        url: "/modulix/overview/",
        excerpt: "Page excerpt",
        meta: { title: "ModuLix" },
        sub_results: [
          {
            url: `${window.location.origin}/modulix/overview/#scope`,
            title: "Scope",
            excerpt: "Section excerpt",
          },
        ],
      },
      {
        url: "reference/glossary/#role",
        excerpt: "Glossary excerpt",
        meta: { title: "Glossary" },
      },
    ]);

    await expect(searchDocumentation("ModuLix")).resolves.toEqual([
      {
        url: "/modulix/overview/#scope",
        title: "ModuLix — Scope",
        excerpt: "Section excerpt",
      },
      {
        url: "/reference/glossary/#role",
        title: "Glossary",
        excerpt: "Glossary excerpt",
      },
    ]);
  });

  it("rejects non-HTTP and cross-origin result URLs", async () => {
    providePagefindResults([
      {
        url: "javascript:alert(1)",
        excerpt: "Unsafe protocol",
        meta: { title: "Unsafe protocol" },
      },
      {
        url: "https://example.com/phishing",
        excerpt: "Wrong origin",
        meta: { title: "Wrong origin" },
      },
      {
        url: "/safe-page/",
        excerpt: "Safe fallback",
        meta: { title: "Safe page" },
        sub_results: [
          {
            url: "//example.com/unsafe-section",
            title: "Unsafe section",
            excerpt: "Unsafe section excerpt",
          },
        ],
      },
    ]);

    await expect(searchDocumentation("safety")).resolves.toEqual([
      {
        url: "/safe-page/",
        title: "Safe page",
        excerpt: "Safe fallback",
      },
    ]);
  });
});
