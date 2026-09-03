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
documentation for five sellable products:

1. AIO;
2. Wunderbox;
3. Workbench;
4. Atlas; and
5. Platform Governance & Evidence.

ModuLix is the shared technical engineering and automation foundation. It is
not a sixth sellable product. IO is not an independent sellable product;
existing IO routes remain transitional until the governed migration in Issue
[#135](https://github.com/lightning-it/documentation/issues/135) assigns their
content and redirects without silently breaking published links.

Never describe ModuLix as a sellable peer product or one sellable product as a
child of another. Product marketing belongs on `l-it.io`; customer workflows
belong in the customer portal; private operations remain in approved private
repositories.

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

```text
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
- Product pages use the canonical namespaces approved through Issue #135.
  Existing `docs/modulix` and `docs/io` content is transitional: retain it
  until that issue records canonical ownership, migration, and redirects.
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

<!-- LIT REP-60 review governance: start -->
<!-- cspell:ignore litroc -->

## REP-60 current-revision review governance

- Local validation is deterministic only. It must never invoke Codex, GitHub
  Copilot, another model, or an external AI endpoint. Authoritative AI review
  runs only in the protected GitHub pipeline and binds the exact PR head.
- Lightning IT automation may request and fund one GitHub Copilot review only
  when the exact PR author is `litroc`, and only at the finalization boundary;
  intermediate `synchronize` pushes must not trigger AI review. Any finding
  requires correction and a final current-head re-review. The request is
  consumed once per head; unavailable or quota-blocked reviews fail closed
  without an automatic retry. Organization-funded Codex remediation and its
  single re-review are likewise restricted to `litroc`.
- Every other human or external contributor supplies any required current-head
  Copilot review under their own entitlement and cost. Lightning IT verifies
  valid evidence but never requests or funds that review, and personal tokens or
  provider keys never enter Actions.
- A same-repository PR authored exactly by
  `lightning-it-release-automation[bot]` uses only the protected MLX-90 §7.2
  Exact-Revision Codex check. It must never request Copilot or synthesize a
  Copilot success.
- A proven ancestry-only main-to-develop backmerge uses the deterministic
  evidence-bound exemption and performs zero AI calls. Unknown automation
  identities fail closed.
- The only neutral merge-gate result is `Current revision review`. Missing,
  stale, ambiguous, or unresolved review evidence blocks the merge.

<!-- LIT REP-60 review governance: end -->

<!-- LIT REP-60 evidence lifecycle: start -->

### REP-60 evidence lifecycle (mandatory)

- Every pull request into `develop` retains its exact-final-head native GitHub
  CI, required-check, and review history as the authoritative evidence for
  acceptance into `develop`.
- A pull request into `develop` MUST NOT create or retain an additional durable
  release-evidence package, duplicate WORM artifact, or second AI-review
  evidence outside that native GitHub history.
- Only the protected `develop` to `main` promotion creates exactly one durable,
  complete release-evidence package. It binds the full integrated promotion
  diff, base, head, merge base, integration tree, policy, reviewer result, and
  all release and audit checks.
- Agents, workflows, and repository-local rules MUST NOT duplicate that durable
  evidence per `develop` pull request or invoke local AI to create evidence.
  Repository-local rules may only make this lifecycle stricter.

<!-- LIT REP-60 evidence lifecycle: end -->

<!-- LIT Devtools container governance: start -->

## Devtools container execution boundary

- Every deterministic lint, format, type-check, test, build, packaging,
  policy, and validation workload runs in the digest-pinned Lightning IT
  Devtools image, locally and in CI. Host-language runtimes never provide
  acceptance evidence.
- The host boundary is limited to Git, the supported container engine, and the
  centrally managed Devtools, push-ready, and pre-commit dispatchers. A
  dispatcher may inspect Git state and start the pinned container, but it must
  not execute a repository validator through host Python, Node.js, Ansible,
  Ruff, a Python type checker, markdownlint, Renovate, or a comparable host
  runtime.
- If a required command or compatible version is absent, fail closed. Add and
  pin it in `container-ee-wunder-devtools-ubi9`, release that image normally,
  update the centrally managed digest, and rerun the gate. Host fallbacks,
  ad-hoc virtual environments, and unpinned helper images are forbidden.
- Repository-owned tests derive the exact full Devtools image reference from
  the centrally managed push-ready engine when checking the installed wrapper;
  they never hard-code an independent release tag that can drift during a
  normal image rollout.
- A target-specific regression test that asserts managed Devtools-wrapper
  arguments is the same atomic managed unit as the wrapper. Both synchronize
  through an exact source binding, and only an explicitly digest-allowlisted
  predecessor may be replaced; unknown target test content fails closed.
- Defaults stay read-only, offline, socket-free, capability-dropped, and
  non-privileged. A gate may opt into only its explicit tested minimum. Linked
  Git metadata remains read-only and container Git may trust only
  `/workspace`, never `*`. Executable temporary fixtures use the isolated
  container home while generic `/tmp` remains non-executable.
- The Devtools boundary never makes local Codex, Copilot, or other model calls
  and never receives personal AI credentials.

<!-- LIT Devtools container governance: end -->

<!-- LIT AI task governance: start -->

## AI model and token governance

Apply `LIT-GEN-GDR-GOV-30-Budget-Conscious-AI-Model-Selection` to every
substantive Codex or ChatGPT-assisted task. Before investigation, planning, tool
use, implementation, or delegation, record a compact task profile in the task
chat: work item, risk (`low`, `normal`, or `high`), smallest sufficient
model/reasoning choice, rationale, and a concrete escalation condition.

- Use the balanced, lowest reliable capability by default. Escalate to a
  premium/frontier model or higher reasoning only for a high-risk decision,
  complex architecture/debugging/dependencies, or a documented focused failure
  of the standard approach. Restrict that escalation to the difficult subtask.
- Never use Speed Mode. Do not replace verification with a more expensive model
  or sacrifice quality to reduce elapsed time.
- Retrieve only relevant issue, files, logs, and source records; avoid broad
  repository or chat-history loading, speculative analysis, and unbounded retry
  loops. Delegate only independent, bounded work that reduces total effort.
- For GitHub or Jira work, include the task profile in the issue/task record
  when AI assistance materially affects execution. Close with verification and
  remaining risks; preserve durable decisions in Confluence, Jira, or GitHub.

<!-- LIT AI task governance: end -->
