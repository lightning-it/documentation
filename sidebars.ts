import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  documentationSidebar: [
    "getting-started",
    {
      type: "category",
      label: "Product portfolio",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "category",
          label: "ModuLix — Build",
          link: {
            type: "generated-index",
            slug: "/modulix/",
            title: "ModuLix documentation",
            description:
              "Automation Content: concepts, collections, roles, building blocks, blueprints, usage, and lifecycle.",
          },
          items: [
            "modulix/modulix-overview",
            "modulix/modulix-concepts",
            "modulix/modulix-collections",
            "modulix/modulix-roles",
            "modulix/modulix-building-blocks",
            "modulix/modulix-blueprints",
            "modulix/modulix-installation",
            "modulix/modulix-usage",
            "modulix/modulix-development",
            "modulix/modulix-testing",
            "modulix/modulix-security",
            "modulix/modulix-lifecycle",
            "modulix/modulix-reference",
          ],
        },
        {
          type: "category",
          label: "IO — Run",
          link: {
            type: "generated-index",
            slug: "/io/",
            title: "IO documentation",
            description:
              "Automation Runtime: concepts, architecture, operations, security, and troubleshooting.",
          },
          items: [
            "io/io-overview",
            "io/io-concepts",
            "io/io-architecture",
            "io/io-operations",
            "io/io-security",
            "io/io-troubleshooting",
          ],
        },
        {
          type: "category",
          label: "Wunderbox — Host",
          link: {
            type: "generated-index",
            slug: "/wunderbox/",
            title: "Wunderbox documentation",
            description:
              "Infrastructure Platform: concepts, architecture, operations, security, and troubleshooting.",
          },
          items: [
            "wunderbox/wunderbox-overview",
            "wunderbox/wunderbox-concepts",
            "wunderbox/wunderbox-architecture",
            "wunderbox/wunderbox-operations",
            "wunderbox/wunderbox-security",
            "wunderbox/wunderbox-troubleshooting",
          ],
        },
        {
          type: "category",
          label: "Atlas — Observe",
          link: {
            type: "generated-index",
            slug: "/atlas/",
            title: "Atlas documentation",
            description:
              "Observability Platform: concepts, architecture, operations, security, and troubleshooting.",
          },
          items: [
            "atlas/atlas-overview",
            "atlas/atlas-concepts",
            "atlas/atlas-architecture",
            "atlas/atlas-operations",
            "atlas/atlas-security",
            "atlas/atlas-troubleshooting",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Architecture",
      link: { type: "doc", id: "architecture/portfolio-architecture" },
      items: ["architecture/integration-decisions"],
    },
    {
      type: "category",
      label: "Security",
      link: { type: "doc", id: "security/security-overview" },
      items: ["security/publication-boundary", "security/backup-and-recovery"],
    },
    {
      type: "category",
      label: "Compliance",
      link: { type: "doc", id: "compliance/compliance-overview" },
      items: ["compliance/bsi-mapping"],
    },
    {
      type: "category",
      label: "Reference",
      link: { type: "doc", id: "reference/reference-overview" },
      items: [
        "reference/glossary",
        "reference/public-sources",
        "reference/migration-summary",
      ],
    },
    "releases/releases-overview",
    {
      type: "category",
      label: "Support",
      link: { type: "doc", id: "support/support-overview" },
      items: ["support/troubleshooting-principles"],
    },
    "contributing/contributing-documentation",
  ],
};

export default sidebars;
