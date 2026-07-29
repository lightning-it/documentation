---
id: trust-quality
title: Quality and testing
description: Quality gates, testing scope, and limitations.
slug: /trust/quality/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience: [customers, engineering contributors]
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Quality and testing

**Policy.** Claims and documentation must be accurate, attributable, scoped,
current, usable, and safe to publish. The canonical requirements are the
[quality standard](../documentation-governance/quality-standard.md).

**Current implementation — docs.l-it.io.** Pull requests run formatting,
content, metadata, link, accessibility, security, license, build, and browser
checks configured in the public repository. A passing run applies only to its
exact commit and recorded environment.

**Known limitation.** Passing automated checks is not proof of defect-free
content, control effectiveness, or suitability for a customer environment.
