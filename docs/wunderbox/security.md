---
id: wunderbox-security
title: Wunderbox security
description: Review infrastructure platform trust zones, management access, isolation, and artifact provenance.
slug: /wunderbox/security/
sidebar_position: 5
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - security engineers
    - platform operators
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Wunderbox security

An infrastructure platform is both a shared trust anchor and a high-impact
management target. Review the concrete implementation against these objectives.

## Security objectives

- Administrative interfaces and identities are separated from ordinary
  workload access.
- Operators receive only the privilege and lifetime required for their task.
- Workloads cannot cross assigned identity, network, resource, or data
  boundaries without an explicit service contract.
- Deployed images, packages, configuration, and automation resolve to reviewed
  immutable sources with available provenance.
- Sensitive configuration and secrets are not embedded in images, inventories,
  logs, or public documentation.
- Security logging is protected from tenant modification and has an explicit
  retention owner.
- Backup and recovery paths protect confidentiality and integrity as well as
  availability.
- Updates and retirement remove obsolete credentials, access paths, and data.

## Review areas

### Management boundary

Identify every administrative path, its authentication strength, authorization
model, network reach, session evidence, emergency-access governance, and
revocation behavior. Protected details remain private.

### Workload isolation

Document which mechanisms separate consumers, what resources remain shared,
how noisy-neighbor and denial-of-service risks are bounded, and what events can
affect more than one failure domain. Verify isolation; do not infer it from
product terminology.

### Supply chain

Pin source and artifact versions, verify release evidence, scan dependencies,
restrict build and deployment credentials, and rebuild through an approved
path. Repository visibility or an image tag alone does not establish integrity.

### Data lifecycle

Classify platform and consumer data, encrypt where required, control snapshots
and exports, test restoration, enforce retention, and sanitize media or remote
storage at retirement.

This is a review framework, not a claim that an unspecified Wunderbox release
implements every control. See the site-wide [security overview](../security/index.md).
