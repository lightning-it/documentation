---
id: modulix-overview
title: ModuLix overview
description: Understand ModuLix as the Automation Content product in the Lightning IT portfolio.
slug: /modulix/overview/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation engineers
    - platform engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# ModuLix overview

ModuLix is the **Automation Content** product in the Lightning IT portfolio. Its
conceptual verb is **Build**: it organizes reusable automation content so teams
can review, version, test, and compose infrastructure changes.

ModuLix is a peer of [AIO](../aio/index.md),
[Wunderbox](../wunderbox/index.md), and [Atlas](../atlas/index.md). The products
can interact, but none is a child of another.

## What belongs to ModuLix

The public ModuLix model separates four concerns:

1. **Collections** package related automation content under a stable namespace.
2. **Roles** implement a bounded, reusable automation responsibility.
3. **Building blocks** combine content, inputs, execution context, and evidence.
4. **Blueprints** describe a reviewed composition without turning an environment
   inventory or secret into public documentation.

This documentation explains those concepts and the safe workflow around them.
Code-specific variables, compatibility statements, and contributor commands
remain with the public component repository and release that owns them.

## Public component surface

The public source surface currently includes:

- [ModuLix automation](https://github.com/lightning-it/modulix-automation) for
  reusable automation entry points;
- [ModuLix launcher](https://github.com/lightning-it/modulix-launcher) for its
  published launcher implementation and repository-specific instructions;
- [sanitized inventory examples](https://github.com/lightning-it/ansible-inventory-example)
  that demonstrate structure without representing a real environment; and
- the public Lightning IT Ansible collections listed in
  [Collections](./collections.md).

Repository presence proves that source is public; it does not prove that a
particular version is deployed or supported in an environment. Use the selected
release's own compatibility and test evidence for that decision.

## Choose a path

- New to the model: start with [Concepts](./concepts.md) and
  [Building blocks](./building-blocks.md).
- Selecting content: review [Collections](./collections.md) and
  [Roles](./roles.md).
- Preparing a controlled evaluation: follow [Installation](./installation.md),
  then [Usage](./usage.md).
- Contributing: use [Development](./development.md) and
  [Testing](./testing.md).
- Reviewing risk: read [Security](./security.md) and
  [Lifecycle](./lifecycle.md).

## Publication boundary

Public examples use documentation-only names and addresses. Real inventories,
credentials, customer procedures, recovery material, deployment evidence, and
environment-specific troubleshooting records do not belong on this site. The
[public documentation boundary](../security/index.md) applies even when a value
looks harmless in isolation.
