---
id: modulix-building-blocks
title: ModuLix building blocks
description: Assemble content, inputs, runtime constraints, and verification into reviewable automation units.
slug: /modulix/building-blocks/
sidebar_position: 5
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation architects
    - platform engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# ModuLix building blocks

A useful ModuLix building block is more than a role or playbook. It combines a
versioned content unit with the conditions required to run and verify it.

## Building-block contract

| Part         | Required question                                                | Public documentation can contain               |
| ------------ | ---------------------------------------------------------------- | ---------------------------------------------- |
| Objective    | What bounded outcome is intended?                                | Generic capability and success criteria        |
| Content      | Which immutable source version expresses the change?             | Public repository and release link             |
| Inputs       | Which values influence behavior?                                 | Names, types, safe examples, validation rules  |
| Target scope | Which objects may change?                                        | Generic target class and RFC-reserved examples |
| Runtime      | Which controller, dependencies, and privileges are required?     | Public compatibility contract                  |
| Preflight    | What must be true before execution?                              | Non-sensitive checks and safe-stop criteria    |
| Verification | How is observed state checked independently?                     | Generic read-only checks                       |
| Recovery     | Who decides and what recovery class is available?                | Decision model without credentials or targets  |
| Evidence     | What must be retained, for how long, and at what classification? | Evidence schema, not real environment records  |

## Four layers of composition

1. **Content layer:** collections, roles, plugins, playbooks, and their immutable
   versions.
2. **Input layer:** inventory schema, non-secret variables, and references to
   secrets supplied through an approved runtime channel.
3. **Execution layer:** controller, execution environment, authorization,
   network boundary, and concurrency controls.
4. **Assurance layer:** preflight, tests, observation, approval, evidence, and
   recovery decisions.

Keeping the layers separate makes reviews clearer. A source change should not
silently change an inventory; an inventory update should not silently replace
the runtime; and a successful run should not silently become acceptance.

## Example review statement

> Apply a pinned public collection release to the `customer-example` test
> target represented by `host01.example.com`. Stop before execution if the
> target, content checksum, required privilege, or backup precondition differs
> from the approved record. Accept only after an independent state check.

This statement is deliberately not an executable rollout procedure. It records
the boundary an environment-specific, authorized plan must fill in privately.

Use [Blueprints](./blueprints.md) to describe multi-block composition and
[Security](./security.md) to review trust boundaries.
