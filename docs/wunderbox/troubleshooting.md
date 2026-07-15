---
id: wunderbox-troubleshooting
title: Troubleshoot Wunderbox safely
description: Isolate infrastructure platform failures without exposing topology or customer data.
slug: /wunderbox/troubleshooting/
sidebar_position: 6
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform operators
    - support engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Troubleshoot Wunderbox safely

Diagnose from consumer outcome toward shared dependencies. Avoid making several
unrelated changes at once; each change can hide the original failure and widen
the affected failure domain.

## Safe triage

1. Protect data integrity and preserve administrative access.
2. Freeze unrelated changes and record the UTC time window.
3. Identify affected consumers, services, and failure domains without copying
   real identifiers into public channels.
4. Compare consumer-facing health with resource, platform-service, dependency,
   and management-layer health.
5. Check recent approved changes and immutable artifact identities.
6. Determine whether recovery objectives or capacity thresholds are at risk.
7. Apply one reversible, authorized diagnostic or recovery action at a time.
8. Verify both platform state and consumer outcome after the action.

## Symptom guide

| Symptom                            | Inspect first                                                                         | Avoid assuming                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| One consumer is degraded           | Consumer configuration, quota, and local dependency                                   | The shared platform is healthy or unhealthy as a whole |
| Several consumers fail together    | Shared service, resource pool, network path, or failure domain                        | Each workload has an independent fault                 |
| Intermittent latency               | Saturation, contention, retries, dependency timing, or observation gaps               | Average utilization proves adequate headroom           |
| Change cannot complete             | Capacity during transition, artifact identity, dependency readiness, or authorization | Retrying is harmless                                   |
| Backup succeeds but restore fails  | Recovery-unit selection, integrity, keys, dependencies, and verification              | A successful job status proves recoverability          |
| Management works but service fails | Consumer path and service-level outcome                                               | Administrative reachability proves service health      |

## Escalation packet

Provide the product and release identities, symptom and impact class, UTC time
window, affected abstract failure domain, redacted health summary, recent
approved change identity, and checks performed. Keep topology, addresses,
tenant or customer names, credentials, raw configuration, and full logs in the
approved private support system.

Use the cross-product [troubleshooting method](../support/troubleshooting.md) for
ownership and closure.
