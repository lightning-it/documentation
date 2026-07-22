# Documentation authoring and safety baseline

This file is authoritative for human and AI-assisted changes to the public
Lightning IT documentation platform.

## Codex execution policy

Before accepting or executing a GitHub issue, read and follow
[CODEX_EXECUTION_GUIDE.md](./CODEX_EXECUTION_GUIDE.md). It defines the durable
issue workflow, dependency gates, model and reasoning selection, cost controls,
validation, pull-request handoff, and human approval boundaries for Codex work.

Treat the assigned issue body as the execution contract. Do not ask the user to
repeat scope or acceptance criteria already recorded there. Stop and record the
blocker when a dependency, publication decision, credential, external authority,
or maintainer approval is missing. Model capability never overrides the
publication boundary, phase constraints, required review, or human decision
authority in this file.

## Scope and product model

This public repository owns conceptual, cross-product, and public technical
documentation for four peer products:

| Product   | Position                | Conceptual verb |
| --------- | ----------------------- | --------------- |
| ModuLix   | Automation Content      | Build           |
| IO        | Automation Runtime      | Run             |
| Wunderbox | Infrastructure Platform | Host            |
| Atlas     | Observability Platform  | Observe         |

Never describe one of these products as a child of another. Product marketing
belongs on `l-it.io`; customer workflows belong in the customer portal; private
operations remain in approved private repositories.

## Non-negotiable publication boundary

Every new or migrated source and embedded asset must be classified from both
its name and content as one of:

- `PUBLIC`
- `PUBLIC_AFTER_SANITIZATION`
- `PRIVATE_INTERNAL`
- `PRIVATE_CUSTOMER`
- `SECRET_OR_CREDENTIAL`
- `OBSOLETE`
- `DUPLICATE`
- `UNRESOLVED`

Only `PUBLIC`, and independently reviewed `PUBLIC_AFTER_SANITIZATION`, may be
committed here. Treat uncertainty as private. Never publish credentials,
customer or environment data, internal infrastructure details, private
repository locations, operational escalation paths, security findings,
accepted-risk evidence, audit evidence, recovery material, or secrets hidden
in history, metadata, archives, screenshots, diagrams, generated artifacts, or
hidden files.

Sanitized examples use only `example.com`, its subdomains, RFC 5737 IPv4
addresses (`192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`), RFC 3849 IPv6
addresses (`2001:db8::/32`), and explicit names such as `customer-example` and
`host01.example.com`. Never invent realistic-looking Lightning IT details.

Before adding an image, inspect visible content, filename, metadata, license,
and provenance; strip metadata; optimize it; and provide useful alt text. Do
not publish screenshots when text or a maintainable Mermaid diagram is enough.
Sanitize SVG as active content, not as a harmless image format.

## Documentation baseline

Substantial pages use proportionate front matter:

```yaml
---
id: stable-document-id
title: Human-readable title
description: One-sentence purpose.
slug: /stable/path
sidebar_position: 10
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform engineers
  last_reviewed: 2026-07-14
  review_cadence: annual
---
```

New or materially changed content starts as `status: review-candidate` with
`approval_status: pending`. The `approver` field names the accountable role; it
does not assert that approval already happened. A contributor may propose the
pair `status: maintained` and `approval_status: approved`, but it becomes
effective only when authorized review evidence covers the exact deterministic
documentation-tree digest and document identifiers being released. Independent
review is the default. While the protected authority policy records that only
one human maintainer is available, that named maintainer may approve their own
documentation under the single-maintainer exception only after Copilot has
reviewed the exact current pull-request revision, every finding is resolved,
and every required check is successful. This exception is a documented
compensating control for document publication; it never grants legal approval,
risk acceptance, certification authority, or permission to publish protected
material. After the content and proposed status are final, generate the
candidate record with `npm run approval:request`; an authorized CODEOWNER then
records a role-matched decision for every covered document in
`evidence/document-approval.json` without changing the reviewed documents. The
reviewer must be authorized for the document's declared `approver` role by the
protected `evidence/document-approval-authorities.json` policy. One identity may
cover multiple roles only when the organization explicitly authorizes it for
each role. Any subsequent documentation change invalidates the digest and
requires a new request and review. Outside the explicitly authorized
single-maintainer exception, technical validation, an AI review, a generated
date, or the author's own review is not a substitute for approval.

Short indexes and narrow reference pages may use a smaller metadata set when
ownership and review inherit unambiguously from their section index. Metadata
must not obscure the technical content.

Where applicable, a document also states scope, prerequisites, assumptions,
related documents, creation source/date, next review, change-history source,
implementation-verification status, retention/lifecycle, and stable document
identifier. Operational procedures additionally include authorization,
preflight, destructive-action warnings, safe-stop points, verification,
rollback/recovery, and evidence handling.

Use clear language for the intended audience. Define acronyms on first use.
Commands must be accurate and testable, examples must state their assumptions,
links must resolve, and headings must form a logical hierarchy. Never imply
that code presence proves runtime implementation.

## BSI-oriented permanent requirements

Documentation must, where applicable:

- have an unambiguous owner and responsible role;
- be reviewed and approved before maintained release, be versioned, and remain
  traceable to change history;
- record creation, review, approval, and periodic/event-driven review needs;
- remain understandable for its audience and reflect the implemented state;
- be protected from unauthorized modification and disclosure;
- remain available in proportion to operational relevance;
- identify deviations, unmet requirements, compensating controls, and accepted
  residual risks without publishing protected registers or evidence;
- connect architecture, operation, security, backup, recovery, lifecycle, and
  decommissioning information;
- define retention and lifecycle handling; and
- support auditability and reproducibility.

Public mappings may explain relationships to BSI Standards 200-1 (information
security management systems), 200-2 (IT-Grundschutz methodology), 200-3 (risk
analysis), 200-4 (business continuity management), applicable current
IT-Grundschutz modules, and ISO/IEC 27001 where Lightning IT actually uses it.
Module applicability is determined per target object and current Compendium;
do not invent an applicability statement. Do not claim certification,
conformity, control implementation, audit success, or risk acceptance without
verified authorization. Public mappings describe an approach, never private
evidence, risk registers, customer controls, or audit records.

## Architecture and content placement

- Cross-product concepts live below `docs/architecture`, `docs/security`,
  `docs/compliance`, `docs/reference`, `docs/releases`, and `docs/support`.
- Product pages live below `docs/modulix`, `docs/io`, `docs/wunderbox`, and
  `docs/atlas` with only meaningful sections.
- Code-specific setup and contributor instructions remain in the component
  repository and are linked rather than duplicated.
- Generated references record a public source repository and immutable commit.
- MDX is reserved for justified interactive components.
- One canonical page owns each topic; consolidate duplicates and add a direct
  redirect only for a previously published stable path.

Do not create empty pages, roadmap promises presented as features, or technical
claims unsupported by public source. A known content gap belongs in an issue
with an owner, not in a placeholder page.

## Accessibility and style

Target Web Content Accessibility Guidelines (WCAG) 2.2 AA. Preserve semantic
HTML, logical headings, keyboard operability, visible focus, labels, contrast,
reduced motion, meaningful link text, table headers, accessible admonitions,
and alt text. Never convey essential meaning by color alone.

Prefer concise prose, task-oriented headings, fenced code blocks with a
language, tables only for genuine comparisons, and admonitions for material
risk. Avoid unexplained jargon, marketing language, excessive animation,
generic imagery, and browser-dependent instructions.

## Security and dependency rules

- Commit `package-lock.json` and use `npm ci`.
- Do not add a dependency when platform code or an existing dependency is
  sufficient.
- Pin every GitHub Action and reusable workflow to a full commit SHA.
- Keep workflow permissions read-only by default and job-specific when writes
  are required.
- Never expose deployment credentials to fork pull requests.
- Do not run arbitrary remote scripts or use `curl | sh`.
- Never commit Cloudflare, GitHub, or other credentials.
- Treat migration and build evidence according to its classification; public
  evidence must contain no private filenames, values, or environment details.

## Required change workflow

1. Read the nearest `AGENTS.md` before editing.
2. Inventory and classify any source material before reuse.
3. Update content, metadata, navigation, redirects, tests, and migration records
   in the same change.
4. Run `npm run validate` and `git diff --check`.
5. Inspect the production build and Pagefind search index.
6. Review the complete diff for sensitive data, misleading assurance claims,
   broken links, inaccessible interaction, and generated artifacts.
7. Use a pull request; self-approval is allowed only under the documented
   single-maintainer exception and its compensating controls.
8. Delete private-source documentation only after all migration, private
   retention, preview, production, recovery-reference, and acceptance gates
   have passed.

Never weaken a quality gate to admit known-bad content. Fix the content or
record a narrowly scoped, reviewed exception outside this public repository.
