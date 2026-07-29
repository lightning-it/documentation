---
id: evidence-center-governance
title: Evidence schema, retention, and publication governance
description: Govern deterministic records, protected sources, supersession, tombstones, and retention.
slug: /evidence/governance/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - evidence owners
    - security reviewers
    - compliance reviewers
    - engineering contributors
  last_reviewed: "2026-07-29"
  review_cadence: annual
---

# Evidence schema, retention, and publication governance

## Generation contract

The generator validates every source record against the versioned JSON Schema
and controlled category, status, environment, owner, and retention registries.
It rejects unknown fields, protected field names, credential-like text,
unresolved supersession targets, cycles, unsafe tombstones, missing reason
categories, and incomplete approval timestamps.

Keys and records are canonically sorted. The generated catalog and manifest are
committed; `test:evidence-center` regenerates their expected bytes in memory and
fails when either output is stale. The manifest records every record-version
digest, the catalog digest, and a count for every status, including zero.

## Retention and removal

| Class                  | Public behavior                                                              |
| ---------------------- | ---------------------------------------------------------------------------- |
| `current-operational`  | Retain current state and enough explicit superseded history to interpret it. |
| `release-lifetime`     | Retain through supported life and the approved post-support period.          |
| `public-governance`    | Keep durable decisions and approvals; corrections append or supersede.       |
| `transient-validation` | Keep the summary while bulky CI artifacts may expire.                        |
| `incident-audit`       | Publish only an authorized safe disclosure; protected retention is separate. |

Expiry changes status rather than silently deleting a referenced record. Before
removal, the Evidence Owner checks inbound claim links, supported versions,
holds, supersession, and review dates. Deletion that would break a retained
relationship is rejected. A safe tombstone is required when the stable public
identity must remain.

## Protected review

Redaction is an independently reviewed transformation into the allowlisted
public schema, not denylist scrubbing of a raw artifact. The public repository
contains no protected source location. Approval identifies only the authorized
reviewer role, time, exact public record, and record digest.

## Rollback

The implementation is additive. Rollback removes the Evidence Center routes,
generator command, schema, registry, normalized record set, and generated
catalog/manifest together. Existing `evidence/` files retain their original
meaning and are not rewritten or deleted.
