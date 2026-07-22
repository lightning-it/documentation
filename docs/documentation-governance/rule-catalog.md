---
id: ihr-rule-catalog
title: IHR rule catalog
description: Stable machine-readable rule identifiers and maintenance policy for the LIT-DOC-IHR ruleset.
slug: /documentation-governance/ihr-rules/
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience: [documentation maintainers, tool developers]
  last_reviewed: "2026-07-22"
  review_cadence: annual
---

# IHR rule catalog

`rules/ihr-rules.yml` is the authoritative catalog for `LIT-DOC-IHR 1.0.0`.
Rule IDs remain stable and language-neutral. Findings use
`schemas/ihr-finding.schema.json` and include rule ID, severity, message, and
location. `scripts/validate-ihr.mjs` enforces every catalogued IHR rule,
including bounded secret-pattern checks; the repository-wide content validator
provides the broader secret and publication-boundary scan, while Vale supplies
additional prose checks. The initial families are `IHR-SCHEMA`, `IHR-LANG`,
`IHR-PLAN`, `IHR-PLATFORM`,
`IHR-NET`, `IHR-READY`, `IHR-ACTUAL`, `IHR-DEVIATION`, `IHR-HANDOVER`,
`IHR-ACCEPT`, `IHR-SECRET`, and `IHR-IMMUTABLE`.
