---
id: troubleshooting-principles
title: Troubleshooting principles
description: Diagnose cross-product problems through boundaries, controlled hypotheses, and safe evidence.
slug: /support/troubleshooting/
sidebar_position: 2
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform operators
    - support engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Troubleshooting principles

Troubleshooting should narrow uncertainty without widening impact or exposing
protected information.

## Boundary-first method

1. **Protect:** stop unrelated changes, preserve service and data integrity, and
   restrict evidence.
2. **Scope:** record affected outcome, abstract consumer class, UTC window, and
   business-impact class.
3. **Identify:** resolve exact content, runtime, platform, observation, and
   configuration versions.
4. **Locate:** identify the first boundary where expected and observed state
   differ.
5. **Hypothesize:** write one falsifiable explanation and the smallest safe
   read-only check.
6. **Test:** change one variable only when authorized, reversible, and necessary.
7. **Verify:** check the original consumer outcome independently.
8. **Recover:** let the authorized owner choose retry, rollback, restore, repair,
   or forward recovery.
9. **Close:** remove temporary access, retain classified evidence, and update the
   owning documentation when the public contract changed.

## Cross-product questions

- **ModuLix:** Did the immutable content and validated inputs express the
  intended bounded change?
- **IO:** Was the request authorized and executed with the expected identity,
  scope, dependencies, and termination state?
- **Wunderbox:** Did resource, platform-service, management, or consumer health
  diverge within a known failure domain?
- **Atlas:** Did the source emit the expected signal, and did it remain timely,
  complete, and visible through the signal path?

These questions separate requested, executed, hosted, and observed state. A
single green status cannot answer all four.

## Destructive-action boundary

Stop before deleting data, rotating a credential without an ownership decision,
restarting multiple failure-domain members, disabling authentication or
validation, widening network access, overwriting a recovery target, or repeating
state-changing automation after partial failure. Follow the authorized runbook
with preflight, safe-stop, verification, and recovery steps.

## Evidence hygiene

Prefer a redacted error class, immutable version, abstract boundary, and
sanitized reproduction. Never paste raw logs by default. Inspect output for
tokens, customer data, real hosts and addresses, internal paths, topology,
security findings, and recovery details before sharing.

Product flows: [ModuLix usage](../modulix/usage.md),
[IO troubleshooting](../io/troubleshooting.md),
[Wunderbox troubleshooting](../wunderbox/troubleshooting.md), and
[Atlas troubleshooting](../atlas/troubleshooting.md).
