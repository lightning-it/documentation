import Link from "@docusaurus/Link";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "../../pages/404.module.css";
import { SearchTrigger } from "../GlobalSearch";

interface NotFoundContentProps {
  className?: string;
}

export default function NotFoundContent({
  className,
}: NotFoundContentProps): ReactNode {
  return (
    <main className={clsx(styles.main, className)} data-pagefind-ignore="all">
      <div className={styles.panel}>
        <p className={styles.code}>404</p>
        <h1>This path does not lead to a documentation page</h1>
        <p className={styles.description}>
          The page may have moved, or the address may be incomplete. Search the
          public documentation or return to a stable entry point.
        </p>
        <SearchTrigger variant="prominent" />
        <div className={styles.actions}>
          <Link className="button button--primary" to="/">
            Documentation home
          </Link>
          <Link className="button button--secondary" to="/support/">
            Support information
          </Link>
        </div>
      </div>
    </main>
  );
}
