export interface DocumentationSearchResult {
  url: string;
  title: string;
  excerpt: string;
}

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: Record<string, string | undefined>;
  sub_results?: Array<{
    url: string;
    title: string;
    excerpt: string;
  }>;
}

interface PagefindResultReference {
  data: () => Promise<PagefindResultData>;
}

interface PagefindApi {
  search: (
    query: string,
  ) => Promise<{ results: PagefindResultReference[] } | null>;
}

declare global {
  interface Window {
    __LIGHTNING_IT_PAGEFIND__?: PagefindApi;
  }
}

const pagefindReadyEvent = "lightning-it:pagefind-ready";
const pagefindLoaderSelector = "script[data-lightning-it-pagefind]";
let pagefindPromise: Promise<PagefindApi> | undefined;

function safeResultUrl(candidate: string): string | undefined {
  if (!candidate.trim()) {
    return undefined;
  }

  try {
    const currentUrl = new URL(window.location.href);
    const resultUrl = new URL(candidate, `${currentUrl.origin}/`);

    if (
      !["http:", "https:"].includes(resultUrl.protocol) ||
      resultUrl.origin !== currentUrl.origin
    ) {
      return undefined;
    }

    return `${resultUrl.pathname}${resultUrl.search}${resultUrl.hash}`;
  } catch {
    return undefined;
  }
}

async function loadPagefind(): Promise<PagefindApi> {
  if (window.__LIGHTNING_IT_PAGEFIND__) {
    return window.__LIGHTNING_IT_PAGEFIND__;
  }

  pagefindPromise ??= new Promise<PagefindApi>((resolve, reject) => {
    const finish = () => {
      window.removeEventListener(pagefindReadyEvent, handleReady);
      window.clearTimeout(timeout);
    };

    const handleReady = () => {
      const pagefind = window.__LIGHTNING_IT_PAGEFIND__;
      if (!pagefind) {
        return;
      }

      finish();
      resolve(pagefind);
    };

    const handleError = () => {
      finish();
      pagefindPromise = undefined;
      reject(new Error("The Pagefind browser module could not be loaded."));
    };

    const timeout = window.setTimeout(handleError, 15_000);
    window.addEventListener(pagefindReadyEvent, handleReady);

    const existingLoader = document.querySelector<HTMLScriptElement>(
      pagefindLoaderSelector,
    );
    if (existingLoader) {
      existingLoader.addEventListener("error", handleError, { once: true });
      return;
    }

    const loader = document.createElement("script");
    loader.type = "module";
    loader.src = "/js/pagefind-loader.js";
    loader.dataset.lightningItPagefind = "true";
    loader.addEventListener("error", handleError, { once: true });
    document.head.append(loader);
  });

  return pagefindPromise;
}

export async function searchDocumentation(
  query: string,
): Promise<DocumentationSearchResult[]> {
  const pagefind = await loadPagefind();
  const response = await pagefind.search(query);

  if (!response) {
    return [];
  }

  const resultData = await Promise.all(
    response.results.slice(0, 10).map((result) => result.data()),
  );

  return resultData.flatMap((result) => {
    const matchingSection = result.sub_results?.[0];
    const sectionUrl = matchingSection
      ? safeResultUrl(matchingSection.url)
      : undefined;
    const pageUrl = safeResultUrl(result.url);
    const useSection = Boolean(matchingSection && sectionUrl);
    const safeUrl = sectionUrl ?? pageUrl;

    if (!safeUrl) {
      return [];
    }

    const pageTitle = result.meta.title ?? "Documentation page";
    const sectionTitle = useSection ? matchingSection?.title : undefined;

    return [
      {
        url: safeUrl,
        title:
          sectionTitle && sectionTitle !== pageTitle
            ? `${pageTitle} — ${sectionTitle}`
            : pageTitle,
        excerpt:
          useSection && matchingSection
            ? matchingSection.excerpt
            : result.excerpt,
      },
    ];
  });
}

export function resetSearchClientForTests(): void {
  pagefindPromise = undefined;
}
