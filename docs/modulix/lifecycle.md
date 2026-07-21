---
id: modulix-lifecycle
title: ModuLix lifecycle
description: Introduce, update, deprecate, and retire ModuLix content with traceable decisions.
slug: /modulix/lifecycle/
sidebar_position: 12
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform owners
    - release reviewers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# ModuLix lifecycle

Lifecycle control keeps an approved automation composition reproducible while
allowing security, platform, and capability changes to move forward.

## Introduce content

Before first use, record the source, immutable version, license, dependency
graph, supported target class, input contract, privilege, test evidence,
verification method, and recovery decision. Approve the composition—not just
the individual role names.

## Update deliberately

For each proposed update:

1. Compare release notes, dependencies, defaults, variables, and target scope.
2. Identify security fixes, breaking changes, and removed compatibility.
3. Rebuild from the immutable source and verify artifact identity.
4. Run the required source, role, composition, and acceptance tests.
5. Update the blueprint, operating guidance, and recovery assumptions.
6. Promote through the environment's authorized stages.
7. Retain the approval and redacted result according to policy.

Do not use an unpinned branch to make update selection automatic. Automation
can propose an update; a reviewed release decision still owns adoption.

## Deprecate visibly

A deprecation notice should name the affected public component or interface,
the last supported release when verified, the replacement path, compatibility
impact, and review owner. Avoid dates or promises that have no approved release
record.

## Retire safely

Retirement includes more than deleting source. Find consuming blueprints,
remove runtime dependencies and credentials, preserve required evidence,
archive or remove artifacts according to retention, update references, and
verify that no scheduled execution still calls the retired content.

Customer inventories, logs, credentials, and recovery records follow their own
private retention and destruction rules. They must not be copied into a public
retirement report.

Portfolio release terminology is defined in [Releases](../releases/index.md).
