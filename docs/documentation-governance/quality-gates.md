---
id: ihr-quality-gates
title: IHR lifecycle quality gates
description: Phase-aware validation requirements for installation readiness, completion, handover, and acceptance.
slug: /documentation-governance/ihr-quality-gates/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience: [delivery engineers, reviewers]
  last_reviewed: "2026-07-22"
  review_cadence: annual
---

# IHR lifecycle quality gates

`ready-for-installation` requires assessed platform prerequisites,
product-specific flows, immutable inputs, complete planned commands, secret
contracts, recovery, evidence planning, and auditable installation authority.
Post-installation results may remain empty.

`technically-completed` additionally requires actual commands, full automation
and collection SHAs, full execution-environment digests, actual product and OS
versions, recaps, critical verification, idempotency, and documented
plan-to-actual deviations.

`customer-ready` requires owned open items, operational boundaries, and
handover artifacts. `handed-over` requires completed transfers. `accepted`
requires an acceptance decision, customer role, reference, and residual items
for conditional acceptance. Secret findings fail every gate.
