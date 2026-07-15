---
id: wunderbox-incus-image-deployment
title: Incus image-promotion evaluation contract
description: Evaluate Incus image promotion through provenance and recovery gates without implying a tested image pipeline.
slug: /wunderbox/operations/incus-image-deployment/
sidebar_position: 1
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform operators
    - release reviewers
    - security engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words Incus -->

# Incus image-promotion evaluation contract

This page defines conceptual control points for moving an operating-system
image from candidate to approved Incus use. It is not an import command recipe
and does not approve a particular image, publisher, registry, or distribution.
Platform, security, workload, and licensing owners must review the exact
artifact before deployment.

## Implementation status

No released Wunderbox image pipeline, exact Incus release, test image, or
promotion evidence is pinned by this page. The workflow is an evaluation
contract rather than a description of implemented behavior. Before it becomes
operational guidance, a platform SME must bind it to immutable public build and
runtime revisions where available, execute the candidate and denial scenarios,
and retain human security, workload, recovery, product, and licensing review.
The page intentionally omits commands because no release-specific workflow has
been validated as a safe public example.

The linked Incus `main` documentation is rolling. A real runbook must pin the
supported Incus release and its matching image format, import, alias, and
automatic-update semantics.

## Scope and boundaries

An Incus image supplies a root file system or virtual disk plus metadata needed
to create an instance. The [Incus image format](https://linuxcontainers.org/incus/docs/main/reference/image_format/)
defines the technical package. It does not establish publisher trust, license
rights, vulnerability status, guest support, or fitness for a workload.

Keep these identities separate:

| Identity                | Purpose                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| Source revision         | Immutable image definition, blueprint, or build pipeline input                                   |
| Build invocation        | Builder version, dependencies, parameters, and isolated execution evidence                       |
| Published artifact      | Original checksum, signature or attestation where supplied, media type, architecture, and origin |
| Incus image fingerprint | Incus content identity after import or publication                                               |
| Image alias             | Human-readable, movable pointer that can resolve to different content over time                  |
| Instance                | Effective image, profiles, overrides, devices, mutable guest state, and workload data            |

Incus documents that images are identified by fingerprints, while aliases can
move and can participate in automatic updates. See
[image handling](https://linuxcontainers.org/incus/docs/main/image-handling/).
Resolve and record the fingerprint for every approval and deployment. Do not
use an alias alone as release evidence.

## Candidate intake

Before importing content into an approved project or image server, record:

- the operating system, release, architecture, and intended instance type;
- publisher and acquisition channel;
- source, build recipe, and builder identity when available;
- original checksum and signature or attestation verification result;
- licenses, subscription or redistribution constraints, and approval owner;
- package inventory or SBOM where available;
- vulnerability, malware, secret, and configuration review results;
- expected firmware, kernel, driver, storage, network, and cloud-init behavior;
- expiry, update, rollback, and retirement decisions; and
- a non-production verification plan with safe-stop criteria.

Quarantine or reject an image when provenance is missing, license rights are
unclear, its resolved content changes unexpectedly, a protected value is
embedded, or the required support combination cannot be established.

An artifact checksum proves only byte identity. Verify publisher trust through
the approved upstream mechanism and preserve that result separately from the
Incus fingerprint.

## Staged promotion

### 1. Place the candidate in an isolated scope

Import or copy the candidate only into a restricted test project or image
service. Record the original artifact checksum, resulting Incus fingerprint,
effective metadata, and the exact operation used. Do not expose a candidate
through a production alias.

Incus supports local import and remote copy workflows; use the selected
release's [copy and import guidance](https://linuxcontainers.org/incus/docs/main/howto/images_copy/)
to create the classified runbook.

### 2. Inspect effective content and metadata

Compare architecture, creation identity, operating-system properties, image
requirements, size, aliases, public visibility, update setting, and source
record with the approved intake. Scan the actual imported content where policy
requires it. Metadata descriptions are claims, not verification.

### 3. Exercise a synthetic instance

Create a disposable instance by immutable fingerprint with the proposed profile
and instance type. Verify boot, expected services, identity initialization,
networking, storage, time, logging, update behavior, restart, shutdown, and
deletion. Check the effective instance configuration because profile order and
instance overrides can change the result.

Use only synthetic data and non-production identities. Do not validate an image
by attaching it directly to a production workload.

### 4. Verify recovery and compatibility

Confirm that the image works with the approved host, Incus release, firmware,
drivers, profiles, and management tooling. Exercise rebuild and any required
backup or restore behavior. An image can be reproducible while the mutable
instance data still needs separate protection.

### 5. Approve and expose

Record the immutable fingerprint, review decision, expiry, and evidence
reference. If an alias is used for operator convenience, treat alias movement as
a separate controlled change. Prevent unattended alias or cached-image movement
from bypassing the promotion decision.

### 6. Deploy and verify

Resolve the approved fingerprint immediately before deployment, compare it with
the decision, create the instance through reviewed automation, and verify the
consumer outcome independently. Record the effective image and configuration
in deployment evidence without publishing environment details.

## Change and update behavior

Do not mutate an approved image in place. Build or acquire a new artifact,
repeat intake and lab verification, and give it a new immutable identity. Test
guest update compatibility separately; creating from a newer image does not
prove that an existing mutable guest can upgrade safely.

Aliases are useful release pointers but are not locks. Incus can update cached
or copied images under configured conditions, and alias targets can change.
Decide explicitly whether automatic image updates are allowed in each project,
then observe and audit that setting.

## Failure and recovery

Stop promotion when any identity, origin, license, scan result, support status,
effective metadata, or lab behavior differs from the approved record. Remove
the candidate alias, prevent new use, and preserve classified evidence. Do not
delete an image still needed for incident analysis or recovery without the
evidence owner's decision.

For a deployment failure, determine whether the affected unit is an immutable
image, instance configuration, or mutable workload state. Rebuilding from the
previous approved fingerprint may recover the runtime definition but does not
recover data. Use the workload's tested backup and recovery contract, verify the
consumer outcome, and retire failed instances only after evidence and data
decisions are complete.

## Evidence and periodic review

Retain source and build identity, original and Incus checksums, signature or
attestation result, licenses, scan decision, SBOM where available, lab results,
effective profile and instance type, approval, expiry, deployment verification,
and retirement. Periodically confirm that the source remains trusted, the image
is within lifecycle, vulnerabilities are handled, aliases still resolve as
intended, and unused content is retired under policy.
