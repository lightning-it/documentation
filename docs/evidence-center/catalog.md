---
id: evidence-center-catalog
title: Public evidence catalog
description: Understand the generated catalog and its current public records.
slug: /evidence/catalog/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience: [customers, security reviewers, compliance reviewers]
  last_reviewed: "2026-07-29"
  review_cadence: annual
---

# Public evidence catalog

The canonical catalog is generated deterministically from reviewed JSON records
under `evidence/records/`. Category pages and this explanation are views, not
duplicate evidence sources.

## Current normalized records

| Stable record                             | Status        | Scope and limitation                                                                                   |
| ----------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| `ev-documentation-content-validation@1.0` | `passed`      | Repository checks for the exact public documentation commit; no customer-environment conclusion.       |
| `ev-external-assurance-unavailable@1.0`   | `unavailable` | No affirmative portfolio-wide external-assurance record; does not disclose protected assessment state. |

Use the machine-readable
[catalog](https://docs.l-it.io/evidence/catalog.json) for filters and the
[manifest](https://docs.l-it.io/evidence/manifest.json) for exact record and
catalog digests.
Consumers must preserve status, scope, review state, limitations, and
supersession rather than showing only passing records.

## Historical and unavailable records

Failed, unavailable, withheld, expired, superseded, revoked, and tombstone
records remain addressable while retained. A tombstone preserves the stable ID,
former category, terminal status, owner, dates, supersession, and a safe reason;
it never points to a protected artifact.
