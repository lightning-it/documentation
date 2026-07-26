---
id: compliance-mapping-model
title: Compliance mapping model
description: Define framework-neutral requirement mappings, applicability, assurance types, evidence reuse, exceptions, and claim boundaries.
slug: /architecture/compliance-mapping-model/
sidebar_position: 13
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - compliance owners
    - security reviewers
    - evidence owners
    - product owners
    - customers
  last_reviewed: "2026-07-25"
  review_cadence: annual
---

<!-- cspell:words SLSA Sigstore nist ssdf -->

# Compliance mapping model

This planning record defines a framework-neutral public mapping model. A
mapping explains interpretation, applicability, status, and bounded supporting
evidence; it does not establish conformity, certification, audit success,
regulatory compliance, or control effectiveness.

## Framework registry

The target registry supports:

- BSI IT-Grundschutz, BSI Standards 200-2 and 200-4, and applicable
  IT-Grundschutz building blocks;
- CIS Benchmarks;
- OpenSSF Best Practices and OpenSSF Scorecard;

<!-- cspell:disable-next-line -->

- `SLSA`, SPDX, CycloneDX, in-toto, and `Sigstore`;
- NIST Secure Software Development Framework; and
- future public frameworks admitted through the same governance contract.

Each registry entry records stable ID, official name, publisher, public
authority URL, framework type, edition/version, publication date, effective
date, supersession state, license/publication constraints, owner, review
cadence, and applicability-review trigger. Framework text is referenced rather
than copied unless redistribution is explicitly permitted.

Adding a framework does not declare it applicable. A framework view is
generated from canonical requirement and mapping records, not separately
authored prose.

## Record model

### Requirement record

```yaml
requirement_id: nist-ssdf-1.1-po-example
framework: nist-ssdf
framework_version: "1.1"
authority_reference: PO.example
title: Public-safe title or concise paraphrase
requirement_digest: sha256:...
owner: Compliance Owner
supersedes: []
```

### Mapping record

```yaml
mapping_id: map-example
mapping_version: "1.0"
requirement_id: nist-ssdf-1.1-po-example
scope:
  organization: lightning-it
  products: []
  components: []
  product_versions: []
applicability: applicable
applicability_rationale: Bounded public rationale
implementation_status: not-assessed
assurance_types:
  - internal-alignment
implementation_statement: No implementation claim is made.
owner: Named accountable role
evidence: []
exceptions: []
limitations:
  - Explicit limitation
assessed_at: "2026-07-25"
review_at: "2027-07-25"
source_revision: full-git-oid
```

Requirement identity is separate from a product mapping. One requirement can
have many explicitly scoped mappings; one implementation/evidence relationship
can support many mappings without copying the evidence.

## Controlled values

### Applicability

| Value                      | Meaning                                                               |
| -------------------------- | --------------------------------------------------------------------- |
| `applicable`               | requirement applies to the exact recorded scope                       |
| `conditionally-applicable` | applies only when the stated condition is true                        |
| `not-applicable`           | accountable owner determined it does not apply and recorded rationale |
| `applicability-unknown`    | applicability has not been determined                                 |

`not-applicable` requires owner, public-safe rationale, decision date,
approving/reviewing role, evidence where relevant, next review, and event
triggers. It is never treated as implemented.

### Implementation status

| Required public label | Controlled value        | Meaning                                                               |
| --------------------- | ----------------------- | --------------------------------------------------------------------- |
| Implemented           | `implemented`           | bounded implementation statement has current supporting evidence      |
| Partially Implemented | `partially-implemented` | identified portions have evidence and uncovered portions are explicit |
| Planned               | `planned`               | accepted or proposed future work; no current implementation claim     |
| Not Applicable        | `not-applicable`        | applicability decision above is valid; no implementation score        |
| Not Assessed          | `not-assessed`          | no adequate assessment has established status                         |

An unavailable, withheld, failed, expired, or revoked evidence record cannot
support `implemented` without other sufficient current evidence. If evidence
expires or scope changes, the mapping returns to `not-assessed` or
`partially-implemented` until review.

## Assurance and obligation types

These values are independent of implementation status:

| Type                     | Permitted statement                                                                |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `internal-alignment`     | internal design is mapped to selected public requirements; no assessment implied   |
| `self-assessment`        | accountable organization assessed the named scope and method                       |
| `automated-validation`   | named automated method produced a bounded result at a revision                     |
| `independent-assessment` | named independent qualified party assessed the exact scope and validity period     |
| `certification`          | authorized certification body issued a public credential for exact scope and dates |
| `regulatory-obligation`  | named legal authority creates an obligation for the recorded entity/scope          |

Multiple types may relate to a mapping, but none upgrades another. Automated
validation is not independent assessment; self-assessment is not certification;
alignment is not conformity; a framework reference is not a regulatory
obligation.

Certification or independent-assessment claims require issuer, credential or
report identifier, exact subject and scope, standard/version, issue and expiry
dates, public verification source, status, and limitations. Regulatory claims
require a qualified accountable owner and authoritative legal source. Private
legal analysis remains private.

## Evidence normalization and reuse

Evidence stays canonical in the Evidence Center. A relationship record links:

```text
evidence record version
  -> implementation/control statement
  -> one or more scoped mappings
  -> one or more framework requirements
```

The edge records relation type (`supports`, `verifies`, `limits`,
`contradicts`, or `supersedes`), scope overlap, mapping owner, and review date.
Views join these records by ID. They do not duplicate evidence summaries or
silently broaden product/version coverage.

One test may support several requirements only when the mapping owner explains
how its method and acceptance rule address each requirement. Evidence of a
process definition does not prove process execution; a tool configuration does
not prove a successful run; a passing run does not prove control effectiveness
outside its sample and time.

## Implementation statement invariant

`implemented` or `partially-implemented` requires:

1. an unambiguous public implementation statement;
2. accountable owner and exact product/component/version scope;
3. applicable requirement and framework version;
4. current Evidence Center records whose subject, method, result, and scope
   support that statement;
5. known gaps, exceptions, unavailable evidence, and limitations;
6. assessment and next-review dates; and
7. authorized exact-digest approval for the mapping set.

Without all elements, use `planned` or `not-assessed`. Generated summaries must
not translate unknown, excluded, not-applicable, or missing mappings into a
percentage suggesting compliance.

## Exceptions

An exception is separate from a mapping status and contains stable ID, exact
scope, affected requirements, public-safe rationale, risk owner, approving
authority, compensating measures and evidence, effective and expiry dates,
review triggers, private-system reference where safe, and remediation link.

Public records exclude private risk ratings, threat scenarios, customer
controls, finding details, accepted-risk reasoning, audit work papers,
vulnerabilities, incident information, and restricted compensating-control
details. When no safe rationale exists, publish only `withheld` or
`not-assessed` with a useful limitation.

An exception never changes the framework requirement, asserts implementation,
or waives classification and approval boundaries.

## Framework and applicability change

The Compliance Owner monitors publisher versions and authoritative notices. A
new edition:

1. creates immutable new requirement records;
2. records added, changed, renumbered, split, merged, and removed requirements;
3. maps old-to-new identity explicitly;
4. marks prior mappings historical, never silently current;
5. triggers applicability and evidence review for affected scopes; and
6. publishes a new mapping-set version only after validation and approval.

Product scope, architecture, supported-version, evidence, owner, obligation,
certification, or public-authority changes also trigger review.

## Views and claim-safe presentation

Each framework page shows publisher/version, authority link, assessed scope,
mapping-set version/digest, assurance types, last/next review, owner,
limitations, and rows for requirement, applicability, implementation status,
evidence, and exceptions.

Filters and aggregate summaries show complete denominators and separate all
controlled statuses. `not-applicable` and `not-assessed` are never successes.
Historical, superseded, expired, and planned data is visibly separated from the
current view. No badge uses certification language unless supported by a valid
external credential.

## Validation

Machine validation checks:

- registry IDs, framework versions, authority URLs, requirement digests, and
  supersession graphs;
- controlled applicability, status, assurance, and relationship values;
- owner, rationale, scope, dates, review triggers, and exception expiry;
- evidence existence/version/status, bidirectional edges, and scope overlap;
- implemented-state evidence invariant and stale evidence downgrade;
- framework coverage reports without interpreting missing records as success;
- deterministic generation from canonical records and exact mapping-set digest;
- restricted-content/unsafe-claim scanning; and
- accessible tables, status text, filters, routes, links, search, locale, and
  version behavior.

## Current and target state

The current BSI mapping is a useful public page, not proof of a complete
framework-neutral mapping system. It remains canonical during transition.

Issue #38 must approve registry/schema locations, framework-version support,
assurance authority, applicability approval, exception publication,
mapping-set digest rules, and migration of the existing BSI page. Adoption then
requires per-framework review; no record receives an implemented or assurance
state by bulk default.
