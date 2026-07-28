---
id: wunderbox-architecture
title: Wunderbox conceptual architecture
description: Review conceptual infrastructure, service, management, and consumer boundaries.
slug: /wunderbox/architecture/
sidebar_position: 3
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - infrastructure architects
    - platform engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Wunderbox conceptual architecture

This page identifies architecture responsibilities without claiming a specific
Wunderbox implementation or deployment topology.

## Conceptual layers

1. **Resource layer:** the compute, memory, storage, and network resources from
   which platform capacity is formed.
2. **Platform-service layer:** shared capabilities exposed through reviewed,
   versioned service contracts.
3. **Management layer:** identities, interfaces, automation, update paths, and
   evidence needed to administer the platform.
4. **Consumer layer:** approved workloads and teams operating within assigned
   resource, identity, network, and data boundaries.
5. **Assurance layer:** health observation, backup and recovery validation,
   security verification, change evidence, and lifecycle decisions.

A real design may implement these responsibilities in combined components. The
documentation must still preserve the boundaries so ownership and risk remain
visible.

## Architecture invariants

- Management access is separated and more tightly controlled than ordinary
  workload access.
- Consumer scope cannot silently expand through a shared service or automation
  identity.
- Every stateful dependency has an identified data owner, backup decision, and
  tested recovery objective when required.
- Health signals cover both the platform boundary and consumer-facing outcome.
- Immutable source and release identities exist for deployed artifacts.
- Failure domains and maintenance effects are documented before availability
  claims are made.

## Portfolio relationships

[ModuLix](../modulix/index.md) may supply reusable automation content,
[AIO](../aio/index.md) may provide a controlled execution boundary, and
[Atlas](../atlas/index.md) may provide an observability boundary. This model
does not require those integrations and does not specify their protocols.

## Implementation record

The environment architecture should add concrete components, versions, trust
zones, dependencies, interfaces, capacity assumptions, data classifications,
failure domains, recovery objectives, verification, and owners. Keep detailed
topology, endpoints, inventories, and protected evidence in the authorized
environment documentation.

Two review-candidate models apply these boundaries without claiming a deployed
topology: the [Incus runtime architecture](./architecture/incus-runtime.md) and
the [service-stack responsibility model](./architecture/service-stack.md).

See the [portfolio architecture](../architecture/index.md) for cross-product
principles.
