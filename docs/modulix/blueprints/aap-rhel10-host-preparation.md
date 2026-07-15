---
id: modulix-blueprint-aap-rhel10-host-preparation
title: Assess a RHEL 10 host for Ansible Automation Platform
description: Assess a RHEL 10 host only after pinning an AAP release, deployment model, topology, and current vendor support evidence.
slug: /modulix/blueprints/aap-rhel10-host-preparation/
sidebar_position: 3
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform engineers
    - automation operators
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

# Assess a RHEL 10 host for Ansible Automation Platform

This conceptual blueprint defines the evidence needed to assess a Red Hat
Enterprise Linux 10 host for an Ansible Automation Platform component. It is
not an installation guide or a host-preparation implementation. Support depends
on the exact AAP release, deployment model, topology, component, architecture,
and RHEL minor release.

Confirm the selected platform release, component role, architecture, operating
system minor release, and lifecycle combination in the current vendor support
matrix before provisioning. A generic host baseline cannot override those
requirements.

## Support snapshot and implementation status

The AAP 2.7 documentation illustrates why the deployment model must be part of
the decision. Its general and containerized system-requirement records do not
express one universal host baseline: RHEL 10 appears in the containerized
requirements, while the general requirements retain RHEL 9.6 constraints for
other platform components and paths. This is a dated review input, not a
promise about every component, topology, or future erratum. Preserve a reviewed
copy or opaque evidence reference for the exact documentation used at approval
time.

No deployment model, topology, component role, RHEL 10 minor release, public
host-automation commit, or completed acceptance result is pinned here. The
semantic implementation gap remains until those inputs are selected, a
versioned host definition is tested, and platform, RHEL, security, recovery,
subscription, licensing, and product owners approve the result. Accordingly,
the preparation sequence below is an assessment checklist and contains no
commands.

## Inputs and prerequisites

Approve these inputs as one host-preparation record:

| Input                   | Required decision                                                       |
| ----------------------- | ----------------------------------------------------------------------- |
| Component role          | Exact purpose, topology position, and whether co-location is supported  |
| Operating-system source | Approved image or repository snapshot and integrity evidence            |
| Resource profile        | Reviewed CPU, memory, storage, and growth assumptions                   |
| Network contract        | Required names, routes, ports, proxies, and denied paths                |
| Time and name services  | Redundant sources and failure behavior                                  |
| Trust stores            | Approved operating-system and application certificate authorities       |
| Installation identity   | Least-privilege bootstrap access, owner, and revocation point           |
| Storage and recovery    | Filesystem layout, backup scope, restore objective, and recovery owner  |
| Baseline exception      | Time-bounded exception owner and compensating control, if one is needed |

Keep addresses, names, account identifiers, entitlement details, and recovery
locations in the private deployment record.

## Assessment sequence

1. Provision the host from the approved immutable operating-system input on an
   isolated or restricted network.
2. Verify image integrity, firmware and boot policy where applicable, platform
   identity, and the expected operating-system release before enrollment.
3. Attach only the approved package and entitlement sources. Disable
   unintended fallback repositories and record the effective source snapshot.
4. Apply the reviewed RHEL 10 baseline for authentication, privilege,
   cryptography, audit, logging, time, name resolution, host firewall, and
   mandatory access control. Record exceptions instead of disabling controls
   to make an installer proceed.
5. Create the supported storage layout with monitored capacity and the
   permissions required by the selected platform component.
6. Install the approved trust roots and verify service identities from the
   host. Do not bypass certificate validation during preparation.
7. Configure monitoring and log forwarding with redaction and retention
   appropriate to the component's data.
8. Apply current approved updates, restart when required, and capture the final
   package and kernel identities.
9. Remove bootstrap access that is not required after handoff, then transfer
   control to the platform installation owner.

Do not pre-create application users, directories, packages, or firewall rules
that conflict with the supported installer. When vendor requirements and the
baseline disagree, stop for an explicit design decision.

## Acceptance verification

Verify the prepared host independently before installing the platform:

- The release and architecture match the approved support decision.
- Effective package sources, updates, time, DNS, routes, and certificate trust
  match the host contract.
- Resource and filesystem capacity meet the reviewed profile with growth
  headroom.
- The baseline scan has no unexplained failure or silently disabled control.
- Required connectivity succeeds and representative unapproved egress is
  denied.
- Logs and monitoring detect a synthetic host event without publishing private
  host details.
- Backup coverage includes the state selected by the component owner, and a
  restore exercise has demonstrated the documented recovery method.

A successful network connection or installer preflight alone is not host
acceptance.

## Recovery, evidence, and limitations

Before application data exists, rebuilding from the approved image and host
record is usually clearer than repairing an unknown baseline. After platform
installation, follow the component's supported backup and recovery method;
restoring a virtual-machine snapshot may not produce a consistent distributed
service.

Retain the operating-system and repository identities, support decision,
baseline result and exceptions, package inventory, trust-root versions,
network verification, recovery-test reference, approvals, and handoff. Store
environment-specific values privately.

This review-candidate blueprint has not been validated against a named AAP
deployment. Reconcile it with vendor installation and upgrade documentation
during deployment review. See
[Backup and recovery](../../security/backup-and-recovery.md) for the
site-wide recovery approach.

## Primary references

- [AAP 2.7 system requirements](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.7/ref_system_requirements)
- [AAP 2.7 containerized system requirements](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.7/install-ref_cont_aap_system_requirements)
