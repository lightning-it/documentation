---
id: modulix-reference
title: ModuLix reference
description: Find canonical public ModuLix repositories, names, and documentation boundaries.
slug: /modulix/reference/
sidebar_position: 13
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation engineers
    - documentation readers
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# ModuLix reference

## Product identity

| Field                               | Value                |
| ----------------------------------- | -------------------- |
| Portfolio position                  | Automation Content   |
| Conceptual verb                     | Build                |
| Peer products                       | IO, Wunderbox, Atlas |
| Public-safe role example            | `lit.rhel.baseline`  |
| Public documentation classification | `PUBLIC`             |

## Canonical public sources

- [ModuLix automation](https://github.com/lightning-it/modulix-automation)
- [ModuLix launcher](https://github.com/lightning-it/modulix-launcher)
- [Sanitized inventory examples](https://github.com/lightning-it/ansible-inventory-example)
- [Foundational collection](https://github.com/lightning-it/ansible-collection-foundational)
- [RHEL collection](https://github.com/lightning-it/ansible-collection-rhel)
- [Ubuntu collection](https://github.com/lightning-it/ansible-collection-ubuntu)
- [OpenShift collection](https://github.com/lightning-it/ansible-collection-ocp)
- [Supplementary collection](https://github.com/lightning-it/ansible-collection-supplementary)

Use a repository's release documentation for exact variables, dependencies,
compatibility, build commands, tests, and artifacts. This site intentionally
does not duplicate changing code-level reference material.

## Public documentation map

- Vocabulary: [Concepts](./concepts.md)
- Distribution units: [Collections](./collections.md)
- Reusable units: [Roles](./roles.md)
- Composition contract: [Building blocks](./building-blocks.md)
- Design artifact: [Blueprints](./blueprints.md)
- Evaluation: [Installation](./installation.md) and [Usage](./usage.md)
- Contribution: [Development](./development.md) and [Testing](./testing.md)
- Risk and maintenance: [Security](./security.md) and
  [Lifecycle](./lifecycle.md)

For portfolio-wide terms, use the [glossary](../reference/glossary.md).
