---
id: trust-center-model
title: Public Trust Center model
description: Define the Trust Center structure, claim types, ownership, evidence links, review model, and publication safety rules.
slug: /architecture/trust-center-model/
sidebar_position: 10
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - customers
    - partners
    - security reviewers
    - compliance reviewers
    - engineering contributors
  last_reviewed: "2026-07-25"
  review_cadence: annual
---

<!-- cspell:words SLSA Sigstore -->

# Public Trust Center model

This planning record defines how a public Trust Center may communicate verified
engineering and governance facts without exposing restricted material or
turning plans into claims. It creates no public Trust Center routes and asserts
no certification, control effectiveness, production state, or product feature.

## Purpose and boundary

The Trust Center helps a reader understand how Lightning IT says work should be
governed, what public implementation is verifiable, which evidence supports a
bounded claim, who remains accountable, and which limitations apply.

It is not:

- a repository for private risk registers, findings, threat models, customer
  evidence, audit work papers, credentials, topology, incident detail, or
  operational runbooks;
- a blanket assertion that a process applies to every product or release;
- a substitute for an auditor, certification body, contract, or current
  production verification; or
- permission to publish sanitized material without the independent review
  required by `AGENTS.md`.

## Canonical structure and ownership

| Section                             | Required topics                                                                                                | Accountable role             | Canonical target                  |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------- |
| Principles and accountability       | Engineering Principles; Human Accountability; Known Limitations                                                | Engineering Governance Owner | `/trust/principles/`              |
| Development lifecycle               | Software Development Lifecycle; Secure Development Lifecycle; Branching; Pull Requests; Code Review            | Engineering Process Owner    | `/trust/development/`             |
| AI-assisted engineering             | AI-assisted Engineering Workflow; AI Review Process; human decision gates                                      | AI Governance Owner          | `/trust/ai-assisted-engineering/` |
| Quality and testing                 | Testing Strategy; Quality Gates; Quality Metrics                                                               | Quality Owner                | `/trust/quality/`                 |
| Release and maintenance             | Release Process; Artifact Promotion; Supported Versions; Product Lifecycle; Maintenance Policy                 | Release Owner                | `/trust/releases/`                |
| Security and vulnerability handling | Security Policy; Vulnerability Management; Responsible Disclosure                                              | Security Owner               | `/trust/security/`                |
| Dependency and supply chain         | Dependency Management; Renovate Policy; Supply-chain Security; SBOM Strategy                                   | Supply-chain Owner           | `/trust/supply-chain/`            |
| Assurance frameworks and formats    | OpenSSF Adoption, Scorecard, Best Practices; `SLSA`; SPDX; CycloneDX; `Sigstore`; Provenance; Artifact Signing | Assurance Owner              | `/trust/assurance/`               |
| Build integrity                     | Reproducible Builds and artifact identity                                                                      | Build and Release Owner      | `/trust/build-integrity/`         |
| Compliance positioning              | claim boundary and links to canonical framework mappings                                                       | Compliance Owner             | `/trust/compliance-positioning/`  |
| Evidence and document governance    | Evidence Retention; Document Governance; approval and publication model                                        | Evidence/Documentation Owner | `/trust/governance/`              |

Each target is one landing page with owned child pages only when the material is
substantial. The current Security, Governance, Release, OpenSSF, and Compliance
pages remain canonical during transition. A Trust Center implementation links
or moves them with redirects; it does not copy normative content.

## Trust topic contract

Every topic contains:

1. purpose, audience, scope, products/versions covered, and exclusions;
2. accountable owner and authorized approval role;
3. one or more typed statements using the claim model below;
4. public authority and evidence links for objective claims;
5. limitations, exceptions, and not-applicable cases;
6. last verification, review cadence, event-driven triggers, and lifecycle
   status; and
7. related product, evidence, compliance, release, support, and governance
   links.

A page with no safe, useful public content is omitted. Its absence may be
recorded as an owned gap without disclosing why material is restricted.

## Claim model

Every consequential statement has exactly one visible claim type:

| Claim type               | Meaning                                                           | Required support                                                      |
| ------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| `policy`                 | approved rule or intent governing future and current decisions    | policy owner, scope, approval, effective date                         |
| `documented-process`     | defined repeatable procedure, not proof it ran                    | process owner, inputs, outputs, exception path                        |
| `current-implementation` | capability or control verified in a named current scope/revision  | public evidence, verification date, product/version applicability     |
| `target-state`           | accepted architectural destination not yet represented as current | accepted decision/ADR and implementation gate                         |
| `planned-improvement`    | proposed or scheduled work                                        | issue/roadmap reference; no completion language                       |
| `objective-evidence`     | immutable observation or validation result                        | provenance, subject, revision/digest, method, result, time, limits    |
| `external-verification`  | conclusion issued by an independent authorized external party     | issuer, exact scope, validity period, public source, limitations      |
| `unverified`             | statement awaiting adequate support                               | owner, reason, verification action; excluded from affirmative summary |
| `not-applicable`         | topic deliberately does not apply to the stated scope             | rationale, accountable owner, review trigger                          |

Page metadata records the page lifecycle, not the truth type of every claim.
Claim blocks or machine-readable relationships carry type, scope, evidence, and
verification state. Current and target statements must not share an unlabeled
list, table column, or summary.

## Objective-claim invariant

An objective claim is publishable only when a reader can determine:

- the precise subject, product, component, and supported version;
- what was observed, by which public method, and at which revision or digest;
- when it was verified and when review expires or is triggered;
- the accountable human role;
- the public-safe evidence identifier and canonical evidence record; and
- material limitations, exceptions, unavailable evidence, or uncertainty.

If any element is missing, label the statement `unverified`,
`planned-improvement`, or `target-state`, or omit it. Code presence, workflow
configuration, a successful preview, an AI statement, or an issue closure alone
does not establish current production behavior or control effectiveness.

## Human accountability and AI assistance

The Trust Center describes AI tools as bounded participants:

| Activity                  | AI-assisted role                                 | Human accountability                                      |
| ------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| Discovery and drafting    | analyze public inputs, propose text and mappings | owner selects scope, validates sources, classifies output |
| Design and implementation | propose options or changes                       | maintainer accepts consequential decisions                |
| Review                    | identify possible defects and inconsistencies    | reviewer verifies findings and disposition                |
| Validation                | invoke deterministic tools and summarize results | owners define gates; tool evidence remains authoritative  |
| Approval and promotion    | prepare evidence and status                      | authorized human approves exact scope and production gate |

AI does not approve documents, accept risk, waive policy, determine
classification alone, assert certification, bypass required checks, or replace
named human ownership. Prompt or agent logs are not published when they contain
restricted context.

## Evidence and cross-linking

- Trust pages link to the Evidence Center by stable evidence ID and typed
  relationship; they do not embed mutable result copies.
- Evidence records link back to every bounded claim they support and never
  infer a wider scope.
- Compliance pages map public authorities to claims and evidence but remain
  canonical for framework interpretation.
- Product pages link to applicable Trust topics with explicit
  product/version scope; a portfolio Trust page does not automatically apply.
- Policies and processes link to implementation evidence separately.
- External verification links directly to the issuer's public record where
  possible and records validity dates.

## Ownership, review, and lifecycle

The accountable topic owner reviews on the stricter of the metadata cadence or
an event trigger. Triggers include policy, workflow, branch, dependency,
supported-version, product scope, evidence, public authority, external
verification, incident-disclosure, owner, or claim-status change.

Approval follows #27: metadata never proves approval without authorized
evidence for the exact document set and digest. Publication additionally
requires deployment acceptance. A stale evidence relationship moves the
affected claim to `unverified` or the page to review-candidate until resolved.

Deprecation identifies the successor, coverage loss, effective date, and
evidence-retention effect. Withdrawal is immediate when continued publication
would be unsafe or misleading and creates an attributable private decision plus
a public-safe status if appropriate.

## Publication-safety rules

Never publish:

- secrets, credentials, customer or personal data;
- exploit-enabling findings, private vulnerability detail, attack paths, or
  security-sensitive configuration;
- private infrastructure identifiers, topology, control weaknesses, risk
  acceptances, audit work papers, or incident timelines;
- complete restricted scanner logs, threat models, penetration-test reports, or
  operational recovery instructions; or
- unsupported statements such as secure, compliant, certified, tamper-proof,
  reproducible, signed, continuously monitored, or highly available.

Publish a safe summary only when useful: bounded method, subject, result,
revision, date, owner, limitations, and public evidence digest. When uncertainty
remains, treat the source as private.

## Validation and acceptance

Implementation validation must verify:

- every required #15 topic maps to one canonical location and accountable role;
- every claim has one controlled type and current/target presentation is
  visually and semantically distinct;
- objective claims have valid scoped evidence or an explicit non-affirmative
  state;
- no duplicate normative content or orphan topic exists;
- restricted patterns and unsafe claim language are blocked;
- product/version relationships, owners, review dates, triggers, external
  validity, links, routes, navigation, search, and accessibility pass; and
- approval and production state derive from exact evidence.

## Transition and open decisions

During transition, existing canonical pages remain in place and this model is
planning-only. #30 defines evidence records and retention; #31 defines
compliance mappings; #34 defines GitHub-derived traceability; #35 defines
release and production evidence.

Issue #38 must approve the final Trust Center routes, topic consolidation, claim-block
representation, owner registry, and migration/redirect plan. Implementation
must then inventory every statement as retain, link, rewrite, mark unverified,
restrict, or remove.
