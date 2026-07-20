---
id: modulix-disconnected-runtime
title: Disconnected ModuLix runtime base contract
description: Define the ModuLix content and execution-runtime boundary without conflating it with an automation-platform installation.
slug: /modulix/installation/disconnected-runtime/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation architects
    - platform operators
    - security engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

# Disconnected ModuLix runtime base contract

A disconnected runtime executes reviewed automation without resolving content
from the public internet at run time. This page defines the information and
evidence a deployment plan must provide. It is not an installation recipe or a
claim that a particular transfer path is approved.

This is the **base ModuLix contract**. It covers the ModuLix delivery artifact,
configured execution environment, collections, transitive runtime dependencies,
and bounded target execution. It does not install or operate Red Hat Ansible
Automation Platform. When AAP is part of the design, apply the separate
[disconnected AAP overlay](../blueprints/aap-disconnected-runtime.md), which
adds vendor bundles, platform nodes, subscriptions, repositories, internal
services, and deployment-model requirements.

## Public implementation status

The public implementation reference examined for this draft is
[ModuLix Automation v1.28.0](https://github.com/lightning-it/modulix-automation/releases/tag/v1.28.0)
at commit
[`0a66195b288837a5c686089bc9e27c29ca89e085`](https://github.com/lightning-it/modulix-automation/tree/0a66195b288837a5c686089bc9e27c29ca89e085).
Its immutable
[README](https://github.com/lightning-it/modulix-automation/blob/0a66195b288837a5c686089bc9e27c29ca89e085/README.md)
identifies the `modulix-automation-runtime` RPM as the delivery artifact, a
toolbox wrapper plus execution environment as the default runtime, and
`scripts/ansible-nav` as the public runtime interface identifier.

The release's exact public mode selector is
`ANSIBLE_TOOLBOX_RUNTIME_MODE=disconnected`. In v1.28.0 it changes only three
defaults: it enables execution-environment preload, disables Red Hat collection
retrieval, and disables automatic collection installation. It does **not**
enforce outbound-network denial, select a closed artifact set, or change
`ANSIBLE_TOOLBOX_PULL_POLICY` from its `missing` default. An absent toolbox or
execution image can therefore still trigger a pull.

An accepted disconnected run must preload both images by reviewed digest, set
every applicable wrapper and navigator pull policy to `never` (including
`ANSIBLE_TOOLBOX_PULL_POLICY=never` and
`ANSIBLE_TOOLBOX_NAV_PULL_POLICY=never`), and enforce or independently observe
the approved egress boundary. The mode name alone is not offline evidence.

The release contains AAP-specific preparation, staging, and offline-transfer
helpers under its AAP runbooks. Those helpers belong to the separate AAP
overlay and do not establish an accepted transfer harness or reproducible
disconnected result for this base runtime. A semantic implementation gap
therefore remains. Pin the actual release and artifact digests, test this base
contract in the intended boundary, and obtain SME, product, security, recovery,
and licensing approval. No invocation example is included because an immutable
interface name alone is not evidence that its complete dependency set has been
validated offline.

## Public boundary

Public documentation may describe artifact types, integrity checks, and the
review sequence. Keep repository credentials, mirror locations, firewall
rules, signing keys, target inventories, exception findings, and transfer
records in the authorized private system.

Use documentation names such as `registry.example.com` and
`host01.example.com` in public examples. A real disconnected boundary must be
defined and approved privately before content crosses it.

## Input and output contract

| Contract part        | Required input                                                                      | Expected output                                                              |
| -------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Content set          | Exact collection, execution-image, package, and dependency versions                 | A closed manifest with no unresolved run-time download                       |
| Artifact identity    | Publisher, source location, digest or checksum, and available signature evidence    | Artifacts whose observed identities match the approved manifest              |
| Build definition     | Immutable source reference, build inputs, tool versions, and network assumptions    | A reproducible or otherwise independently verified runtime artifact          |
| Transfer control     | Authorized path, custody owner, malware policy, media handling, and import approver | A traceable transfer record without public infrastructure details            |
| Runtime boundary     | Approved registries, content paths, certificate roots, and outbound-network policy  | A runtime that resolves only from the reviewed disconnected sources          |
| Target authorization | Exact inventory scope, privilege contract, secret references, and change approval   | A bounded execution request; secret values remain outside the content bundle |
| Assurance            | Preflight, independent verification, recovery decision, and evidence retention      | A redacted acceptance record or an explicit safe stop                        |

The manifest is the controlling input. A directory that merely contains the
expected filenames is not an integrity record, and a successful import does
not prove the runtime will avoid unapproved network resolution.

## Prerequisites

- The selected ModuLix content and every transitive dependency have immutable,
  reviewed identities.
- Licensing and redistribution decisions cover every artifact that will cross
  the boundary.
- The connected preparation environment and disconnected destination each
  have an identified owner and a documented trust level.
- Time, certificate trust, name resolution, storage capacity, and the internal
  artifact services required by the runtime have been validated.
- The transfer and scanning process can preserve bytes. Repacking an artifact
  creates a new artifact that needs its own identity and review.
- Backup or rebuild prerequisites and the recovery decision owner are known
  before an existing runtime is changed.

## Review sequence

1. Resolve the requested content to exact artifact identities in an isolated
   connected preparation environment.
2. Download or build the complete dependency set and record checksums, source
   references, licenses, and available provenance without embedding access
   credentials.
3. Compare the produced manifest with the approved request. Stop on an extra,
   missing, mutable, or unverifiable dependency.
4. Transfer the byte-preserving bundle through the authorized control and
   verify its identities again after import.
5. Register artifacts in the approved disconnected services without silently
   replacing an existing tag or version.
6. Construct the runtime from only the imported sources while outbound access
   is denied or independently observed.
7. Inspect the installed collections, execution image, and dependency report,
   then perform a non-production smoke test against an authorized example
   target.
8. Accept the runtime only when the observed identities and test result match
   the reviewed manifest.

## Safe validation and stop conditions

Validation should be read-only until the artifact set and target scope are
confirmed. At minimum, compare cryptographic digests before and after transfer,
inspect the installed collection list, inspect the execution-image identity,
and observe that the smoke test makes no unexpected network request.

Stop before target execution when:

- a dependency was resolved from an unlisted source;
- a tag points to a different digest than the reviewed record;
- certificate validation, signature verification, or malware policy was
  bypassed;
- the runtime attempts to reach the public internet;
- the inventory, privilege, or secret-reference contract differs from the
  approval; or
- retained evidence would disclose protected environment data.

## Recovery and rollback considerations

Keep the previously accepted runtime addressable until the replacement passes
verification. Recovery may select that prior immutable runtime, rebuild from a
preserved manifest, restore an internal artifact service, or apply a reviewed
forward correction. Reassigning a mutable tag is not sufficient rollback
evidence, and changing the runtime does not reverse changes already made to a
managed target.

The recovery owner must separately decide how to handle partially transferred
artifacts, partially updated controllers, and target changes. Follow the
site-wide [backup and recovery contract](../../security/backup-and-recovery.md)
for stateful services.

## Evidence and limitations

Retain the approved manifest, source identities, checksums or digests, license
review, available signature or provenance results, transfer approval, import
result, installed-content inventory, network observation, smoke-test outcome,
and final acceptance decision. Store real locations and findings only in the
authorized private evidence system.

This contract does not define a universal malware scanner, signing authority,
artifact repository, certificate hierarchy, or isolation level. It also does
not prove that third-party content is safe. Those are deployment decisions
that must be reviewed for the selected artifacts and threat model.

## Public references

- [ModuLix Automation v1.28.0](https://github.com/lightning-it/modulix-automation/releases/tag/v1.28.0)
- [v1.28.0 runtime contract at the reviewed commit](https://github.com/lightning-it/modulix-automation/blob/0a66195b288837a5c686089bc9e27c29ca89e085/docs/runtime-contract.md)
- [Downloading Ansible collections for offline installation](https://docs.ansible.com/projects/ansible/latest/collections_guide/collections_downloading.html)
- [Installing Ansible collections](https://docs.ansible.com/projects/ansible/latest/collections_guide/collections_installing.html)
