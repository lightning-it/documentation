---
id: product-taxonomy-decision
title: Product taxonomy decision
description: Define the five sellable products and the separate ModuLix foundation role.
slug: /architecture/product-taxonomy-decision/
sidebar_position: 4
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - product owners
    - documentation contributors
    - architecture reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Product taxonomy decision

## Decision

The public portfolio contains five sellable products:

1. AIO;
2. Wunderbox;
3. Workbench;
4. Atlas; and
5. Platform Governance & Evidence.

ModuLix is the shared technical engineering and automation foundation. It is
not a sixth sellable product. The five products remain independently
presentable; using the shared foundation does not make one product a child of
another.

This decision supersedes the four-peer-product statements accepted in the
architecture package through Issue
[#38](https://github.com/lightning-it/documentation/issues/38). The accountable
maintainer selected this taxonomy explicitly in Issue
[#147](https://github.com/lightning-it/documentation/issues/147). This document
does not add or verify product capabilities.

## Migration consequences

Issue [#135](https://github.com/lightning-it/documentation/issues/135) owns the
atomic portfolio migration:

- establish one canonical namespace, entry, and owner for each sellable
  product;
- present ModuLix as a foundation rather than as a sellable peer;
- assign existing IO content to its approved canonical destination or retire it
  with one-hop redirects;
- preserve published routes until redirect and rollback evidence is reviewed;
  and
- validate navigation, search, links, accessibility, claims, and metadata.

Until #135 is merged, existing ModuLix and IO pages, product data, home-page and
getting-started copy, navigation, and related public surfaces are transitional
implementation state and must not be treated as the approved portfolio model.

Issue [#115](https://github.com/lightning-it/documentation/issues/115) owns the
Platform Governance & Evidence product documentation. It may proceed against
this taxonomy but does not absorb the complete #135 migration.

## Decision boundaries

Product positions, conceptual verbs, capabilities, dependencies, and marketing
claims require their own approved public authority. A name in this taxonomy is
not evidence that a route, capability, deployment, or production publication
exists.

Issue [#2](https://github.com/lightning-it/documentation/issues/2) remains the
exact-document approval gate. Issue
[#40](https://github.com/lightning-it/documentation/issues/40) remains the
production acceptance gate.
