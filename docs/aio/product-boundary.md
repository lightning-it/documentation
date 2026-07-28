---
id: aio-product-boundary
title: Product boundary
description: Separate AIO runtime operation from reusable content, hosting, observability, governance, and customer scope.
slug: /aio/product-boundary/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
  version: "0.1"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - product and platform owners
    - automation and operations teams
    - technical reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Product boundary

AIO owns the controlled execution and orchestration concern for defined
operational automation. It does not absorb the responsibilities of the
foundation or of the other Lightning IT products.

## Portfolio relationships

| Concern                         | Owner or role                         | Boundary                                                         |
| ------------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| Reusable automation content     | ModuLix foundation                    | Builds tested, versioned technical content; does not run it      |
| Automation execution            | AIO                                   | Runs and orchestrates defined automation within an agreed scope  |
| Infrastructure platform         | Wunderbox                             | May provide suitable hosting; no hosting model is implied        |
| Engineering and test workspace  | Workbench                             | Supports engineering and testing; does not own runtime operation |
| Observability                   | Atlas                                 | Observes agreed systems and execution; does not execute AIO work |
| Governance and evidence         | Platform Governance & Evidence        | Defines bounded verification; does not replace product ownership |
| Customer configuration and data | Protected customer or operational use | Never becomes reusable public product content                    |

These relationships describe responsibility boundaries, not a promise that
every product, integration, or deployment is included in an AIO delivery.

## Public claim boundary

Public documentation may describe:

- the stable AIO brand and its long name;
- controlled execution of recurring operational automation;
- orchestration of defined automation workflows;
- discoverable, controllable, repeatable, and auditable automation; and
- separately governed product generations and scopes.

It must not infer:

- technologies, supported targets, integrations, or compatibility;
- credentials, authorization, tenancy, hosting, or deployment models;
- migration between generations;
- support dates, lifecycle commitments, prices, licenses, or service levels;
- customer environments, internal infrastructure, private evidence, or
  secrets; or
- certification, blanket compliance, audit success, or absolute security.

Technical availability is not a commercial commitment. A capability exists for
a delivery only when its generation, scope, prerequisites, tests, evidence, and
acceptance criteria are explicitly agreed.
