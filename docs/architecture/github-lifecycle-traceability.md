---
id: github-lifecycle-traceability
title: GitHub integration and lifecycle traceability
description: Define public GitHub sources, immutable lifecycle links, deterministic generation, permissions, failure handling, and private boundaries.
slug: /architecture/github-lifecycle-traceability/
sidebar_position: 14
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - repository maintainers
    - documentation architects
    - evidence owners
    - release engineers
  last_reviewed: "2026-07-25"
  review_cadence: annual
---

# GitHub integration and lifecycle traceability

This planning record defines how public GitHub metadata can support navigable
engineering traceability. GitHub metadata is source evidence, not an automatic
public claim. No private repository may be queried, cloned, cached, logged, or
rendered by a public untrusted workflow.

## Integration boundary

Allowed sources are explicit public repositories in a version-controlled
allowlist. Each entry identifies owner/name, role, data types, accountable
owner, canonical public URL, expected visibility, and last review.

The target ingestion job:

- runs in a trusted generation context with least-privilege read-only metadata
  permission;
- receives pull-request code and metadata as untrusted input;
- never exposes a token to fork or arbitrary pull-request execution;
- does not request private-repository, organization-secret, advisory-detail, or
  customer-system access;
- fetches declared fields through bounded GitHub APIs or immutable public Git
  objects; and
- writes a reviewable public-safe intermediate model before rendering.

Repository visibility is checked on every fetch. A repository that is private,
internal, transferred, deleted, renamed without an approved mapping, or outside
the allowlist fails closed.

## Source model

| GitHub object   | Immutable identity recorded                                         | Permitted public use                                      |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------- |
| repository      | node ID plus owner/name at observation                              | source/ownership context                                  |
| issue           | repository node ID, issue node ID/number, updated timestamp         | goal/task/decision tracking                               |
| sub-issue       | parent and child node IDs plus observed relationship                | bounded work hierarchy                                    |
| project item    | project/item/field IDs and value update time                        | planning status, never completion proof alone             |
| milestone       | node ID/number, due/closed time                                     | bounded planning/release grouping                         |
| pull request    | node ID/number and exact head/base/merge commit OIDs                | reviewed change relationship                              |
| review/thread   | review/thread/comment IDs, author role, commit OID, resolution time | review and remediation evidence                           |
| commit          | full Git object ID                                                  | immutable source/change identity                          |
| Actions run/job | workflow file revision, run attempt, run/job/check IDs              | validation observation and logs/artifact relationship     |
| release/tag     | release ID, immutable tag object/commit, published time             | release identity; not deployment proof                    |
| advisory        | public advisory ID/version only                                     | public vulnerability lifecycle reference                  |
| artifact        | run/artifact ID, subject revision, retained digest                  | bounded build output where digest is independently stored |
| provenance/SBOM | artifact digest and public attestation identifier                   | supply-chain evidence relationship                        |
| test/check      | check-run ID, suite/head OID, method/version                        | exact-revision result                                     |
| changelog entry | source commit/path and release identity                             | rendered release history                                  |

Mutable titles, labels, branch names, URLs, project values, latest releases, and
check badges are snapshots. Generated references always include repository,
immutable object ID, observation time, and source revision.

## Lifecycle graph

```text
Goal issue
  -> architecture issues and ADRs
  -> implementation tasks/sub-issues
  -> pull requests -> reviews -> commits
  -> workflows -> tests/security checks -> evidence records
  -> build artifact/digest/provenance
  -> release/tag -> promotion/deployment -> production acceptance
  -> supported product/document versions
  -> operations, maintenance, deprecation, and improvement issues
```

Edges are typed: `parent_of`, `decides`, `implements`, `reviewed_by`,
`verified_by`, `produces`, `promotes`, `releases`, `deployed_as`,
`accepted_by`, `supports_version`, `supersedes`, `deprecates`, or `maintains`.
Each edge records its source object and observation revision.

The graph is navigable in both directions. Missing intermediate evidence is
shown as missing; the generator never skips from task to release and implies
the absent review, test, or promotion steps occurred.

## Issue and project conventions

Every governed work issue uses:

| Field               | Contract                                                                        |
| ------------------- | ------------------------------------------------------------------------------- |
| type                | goal, epic, architecture, ADR, task, defect, evidence, release, operation       |
| status              | repository-controlled workflow value; status is not acceptance evidence         |
| owner               | accountable role or assignee                                                    |
| parent              | one primary parent for scoped hierarchy                                         |
| labels              | controlled type/domain/risk labels; no conflicting lifecycle values             |
| milestone           | optional bounded release/time window; omission is explicit                      |
| dependencies        | typed blockers or prerequisites                                                 |
| acceptance criteria | objective bounded criteria before work starts                                   |
| completion evidence | merged PR/commit, checks, evidence IDs, release/deployment/acceptance as needed |

A closed issue is complete only within its recorded acceptance criteria and
evidence. Project automation cannot overwrite authoritative relationships
without validation and attribution.

## Deterministic generation

Generation uses a lock manifest:

```yaml
schema_version: "1.0"
generated_from_commit: full-git-oid
repositories:
  - node_id: public-repository-node-id
    name_with_owner: lightning-it/documentation
    observed_at: "2026-07-25T00:00:00Z"
    query_contract_version: "1.0"
    highest_updated_at: "2026-07-25T00:00:00Z"
objects_digest: sha256:...
output_digest: sha256:...
```

The query contract pins fields, pagination order, page size, filters, API
version, relationship interpretation, and normalization. Objects are sorted by
repository node ID, object type, immutable ID, and version. Timestamps come
from source events; rebuild time is excluded from semantic output.

Clean generation from the same lock manifest and canonical object snapshot
produces byte-identical indexes. Generated Markdown/JSON is never edited as the
canonical source.

## Cache and rate limits

The cache key includes query-contract version, repository node ID, visibility,
immutable object ID or stable cursor window, and source update/version marker.
Cache contents use the public-safe schema and contain no token, headers, private
response, raw error body, or undeclared field.

Conditional requests and bounded incremental windows reduce API use. Before
fetching, the generator checks remaining quota and reset time. It never loops
unboundedly or silently truncates pagination.

| Condition                | Behavior                                                            |
| ------------------------ | ------------------------------------------------------------------- |
| low rate limit           | stop before partial output; report safe reset time and retry action |
| secondary limit/abuse    | bounded backoff, then fail without publishing                       |
| transient server/network | bounded retries with jitter; retain last accepted output separately |
| pagination inconsistency | discard candidate and retry from a stable boundary                  |
| stale cache              | fail or label explicitly stale; never present as current            |
| unavailable GitHub       | navigation remains; generated candidate is not promoted             |

An older accepted index may remain in production with its visible observation
date, but a new build cannot silently substitute it as fresh.

## Validation and failure behavior

Generation fails clearly on:

- missing, malformed, duplicated, conflicting, unauthorized, or unknown
  repository/object metadata;
- unexpected private visibility or private URL/domain;
- unresolved required parent, ADR, pull request, review, test, evidence,
  release, version, or supersession link;
- head/merge commit mismatch, unpaginated response, changed data during
  snapshot, or missing immutable identity;
- unsupported label/status/type/project field;
- unsafe text, credentials, customer/private topology terms, or restricted
  advisory/finding data; and
- nondeterministic rebuild or output digest mismatch.

Diagnostics name only public repositories, object types, safe IDs, and recovery
steps. Failed candidate output is not committed or deployed.

## Permissions and workflow contexts

| Context                     | Maximum authority                                                        |
| --------------------------- | ------------------------------------------------------------------------ |
| fork/untrusted pull request | no secrets; repository contents and public fixture validation only       |
| same-repository PR          | read-only metadata where needed; no production or private-repo access    |
| scheduled trusted refresh   | read-only allowlisted public metadata, bounded cache/artifact write      |
| merge to integration        | generate and review candidate evidence; no automatic production approval |
| protected promotion         | consume exact accepted artifact; environment approval                    |

Workflow permissions are explicitly declared, actions pinned to immutable
revisions, output escaped, artifacts given bounded retention, and credentials
never persisted.

## Retention and source changes

Public generated indexes retain the observation manifest, record versions,
digests, and supersession history according to #30. Raw API payloads are
transient unless an approved public-safe snapshot is required for
reproducibility. GitHub Actions logs and artifacts are convenience sources with
provider retention; durable claims depend on normalized evidence records.

Deletion, transfer, privatization, force-updated tag, advisory withdrawal,
author deletion, or changed project schema triggers review. Historical public
facts remain only when safe, necessary, and clearly historical; otherwise a
tombstone records the public-safe availability change.

## Reviewable outputs

Every generated pull request shows:

- allowlist and query-contract changes;
- object additions, changes, removals, and broken relationships;
- lifecycle graph changes and affected claims;
- stale/missing/malformed/unauthorized counts;
- input and output digests; and
- validation, reproducibility, classification, and approval results.

Automation proposes changes. A named human owner reviews consequential lifecycle
or claim changes, and exact-digest approval remains required.

## Open decisions

Issue #38 must approve the allowlist authority, query/snapshot storage,
project-field registry, supported GitHub API/version, cache retention,
rate-limit thresholds, stale-index production window, public advisory boundary,
and historical deletion behavior. Implementation must use public fixtures for
untrusted workflow tests and cannot add private-repository access.
