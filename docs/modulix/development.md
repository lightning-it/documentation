---
id: modulix-development
title: Develop ModuLix content
description: Make focused, testable changes in the public repository that owns each ModuLix component.
slug: /modulix/development/
sidebar_position: 9
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - content maintainers
    - contributors
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Develop ModuLix content

Develop code-specific behavior in the public component repository that owns it.
This documentation repository owns portfolio concepts, public workflows, and
cross-component guidance; it should not become a second copy of role defaults
or test instructions.

## Select the owning repository

- Change a role or plugin in its [public collection](./collections.md).
- Change reusable orchestration in
  [ModuLix automation](https://github.com/lightning-it/modulix-automation).
- Change launcher behavior in
  [ModuLix launcher](https://github.com/lightning-it/modulix-launcher).
- Change only sanitized inventory structure in
  [ansible-inventory-example](https://github.com/lightning-it/ansible-inventory-example).
- Change cross-product concepts or public navigation in
  [this documentation repository](https://github.com/lightning-it/documentation).

## Design the change

Keep one bounded responsibility per change. Document:

- the desired state and explicit non-goals;
- supported input types, defaults, validation, and sensitive values;
- expected target changes and privilege;
- idempotence and check-mode behavior when supported;
- preflight, verification, safe-stop, and recovery expectations;
- compatibility impact and deprecation needs; and
- the tests that demonstrate the contract.

Never add realistic customer or company infrastructure data to fixtures. Use
`example.com`, `host01.example.com`, `192.0.2.10`, or another permitted
documentation-only value.

## Work with the repository contract

Read the nearest contributor and agent instructions in the component
repository, create a focused branch, and use its locked toolchain. Run the
repository's own format, lint, unit, scenario, integration, security, and
release checks as applicable. Do not invent a shared command when repositories
publish different test profiles.

Submit code, role documentation, release notes, and migration guidance in the
same reviewed change when behavior or inputs change. Generated documentation
must identify its public source and immutable commit.

Continue with the [testing model](./testing.md) and the site-wide
[contribution guide](../contributing/index.md).
