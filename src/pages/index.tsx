import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import { SearchTrigger } from "../components/GlobalSearch";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import styles from "./index.module.css";

const audiencePaths = [
  {
    label: "Automation authors",
    title: "Build reusable automation",
    description:
      "Start with ModuLix concepts, content structure, development, and testing.",
    href: "/modulix/",
  },
  {
    label: "Platform operators",
    title: "Run and host platforms",
    description:
      "Understand the responsibilities and boundaries of IO and Wunderbox.",
    href: "/architecture/",
  },
  {
    label: "Architects and assurance teams",
    title: "Design for trust and visibility",
    description:
      "Review cross-product architecture, security, compliance, and observability.",
    href: "/security/",
  },
];

const foundationLinks = [
  {
    title: "Architecture",
    description: "See product boundaries and functional interaction.",
    href: "/architecture/",
  },
  {
    title: "Security",
    description:
      "Read the public security principles and responsibility model.",
    href: "/security/",
  },
  {
    title: "Compliance",
    description:
      "Understand public standards mappings without private evidence.",
    href: "/compliance/",
  },
  {
    title: "Releases and lifecycle",
    description: "Find lifecycle policy and public release information.",
    href: "/releases/",
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Public technical documentation"
      description="Technical documentation for ModuLix, IO, Wunderbox, and Atlas in the Lightning IT product portfolio."
    >
      <main data-pagefind-body>
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Public technical documentation</p>
              <h1>Build, run, host, and observe with Lightning IT</h1>
              <p className={styles.intro}>
                Find technical guidance for the four peer products in the
                Lightning IT portfolio: ModuLix, IO, Wunderbox, and Atlas.
              </p>
              <div className={styles.heroSearch}>
                <SearchTrigger
                  variant="prominent"
                  label="Search products, architecture, security…"
                />
              </div>
              <div className={styles.heroLinks}>
                <Link className="button button--primary" to="/architecture/">
                  Explore the architecture
                </Link>
                <Link className="button button--secondary" to="/contributing/">
                  Contribute to the docs
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="products-heading">
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Product portfolio</p>
                <h2 id="products-heading">Choose a product</h2>
              </div>
              <p>
                Build, run, host, and observe describe functional interaction.
                All four products remain peers.
              </p>
            </div>
            <div className={styles.productGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.audienceSection}`}
          aria-labelledby="audiences-heading"
        >
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Start from your goal</p>
                <h2 id="audiences-heading">Paths for technical teams</h2>
              </div>
            </div>
            <div className={styles.audienceGrid}>
              {audiencePaths.map((path, index) => (
                <Link
                  key={path.title}
                  className={styles.audienceCard}
                  to={path.href}
                >
                  <span className={styles.pathNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className={styles.audienceLabel}>{path.label}</span>
                  <strong>{path.title}</strong>
                  <span>{path.description}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="foundations-heading"
        >
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Across the portfolio</p>
                <h2 id="foundations-heading">Technical foundations</h2>
              </div>
              <p>
                Shared guidance keeps architecture, assurance, and lifecycle
                information consistent across product boundaries.
              </p>
            </div>
            <div className={styles.foundationGrid}>
              {foundationLinks.map((item) => (
                <Link
                  key={item.title}
                  className={styles.foundationCard}
                  to={item.href}
                >
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.boundarySection}
          aria-labelledby="boundary-heading"
        >
          <div className="container">
            <div className={styles.boundaryCard}>
              <div className={styles.boundaryIcon} aria-hidden="true">
                <span />
              </div>
              <div>
                <p className={styles.kicker}>Know what belongs here</p>
                <h2 id="boundary-heading">Public documentation, by design</h2>
                <p>
                  This site contains public technical guidance.
                  Customer-specific instructions, internal operations,
                  credentials, audit evidence, and environment details remain in
                  approved private systems.
                </p>
              </div>
              <Link to="/security/publication-boundary/">
                Read the publication boundary <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.linkSection} aria-labelledby="links-heading">
          <div className="container">
            <div className={styles.linkPanel}>
              <div>
                <p className={styles.kicker}>Continue exploring</p>
                <h2 id="links-heading">Product context and public source</h2>
                <p>
                  Marketing and company information stays on the Lightning IT
                  website. Code-specific guidance remains with the applicable
                  public repository.
                </p>
              </div>
              <div className={styles.linkActions}>
                <Link href="https://l-it.io/produkte/lcp">
                  Lightning IT Control Platform{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="https://github.com/lightning-it">
                  Public GitHub repositories <span aria-hidden="true">↗</span>
                </Link>
                <Link href="https://github.com/lightning-it/modulix-automation">
                  ModuLix automation source <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
