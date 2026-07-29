---
id: trust-overview
title: Trust Center
description: Review bounded public statements about Lightning IT engineering, assurance, and governance.
slug: /trust/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience: [customers, partners, security reviewers, compliance reviewers]
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Trust Center

This Trust Center separates approved rules, documented processes, verified
implementation, evidence, and future intent. A statement applies only to its
named scope. It is not a certification, audit opinion, or promise that every
practice applies to every customer environment.

## How to read a trust statement

| Visible type                           | What it means                                                        |
| -------------------------------------- | -------------------------------------------------------------------- |
| **Policy**                             | An approved rule or intent; it does not prove execution.             |
| **Documented process**                 | A repeatable procedure; it does not prove a run occurred.            |
| **Current implementation**             | A capability verified for the stated revision and scope.             |
| **Objective evidence**                 | An attributable observation with identity, method, date, and limits. |
| **External verification**              | A bounded conclusion by a named independent party.                   |
| **Target state / planned improvement** | A destination or tracked change, not current behavior.               |
| **Unverified**                         | Support is missing or stale; no affirmative conclusion is allowed.   |

## Topics and accountable roles

| Topic                               | Accountable role                 | Public page                                             |
| ----------------------------------- | -------------------------------- | ------------------------------------------------------- |
| Principles and accountability       | Engineering Governance Owner     | [Principles](./principles.md)                           |
| Development lifecycle               | Engineering Process Owner        | [Development](./development.md)                         |
| AI-assisted engineering             | AI Governance Owner              | [AI-assisted engineering](./ai-assisted-engineering.md) |
| Quality and testing                 | Quality Owner                    | [Quality](./quality.md)                                 |
| Release and maintenance             | Release Owner                    | [Releases](./releases.md)                               |
| Security and vulnerability handling | Security Owner                   | [Security](./security.md)                               |
| Dependency and supply chain         | Supply-chain Owner               | [Supply chain](./supply-chain.md)                       |
| Assurance frameworks and formats    | Assurance Owner                  | [Assurance](./assurance.md)                             |
| Build integrity                     | Build and Release Owner          | [Build integrity](./build-integrity.md)                 |
| Compliance positioning              | Compliance Owner                 | [Compliance positioning](./compliance-positioning.md)   |
| Evidence and document governance    | Evidence and Documentation Owner | [Governance](./governance.md)                           |

Restricted findings, risks, incidents, customer evidence, credentials,
topology, and audit work papers are never published here. Missing safe public
support is shown as **Unverified** or as an owned gap.
