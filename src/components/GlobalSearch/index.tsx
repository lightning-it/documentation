import { lazy, Suspense, type ReactNode, useEffect, useState } from "react";

import styles from "./styles.module.css";

const GlobalSearchDialog = lazy(() => import("./GlobalSearchDialog"));

export const openSearchEvent = "lightning-it:open-search";

interface SearchEventDetail {
  query?: string;
}

export function requestGlobalSearch(query = ""): void {
  window.dispatchEvent(
    new CustomEvent<SearchEventDetail>(openSearchEvent, { detail: { query } }),
  );
}

interface SearchTriggerProps {
  variant?: "compact" | "prominent";
  label?: string;
}

export function SearchTrigger({
  variant = "compact",
  label = "Search documentation",
}: SearchTriggerProps): ReactNode {
  return (
    <button
      type="button"
      className={`${styles.trigger} ${styles[variant]}`}
      onClick={() => requestGlobalSearch()}
      aria-label={label}
      aria-keyshortcuts="Control+K Meta+K"
      data-pagefind-ignore="all"
    >
      <span className={styles.searchIcon} aria-hidden="true" />
      <span className={styles.triggerLabel}>{label}</span>
      <kbd className={styles.shortcut} aria-hidden="true">
        Ctrl K
      </kbd>
    </button>
  );
}

export default function GlobalSearch(): ReactNode {
  const [request, setRequest] = useState<{
    activation: number;
    query: string;
    previousFocus: HTMLElement | null;
  }>();

  useEffect(() => {
    const activate = (query = "") => {
      const previousFocus = document.activeElement as HTMLElement | null;
      setRequest((current) => ({
        activation: (current?.activation ?? 0) + 1,
        query,
        previousFocus,
      }));
    };
    const handleKeyboardShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        activate();
      }
    };
    const handleOpenSearch = (event: Event) => {
      const { detail } = event as CustomEvent<SearchEventDetail>;
      activate(detail.query ?? "");
    };

    window.addEventListener("keydown", handleKeyboardShortcut);
    window.addEventListener(openSearchEvent, handleOpenSearch);
    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
      window.removeEventListener(openSearchEvent, handleOpenSearch);
    };
  }, []);

  return (
    <>
      <SearchTrigger />
      {request && (
        <Suspense fallback={null}>
          <GlobalSearchDialog
            activation={request.activation}
            initialQuery={request.query}
            previousFocus={request.previousFocus}
          />
        </Suspense>
      )}
    </>
  );
}
