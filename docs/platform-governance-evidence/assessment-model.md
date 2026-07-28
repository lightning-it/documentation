---
id: platform-governance-evidence-assessment-model
title: Assessment model
description: Define assessment targets, scope, responsibilities, controls, and evidence expectations.
slug: /platform-governance-evidence/assessment-model/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - product and system owners
    - security and compliance owners
    - delivery teams
    - technical reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Assessment model

An assessment is a bounded evaluation of a named target against an agreed
scope, control set, check method, and evidence expectation. It does not turn an
entire product, organization, or environment into an implicitly assessed
object.

## Assessment targets

| Target type           | Bounded subject                                      | Typical review outcome                                  |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| Product               | a named product and version                          | traceable product-quality and security statements       |
| System or instance    | a specific installation or environment               | assessment of the named system within the agreed scope  |
| Project or delivery   | a defined installation, architecture, or delivery    | handover, findings, evidence, and acceptance record     |
| Continuous validation | a named target over an agreed recurring review cycle | updated findings and evidence for the defined time span |

These target types can use the same governance and control model. Reuse does not
make results interchangeable: a product assessment does not prove the state of
a customer instance, and an instance assessment does not automatically apply to
every deployment.

## Scope contract

Before checks begin, record:

1. the target identity and version or assessment period;
2. the intended outcome and audience;
3. included and excluded components, locations, and lifecycle phases;
4. accountable product, system, control, evidence, review, and acceptance
   roles;
5. applicable controls and the authority used to select them;
6. check methods, expected evidence, and evaluation criteria;
7. known assumptions, dependencies, and limitations; and
8. review, handover, retention, and reassessment triggers.

Missing scope is not evidence of broad applicability. An unresolved
applicability decision remains visible rather than defaulting to “not
applicable” or “implemented.”

## Responsibility model

The assessment owner coordinates the bounded evaluation. Control owners define
and maintain control intent. Evidence owners provide attributable records under
the applicable access and retention rules. Reviewers evaluate the stated
relationship between a control, check, and evidence. Only the authorized
acceptance role decides whether the agreed deliverable is accepted.

One person may hold more than one role only where the governing policy permits
it and records the resulting review arrangement.

Continue with the
[governance and evidence lifecycle](./governance-evidence-lifecycle.md).
