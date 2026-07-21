---
id: modulix-collections
title: ModuLix collections
description: Identify the public Lightning IT Ansible collections and evaluate a version safely.
slug: /modulix/collections/
sidebar_position: 3
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation engineers
    - content maintainers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# ModuLix collections

An Ansible collection is a versioned distribution boundary. It gives roles and
plugins a fully qualified name and lets consumers pin a reviewed release.

## Public collections

The following repositories were verified as public at this page's review date.
The namespace and collection names come from each repository's `galaxy.yml`.

| Collection          | Public source                                                                                        | Documented scope                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `lit.foundational`  | [ansible-collection-foundational](https://github.com/lightning-it/ansible-collection-foundational)   | Foundational building blocks for infrastructure automation |
| `lit.rhel`          | [ansible-collection-rhel](https://github.com/lightning-it/ansible-collection-rhel)                   | Red Hat Enterprise Linux focused content                   |
| `lit.ubuntu`        | [ansible-collection-ubuntu](https://github.com/lightning-it/ansible-collection-ubuntu)               | Ubuntu focused content                                     |
| `lit.ocp`           | [ansible-collection-ocp](https://github.com/lightning-it/ansible-collection-ocp)                     | OpenShift Container Platform focused content               |
| `lit.supplementary` | [ansible-collection-supplementary](https://github.com/lightning-it/ansible-collection-supplementary) | Optional infrastructure services                           |

This table is an index, not a compatibility matrix. Open the selected
repository's release notes, testing documentation, and role documentation
before adopting it.

## Evaluate a collection release

Use the same decision record for every collection:

1. Select an immutable release tag or commit.
2. Confirm the source repository, namespace, and collection name.
3. Read release notes for breaking changes and deprecations.
4. Check supported controller and target versions in that release.
5. Review required external collections and Python or system dependencies.
6. Verify signatures, checksums, or provenance when the release provides them.
7. Test the exact artifact in a representative non-production environment.
8. Record the approved version and the reason for selecting it.

## Keep ownership close to code

Variables, defaults, platform matrices, and role-specific examples can change
with a collection. Their canonical documentation therefore stays in the public
component repository. This site owns the cross-collection concepts and safe
selection workflow.

See [Installation](./installation.md) for a pinned evaluation example and
[Lifecycle](./lifecycle.md) for upgrade and retirement decisions.
