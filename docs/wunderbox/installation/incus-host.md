---
id: wunderbox-incus-host
title: Incus host-preparation evaluation contract
description: Evaluate Incus host preparation without presenting an untested command recipe or approved Wunderbox integration.
slug: /wunderbox/installation/incus-host/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform engineers
    - infrastructure architects
    - security engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words Incus OpenFGA -->

# Incus host-preparation evaluation contract

This page defines a conceptual installation and acceptance contract, not a
production command recipe. Distribution packaging, kernel requirements,
runtime dependencies, and supported releases change. Use the selected Incus release's
[installation guidance](https://linuxcontainers.org/incus/docs/main/installing/)
and [requirements](https://linuxcontainers.org/incus/docs/main/requirements/)
to create an environment-specific runbook, then validate that runbook in a
disposable lab with platform and security subject-matter experts.

Installing Incus does not make it an approved Wunderbox runtime. Product-owner
approval of the exact architecture and support contract remains required.

## Implementation status

No immutable host build, Incus release, distribution package set, or
Wunderbox-specific acceptance run has been pinned for this review candidate.
The stages below are requirements for a future runbook, not tested installation
steps. A platform SME must close that semantic gap with a versioned
implementation and lab evidence; a security reviewer, recovery owner,
licensing owner, and product owner must approve it before operational use. No
command example is included because none has been validated for an identified
release and host combination.

## Installation boundaries

The host-preparation owner controls the host operating system and Incus package
lifecycle. Network, storage, identity, security, backup, and workload owners
must approve their respective interfaces. The runbook must not silently create
external network, storage, identity, or certificate resources outside its
authorization.

Keep production names, addresses, accounts, package mirrors, trust roots,
device identifiers, and recovery material in the classified runbook. Examples
on this page are intentionally conceptual.

## Preflight record

Do not make a host change until reviewers have recorded:

- the Wunderbox decision and the role this host will perform;
- exact host operating-system, kernel, Incus, package-origin, and firmware
  identities;
- vendor and product support status for the proposed combination;
- container, virtual-machine, or mixed workload intent;
- CPU virtualization, memory, storage, and network capacity including failure
  and recovery reserve;
- selected storage and network drivers with their external dependencies;
- management endpoint, authentication, authorization, certificate, name, and
  time ownership;
- project, profile, device, resource-limit, and image-governance baselines;
- patch, vulnerability, observation, backup, recovery, and retirement plans;
- maintenance window, consumer impact, safe-stop conditions, and decision
  owner; and
- a current recovery point for state placed at risk by the change.

Confirm requirements against the selected release rather than copying numeric
minimums from an earlier document. For virtual machines, verify the complete
firmware, QEMU, kernel, device, and hardware-virtualization path. For system
containers, verify namespace, control-group, security-module, ID-mapping, and
workload compatibility.

## Staged preparation

Build the environment-specific procedure around these stages. Every material
stage needs a read-only verification and an explicit stop decision before the
next stage.

### 1. Establish the host baseline

Apply the approved operating-system baseline, patch level, boot and firmware
policy, time source, name-resolution path, local access controls, logging, and
capacity reservations. Confirm that management access has an independent
recovery path before changing network or identity settings.

### 2. Acquire the release

Use only the approved package source for the selected distribution and release
track. Verify repository configuration, package signatures, resolved versions,
licenses, and vulnerability decisions through the organization's approved
trust process. Do not substitute an unreviewed third-party package because it
is newer or easier to install.

### 3. Initialize platform resources

Create only the reviewed storage, network, project, and profile baseline. Record
defaults as explicit decisions because later instances can inherit them. Do not
attach a real workload or import restricted images during host acceptance.

The [Incus storage model](https://linuxcontainers.org/incus/docs/main/explanation/storage/)
and [network model](https://linuxcontainers.org/incus/docs/main/explanation/networks/)
describe multiple drivers and resource types. Driver availability is not proof
that a driver fits the required failure domain, recovery objective, or support
contract.

### 4. Establish management access

Expose no remote management interface until authentication, authorization,
certificate lifecycle, network filtering, rate and failure behavior, and
revocation are approved. Incus documents that local `incus-admin` membership
grants full API access over the Unix socket; treat it as root-equivalent host
trust. Membership only in `incus` uses a project-restricted model and is not the
same authorization grant. Test both allowed and denied actions; a successful
login proves authentication, not authorization.

Use the exact release's [authentication](https://linuxcontainers.org/incus/docs/main/authentication/)
and [authorization](https://linuxcontainers.org/incus/docs/main/authorization/)
documentation. For remote access, decide explicitly whether TLS authorization,
OpenFGA, or a supported scriptlet provides the policy. Incus warns that OIDC
authentication without compatible authorization gives authenticated users full
access. Where an external authorization dependency such as OpenFGA is selected,
test its unavailable and inconsistent states before acceptance.

### 5. Add assurance controls

Add platform and consumer health observation, capacity thresholds, security
events, backup jobs, evidence routing, and update checks. Ensure that signal-path
failure cannot appear as healthy state. Protect observations and configuration
exports according to their classification.

### 6. Exercise lifecycle and recovery

Use a synthetic test instance built from an approved test image. Exercise
create, start, stop, restart, update, snapshot where applicable, backup, restore,
and deletion. Test restoration into an isolated target and verify the guest
outcome, not only the presence of a runtime record.

## Acceptance checks

The host is a review candidate only when evidence shows that:

1. actual versions and effective host settings match the approved record;
2. the package and image trust paths resolve to approved origins;
3. only intended management paths are reachable;
4. authorized, unauthorized, expired, and revoked identity cases behave as
   designed;
5. project, profile, device, network, storage, and quota defaults match policy;
6. synthetic container or VM behavior matches the declared workload type;
7. capacity and health signals remain useful during a bounded fault exercise;
8. host reboot and service restart preserve the intended configuration;
9. backup and isolated restore meet the recorded recovery objectives; and
10. the product owner, platform SME, security reviewer, and recovery owner sign
    the decision.

Do not approve based on package-install success or a single guest boot.

## Safe stop and recovery

Stop before further change if the observed release, trust path, host capability,
network, storage, identity scope, or backup state differs from the approved
preflight. Preserve evidence, prevent workload onboarding, and return the
decision to the named owner.

When the host contains no approved state, rebuilding from the immutable baseline
may be safer than attempting uncertain repair. Once state exists, use the tested
recovery contract. Incus documents that complete server protection can involve
its database, local files, external storage, and host ID-mapping files; see
[backing up an Incus server](https://linuxcontainers.org/incus/docs/main/backup/).
Never treat same-pool snapshots as the only independent recovery copy.

## Evidence to retain

Retain the approved input versions, package verification, effective baseline,
access-test matrix, synthetic lifecycle results, capacity observations, backup
and restore result, deviations, reviewers, decision, and UTC time. Detailed
host, identity, topology, and finding data belongs in the authorized evidence
system, not this public repository.
