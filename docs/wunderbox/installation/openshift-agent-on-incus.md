---
id: wunderbox-openshift-agent-incus
title: Evaluate OpenShift Agent-based installation on Incus
description: Evaluate OpenShift Agent-based installation on Incus virtual machines in a disposable lab without implying production or vendor support.
slug: /wunderbox/installation/openshift-agent-on-incus/
sidebar_position: 2
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - OpenShift platform engineers
    - infrastructure architects
    - security engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words Incus openshift RHCOS rendezvous -->

# Evaluate OpenShift Agent-based installation on Incus

This is a **lab evaluation plan**, not a production installation procedure or a
support statement. It considers whether Incus virtual machines can provide the
machine behavior required by a selected OpenShift Container Platform
Agent-based installation. It does not claim that Red Hat certifies or supports
Incus as an OpenShift platform, that the combination is part of Wunderbox, or
that a successful lab installation is production-ready.

Use virtual machines for this hypothesis. Do not substitute Incus system or
application containers for OpenShift nodes. The Agent-based Installer produces
bootable media for machines, while Incus containers share host facilities and
have a different isolation and boot model.

## Implementation status

OpenShift Container Platform 4.21 is the documentation snapshot used to frame
this draft; it is not a deployment approval. Its installation matrix lists the
Agent-based Installer for bare-metal and `none` platform choices, but that fact
does not identify Incus as a certified or supported infrastructure platform.
The exact platform choice and all associated requirements must be reviewed
against the selected release and subscription.

No immutable Wunderbox Incus VM definition, OpenShift installation wrapper, or
completed compatibility test is referenced here. This is the central semantic
implementation gap. Close it with a versioned lab implementation, the exact
OpenShift and Incus artifacts, representative results, and written OpenShift,
virtualization, security, recovery, licensing, and product-owner decisions. No
commands are included because no such implementation has been validated and
published as a safe example.

## Approval gates

Before generating media or creating a VM, the evaluation owner must obtain:

- the exact OpenShift release, architecture, installer, client, and release
  image identities;
- a written decision on Red Hat support, certification, subscription, and
  entitlement implications for the proposed infrastructure;
- the exact Incus, host operating-system, QEMU, firmware, storage, and network
  versions;
- confirmation that only non-production data and identities will be used;
- a disposable failure domain with no route to production management systems;
- approved handling for the pull secret, SSH key, certificates, and generated
  installation assets;
- a resource, addressing, DNS, time, load-balancing, and egress or mirroring
  design for the selected topology; and
- platform-SME, OpenShift-SME, security, network, and licensing review owners.

Red Hat's [installation overview](https://docs.redhat.com/en/documentation/openshift_container_platform/4.21/html/installation_overview/ocp-installation-overview)
maps installation methods to supported platforms for a specific OpenShift
release. Review that matrix, including the requirements attached to a `none`
platform choice, and the actual subscription terms. Do not interpret the
generic ability to boot an ISO as a support commitment.

## Evaluation boundaries

| Boundary           | Evaluation decision                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| OpenShift release  | Pin the installer, release image, client, RHCOS content, and documentation to one approved release                     |
| Incus host         | Prove required CPU virtualization, memory, storage, network, firmware, and failure behavior                            |
| VM definition      | Version CPU, memory, disk, firmware, NIC, boot order, and metadata as immutable test intent                            |
| Installation media | Protect generated media and configuration because they can contain credentials and cluster-specific data               |
| Network services   | Validate DNS, time, addressing, API and ingress paths, load balancing, MTU, and any mirror or proxy path               |
| Cluster lifecycle  | Define installation observation, update eligibility, backup, restore, teardown, and evidence retention before starting |

If the Incus host is itself virtualized, nested virtualization adds another
support, performance, and failure boundary. Test it explicitly and record it as
a material difference; do not generalize results to a physical host.

## Lab sequence

Create an environment-specific, peer-reviewed runbook from the selected
OpenShift release's
[Agent-based Installer documentation](https://docs.redhat.com/en/documentation/openshift_container_platform/4.21/html-single/installing_an_on-premise_cluster_with_the_agent-based_installer/index).
This public page deliberately contains no commands or live configuration.

### 1. Freeze the test definition

Record the installation topology, machine roles, exact resources, address and
name contracts, network ranges, rendezvous decision, storage behavior, and
success criteria. Check overlaps and required reachability without publishing
actual values. Define how every generated secret and artifact will be stored and
destroyed.

### 2. Validate the Incus VM substrate

Before using OpenShift media, boot an approved synthetic VM with the proposed
firmware, disk, and network profile. Prove stable CPU exposure, clock behavior,
disk persistence and latency, NIC identity, MTU, reboot behavior, console access,
and cleanup. Test a bounded host or dependency fault and verify that it produces
an observable failure rather than silent corruption.

### 3. Generate and protect installation assets

Generate assets only with the pinned installer on an approved workstation.
Validate configuration against the selected release, record checksums, restrict
access, and prevent assets or logs from entering public source control. Review
the generated media's expiry and rotation implications before use.

### 4. Create and boot the test machines

Create VMs from the reviewed definitions, attach the generated media through
the approved mechanism, and boot only after DNS, time, network, and load-balancer
preflight succeeds. Record the effective VM configuration and resolved media
checksum. Do not make manual one-off changes that cannot be reproduced.

### 5. Observe installation by boundaries

Observe machine discovery, rendezvous progress, control-plane formation, node
admission, operator state, API reachability, and ingress outcome using the
selected release documentation. Preserve the first failing boundary before
changing a variable. Do not publish raw logs, addresses, certificates, pull
secrets, or generated manifests.

### 6. Verify, exercise, and tear down

If installation completes, verify node and operator health, storage and network
behavior, restart behavior, certificate and identity handling, consumer access,
and the declared failure scenarios. A completed installer workflow is not the
only acceptance check.

Destroy the disposable cluster after evidence collection unless a separate
time-bounded retention approval exists. Revoke test access, delete generated
assets and temporary routes according to policy, and verify that automation and
monitoring no longer target the lab.

## Failure and recovery

Set safe-stop conditions before the test. Stop when resolved versions differ,
support status is unclear, a protected value reaches an unauthorized location,
network scope exceeds the lab, VM behavior is unstable, or data integrity is
uncertain.

For a failed disposable installation, preserve classified diagnostic evidence
and recreate from the frozen definition after correcting one reviewed
hypothesis. Avoid repeatedly repairing an unknown partial state. Installation
media is not a backup, and an Incus snapshot does not replace an OpenShift
backup and recovery design. Any retained cluster needs the selected OpenShift
release's supported backup, recovery, update, and lifecycle procedures.

## Acceptance evidence

Record exact release and artifact identities, support and licensing decisions,
reviewed VM definitions, checksums, effective resources, sanitized scenario
results, bounded failure behavior, deviations, teardown verification, reviewers,
and the decision. Evidence must identify differences between the lab and any
proposed production environment.

An outcome may be **technically demonstrated but not approved**. Production use
requires an explicit product architecture, support, security, recovery, and
licensing decision beyond this evaluation.

## Primary references

- [OpenShift installation overview](https://docs.redhat.com/en/documentation/openshift_container_platform/4.21/html/installation_overview/ocp-installation-overview)
- [OpenShift Agent-based Installer](https://docs.redhat.com/en/documentation/openshift_container_platform/4.21/html-single/installing_an_on-premise_cluster_with_the_agent-based_installer/index)
- [Incus virtual-machine and container model](https://linuxcontainers.org/incus/docs/main/explanation/instances/)
- [Incus requirements](https://linuxcontainers.org/incus/docs/main/requirements/)
