---
id: modulix-building-block-keycloak
title: Keycloak building-block contract
description: Define a public configuration, validation, and recovery contract for a Keycloak identity service.
slug: /modulix/building-blocks/keycloak/
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation architects
    - identity engineers
    - platform operators
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words kube LDAPS postgres tasksets -->

# Keycloak building-block contract

This building block describes a reviewable Keycloak service boundary. Identity
infrastructure affects every relying service, so the application artifact,
database, external URL, trust material, realm configuration, and client
contracts must be reviewed together.

This page is not a realm import, an authorization design, or a production
deployment procedure.

## Published Lightning IT automation interface

The public `lit.supplementary` collection release `v1.40.0`, at immutable
commit
[`9417550`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3),
publishes an orchestrator and explicit lifecycle entry points:

| Fully qualified role                                                                                                                                                              | Published responsibility                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`lit.supplementary.keycloak`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/keycloak)                     | Select and order the lifecycle roles below                                                        |
| [`lit.supplementary.keycloak_preflight`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/keycloak_preflight) | Read-only Podman, systemd, port-availability, and optional Vault-input checks                     |
| [`lit.supplementary.keycloak_deploy`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/keycloak_deploy)       | Render and operate Keycloak and optionally PostgreSQL as Podman kube-play services                |
| [`lit.supplementary.keycloak_config`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/keycloak_config)       | Create mapped configuration facts that the v1.40 deploy role does not consume; skipped by default |
| [`lit.supplementary.keycloak_cac`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/keycloak_cac)             | Apply the release's API configuration tasksets; skipped by default                                |
| [`lit.supplementary.keycloak_validate`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/keycloak_validate)   | Read realm and optional OpenID Connect discovery endpoints                                        |
| `lit.supplementary.keycloak_ops`                                                                                                                                                  | Select `status` or `restart`                                                                      |
| `lit.supplementary.keycloak_backup_restore`                                                                                                                                       | Coordinate the published realm backup or restore behavior                                         |
| `lit.supplementary.keycloak_upgrade`                                                                                                                                              | Prepare or execute backup, deploy, and validation steps; the v1.40 execution gate is unsafe       |
| `lit.supplementary.keycloak_destroy`                                                                                                                                              | Gate destructive cleanup behind explicit execution inputs                                         |

All role directories are available in the same
[immutable collection tree](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles).
The release has no role argument specifications. This bounded interface is
derived from its defaults and assertions:

| Variable                                                                                                            | Type and requirement in `v1.40.0`                                       | Published default                              | Sensitivity and review note                                                             |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| `keycloak_run_preflight`, `keycloak_run_deploy`, `keycloak_run_config`, `keycloak_run_cac`, `keycloak_run_validate` | Booleans on the orchestrator                                            | `true`                                         | Not secret; config and CaC are selected but their own apply switches default to skipped |
| `keycloak_run_ops`, `keycloak_run_backup_restore`, `keycloak_run_upgrade`, `keycloak_run_destroy`                   | Booleans on the orchestrator                                            | `false`                                        | Not secret; enabling one also requires reviewing its action and execution gates         |
| `keycloak_deploy_image`                                                                                             | Non-empty string                                                        | `quay.io/keycloak/keycloak:latest`             | Not secret; the mutable default must be replaced with an approved digest                |
| `keycloak_deploy_manage_postgres`                                                                                   | Boolean                                                                 | `false`                                        | Not secret; `false` requires a separately managed PostgreSQL contract                   |
| `keycloak_deploy_hostname`                                                                                          | String                                                                  | Empty string                                   | Environment-sensitive; set the reviewed issuer hostname explicitly                      |
| `keycloak_deploy_db_password`                                                                                       | String; required when secure retrieval or generation does not supply it | Empty string                                   | **Sensitive**; runtime secret channel only                                              |
| `keycloak_deploy_admin_password`                                                                                    | String; required under the same condition                               | Empty string                                   | **Sensitive**; runtime secret channel only                                              |
| `keycloak_deploy_generate_secrets`                                                                                  | Boolean                                                                 | `true`                                         | Not secret; generated values still require an approved secure store                     |
| `keycloak_config_skip_apply`                                                                                        | Boolean                                                                 | `true`                                         | Not secret; `false` creates mapped facts that the v1.40 deploy role does not consume    |
| `keycloak_cac_skip_apply`                                                                                           | Boolean                                                                 | `true`                                         | Not secret; `false` requires an API URL and administrator credentials                   |
| `keycloak_cac_admin_password`                                                                                       | String derived from the deploy input                                    | Empty unless supplied                          | **Sensitive**; never include it in a public playbook or evidence                        |
| `keycloak_preflight_required_ports`                                                                                 | Sequence                                                                | The configured Keycloak port, otherwise `8080` | Environment-sensitive; preflight expects each port to be unused                         |
| `keycloak_validate_url`, `keycloak_validate_realm`                                                                  | Non-empty strings                                                       | Derived local URL and `master`                 | Environment-sensitive; override both for the approved candidate                         |

Inspect the installed release and exact lifecycle entry points without
executing them:

```bash
ansible-galaxy collection list lit.supplementary
ansible-doc --type role --list lit.supplementary |
  sed -n '/^lit\.supplementary\.keycloak/p'
```

The reported collection version must be `1.40.0` for this interface record,
but the version string alone does not prove which bytes are installed. The
official
[`lit-supplementary-1.40.0.tar.gz`](https://github.com/lightning-it/ansible-collection-supplementary/releases/download/v1.40.0/lit-supplementary-1.40.0.tar.gz)
release artifact has SHA-256
`deee742f5514f170a79a44597cb237cc9daca2b961c16f834eecf88f24835d56`;
its published
[release evidence](https://github.com/lightning-it/ansible-collection-supplementary/releases/download/v1.40.0/release-evidence.json)
binds that artifact to the commit above. Verify that digest or equivalent
approved provenance and stop on any mismatch.

### Blocked lifecycle paths in v1.40.0

Do not use the v1.40 orchestrator, deploy, configuration, or upgrade roles to
create or change a Keycloak service. The deploy role starts Keycloak with
`start-dev` and renders database and bootstrap-administrator passwords into a
pod manifest created with mode `0644`, without suppressing those rendering
details from task output. The configuration role creates mapped facts that
the deploy role never consumes. With execution enabled, the upgrade role can
proceed to deployment after requesting only a backup dry run rather than a
completed backup.

The explicit read-only `keycloak_preflight` example below is the only v1.40
role invocation within this review candidate's safe scope. A deployment path
must wait for a new immutable release that includes corrected production start
behavior, secret handling, manifest permissions, configuration wiring, and
backup-before-upgrade enforcement, together with runtime evidence for those
controls.

## Public boundary

Do not publish real realms, clients, redirect addresses, identity-provider
metadata, user attributes, group names, role mappings, certificate material,
administrative identities, database endpoints, or authentication findings.
Public examples may use `id.example.com`, the realm `example`, and non-secret
placeholders only.

## Input and output contract

| Contract part      | Required input                                                                               | Expected output                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Artifact           | Immutable Keycloak release or image identity and the selected provider set                   | The exact reviewed server artifact                                               |
| External interface | Canonical hostname, TLS and proxy boundary, management exposure, and network policy          | Stable issuer and administrative paths through the approved boundary             |
| Persistent state   | Supported database, schema lifecycle, ownership, capacity, and recovery contract             | Durable identity configuration and user state                                    |
| Realm model        | Realm ownership, authentication flows, session policy, events, and administrative separation | A versioned, reviewed identity-domain definition                                 |
| Client contract    | Protocol, client type, redirect and origin rules, scopes, claims, keys, and rotation         | Explicit relying-party behavior without secret values in source                  |
| Federation         | Approved upstream identity or directory contract, attribute mapping, and failure mode        | Only reviewed trust relationships enabled                                        |
| Operations         | Availability, time, email, logs, metrics, audit access, and maintenance ownership            | Observable identity service with protected event and user data handled by policy |

Configuration can be supplied through several mechanisms, with defined
precedence in Keycloak. A blueprint must choose and document one ownership
model so a higher-precedence run-time value cannot silently override the
reviewed configuration.

## Prerequisites

- The selected release supports the approved runtime, database, and deployment
  topology according to its own documentation.
- DNS, time synchronization, TLS, proxy forwarding, issuer URL, and certificate
  trust are stable and testable before a relying service is connected.
- Database backup and restore, schema migration, capacity, and recovery-time
  expectations have been exercised for the chosen design.
- Bootstrap administration and client credentials are resolved through an
  approved runtime channel and rotated after any temporary bootstrap use.
- Realm, client, group, role, scope, claim, session, event, and federation
  owners are identified; public documentation contains none of their real
  values.
- A non-production relying party and test identities are available for
  end-to-end protocol and authorization checks.

## Safe validation

Validate the exact rendered server configuration and realm change before
exposure. In an isolated environment, verify startup, readiness, database
connectivity, hostname behavior, TLS, proxy handling, and denial of unintended
management access.

With disposable identities, exercise discovery metadata, authentication,
logout, session expiry, required claims, key rotation behavior, and both
allowed and denied client access. Verify issuer, audience, redirect, and origin
semantics from the relying party rather than accepting a successful login page
as proof.

After an authorized rollout, verify the intended client path and monitor
authentication errors, database health, event processing, and time skew. Stop
if issuer metadata changes unexpectedly, management becomes publicly exposed,
an unapproved redirect is accepted, required claims differ, or secrets appear
in logs or generated evidence.

The published preflight role performs only command discovery, fact assertions,
port-availability reads, and optional secret-input assertions. This minimal
example neither retrieves a secret nor deploys a service:

```yaml
---
- name: Inspect a Keycloak candidate host
  hosts: keycloak_candidate
  gather_facts: true
  roles:
    - role: lit.supplementary.keycloak_preflight
      vars:
        keycloak_deploy_host_ip: 127.0.0.1
        keycloak_deploy_port: 8080
        keycloak_deploy_manage_systemd: true
        keycloak_preflight_check_vault_auth: false
```

Review the intended bind address and port before running the play. A pass
means only that Podman and systemd meet the checks and the candidate port is
unused.

The release's basic deploy and CaC scenarios record `syntax_stub`; they do not
execute those roles. It also contains a narrowly scoped
[`keycloak-lifecycle-incus_heavy` scenario](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/molecule/keycloak-lifecycle-incus_heavy)
that deploys the mutable Keycloak `26.0` image tag with managed PostgreSQL in a
privileged Ubuntu 24.04 Incus test container and reads realm, discovery, LDAPS,
and backup results. That scenario does not establish production support, test
the release's mutable default image, cover every lifecycle action, or include
a runtime idempotence step.

## Recovery and rollback considerations

Realm configuration, keys, sessions, federated links, and database state can
interact. Define which are restored, regenerated, or deliberately invalidated
and how relying services learn of the result. Preserve a consistent database
backup and the exact server configuration required by the selected release.

Do not assume an older server can read a database after a schema migration.
If acceptance fails, isolate the candidate and let the recovery owner select a
tested restore, repair, or reviewed forward correction. Account for active
sessions and published signing keys when evaluating impact.

## Evidence and limitations

Retain artifact identity, redacted configuration checksum, database and proxy
checks, reviewed realm-change identity, protocol test matrix, denied-access
results, key-rotation observation, backup evidence reference, approval, and
acceptance. Store user, client, federation, and security findings privately.

This contract does not choose an authentication flow, define business roles,
approve a federation, or prove a relying party's authorization logic. It also
does not make a public realm export safe to publish.

The collection is MIT-licensed; Keycloak, PostgreSQL, selected images,
providers, and identity integrations retain their own licenses. A licensing
review is required for the selected artifact set. This page remains
`review-candidate` and `pending` until identity, database, container-runtime,
automation, security, relying-party, and product owners approve the exact
release, interfaces, protocol results, and recovery evidence.

## Public references

- [Configuring Keycloak](https://www.keycloak.org/server/configuration)
- [Keycloak supported configurations](https://www.keycloak.org/server/supported-configurations)
- [`lit.supplementary` `v1.40.0` source at the reviewed commit](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3)
