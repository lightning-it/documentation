---
id: modulix-blueprint-aap-disconnected-runtime
title: Assess a disconnected AAP overlay
description: Add deployment-model-specific AAP controls to the disconnected ModuLix base contract without implying a tested platform installation.
slug: /modulix/blueprints/aap-disconnected-runtime/
sidebar_position: 2
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
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

# Assess a disconnected AAP overlay

This conceptual blueprint defines the **AAP overlay** for a runtime that cannot
resolve dependencies directly from public services. It covers
deployment-model-specific platform acquisition, verification, transfer,
installation, content services, operation, and replacement. It does not name a
private registry, controller, network path, or removable medium.

Apply the [disconnected ModuLix runtime base contract](../installation/disconnected-runtime.md)
first. That base contract owns the ModuLix RPM, execution environment,
collections, dependency closure, and bounded target execution. This overlay
adds the selected AAP release and deployment model, vendor setup bundle or
images, subscription manifest, RHEL repositories, platform nodes, and internal
automation content services. Passing one contract does not imply that the other
has passed.

"Disconnected" must be defined as an explicit connectivity policy. A runtime
with a restricted proxy or a one-way synchronization service has different
trust and recovery boundaries from a physically isolated runtime.

## Implementation status

No AAP release, RPM or containerized deployment model, topology, setup bundle,
or immutable acceptance implementation is selected by this review candidate.
It is therefore an evaluation contract, not a tested AAP installation guide.
Red Hat documents different disconnected inputs and procedures by release and
deployment model; reviewers must pin one supported combination and validate its
exact vendor documentation before creating a runbook.

The semantic implementation gap closes only when the selected AAP artifacts,
ModuLix base release, internal services, and denial-of-egress test are bound to
immutable identities and approved by platform, ModuLix, security, recovery,
subscription, licensing, and product owners. This page intentionally contains
no installation command that could be mistaken for a validated procedure.

## Prerequisites and boundary decisions

Before acquiring an artifact, approve:

- The selected automation-platform release and its vendor support conditions.
- A connected staging area used only to retrieve and inspect approved public
  inputs.
- An internal artifact service or controlled import location with immutable
  identities, access control, capacity monitoring, backup, and retention.
- A transfer procedure with separate exporter and importer authorization.
- Trusted signing roots, checksum sources, vulnerability policy, and a
  documented exception process.
- The exact destinations and protocols the operating runtime may reach.
- A replacement and emergency-revocation path that does not depend on public
  network access.

The product release documentation and support matrix remain authoritative for
compatible operating systems, execution environments, registries, and import
mechanisms. This page does not assert compatibility for a specific release.

## Build an artifact bill

Treat the disconnected set as one reviewed release. Its bill should include:

| Artifact class              | Identity and assurance                                                  |
| --------------------------- | ----------------------------------------------------------------------- |
| Platform packages or images | Exact release, digest or checksum, source, and signature result         |
| Execution environments      | Image digest, base-image identity, build inputs, scan, and SBOM         |
| Automation collections      | Exact version or commit, integrity evidence, and dependency closure     |
| System packages             | Repository snapshot identity and enabled component set                  |
| Trust material              | Public certificate or signing-root version and approved purpose         |
| Installation configuration  | Reviewed non-secret schema and checksum                                 |
| Secret references           | Identifier and owner only; values travel through a separate secure path |

Resolve transitive dependencies in the connected staging area. A version
range, mutable tag, or package name without a repository snapshot is not a
complete disconnected input.

## Controlled transfer and import

1. Retrieve artifacts only from approved sources into the staging area.
2. Verify signatures and checksums before processing, then scan the exact
   artifacts and generate a software bill of materials where supported.
3. Compare the result with the vulnerability and license policy. Record any
   time-bounded exception before export.
4. Create a transfer manifest containing artifact identities, sizes,
   checksums, approvals, and the destination release identifier. Do not put
   credentials or private topology in the manifest.
5. Seal and transfer the set using the approved boundary procedure.
6. On the disconnected side, verify the seal and every artifact checksum
   before import. A failed or missing comparison is a safe stop.
7. Import under immutable identities, then resolve every installation input
   from the internal services or approved media.
8. Disable or deny unintended fallback to public sources before execution.

Do not weaken transport verification, substitute a newer dependency, or reuse
an unrecorded local artifact to complete an import.

## Verify operation

Use an isolated acceptance target and synthetic inputs to verify that:

- Installation resolves no undeclared public dependency.
- The controller can resolve the pinned execution environment and collection
  set from the expected internal source.
- A bounded no-change or vendor-supported diagnostic job completes without
  attempting an unapproved connection.
- Artifact identities reported by the runtime match the transfer manifest.
- Monitoring detects capacity, integrity, certificate-expiry, and
  synchronization failures without exposing private paths.

The absence of a visible network error does not prove disconnection. Confirm
the effective egress policy independently at the boundary.

## Replacement, revocation, and evidence

Publish a new immutable artifact set for updates; do not modify an approved set
in place. Keep the previous supported set only for the reviewed recovery
window. If an artifact must be revoked, prevent new use, identify affected
runtime releases from the manifest, and replace the complete dependency set.

Retain the artifact bill, provenance checks, scan and SBOM references,
transfer and import approvals, boundary verification, acceptance outcome, and
revocation history. Store environment-specific evidence privately.

Use the general [blueprint record](../blueprints.md) for approval fields and
the [ModuLix lifecycle](../lifecycle.md) for release decisions.

## Primary references

- [AAP 2.6 disconnected installation](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/install-assembly_disconnected_installation)
- [AAP 2.6 containerized disconnected installation](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/install-assembly_aap_containerized_disconnected_installation)
- [AAP 2.6 execution-environment guide](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/html/creating_and_using_execution_environments/index)
- [Ansible Builder execution-environment model](https://docs.ansible.com/projects/builder/en/latest/)
