---
id: backup-and-recovery
title: Backup and recovery
description: Define, authorize, test, and document backup and recovery across the product portfolio.
slug: /security/backup-and-recovery/
sidebar_position: 3
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - service owners
    - platform operators
    - security engineers
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Backup and recovery

Backup is the controlled creation and retention of recoverable copies. Recovery
is the authorized process that restores a defined service outcome. A successful
backup job does not prove recoverability.

This page defines a cross-product method. It does not claim that any product
implements a built-in backup feature or that one backup design fits every
deployment.

## Define the recovery contract

For each stateful recovery unit, record privately:

- data and service owner;
- purpose and classification;
- dependencies and consistency boundary;
- recovery point and recovery time objectives;
- backup method, frequency, retention, and deletion;
- encryption, key ownership, access, and separation;
- copy and failure-domain strategy;
- restore order and independent service verification; and
- test cadence, evidence classification, and decision owner.

Content repositories, runtime state, platform configuration, observations, and
application data can have different recovery requirements. Reproducible source
may be rebuilt; mutable state may require a backup; transient data may have an
approved loss decision. Document the choice rather than assuming it.

## Recovery authorization and preflight

Recovery can overwrite newer state or widen an incident. Before starting:

1. Confirm incident or exercise authorization and the recovery decision owner.
2. Identify the exact recovery unit, destination, point in time, and affected
   consumers.
3. Protect current evidence and decide whether a pre-recovery copy is required.
4. Verify backup identity, integrity, decryption access, compatibility, and
   dependencies without exposing keys or target details.
5. Isolate the destination as required and stop unrelated writes.
6. Confirm capacity, ordering, safe-stop points, and rollback or forward-recovery
   options.

:::warning Destructive action
Restoring over a writable target can destroy newer data. Stop before the first
write if scope, timestamp, backup identity, destination, authorization, or
dependency state differs from the approved recovery record.
:::

## Restore, verify, and close

Restore one defined unit in the approved order. Record redacted status, then
verify integrity, access control, dependency connectivity, application
consistency, and consumer-facing outcome independently. A mounted volume or
completed process is not service acceptance.

If verification fails, preserve evidence and let the recovery owner select a
different restore point, repair, rollback of the recovery action, or forward
recovery. Do not repeatedly overwrite the target without a new decision.

Retain test or incident evidence according to classification and policy. Never
publish backup targets, credentials, keys, real recovery times, customer data,
or protected failure findings.
