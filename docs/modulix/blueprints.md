---
id: modulix-blueprints
title: ModuLix blueprints
description: Document reviewed automation compositions without publishing environment or customer data.
slug: /modulix/blueprints/
sidebar_position: 6
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation architects
    - platform owners
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# ModuLix blueprints

A blueprint is a design and review artifact for composing ModuLix building
blocks. It explains intent, dependencies, and assurance. It is not a public
schema for a customer inventory and is not automatically executable.

## Minimum blueprint record

Record these fields in the approved system for the deployment:

| Field                         | Purpose                                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| Stable identifier and version | Distinguish the approved design from later revisions             |
| Objective and exclusions      | Prevent a reusable design from expanding its scope silently      |
| Content sources               | Pin each public repository to an immutable release or commit     |
| Input contracts               | Identify owners, validation, sensitivity, and default behavior   |
| Dependency graph              | Make ordering, shared state, and external services visible       |
| Authorization                 | Identify who may approve and execute each change class           |
| Preflight and safe stops      | Halt when assumptions are false before state changes begin       |
| Verification                  | Define independent checks for every material outcome             |
| Recovery decision             | State who selects rollback, restore, repair, or forward recovery |
| Evidence and retention        | Keep only the classified record needed for traceability          |

## Conceptual example

Consider a blueprint that prepares an example operating-system baseline:

1. Resolve an approved `lit.rhel` release.
2. Validate that the target class matches that release's documented support.
3. Resolve non-secret variables from a reviewed inventory contract.
4. Resolve secret values at runtime without placing them in the blueprint.
5. Inspect the planned scope using only modes the selected role documents as
   supported.
6. Apply the bounded role through an authorized runtime.
7. Verify the resulting system state independently.
8. Retain the content identity, approvals, redacted outcome, and verification;
   keep environment details in the authorized private evidence system.

The example uses no real target, credential, or topology. A production plan
must supply those values through its approved private process.

## Review changes by impact

A content version update, input-contract change, target expansion, new
privilege, or altered verification method is a blueprint change. Re-run the
appropriate review even when the human-readable objective remains the same.

## Blueprint examples

- [vSphere template lifecycle](./blueprints/vsphere-template-lifecycle.md)
- [Disconnected automation runtime](./blueprints/aap-disconnected-runtime.md)
- [RHEL 10 host preparation](./blueprints/aap-rhel10-host-preparation.md)
- [Ansible Vault input boundary](./blueprints/aap-ansible-vault.md)
- [HashiCorp Vault runtime boundary](./blueprints/aap-hashicorp-vault.md)
- [Ubuntu container all-in-one evaluation](./blueprints/ubuntu-container-aio.md)

Each example remains a review candidate and states its validation limits. It
must not be treated as an approved environment procedure.

For a single-block evaluation, continue with
[Installation](./installation.md). For maintenance decisions, see
[Lifecycle](./lifecycle.md).
