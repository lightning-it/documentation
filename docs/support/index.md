---
id: support-overview
title: Support
description: Route public documentation and product questions without disclosing protected information.
slug: /support/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation readers
    - support engineers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Support

Public support starts by identifying the owning boundary and preparing a
minimal, sanitized problem statement. Customer-specific operations and internal
escalation remain in their approved private channels.

## Route the question

| Question                                                            | Public route                                                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Incorrect, unclear, inaccessible, or broken public documentation    | [Documentation issue](https://github.com/lightning-it/documentation/issues)                      |
| Reproducible defect in a public component                           | The issue tracker of the verified [public source repository](../reference/public-sources.md)     |
| Security vulnerability                                              | Follow the security-reporting policy in the owning public repository; do not open a public issue |
| Deployment, customer, credential, incident, or environment question | Use the authorized private support route for that environment                                    |

Do not move a protected question into a public issue merely because a public
component is involved.

## Public issue contents

Include the public repository and immutable version, documentation URL when
relevant, expected and observed behavior, a minimal sanitized reproduction,
UTC time only when needed, and checks already performed. Use
`host01.example.com`, `192.0.2.10`, and other permitted documentation values.

Exclude customer or company identifiers, real hosts or addresses, credentials,
inventories, internal source locations, topology, raw logs, screenshots,
support contacts, findings, risk decisions, recovery material, and audit or test
evidence.

## Before requesting support

1. Confirm the owning product or component and immutable version.
2. Check its release notes, support contract, and known public documentation.
3. Follow the [troubleshooting method](./troubleshooting.md) without destructive
   changes.
4. Decide whether the problem or evidence is safe for a public channel.
5. If uncertain, treat it as private.
