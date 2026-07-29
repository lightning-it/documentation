---
id: trust-build-integrity
title: Build integrity
description: Reproducible build and immutable artifact identity statements.
slug: /trust/build-integrity/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience: [customers, engineering contributors, security reviewers]
  last_reviewed: "2026-07-28"
  review_cadence: semiannual
---

# Build integrity

**Current implementation — docs.l-it.io.** Release validation compares clean
build outputs, records exact manifests and digests, attests the release
artifact, and deploys that artifact without rebuilding. The public
[deployment architecture](../architecture/cicd-cloudflare-deployment.md)
defines the boundary.

Reproducibility means matching output under the recorded build contract; it
does not imply bit-for-bit portability across unspecified tools or
environments. Artifact provenance establishes origin and subject identity, not
the absence of defects.
