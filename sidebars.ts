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
            {
              type: "category",
              label: "Building blocks",
              link: { type: "doc", id: "modulix/modulix-building-blocks" },
              items: [
                "modulix/building-blocks/modulix-building-block-coredns",
                "modulix/building-blocks/modulix-building-block-dhcp",
                "modulix/building-blocks/modulix-building-block-forgejo",
                "modulix/building-blocks/modulix-building-block-keycloak",
                "modulix/building-blocks/modulix-building-block-nexus",
              ],
            },
            {
              type: "category",
              label: "Blueprints",
              link: { type: "doc", id: "modulix/modulix-blueprints" },
              items: [
                "modulix/blueprints/modulix-blueprint-vsphere-template-lifecycle",
                "modulix/blueprints/modulix-blueprint-aap-disconnected-runtime",
                "modulix/blueprints/modulix-blueprint-aap-rhel10-host-preparation",
                "modulix/blueprints/modulix-blueprint-aap-ansible-vault",
                "modulix/blueprints/modulix-blueprint-aap-hashicorp-vault",
                "modulix/blueprints/modulix-blueprint-ubuntu-container-aio",
              ],
            },
            {
              type: "category",
              label: "Installation",
              link: { type: "doc", id: "modulix/modulix-installation" },
              items: ["modulix/installation/modulix-disconnected-runtime"],
            },
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
            {
              type: "category",
              label: "Architecture",
              link: { type: "doc", id: "wunderbox/wunderbox-architecture" },
              items: [
                "wunderbox/architecture/wunderbox-incus-runtime",
                "wunderbox/architecture/wunderbox-service-stack",
              ],
            },
            {
              type: "category",
              label: "Installation",
              link: {
                type: "generated-index",
                slug: "/wunderbox/installation/",
                title: "Wunderbox installation",
                description:
                  "Review bounded host and lab installation contracts before selecting an environment-specific implementation.",
              },
              items: [
                "wunderbox/installation/wunderbox-incus-host",
                "wunderbox/installation/wunderbox-openshift-agent-incus",
              ],
            },
            {
              type: "category",
              label: "Operations",
              link: { type: "doc", id: "wunderbox/wunderbox-operations" },
              items: [
                "wunderbox/operations/wunderbox-incus-image-deployment",
                "wunderbox/operations/wunderbox-incus-rhel-images",
              ],
            },
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
