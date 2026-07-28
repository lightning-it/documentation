---
id: information-architecture
title: Information architecture and navigation model
description: Define the target site map, taxonomy, canonical routes, cross-links, and accessible navigation contract.
slug: /architecture/information-architecture/
sidebar_position: 8
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation architects
    - product owners
    - content designers
    - accessibility reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Information architecture and navigation model

This planning record defines the target public information architecture. It
does not create routes or authorize implementation. Product and foundation
labels follow the
[product taxonomy decision](./product-taxonomy-decision.md); Issue #135 owns
their route and navigation migration.

## Audience and findability model

Readers enter by intent rather than organization chart:

| Audience             | Primary question                          | Primary entry                         | Required onward paths                      |
| -------------------- | ----------------------------------------- | ------------------------------------- | ------------------------------------------ |
| Evaluator            | What outcome and boundary does this have? | Home, portfolio, product overview     | trust, limitations, support                |
| Practitioner         | How do I use or operate it safely?        | product task and operations pages     | prerequisites, security, troubleshooting   |
| Architect            | How does it fit and what are the limits?  | architecture and product architecture | integrations, trust, evidence, decisions   |
| Security reviewer    | What is publicly supported and governed?  | Trust Center                          | security, evidence, compliance mappings    |
| Compliance reviewer  | Which evidence supports which mapping?    | Compliance and Evidence centers       | authority, limitations, source record      |
| Contributor          | How do I change documentation?            | Contributing and governance           | templates, lifecycle, validation, approval |
| Support-seeking user | How do I recover or escalate?             | Support                               | product troubleshooting, safe contacts     |

Labels use reader language, not repository paths. Every landing page states
scope, intended audience, canonical owner, and the next useful destinations.

## Target top-level site map

```text
Home
├── Get started
├── Products
│   └── <approved product> (repeatable)
│       ├── Overview
│       ├── Concepts
│       ├── Architecture
│       ├── Use / procedures
│       ├── Operations
│       ├── Security
│       ├── Troubleshooting
│       ├── Lifecycle / releases
│       └── Reference
├── Foundations
│   └── <approved shared foundation> (repeatable)
├── Trust Center
│   ├── Security
│   ├── Privacy and publication boundary
│   ├── Reliability and recovery
│   └── Responsible disclosure and support
├── Evidence Center
│   ├── Evidence catalog
│   ├── Validation and provenance
│   ├── Approval and publication records
│   └── Retention and limitations
├── Compliance
│   ├── Mapping method
│   └── <framework mapping> (repeatable)
├── Architecture
├── Documentation governance
├── Releases
├── Support
├── Reference
└── Contributing
```

This covers every #15 area while keeping product content separate from shared
standards. Restricted references are never nodes in the public tree. A public
page may cite only an approved public extract or safe authority reference.

## Canonical location and ownership

| Area                     | Canonical route              | Canonical source                              | Owner                     |
| ------------------------ | ---------------------------- | --------------------------------------------- | ------------------------- |
| Home                     | `/`                          | site shell                                    | Documentation Maintainers |
| Getting started          | `/getting-started/`          | `docs/getting-started.*`                      | Documentation Maintainers |
| Product                  | `/products/<product>/`       | `docs/products/<product>/`                    | Named Product Owner       |
| Foundation               | `/foundations/<foundation>/` | `docs/foundations/<foundation>/`              | Named Foundation Owner    |
| Trust Center             | `/trust/`                    | `docs/trust/`                                 | Security and Trust Owner  |
| Evidence Center          | `/evidence/`                 | `docs/evidence/` plus governed evidence index | Evidence Owner            |
| Compliance               | `/compliance/`               | `docs/compliance/`                            | Compliance Owner          |
| Architecture             | `/architecture/`             | `docs/architecture/`                          | Documentation Architects  |
| Documentation governance | `/documentation-governance/` | `docs/documentation-governance/`              | Documentation Maintainers |
| Releases                 | `/releases/`                 | `docs/releases/`                              | Release Owner             |
| Support                  | `/support/`                  | `docs/support/`                               | Support Owner             |
| Reference                | `/reference/`                | `docs/reference/`                             | Documentation Maintainers |
| Contributing             | `/contributing/`             | `docs/contributing/`                          | Repository Maintainers    |

Current product routes remain canonical during transition. Moving them beneath
`/products/` is a target option, not an implicit redirect decision. Issue #135
must approve and verify the route mapping and redirects before migration.

Each planned page has exactly one canonical source and owner. A sidebar entry,
card, search result, tag, translation, version, or framework view points to that
record and does not become another canonical owner.

## Extensible product subtree

A product is added without changing the top-level model:

1. approve its public name, stable identifier, role, and Product Owner;
2. create one landing page using the product documentation standard;
3. add only applicable child types from the standard product subtree;
4. link shared trust, compliance, evidence, and governance pages instead of
   copying them;
5. validate routes, navigation, search, accessibility, and redirects; and
6. bind approval to the resulting exact document digest.

Foundations follow the same process under a distinct namespace. Promotion from
foundation to product is a consequential taxonomy and compatibility decision.

## Documentation taxonomy

Taxonomy is metadata for filtering, validation, and relationships; it does not
create routes automatically.

| Facet          | Controlled values or rule                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Content type   | overview, concept, architecture, procedure, operations, security, troubleshooting, reference, evidence, policy, mapping, release |
| Audience       | evaluator, practitioner, architect, security, compliance, contributor, support                                                   |
| Product        | approved stable product identifier; omitted for portfolio-wide content                                                           |
| Component      | approved product-local or shared component identifier                                                                            |
| Lifecycle      | proposed, review-candidate, maintained, deprecated, retired                                                                      |
| Approval       | pending, approved, rejected, expired                                                                                             |
| Evidence       | zero or more stable evidence identifiers with relation: supports, verifies, supersedes, or limits                                |
| Locale         | BCP 47 language tag with one canonical source-language relationship                                                              |
| Version        | unversioned-current or an explicit supported documentation version                                                               |
| Classification | published pages are `PUBLIC`; `PUBLIC_AFTER_SANITIZATION` source requires the independent review defined by `AGENTS.md`          |

Facet values require a controlled registry, owner, documented addition rule,
and validation. Free-form tags must not silently define products, controls, or
approval state.

## Cross-link contract

- Product pages link outward to canonical shared security, trust, compliance,
  evidence, support, and governance records.
- Shared pages link inward only when a product-specific relationship is
  verified and useful; they do not imply blanket product coverage.
- Procedures link prerequisites before actions and verification, recovery, and
  support after actions.
- Compliance mappings link both the public authority and qualifying evidence;
  evidence links back to the exact claim or mapping it supports.
- Deprecated pages link to their successor and retirement record.
- Link text describes the destination without relying on surrounding context.

## URL, slug, redirect, and duplicate-content rules

1. Canonical routes are lower-case, human-readable, slash-terminated, stable,
   and independent of sidebar order.
2. A page declares a stable document `id` and explicit `slug`; filename changes
   do not silently change a public route.
3. Product, locale, and version identifiers use controlled registries.
4. A moved or renamed published route receives a permanent one-hop redirect to
   the canonical route. Redirect chains, loops, wildcard ambiguity, and
   cross-classification redirects are prohibited.
5. Redirect records include old route, canonical route, reason, owner,
   introduction date, review trigger, and removal decision.
6. One content body owns each canonical claim. Repeated summaries are short,
   linked, and tested for conflicting normative language.
7. Query parameters, fragments, translated views, printable views, and search
   facets do not create additional canonical ownership.
8. Breadcrumbs reflect the information hierarchy, not browser history:
   `Home > top-level landing > optional product/foundation > page`.
9. Breadcrumb labels match navigation labels, remain keyboard-operable, expose
   an accessible navigation name, and mark the current page.

## Navigation contract

Global navigation exposes Home, Products, Trust, Evidence, Compliance, Support,
and search. The documentation sidebar exposes the complete hierarchy for the
current top-level area. In-page navigation exposes logical headings only.
Previous/next links follow curated task sequence, not incidental filename order.

### Accessibility and responsive validation

Acceptance requires:

- desktop navigation at supported viewport widths without obscured content;
- a mobile menu that opens, closes, traps no focus, restores focus to its
  trigger, and remains usable at 400% zoom;
- complete keyboard operation with logical order, visible focus, skip link, and
  no keyboard trap;
- semantic `nav` landmarks with unique accessible names, correct expanded
  state, current-page state, headings, lists, and link names;
- no meaning conveyed only by color, position, hover, icon, or animation;
- reduced-motion support and adequate pointer target size;
- breadcrumbs, sidebar, global navigation, search, and previous/next links
  available to assistive technology;
- route, orphan-page, duplicate-ID, duplicate-canonical, redirect, and broken
  cross-link validation; and
- representative automated and manual checks for each top-level area, product
  subtree, locale, and supported version.

## Current, transition, and target decisions

Current state uses explicit product categories plus Architecture, Security,
Compliance, Documentation governance, Releases, Support, Reference, and
Contributing. Trust and Evidence centers and a distinct Foundations namespace
are absent.

During transition, existing routes and labels remain stable while #29–#33
define the missing centers, taxonomy relationships, localization, and search.
No placeholder is exposed as if complete.

The target adopts this site map after #38 approval. Implementation must include
a route inventory, redirect table, orphan report, responsive and assistive-
technology results, and exact-digest approval evidence.

## Open decisions

| Decision                                    | Owner                      | Resolution gate    |
| ------------------------------------------- | -------------------------- | ------------------ |
| Approved product and foundation identifiers | Product Owner              | #38                |
| Preserve or migrate current product roots   | Product Owner              | #38 ADR            |
| Trust and Evidence Center page inventory    | Trust/Evidence Owners      | #29/#30            |
| Locale prefix and source-language behavior  | Documentation Maintainers  | #33                |
| Documentation version position in URLs      | Product and Release Owners | #33                |
| Redirect retention and removal threshold    | Documentation Maintainers  | implementation ADR |

Until those decisions are accepted, existing public routes and the current
portfolio wording remain authoritative.
