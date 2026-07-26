---
id: public-private-security-architecture
title: Public and private content security architecture
description: Govern classification, publication, declassification, privacy review, and public-safe risk treatment.
slug: /security/public-private-security-architecture/
sidebar_position: 3
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - documentation contributors
    - security and privacy reviewers
    - product owners
  last_reviewed: "2026-07-25"
  review_cadence: semiannual
---

# Public and private content security architecture

This target architecture governs public documentation, protected source
material, migration work, build output, search data, and publication evidence.
Uncertainty remains private.

## Classification and allowed locations

Classify both the name and content of every source, link, asset, archive,
generated artifact, and evidence item.

| Class                       | Public repository or site                      | Protected destination                          |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `PUBLIC`                    | proposal allowed after normal review           | optional authoritative copy                    |
| `PUBLIC_AFTER_SANITIZATION` | independently reviewed transformed output only | original, mapping, and review evidence         |
| `PRIVATE_INTERNAL`          | prohibited                                     | approved internal knowledge or evidence system |
| `PRIVATE_CUSTOMER`          | prohibited                                     | approved customer-scoped system                |
| `SECRET_OR_CREDENTIAL`      | prohibited                                     | approved secret store and incident process     |
| `OBSOLETE`                  | not current content                            | retained or disposed under its lifecycle       |
| `DUPLICATE`                 | canonical safe topic only                      | disposition and provenance record              |
| `UNRESOLVED`                | prohibited                                     | protected triage until classified              |

Public evidence may identify an issue, pull request, public commit, public
workflow run, sanitized result, reviewer role, date, and deterministic digest.
Protected evidence includes original assessment material, detailed findings,
risk decisions, customer context, private provenance, and recovery material.

## Publication decision path

1. An owner inventories and classifies the complete input, including metadata
   and history.
2. A transformer re-authors only the useful public meaning. Redaction alone is
   insufficient when context can reconstruct protected data.
3. Semantic, technical, security, privacy, licensing, and claim reviews apply
   in proportion to the content.
4. An independent information-protection reviewer verifies the transformed
   result, links, assets, build output, and search index.
5. An authorized reviewer approves the exact document identifiers and digest.
6. Protected-branch and deployment gates publish the immutable candidate.
7. Production verification confirms the intended revision and absence of
   disclosure.

A failed or incomplete gate returns the item to protected triage. A deadline,
technical feasibility, or prior publication does not declassify it.

## Declassification

Declassification requires an accountable data owner, documented original class,
specific public purpose, transformation record, independent security and
privacy review, retention decision, and approval for the exact output. The
public record contains only a safe aggregate provenance statement. The
protected record retains source identity, checksums, mappings, reviewers,
findings, and the decision.

Re-review after a source, purpose, audience, claim, dependency, generator, or
publication target changes. Withdrawal removes public availability where
possible but does not assume caches or clones can be recalled.

## Protected data controls

Do not publish:

- secrets, credentials, tokens, encrypted secret payloads, or realistic secret
  examples;
- customer identities, inventories, configurations, evidence, delivery
  records, or contractual detail;
- detailed findings, accepted risks, residual-risk decisions, incident facts,
  or protected risk registers;
- private repository, knowledge-system, file, or source paths;
- internal hostnames, addresses, account or zone identifiers, topology, origin
  details, escalation paths, or recovery material;
- screenshots without a visible-content, filename, metadata, license, and
  provenance review;
- archives, hidden files, source maps, logs, build caches, or generated indexes
  that can reconstruct protected input.

Use only the synthetic identifiers and reserved address ranges in `AGENTS.md`.
Prefer maintainable text or an accessible Mermaid diagram over a screenshot.
Treat SVG as active content. Scan the final build and search index, not only
source Markdown.

## Claim and assurance controls

Every public statement needs an approved public authority and a bounded scope.
Do not infer a capability from code, a preview, a tool name, or private
evidence. Do not make unsupported certification, conformity, compliance,
security, audit-success, service-level agreement, technology, performance,
roadmap, pricing, or product claims.

Assessment or acceptance applies only to the agreed scope, controls, checks,
artifacts, and evidence. A standards mapping describes a method; it does not
claim implementation, certification, risk acceptance, or absolute security.

## Threat and misuse review

| Scenario                                                | Public-safe treatment                                                     | Accountable role                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------- |
| Secret or customer disclosure                           | layered source, history, build, and search scanning; fail closed          | Security and Compliance Maintainers |
| Re-identification from sanitized detail                 | minimize fields; independent context review                               | Privacy reviewer                    |
| Protected topology reconstructed from links or diagrams | synthetic examples; topology review                                       | Security reviewer                   |
| Misleading assurance or product promise                 | source-bound claims and explicit limits                                   | Product Owner                       |
| Stale instructions cause unsafe action                  | review cadence, event triggers, safe stops, retirement                    | Document owner                      |
| Screenshot, archive, or generator leaks metadata        | inspect, strip, regenerate, and scan final output                         | Information-protection reviewer     |
| Dependency or workflow compromise alters output         | pinned actions, locked dependencies, least privilege, immutable artifacts | Repository maintainer               |
| Search, sitemap, preview, or source map exposes drafts  | build allowlist, preview `noindex`, generated-output tests                | Documentation maintainer            |
| Public evidence reveals a protected finding or risk     | publish aggregate outcome only; retain detail privately                   | Risk owner                          |

## Public-safe risk register

Detailed likelihood, impact, findings, treatments, residual risks, and
acceptance decisions remain in an approved protected register. This public view
records only risk themes, treatment expectations, owners, and review triggers.

| Risk theme                | Required treatment                                           | Owner                               | Review trigger                     |
| ------------------------- | ------------------------------------------------------------ | ----------------------------------- | ---------------------------------- |
| Unauthorized disclosure   | classification, minimization, scanning, independent review   | Security and Compliance Maintainers | content or publication-path change |
| Privacy harm              | purpose limitation, de-identification, context review        | Privacy reviewer                    | new data category or audience      |
| Unsupported assurance     | approved claim authority, scope limits, evidence binding     | Product Owner                       | claim or source change             |
| Stale or unsafe guidance  | lifecycle owner, scheduled and event review, withdrawal path | Document owner                      | implementation or risk change      |
| Supply-chain manipulation | lock, pin, least privilege, reproducible build, provenance   | Repository maintainer               | dependency or workflow change      |
| Evidence integrity loss   | immutable identifiers, digest binding, protected originals   | Evidence owner                      | evidence process change            |

No public entry means a risk has been accepted. Acceptance requires an
authorized human decision in the protected register. A protected escalation
path is used when classification, ownership, treatment, or authority is
uncertain; public documentation does not identify that internal path.

## Review checklist

The security and privacy reviewer confirms:

- source and output classes, purpose, owner, audience, and allowed destination;
- data minimization and resistance to reconstruction or re-identification;
- secrets, customer data, evidence, findings, risks, paths, topology, assets,
  archives, and generated-output controls;
- source-bound claims and explicit assurance limits;
- dependency, workflow, preview, search, deployment, and evidence protections;
- rollback, withdrawal, retention, and re-review triggers; and
- a protected record for any detailed finding, unresolved decision, residual
  risk, or acceptance.
