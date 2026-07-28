---
id: platform-governance-evidence-lifecycle
title: Governance and evidence lifecycle
description: Relate requirements, controls, checks, evidence, findings, reviews, and improvement without overstating assurance.
slug: /platform-governance-evidence/governance-evidence-lifecycle/
sidebar_position: 3
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - control and evidence owners
    - security and compliance reviewers
    - delivery and operations teams
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Governance and evidence lifecycle

The lifecycle keeps the relationship between a requirement, its interpretation,
the selected control, the performed check, and the resulting evidence explicit.
Documentation is one governed output of this model, not a substitute for
implementation or verification.

## Lifecycle

1. **Define the target and scope.** Identify what is being assessed, why, by
   whom, and within which boundaries.
2. **Select and define controls.** Translate applicable requirements into
   control objectives, owners, check methods, and acceptance criteria.
3. **Implement and document.** Record the bounded technical or organizational
   implementation and its version without treating documentation as proof.
4. **Perform checks.** Use the agreed method and preserve the time, target,
   result, and responsible identity.
5. **Relate evidence.** Link attributable, current evidence to the precise
   control and claim it supports.
6. **Record findings and deviations.** Keep missing, failed, unavailable,
   expired, or withheld evidence visible. Document residual risk only through
   the authorized risk process.
7. **Review and decide.** Evaluate scope, checks, evidence, limitations, and
   findings before a bounded acceptance decision.
8. **Improve and reassess.** Track corrective work and repeat checks when the
   target, requirement, implementation, evidence, or review period changes.

## Evidence quality

Evidence is useful only when its source, target, time, version, owner,
classification, integrity, and relationship to the claim are understood.
Presence alone does not prove completeness or effectiveness. Superseded,
expired, revoked, failed, or unavailable evidence never becomes implicit
success.

Public summaries may state that suitable evidence exists only when publication
is explicitly authorized. Customer-specific and protected evidence remains in
its approved system and is never copied into this public documentation.

## Findings and improvement

A finding records the difference between the expected and observed state for a
defined scope. It needs an owner, severity or priority under the governing
method, disposition, due or review trigger, and traceable closure evidence.

Closing an implementation task does not automatically close the finding.
Review verifies the correction and any remaining limitation. Repeated
assessment can reveal drift, changed requirements, newly missing evidence, or a
control that no longer fits the target.

See [Deliverables and acceptance](./deliverables-and-acceptance.md) for the
bounded completion model.
