---
id: aio-overview
title: AIO overview
description: Understand the approved public purpose, product boundary, and generation model of AIO.
slug: /aio/overview/
sidebar_position: 1
document:
  status: review-candidate
  approval_status: pending
  version: "0.1"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform and operations teams
    - automation owners
    - customers and technical reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# AIO overview

**AIO — Automated Intelligent Operator** is the Lightning IT automation and
operations platform for controlled execution and orchestration of recurring
operational automation. Its conceptual verb is **Run**.

AIO is one of the
[five sellable products](../architecture/product-taxonomy-decision.md).
ModuLix is the reusable engineering and automation-content foundation that AIO
can consume; it is not a sixth product and does not own runtime operation.

## Approved public outcomes

AIO is intended to make defined operational automation:

- discoverable;
- controllable;
- repeatable; and
- auditable.

The public product claim is bounded to controlled execution and orchestration
of defined, recurring automation. It does not imply support for a particular
technology, integration, environment, hosting model, service level, or
commercial package.

## Product generations

The AIO brand remains stable while each generation has its own scope,
architecture, tests, evidence, acceptance, support, and lifecycle.

| Generation            | Public status            | Boundary                                                                 |
| --------------------- | ------------------------ | ------------------------------------------------------------------------ |
| AIO 2.0               | Definition / Development | Strategic generation; no unapproved function is a contractual capability |
| AIO Satellite Edition | Legacy / Maintenance     | Separately scoped existing generation; commitments remain contract-bound |

Capabilities or commitments from AIO Satellite Edition do not become AIO 2.0
claims. Likewise, the strategic direction of AIO 2.0 does not change an
existing Satellite Edition contract.

Continue with the [product boundary](./product-boundary.md), the
[generation model](./generation-model.md), and
[acceptance and publication](./acceptance-and-publication.md).

## Provenance and lifecycle

This review candidate was independently re-authored in English from the
approved public AIO summary and claim boundaries in the canonical product
authority. That authority currently approves the source claims for the
Lightning IT website but does not yet confirm an AIO URL under `docs.l-it.io`.
The document therefore remains pending and cannot be represented as approved
production documentation until the exact revision and route are authorized.
