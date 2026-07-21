---
id: wunderbox-operations
title: Wunderbox operations
description: Operate an infrastructure platform through readiness, controlled change, verification, and recovery decisions.
slug: /wunderbox/operations/
sidebar_position: 4
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform operators
    - service owners
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Wunderbox operations

Use the selected release and environment runbooks for implementation-specific
commands. This page defines the operating information those procedures should
preserve.

## Daily readiness

Review consumer-facing health, capacity headroom, dependency state, security
signal health, backup job status where applicable, and unresolved change or
incident conditions. A green component check is not enough when the service
outcome is degraded.

## Change preflight

Before a material platform change, confirm:

- approved objective, scope, owner, and maintenance window;
- immutable artifact and automation versions;
- management identity and least-privilege authorization;
- affected consumers, dependencies, and failure domains;
- capacity needed during failure and recovery, not just steady state;
- current backup status and a verified recovery path when state is at risk;
- safe-stop criteria before destructive or irreversible actions; and
- independent platform and consumer verification.

If observed topology, version, capacity, or backup state differs from the plan,
stop before the first material change.

## Backup and recovery

Do not assume every resource needs the same backup or that a platform feature
protects application data automatically. Classify each stateful recovery unit,
assign a data owner, set retention and recovery objectives, protect backup
credentials and copies, and test restore plus service verification. Record
results privately and publish no target, key, or customer detail.

## Degraded operation

When capacity or a dependency is impaired, protect data integrity and
management access first, bound the affected failure domain, pause unrelated
changes, and communicate through the authorized process. Prefer a documented
degraded mode over improvised reconfiguration whose recovery path is unknown.

## Retirement

Remove consumer dependencies, revoke management identities, sanitize or retain
data according to policy, remove monitoring and backup jobs, release capacity,
and verify that automation no longer targets the retired unit. Preserve only
the evidence required by retention rules.

The [Incus image deployment](./operations/incus-image-deployment.md) and
[RHEL image](./operations/incus-rhel-images.md) pages apply this lifecycle to
review candidates. Both require license, provenance, lab, and subject-matter
review before approval.

See [Troubleshooting](./troubleshooting.md) and the cross-product
[backup and recovery guidance](../security/backup-and-recovery.md).
