---
id: security-overview
title: Security overview
description: Apply a public, cross-product security model without exposing protected controls or evidence.
slug: /security/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - security engineers
    - platform owners
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Security overview

Security spans the complete product interaction: the integrity of ModuLix
content, the authorization of AIO execution, the management and consumer
boundaries of Wunderbox, and the confidentiality and integrity of Atlas
observations.

This public documentation explains objectives and review methods. It does not
publish control implementations, internal topology, incident procedures, risk
acceptance, customer requirements, or audit evidence.

## Cross-product security objectives

- Authenticate human, workload, source, and target identities.
- Authorize the smallest action, scope, privilege, and lifetime needed.
- Resolve every deployed artifact to an immutable reviewed source.
- Validate inputs before they cross a trust boundary.
- Keep credentials and sensitive values out of source, logs, evidence exports,
  and public documentation.
- Separate management, workload, observation, and evidence access.
- Observe security-relevant failure without collecting unnecessary sensitive
  data.
- Define backup, recovery, retention, and secure retirement for protected state.
- Verify actual outcomes instead of inferring implementation from code or
  configuration presence.

## Responsibility by product boundary

| Product   | Primary public security lens                                                                |
| --------- | ------------------------------------------------------------------------------------------- |
| ModuLix   | Content provenance, dependencies, input safety, privilege, and convergence                  |
| AIO       | Request authorization, runtime identity, secret exposure, execution isolation, and evidence |
| Wunderbox | Management access, consumer isolation, artifact integrity, data lifecycle, and recovery     |
| Atlas     | Source trust, data minimization, observation integrity, access scope, export, and retention |

An environment's shared-responsibility record must assign the concrete owner
for each control and dependency. Product names alone do not assign operational
accountability.

## Security review cycle

Review after a material architecture, dependency, identity, data, deployment,
or recovery change; after a relevant incident or finding; and at the approved
periodic cadence. Keep deviations, compensating controls, residual-risk
decisions, and verification evidence in their protected registers.

## Continue

- [Publication boundary](./publication-boundary.md)
- [Backup and recovery](./backup-and-recovery.md)
- [BSI mapping approach](../compliance/bsi-mapping.md)
- Product-specific security: [ModuLix](../modulix/security.md),
  [AIO](../aio/security.md), [Wunderbox](../wunderbox/security.md), and
  [Atlas](../atlas/security.md)
