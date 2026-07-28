import type { ReactNode } from "react";

import type { ProductId } from "../../data/products";

interface ProductIconProps {
  product: ProductId;
}

const iconPaths: Record<ProductId, ReactNode> = {
  aio: (
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
  workbench: (
    <>
      <path d="M4 7h16v12H4z" />
      <path d="M8 7V4h8v3M8 13h8" />
    </>
  ),
  atlas: (
    <>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
      <circle cx="19" cy="6" r="2" />
    </>
  ),
  "platform-governance-evidence": (
    <>
      <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-5" />
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
