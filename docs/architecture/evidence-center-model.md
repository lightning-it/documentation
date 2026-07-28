---
id: evidence-center-model
title: Evidence Center and retention model
description: Define public-safe evidence records, provenance, generation, indexing, supersession, validation, redaction, and retention.
slug: /architecture/evidence-center-model/
sidebar_position: 12
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - evidence owners
    - security reviewers
    - compliance reviewers
    - release engineers
    - customers
  last_reviewed: "2026-07-25"
  review_cadence: annual
---

# Evidence Center and retention model

This planning record defines a public-safe Evidence Center that explains
bounded engineering observations without publishing raw restricted evidence or
assuming that a control exists. It changes no generator, workflow, retention
system, production route, or evidence status.

## Evidence boundary

Evidence is an attributable observation about a named subject at a named
revision and time. It can support a bounded claim; it cannot prove a broader
claim, transfer approval, or establish current production state after its scope
or validity ends.

The public Evidence Center stores reviewed summaries and safe immutable
artifacts only. Protected source artifacts remain in an authorized private
system with separate access, retention, legal-hold, and disposal controls. The
public repository records at most a non-sensitive opaque reference and
availability state.

## Canonical structure

```text
/evidence/
├── catalog/               # filterable human-readable record index
├── validation/            # tests, quality, security, accessibility, licenses
├── changes/               # issue, commit, pull-request, review traceability
├── builds/                # builds, artifacts, digests, provenance
├── releases/              # promotion, signing, SBOM, supported releases
├── production/            # deployment and bounded acceptance observations
├── approvals/             # exact-digest document and architecture approvals
├── compliance/            # evidence relationships, not framework conclusions
└── governance/            # schema, retention, generation, limitations
```

The catalog is generated from one canonical record set. Category pages are
views, not duplicate evidence sources.

## Evidence categories

The model supports, without claiming implementation:

| Category              | Example subject/result                                                      |
| --------------------- | --------------------------------------------------------------------------- |
| governance            | approved decision, exception, owner review, document digest                 |
| change traceability   | issue, commit, pull request, reviewer disposition                           |
| static quality        | format, lint, spelling, metadata, link, duplicate, deprecation checks       |
| tests                 | unit, integration, browser, accessibility, performance, recovery results    |
| security              | secret scan, code analysis, dependency review, vulnerability summary        |
| supply chain          | dependency inventory, license result, SBOM, provenance, signature summary   |
| build                 | toolchain, source revision, artifact digest, reproducibility comparison     |
| release and promotion | candidate identity, protected approvals, environment admission              |
| production acceptance | canonical route, TLS, headers, content identity, search, rollback readiness |
| documentation         | document set, schema validation, translation/search freshness               |
| compliance support    | relationship to a mapped control with stated limitations                    |

Failed, unavailable, and not-applicable records remain first-class states. The
catalog exposes them through status-driven views and filters across every
domain category; it never converts absence into success.

## Record schema

Every public evidence record has:

```yaml
schema_version: "1.0"
evidence_id: ev-build-example
record_version: "1.0"
category: build
status: passed
title: Deterministic public title
subject:
  type: site-candidate
  identifier: public-safe-identifier
scope:
  products: []
  components: []
  product_versions: []
  environment: preview
source:
  repository: lightning-it/documentation
  commit: full-git-oid
method:
  identifier: npm-build
  version: public-tool-version
  acceptance_rule:
    identifier: build-must-complete
    version: "1.0"
observed_at: "2026-07-25T00:00:00Z"
generated_at: "2026-07-25T00:00:00Z"
generator:
  identifier: evidence-generator
  version: "1.0"
result:
  summary: Bounded factual result
  measurements: {}
artifacts:
  - media_type: application/json
    digest: sha256:...
relationships:
  supports_claims: []
  issues: []
  pull_requests: []
  builds: []
  releases: []
  supersedes: []
limitations:
  - Explicit scope limitation
owner: Named accountable role
review:
  status: pending
  evidence:
    - opaque-public-safe-record-id
retention:
  class: public-governance
  review_at: "2027-07-25"
```

Identifiers are globally unique, stable, lower-case, and never derived from a
secret or private customer/system name. Record versions change when meaning or
schema representation changes; immutable historical versions remain
addressable.

Review and relationship references are public-safe stable identifiers. A
protected-system reference is opaque, non-secret, and never a URL, path,
hostname, query, credential, or guessable private object identifier.

## Status model

| Status           | Meaning                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `passed`         | stated method met its bounded acceptance rule                      |
| `failed`         | method ran and did not meet the rule                               |
| `warning`        | method completed with a material non-failing limitation            |
| `not-applicable` | accountable owner established why the method does not apply        |
| `unavailable`    | expected evidence cannot currently be obtained or safely published |
| `withheld`       | source exists but public release is prohibited                     |
| `expired`        | observation is outside its validity/review window                  |
| `superseded`     | a linked later record replaces it for current interpretation       |
| `revoked`        | owner invalidated the record or its authorization                  |

`passed` means only the recorded subject, method, rule, inputs, revision, and
time passed. It never means secure, compliant, certified, production-ready, or
free of defects.

## Provenance and relationships

Traceability forms an acyclic graph:

```text
goal/issue -> decision -> commit -> pull request/review -> workflow/build
  -> artifact/digest -> promotion -> release/deployment -> acceptance
  -> bounded Trust/Compliance/Product claim
```

Each edge is typed and independently verifiable. Generated records capture
immutable Git object IDs, workflow/run/job IDs, artifact digests, tool versions,
environment class, timestamps, and public result. Mutable branch names, status
badges, or latest URLs may be convenience links but are never sole evidence.

An evidence record links to every claim it supports. A claim links to the exact
record version. Supersession is explicit and does not erase failed history.

## Deterministic generation and indexing

Generators:

1. consume only declared tracked inputs and immutable external public
   identifiers;
2. validate inputs against versioned schemas;
3. sort keys, records, relationships, and sets canonically;
4. normalize timestamps to observed external events rather than wall-clock
   rebuild time where reproducibility requires it;
5. produce byte-stable JSON and a human-readable view from the same model;
6. record generator/tool versions and input/output digests;
7. fail closed on unknown status, unresolved subject, unsafe field, schema
   mismatch, or partial pagination; and
8. run without production mutation or access to restricted systems.

The generated index filters by category, status, product, component, version,
environment class, date, owner, claim, release, and supersession state. Search
indexes only reviewed public summaries. A deterministic manifest lists every
record version and digest.

## Public summary and protected source

| Public summary may contain                           | Protected source may contain and public must exclude           |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| safe subject type and identifier                     | customer/system identity, private topology                     |
| repository, public revision, workflow/run identifier | credentials, tokens, private URLs, access rules                |
| method/tool version and bounded result               | raw scanner output, exploit detail, finding narratives         |
| aggregate safe measurement                           | personal data, customer data, stack traces with sensitive data |
| digest of an approved safe artifact                  | restricted audit work papers or legal material                 |
| limitation, date, owner, expiry, availability state  | risk acceptance reasoning and sensitive incident detail        |

Redaction is a transformation requiring independent review, not deletion of
obvious strings. A public summary is regenerated from an allowlisted schema; raw
source is never copied and then denylist-scrubbed. Redaction provenance records
the reviewer and method in the protected system, while the public record states
only that a reviewed summary exists.

## Retention strategy

Retention classes are policy inputs whose durations require an authorized
owner decision:

| Class                | Public behavior                                                    | Protected-source behavior                    |
| -------------------- | ------------------------------------------------------------------ | -------------------------------------------- |
| current-operational  | current plus explicit superseded history needed for interpretation | per security/operations retention policy     |
| release-lifetime     | through supported life plus approved post-support period           | per release, warranty, and legal obligations |
| public-governance    | durable decision/approval history; corrections append/supersede    | authority record under governance policy     |
| transient-validation | summarized result retained; bulky public artifact may expire       | raw logs expire under bounded CI policy      |
| incident/audit       | public-safe disclosure only when authorized                        | private legal/security retention and holds   |

Expiry changes status to `expired`; it does not silently delete a record still
referenced by a current claim. Before deletion, validate inbound relationships,
legal/governance holds, supported versions, audit needs, redirects, and a safe
tombstone. A tombstone retains ID, former category, status, dates, owner,
supersession, and non-sensitive reason.

Unavailable or withheld evidence records the accountable owner, safe reason
category, impact on claims, next action, and review date. It never links to a
private artifact through a guessable URL.

## Quality and validation rules

Acceptance validates:

- schema, identifier, version, category, status, timestamps, owner, scope, and
  retention class;
- immutable commit/run/release/artifact identifiers and artifact digest syntax;
- subject-to-method applicability and explicit acceptance rule;
- claim/evidence bidirectional links with no broadened scope;
- supersession graph cycles, missing targets, and current-record uniqueness;
- failed, unavailable, withheld, expired, revoked, and not-applicable records
  are visible and never aggregated as passed;
- deterministic clean rebuild and index/manifest digest equality;
- public/protected allowlist enforcement, secret/customer/private-topology
  sentinel tests, and safe error output;
- accessible human views, usable filters, stable canonical URLs, and search
  exclusion for non-public sources; and
- approval evidence for reviewed summaries and production acceptance for
  published state.

## Current, transition, and target state

Current `evidence/` files include approval, migration, and generated validation
records, but they are not yet one schema-governed public Evidence Center.
During transition, existing records retain their current meaning and location.
They must not be relabeled to the target schema without provenance-preserving
migration and review.

The target implementation inventories each file as canonical input, generated
output, historical record, protected-only pointer, migrate, supersede, or
retire. Issue #38 must approve schemas, category registry, retention durations
and authority, protected evidence system boundary, redaction review role,
public routes, and migration plan before implementation.
