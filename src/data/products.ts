export type ProductId =
  "aio" | "wunderbox" | "workbench" | "atlas" | "platform-governance-evidence";

export interface ProductSummary {
  id: ProductId;
  name: string;
  action: string;
  position: string;
  description: string;
  href: string;
}

export const products: readonly ProductSummary[] = [
  {
    id: "aio",
    name: "AIO",
    action: "Run",
    position: "Automation and Operations Platform",
    description:
      "Understand controlled execution and orchestration of defined operational automation.",
    href: "/aio/",
  },
  {
    id: "workbench",
    name: "Workbench",
    action: "Develop & Validate",
    position: "Engineering, Development & Validation Platform",
    description:
      "Review the public engineering and validation boundary for governed delivery work.",
    href: "/workbench/",
  },
  {
    id: "wunderbox",
    name: "Wunderbox",
    action: "Host",
    position: "Infrastructure Platform",
    description:
      "Understand the infrastructure platform and its place in the shared product architecture.",
    href: "/wunderbox/",
  },
  {
    id: "atlas",
    name: "Atlas",
    action: "Observe",
    position: "Observability Platform",
    description:
      "Understand the observability platform and its place in the shared product architecture.",
    href: "/atlas/",
  },
  {
    id: "platform-governance-evidence",
    name: "Platform Governance & Evidence",
    action: "Verify",
    position: "Governance and Evidence Platform",
    description:
      "Understand bounded governance, evidence lifecycle, assessment, and publication controls.",
    href: "/platform-governance-evidence/",
  },
];
