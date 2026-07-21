---
id: modulix-blueprint-aap-hashicorp-vault
title: Use HashiCorp Vault for runtime secret resolution
description: Design a controller integration that resolves narrowly authorized secrets at runtime without retaining their values.
slug: /modulix/blueprints/aap-hashicorp-vault/
sidebar_position: 5
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - automation architects
    - security engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:ignore hashicorp -->

# Use HashiCorp Vault for runtime secret resolution

This blueprint describes the trust boundaries for resolving a secret from
HashiCorp Vault during an authorized automation-controller job. It is
conceptual: placeholders identify contracts, and no Vault address, namespace,
mount, path, role, token, certificate, or secret value is published here.

## Scope and assumptions

The pattern assumes that an approved Vault service already provides resilient
storage, recovery, audit handling, certificate lifecycle management, and an
accountable operating team. It also assumes the selected automation-platform
release has a supported integration or credential plugin for the required
secret engine.

This page does not establish product-version compatibility, make a Vault
deployment highly available, or authorize automation to administer Vault.

## Separate the identities

Use distinct, reviewable identities for each boundary:

| Identity                      | Minimum contract                                                        |
| ----------------------------- | ----------------------------------------------------------------------- |
| Human operator                | May launch only the approved workflow against the bounded target scope  |
| Controller workflow           | Identifies the authorized content, inventory, and credential reference  |
| Vault-authenticating workload | Uses a machine authentication method with bounded lifetime and audience |
| Vault policy                  | Permits only the required operation on `<approved-secret-reference>`    |
| Managed-service identity      | Receives or uses the resolved value without disclosing it               |

Do not use the operator's personal Vault identity as the controller's runtime
identity. Do not grant list, write, delete, or administrative permissions when
the job only needs to read one approved reference.

## Resolution sequence

1. Pin the controller workflow, collection content, integration version, and
   execution environment to reviewed immutable identities.
2. Configure the trusted Vault certificate chain and expected service identity
   through the private platform process. Certificate-verification failure is a
   safe stop.
3. Bind the controller credential object to the approved machine
   authentication method. Keep bootstrap credentials out of inventory,
   project source, extra variables, prompts, and command lines.
4. Provide only `<approved-secret-reference>` and its non-secret selection
   context to the integration.
5. Resolve the value at job runtime, as late as practical, and retain it only
   for the bounded operation.
6. Suppress the value in task output, callback data, exception messages,
   fact caches, and retained job artifacts.
7. Verify the intended managed state independently, then allow the runtime
   credential and any leased value to expire or revoke them explicitly.

Where the secret engine issues dynamic credentials, define maximum lifetime,
renewal behavior, revocation ownership, and what the job does if the lease
expires partway through execution. A retry must not silently expand scope or
create an untracked second credential.

## Failure tests

Exercise these cases with synthetic data before production approval:

- An unauthorized workflow cannot use the controller credential reference.
- A valid workload identity cannot resolve an out-of-scope secret reference.
- An expired or revoked runtime credential stops before a managed-state
  change.
- Certificate, service-identity, or namespace mismatch fails closed.
- Success, lookup failure, and downstream task failure reveal no value in
  controller output or retained artifacts.
- Rotation takes effect without changing public content or exposing a value to
  an operator.

Review Vault audit records and controller evidence without combining them into
a broadly accessible record that reveals private topology or sensitive
identifiers.

## Recovery and evidence

If the integration is unavailable, prefer a safe stop. A break-glass path must
be independently approved, time-bounded, auditable, and removed after use; it
must not be a long-lived value embedded in the workflow.

Suspected disclosure requires revocation or rotation of the underlying secret,
the workload credential, and affected leases as appropriate. Then review job
artifacts and downstream state before resuming execution. Restoring Vault does
not automatically invalidate a credential that was already exposed.

Retain immutable content identities, the non-secret policy and reference
identifiers, approvals, redacted lookup outcome, lease or rotation outcome,
and independent state verification in the private evidence system.

For a stored encrypted-input design, compare
[Use Ansible Vault for bounded secret inputs](./aap-ansible-vault.md). Apply
the broader [ModuLix security model](../security.md) to both patterns.

## Primary references

- [AAP 2.6 HashiCorp Vault external-secret integration](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/secure-con_hashicorp_vault_external_secrets)
- [HashiCorp Vault authentication](https://developer.hashicorp.com/vault/docs/concepts/auth)
- [HashiCorp Vault policies](https://developer.hashicorp.com/vault/docs/concepts/policies)
- [HashiCorp Vault leases and revocation](https://developer.hashicorp.com/vault/docs/concepts/lease)
- [HashiCorp Vault audit devices](https://developer.hashicorp.com/vault/docs/audit)
