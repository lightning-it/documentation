---
id: atlas-security
title: Atlas security
description: Protect telemetry sources, context, queries, exports, and observability evidence.
slug: /atlas/security/
sidebar_position: 5
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - security engineers
    - observability operators
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Atlas security

Observability data can expose identities, topology, versions, behavior,
customer context, security events, and fragments of application data. Treat the
signal path as a data-processing system, not as an automatically low-risk
diagnostic channel.

## Security objectives

- Authenticate signal sources and preserve provenance.
- Validate shape, size, rate, and allowed context before processing.
- Prevent secret, personal, customer, and protected payload data from entering
  general-purpose observations unnecessarily.
- Isolate consumers by purpose, classification, and scope.
- Protect processing rules, alert conditions, and stored observations from
  unauthorized change.
- Make exports, copies, and derived views subject to the same lifecycle rules.
- Detect signal-path tampering, suppression, replay, and denial of service.
- Remove access, stored context, and credentials when a source or consumer is
  retired.

## Minimize at the source

Filtering sensitive data after collection can leave copies in buffers, failure
queues, or raw storage. Prefer allowlisted context and payload minimization at
the earliest controlled boundary. Never use tokens, passwords, session values,
or customer identifiers as labels.

## Access and exports

Separate platform administration, source onboarding, query, alert management,
and bulk export where risk requires it. Bulk exports can bypass normal access,
retention, and deletion controls; authorize and track them as separate data
handling operations.

## Security observations are not proof

A signal can indicate a control state or suspicious event, but it does not by
itself prove that a control is complete, effective, or compliant. Preserve the
source, observation window, processing version, and limitations alongside any
security decision.

This is a review model, not an assurance claim about a particular Atlas
release. See the site-wide [security overview](../security/index.md) and
[BSI mapping approach](../compliance/bsi-mapping.md).
