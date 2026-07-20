---
id: atlas-overview
title: Atlas overview
description: Understand Atlas as the Observability Platform product in the Lightning IT portfolio.
slug: /atlas/overview/
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
    - service owners
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Atlas overview

Atlas is the **Observability Platform** product in the Lightning IT portfolio.
Its conceptual verb is **Observe**: Atlas is the product boundary for turning
approved operational signals into service and platform insight.

Atlas is a peer of [ModuLix](../modulix/index.md), [IO](../io/index.md), and
[Wunderbox](../wunderbox/index.md). Those products may emit or consume
operational context, but Atlas is not their parent and they are not Atlas
subcomponents.

## Public documentation scope

The initial public Atlas documentation defines:

- signal, context, ownership, and quality concepts;
- a conceptual path from source to authorized observation;
- operating checks for collection quality, capacity, retention, and alerts;
- security handling for potentially sensitive telemetry; and
- a troubleshooting flow for missing, delayed, or misleading observations.

It does not assert a collector, protocol, storage engine, query language,
dashboard technology, alert manager, retention duration, deployment topology,
or supported integration. Those details require an implementation-specific,
verified public release contract.

## What observability can and cannot prove

An observation is evidence from a defined source, time window, and processing
path. It can support a decision only when its provenance, freshness,
completeness, and interpretation are understood. A dashboard status does not by
itself prove service health, security-control effectiveness, or compliance.

## Continue

- [Concepts](./concepts.md) defines the public vocabulary.
- [Architecture](./architecture.md) describes conceptual signal boundaries.
- [Operations](./operations.md) covers quality and service readiness.
- [Security](./security.md) covers telemetry sensitivity and access.
- [Troubleshooting](./troubleshooting.md) covers signal-path diagnosis.
