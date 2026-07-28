---
id: atlas-architecture
title: Atlas conceptual architecture
description: Review conceptual signal-source, processing, access, and assurance boundaries.
slug: /atlas/architecture/
sidebar_position: 3
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - solution architects
    - observability engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Atlas conceptual architecture

This responsibility model is independent of implementation. A verified Atlas
release may combine or distribute the boundaries differently.

## Signal path

1. A **source boundary** defines who may emit observations and which context is
   allowed.
2. A **collection boundary** authenticates sources, validates shape and size,
   and identifies rejected or missing input.
3. A **processing boundary** performs approved normalization, enrichment,
   filtering, or aggregation while preserving provenance.
4. A **retention boundary** applies integrity, availability, classification,
   and lifecycle rules to stored observations where storage exists.
5. An **access boundary** authorizes query, visualization, export, and alert
   consumers according to purpose and data scope.
6. An **assurance boundary** measures the health, coverage, timing, and failure
   modes of the signal path itself.

## Architecture invariants

- Source identity and provenance remain distinguishable after processing.
- Context cannot silently introduce disallowed sensitive data or unbounded
  cardinality.
- Filtering and aggregation are versioned because they change interpretation.
- Access scope follows data classification and consumer purpose.
- Retention and deletion apply to derived copies and exports as well as primary
  storage.
- Time synchronization and delay are visible in every freshness decision.
- Signal-path failure cannot appear indistinguishable from a healthy service.

## Portfolio interactions

[ModuLix](../modulix/index.md), AIO, and
[Wunderbox](../wunderbox/index.md) may be observation sources or consumers of
operational context. The portfolio model does not require any specific signal
protocol, shared backend, or product dependency.

## Implementation record

Document concrete sources, components, versions, trust zones, interfaces,
schemas, throughput and capacity assumptions, classification, retention,
backup or recovery needs, failure behavior, owners, and quality verification in
the authorized environment record. Keep internal endpoints and real labels out
of public diagrams.

See the [portfolio architecture](../architecture/index.md) for cross-product
boundaries.
