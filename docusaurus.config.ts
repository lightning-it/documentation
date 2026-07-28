import type { Config } from "@docusaurus/types";
import type { Options as ClassicPresetOptions } from "@docusaurus/preset-classic";
import type { ThemeConfig } from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

const accessibleGithubColors: Record<string, string> = {
  "#00009f": "#00009f",
  "#00a4db": "#005a83",
  "#36acaa": "#006c6a",
  "#393a34": "#24292f",
  "#6f42c1": "#6639ba",
  "#999988": "#57606a",
  "#d73a49": "#a40e26",
  "#e3116c": "#a90045",
};

const accessibleGithubTheme = {
  ...prismThemes.github,
  plain: {
    ...prismThemes.github.plain,
    color: "#24292f",
  },
  styles: prismThemes.github.styles.map(({ types, style }) => ({
    types,
    style: {
      ...style,
      ...(style.color
        ? {
            color:
              accessibleGithubColors[style.color.toLowerCase()] ?? "#24292f",
          }
        : {}),
    },
  })),
};

const config: Config = {
  title: "Lightning IT Documentation",
  tagline:
    "Public technical documentation for the Lightning IT product portfolio",
  favicon: "img/brand/favicon.svg",

  url: "https://docs.l-it.io",
  baseUrl: "/",
  trailingSlash: true,

  organizationName: "lightning-it",
  projectName: "documentation",

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  onDuplicateRoutes: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "mask-icon",
        href: "/img/brand/mask-icon.svg",
        color: "#b0003a",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "theme-color",
        content: "#11151a",
      },
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          breadcrumbs: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl:
            "https://github.com/lightning-it/documentation/edit/develop/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          lastmod: "date",
          ignorePatterns: [
            "/search/**",
            "/404",
            "/404/**",
            "/404.html",
            "/404.html/**",
          ],
        },
      } satisfies ClassicPresetOptions,
    ],
  ],

  themeConfig: {
    image: "img/social-card.png",
    metadata: [
      {
        name: "keywords",
        content:
          "Lightning IT, AIO, ModuLix, Wunderbox, Workbench, Atlas, governance, automation, infrastructure, observability",
      },
      {
        name: "application-name",
        content: "Lightning IT Documentation",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Lightning IT Docs",
      hideOnScroll: false,
      logo: {
        alt: "Lightning IT Documentation home",
        src: "img/brand/documentation-mark.svg",
        width: 34,
        height: 34,
      },
      items: [
        {
          label: "Products",
          position: "left",
          items: [
            { label: "AIO — Run", to: "/aio/" },
            { label: "Wunderbox — Host", to: "/wunderbox/" },
            {
              label: "Workbench — Develop & Validate",
              to: "/workbench/",
            },
            { label: "Atlas — Observe", to: "/atlas/" },
            {
              label: "Platform Governance & Evidence — Verify",
              to: "/platform-governance-evidence/",
            },
          ],
        },
        { label: "Foundation", to: "/modulix/", position: "left" },
        { label: "Architecture", to: "/architecture/", position: "left" },
        {
          label: "Trust",
          position: "left",
          items: [
            { label: "Security", to: "/security/" },
            { label: "Compliance", to: "/compliance/" },
            { label: "Lifecycle and releases", to: "/releases/" },
          ],
        },
        {
          href: "https://l-it.io",
          label: "l-it.io",
          position: "right",
          className: "navbar__external-link",
        },
        {
          href: "https://github.com/lightning-it/documentation",
          label: "GitHub",
          position: "right",
          className: "navbar__external-link",
          "aria-label": "Lightning IT Documentation on GitHub",
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Products",
          items: [
            { label: "AIO", to: "/aio/" },
            { label: "Wunderbox", to: "/wunderbox/" },
            { label: "Workbench", to: "/workbench/" },
            { label: "Atlas", to: "/atlas/" },
            {
              label: "Platform Governance & Evidence",
              to: "/platform-governance-evidence/",
            },
          ],
        },
        {
          title: "Foundation",
          items: [{ label: "ModuLix", to: "/modulix/" }],
        },
        {
          title: "Documentation",
          items: [
            { label: "Architecture", to: "/architecture/" },
            { label: "Security", to: "/security/" },
            { label: "Compliance", to: "/compliance/" },
            { label: "Support", to: "/support/" },
          ],
        },
        {
          title: "Lightning IT",
          items: [
            {
              label: "Lightning IT Control Platform",
              href: "https://l-it.io/produkte/lcp",
            },
            {
              label: "Public repositories",
              href: "https://github.com/lightning-it",
            },
            {
              label: "Contribute to these docs",
              href: "https://github.com/lightning-it/documentation",
            },
            {
              label: "Third-party notices",
              href: "pathname:///THIRD_PARTY_NOTICES.txt",
              target: "_blank",
              rel: "noopener noreferrer",
            },
          ],
        },
      ],
      copyright:
        "Copyright © 2026 Lightning IT. Documentation source licensed under MIT.",
    },
    prism: {
      theme: accessibleGithubTheme,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "diff",
        "docker",
        "ini",
        "json",
        "powershell",
        "toml",
        "yaml",
      ],
    },
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
      options: {
        securityLevel: "strict",
      },
    },
  } satisfies ThemeConfig,
};

export default config;
