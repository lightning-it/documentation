---
id: contributing-documentation
title: Contribute documentation
description: Propose public technical documentation with classification, metadata, testing, and review.
slug: /contributing/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation contributors
    - component maintainers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Contribute documentation

Contributions should make one public technical outcome easier to understand or
perform without duplicating component code documentation or exposing protected
information.

## Choose the canonical owner

- Portfolio concepts and cross-product architecture, security, compliance,
  lifecycle, reference, and public support guidance belong in
  [this repository](https://github.com/lightning-it/documentation).
- Role variables, command flags, build instructions, compatibility, and code
  behavior belong beside the public component source.
- Customer procedures, environment topology, credentials, run evidence, risk
  decisions, and internal operations do not belong in either public location.

## Contribution workflow

1. Read the nearest repository and directory instructions.
2. Classify every source and asset by filename and content before reuse.
3. Confirm a canonical page does not already own the topic.
4. Write for a named audience with explicit scope, prerequisites, assumptions,
   safe stops, verification, recovery, and related documents as applicable.
5. Use stable metadata: identifier, title, description, status, version, public
   classification, owner, approver role, audience, review date, and cadence.
6. Use only verified public links and documentation-only examples.
7. Update navigation, redirects, migration records, and tests in the same change
   where applicable.
8. Run the repository-defined formatting, content, link, build, search,
   accessibility, and secret checks.
9. Review the complete rendered diff in light and dark modes and at narrow and
   wide viewports.
10. Submit a pull request; the author does not approve their own change.

## Writing requirements

Use clear headings, define acronyms on first use, identify assumptions, and
distinguish conceptual guidance from verified implementation. Commands must be
accurate, bounded, and testable. Operational procedures need authorization,
preflight, destructive warnings, safe-stop points, verification, recovery, and
evidence handling proportionate to risk.

Meet Web Content Accessibility Guidelines (WCAG) 2.2 AA where reasonably
applicable: semantic structure, logical headings, meaningful link text, table
headers, useful alt text, keyboard operation, visible focus, contrast, and no
meaning conveyed by color alone.

## Document control and quality

Treat metadata, classification, review, publication, maintenance, and
retirement as one lifecycle. A new or materially changed page remains
`review-candidate` and `pending` until authorized reviewers approve the exact
documentation-tree digest. A date, successful build, automated review, or pull
request author cannot supply that approval.

Keep one canonical owner for each subject, record redirects only for verified
published paths, and re-run review after a substantive content, ownership,
classification, or assurance change. CI must fail on invalid metadata, broken
internal links or images, duplicate identifiers, unsafe examples, secret
indicators, unsupported licenses, inaccessible rendered HTML, missing search
content, and a non-reproducible release build. These checks support human
review; they do not assert implementation, certification, or acceptance.

## Never publish

Do not publish secrets, customer or environment data, real infrastructure
identifiers, private source locations, internal diagrams, raw logs, screenshots
with protected context, recovery credentials, escalation paths, findings,
accepted risks, audit evidence, or unresolved material. When uncertain, stop
and treat the content as private.

See the [publication boundary](../security/publication-boundary.md) and
[support routing](../support/index.md).
