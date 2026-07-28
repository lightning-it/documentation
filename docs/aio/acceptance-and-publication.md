---
id: aio-acceptance-publication
title: Acceptance and publication
description: Define the evidence needed to accept an AIO scope and publish bounded product claims.
slug: /aio/acceptance-and-publication/
sidebar_position: 4
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - product and delivery owners
    - documentation reviewers
    - customers and technical reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Acceptance and publication

Acceptance is generation- and scope-specific. The AIO brand or the presence of
automation content does not prove that a particular capability, target,
integration, or operating result has been delivered.

## Delivery acceptance

A concrete AIO delivery needs an explicit record of:

1. product generation and version;
2. target environment and included automation scope;
3. prerequisites, responsibilities, and exclusions;
4. supported systems and interfaces;
5. security, authorization, credential, and evidence handling;
6. tests, expected results, and acceptance criteria;
7. documentation, handover, support, and lifecycle terms; and
8. observed results, limitations, findings, and authorized acceptance.

Missing evidence remains a gap. Acceptance applies only to the agreed scope and
does not establish blanket compatibility, compliance, security, or future
performance.

## Public documentation acceptance

Publication is a separate decision from delivery acceptance. An AIO page under
`docs.l-it.io` is accepted only after:

- each material claim is traced to an authority approved for that publication
  context;
- protected customer, operational, infrastructure, and commercial information
  is excluded;
- the exact documentation-tree digest receives role-authorized approval;
- the reviewed revision passes repository, preview, accessibility, search,
  link, and security checks;
- the protected merge and deployment complete; and
- the public route is verified against the accepted commit.

The canonical product authority, **LIT-PRD-60-AIO version 14**, authorizes the
`https://docs.l-it.io/aio/` route family and the initial
`https://docs.l-it.io/aio/overview/` route. This source authorization does not
replace exact-tree approval evidence or any production control required before
publication.
