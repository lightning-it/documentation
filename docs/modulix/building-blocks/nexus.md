---
id: modulix-building-block-nexus
title: Nexus Repository interface candidate
description: Review the published Nexus role interface without treating its template coverage as a supported deployment.
slug: /modulix/building-blocks/nexus/
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
    - software supply-chain engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words sonatype Sonatype -->

# Nexus Repository interface candidate

This interface candidate defines the review boundary for a Sonatype Nexus
Repository service. Repository configuration, metadata, binary storage,
upstream trust, identity, and client behavior form one software-supply-chain
control and must be reviewed together.

This page is not an installation guide and does not select a repository format,
edition, storage backend, or availability design.

## Published Lightning IT automation interface

The public `lit.supplementary` collection release `v1.40.0`, at immutable
commit
[`9417550`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3),
contains the role directory and example FQCN
[`lit.supplementary.nexus`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/nexus).

The same release's role README calls the role a **template** for future
development, its metadata contains legacy role-name/namespace wording, and its
Molecule scenario does not execute the role. The collection path and example
establish the FQCN above, but they do not establish a production-supported
Nexus deployment.

There is no role argument specification. This bounded draft interface comes
from the immutable defaults and the four published assertions:

| Variable                                                            | Type and requirement in `v1.40.0`   | Published default                  | Sensitivity and review note                                                              |
| ------------------------------------------------------------------- | ----------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `nexus_nexus_hostname`                                              | Non-empty string; caller-required   | Empty string                       | Environment-sensitive; `nexus.example.com` is safe documentation data only               |
| `nexus_expose_host_https`                                           | Boolean                             | `true`                             | Not secret; confirm listener scope and reverse-proxy design                              |
| `nexus_caddy_container_port`, `nexus_caddy_host_port`               | Positive integers                   | `443`, `443`                       | Not secret; exposed host ports are environment-sensitive                                 |
| `nexus_nexus_image`                                                 | String                              | `docker.io/sonatype/nexus3:latest` | Not secret; mutable and unacceptable as an approved artifact identity                    |
| `nexus_caddy_image`                                                 | String                              | `docker.io/caddy:2`                | Not secret; mutable and must be replaced with an approved digest                         |
| `nexus_nexus_data_dir`                                              | String                              | `/srv/nexus`                       | Environment-sensitive; persistence and consistency are not asserted                      |
| `nexus_nexus_disable_anonymous`                                     | Boolean                             | `false`                            | Security-relevant; anonymous access remains enabled unless explicitly disabled           |
| `nexus_validate_certs`                                              | Boolean                             | `false`                            | Security-relevant; do not use the disabled default for an accepted HTTPS path            |
| `nexus_use_vault_pki`                                               | Boolean                             | `true`                             | Not secret; enabling it requires a reviewed Vault endpoint and authentication path       |
| `nexus_vault_role_id`, `nexus_vault_secret_id`                      | Strings                             | Empty strings                      | Unused defaults in v1.40.0; do not treat them as the role's Vault authentication path    |
| `nexus_vault_token`                                                 | String; falls back to `vault_token` | Undefined                          | **Sensitive**; the default path uses this token to retrieve separate AppRole credentials |
| `nexus_http_proxy_auth_password`, `nexus_https_proxy_auth_password` | Strings                             | Empty strings                      | **Sensitive**; never put values in public source, shell arguments, or evidence           |
| `nexus_skip_initial_config`                                         | Boolean                             | `false`                            | Not secret; the template can call configuration tasks unless explicitly skipped          |

Only `nexus_nexus_hostname`, `nexus_expose_host_https`, and the two Caddy ports
are checked by `tasks/assert.yml`. The presence of other defaults is not input
validation or a stability guarantee.

Inspect the installed release and exact collection entry without running it:

```bash
ansible-galaxy collection list lit.supplementary
ansible-doc --type role --list lit.supplementary |
  sed -n '/^lit\.supplementary\.nexus$/p'
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

The v1.40 role does not consume `nexus_vault_role_id` or
`nexus_vault_secret_id`. Its default Vault path instead requires
`nexus_vault_token`, commonly inherited from `vault_token`, to read separate
AppRole credentials. Anonymous access also remains enabled by default. These
facts reinforce the template status: only the assertion example below is in
scope, and the complete role is not an acceptable deployment candidate.

## Public boundary

Do not publish real repository names, upstream addresses, routing rules,
component coordinates, users, role mappings, cleanup policies, blob-store
locations, database endpoints, credentials, certificates, or vulnerability
findings. Use `packages.example.com` and non-secret placeholders in public
examples.

## Input and output contract

| Contract part       | Required input                                                                          | Expected output                                                             |
| ------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Artifact            | Immutable Nexus Repository release or image identity, edition, and license decision     | The exact reviewed application artifact                                     |
| Repository model    | Approved formats and hosted, proxy, or group purpose; ownership; and write policy       | Repositories whose behavior and precedence match the reviewed design        |
| Upstream trust      | Allowed sources, certificate roots, metadata and component-age policy, and failure mode | Proxy retrieval limited to approved, authenticated sources where required   |
| Persistent state    | Supported database, blob stores, capacity, quotas, retention, and consistency boundary  | Durable metadata and artifacts in approved storage                          |
| Identity and access | Authentication source, administrator custody, client roles, and service identities      | Least-privilege read, publish, and administration paths                     |
| Client interface    | Canonical URL, TLS and proxy boundary, supported client tools, and routing contract     | Stable endpoints with checksums preserved for consumers                     |
| Operations          | Availability, logging, metrics, cleanup, malware or policy integration, and ownership   | Observable service with protected component and user data handled by policy |

A proxy cache is not automatically a complete disconnected mirror. Its
contents depend on prior client requests and cache policy. A disconnected
blueprint must define and verify its required artifact closure separately.

## Prerequisites

- The selected release, edition, runtime, database, and storage combination is
  supported by the current Sonatype documentation for that exact version.
- Repository formats, upstreams, routing precedence, content immutability, and
  publish ownership have been approved by the software-supply-chain owner.
- DNS, TLS, reverse-proxy behavior, certificate trust, firewall paths, and
  client configuration can be tested without bypassing verification.
- Database and blob stores have compatible capacity, latency, permissions,
  encryption, backup, retention, and restore decisions.
- Bootstrap administration and client credentials are supplied through an
  approved runtime channel; anonymous access is an explicit decision.
- Cleanup and retention cannot delete required release, legal-hold, recovery,
  or disconnected-runtime artifacts.

## Safe validation

Validate rendered configuration, storage ownership, database compatibility,
and available capacity before client traffic is enabled. Start the candidate
in isolation and verify TLS, proxy behavior, authentication, denied access,
repository routing, and health through the intended client path.

Use a dedicated disposable repository and harmless example component to test
publish and retrieval only when both operations are in scope. Compare its
digest at the publisher, repository, and consumer. For a proxy repository,
test an approved component, an unavailable upstream, and rejection of an
unapproved source without placing real component names in public evidence.

After rollout, verify database and blob-store health, capacity, task results,
repository availability, and read-versus-publish authorization. Stop if a
client can route to an unapproved upstream, digest comparison fails, required
content is absent, or persistent state resolves to an unexpected store.

The only bounded preflight supported by this review record is the role's
read-only assertion task file. It can be inspected without invoking package,
Vault, Podman, systemd, or API tasks:

```yaml
---
- name: Inspect the draft Nexus interface
  hosts: localhost
  connection: local
  gather_facts: false
  tasks:
    - name: Run only the published Nexus assertions
      ansible.builtin.include_role:
        name: lit.supplementary.nexus
        tasks_from: assert
      vars:
        nexus_nexus_hostname: nexus.example.com
        nexus_expose_host_https: true
        nexus_caddy_container_port: 443
        nexus_caddy_host_port: 8443
```

Passing these four assertions proves only their types and non-empty hostname.
It is not a deployment preflight. The release's
[`nexus-basic` scenario](https://github.com/lightning-it/ansible-collection-supplementary/blob/94175506cca554092d71adecd474e15cddd0b6c3/molecule/nexus-basic/converge.yml)
explicitly records `syntax_stub` and never executes the role, so this page
makes no runtime, check-mode, idempotence, upgrade, or recovery claim.

## Recovery and rollback considerations

Repository metadata and blob content are a consistency boundary. Back up and
restore them according to the database and storage design documented for the
selected release. A directory copy or database snapshot alone may be
insufficient if the corresponding half changes during capture.

Follow the selected release's upgrade and restore guidance; do not assume an
application downgrade reverses a schema or storage migration. Preserve the
prior artifact, configuration, and compatible backup. If acceptance fails,
isolate the candidate and let the recovery owner select restore, repair, or a
reviewed forward correction.

## Evidence and limitations

Retain application identity, redacted configuration checksum, repository-model
approval, storage and database checks, TLS and access matrix, example-component
digest comparison, upstream-boundary result, backup evidence reference,
recovery decision, and acceptance. Store real component and infrastructure
details privately.

This contract does not assert that cached artifacts are trustworthy, complete,
licensed for redistribution, or free from vulnerabilities. Those properties
require separate provenance, policy, license, and security controls.

The collection is MIT-licensed; Nexus Repository, Caddy, databases, selected
images, plugins, and proxied content retain their own licenses and terms. This
page remains `review-candidate` and `pending`. Nexus, database, storage,
network, Vault, automation, supply-chain, licensing, security, and product
owners must validate a completed implementation and runtime evidence before
this interface can be described as a deployment building block.

## Public references

- [Nexus Repository documentation](https://help.sonatype.com/en/sonatype-nexus-repository.html)
- [Nexus Repository repository types](https://help.sonatype.com/en/repository-types.html)
- [Nexus Repository backup and restore](https://help.sonatype.com/en/backup-and-restore.html)
- [`lit.supplementary` `v1.40.0` source at the reviewed commit](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3)
