---
id: io-architecture
title: IO conceptual architecture
description: Review the conceptual boundaries and information flow of an automation runtime.
slug: /io/architecture/
sidebar_position: 3
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - solution architects
    - platform engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# IO conceptual architecture

This is a responsibility model, not an implementation diagram. A verified IO
release may realize these boundaries in different components or combine them.

## Conceptual flow

1. A **request boundary** accepts an authenticated request and an immutable
   content identity.
2. A **policy boundary** evaluates authorization, allowed inputs, target scope,
   timing, and concurrency.
3. An **input boundary** validates non-secret data and resolves secret references
   without adding secret values to the durable request.
4. An **execution boundary** runs the selected content with a bounded identity,
   dependency set, network reach, and lifetime.
5. An **observation boundary** records redacted runtime state and exposes enough
   information for authorized diagnosis.
6. An **acceptance boundary** performs or records independent target
   verification and the authorized outcome decision.

## Boundary invariants

- Content identity must not change between authorization and execution.
- Scope expansion requires a new authorization decision.
- Secret values must not become public request metadata or general-purpose
  logs.
- Runtime identity must have no broader privilege or lifetime than required.
- A process completion state must remain distinct from target acceptance.
- Evidence export must preserve classification and retention constraints.

## Portfolio interactions

IO may consume automation content associated with
[ModuLix](../modulix/index.md), may target infrastructure associated with
[Wunderbox](../wunderbox/index.md), and may emit signals that can be observed
through [Atlas](../atlas/index.md). These are functional relationships only.
This public model does not require all four products in a deployment and does
not claim a specific integration protocol.

## Deployment decision record

An implementation-specific architecture should identify the concrete component
for every boundary, its owner, trust zone, data classification, availability
requirement, backup or recovery need, and verification method. Keep endpoints,
credentials, detailed topology, and protected evidence in the authorized
environment documentation.

See the [portfolio architecture](../architecture/index.md) for peer-product
boundaries and [Operations](./operations.md) for readiness checks.
