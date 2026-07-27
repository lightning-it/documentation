---
id: governance-release-licensing-baseline
title: Governance, release, and licensing baseline
description: Reconcile repository authority, publication, branch, release-evidence, licensing, and terminology decisions.
slug: /architecture/governance-release-licensing-baseline/
sidebar_position: 5
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation architects
    - repository maintainers
    - release reviewers
  last_reviewed: "2026-07-25"
  review_cadence: annual
---

# Governance, release, and licensing baseline

This planning record reconciles verified current state with the target decisions
needed by Goal #15. Apart from adding this page to the documentation site, it
changes no license declaration, production setting, branch protection,
deployment configuration, or other repository policy.

## Authority order

Safety and publication boundaries in `AGENTS.md` remain authoritative.
Maintainer decisions may satisfy gates but cannot waive those boundaries.
`CODEX_EXECUTION_GUIDE.md` governs phase and execution. The assigned issue and
accepted architecture records define scoped work. Repository code and workflow
behavior are evidence of implementation, not proof of production state.

Issue #2 remains the single governance gate for approval authority and exact
documentation-digest decisions. No duplicate approval-authority issue is
created.

## Reconciled decisions

| Topic                       | Verified current state                                                                                      | Target decision                                                                                                                                       | Owner and follow-up                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Repository classification   | public `generic_managed`; release and artifact type `none`                                                  | retain until an implementation issue changes central inventory                                                                                        | Repository Maintainer                                         |
| Publishing target           | `.lit/repository.yml` lists no packaged publishing target; workflows and architecture publish a static site | treat `docs.l-it.io` as documentation deployment, not a package registry artifact                                                                     | Documentation Maintainer; #35/#40                             |
| Branch model                | GitHub default and integration branch `develop`; stable production branch `main`                            | feature PRs target `develop`; promotion `develop` → `main` remains a manual protected gate; backmerge restores parity                                 | Repository Maintainer                                         |
| Production promotion        | Cloudflare production is associated with protected stable state                                             | build one immutable candidate and promote only after validation, approval, and environment protection                                                 | Production Approver; #35/#40                                  |
| Release evidence            | disabled for packaged release artifacts                                                                     | retain `release_evidence: false`; require separate documentation deployment and production-acceptance evidence                                        | Evidence Owner; #30/#35/#40                                   |
| Document approval           | exact-digest mechanism and single-maintainer exception exist                                                | reuse #2; existing evidence never approves changed document sets                                                                                      | Authorized reviewer; #2                                       |
| License file                | `LICENSE` and GitHub metadata identify MIT                                                                  | MIT is the target repository license unless an authorized legal owner decides otherwise                                                               | Repository Maintainer; implementation reconciliation required |
| Package metadata            | At planning approval, `package.json` declared a license inconsistent with MIT                               | normalize to MIT through reviewed implementation issue #132                                                                                           | Repository Maintainer                                         |
| Contributor and README text | At planning approval, contributor and README text conflicted with the MIT badge and file                    | normalize to the accepted MIT target through reviewed implementation issue #132                                                                       | Repository Maintainer                                         |
| Third-party material        | license checker and generated notices exist                                                                 | preserve each dependency or asset license and attribution independently of repository license                                                         | Documentation Maintainer                                      |
| Product terminology         | current files describe ModuLix, IO, Wunderbox, and Atlas; #28 proposes a target of five sellable products   | current terminology stays effective until #38 explicitly approves an integrated target; implementation then reconciles all public surfaces atomically | Product Owner; #38 and implementation issues                  |

## Publication and release boundary

A source merge to `develop`, a preview, or a successful build is not production
publication. `main` promotion and Cloudflare deployment are separate,
protected, attributable actions. Documentation publication evidence records the
issue, pull request, exact source commit, document IDs and digest, workflow
runs, artifact digest, deployment, public acceptance, and rollback candidate.
This evidence is required even though packaged release evidence remains
disabled.

No public evidence record includes credentials, Cloudflare account or zone
identifiers, private source locations, customer data, raw protected findings,
or restricted logs.

## Licensing resolution plan

The authoritative target is MIT because the repository's `LICENSE`, GitHub
license detection, README badge, and managed repository inventory agree. The
contradictory package and contributor-facing values recorded during planning are a
confirmed implementation gap.

One later implementation issue must:

1. confirm legal-owner authority for the target;
2. update `package.json`, `CONTRIBUTING.md`, and README license prose together;
3. retain the MIT `LICENSE` text and third-party notices;
4. run repository, license, build, and generated-notice checks; and
5. verify GitHub metadata and managed central inventory remain consistent.

This architecture PR does not perform those changes.

## Required decision records

| Decision                                              | Record                                                |
| ----------------------------------------------------- | ----------------------------------------------------- |
| Static Docusaurus and local Pagefind architecture     | existing `ARCHITECTURE.md`; formalized by #25         |
| Public/private trust boundary                         | accepted #32 architecture                             |
| Product taxonomy and ModuLix role                     | maintainer decision in integrated #38 package         |
| Immutable promotion and Cloudflare authentication     | #35 architecture and ADR proposal where consequential |
| Exact-digest approval and single-maintainer exception | `AGENTS.md`, authority evidence, and issue #2         |
| Repository-license normalization                      | this target decision plus later implementation PR     |

## Resolved contradictions

- Package release evidence and documentation deployment evidence are different
  controls; disabling the former does not remove the latter.
- `develop` is the feature integration target; `main` is the protected stable
  promotion target.
- Repository configuration can show a deployment design, but only external
  acceptance proves production.
- Existing approval evidence is digest-bound and cannot cover newly added
  architecture or product pages.
- The target product taxonomy is not implemented or effective until #38 records
  the authorized decision.

No unresolved decision in this record authorizes implementation. Consequential
target decisions flow into #38 for explicit maintainer approval.
