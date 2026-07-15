---
id: modulix-building-block-forgejo
title: Forgejo building-block contract
description: Define a public deployment and assurance contract for a Forgejo software-development service.
slug: /modulix/building-blocks/forgejo/
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation architects
    - platform operators
    - service owners
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words codeberg Forgejo forgejo healthz kube postgres taskset tasksets -->

# Forgejo building-block contract

This building block defines the inputs and assurance needed for a Forgejo
service. It covers the service boundary, persistent state, dependencies, and
safe acceptance. It is not an installation guide or a declaration that a
particular Forgejo feature is enabled.

## Published Lightning IT automation interface

The public `lit.supplementary` collection release `v1.40.0`, at immutable
commit
[`9417550`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3),
publishes two Forgejo role entry points:

| Fully qualified role                                                                                                                                                      | Published responsibility and limit                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`lit.supplementary.forgejo_deploy`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/forgejo_deploy) | Render and operate a Forgejo Podman kube-play deployment, optionally with a dedicated PostgreSQL service     |
| [`lit.supplementary.forgejo_cac`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/forgejo_cac)       | Check `/api/healthz`; the release contains no organization, repository, team, or user reconciliation taskset |

The release has no role argument specifications. The bounded interface below
comes from the immutable defaults and assertions:

| Variable                              | Type and requirement in `v1.40.0`                                         | Published default                 | Sensitivity and review note                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `forgejo_deploy_image`                | Non-empty string                                                          | `codeberg.org/forgejo/forgejo:10` | Not secret; the default is a mutable tag and must be replaced by an approved digest                       |
| `forgejo_deploy_manage_postgres`      | Boolean                                                                   | `false`                           | Not secret; `false` requires a separately managed PostgreSQL contract                                     |
| `forgejo_deploy_host_data_dir`        | Non-empty string                                                          | `/srv/forgejo/data`               | Environment-sensitive; confirm ownership, persistence, backup, and SELinux behavior                       |
| `forgejo_deploy_root_url`             | String; an empty value derives the API URL                                | Empty string                      | Environment-sensitive; set the reviewed canonical external URL explicitly                                 |
| `forgejo_deploy_disable_registration` | Boolean                                                                   | `true`                            | Not secret; verify the rendered application configuration and live behavior                               |
| `forgejo_deploy_install_lock`         | Boolean                                                                   | `false`                           | Security-relevant; the default leaves the installation interface unlocked                                 |
| `forgejo_deploy_db_password`          | String; required when neither secure retrieval nor generation supplies it | Empty string                      | **Sensitive**; provide through an approved secret channel only                                            |
| `forgejo_deploy_admin_password`       | String; required under the same condition                                 | Empty string                      | **Sensitive**; generated values are stored but not consumed to bootstrap an administrator in this release |
| `forgejo_deploy_generate_secrets`     | Boolean                                                                   | `true`                            | Not secret; generation still fails unless the result has an allowed secure store                          |
| `forgejo_cac_skip_apply`              | Boolean                                                                   | `true`                            | Not secret; setting `false` runs only API preflight in this release                                       |
| `forgejo_cac_token`                   | String; one allowed authentication input when CaC preflight is enabled    | Empty string                      | **Sensitive**; never put a token on a command line or in public evidence                                  |
| `forgejo_cac_validate_certs`          | Boolean                                                                   | `false`                           | Security-relevant; the disabled default is not acceptable for an HTTPS check                              |

When CaC preflight is enabled, the role assertions require its URL and either
a token or an administrator username/password pair even though the published
taskset only reads the health endpoint. The empty object catalogs are future
interface placeholders, not reconciliation support.

Inspect the installed release and both exact FQCNs without executing a role:

```bash
ansible-galaxy collection list lit.supplementary
ansible-doc --type role --list lit.supplementary |
  sed -n '/^lit\.supplementary\.forgejo_/p'
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

### Blocked deployment path in v1.40.0

Do not execute `forgejo_deploy` or present its output as an acceptable
candidate from this release. It renders the database password into a pod
manifest created with mode `0644`, defaults the Forgejo installation lock to
`false`, and does not consume its generated administrator password to create
the administrator. The CaC role also disables certificate validation by
default. These are release blockers, not settings that a successful health
response can compensate for.

Only the credential-free, certificate-validating health example below is
within this review candidate's safe scope. A deployment path requires a new
immutable release that corrects the manifest permissions and secret handling,
locks installation, defines administrator bootstrap, enables certificate
validation, and supplies runtime evidence for those controls.

## Public boundary

Public documentation may identify Forgejo and describe generic service
contracts. Keep real repository names, users, organizations, access policies,
webhook targets, runner registrations, network endpoints, storage paths,
configuration values, email routes, keys, tokens, and incident findings in the
authorized private system.

## Input and output contract

| Contract part       | Required input                                                                             | Expected output                                                              |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Artifact            | Immutable Forgejo release or image identity and verified acquisition evidence              | The exact reviewed application artifact                                      |
| Public interface    | Approved external URL, TLS termination, proxy headers, SSH decision, and exposure          | Canonical clone and browser URLs with bounded network reachability           |
| Identity and access | Authentication source, administrator custody, registration policy, and authorization model | Access enforced by the reviewed identity boundary                            |
| Persistent state    | Database, repository, large-file, attachment, package, and configuration ownership         | State placed only in the approved durable stores                             |
| Integrations        | Email, webhooks, Actions or runners, mirrors, and external identity providers              | Only explicitly approved integrations enabled                                |
| Operations          | Capacity, availability, logging, metrics, abuse controls, and maintenance ownership        | Observable service with protected user and repository data handled by policy |
| Recovery            | Consistency boundary, backup method, restore order, and recovery decision owner            | Tested recovery for the selected storage and database design                 |

The external URL, storage layout, database choice, and enabled integrations are
architecture inputs. They must not be accepted from convenient application
defaults without review.

## Prerequisites

- The selected release supports the approved operating environment and
  database according to its own documentation.
- DNS, TLS, reverse-proxy behavior, SSH exposure, and trusted forwarding
  headers have an agreed owner and test plan.
- Database and every repository-related storage class have capacity,
  permissions, encryption, backup, retention, and restore decisions.
- Bootstrap administration and all service secrets are supplied at run time;
  no value is committed to the automation or included on a command line.
- User registration, federation, organization ownership, repository
  visibility, and protected-branch defaults are decided before exposure.
- Webhooks, runners, mirrors, and email remain disabled until their separate
  trust boundaries are approved.

## Safe validation

Validate rendered configuration and storage permissions before exposing the
candidate. In an isolated environment, verify startup, the canonical URL, TLS,
proxy behavior, database migrations, and access denial for an unauthenticated
request.

Use a disposable organization, repository, and non-privileged test identities
to exercise authenticated clone, push, pull, issue access, and authorization
boundaries. Test a separately authorized integration only if it is in scope.
Remove disposable content according to the approved retention policy.

After rollout, verify the service through its intended client path, confirm
that administrative setup is locked as intended, and check database, storage,
queue, and background-job health. A rendered login page alone is not service
acceptance.

Stop if the canonical URL changes, an unapproved registration or integration
is available, storage resolves to an ephemeral path, or repository visibility
does not match the test matrix.

The only Forgejo-specific API check implemented by the public CaC role in this
release is a read-only health request. A credential-free equivalent for an
approved non-production URL is:

```yaml
---
- name: Inspect the Forgejo health endpoint
  hosts: localhost
  connection: local
  gather_facts: false
  tasks:
    - name: Read Forgejo health
      ansible.builtin.uri:
        url: https://forgejo.example.com/api/healthz
        method: GET
        validate_certs: true
        status_code: 200
      changed_when: false
```

Replace the documentation hostname only with the approved candidate URL; do
not disable certificate validation to obtain a result. A `200` response proves
only that endpoint's response, not authorization, persistence, backup, or
canonical-URL correctness.

The release's
[`forgejo-deploy-basic`](https://github.com/lightning-it/ansible-collection-supplementary/blob/94175506cca554092d71adecd474e15cddd0b6c3/molecule/forgejo-deploy-basic/converge.yml)
and
[`forgejo-cac-basic`](https://github.com/lightning-it/ansible-collection-supplementary/blob/94175506cca554092d71adecd474e15cddd0b6c3/molecule/forgejo-cac-basic/converge.yml)
Molecule scenarios explicitly record `syntax_stub`. They do not execute either
role, so this page makes no runtime, check-mode, or idempotence claim.

## Recovery and rollback considerations

Forgejo state spans more than Git repositories. Recovery planning must cover
the database and every selected storage class as one documented consistency
boundary. Preserve the selected release's configuration and record the restore
order.

Do not assume an application downgrade can reverse a database migration.
Before an upgrade, satisfy the release's backup and compatibility guidance.
If acceptance fails, isolate the candidate and let the recovery owner choose a
tested restore, repair, or forward correction.

## Evidence and limitations

Retain artifact identity, redacted configuration checksum, dependency and
storage checks, database migration result, TLS and proxy tests, authorization
matrix result, integration scope, backup evidence reference, approval, and
acceptance. Keep repository and identity details private.

This contract does not select an installation method, database, object store,
authentication provider, runner architecture, or availability topology. It
does not establish that optional integrations are safe merely because Forgejo
supports them.

The collection is MIT-licensed, while Forgejo, PostgreSQL, selected images,
and dependencies retain their own licenses. A licensing reviewer must approve
the selected artifact set. This page remains `review-candidate` and `pending`
until Forgejo, database, identity, storage, automation, security, and product
owners validate the exact release, variables, runtime evidence, and recovery
test.

## Public reference

- [Forgejo Administrator Guide](https://forgejo.org/docs/latest/admin/)
- [`lit.supplementary` `v1.40.0` source at the reviewed commit](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3)
