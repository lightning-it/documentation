---
id: trust-releases
title: Release and maintenance
description: Release promotion, artifact identity, lifecycle, and maintenance boundaries.
slug: /trust/releases/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience: [customers, operators, engineering contributors]
  last_reviewed: "2026-07-29"
  review_cadence: annual
---

# Release and maintenance

**Documented process — docs.l-it.io.** A production candidate is built once,
identified by commit and digest, approved, and promoted without rebuilding.
Production acceptance and rollback bind to that identity. See
[CI/CD and Cloudflare deployment](../architecture/cicd-cloudflare-deployment.md).

Evidence records and lifecycle snapshots can intentionally name older commits:
their immutable subject is the event they observed, not the identity of every
later release candidate that carries the historical record. The current
candidate identity is authoritative only in its exact preview evidence,
release manifest, provenance attestation, deployment marker, and production
acceptance record. Historical identities are never silently rewritten to look
current.

**Objective evidence — docs.l-it.io release `c612fe6378857a6eb47be3a6acfa01b123533f58`.**
The public [deployment marker](https://docs.l-it.io/deployment-commit.json) identifies the deployed
commit. The Release Owner verified production and a controlled rollback on
2026-07-28. Scope is this documentation site only.

Supported product versions and maintenance commitments remain product-specific;
absence of a published commitment is not an implied support promise.
