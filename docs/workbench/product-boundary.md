---
id: workbench-product-boundary
title: Product boundary
description: Distinguish Workbench from product peers, the ModuLix foundation, and concrete implementations.
slug: /workbench/product-boundary/
sidebar_position: 2
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - engineering and platform owners
    - delivery teams
    - customers and technical reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Product boundary

Workbench owns the bounded environment and practices used to develop,
integrate, test, and validate changes. It does not automatically own the
runtime, infrastructure, observability, governance, or reusable content
consumed during that work.

| Area                           | Responsibility boundary                                              |
| ------------------------------ | -------------------------------------------------------------------- |
| ModuLix                        | Reusable engineering and automation content foundation               |
| AIO                            | Controlled execution and orchestration of operational automation     |
| Wunderbox                      | Infrastructure platform and hosting boundary                         |
| Workbench                      | Engineering, development, integration, test, and validation          |
| Atlas                          | Observability and operational-signal boundary                        |
| Platform Governance & Evidence | Controls, evidence relationships, findings, and bounded verification |

These relationships do not imply that the products are bundled or that a
particular integration is supported.

A named workstation, host, repository, laboratory, or customer environment is
an implementation of a defined scope. Its technology, state, validation, and
acceptance must not be generalized into a product-family claim.
