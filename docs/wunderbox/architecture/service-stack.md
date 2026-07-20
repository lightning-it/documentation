---
id: wunderbox-service-stack
title: Wunderbox service-stack evaluation contract
description: Evaluate service-stack ownership, dependencies, readiness, and recovery without implying a released or tested topology.
slug: /wunderbox/architecture/service-stack/
sidebar_position: 2
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - infrastructure architects
    - platform operators
    - service owners
  last_reviewed: "2026-07-15"
  review_cadence: annual
---

<!-- cspell:words Incus -->

# Wunderbox service-stack evaluation contract

This page is a conceptual, deployment-neutral model for a Wunderbox service
stack. It helps reviewers assign responsibilities and test failure paths
without disclosing or assuming an environment topology. A concrete release can
combine layers, use different components, or omit optional capabilities, but it
must preserve clear ownership and verification at each boundary.

## Implementation status

No immutable Wunderbox stack definition, component compatibility record, or
representative end-to-end test is pinned by this page. The model is therefore
an evaluation contract, not evidence that the described layers exist or work
together. Before publication as operational guidance, an SME must map every
required layer to released public interfaces or an approved controlled
implementation, record immutable versions, and retain consumer-level and
recovery test results. Until then, the semantic implementation gap remains
explicit and this page supplies no deployment commands.

## Scope and assumptions

The model applies when Wunderbox hosts system containers, virtual machines, or
other approved infrastructure workloads. Incus is used below as an example
runtime because it can manage containers and virtual machines; its presence is
not a Wunderbox product requirement. See the
[Incus runtime architecture](./incus-runtime.md) before selecting it.

The design assumes that every layer has an owner, immutable release identity,
supported version contract, health outcome, change process, and recovery
decision. No layer inherits those properties merely because the layer below it
is healthy.

## Responsibility stack

| Layer                 | Provides                                                                           | Consumes                                      | Acceptance question                                                              |
| --------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| Facility and hardware | Power, physical security, compute, memory, storage devices, and network attachment | Capacity and maintenance controls             | Can the service tolerate the documented failure and maintenance domains?         |
| Host operating system | Kernel, device access, local identities, packages, time, and boot lifecycle        | Hardware and trusted package sources          | Is the exact baseline supported, hardened, observable, and recoverable?          |
| Runtime management    | Instance lifecycle, API, policy objects, and runtime state                         | Host, identity, network, and storage services | Are management privilege, version compatibility, and failure behavior bounded?   |
| Platform resources    | Projects, profiles, images, networks, pools, and quotas                            | Runtime APIs and external dependencies        | Are effective configuration, ownership, isolation, and capacity visible?         |
| Instance              | Guest compute boundary and attached devices                                        | Image, profile, network, storage, and runtime | Does the exact instance satisfy boot, isolation, lifecycle, and recovery checks? |
| Hosted service        | Application function, data, and consumer interface                                 | Guest OS and application dependencies         | Does the consumer outcome meet its approved service contract?                    |
| Assurance             | Observation, backup, recovery, change, and security evidence                       | Signals and state from every layer            | Can absence, degradation, recovery, and evidence loss be distinguished?          |

The assurance layer is cross-cutting. Monitoring only the runtime daemon cannot
prove that a hosted service is usable, and an application health check cannot
prove that backup, management access, or capacity is safe.

## Management and workload paths

Model at least two paths:

- The **management path** carries privileged lifecycle actions, configuration,
  image promotion, evidence, and recovery control.
- The **workload path** carries consumer traffic and workload-to-dependency
  communication.

Document any deliberate crossing point, its authenticated identity, allowed
operation, data classification, timeout, retry behavior, and revocation owner.
Do not allow a workload identity to gain general runtime or host administration
through a convenience integration.

Where Incus is selected, its remote API uses HTTPS and requires separate
[authentication](https://linuxcontainers.org/incus/docs/main/authentication/)
and [authorization](https://linuxcontainers.org/incus/docs/main/authorization/)
decisions. Authentication alone does not restrict operations. Incus documents
that local `incus-admin` membership grants full API access; treat that access as
root-equivalent host trust, not ordinary application access. Membership only in
the separate `incus` group has a project-restricted model and must not be
described as administrative equivalence.

## Dependency record

For each concrete service stack, maintain a classified dependency record with:

- provider and consumer owners;
- immutable versions and compatibility evidence;
- management and data interfaces;
- identity, authorization, certificate, name, and time dependencies;
- data ownership, classification, retention, and consistency boundaries;
- steady-state and recovery capacity;
- timeout, retry, back-pressure, and partial-completion behavior;
- failure signals and consumer-visible effects; and
- restore order, independent verification, and retirement steps.

Keep addresses, inventories, accounts, certificates, and actual topology out of
the public record.

## Readiness and degraded operation

A stack is ready only when all required outcomes are true for the same review
window:

1. the intended immutable releases and effective configuration are present;
2. management access works for an approved identity and fails for a revoked or
   out-of-scope identity;
3. resource headroom covers the documented failure or maintenance condition;
4. storage and network dependencies satisfy both platform and workload checks;
5. the hosted service passes an independent consumer-level verification;
6. required observations are timely and absence is detectable; and
7. backup currency and a previously tested restore path meet the recovery
   contract.

When one condition fails, label the stack degraded even if other layers remain
green. Protect management access and data integrity, bound the affected failure
domain, pause unrelated change, and let the service owner select the documented
degraded mode.

## Verification scenarios

Platform, workload, security, and recovery subject-matter experts should test
the exact stack in a representative lab before approval. Include:

- cold start and orderly shutdown in documented dependency order;
- loss and return of one required dependency at a time;
- expired, revoked, and insufficiently privileged management identities;
- network isolation and name or time dependency failure;
- storage capacity and latency thresholds without destructive exhaustion;
- image or profile change followed by independent effective-state comparison;
- backup restoration into an isolated target; and
- retirement that removes access, observation, backup jobs, and automation
  targeting.

Use synthetic or approved test data. A lab result must identify material
differences from production and cannot by itself authorize production use.

## Recovery model

Define the smallest independently recoverable unit. Restoring a runtime database
without its corresponding storage, network, project, profile, or external
dependency state can produce an incomplete platform. Incus documents that its
[server state spans database and file-system entities](https://linuxcontainers.org/incus/docs/main/backup/),
with separate handling needed for external storage.

The recovery owner chooses whether to restore, rebuild from immutable sources,
repair, or fail forward. After any path, verify management authorization,
effective instance configuration, data integrity, dependency health, and the
original consumer outcome. Recovery is incomplete until temporary access and
resources are removed and evidence is retained under policy.

## Approval evidence

The public approval record may identify component releases, review roles,
decision, date, and an opaque evidence reference. Store detailed configurations,
capacity results, topology, failure observations, findings, and restore output
in the authorized system. Do not turn a classified architecture record into a
public example.
