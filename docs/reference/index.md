---
id: reference-overview
title: Reference
description: Find shared terminology, verified public sources, and migration provenance.
slug: /reference/
sidebar_position: 1
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation readers
    - technical evaluators
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Reference

Use this section for portfolio-wide terms and public provenance. Exact
component variables, command options, compatibility matrices, and release
artifacts remain in their public source repositories.

## Reference paths

- [Glossary](./glossary.md) — shared terms and acronyms.
- [Verified public sources](./public-sources.md) — GitHub repositories and the
  public Lightning IT product-context page checked for this edition.
- [Migration summary](./migration-summary.md) — aggregate disposition of the
  initial legacy documentation inventory without protected paths or findings.
- [ModuLix reference](../modulix/reference.md) — ModuLix-specific public names
  and repository ownership.
- [Releases](../releases/index.md) — the distinction between source, component,
  product, deployment, and documentation versions.

## Reference rule

Resolve a technical claim to the narrowest owner:

1. This site owns portfolio hierarchy, public concepts, and cross-product
   architecture, security, compliance, lifecycle, and support guidance.
2. A public component repository owns its code, variables, build, test,
   compatibility, and artifact instructions.
3. A verified release owns the immutable behavior and evidence for that
   version.
4. An authorized environment record owns deployment topology, inventory,
   credentials, operating procedures, and acceptance evidence.

Do not fill a missing lower-level reference with an assumption at a higher
level.
