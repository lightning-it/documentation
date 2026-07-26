---
id: product-documentation-standard
title: Product documentation standard
description: Define the governed product-page structure, reusable components, and adoption gates.
slug: /architecture/product-documentation-standard/
sidebar_position: 4
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - product owners
    - documentation contributors
    - reviewers
  last_reviewed: "2026-07-25"
  review_cadence: annual
---

# Product documentation standard

This standard defines the target structure for public product documentation. It
is an authoring and review contract, not evidence that a product or capability
is implemented.

## Portfolio boundary

Public product navigation contains four peer products:

1. ModuLix;
2. IO;
3. Wunderbox; and
4. Atlas.

None of these products is a child of another. Each product evolves
independently under the common metadata, publication, review, and lifecycle
controls in this repository.

## Product page contract

Use
[the product documentation template](https://github.com/lightning-it/documentation/blob/0761a3aa0949cbb17352825661e37d544a870da5/templates/product-documentation.md)
for a new product landing page. Markdown is the default. MDX requires a
recorded need for interaction that semantic Markdown and existing components
cannot meet, an accessibility test, a content-safety review, an owner, and a
maintenance plan.

### Required sections

Every product page defines:

- purpose and intended outcome;
- target audiences;
- scope, exclusions, and responsibility boundary;
- prerequisites and assumptions;
- bounded deliverables and limitations;
- verification, review, and acceptance;
- security and information-protection considerations;
- lifecycle, ownership, approval role, and related artifacts.

Describe only verified public capabilities. Do not turn planned work, code
presence, a preview, or a private source statement into a production claim.

### Conditional sections

Include architecture, procedures, operations, troubleshooting, compliance
mapping, evidence, recovery, migration, or release sections only when useful
content and an accountable owner exist. Operational instructions additionally
require authorization, preflight checks, destructive-action warnings, safe-stop
points, outcome verification, rollback or recovery, and evidence handling.

Omit an inapplicable section rather than publishing an empty placeholder. Record
a material known gap in an issue with an owner.

## Front matter and lifecycle

Substantial pages use the repository front-matter contract with a stable `id`,
stable `slug`, concise title and description, deterministic sidebar position,
and a `document` record. New or materially changed content begins with:

```yaml
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - named audience
  last_reviewed: "YYYY-MM-DD"
  review_cadence: annual
```

The content states creation source and date, implementation-verification state,
next review or review trigger, retention needs, and change-history source when
these are not already unambiguous from Git and front matter. A page becomes
`maintained` and `approved` only when role-authorized evidence covers its exact
document identifier and deterministic documentation digest.

## Reusable component model

Prefer repository-native Markdown:

| Need                    | Standard component    | Required behavior                                       |
| ----------------------- | --------------------- | ------------------------------------------------------- |
| Hierarchy               | headings and lists    | logical heading order and concise link text             |
| Comparison              | Markdown table        | header cells and a linear reading order                 |
| Material note           | Docusaurus admonition | explicit text label; meaning does not depend on color   |
| Process or relationship | Mermaid               | accessible title and description; no protected topology |
| Command or data         | fenced code block     | language, assumptions, safe synthetic values            |
| Navigation              | ordinary links        | stable public target and descriptive text               |

An added React or MDX component must use semantic HTML, work by keyboard,
preserve visible focus, expose names and states, meet contrast requirements,
respect reduced motion, and remain understandable without color. Test it against
Web Content Accessibility Guidelines (WCAG) 2.2 Level AA and the repository
browser suite. Its source has an owner; its data and generated output follow the
same classification and approval rules as prose.

## Review and acceptance

Before acceptance:

1. classify source names, content, metadata, links, assets, and generated output;
2. verify scope, prerequisites, assumptions, deliverables, and limitations;
3. validate public claims against an approved public authority;
4. complete semantic, technical, accessibility, security, privacy, and licensing
   review in proportion to the change;
5. run repository formatting, lint, type, content, link, build, search, and
   browser checks;
6. record role-authorized approval for the exact digest; and
7. verify production before claiming availability.

Acceptance is bounded to the stated scope, artifacts, checks, and evidence. It
does not assert certification, blanket compliance, absolute security, a service
level, or an unverified product capability.

## Adoption and validation plan

Adopt this standard in controlled implementation issues:

1. inventory each existing product landing page and classify it as conforming,
   extend, reconcile, replace, or retire;
2. reconcile portfolio names and roles with the four-peer-product taxonomy;
3. map existing sections to the required and conditional contracts without
   duplicating canonical content;
4. normalize front matter while preserving stable identifiers and published
   routes, recording redirects only for changed stable paths;
5. validate each product independently, including navigation, search,
   accessibility, responsive layout, links, claims, and information protection;
6. obtain exact-digest approval and production evidence; and
7. record exceptions and remaining gaps in owned issues.

The adoption is complete only when ModuLix, IO, Wunderbox, and Atlas each have
one canonical, validated product entry and are consistently presented as peer
products.
