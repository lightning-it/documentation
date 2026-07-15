---
id: modulix-usage
title: Use ModuLix content safely
description: Prepare, scope, verify, and record a controlled ModuLix automation run.
slug: /modulix/usage/
sidebar_position: 8
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation operators
    - platform engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Use ModuLix content safely

Move from evaluation to execution only through an authorized, environment-owned
procedure. This page defines the portable safety pattern; it does not publish a
real inventory or customer rollout command.

## Prepare safe example inputs

The following inventory uses an RFC 5737 address that cannot identify a real
deployment:

```yaml
---
all:
  children:
    modulix_example:
      hosts:
        host01.example.com:
          ansible_host: 192.0.2.10
```

An illustrative playbook can refer to the verified public role name:

```yaml
---
- name: Demonstrate a namespaced role reference
  hosts: modulix_example
  become: true
  roles:
    - role: lit.rhel.baseline
```

These files show structure only. The reserved address is not a target, and role
defaults may not match an intended environment.

## Preflight

Before authorizing a real run:

1. Confirm the immutable content version and dependency set.
2. Confirm the selected release supports the controller and target class.
3. Validate inventory syntax and the exact target limit.
4. Resolve secrets through the approved runtime; never write them into the
   playbook, inventory, command line, or documentation.
5. Confirm privilege, maintenance window, backup or recovery preconditions,
   concurrency, and external dependencies.
6. Run syntax, lint, and planning modes only when the owning release documents
   them as meaningful.
7. Define target-side verification and a safe stop before state changes.

## Execute and verify

Execution must use the reviewed inventory, content digest, runtime, and scope.
If any identity differs, stop before changing the target. After execution,
verify the intended service or system state independently; do not accept only a
zero exit code.

If verification fails, preserve the minimal redacted diagnostics, stop further
dependent changes, and let the authorized recovery owner choose rollback,
restore, repair, or forward recovery. Avoid repeated execution until the
failure mode is understood.

## Evidence

Retain the blueprint identifier, content versions, authorization, bounded
target class, timestamps, redacted status, verification result, and recovery
decision according to the environment's retention policy. Logs, inventories,
and command output may contain sensitive data and remain private unless
separately classified and sanitized.

See [Security](./security.md) for trust boundaries and
[Testing](./testing.md) for pre-release validation.
