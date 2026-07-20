---
id: releases-overview
title: Releases and lifecycle
description: Distinguish documentation, component, product, and deployment versions and evidence.
slug: /releases/
sidebar_position: 1
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - release reviewers
    - platform owners
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Releases and lifecycle

Version identities answer different questions. Keep them separate so a source
change, released artifact, supported product combination, deployed instance,
and documentation revision do not become one ambiguous “version.”

## Version layers

| Layer                 | Identifies                                                                             | Evidence owner                |
| --------------------- | -------------------------------------------------------------------------------------- | ----------------------------- |
| Source revision       | An immutable repository state                                                          | Public component repository   |
| Component release     | A published artifact and its release notes, provenance, tests, and compatibility       | Component release record      |
| Product release       | A verified set of product-owned components and public support contract, when published | Product owner                 |
| Deployment version    | The exact approved component and configuration identities in one environment           | Authorized environment record |
| Documentation version | The reviewed revision and status of a page or site release                             | Documentation repository      |

Code presence does not prove release, deployment, support, or runtime
implementation. A component release does not prove a product combination, and
this page's document version does not version product software.

## Select and promote a release

1. Resolve the public source and immutable release identity.
2. Review release notes, dependencies, compatibility, security changes,
   deprecations, licenses, and release evidence.
3. Verify provenance and artifact identity when available.
4. Test the exact artifact and intended version combination.
5. Update architecture, security, operations, backup, recovery, observation,
   and retirement documentation where affected.
6. Approve and promote through the environment's controlled stages.
7. Independently verify the deployed outcome and retain classified evidence.

## Public component release pages

- [ModuLix automation releases](https://github.com/lightning-it/modulix-automation/releases)
- [ModuLix launcher releases](https://github.com/lightning-it/modulix-launcher/releases)
- [Foundational collection releases](https://github.com/lightning-it/ansible-collection-foundational/releases)
- [RHEL collection releases](https://github.com/lightning-it/ansible-collection-rhel/releases)
- [Ubuntu collection releases](https://github.com/lightning-it/ansible-collection-ubuntu/releases)
- [OpenShift collection releases](https://github.com/lightning-it/ansible-collection-ocp/releases)
- [Supplementary collection releases](https://github.com/lightning-it/ansible-collection-supplementary/releases)

The lists are discovery points, not a statement that the latest release is
approved for a deployment.

## Documentation lifecycle

Pages are maintained, deprecated, or retired based on verified public behavior.
Review after a relevant release, architecture or security change, incident,
standard update, or at the metadata cadence. Preserve redirects only for stable
previously published paths, avoid redirect chains, and never retain obsolete
claims merely for link continuity.

See the [ModuLix lifecycle](../modulix/lifecycle.md) for automation-content
decisions.
