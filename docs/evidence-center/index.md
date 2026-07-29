---
id: evidence-center-overview
title: Evidence Center
description: Review attributable, versioned, public-safe evidence without broadening its scope.
slug: /evidence/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - customers
    - security reviewers
    - compliance reviewers
    - engineering contributors
  last_reviewed: "2026-07-29"
  review_cadence: annual
---

# Evidence Center

The Evidence Center publishes reviewed summaries of bounded observations. Each
record identifies its subject, revision, method, result, owner, review state,
retention class, relationships, and limitations. A passing record never means
that a wider product is secure, compliant, certified, production-ready, or
free of defects.

## Public boundary

Public records are generated from an allowlisted schema. They exclude raw
scanner output, customer or personal data, credentials, private URLs,
hostnames, topology, findings, risk acceptance, audit work papers, and incident
detail. Protected source material remains in separately authorized systems.
The public record may state `withheld` or `unavailable` without exposing a
private identifier or confirming that protected evidence exists.

## Status model

| Status           | Public meaning                                               |
| ---------------- | ------------------------------------------------------------ |
| `passed`         | The named method met the bounded acceptance rule.            |
| `failed`         | The method ran and did not meet the rule.                    |
| `warning`        | The method completed with a material limitation.             |
| `not-applicable` | An accountable owner recorded why the method does not apply. |
| `unavailable`    | Expected public evidence cannot currently be obtained.       |
| `withheld`       | Public release of the source is prohibited.                  |
| `expired`        | The observation is outside its review or validity window.    |
| `superseded`     | A linked later record replaces current interpretation.       |
| `revoked`        | The owner invalidated the record or authorization.           |

Zero-count states remain in the generated manifest so failure and absence
cannot disappear from summaries.

## Continue

- [Public catalog](./catalog.md)
- [Schema, retention, and publication governance](./governance.md)
- Machine-readable [catalog](https://docs.l-it.io/evidence/catalog.json)
- Machine-readable [manifest](https://docs.l-it.io/evidence/manifest.json)
