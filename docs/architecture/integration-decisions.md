---
id: integration-decisions
title: Integration decisions
description: Review a cross-product integration without assuming a mandatory portfolio topology.
slug: /architecture/integration-decisions/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - solution architects
    - security engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Integration decisions

Use this template for a concrete product-to-product or product-to-external-system
integration. Store the completed record at the classification required by its
topology, identity, and data details.

## Decision record

| Decision           | Questions                                                                           |
| ------------------ | ----------------------------------------------------------------------------------- |
| Scope              | What outcome is enabled, and which actions are explicitly excluded?                 |
| Product boundaries | Which peer product owns each responsibility?                                        |
| Versions           | Which immutable provider, consumer, schema, and content versions are approved?      |
| Identities         | Which human and workload identities cross the boundary, and how are they revoked?   |
| Data               | Which fields cross, who owns them, and what are their classification and lifecycle? |
| Authorization      | Which action, target, time, and concurrency limits apply?                           |
| Availability       | Which dependencies and failure domains affect the outcome?                          |
| Failure handling   | Are retries idempotent? What is the safe stop after partial completion?             |
| Verification       | How do provider and consumer independently prove the intended outcome?              |
| Recovery           | Who chooses retry, rollback, restore, repair, or forward recovery?                  |
| Observation        | Which signals show interface health without leaking protected content?              |
| Retirement         | How are credentials, data, routes, automation, and alerts removed?                  |

## Compatibility is two-sided

A provider's supported version does not prove that a consumer supports the same
interface. Verify both release contracts and test the exact version pair. Pin
schemas and content as well as binaries; a processing-rule or inventory change
can alter behavior without a component upgrade.

## Retry only with defined semantics

Retries can duplicate state-changing work or widen an incident. Document a
stable request identity, timeout ownership, maximum attempt policy, partial
completion behavior, and independent target check. When these are unknown,
stop and investigate rather than treating retry as recovery.

## Evidence boundary

A public architecture can describe the decision method. Completed records may
contain internal endpoints, identities, customer context, failure modes, and
risk decisions and therefore remain in the approved private documentation and
evidence system.

Return to the [portfolio architecture](./index.md) or review the
[security model](../security/index.md).
