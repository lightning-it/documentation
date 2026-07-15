import Link from "@docusaurus/Link";
import clsx from "clsx";
import type { ReactNode } from "react";

import type { ProductSummary } from "../../data/products";
import ProductIcon from "../ProductIcon";
import styles from "./styles.module.css";

interface ProductCardProps {
  product: ProductSummary;
}

export default function ProductCard({ product }: ProductCardProps): ReactNode {
  return (
    <article className={clsx(styles.card, styles[product.id])}>
      <div className={styles.topline}>
        <span className={styles.icon}>
          <ProductIcon product={product.id} />
        </span>
        <span className={styles.action}>{product.action}</span>
      </div>
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.position}>{product.position}</p>
      <p className={styles.description}>{product.description}</p>
      <Link className={styles.link} to={product.href}>
        Open {product.name} docs
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
