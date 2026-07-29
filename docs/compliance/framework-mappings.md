---
id: framework-mappings
title: Framework mappings
description: Inspect the governed public framework registry, assessment states, mapping denominator, and exact publication digest.
slug: /compliance/framework-mappings/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - compliance owners
    - security reviewers
    - customers
  last_reviewed: "2026-07-29"
  review_cadence: semiannual
---

# Framework mappings

<!-- cspell:words SLSA Sigstore toto -->

The public mapping set registers supported framework families and preserves
their assessment state. Registration is not applicability, implementation,
conformity, certification, or control-effectiveness evidence.

## Current mapping set

| Property                      | Value                                |
| ----------------------------- | ------------------------------------ |
| Mapping set                   | `lightning-it-public-compliance@1.0` |
| Frameworks registered         | 14                                   |
| Requirement denominator       | 1                                    |
| Mapping denominator           | 1                                    |
| Current implementation status | 1 Not Assessed                       |
| Current applicability         | 1 Applicability Unknown              |
| Success percentage            | Not calculated                       |
| Next review                   | 2027-01-29                           |

The exact generated data is available as the
[mapping catalog](https://docs.l-it.io/compliance/catalog.json) and
[mapping manifest](https://docs.l-it.io/compliance/manifest.json). The manifest binds the catalog
digest and keeps every applicability and implementation-status denominator
visible. Not Applicable and Not Assessed records are never counted as
successes.

## Registered framework families

- BSI IT-Grundschutz and BSI Standards 200-1 through 200-4;
- CIS Benchmarks;
- OpenSSF Best Practices and OpenSSF Scorecard;
- SLSA, SPDX, CycloneDX, in-toto, and Sigstore; and
- NIST Secure Software Development Framework.

All are currently registered as **Not Assessed**. Framework requirements are
added only after authority/version review; licensed or normative text is linked
rather than copied.

## Evidence and claim boundary

Mapping evidence is joined by immutable Evidence Center record reference and a
controlled relation. An Implemented statement is rejected unless its exact
scope has current admissible supporting evidence. Unavailable, withheld,
failed, expired, or revoked evidence cannot establish implementation.

The migrated BSI record retains only public documentation context. Applicability
and target-object decisions remain in an authorized protected assessment.
Review the [BSI mapping approach](./bsi-mapping.md) for the current navigation
guidance and the
[compliance mapping model](../architecture/compliance-mapping-model.md) for the
governance contract.
