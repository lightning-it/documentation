# Lightning IT Documentation

<!-- BEGIN LIT_QUALITY_BADGES -->

[![CI](https://github.com/lightning-it/documentation/actions/workflows/repository-quality.yml/badge.svg?branch=develop)](https://github.com/lightning-it/documentation/actions/workflows/repository-quality.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/lightning-it/documentation/badge)](https://scorecard.dev/viewer/?uri=github.com/lightning-it/documentation)
[![CodeQL](https://github.com/lightning-it/documentation/actions/workflows/codeql.yml/badge.svg?branch=develop)](https://github.com/lightning-it/documentation/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

<!-- END LIT_QUALITY_BADGES -->

<!-- BEGIN LIT_SHARED_RELEASE_MODEL -->

## Release and Quality Model

This repository follows the Lightning IT shared release and quality model.

See [RELEASE.md](./RELEASE.md) for:

- branch and release flow
- required quality checks
- test matrix
- release evidence
- artifact publishing
- supported repository-specific release behavior

Repository classification: **Shared-Assets-Managed Repository**.
Required test profiles: `repository-structure`.
Publishing targets: `none`.

## Supported and Tested Platforms

| Platform / Product |                  Status | Validation         |
| ------------------ | ----------------------: | ------------------ |
| ubuntu-latest      |               Supported | Repository quality |
| generic            | Tested where applicable | Repository quality |

<!-- END LIT_SHARED_RELEASE_MODEL -->

Source for the public technical documentation at <https://docs.l-it.io>.

This repository explains the Lightning IT product portfolio: ModuLix
(automation content), IO (automation runtime), Wunderbox (infrastructure
platform), and Atlas (observability platform). The products are peers. The
shorthand “Build → ModuLix, Run → IO, Host → Wunderbox, Observe → Atlas”
describes how their responsibilities interact; it is not a parent-child
hierarchy.

Product and company information remains on the TYPO3 site at
<https://l-it.io>. The separate customer portal at <https://portal.l-it.io>
has a different purpose and is not part of this documentation platform.

## Release and quality model

Repository classification: **public documentation application**.

Supported runtime and build platform:

| Platform             | Supported | Validation                         |
| -------------------- | --------: | ---------------------------------- |
| Node.js 24 LTS       |       Yes | CI and Cloudflare production build |
| npm lockfile install |       Yes | `npm ci`                           |
| Current Chromium     |       Yes | Playwright and accessibility tests |
| Cloudflare Pages     |       Yes | Static `build/` output             |

See [RELEASE.md](./RELEASE.md) for the branch, release, deployment, evidence,
and rollback model. See [TESTING.md](./TESTING.md) for quality gates.

## Local prerequisites

- Node.js 24 LTS (the exact line is recorded in `.node-version`)
- npm from that Node.js distribution
- Git

No Cloudflare credential is required to build or preview the site locally.

## Develop locally

```bash
npm ci
npm run start
```

The development server is for authoring. A production-equivalent preview,
including the Pagefind index, uses:

```bash
npm run build
npm run serve
```

Run the complete local quality gate with:

```bash
npm run validate
```

Individual formatting, lint, type, unit, content, accessibility, end-to-end,
and link checks are documented in [TESTING.md](./TESTING.md).

## Content contribution

Read [AGENTS.md](./AGENTS.md) before changing content, including for
AI-assisted changes. Every page must be intentionally public, useful without
private infrastructure, and assigned proportionate document metadata.

Use Markdown by default. Use MDX only for an interactive component that cannot
be expressed accessibly in Markdown. Conceptual and cross-product material
lives here; code-specific contributor documentation remains next to code in
its component repository. Reproducibly generated references must record their
source repository and immutable source commit.

Contributions follow this flow:

1. Branch from `develop`.
2. Add or update content, metadata, navigation, and tests together.
3. Open a pull request to `develop` and complete the review checklist.
4. Promote validated `develop` to stable `main` through a pull request.
5. Cloudflare Pages deploys `main`; post-deployment checks record acceptance.

The detailed review and approval process is in
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Public-content boundary

Allowed content is generic, intentionally public, and reproducible with safe
examples. Prohibited content includes credentials; customer data; internal
hostnames, domains, addresses, inventories, diagrams, paths, repository names,
support contacts, escalation paths, recovery material, audit evidence, or
security findings; and anything whose publication status is unresolved.

Use RFC-reserved examples such as `example.com`, `192.0.2.10`,
`198.51.100.10`, `203.0.113.10`, `2001:db8::/32`, `customer-example`, and
`host01.example.com`. When in doubt, do not publish the material and request a
security review through a private channel described in [SECURITY.md](./SECURITY.md).

## Generated documentation

Generated component references may be imported from public repositories only
when the source is pinned to an immutable tag or commit and the generated page
records that provenance. Public untrusted builds never fetch private
repositories. A source-format change must fail with a clear diagnostic rather
than silently produce incomplete documentation.

## Migration provenance

The initial site was developed after a conservative inventory of an approved
private operations-documentation source. Nothing was copied wholesale. Public
candidate pages were independently re-authored from generic topic intent and
public component documentation; they remain pending human semantic, security,
technical, and licensing review. Private and customer-specific operating
procedures remain in their approved private repository. The public migration
summary intentionally does not expose the private repository name, source
paths, or findings.

## Deployment and rollback

GitHub Actions validates and archives `build/` once, verifies its recorded
SHA-256 digest, and publishes that retained artifact to Cloudflare Pages through
the protected `production` environment without rebuilding it. The protected
`preview` environment uses a distinct credential to publish the exact reviewed
`develop` candidate. A missing or stale preview blocks the protected
`develop`-to-`main` promotion. To roll back, redeploy the last accepted
immutable artifact with the protected `Production Rollback` workflow. Supply
the source `Release Evidence` run ID and the full commit recorded in its
manifest, select `rollback`, and approve the protected environment. The
workflow verifies the manifest and digest, deploys without rebuilding, and
runs production acceptance. After the exercise or incident, run the same
workflow with the current accepted release and select `restore`. If an artifact
is no longer retained, use a reviewed recovery promotion. See
[ARCHITECTURE.md](./ARCHITECTURE.md) and [RELEASE.md](./RELEASE.md).

## Security and support

Do not report vulnerabilities in public issues. Follow
[SECURITY.md](./SECURITY.md). Public documentation questions and contribution
support are described in [SUPPORT.md](./SUPPORT.md).

## License

Unless a file states otherwise, repository source and documentation are
licensed under the [MIT License](./LICENSE). Third-party material remains
under its respective license and must be attributed.
