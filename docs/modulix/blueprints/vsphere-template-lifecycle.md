---
id: modulix-blueprint-vsphere-template-lifecycle
title: vSphere template-lifecycle evaluation contract
description: Evaluate a template lifecycle without implying a tested vSphere release, guest-customization path, or public build implementation.
slug: /modulix/blueprints/vsphere-template-lifecycle/
sidebar_position: 1
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - virtualization engineers
    - automation architects
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:ignore vsphere -->

# vSphere template-lifecycle evaluation contract

This conceptual blueprint defines a reviewable lifecycle for a guest
operating-system template managed through VMware vSphere. It does not contain a
management-plane address, data-center layout, network name, guest credential,
licensing detail, or customer-specific baseline.

A template is a software supply-chain artifact. Pin and review its inputs,
prove that clones receive unique identities, and release a new immutable
version instead of modifying an approved template in place.

## Implementation status

No exact vSphere or API release, guest operating-system release,
guest-customization mechanism, public template-builder commit, or clone-test
result is pinned by this page. The stages below are an evaluation contract, not
a description of an implemented ModuLix interface. Close that semantic gap with
an immutable build implementation and representative clone, recovery, and
retirement evidence reviewed by virtualization, guest-operating-system,
security, recovery, product, and licensing owners.

Broadcom's current API documents interfaces for creating content-library VM
templates and applying guest customization, but API availability is not proof
of compatibility with a selected product or guest release. This page therefore
provides no command or payload example. A deployment runbook must pin the exact
API documentation and use only a version-tested request generated from the
approved implementation.

## Scope and prerequisites

Approve these inputs before a build:

- Guest operating-system image, edition, architecture, checksum, and lifecycle
  state.
- vSphere and guest-tools compatibility decisions for the selected platform
  versions.
- Firmware, virtual hardware, disk, controller, and secure-boot policy.
- Reviewed operating-system baseline and documented exceptions.
- Package repository snapshot, update policy, trust roots, and time sources.
- Guest customization mechanism and ownership of its sensitive inputs.
- Build network, test network, release library, access roles, and retention.
- Backup or reconstruction method for build definitions and released
  artifacts.

Record environment values in the private build plan. Use dedicated build
credentials that expire or are revoked at handoff.

## Lifecycle stages

### Build

1. Create a uniquely identified build from the verified guest image and
   reviewed virtual-hardware profile.
2. Apply operating-system updates and the approved baseline from pinned
   automation content.
3. Install only supported guest integration tools and required bootstrap
   agents. Record exact package and content identities.
4. Run baseline, vulnerability, filesystem, and service checks. Resolve or
   approve exceptions before sealing.

### Sanitize and seal

Remove build credentials, temporary files, package caches not required by the
release, logs containing sensitive build context, shell history, network
leases, and persistent machine-specific identity that the guest-customization
process is designed to regenerate. Do not remove identifiers that the guest
operating system or vendor requires for safe boot.

Shut down cleanly, confirm that no snapshot or attached medium contains a
credential, and create an immutable template or content-library version with a
stable release identifier. Preserve the build definition separately so the
artifact can be reconstructed.

### Verify a clone

Clone into an isolated test scope using synthetic customization inputs. Verify:

- The guest boots without build-time access or an attached installation
  medium.
- Machine identity, host keys, network identity, and instance metadata are
  unique where the selected guest design requires uniqueness.
- Disk expansion, time synchronization, name resolution, certificate trust,
  and guest tools behave as designed.
- The effective operating-system baseline, package inventory, and automation
  content match the release record.
- Monitoring and authorized management access initialize without embedding a
  reusable credential in the template.
- A second clone does not inherit mutable state from the first clone.

Template verification is incomplete until a clone has passed; inspecting the
powered-off source alone cannot prove customization behavior.

### Release, deprecate, and retire

Publish the template under an immutable version, restrict modification, and
allow deployment automation to select only approved versions. Monitor guest
image age and upstream security support. Build and verify a replacement when
an input changes rather than patching the released template.

Mark the previous version deprecated, identify consumers, and retain it only
for the approved recovery window. Prevent new deployments before deleting a
retired version, then record deletion from each approved distribution
location.

## Recovery and evidence

If clone validation fails, quarantine the candidate and return to the pinned
build definition. If a released template is later found unsafe, block new use,
identify affected deployments through release evidence, publish a corrected
version, and apply the approved remediation to existing guests. Reverting the
deployment selector does not repair already-created guests.

Retain source checksums, build-definition and automation identities, virtual
hardware decisions, scan and baseline results, exception approvals, sanitation
record, clone-verification evidence, release and deprecation decisions, and
retirement confirmation. Keep management-plane and guest details private.

This page supplies a lifecycle pattern, not version-specific vSphere or guest
instructions. Apply the [general blueprint record](../blueprints.md) and
[backup and recovery guidance](../../security/backup-and-recovery.md).

## Primary references

- [vSphere Automation API: create a VM template library item](https://developer.broadcom.com/xapis/vsphere-automation-api/latest/api/vcenter/vm-template/library-items/post/)
- [vSphere API: guest customization manager](https://developer.broadcom.com/xapis/vsphere-web-services-api/latest/vim.vm.GuestCustomizationManager.html)
