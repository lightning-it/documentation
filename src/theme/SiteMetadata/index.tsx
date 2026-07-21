import Head from "@docusaurus/Head";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import { PageMetadata, useThemeConfig } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";
import OriginalSiteMetadata from "@theme-original/SiteMetadata";
import type { ReactNode } from "react";

function normalizeRoutePath(pathname: string): string {
  if (pathname === "/") {
    return pathname;
  }
  return `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
}

function isNotFoundPath(
  pathname: string,
  allDocsData: ReturnType<typeof useAllDocsData>,
): boolean {
  if (/^\/404(?:\.html)?\/?$/.test(pathname)) {
    return true;
  }

  const knownRoutes = new Set(["/"]);
  for (const pluginData of Object.values(allDocsData)) {
    for (const version of pluginData.versions) {
      for (const doc of version.docs) {
        knownRoutes.add(normalizeRoutePath(doc.path));
      }
    }
  }

  return !knownRoutes.has(normalizeRoutePath(pathname));
}

function NotFoundMetadata(): ReactNode {
  const { image, metadata } = useThemeConfig();

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <body />
      </Head>
      {image && <PageMetadata image={image} />}
      <Head>
        {metadata.map((metadatum, index) => (
          <meta key={index} {...metadatum} />
        ))}
      </Head>
    </>
  );
}

export default function SiteMetadata(): ReactNode {
  const { pathname } = useLocation();
  const allDocsData = useAllDocsData();

  if (isNotFoundPath(pathname, allDocsData)) {
    return <NotFoundMetadata />;
  }

  return <OriginalSiteMetadata />;
}
