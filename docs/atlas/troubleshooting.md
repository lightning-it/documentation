---
id: atlas-troubleshooting
title: Troubleshoot Atlas safely
description: Diagnose missing, delayed, duplicated, or misleading observations across the signal path.
slug: /atlas/troubleshooting/
sidebar_position: 6
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - observability operators
    - support engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Troubleshoot Atlas safely

Follow one known observation through the signal path. Use sanitized synthetic
data where possible, and never put a secret or real customer identifier into a
diagnostic signal.

## Triage sequence

1. Record the UTC observation window and expected source scope.
2. Confirm whether the source produced the observation and with which time.
3. Check source authentication, validation, rate, and rejection behavior.
4. Follow processing versions, filters, enrichment, aggregation, and queues.
5. Check retention and access boundaries, including tenant or purpose scope.
6. Compare end-to-end freshness and completeness with the decision threshold.
7. Verify the signal-path health observation itself.
8. Apply one reversible correction, then repeat the end-to-end check.

## Symptom guide

| Symptom                           | Likely boundaries                                                          | Disambiguating check                                         |
| --------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| No observation                    | Source, collection, filtering, retention, or access                        | Trace one sanitized known event from source to consumer      |
| Observation is late               | Source clock, buffering, back pressure, processing, or query window        | Compare source time, receive time, and access time           |
| Duplicate observation             | Source retry, transport retry, processing, or consumer query               | Compare provenance and stable event identity where available |
| Value looks wrong                 | Source instrumentation, units, processing version, aggregation, or context | Inspect the unaggregated sanitized path and schema version   |
| Only one consumer cannot see data | Access scope, query, visualization, or cached view                         | Compare authorization and equivalent raw result safely       |
| Alert did not arrive              | Source coverage, evaluation, suppression, routing, or recipient ownership  | Test the full route with an approved synthetic event         |

## Safe stop

Stop before deleting data, widening access, disabling validation, bypassing
authentication, or changing retention to make a symptom disappear. Those
actions can destroy evidence or create disclosure.

Escalate with product and release identities, redacted source class, UTC window,
processing version, symptom, impact, and checks performed. Keep raw queries,
labels, endpoints, customer data, and full exports in the approved private
support system.

See the cross-product [troubleshooting method](../support/troubleshooting.md).
