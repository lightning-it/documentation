---
id: modulix-testing
title: Test ModuLix content
description: Apply layered validation to ModuLix content, compositions, and releases.
slug: /modulix/testing/
sidebar_position: 10
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - content maintainers
    - release reviewers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Test ModuLix content

Testing should provide evidence about a defined content version and target
class. A green check on a moving branch is not evidence for a different release
or environment.

## Validation layers

| Layer                  | Question                                                                     | Typical evidence                                          |
| ---------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------- |
| Source                 | Is the content structurally valid and free of obvious defects?               | Formatting, schema, lint, syntax, and secret-scan results |
| Unit                   | Do filters, plugins, or bounded logic behave at edge cases?                  | Repeatable unit-test results                              |
| Role scenario          | Does a role converge and remain stable on a declared target image?           | Create, apply, verify, second-apply, and cleanup results  |
| Composition            | Do roles and playbooks preserve their contracts when ordered together?       | Dependency and integration tests                          |
| Release                | Does the immutable artifact match its declared compatibility and provenance? | Artifact digest, matrix result, and release evidence      |
| Environment acceptance | Does the authorized target reach the intended observed state?                | Private, redacted acceptance record                       |

## Test properties, not labels

For each role or composition, test the properties its documentation claims:

- invalid input is rejected before a material change;
- the expected target scope is enforced;
- sensitive input is not printed or retained unexpectedly;
- failure stops dependent work safely;
- verification observes the intended state independently;
- a second run has the documented convergence behavior; and
- recovery behavior is understood for partial failure.

Use check mode only where the selected role documents and tests it. A check-mode
result cannot by itself demonstrate real execution or recovery.

## Keep fixtures public-safe

Fixtures and recorded output can leak as much as production logs. Use
documentation domains and RFC-reserved addresses, strip metadata, and scan
archives and generated reports before publication. Store real integration
evidence in its approved private evidence location.

## Review release evidence

The public component repositories publish their own required test profiles and
release records. Evaluate the exact selected release; do not infer results from
another collection or a later branch. Record unmet coverage as an explicit
decision, not as a silently passing test.

See [Lifecycle](./lifecycle.md) for upgrade qualification and
[Security](./security.md) for evidence handling.
