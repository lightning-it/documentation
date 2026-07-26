---
id: metadata-lifecycle-model
title: Metadata, versioning, and document lifecycle model
description: Define machine-verifiable metadata, approval evidence, version semantics, lifecycle transitions, and migration rules.
slug: /architecture/metadata-lifecycle-model/
sidebar_position: 9
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation architects
    - content owners
    - reviewers
    - repository maintainers
  last_reviewed: "2026-07-25"
  review_cadence: annual
---

# Metadata, versioning, and document lifecycle model

This planning record defines the target metadata and lifecycle contract. The
current schema remains effective until #38 approves this package and a separate
implementation change migrates content and validators.

## Current and target model

The current JSON Schema requires a stable page identifier, title, description,
document status, document version, `PUBLIC` classification, approval flag,
owner, approver, audience, last-review date, and review cadence. It permits four
document statuses and two approval states. It does not yet machine-validate
product/component relationships, provenance, evidence, event-driven review,
product versions, site releases, archival, or retirement.

The target separates identity, content state, approval evidence, publication
state, product applicability, and provenance so that one field cannot imply
another.

## Target front matter

```yaml
id: stable-document-id
title: Human-readable title
description: Concise purpose and scope
slug: /stable/canonical/route/
document:
  schema_version: "2.0"
  version: "1.0"
  status: review-candidate
  publication_status: unpublished
  classification: PUBLIC
  owner: Named accountable role
  approver: Named authorized role
  audience:
    - practitioner
  content_type: procedure
  product: approved-product-id
  components:
    - approved-component-id
  product_versions:
    - "2.x"
  approval_status: pending
  approval_evidence: []
  last_reviewed: "2026-07-25"
  review_cadence: annual
  review_triggers:
    - product-major-release
  relationships:
    issues: []
    pull_requests: []
    architecture_decisions: []
    releases: []
    evidence: []
    standards: []
    source_repositories: []
  provenance:
    created_from: repository-native
    created_at: "2026-07-25"
    verified_at: "2026-07-25"
```

Optional fields are omitted when inapplicable, never filled with invented
values. A registry defines every identifier and relationship target.

## Field contract

| Field                | Rule                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `id`                 | immutable lower-case identifier unique across all locales and versions                                   |
| `slug`               | canonical route governed by #26; a change requires redirect evidence                                     |
| `schema_version`     | metadata contract version, independent of document and product versions                                  |
| `document.version`   | `MAJOR.MINOR`; major for changed meaning/contract, minor for compatible clarification                    |
| `status`             | controlled content lifecycle state                                                                       |
| `publication_status` | unpublished, preview, published, withdrawn, or archived; derived from deployment evidence where possible |
| `classification`     | published page is `PUBLIC`; sanitization inputs follow `AGENTS.md` and are not publication metadata      |
| `owner`              | accountable maintenance role; must resolve through the ownership registry                                |
| `approver`           | required authorization role, not proof that approval occurred                                            |
| `audience`           | one or more controlled audience identifiers                                                              |
| `content_type`       | one controlled #26 taxonomy value                                                                        |
| `product`            | approved product identifier or omitted for shared content                                                |
| `components`         | zero or more approved product-local/shared identifiers                                                   |
| `product_versions`   | explicit supported applicability; omission means version-neutral, not all versions                       |
| `approval_status`    | computed or validated against exact authorized evidence; never trusted alone                             |
| `approval_evidence`  | stable evidence IDs whose document set and digest include this exact version                             |
| `last_reviewed`      | date of completed accountable review, not last edit                                                      |
| `review_cadence`     | quarterly, semiannual, annual, or event-driven                                                           |
| `review_triggers`    | controlled events requiring review before the calendar cadence                                           |
| `relationships`      | typed stable references; each target is validated where publicly resolvable                              |
| `provenance`         | creation method/date and last source verification; never embeds restricted source text                   |

## Controlled lifecycle states

| State              | Meaning                                                       | Public behavior                                     |
| ------------------ | ------------------------------------------------------------- | --------------------------------------------------- |
| `draft`            | incomplete author workspace                                   | not committed to public content paths               |
| `review-candidate` | complete enough for review, approval pending                  | preview-capable; no approved/production claim       |
| `maintained`       | accepted content with owner and active review obligation      | publishable only with valid approval and deployment |
| `deprecated`       | still available, replacement or end condition declared        | banner, successor, deadline, and limited support    |
| `archived`         | retained for historical value, no longer maintained           | clearly historical and excluded from current tasks  |
| `retired`          | canonical content removed after retention and redirect review | route redirects or returns governed removal result  |

`experimental` is a content maturity qualifier in the current schema. Target
migration maps it to `review-candidate` plus an explicit maturity or support
limitation; it never bypasses approval.

## State transitions and gates

```text
draft -> review-candidate -> maintained -> deprecated -> archived -> retired
             ^                  |              |
             |                  +--------------+ (rework)
             +---------------------------------+
```

| Transition                    | Required gate                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| draft → review-candidate      | complete metadata, owner, classification, provenance, and validation                                |
| review-candidate → maintained | required reviews plus exact authorized evidence for the deterministic document digest               |
| maintained → review-candidate | any material meaning, scope, owner, applicability, or normative dependency change                   |
| maintained → deprecated       | owner decision, reason, successor or no-successor statement, support boundary, and target date      |
| deprecated → maintained       | new review and approval evidence; old evidence remains historical                                   |
| deprecated → archived         | retirement criteria met, links/search/version behavior validated, retention decision recorded       |
| archived → retired            | retention expired, legal/governance hold absent, redirects and inbound references reviewed          |
| any public state → withdrawn  | urgent safety/publication decision; attributable record, replacement/rollback, and follow-up review |

Transitions are pull-request changes. Publication state additionally requires
deployment evidence and cannot be asserted by front matter alone.

## Approval invariant

`approval_status: approved` is valid only when every referenced evidence record:

1. identifies an authorized approver role and attributable approval;
2. covers the exact stable document IDs and versions;
3. binds the deterministic digest of the complete approved set;
4. is unexpired and not superseded or revoked; and
5. matches the revision considered for publication.

Otherwise validation fails or normalizes the effective state to `pending`.
Copying approval metadata, changing a page, or reusing approval for another
document set never transfers approval.

## Version semantics

| Version dimension     | Example                     | Meaning                                                                        |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------ |
| Metadata schema       | `schema_version: "2.0"`     | parser and validation contract                                                 |
| Document version      | `document.version: "1.3"`   | semantic version of this document's public meaning                             |
| Product applicability | `product_versions: ["2.x"]` | product releases for which the content is verified                             |
| Documentation version | route/version registry      | a coherent maintained documentation set when versioned views are required      |
| Site release          | Git commit/artifact digest  | immutable deployed aggregate; it does not change individual document semantics |

`current` is a resolved pointer to an accepted documentation version, not a
version string. `supported`, `deprecated`, `unsupported`, and `historical`
describe product/documentation applicability. `planned` and `draft` content is
not mixed into current public guidance or default search results.

## Review and retirement

Calendar review is due from `last_reviewed` using the controlled cadence.
Event-driven review occurs sooner when a referenced product major release,
security boundary, public authority, control mapping, workflow, owner, route,
dependency, or source changes. The owner must either reverify, revise,
deprecate, archive, or withdraw the document.

Deprecation records the reason, announced date, last supported product version,
successor, support boundary, target archival date, and owner. Removal requires
an inbound-link report, search and redirect validation, evidence-retention
decision, and confirmation that no active supported version depends on it.

## Relationship model

Typed relationships support:

- `implements`, `decides`, or `supersedes` an ADR;
- `tracks` or `closes` an issue;
- `introduced_by` a pull request;
- `applies_to` a release or product version;
- `supported_by`, `verified_by`, `limited_by`, or `superseded_by` evidence;
- `maps_to` a public standard/control reference; and
- `derived_from` a public source repository revision.

References use immutable URLs or stable repository identifiers when possible.
A live link is not proof of approval, implementation, production, or control
effectiveness.

## Validation and compatibility

Target validators must:

- apply the schema selected by `schema_version`;
- reject unknown controlled values and duplicate IDs or canonical slugs;
- resolve owners, products, components, audiences, triggers, and relationship
  types through version-controlled registries;
- verify relationship syntax and public resolvability without fetching
  restricted systems;
- calculate effective approval from evidence rather than the flag alone;
- check review due dates, triggers, deprecation deadlines, and unsupported
  applicability;
- preserve locale and version identity rules from #33; and
- emit deterministic public-safe diagnostics and migration evidence.

A schema change is backward compatible only when old valid metadata retains the
same meaning. Additive optional fields require defaults that cannot imply
approval or applicability. Renames, removed values, changed defaults, or tighter
meaning require a major schema version and migration.

## Migration and exceptions

Migration proceeds by inventory, deterministic mapping, dry-run report, bounded
content groups, review, and exact-digest approval. Current `maintained` and
`approved` values retain historical evidence only; migration must revalidate
that the evidence covers the migrated representation.

An exception record contains scope, rationale, accountable owner, approving
role, risk, compensating validation, creation and expiry dates, and remediation
issue. It cannot waive classification, authorization, or public/private
boundaries. Expired exceptions fail validation.

## Open implementation decisions

- registry file shapes and schema identifiers;
- deterministic document-set digest canonicalization;
- publication-state derivation from deployment evidence;
- versioned and localized route resolution with #33;
- archival output location and search exclusion; and
- compatibility window for schema v1.

These require #38 approval and bounded implementation work; this record changes
neither the current schema nor existing front matter.
