---
id: portfolio-architecture
title: Portfolio architecture
description: Understand the five-product model, the ModuLix foundation, and governed interaction contracts.
slug: /architecture/
sidebar_position: 1
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
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Portfolio architecture

The Lightning IT technical portfolio contains five sellable products:

1. AIO;
2. Wunderbox;
3. Workbench;
4. Atlas; and
5. Platform Governance & Evidence.

ModuLix is their shared technical engineering and automation foundation, not a
sixth sellable product. None of the five products is a child of another. The
[product taxonomy decision](./product-taxonomy-decision.md) defines the
migration boundary. Product roles and interaction claims remain subject to
their own approved public authorities.

## Optional interaction model

A solution may use one or more products and shared ModuLix foundation
capabilities when a supported release contract explicitly permits it. No
interaction is implied merely by the portfolio taxonomy.

This public architecture does not claim a specific protocol, shared database,
control plane, product dependency, or supported topology. Each concrete
integration needs its own verified version contract.

The architecture intentionally does not assign unverified product-to-product
arrows. Each concrete interaction must be supported by a separately reviewed
contract.

## Cross-product contract

For every interaction, document:

- **purpose:** the bounded outcome and explicit non-goals;
- **owner:** the provider and consumer decision owners;
- **identity:** authenticated workload, service, and human identities;
- **artifact:** immutable content, schema, and component versions;
- **interface:** supported transport and compatibility contract;
- **data:** fields, classification, validation, retention, and deletion;
- **authorization:** allowed actions, targets, and privilege lifetime;
- **failure behavior:** timeouts, retries, partial completion, and safe stops;
- **verification:** independent provider and consumer outcome checks; and
- **lifecycle:** upgrade ordering, deprecation, recovery, and retirement.

## Architecture principles

### Preserve product boundaries

A shared deployment does not erase ownership. Put code-level instructions in
the component repository, product concepts in the product section, and common
decisions here.

### Separate requested, executed, hosted, and observed state

Content can request a change, a runtime can report completion, a platform can
report resource health, and an observability path can show a signal. These are
different evidence sources. Acceptance relates them through an authorized
decision; it does not collapse them into one status.

### Make failure domains visible

Document which consumers, identities, data, and dependencies can be affected by
one failure or change. Do not publish the detailed production topology; retain
it in the authorized environment architecture.

### Design lifecycle with architecture

Backup, recovery, security, observation, upgrades, and decommissioning are
architecture concerns. Define them before rollout rather than adding them after
a failure.

See [Integration decisions](./integration-decisions.md) for a review template.
See [GitHub automation trust architecture](./github-automation-trust.md) for the
workload-identity and fail-closed synchronization design.
