---
id: wunderbox-incus-runtime
title: Incus runtime evaluation contract
description: Evaluate Incus as a possible Wunderbox runtime without implying a tested integration, supported topology, or approved deployment.
slug: /wunderbox/architecture/incus-runtime/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - infrastructure architects
    - platform engineers
    - security engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words Incus OpenFGA -->

# Incus runtime evaluation contract

This page defines a conceptual review model for using Incus as one possible
runtime within a Wunderbox implementation. It does not state that Incus is
required, deployed, tested, or supported by a particular Wunderbox release. A
platform owner must approve the exact Incus release, host operating system,
packaging source, storage driver, network design, and instance types before use.

## Implementation status

This review candidate does not reference a released Wunderbox-to-Incus adapter,
an immutable host definition, or test evidence for a concrete topology. That is
a semantic implementation gap: the boundaries below are acceptance criteria,
not a description of behavior already delivered by automation. Close the gap
with a public or appropriately controlled implementation pinned to an immutable
release, representative lab results, and human product, platform, security, and
licensing review.

The upstream `main` documentation linked here changes over time. A deployment
record must instead pin a supported Incus release and the corresponding
documentation or source revision. This page intentionally provides no command
example that could be mistaken for a release-tested Wunderbox procedure.

## Scope and assumptions

The model covers Incus system containers and virtual machines. Application
containers are a separate workload form and require their own support and
security decision. The [Incus instance model](https://linuxcontainers.org/incus/docs/main/explanation/instances/)
explains the differences between instance types; they are not interchangeable
security or compatibility boundaries.

The review assumes:

- a dedicated Linux host or host group with an approved, immutable baseline;
- an exact Incus release and package origin selected through release review;
- separate management and workload network paths;
- named owners for host, storage, network, image, identity, and workload state;
- a non-production lab that reproduces the proposed instance type and drivers;
  and
- tested recovery objectives for every stateful dependency.

Do not infer capacity, availability, isolation, or vendor support from this
architecture. Those properties require evidence from the exact deployment.

## Runtime boundaries

| Boundary             | Responsibility                                                                       | Required contract                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Host                 | Kernel, CPU virtualization, devices, time, package lifecycle, and local privilege    | Supported versions, hardening baseline, update path, capacity reserve, and recovery owner              |
| Incus management     | API, configuration database, authentication, authorization, and lifecycle operations | Approved administrators, protected endpoint, audit evidence, revocation, and safe maintenance path     |
| Project and policy   | Namespaces for instances and selected images, profiles, networks, and storage        | Isolation features, restrictions, quotas, owner, and tested denial cases                               |
| Image                | Bootable operating-system content plus Incus metadata                                | Source, license, immutable fingerprint, build evidence, vulnerability decision, and expiry             |
| Profile and instance | Reusable configuration followed by instance-specific overrides                       | Versioned intent, allowed devices, resource limits, and drift decision                                 |
| Network              | Managed or external connectivity for management and workloads                        | Address ownership, filtering, name and time dependencies, failure behavior, and observation            |
| Storage              | Pools, instance volumes, custom volumes, snapshots, and backup copies                | Driver compatibility, encryption decision, capacity thresholds, consistency boundary, and restore path |
| Workload             | Guest operating system, service, data, and consumer outcome                          | Workload owner, support contract, update path, health criteria, and data lifecycle                     |

Incus [projects](https://linuxcontainers.org/incus/docs/main/explanation/projects/)
can group instances and can isolate selected resources, but project features are
configuration choices. Record whether images, profiles, networks, and storage
are isolated or inherited. Test the resulting authorization and data paths; a
project name alone is not proof of isolation.

## Management trust boundary

Incus separates authentication from authorization. Authentication establishes
which client is connecting; it does not by itself define what that client may
do. Authorization must be designed and tested independently.

For local access, Incus documents that membership in `incus-admin` grants full
API access over the Unix socket, while membership only in `incus` is restricted
to a project associated with that user. Treat full API access as root-equivalent
trust: it can expose host paths or devices and alter instance security controls.
Grant it only to principals trusted with the host, and do not describe the two
local groups as equivalent.

Remote API communication uses HTTPS and must follow the selected release's
[authentication](https://linuxcontainers.org/incus/docs/main/authentication/)
and [authorization](https://linuxcontainers.org/incus/docs/main/authorization/)
models. A trusted TLS client can be restricted to projects through TLS
authorization. Incus also warns that OIDC authentication without compatible
authorization gives authenticated users full access; an OIDC design therefore
needs the supported OpenFGA authorization path for the pinned release. Test
positive and denied actions, dependency failure, and revocation in the lab
before approval.

Keep the management endpoint off general workload paths. Record which system
owns certificate issuance, identity lifecycle, name resolution, time, and
authorization policy. A failure in any of those dependencies must have an
observable, safe outcome.

## Image, profile, and instance contract

An image fingerprint identifies content; it does not prove who produced the
content or whether it is licensed, secure, or supported. Preserve publisher and
build provenance separately. Resolve aliases to an immutable fingerprint before
approval because an alias can be moved to newer content.

Profiles are ordered reusable configuration, and instance-specific settings can
override them. Acceptance evidence must therefore record the effective instance
configuration, not only the intended profile. Review devices that expose host
paths, hardware, kernel facilities, or privileged behavior as changes to the
trust boundary.

See [Incus image deployment](../operations/incus-image-deployment.md) for the
promotion contract and [RHEL images](../operations/incus-rhel-images.md) for
additional provenance and licensing gates.

## Verification before approval

Platform and security subject-matter experts must validate the exact design in
an isolated lab. At minimum, retain evidence that reviewers:

1. resolved the host, Incus, driver, firmware, and image versions;
2. verified package and image origins by an approved trust method;
3. tested expected and denied management actions with each identity class;
4. demonstrated project, network, storage, and device boundaries;
5. measured capacity and behavior during host, storage, and network pressure;
6. verified instance boot, shutdown, restart, update, and retirement;
7. removed an identity and proved that access was revoked;
8. restored representative platform and workload state into an isolated target;
   and
9. verified the consumer-facing service outcome after recovery.

A successful instance start is only one check. It does not establish isolation,
recoverability, supported operation, or production readiness.

## Recovery and evidence

Incus stores related state in both its database and storage. Its
[server backup guidance](https://linuxcontainers.org/incus/docs/main/backup/)
warns that backing up only one of those is not a complete server backup and that
external storage needs separate protection. Define the consistency boundary and
restore order for the selected drivers. Treat snapshots in the original pool as
local recovery points, not independent backup copies.

For an unsuccessful change, stop at the first breached safety condition. The
authorized owner chooses rollback, restore, rebuild, or forward repair based on
data integrity and the tested recovery contract. Do not improvise host-level
repair from this public page.

Store exact topology, identities, configuration exports, test output, findings,
and restore evidence only in the authorized evidence system. The public approval
record should contain the reviewed release identities, decision, reviewers,
date, and evidence reference without exposing protected details.

## Primary references

- [Incus instances](https://linuxcontainers.org/incus/docs/main/explanation/instances/)
- [Incus projects](https://linuxcontainers.org/incus/docs/main/explanation/projects/)
- [Incus profiles](https://linuxcontainers.org/incus/docs/main/profiles/)
- [Incus storage](https://linuxcontainers.org/incus/docs/main/explanation/storage/)
- [Incus authentication](https://linuxcontainers.org/incus/docs/main/authentication/)
- [Incus authorization](https://linuxcontainers.org/incus/docs/main/authorization/)
