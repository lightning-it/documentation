import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import NotFoundContent from "../components/NotFoundContent";

export default function NotFound(): ReactNode {
  return (
    <Layout
      title="Page not found"
      description="The requested documentation page could not be found."
    >
      <NotFoundContent />
    </Layout>
  );
}
