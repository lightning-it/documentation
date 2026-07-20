---
id: modulix-blueprint-aap-ansible-vault
title: Use Ansible Vault for bounded secret inputs
description: Design a controller workflow that decrypts approved Ansible Vault data without publishing or retaining secret values.
slug: /modulix/blueprints/aap-ansible-vault/
sidebar_position: 4
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

# Use Ansible Vault for bounded secret inputs

This blueprint describes the controls around using Ansible Vault data in an
authorized automation-controller workflow. It does not provide a Vault
password, encrypted payload, private variable name, or production inventory.

Ansible Vault protects selected data while it is stored. The automation
runtime must decrypt that data before using it, so runtime authorization,
memory, output, artifacts, and failure handling remain separate security
boundaries. Use an external secret service instead when the design requires
short-lived credentials, central revocation, or access independent of the
automation content lifecycle.

## Scope and assumptions

Use this pattern only when all of the following are true:

- The secret input is necessary for a reviewed, bounded automation action.
- The encrypted data remains in an approved private repository or artifact
  store with access control, review, backup, and retention.
- A named owner controls the Vault identity and its rotation process.
- The controller can provide the decryption credential through an approved
  credential mechanism without placing it in inventory, source, a command
  line, or a job prompt retained as evidence.
- The selected content suppresses sensitive values on success and failure.

Do not place even encrypted Vault payloads in public documentation. Encryption
does not change the classification of the underlying data.

## Design record

Record references rather than values in the reviewed private blueprint:

| Decision              | Required record                                                       |
| --------------------- | --------------------------------------------------------------------- |
| Encrypted input       | Stable artifact identity and checksum                                 |
| Vault identity        | Non-secret label such as `<vault-id-label>` and its accountable owner |
| Decryption credential | Controller credential reference, never the credential value           |
| Authorized content    | Immutable collection, role, and workflow identities                   |
| Execution scope       | Exact inventory source and target limit                               |
| Output controls       | Tasks and failure paths that require redaction                        |
| Rotation trigger      | Scheduled interval and event-based triggers                           |
| Recovery owner        | Person or team authorized to rotate, restore, or stop execution       |

Do not reuse a Vault identity merely because two workflows can technically
share it. Separate identities when access owners, rotation schedules,
environments, or recovery decisions differ.

## Controlled lifecycle

1. Create the encrypted input in a dedicated private workspace that has no
   public remote, using the approved Vault identity.
2. Review the clear-text input through the authorized secret-review process;
   do not attach it to a source review or job record.
3. Store only the encrypted artifact in its approved private location and
   retain its checksum and reviewer decision.
4. Bind the controller credential reference to the smallest workflow and
   operator group that require it.
5. Run a preflight that confirms content identity, inventory limit, Vault
   identity, credential availability, and output controls without displaying
   a decrypted value.
6. Execute the bounded workflow and verify its intended state independently.
7. Retain redacted outcome evidence, then remove temporary decrypted files or
   controller artifacts according to policy.

Never add a second password source, disable certificate validation, or print a
value to diagnose a decryption failure. A mismatch is a safe stop.

## Verification and recovery

Verification must demonstrate that the expected Vault identity can be used by
the authorized workflow, an unrelated workflow cannot use it, and neither
normal output nor a deliberately exercised failure path reveals a value. Also
confirm that a rotated encrypted artifact produces the intended state without
requiring a stale credential.

If a decryption credential or clear-text value may have been disclosed, stop
affected workflows, preserve a redacted incident timeline, rotate the
underlying secret and Vault credential, create a new encrypted artifact, and
invalidate retained job artifacts where policy permits. Restoring an older
encrypted file is not recovery when the underlying secret has been revoked.

Retain artifact checksums, content identities, approvals, controller workflow
identity, redacted verification, and rotation outcome. Keep all environment
references and incident details in the approved private evidence system.

Compare this pattern with the external-service design in
[Use HashiCorp Vault for runtime secret resolution](./aap-hashicorp-vault.md),
and apply the broader [ModuLix security model](../security.md).

## Primary references

- [Ansible Vault security boundary](https://docs.ansible.com/projects/ansible/latest/vault_guide/vault.html)
- [AAP 2.6 Ansible Vault credential type](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/secure-ref_controller_credential_vault)
- [AAP 2.6 controller secret handling](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/secure-con_controller_secret_handling)
