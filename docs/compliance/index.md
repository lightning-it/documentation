---
id: compliance-overview
title: Compliance documentation approach
description: Understand how public documentation supports mapping without making certification or control claims.
slug: /compliance/
sidebar_position: 1
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - security managers
    - auditors
    - documentation owners
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Compliance documentation approach

Public documentation can explain scope, ownership, architecture, security
objectives, lifecycle, and a mapping method. It cannot replace an implemented
control, target-object assessment, protected risk register, or audit evidence.

:::caution No certification claim
This site does not claim BSI or ISO certification, conformity, audit success,
complete control implementation, or accepted residual risk for Lightning IT,
its products, or any deployment.
:::

## Public and protected records

| Public documentation                           | Protected management or environment record             |
| ---------------------------------------------- | ------------------------------------------------------ |
| Product purpose and responsibility boundary    | Concrete information domain and target objects         |
| General security and architecture objectives   | Implemented controls and technical configuration       |
| Mapping approach and document categories       | Applicable requirements and module selection           |
| Generic backup, recovery, and lifecycle method | Real objectives, targets, exercises, and results       |
| Ownership role and review cadence              | Named assignments, deviations, evidence, and approvals |
| Public release and source identity             | Deployment inventory and accepted versions             |

## Documentation control

Substantial pages carry a stable identifier, owner, approver role, public
classification, document version, review date, audience, status, and cadence.
Changes pass review and version control. Event-driven review follows material
changes to product behavior, architecture, security, dependencies, recovery,
law or standards, and relevant incidents or findings.

Availability, integrity, confidentiality, retention, and retirement are
proportionate to the document's operational relevance. A page that no longer
reflects verified public behavior must be corrected, deprecated, or removed; it
must not remain as unsupported assurance.

## Continue

- [BSI Standards 200-1 through 200-4 mapping approach](./bsi-mapping.md)
- [Public documentation boundary](../security/publication-boundary.md)
- [Backup and recovery](../security/backup-and-recovery.md)
- [Releases and lifecycle](../releases/index.md)
