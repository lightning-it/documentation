---
id: trust-governance
title: Evidence and document governance
description: Ownership, review, approval, evidence retention, and publication boundaries.
slug: /trust/governance/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience: [customers, compliance reviewers, engineering contributors]
  last_reviewed: "2026-07-29"
  review_cadence: annual
---

# Evidence and document governance

**Policy.** A document names its owner, authorized approver, classification,
version, lifecycle state, review date, and cadence. Metadata alone never proves
approval; approval binds an authorized decision to the exact document set and
digest.

**Documented process.** Public source, generated validation records, protected
approval, immutable release identity, and production acceptance remain
separate evidence layers. See the
[documentation pipeline](../documentation-governance/documentation-pipeline.md).

**Implemented public state.** The [Evidence Center](../evidence-center/index.md)
publishes allowlisted, deterministic records with retention, supersession,
tombstone, and withheld states. Missing, protected, stale, or unavailable
evidence remains explicit and never defaults to success. Issue
[#137](https://github.com/lightning-it/documentation/issues/137) records the
bounded implementation and its exact review evidence.
