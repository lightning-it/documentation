---
id: integrated-architecture-package
title: Integrated documentation architecture package
description: Bind the authoritative architecture artifacts, decisions, risks, dependencies, implementation plan, and human approval gate.
slug: /architecture/integrated-architecture-package/
sidebar_position: 17
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - maintainers
    - architecture reviewers
    - implementation owners
    - security and compliance reviewers
  last_reviewed: "2026-07-26"
  review_cadence: annual
---

<!-- cspell:words workstream -->

# Integrated documentation architecture package

This review candidate integrates the planning outputs for Goal
[Issue #15](https://github.com/lightning-it/documentation/issues/15). It does
not authorize implementation, production configuration, deployment, Domain
Name System (DNS) changes, credential creation, migration, or publication.
Implementation remains blocked until an authorized human records the exact
decision required by
[Issue #38](https://github.com/lightning-it/documentation/issues/38).

## Package identity

| Field                   | Bound value                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| source branch           | protected `develop`                                                                                      |
| source commit           | `abef1fcc31097051aabefcbddb5f43647c67df72`                                                               |
| architecture issues     | #23–#38, excluding unused numbers in that range                                                          |
| implementation issues   | #132–#142, existing #40, and existing #115                                                               |
| manifest algorithm      | SHA-256 of each file; complete digest/path lines sorted in byte order; complete text hashed with SHA-256 |
| package manifest digest | `30f44a7e31ce6ddf34a6a4361fc6f160b5d81c18bd031393b17224bedf9aee1c`                                       |
| package status          | review candidate; human decision pending                                                                 |

The manifest digest covers the 18 authoritative files listed below at the
source commit. This integration page and its pull request provide the review
record around that immutable input set. Any content change to a listed file,
change to the file set, or change to a material decision invalidates this
candidate and requires a new digest and review.

## Authoritative artifact register

| Issue | Authoritative artifact                                                                                                                                                                                                                                    | Accountable owner                        | Package purpose                                  |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| #23   | [Current-state assessment](./current-state-assessment.md)                                                                                                                                                                                                 | Documentation Maintainers                | verified baseline and gap inventory              |
| #24   | [Governance, release, and licensing baseline](./governance-release-licensing-baseline.md)                                                                                                                                                                 | Documentation Maintainers                | governance and publication baseline              |
| #25   | [Target documentation platform](./target-documentation-platform.md)                                                                                                                                                                                       | Documentation Maintainers                | target platform and repository architecture      |
| #26   | [Information architecture](./information-architecture.md)                                                                                                                                                                                                 | Documentation Maintainers                | canonical structure, routes, and navigation      |
| #27   | [Metadata and lifecycle model](./metadata-lifecycle-model.md)                                                                                                                                                                                             | Documentation Maintainers                | identity, status, approval, and lifecycle schema |
| #28   | [Product documentation standard](./product-documentation-standard.md)                                                                                                                                                                                     | Documentation and Product Owners         | reusable product/page contract                   |
| #29   | [Trust Center model](./trust-center-model.md)                                                                                                                                                                                                             | Trust Owner                              | public trust topics and claim boundaries         |
| #30   | [Evidence Center model](./evidence-center-model.md)                                                                                                                                                                                                       | Evidence Owner                           | evidence records, states, and retention          |
| #31   | [Compliance mapping model](./compliance-mapping-model.md)                                                                                                                                                                                                 | Compliance Owner                         | framework-neutral mappings and claim safety      |
| #32   | [Public/private security architecture](../security/public-private-security-architecture.md)                                                                                                                                                               | Security and Compliance Maintainers      | publication and threat boundaries                |
| #33   | [Localization and search strategy](./localization-search-strategy.md)                                                                                                                                                                                     | Documentation and Locale Owners          | locale lifecycle and deterministic search        |
| #34   | [GitHub lifecycle traceability](./github-lifecycle-traceability.md)                                                                                                                                                                                       | Repository Maintainer                    | immutable public lifecycle graph                 |
| #35   | [CI/CD and Cloudflare architecture](./cicd-cloudflare-deployment.md)                                                                                                                                                                                      | Delivery Engineer and Production Owners  | build-once delivery, acceptance, and rollback    |
| #36   | [Migration plan](../reference/platform-governance-evidence-migration-plan.md) and [inventory](https://github.com/lightning-it/documentation/blob/abef1fcc31097051aabefcbddb5f43647c67df72/evidence/platform-governance-evidence-migration-inventory.json) | Migration Owner                          | classified migration decisions and sequencing    |
| #37   | [Dependency graph and implementation plan](./implementation-plan.md)                                                                                                                                                                                      | Architecture and Implementation Owners   | milestones, work issues, and approval gate       |
| ADRs  | [Integration decisions](./integration-decisions.md) and [GitHub automation trust](./github-automation-trust.md)                                                                                                                                           | Documentation and Repository Maintainers | accepted architecture decision records           |

The architecture index remains navigation, not a competing source of truth.
Each topic above has one authoritative artifact. Cross-links do not transfer
ownership or approval.

## Completeness against Goal #15

| Required capability                                             | Authoritative coverage | Disposition                            |
| --------------------------------------------------------------- | ---------------------- | -------------------------------------- |
| platform, repository, and Docusaurus architecture               | #25                    | resolved architecture                  |
| information architecture, routes, navigation, and page standard | #26 and #28            | resolved architecture                  |
| product and cross-product documentation model                   | #26 and #28            | resolved; implementation in #135       |
| metadata, versions, ownership, approval, and lifecycle          | #27                    | resolved; implementation in #133       |
| Trust, Evidence, and Compliance Centers                         | #29, #30, and #31      | resolved; implementation in #136–#138  |
| public/private, security, privacy, and claim boundaries         | #24 and #32            | resolved architecture                  |
| localization and search                                         | #33                    | resolved; implementation in #139       |
| GitHub and engineering-lifecycle traceability                   | #34                    | resolved; implementation in #140       |
| CI/CD, Cloudflare, DNS/TLS, acceptance, and rollback            | #35                    | resolved; implementation remains gated |
| migration inventory and plan                                    | #36                    | resolved plan; execution in #141       |
| dependencies, milestones, and bounded implementation issues     | #37 and #132–#142      | resolved plan; all issues remain Todo  |
| production platform delivery                                    | #40                    | existing external implementation issue |
| Platform Governance & Evidence content                          | #115                   | existing product delivery issue        |
| approval authority and exact document approval                  | #2                     | open and independently blocking        |

No Goal #15 capability is treated as implemented merely because its
architecture is complete.

## Consistency review

| Concern               | Package-wide invariant                                                                                       | Result |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| product model         | ModuLix, IO, Wunderbox, and Atlas are peer products; foundation topics are cross-product                     | pass   |
| publication boundary  | only `PUBLIC` or independently reviewed `PUBLIC_AFTER_SANITIZATION` may publish; uncertainty remains private | pass   |
| document identity     | stable IDs and canonical routes are unique; aliases use one-hop redirects                                    | pass   |
| lifecycle terminology | status, approval status, version, owner, approver, review, supersession, and retirement retain one meaning   | pass   |
| approval              | technical checks and AI review never substitute for role-authorized, exact-digest human approval             | pass   |
| evidence              | missing, failed, withheld, expired, revoked, and superseded evidence never becomes implicit success          | pass   |
| compliance claims     | mappings explain relationships and never assert certification, conformity, audit success, or risk acceptance | pass   |
| localization          | English is the operational source/fallback; translated publication requires owned human review               | pass   |
| search                | draft, restricted, stale, and unsupported content is partitioned or excluded according to explicit policy    | pass   |
| traceability          | mutable GitHub metadata is an observed snapshot; claims bind to immutable identities                         | pass   |
| delivery              | one validated artifact is promoted unchanged; preview and production remain separated and protected          | pass   |
| migration             | every source receives an explicit public-safe disposition; private content never enters this repository      | pass   |
| phase gate            | architecture approval in #38 precedes implementation; production has additional independent gates            | pass   |

The review found no unresolved contradiction between the authoritative
artifacts. Implementation must preserve these invariants and return any new
consequential decision to architecture review.

## Decision log

### Resolved

- Keep Docusaurus and the existing public repository rather than redesigning
  the platform from scratch.
- Preserve the four-peer-product model and use cross-product foundation
  sections for shared engineering, trust, evidence, compliance, and support.
- Use explicit canonical ownership, stable routes, controlled metadata, and
  independent approval bound to deterministic document digests.
- Separate public summaries and indexes from protected evidence and private
  operational records.
- Use framework-neutral compliance mappings without unsupported assurance
  claims.
- Use public GitHub metadata through an allowlist and immutable identifiers;
  never query private repositories from public workflows.
- Build once, promote the same artifact, use Cloudflare Pages Direct Upload,
  and keep production mutation behind protected environments and acceptance.
- Execute implementation through #132–#142, #40, and #115 only after their
  documented dependencies and gates are satisfied.

### Deferred

- Final service-level objectives, retention periods that require organizational
  authority, and provider recovery commitments remain owner decisions during
  their implementation issues.
- The exact production credential identities, account identifiers, zone
  identifiers, and protected evidence locations remain private implementation
  inputs.
- Product-specific content depth and translation rollout order are decided in
  the bounded implementation and migration issues, within the approved models.
- Production approval evidence and maintained document status remain deferred
  to #2 and the exact release candidate.

### Rejected

- Publishing private repositories, customer material, credentials, internal
  operations, risk registers, raw audit evidence, or restricted findings.
- Treating a closed issue, green workflow, AI review, mutable badge, or
  generated date as sufficient human approval or runtime proof.
- Cloudflare Git-based rebuilds for promotion, unpinned deployment clients,
  administrator bypasses, and token exposure to untrusted pull requests.
- Empty placeholder centers, invented evidence, silent translation fallback,
  silent partial GitHub data, and unsupported certification claims.
- Starting implementation merely because this package exists or #38 closes
  without the exact explicit authorization.

### Maintainer-owned decisions

- Approve or reject this exact package and, if approved, explicitly authorize
  the implementation phase in #38.
- Complete the role-to-identity authority decision and exact document approval
  record required by #2.
- Approve any material taxonomy exception, publication-boundary exception,
  production change, DNS/TLS mutation, credential use, residual-risk
  acceptance, or legal/compliance claim through its own authorized gate.

## Risk and assumption register

| ID   | Risk or assumption                                                                              | Status and control                                                                                 |
| ---- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| R-01 | restricted information could enter public content, evidence, cache, search, or logs             | blocking; #32 boundary, classification, sentinels, review, and fail-closed generation              |
| R-02 | architecture documents could be mistaken for implemented or production behavior                 | controlled; review-candidate metadata and explicit implementation verification                     |
| R-03 | mutable metadata or stale evidence could support a misleading claim                             | controlled; immutable IDs, observation times, lifecycle states, review, and digest binding         |
| R-04 | route/schema changes could break published references or approvals                              | controlled; compatibility, one-hop redirects, inventories, and migration fixtures                  |
| R-05 | deployment rebuild, drift, or credential scope could break artifact identity or least privilege | blocking at delivery; #35 preflight, protected environments, Direct Upload, evidence, and rollback |
| R-06 | single-maintainer operation reduces human independence                                          | accepted only within the documented compensating control; never extends to legal/risk authority    |
| R-07 | #2 authority and exact document approval are incomplete                                         | open blocker for maintained release and production publication; no substitute is permitted         |
| A-01 | Node 24.18.0 and the currently pinned package set remain available during implementation        | verify in #132/#40; architecture review if the toolchain materially changes                        |
| A-02 | public GitHub and Cloudflare capabilities used by the design remain available                   | verify through read-only preflight; fail closed on incompatible provider change                    |
| A-03 | accountable roles can supply bounded private decisions without publishing protected details     | verify at each gate; absence blocks the affected work                                              |

No risk acceptance is asserted by this public record. Only the authorized
owner may accept a residual risk, and protected details remain outside this
repository.

## Dependency and authorization state

Architecture issues #23–#37 are complete and integrated. The implementation
issues #132–#142 are open sub-issues of #15, in milestone
`docs.l-it.io Foundation v1.0`, labeled `phase:implement`, and held at project
status Todo. Existing issues #40 and #115 retain their own acceptance criteria.

[Issue #2](https://github.com/lightning-it/documentation/issues/2) remains open.
It requires authorized identities, role-matched decisions, an exact final
documentation-tree digest, and a passing approval test. Its remaining
constraint blocks maintained document approval and production publication. An
architecture decision in #38 does not close, waive, or substitute for #2.

The authorized maintainer must review this complete package, the source commit,
the manifest digest, the issue breakdown, and the open constraints. Until that
human records an explicit implementation authorization in #38:

- #132–#142, #40, and #115 remain blocked;
- no implementation branch or pull request may start;
- no production, DNS, credential, migration, or external-source mutation may
  occur; and
- closure, merge, or an automated comment is not approval.

If the package is rejected, #38 records the rejected decisions and returns the
affected artifacts to their accountable owners. If it is approved, each
implementation issue may proceed only when its own dependencies and safety
gates are also satisfied.
