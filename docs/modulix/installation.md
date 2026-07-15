---
id: modulix-installation
title: Install ModuLix content for evaluation
description: Install a pinned public ModuLix collection release into an isolated evaluation environment.
slug: /modulix/installation/
sidebar_position: 7
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation engineers
  last_reviewed: "2026-07-14"
  review_cadence: semiannual
---

# Install ModuLix content for evaluation

This procedure installs one public collection at an immutable source commit
into an isolated Ansible content path. It demonstrates direct-source pinning
and local inspection; it is not a production rollout, a resolved dependency
lock, or a complete ModuLix runtime installation.

## Prerequisites

- An isolated workstation or disposable development environment with
  `ansible-galaxy` and `ansible-doc` available.
- Network access to the verified public GitHub repository.
- A reviewed release selection and enough disk space for its dependencies.
- No production inventory, credential, Vault payload, or private repository in
  the working directory.

The example pins the commit behind the public `lit.rhel` `v1.21.0` release at
the last review of this page. A Git tag can be moved; the full commit identifier
is the reviewed input. Re-evaluate both the release and commit rather than
silently replacing either with a branch or newer tag.

## Create the requirement

Create `requirements.yml` in a new, non-sensitive directory:

```yaml
---
collections:
  - name: https://github.com/lightning-it/ansible-collection-rhel.git
    type: git
    version: eb1b78af1396bd53ea200828b37c20bc8480c1c5
```

Install into a local collection path:

```bash
ansible-galaxy collection install \
  --requirements-file requirements.yml \
  --collections-path ./collections \
  --no-deps
```

Do not add `--force` to conceal an unexpected pre-existing version. Stop and
inspect the local directory if Ansible reports a conflict.

`--no-deps` is deliberate: it prevents this inspection procedure from resolving
mutable dependency ranges. A production dependency set requires separate,
reviewed exact versions and integrity evidence for every transitive collection.

## Verify the installation

Point Ansible at the isolated path and list the resolved collection:

```bash
ANSIBLE_COLLECTIONS_PATH="${PWD}/collections" \
  ansible-galaxy collection list lit.rhel
```

Then inspect the public role used throughout this documentation:

```bash
ANSIBLE_COLLECTIONS_PATH="${PWD}/collections" \
  ansible-doc --type role lit.rhel.baseline
```

Verification succeeds only when the reported collection version is `1.21.0`
and the role documentation resolves from the expected path. Preserve the
requirements file and the full reviewed commit in evaluation evidence.

## Safe stop and cleanup

No target has been changed by these commands. If source, version, or dependency
resolution differs from the review, stop here and remove the isolated
directory. Do not proceed by weakening certificate checks or substituting a
private mirror whose provenance has not been approved.

Before any target execution, complete the [usage preflight](./usage.md) and the
selected release's own compatibility instructions.
