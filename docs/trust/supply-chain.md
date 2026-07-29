---
id: trust-supply-chain
title: Dependency and supply chain
description: Dependency governance, SBOM, provenance, and signing boundaries.
slug: /trust/supply-chain/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience: [customers, security reviewers, engineering contributors]
  last_reviewed: "2026-07-28"
  review_cadence: semiannual
---

<!-- cspell:words SLSA -->

# Dependency and supply chain

**Current implementation — docs.l-it.io.** Release validation creates
reproducible CycloneDX inventories, checks repository and dependency licenses,
and binds provenance attestations to immutable release artifacts. Evidence is
valid only for the named workflow run, commit, and digest.

**Planned improvement.** Portfolio-wide dependency, Renovate, signing, and SBOM
coverage will be reported only after every product has an evidence-linked
record. Owner: Supply-chain Owner.

No claim of SLSA level, continuous monitoring, or complete vulnerability
absence is made.
