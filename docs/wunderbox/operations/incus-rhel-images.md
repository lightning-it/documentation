---
id: wunderbox-incus-rhel-images
title: RHEL-on-Incus image evaluation contract
description: Evaluate RHEL image acquisition and promotion for Incus without implying redistribution rights, vendor support, or a tested build.
slug: /wunderbox/operations/incus-rhel-images/
sidebar_position: 2
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform operators
    - release reviewers
    - licensing reviewers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words Incus qcow RHEL unregistration -->

# RHEL-on-Incus image evaluation contract

This page defines a review contract for Red Hat Enterprise Linux images intended
for Incus. It is not legal advice, a license grant, a subscription entitlement,
or a statement that Red Hat supports Incus. Do not acquire, copy, customize,
mirror, publish, or deploy a RHEL image until the organization's licensing owner
has approved the exact source, use, subscription coverage, and distribution
boundary.

## Implementation status

No RHEL release, Incus release, image-builder blueprint, public build revision,
or joint RHEL/Incus test result is selected by this review candidate. The page
therefore defines evaluation criteria and does not document a working image
implementation. Close the semantic gap with an immutable approved build
definition, artifact and Incus fingerprints, lab evidence, and explicit RHEL,
Incus, security, recovery, product, and licensing decisions. No import or build
commands are published because none has been validated for a named support and
entitlement combination.

## Scope and assumptions

The primary use case is a RHEL virtual-machine disk image imported into the
Incus image format. A RHEL system-container image is a different artifact and
support decision. A Red Hat Universal Base Image for an application container
is also different from a full RHEL operating-system image. Do not transfer UBI
redistribution assumptions to full system images.

The proposed artifact must have:

- a named licensing and subscription owner;
- an approved Red Hat acquisition or build path;
- exact RHEL release, architecture, package, repository, and lifecycle intent;
- an immutable build definition and isolated build execution where customized;
- checksums and upstream trust verification;
- an approved Incus, host, firmware, and VM compatibility decision;
- non-production technical validation by RHEL and Incus subject-matter experts;
  and
- defined update, registration, backup, recovery, expiry, and deletion paths.

The current governing terms are the organization's agreement with Red Hat. Red
Hat publishes its standard
[agreements](https://www.redhat.com/en/about/agreements),
[product appendices](https://www.redhat.com/en/about/appendices), and
[end-user license agreements](https://www.redhat.com/en/about/eulas) for
reference, but a public link does not resolve the organization's specific
rights or obligations.

## Artifact contract

Record these layers independently:

| Layer                   | Required evidence                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Entitlement             | Applicable agreement, subscription decision, approved use scope, and licensing owner                        |
| Content source          | Red Hat service or approved repository identity, release, architecture, and trust verification              |
| Blueprint or definition | Versioned package and customization intent with no embedded credentials or environment data                 |
| Compose                 | Builder version, resolved repositories, logs, package manifest, time, and isolated execution identity       |
| Output artifact         | Format, size, checksum, signature or attestation when available, SBOM or package inventory, and scan result |
| Incus image             | Import method, fingerprint, effective metadata, visibility, aliases, and update policy                      |
| Instance                | Effective profiles, overrides, registration state, updates, data ownership, and workload acceptance         |

The RHEL image checksum and Incus fingerprint can differ because they identify
different representations. Preserve the mapping and never use an alias as the
only identity.

## Acquire or compose

Prefer an approved Red Hat-provided image or supported Red Hat image-building
workflow over an undocumented conversion. Red Hat's
[RHEL image builder documentation](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/composing_a_customized_rhel_system_image/index)
defines blueprints, composes, inputs, logs, and output formats for a specific
major release. It also documents creation of
[KVM guest images](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/composing_a_customized_rhel_system_image/creating-and-deploying-guest-images-wht-image-builder).
Select documentation matching the approved RHEL release rather than assuming
that a current example applies to an older release.

Before composition:

1. freeze the blueprint, repository set, package policy, builder, release, and
   architecture;
2. remove credentials, host identities, fixed network values, and environment
   topology from the image definition;
3. approve the mechanism for first-boot identity and configuration;
4. verify package signing and repository trust through the Red Hat-supported
   path;
5. decide whether the output may leave the build boundary or be mirrored; and
6. define retention for inputs, logs, output, and failed composes.

After composition, compare the package manifest and effective image properties
with the frozen definition. Scan for vulnerabilities, malware, embedded secrets,
unexpected accounts, trust roots, enabled services, and persistent identifiers.
A successful compose is not approval.

## Incus import and lab validation

Use the general [Incus image deployment](./incus-image-deployment.md) process.
Import the artifact into an isolated project, record the Incus fingerprint, and
create a disposable VM by fingerprint. Do not make the candidate public or
attach it to production networks.

RHEL and Incus subject-matter experts should jointly verify:

- firmware and boot behavior for the proposed host and instance type;
- expected CPU, memory, storage, NIC, time, entropy, and restart behavior;
- first-boot configuration without embedded long-lived credentials;
- registration, repository, update, and unregistration behavior under the
  approved subscription model;
- guest-agent or metadata behavior only where supported and intentionally used;
- package provenance, security policy, logging, and time synchronization;
- backup and isolated restore of representative guest and application state;
- cloning behavior, including removal or regeneration of unique identities;
- compatibility with the exact Incus release, profiles, drivers, and automation;
  and
- clean retirement, entitlement release, evidence retention, and artifact
  deletion.

Do not claim Red Hat support based on KVM compatibility or successful boot. The
support owner must document the answer for the exact combination.

## Promotion and deployment

Approve a specific output checksum and Incus fingerprint with an expiry and
evidence reference. If an alias is created, record its target and control every
move as a release change. Automatic refresh must not introduce unreviewed RHEL
content into an approved environment.

Create production VMs only from an approved fingerprint and reviewed effective
profile. At first boot, provision identity and configuration through the
authorized secret and configuration path. Confirm registration and subscription
use without writing protected values to logs or public evidence. Verify the
consumer outcome independently before promotion is complete.

## Update, recovery, and retirement

Choose whether instances are replaced from newly approved images, updated in
place through supported RHEL mechanisms, or use another reviewed lifecycle. A
new base image does not update existing mutable guests automatically. Test the
selected path with the exact release transition and preserve rollback or restore
criteria.

An image is a deployment source, not a backup of mutable workload data. Protect
guest and application state according to their consistency and recovery
objectives. Test recovery into an isolated target, including subscription and
identity handling, and verify the service outcome after restore.

At retirement, remove aliases and deployment eligibility, stop new use, handle
registered systems and subscription records through the approved process,
retain required build and approval evidence, sanitize protected copies, and
verify deletion across mirrors, caches, backups, and temporary work areas where
policy requires it. Do not delete material subject to an incident, legal hold,
or unresolved recovery need.

## Evidence and approval

Retain the licensing decision, exact terms reference, subscription scope,
source and trust verification, blueprint, compose identity and logs, package
inventory, artifact checksum, Incus fingerprint, scan and lab results, support
decision, approval, deployments, updates, restore test, and retirement outcome.
Keep accounts, entitlement details, repository endpoints, topology, findings,
and raw logs in the authorized evidence system.

Publication of any RHEL-derived artifact or detailed build material requires a
separate licensing and security review. Approval of this public page does not
approve an artifact for redistribution.
