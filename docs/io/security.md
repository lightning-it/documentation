---
id: io-security
title: IO security
description: Protect automation runtime identities, secrets, targets, and execution evidence.
slug: /io/security/
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
    - automation operators
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# IO security

An automation runtime bridges source, identity, secrets, networks, and managed
targets. Its security review must cover the complete run path rather than only
the execution process.

## Security objectives

- Only authenticated, authorized requests enter execution.
- The executed content and dependencies match the reviewed immutable identity.
- Inputs cannot silently expand target or privilege scope.
- Secrets are resolved just in time, exposed only to the bounded workload, and
  excluded from durable metadata and logs.
- Runtime credentials and network access expire when no longer needed.
- Workloads are isolated in proportion to their risk and data classification.
- Runtime status and target acceptance remain distinguishable.
- Evidence is integrity-protected, access-controlled, redacted, and retained
  only as required.

## Threat questions

Review how an implementation handles request forgery, replay, content
substitution, dependency compromise, malicious inputs, confused-deputy
authorization, secret exfiltration, cross-run data leakage, unbounded target
selection, denial of service, log injection, and evidence tampering.

## Least privilege

Separate requester, approver, runtime, observer, and evidence-reader
responsibilities where the risk requires it. A human's broad platform access
should not become the default runtime identity. Scope credentials to the
operation and target, and prefer short lifetimes over reusable static values.

## Incident boundary

If identity, content integrity, or secret confidentiality is in doubt, stop new
execution according to the incident procedure, preserve authorized evidence,
and rotate or revoke affected credentials. Do not publish raw diagnostics or
internal endpoints while seeking support.

This page is a review model, not an assurance statement about a particular IO
release. See the site-wide [security overview](../security/index.md) and
[compliance mapping](../compliance/bsi-mapping.md).
