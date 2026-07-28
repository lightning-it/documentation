---
id: wunderbox-overview
title: Wunderbox overview
description: Understand Wunderbox as the Infrastructure Platform product in the Lightning IT portfolio.
slug: /wunderbox/overview/
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
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Wunderbox overview

Wunderbox is the **Infrastructure Platform** product in the Lightning IT
portfolio. Its conceptual verb is **Host**: Wunderbox is the product boundary
for infrastructure capabilities on which approved workloads can be placed.

Wunderbox is one of the
[five sellable products](../architecture/product-taxonomy-decision.md).
[ModuLix](../modulix/index.md) is the reusable engineering and automation
content foundation, not a sixth product. AIO may execute approved automation,
[Atlas](../atlas/index.md) may observe a deployment, Workbench may develop and
validate changes, and Platform Governance & Evidence may verify controls and
evidence. These responsibility boundaries do not imply a bundle, supported
integration, or commercial commitment.

## Public documentation scope

The first public edition provides:

- a neutral vocabulary for platform capacity, services, and consumers;
- a conceptual architecture and responsibility model;
- operating checks for readiness, change, backup, recovery, and retirement;
- security review questions for management and workload boundaries; and
- a troubleshooting flow based on symptoms and safe evidence.

It does not claim a mandatory hypervisor, orchestration layer, storage system,
network design, installation interface, or availability level. Exact supported
components and procedures require a verified Wunderbox release contract.

## Related public component sources

The public organization contains component repositories with Wunder-specific
purposes, including a
[Wunderbox vSphere image source](https://github.com/lightning-it/packer-wunderbox-vpshere)
and public execution/tooling container sources for
[automation](https://github.com/lightning-it/container-ee-wunder-ansible-ubi9),
[development tools](https://github.com/lightning-it/container-ee-wunder-devtools-ubi9),
and an [operations toolbox](https://github.com/lightning-it/container-ee-wunder-toolbox-ubi9).
Those repositories document their own artifacts. Their presence does not make
them mandatory components of every Wunderbox deployment.

## Provenance and lifecycle

This document is bounded by the canonical product authority,
**LIT-PRD-70-Wunderbox version 14**. That authority approves the
`https://docs.l-it.io/wunderbox/` route family and the initial
`https://docs.l-it.io/wunderbox/overview/` route. Review is required annually
and after any material scope, claim, taxonomy, delivery-boundary, or route
change.

## Continue

- [Concepts](./concepts.md)
- [Architecture](./architecture.md)
- [Operations](./operations.md)
- [Security](./security.md)
- [Troubleshooting](./troubleshooting.md)
