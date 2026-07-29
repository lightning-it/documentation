import { useLocation } from "@docusaurus/router";
import OriginalLayout from "@theme-original/Layout";
import type { Props } from "@theme/Layout";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

export default function Layout(props: Props): ReactNode {
  const location = useLocation();
  const isEnglishFallback =
    location.pathname.startsWith("/de/") &&
    location.pathname !== "/de/getting-started/" &&
    !/\/404(?:\.html)?\/?$/.test(location.pathname);
  const canonicalEnglishPath = `${location.pathname.replace(
    /^\/de(?=\/)/,
    "",
  )}${location.search}${location.hash}`;

  return (
    <OriginalLayout {...props}>
      {isEnglishFallback && (
        <aside className={styles.localeFallback} role="status">
          <strong>Deutsche Übersetzung nicht verfügbar.</strong> Diese Seite
          zeigt ausdrücklich die englische kanonische Fassung.{" "}
          <a href={canonicalEnglishPath} hrefLang="en-GB">
            Englische Originalseite öffnen
          </a>
          .
        </aside>
      )}
      <div {...(isEnglishFallback ? { "data-pagefind-ignore": true } : {})}>
        {props.children}
      </div>
    </OriginalLayout>
  );
}
