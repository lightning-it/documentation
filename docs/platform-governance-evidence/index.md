---
id: platform-governance-evidence-overview
title: Platform Governance & Evidence overview
description: Understand the public purpose, scope, audiences, and assurance boundaries of Platform Governance & Evidence.
slug: /platform-governance-evidence/overview/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - product and system owners
    - security and compliance owners
    - platform and delivery teams
    - customers and technical reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

<!-- cspell:words ESOF -->

# Platform Governance & Evidence overview

Platform Governance & Evidence is the Lightning IT governance, compliance, and
evidence platform. Its conceptual verb is **Verify**. It connects scope,
controls, technical implementation, documentation, tests, and evidence into a
delivery and operating chain whose stated results can be reviewed over time.

It is one of the
[five sellable products](../architecture/product-taxonomy-decision.md).
ModuLix is the shared technical engineering and automation foundation, not a
sixth product.

## Intended outcomes

Platform Governance & Evidence provides a common model in which:

- requirements become verifiable controls;
- claims are supported by identified evidence rather than self-declaration;
- deviations and residual risks remain traceable;
- a defined control can be checked repeatedly; and
- scope, implementation, documentation, tests, findings, and evidence retain
  explicit relationships.

The platform can apply the same governance and control model to different
[assessment targets](./assessment-model.md). The target and scope change; the
meaning of a control or evidence relationship does not silently broaden.

## Target audiences

The public model is intended for:

- product and system owners;
- security, compliance, and information security management owners;
- platform, operations, project, and delivery teams;
- customers, auditors, and technical decision makers; and
- managed-service teams working within an explicitly agreed scope.

## Responsibility boundary

The product structures governance and review. It does not replace the
accountable owner who defines scope, decides applicability, accepts a
deliverable, or handles a risk through an authorized process. Evidence supports
a bounded claim; it does not make every broader claim true.

Platform Governance & Evidence does not promise blanket certification,
compliance, conformity, audit success, or absolute security. Acceptance applies
only to the agreed scope, artifacts, controls, checks, and evidence.

## Public documentation scope

This review candidate explains:

- [assessment targets, scope, and responsibility](./assessment-model.md);
- [controls, documentation, evidence, findings, review, and improvement](./governance-evidence-lifecycle.md);
- [bounded deliverables and acceptance](./deliverables-and-acceptance.md); and
- [public/private and assurance boundaries](./security-and-publication-boundary.md).

It does not publish customer records, original protected evidence, internal
infrastructure, private source locations, commercial terms, service levels,
technology commitments, or a product-specific production URL.

## Historical terminology

LCP, ESOF, and PGF are historical or source terms. They are not additional
products and do not define separate public product promises.

## Provenance and lifecycle

This content was independently re-authored in English from an approved public
product authority on 2026-07-28 and reviewed against the repository publication
boundary. It remains `review-candidate` and `pending` until exact-digest,
role-authorized approval is recorded. Git is the change-history source. Review
is required annually and whenever the product authority, taxonomy, claim
boundary, or public route changes.
