import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import HighlightedExcerpt from "./HighlightedExcerpt";
import {
  type DocumentationSearchResult,
  searchDocumentation,
} from "./searchClient";
import styles from "./styles.module.css";

interface GlobalSearchDialogProps {
  activation: number;
  initialQuery: string;
}

export default function GlobalSearchDialog({
  activation,
  initialQuery,
}: GlobalSearchDialogProps): ReactNode {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<DocumentationSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const requestedOpenRef = useRef(false);
  const requestSequence = useRef(0);
  const inputId = useId();
  const resultsId = useId();

  const openSearch = useCallback((initialQuery = "") => {
    requestedOpenRef.current = true;

    if (dialogRef.current?.open) {
      if (initialQuery && initialQuery !== inputRef.current?.value) {
        requestSequence.current += 1;
        setQuery(initialQuery);
        setResults([]);
        setError(undefined);
        setIsLoading(true);
      }
      inputRef.current?.focus();
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    requestSequence.current += 1;
    setQuery(initialQuery);
    setResults([]);
    setError(undefined);
    setIsLoading(Boolean(initialQuery.trim()));
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    requestedOpenRef.current = false;
    requestSequence.current += 1;
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const handleDialogClose = useCallback(() => {
    if (requestedOpenRef.current) {
      return;
    }

    requestSequence.current += 1;
    setIsOpen(false);
    setIsLoading(false);

    const previousFocus = previousFocusRef.current;
    previousFocusRef.current = null;
    previousFocus?.focus();
  }, []);

  useEffect(
    () => openSearch(initialQuery),
    [activation, initialQuery, openSearch],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const normalizedQuery = query.trim();
    const sequence = ++requestSequence.current;

    if (!isOpen || !normalizedQuery) {
      setResults([]);
      setError(undefined);
      setIsLoading(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsLoading(true);
      setError(undefined);

      void searchDocumentation(normalizedQuery)
        .then((nextResults) => {
          if (sequence !== requestSequence.current) {
            return;
          }

          setResults(nextResults);
        })
        .catch(() => {
          if (sequence !== requestSequence.current) {
            return;
          }

          setResults([]);
          setError(
            "Search is temporarily unavailable. For local search, run the production build and serve it from the build directory.",
          );
        })
        .finally(() => {
          if (sequence === requestSequence.current) {
            setIsLoading(false);
          }
        });
    }, 140);

    return () => window.clearTimeout(timer);
  }, [isOpen, query]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    requestSequence.current += 1;
    setQuery(nextQuery);
    setResults([]);
    setError(undefined);
    setIsLoading(Boolean(nextQuery.trim()));
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length || !["ArrowDown", "ArrowUp"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const nextIndex = event.key === "ArrowDown" ? 0 : results.length - 1;
    resultLinksRef.current[nextIndex]?.focus();
  };

  const handleResultKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (!["ArrowDown", "ArrowUp"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + direction + results.length) % results.length;
    resultLinksRef.current[nextIndex]?.focus();
  };

  const normalizedQuery = query.trim();

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`${inputId}-title`}
      onCancel={(event) => {
        event.preventDefault();
        closeSearch();
      }}
      onClose={handleDialogClose}
    >
      <div className={styles.panel}>
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.eyebrow}>Lightning IT Documentation</p>
            <h2 id={`${inputId}-title`} className={styles.dialogTitle}>
              Search public documentation
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeSearch}
            aria-label="Close search"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <label className="sr-only" htmlFor={inputId}>
          Search terms
        </label>
        <div className={styles.inputWrap}>
          <span className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            id={inputId}
            className={styles.input}
            type="search"
            value={query}
            onChange={handleInput}
            onKeyDown={handleInputKeyDown}
            placeholder="Search products, architecture, security…"
            autoComplete="off"
            aria-controls={resultsId}
            aria-describedby={`${inputId}-hint`}
          />
          {isLoading && (
            <span className={styles.spinner} role="status">
              <span className="sr-only">Searching</span>
            </span>
          )}
        </div>
        <p id={`${inputId}-hint`} className={styles.hint}>
          Search stays on this site. No query is sent to a search service.
        </p>

        <div id={resultsId} className={styles.results} aria-live="polite">
          {!normalizedQuery && (
            <div className={styles.emptyState}>
              <p>Try a product, task, or topic.</p>
              <span>Examples: ModuLix, architecture, BSI, troubleshooting</span>
            </div>
          )}

          {normalizedQuery && !isLoading && error && (
            <div className={styles.errorState} role="alert">
              <strong>Search could not be loaded</strong>
              <p>{error}</p>
            </div>
          )}

          {normalizedQuery && !isLoading && !error && results.length === 0 && (
            <div className={styles.emptyState}>
              <p>No results for “{normalizedQuery}”</p>
              <span>Check the spelling or try a broader term.</span>
            </div>
          )}

          {results.length > 0 && (
            <>
              <p className={styles.resultCount} role="status">
                {results.length} {results.length === 1 ? "result" : "results"}
              </p>
              <ul className={styles.resultList}>
                {results.map((result, index) => (
                  <li key={`${result.url}-${result.title}`}>
                    <a
                      ref={(element) => {
                        resultLinksRef.current[index] = element;
                      }}
                      className={styles.resultLink}
                      href={result.url}
                      onKeyDown={(event) => handleResultKeyDown(event, index)}
                    >
                      <strong>{result.title}</strong>
                      <span>
                        <HighlightedExcerpt excerpt={result.excerpt} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className={styles.dialogFooter} aria-hidden="true">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>Esc</kbd> close
          </span>
          <span>Powered by Pagefind</span>
        </div>
      </div>
    </dialog>
  );
}
