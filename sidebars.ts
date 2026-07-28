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
          label: "AIO — Run",
          link: {
            type: "generated-index",
            slug: "/aio/",
            title: "AIO documentation",
            description:
              "Automation and Operations Platform: public purpose, boundaries, generations, and acceptance.",
          },
          items: [
            "aio/aio-overview",
            "aio/aio-product-boundary",
            "aio/aio-generation-model",
            "aio/aio-acceptance-publication",
            "aio/aio-concepts",
            "aio/aio-architecture",
            "aio/aio-operations",
            "aio/aio-security",
            "aio/aio-troubleshooting",
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
          label: "Workbench — Develop & Validate",
          link: {
            type: "generated-index",
            slug: "/workbench/",
            title: "Workbench documentation",
            description:
              "Engineering, Development & Validation Platform: boundaries, validation model, acceptance, and publication.",
          },
          items: [
            "workbench/workbench-overview",
            "workbench/workbench-product-boundary",
            "workbench/workbench-validation-model",
            "workbench/workbench-acceptance-publication",
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
        {
          type: "category",
          label: "Platform Governance & Evidence — Verify",
          link: {
            type: "generated-index",
            slug: "/platform-governance-evidence/",
            title: "Platform Governance & Evidence documentation",
            description:
              "Governance, compliance, and evidence concepts for bounded, traceable assessments.",
          },
          items: [
            "platform-governance-evidence/platform-governance-evidence-overview",
            "platform-governance-evidence/platform-governance-evidence-assessment-model",
            "platform-governance-evidence/platform-governance-evidence-lifecycle",
            "platform-governance-evidence/platform-governance-evidence-deliverables-acceptance",
            "platform-governance-evidence/platform-governance-evidence-security-publication",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Foundation — ModuLix",
      link: {
        type: "generated-index",
        slug: "/modulix/",
        title: "ModuLix foundation documentation",
        description:
          "Shared automation engineering foundation: concepts, content, building blocks, blueprints, testing, and lifecycle.",
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
      label: "Architecture",
      link: { type: "doc", id: "architecture/portfolio-architecture" },
      items: [
        "architecture/integration-decisions",
        "architecture/github-automation-trust",
        "architecture/product-taxonomy-decision",
        "architecture/product-documentation-standard",
        "architecture/documentation-current-state-assessment",
        "architecture/governance-release-licensing-baseline",
        "architecture/target-documentation-platform",
        "architecture/information-architecture",
        "architecture/metadata-lifecycle-model",
        "architecture/trust-center-model",
        "architecture/localization-search-strategy",
        "architecture/evidence-center-model",
        "architecture/compliance-mapping-model",
        "architecture/github-lifecycle-traceability",
        "architecture/cicd-cloudflare-deployment",
        "architecture/implementation-plan",
        "architecture/integrated-architecture-package",
      ],
    },
    {
      type: "category",
      label: "Security",
      link: { type: "doc", id: "security/security-overview" },
      items: [
        "security/publication-boundary",
        "security/public-private-security-architecture",
        "security/backup-and-recovery",
      ],
    },
    {
      type: "category",
      label: "Compliance",
      link: { type: "doc", id: "compliance/compliance-overview" },
      items: ["compliance/bsi-mapping"],
    },
    {
      type: "category",
      label: "Documentation governance",
      link: {
        type: "doc",
        id: "documentation-governance/documentation-governance-principles",
      },
      items: [
        "documentation-governance/document-types/installation-and-handover-record",
        "documentation-governance/documentation-quality-standard",
        "documentation-governance/ihr-rule-catalog",
        "documentation-governance/ihr-quality-gates",
        "documentation-governance/ihr-documentation-pipeline",
      ],
    },
    {
      type: "category",
      label: "Reference",
      link: { type: "doc", id: "reference/reference-overview" },
      items: [
        "reference/glossary",
        "reference/public-sources",
        "reference/migration-summary",
        "reference/platform-governance-evidence-migration-plan",
      ],
    },
    "releases/releases-overview",
    {
      type: "category",
      label: "Support",
      link: { type: "doc", id: "support/support-overview" },
      items: ["support/troubleshooting-principles"],
    },
    {
      type: "category",
      label: "Contributing",
      link: { type: "doc", id: "contributing/contributing-documentation" },
      items: ["contributing/contributing-github-issues"],
    },
  ],
};

export default sidebars;
