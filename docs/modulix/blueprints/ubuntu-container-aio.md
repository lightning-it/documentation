---
id: modulix-blueprint-ubuntu-container-aio
title: Assess an all-in-one Ubuntu container concept
description: Define the evidence required before an all-in-one Ubuntu container concept can become an executable blueprint.
slug: /modulix/blueprints/ubuntu-container-aio/
sidebar_position: 6
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation engineers
    - platform evaluators
  last_reviewed: "2026-07-15"
  review_cadence: annual
---

# Assess an all-in-one Ubuntu container concept

This page defines a review gate for a possible disposable all-in-one system.
It is not an installation blueprint, a supported topology, or a claim that a
Lightning IT image or playbook implements the concept.

All-in-one would mean that control, data, and dependency services share one
host failure domain. Any future evaluation must use synthetic data, remain
isolated from production, and be destroyed after its fixed review window.

## Public implementation status

The current public [`lightning-it/aio` repository at commit
`b041473`](https://github.com/lightning-it/aio/tree/b04147306d4e3bfc103b449f68de3aaee8befce2)
contains repository governance, security, testing, and release-model files. Its
[immutable release model](https://github.com/lightning-it/aio/blob/b04147306d4e3bfc103b449f68de3aaee8befce2/RELEASE.md)
classifies it as a generic managed repository with no artifact or publishing
target. That commit contains no service catalog, Ansible role, playbook,
container manifest, image build, or version lock.

Consequently, there is **no verified public service/runtime composition** to
document. In particular, the repository-quality check covers repository
structure; it does not exercise an Ubuntu host, a container runtime, an image,
or a multi-service workflow. Do not infer an implementation from the
repository name.

When inspecting a local public checkout, first prove that it matches the
reviewed commit and list its tracked files without running anything:

```bash
git -C aio show --no-patch --format='%H' HEAD
git -C aio ls-tree -r --name-only HEAD
```

The first command must print
`b04147306d4e3bfc103b449f68de3aaee8befce2` for this review record. Both
commands are read-only.

## Evidence required for an executable blueprint

A future proposal must add and review an explicit composition. At minimum, the
record must identify:

| Composition field | Required evidence                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| Host              | Exact Ubuntu release, base-image identity, hardening profile, and update owner                    |
| Runtime           | Product, version, privilege mode, storage driver, network driver, and support source              |
| Services          | Complete service list, purpose, immutable image digest, license, and owner                        |
| Dependencies      | Startup ordering, readiness criteria, trust relationships, and failure behavior                   |
| Network           | Named isolated networks, listeners, ingress policy, egress policy, and DNS behavior               |
| State             | Volume or bind-mount map, data classification, capacity, retention, and deletion rule             |
| Secrets           | Runtime delivery mechanism, rotation owner, and proof that values are absent from source and logs |
| Workflow          | One synthetic end-to-end transaction with expected inputs, outputs, and denied paths              |
| Teardown          | Commands or automation, residual-state checks, evidence retention, and accountable owner          |

An unpinned image tag, an unspecified dependency, or a health check that only
proves process availability leaves the composition unverified.

## Candidate safety boundary

Before any implementation exists, the design must require:

- a disposable non-production host with denied production routes;
- images pinned by digest with provenance, vulnerability, software-bill-of-
  materials, and license review;
- least-privilege runtime settings with every exception justified;
- loopback or isolated test-network listeners and denied external ingress;
- synthetic identities, records, and secret values;
- bounded volumes containing no imported production backup or customer data;
- an expiration time, teardown owner, and residual-data inspection; and
- redacted evidence that contains identities and checksums, not secrets or
  private topology.

Do not add privileged containers, host networking, broad device access, or
host filesystem mounts merely to make an unreviewed composition start.

## Acceptance path for a future implementation

1. Open a reviewed change that adds the complete composition record and
   immutable inputs.
2. Validate licenses, provenance, and dependency closure before retrieving or
   starting an image.
3. Review the generated configuration and secret-delivery path separately
   from runtime execution.
4. Deploy only to the isolated disposable host and verify each declared
   listener, mount, identity, dependency, and denied route.
5. Exercise the documented synthetic workflow and a bounded dependency
   failure. A restart alone is not resilience evidence.
6. Destroy containers, networks, volumes, credentials, and the host, then
   inspect for residual state.
7. Have the product owner and relevant Ubuntu, container-runtime, security,
   and service subject-matter experts accept the evidence before changing this
   page from `review-candidate` and `pending`.

Stop if an input resolves through a mutable tag, a service requires an
undeclared privilege or production connection, certificate validation fails,
or teardown leaves state behind.

## Evidence and licensing limits

Retain the proposed composition, immutable identities, review decisions,
redacted validation results, teardown result, and all unresolved limitations.
The public `aio` repository is MIT-licensed, but it currently publishes no
runtime artifact. Its license and repository checks are not product support or
compatibility evidence.

This review-candidate remains pending until a public implementation and its
release evidence exist and the named subject-matter experts approve the
service/runtime interpretation. For production composition requirements,
return to [ModuLix blueprints](../blueprints.md).
