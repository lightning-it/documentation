---
id: documentation-current-state-assessment
title: Documentation platform current-state assessment
description: Record the evidence-backed baseline and prioritized gaps against documentation Goal #15.
slug: /architecture/current-state-assessment/
sidebar_position: 4
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation architects
    - maintainers
    - reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Documentation platform current-state assessment

This assessment records the verified repository state at commit
`918add1c6b94463780e2240b78300a534ccbdd20`. It does not infer production,
approval, certification, control effectiveness, or private-source facts.

## Verified baseline

| Area              | Verified current state                                                                                                                       | Evidence                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Repository        | Public Docusaurus repository; `develop` integration and `main` stable branch                                                                 | `ARCHITECTURE.md`, `RELEASE.md`, `.lit/repository.yml`                                   |
| Application       | Static Docusaurus 3.10.2 site with TypeScript and explicit sidebars                                                                          | `package.json`, `docusaurus.config.ts`, `sidebars.ts`                                    |
| Runtime toolchain | Node 24.18.0, npm 11.x, locked dependencies                                                                                                  | `.node-version`, `package.json`, `package-lock.json`                                     |
| Build             | Static `build/` output, deployment marker, CSP hashes, notices                                                                               | `package.json`, `scripts/generate-deployment-marker.mjs`                                 |
| Search            | Pagefind 1.5.2 indexes rendered public output locally                                                                                        | `package.json`, `src/components/Search.tsx`                                              |
| Content           | Product and cross-product pages exist; portfolio naming is inconsistent with the proposed target                                             | `docs/`, `AGENTS.md`, `docs/architecture/product-documentation-standard.md`              |
| Navigation        | Explicit sidebar covers products, architecture, security, compliance, governance, reference, releases, support, contributing                 | `sidebars.ts`                                                                            |
| Governance        | Classification boundary, metadata baseline, single-maintainer exception, exact-digest approval mechanism                                     | `AGENTS.md`, `CODEX_EXECUTION_GUIDE.md`, `evidence/document-approval-*.json`             |
| Validation        | Format, lint, spelling, type, metadata, links, licenses, audit, build, site, browser, accessibility, Lighthouse                              | `package.json`, `.github/workflows/documentation-ci.yml`                                 |
| Supply chain      | Lockfile, pinned workflow actions, CodeQL, dependency review, SBOM commands                                                                  | `package-lock.json`, `.github/workflows/`, `package.json`                                |
| Migration         | Aggregate initial migration evidence and a public-safe Platform Governance & Evidence plan                                                   | `evidence/migration-*`, `evidence/platform-governance-evidence-migration-inventory.json` |
| Deployment        | Architecture and workflows describe Cloudflare Pages; repository evidence alone does not prove every route or current revision in production | `ARCHITECTURE.md`, `.github/workflows/`, issue #40                                       |
| Release           | Repository classification says no packaged release artifact; static-site promotion still uses protected branches                             | `RELEASE.md`, `.lit/repository.yml`                                                      |
| Evidence          | Generated validation records exist locally or in workflows; complete public Evidence Center is not established                               | `evidence/`, issue #30                                                                   |

## Goal #15 traceability

| Goal scope                                     | Current disposition                                                                  | Gap class                     | Planned owner |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------- | ------------- |
| Current-state and gap assessment               | this document                                                                        | complete when accepted        | #23           |
| Governance, release, licensing reconciliation  | source files contain tensions                                                        | partial                       | #24           |
| Target platform and repository architecture    | `ARCHITECTURE.md` is useful but incomplete as a governed target package              | partial                       | #25           |
| Information architecture, site map, navigation | sidebar exists; complete governed model absent                                       | partial                       | #26           |
| Metadata, lifecycle, versioning                | baseline and validators exist; full state model absent                               | partial                       | #27           |
| Templates and reusable components              | accepted target standard and product template                                        | implemented planning artifact | #28           |
| Trust Center                                   | security and governance pages exist; canonical center model absent                   | missing                       | #29           |
| Evidence Center and retention                  | evidence files exist; governed center and retention model absent                     | partial                       | #30           |
| Compliance mapping                             | one BSI page exists; extensible framework model absent                               | partial                       | #31           |
| Public/private security architecture           | accepted planning artifact                                                           | implemented planning artifact | #32           |
| Localization and search                        | English static search exists; bilingual governance and version-aware strategy absent | partial                       | #33           |
| GitHub lifecycle traceability                  | workflows and issue links exist; end-to-end model absent                             | partial                       | #34           |
| CI/CD and Cloudflare architecture              | implementation exists in parts; complete accepted handoff absent                     | partial/unverified            | #35           |
| Migration inventory and plan                   | initial aggregate evidence plus product plan                                         | partial                       | #36           |
| Dependency graph and implementation breakdown  | absent                                                                               | missing                       | #37           |
| Integrated architecture approval               | absent; implementation remains blocked                                               | blocked                       | #38           |
| Production acceptance                          | base site evidence exists; product-specific acceptance absent                        | unverified                    | #40           |

## Prioritized gaps

| Priority | Gap                                                                     | Impact                                               | Dependency            | Recommended disposition            |
| -------- | ----------------------------------------------------------------------- | ---------------------------------------------------- | --------------------- | ---------------------------------- |
| P0       | Governance and target taxonomy contradict current repository statements | ambiguous authority and unsafe automated remediation | #23                   | decide in #24 and integrate in #38 |
| P0       | Integrated architecture lacks explicit maintainer approval              | implementation prohibited                            | #24–#37               | complete #38                       |
| P0       | Platform Governance & Evidence route and exact-digest approval absent   | #115 cannot publish                                  | #28, #32, #36–#38, #2 | implement only after gate          |
| P1       | Target architecture and directory ownership are incomplete              | future work can duplicate or cross trust boundaries  | #24                   | complete #25                       |
| P1       | Metadata, evidence, Trust and Compliance models are incomplete          | claims and lifecycle may be inconsistent             | #25–#30               | complete #27, #29–#31              |
| P1       | CI/CD and production handoff lacks one accepted architecture            | deployment decisions may be inferred                 | #25, #30, #34         | complete #35                       |
| P2       | Localization and version-aware search are not governed                  | stale or ambiguous results                           | #26, #27              | complete #33                       |
| P2       | GitHub-derived traceability lacks one deterministic contract            | incomplete or stale generated claims                 | #25, #27, #30, #31    | complete #34                       |

## Inconsistencies and stale or unproven statements

- `AGENTS.md` and `docs/architecture/index.md` describe four peer products,
  while the accepted #28 target proposes five sellable products and ModuLix as
  a foundation. This dated finding was resolved by the superseding taxonomy
  decision in #147; #135 owns implementation of that decision.
- Goal #15 uses both AIO and older product terminology. Naming changes require
  a governed target decision and later implementation, not silent rewriting.
- `RELEASE.md` says release evidence is disabled for packaged artifacts, while
  the static site still requires deployment and approval evidence. #24 must
  distinguish package release evidence from documentation publication evidence.
- Repository configuration and workflows demonstrate designed deployment
  behavior, not the current production revision or route-level acceptance.
- Existing approval evidence covers its recorded document set and digest only;
  it does not approve future architecture or product documents.
- Generated files under `evidence/generated/` are build outputs and do not by
  themselves prove external production behavior.

## Explicit unknowns

Public repository evidence does not establish restricted Cloudflare identifiers,
private source mappings, customer data, detailed risks, credential state, or
private approval records. Those facts remain outside this assessment. Production
claims require external verification and a safe evidence record through #40.
