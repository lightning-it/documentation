---
id: io-troubleshooting
title: Troubleshoot IO safely
description: Diagnose automation runtime problems with bounded, redacted evidence.
slug: /io/troubleshooting/
sidebar_position: 6
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation operators
    - support engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Troubleshoot IO safely

Start with the boundary that failed. Do not repeat a run until you know whether
the previous attempt changed a target.

## Triage sequence

1. **Protect:** stop dependent work, restrict diagnostics, and preserve the
   minimal classified record.
2. **Identify:** record the request, content, runtime, and policy versions
   without copying secrets or real target data into public channels.
3. **Locate:** decide whether failure occurred at request, authorization, input,
   execution, dependency, observation, or target-verification boundary.
4. **Compare:** check the observed state against the selected release's
   documented contract and a known-good, equivalent non-sensitive case.
5. **Verify impact:** determine whether any target-side state changed.
6. **Choose recovery:** let the authorized owner select retry, repair, rollback,
   restore, or forward recovery.
7. **Confirm:** independently verify the resulting target and runtime state.

## Symptom guide

| Symptom                                  | First boundary to inspect                                           | Safe evidence                                             |
| ---------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------- |
| Request rejected                         | Authentication, policy, content identity, or scope                  | Redacted decision code and policy version                 |
| Run never begins                         | Dependency readiness, capacity, or authorization lifetime           | Timestamped state transitions and health summary          |
| Run ends unexpectedly                    | Runtime resources, dependency loss, content error, or policy action | Redacted termination class and immutable content identity |
| Run reports success but outcome is wrong | Target verification and content assumptions                         | Independent observed-state check                          |
| Repeated run changes more state          | Content convergence, external drift, or mutable input               | Input schema version and redacted change summary          |
| Evidence is missing                      | Observation path, retention, access policy, or time source          | Evidence-policy version and collection health             |

## Escalation packet

Share only the product and release identity, UTC time window, boundary, redacted
error class, reproducibility, business impact class, and checks already
performed. Keep hostnames, addresses, customer names, tokens, inventories, raw
logs, and internal topology in the approved private support channel.

For the cross-product method, see
[Troubleshooting principles](../support/troubleshooting.md).
