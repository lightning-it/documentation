---
id: modulix-concepts
title: ModuLix concepts
description: Learn the vocabulary and responsibility boundaries used by ModuLix automation content.
slug: /modulix/concepts/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
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

# ModuLix concepts

ModuLix treats automation as reviewed content with explicit inputs, execution
conditions, and verification—not as an undocumented command sequence.

## Core vocabulary

| Term              | Meaning in this documentation                                                                     | Boundary                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Content           | Declarative files and supporting code used to describe an automation action                       | Content alone does not prove that an action ran                        |
| Collection        | A versioned Ansible distribution unit containing roles, plugins, or related content               | Supported content is defined by the selected collection release        |
| Role              | A namespaced automation unit with inputs, tasks, handlers, and tests as applicable                | A role name does not guarantee suitability for every target            |
| Inventory         | The targets and variables supplied to a run                                                       | Real inventories are environment data and are not public documentation |
| Execution context | The toolchain, dependencies, credentials, and policies used for a run                             | The component release owns its exact compatibility contract            |
| Run evidence      | A minimal record of what version was requested, what checks passed, and what outcome was verified | Logs must be classified and sanitized before sharing                   |
| Blueprint         | A reviewed description of how building blocks are composed for an outcome                         | It is not a customer inventory or a secret-bearing runbook             |

## Desired state and observed state

Automation content expresses a desired change. An operator still needs an
independent observation to decide whether the target reached the intended
state. A successful process exit is useful evidence, but it is not a substitute
for service-level verification.

For a controlled run, keep these statements separate:

1. **Requested state:** the content version and declared inputs.
2. **Execution result:** the runtime's status and redacted diagnostics.
3. **Observed state:** a target-side or service-level check.
4. **Acceptance:** the authorized review that relates the observation to the
   change objective.

## Idempotence is a property to test

An automation unit is idempotent only when repeated execution against a defined
starting condition produces no unintended further change. The word “role” does
not establish idempotence. Check the owning repository's tests and release
evidence, then validate in a representative non-production environment.

## Composition and ownership

Composition creates dependencies. A blueprint should therefore identify:

- the immutable version of every content source;
- the owner of each input contract;
- ordering constraints and failure boundaries;
- the verification expected after each material change;
- a safe stop point before destructive or irreversible work; and
- the rollback or recovery decision owner.

The [building-block model](./building-blocks.md) turns these concerns into a
repeatable review, while [blueprints](./blueprints.md) show how to document a
composition without publishing an environment.
