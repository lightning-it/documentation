---
id: publication-boundary
title: Public documentation boundary
description: Classify documentation before publication and sanitize only content that can be reviewed safely.
slug: /security/publication-boundary/
sidebar_position: 2
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - documentation contributors
    - security reviewers
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Public documentation boundary

This repository is public. Classify both filename and content before reuse, and
treat uncertainty as private.

## Classification outcomes

| Classification              | Public action                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `PUBLIC`                    | May be proposed after ordinary technical and licensing review                      |
| `PUBLIC_AFTER_SANITIZATION` | May be re-authored or transformed only after independent sanitization review       |
| `PRIVATE_INTERNAL`          | Do not publish                                                                     |
| `PRIVATE_CUSTOMER`          | Do not publish                                                                     |
| `SECRET_OR_CREDENTIAL`      | Do not publish; follow the approved secret-handling process                        |
| `OBSOLETE`                  | Do not migrate as current documentation                                            |
| `DUPLICATE`                 | Consolidate into one public canonical topic only when the canonical source is safe |
| `UNRESOLVED`                | Treat as private until resolved                                                    |

## Inspect more than prose

Review paths, front matter, examples, code blocks, links, diagrams, screenshots,
archives, generated files, hidden files, image metadata, and history. Search for
credentials, customer data, real domains and addresses, internal systems,
inventory values, topology, private source locations, recovery material,
support contacts, findings, accepted risks, and audit or test evidence.

Encryption or redaction markup does not automatically make a source public.
An encrypted secret payload, reversible token, blurred screenshot, or hidden
document property can still disclose protected information.

## Safe examples

Use only explicit documentation values such as:

- `example.com` and `host01.example.com`;
- `customer-example`;
- `192.0.2.10`, `198.51.100.10`, or `203.0.113.10`; and
- `2001:db8::10`.

Do not invent realistic-looking Lightning IT hosts, accounts, endpoints, email
addresses, or credentials.

## Sanitization review

Record the original classification and checksum in the protected migration
record, transform only the meaning that is safe and still useful, scan the
result again, validate links and examples, and obtain a reviewer independent of
the transformation. The public repository receives only the sanitized output
and a safe aggregate provenance statement—not protected filenames or findings.

See the [migration summary](../reference/migration-summary.md) for the aggregate
initial-corpus disposition.
