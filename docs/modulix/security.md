---
id: modulix-security
title: ModuLix security
description: Review trust boundaries, privileges, secrets, and evidence for ModuLix automation.
slug: /modulix/security/
sidebar_position: 11
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - security engineers
    - automation operators
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# ModuLix security

Automation concentrates privilege: content can translate one authorization
into changes across many targets. Treat content, dependencies, inputs, runtime,
and evidence as separate trust boundaries.

## Trust-boundary review

| Boundary                         | Main risks                                                     | Required decision                                                           |
| -------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Source and release               | Tampering, dependency substitution, unreviewed change          | Pin an immutable reviewed artifact and verify available provenance          |
| Inventory and variables          | Scope expansion, sensitive data disclosure, unsafe defaults    | Validate schema, ownership, classification, and exact target limit          |
| Secret resolution                | Exposure in source, command history, process output, or logs   | Supply secrets through an approved runtime channel and suppress disclosure  |
| Controller and execution context | Excess privilege, mutable dependencies, credential persistence | Isolate the runtime and grant only the access required for the bounded task |
| Managed target                   | Destructive change, partial convergence, unintended reach      | Preflight, authorize, limit concurrency, verify, and define recovery        |
| Evidence                         | Credentials or environment data retained too broadly           | Redact, classify, restrict access, and apply retention                      |

## Content review

Review changes for command construction, template injection, unsafe file modes,
unbounded loops, implicit downloads, certificate-verification bypasses, logging
of sensitive variables, and behavior that crosses the role's stated scope.
Dependencies deserve the same review as first-party tasks.

## Secret handling

Public content may name a secret input contract, but it must not contain the
value, a recoverable encrypted payload, a real secret path, or a credential-like
example. Avoid secrets on command lines because shell history and process lists
can expose them. Mark sensitive Ansible tasks with appropriate output controls,
then verify that failure paths also remain redacted.

## Recovery is not automatic

Automation rollback is safe only when the selected content explicitly supports
and tests it for the relevant state. Otherwise, recovery may mean restore,
repair, or a reviewed forward change. Identify the recovery owner and backup
precondition before execution; do not improvise after a partial failure.

This page describes a security approach, not a claim that every component or
deployment implements every control. The site-wide
[security model](../security/index.md) and
[backup and recovery guidance](../security/backup-and-recovery.md) provide the
cross-product context.
