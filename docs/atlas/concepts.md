---
id: atlas-concepts
title: Atlas concepts
description: Use a deployment-neutral vocabulary for signals, context, quality, and observation.
slug: /atlas/concepts/
sidebar_position: 2
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - service owners
    - platform engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Atlas concepts

These terms are conceptual and do not imply that Atlas implements a particular
signal type, schema, backend, or query interface.

| Term               | Meaning in this documentation                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| Signal             | A time-related observation emitted or derived from an approved source                                   |
| Source             | The system, service, process, or probe responsible for an original observation                          |
| Context            | Metadata needed to interpret a signal, such as service identity, version, or abstract environment class |
| Signal path        | The collection, transport, processing, storage, and access steps between source and consumer            |
| Freshness          | The difference between when an event occurred and when it is available for a decision                   |
| Completeness       | The extent to which expected observations are present for a defined scope and window                    |
| Integrity          | Confidence that a signal and its context were not altered outside the authorized path                   |
| Observation window | The explicit period and aggregation needed to interpret a result                                        |
| Service objective  | A reviewed statement of the outcome and measurement conditions used for an operational decision         |

Signals may represent numerical measurements, state changes, records, or
request paths. These are examples of observability data, not a claim about
formats supported by a specific Atlas release.

## Context needs governance

Context makes observations useful, but labels and attributes can disclose
customer identities, internal topology, software versions, or security state.
Define an allowed schema, cardinality limits, ownership, classification, and
retention before accepting new context.

## Absence is ambiguous

No observation may mean no event occurred, the source was unavailable, the
signal path failed, filtering removed the data, time was misaligned, or access
policy hid the result. Health decisions should therefore include a way to
observe the observation path itself.

## Quality is scoped

Freshness, completeness, accuracy, and retention are meaningful only for a
named source, scope, and time window. Avoid general statements such as “all
systems are monitored” without an inventory and verified coverage record.

Continue with [Architecture](./architecture.md) and
[Operations](./operations.md).
