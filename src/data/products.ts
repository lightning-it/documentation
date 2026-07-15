export type ProductId = "modulix" | "io" | "wunderbox" | "atlas";

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
    id: "modulix",
    name: "ModuLix",
    action: "Build",
    position: "Automation Content",
    description:
      "Explore the collections, roles, building blocks, and blueprints used to create automation content.",
    href: "/modulix/",
  },
  {
    id: "io",
    name: "IO",
    action: "Run",
    position: "Automation Runtime",
    description:
      "Understand the runtime layer, its portfolio boundaries, and its relationship to automation content.",
    href: "/io/",
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
];
