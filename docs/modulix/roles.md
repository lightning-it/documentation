---
id: modulix-roles
title: ModuLix roles
description: Select, qualify, and reference ModuLix Ansible roles by fully qualified name.
slug: /modulix/roles/
sidebar_position: 4
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation engineers
    - content maintainers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# ModuLix roles

A role is a reusable automation unit inside a collection. Refer to it by fully
qualified collection name (FQCN) so resolution does not depend on an implicit
search path.

For example, the public `lit.rhel` collection contains the safe public role
name **`lit.rhel.baseline`**. This name identifies content; it does not assert
that the role is appropriate for a particular host or that it has already been
run there.

## Qualify a role before use

Review the owning release and answer these questions:

- Which target operating systems and versions does the release test?
- Which variables are required, optional, sensitive, or mutually exclusive?
- What privilege level and network access does the role require?
- Which files, services, users, packages, or external systems can it change?
- Does the role document check mode and idempotence behavior?
- What constitutes success beyond the automation process exit status?
- What is the safe stop point if preflight results differ from expectations?
- What recovery action is available if target verification fails?

The authoritative answers belong to the selected
[public collection source](https://github.com/lightning-it/ansible-collection-rhel)
and release evidence.

## Inspect installed documentation

After installing the selected collection release, Ansible can display the role
entry locally:

```bash
ansible-doc --type role lit.rhel.baseline
```

The command is read-only. Treat an empty or unexpected result as a version or
installation mismatch; do not compensate by removing the namespace.

## Compose deliberately

Role ordering can create hidden coupling. If role B assumes a service, file, or
account created by role A, make that dependency visible in the blueprint and
test the sequence. Avoid using tags as the only description of a dependency:
tags select work but do not define the state contract between roles.

Continue with [Building blocks](./building-blocks.md) to place roles in a wider
execution and verification model.
