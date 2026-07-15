import type { ReactNode } from "react";

import type { ProductId } from "../../data/products";

interface ProductIconProps {
  product: ProductId;
}

const iconPaths: Record<ProductId, ReactNode> = {
  modulix: (
    <>
      <path d="M14 3 6 14h6l-1 7 8-12h-6l1-6Z" />
      <path d="M4 4h4M16 20h4" />
    </>
  ),
  io: (
    <>
      <path d="m8 5 7 7-7 7" />
      <path d="M16 19h4M4 5h4" />
    </>
  ),
  wunderbox: (
    <>
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z" />
      <path d="M12 11v10" />
    </>
  ),
  atlas: (
    <>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
      <circle cx="19" cy="6" r="2" />
    </>
  ),
};

export default function ProductIcon({ product }: ProductIconProps): ReactNode {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[product]}
    </svg>
  );
}
