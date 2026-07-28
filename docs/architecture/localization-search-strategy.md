---
id: localization-search-strategy
title: Localization and search strategy
description: Define canonical language, translation governance, version-aware indexing, privacy, accessibility, and deterministic search behavior.
slug: /architecture/localization-search-strategy/
sidebar_position: 11
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - documentation architects
    - translators
    - product owners
    - accessibility reviewers
  last_reviewed: "2026-07-28"
  review_cadence: annual
---

# Localization and search strategy

This planning record defines the target English/German localization and public
search model. Current content remains English-only and the existing local
Pagefind index remains authoritative until #38 approves implementation.

## Localization principles

- English (`en`) is the canonical source language for normative governance,
  architecture, lifecycle, and evidence relationships.
- German (`de`) is the first supported translation locale.
- A translation is a governed rendering of one canonical document identity,
  not an independently owned copy.
- Public product facts may originate in either language only after an owner
  designates and records the canonical source. Governance content never has two
  canonical sources.
- Missing or stale translations are visible states, never silently presented as
  current equivalents.

## Locale identity and routes

One stable document `id`, document version, product applicability, and typed
relationships span all locales. Each localized representation records:

```yaml
locale:
  language: de
  source_language: en
  source_document_id: stable-document-id
  source_document_version: "1.2"
  source_digest: sha256:...
  translation_status: current
  translation_method: human-reviewed-machine-assisted
  translation_owner: Named accountable role
  translated_at: "2026-07-25"
  reviewed_at: "2026-07-25"
```

Target routes use unprefixed canonical English URLs and `/de/` for German,
subject to the #38 route ADR. Locale switching preserves document identity,
supported product version, and relevant fragment when a valid equivalent
exists. Otherwise it opens the locale landing page with an explicit
unavailable/stale explanation; it never falls through to a misleading page.

`hreflang`, HTML language, canonical URL, alternate URLs, sitemap entries, and
search locale must agree.

## Translation lifecycle

| State        | Meaning                                                            | Public behavior                                     |
| ------------ | ------------------------------------------------------------------ | --------------------------------------------------- |
| `missing`    | no translation exists                                              | canonical language offered with a clear label       |
| `draft`      | translation in progress                                            | excluded from public build and search               |
| `in-review`  | complete candidate awaiting authorized linguistic/technical review | preview only                                        |
| `current`    | source digest/version matches and review is valid                  | published and searchable                            |
| `stale`      | canonical source changed materially                                | visibly stale or withheld according to content risk |
| `deprecated` | source is deprecated and locale has matching notice                | searchable only in deprecated scope                 |
| `retired`    | source retired or locale support ended                             | removed with governed redirect/retention behavior   |

Normative, security, safety, compliance, legal, and operational instructions
default to withholding a stale translation and offering the canonical source.
Low-risk conceptual pages may remain visible with a prominent stale notice,
source link, date, and owner.

## Machine-assisted translation

Machine assistance may propose translations only from public, approved input.
Prompts, context, terminology lists, output, and provider handling follow the
same classification boundary. Restricted source text and personal/customer
data are prohibited.

No machine-generated translation becomes `current` without:

1. deterministic source identity and digest;
2. terminology and protected-name validation;
3. human linguistic review;
4. owner or subject-matter review for technical meaning;
5. links, code, safety language, metadata, accessibility, and layout checks;
6. authorized exact-digest approval; and
7. attributable provenance recording method without exposing sensitive logs.

AI assistance cannot approve wording, resolve ambiguity alone, or translate an
unsupported source claim into an affirmative statement.

## Ownership, freshness, and retirement

The canonical content owner owns meaning. A locale owner owns translation
quality and freshness. Product, security, compliance, and evidence owners
review their specialized terms.

Any changed source digest sets the translation to `stale` until automated
semantic classification shows a non-translatable-only change and a reviewer
accepts it. Event triggers include source meaning, product applicability,
warning, link target, owner, authority, evidence, lifecycle, or terminology
changes.

A supported locale may be retired only with an owner decision, usage and
support impact assessment, retained canonical-language access, redirect and
search plan, announcement, retention period, and exact approval.

## Search architecture

```text
approved public source
  -> locale/version/status resolver
  -> static rendered pages
  -> classification and publication allowlist
  -> deterministic locale-specific Pagefind indexes
  -> manifest with source revision and index digests
  -> accessible client-side search
```

Search is generated offline during the same immutable site build. Production
requires no query service, tracking endpoint, restricted system, or third-party
script. Provider analytics are not required for core search.

## Index eligibility

A page enters a public index only when all conditions hold:

- rendered in the public candidate from a tracked approved source;
- effective classification is `PUBLIC`;
- publication state is eligible for the selected view;
- locale state is `current`, or an explicitly enabled visibly stale low-risk
  page;
- product and documentation version are supported by that index;
- not draft, review-only, planned-only, withdrawn, retired, restricted, or
  excluded by page metadata; and
- no content-safety or secret-scan finding exists.

The indexer consumes rendered allowlisted pages rather than repository-wide
text. Source maps, logs, evidence inputs, front-matter-only private notes,
preview-only pages, and build workspace files are excluded.

## Index dimensions and result model

Each indexed record carries:

- canonical document ID and URL;
- locale and source locale;
- product, component, content type, and audience;
- document and product version;
- lifecycle and publication status;
- title, summary, headings, and approved body text;
- last verified date; and
- optional visible limitation or deprecation state.

Default search returns current, maintained, published content for the active
locale and current supported version. Users may deliberately include:

| State       | Default | Presentation                                               |
| ----------- | ------- | ---------------------------------------------------------- |
| current     | yes     | ordinary result                                            |
| historical  | no      | historical label, version, and current-successor link      |
| deprecated  | no      | warning, end date, and replacement                         |
| unsupported | no      | unsupported version and support boundary                   |
| planned     | no      | excluded from ordinary search; planning view if authorized |
| draft       | never   | no public index                                            |
| restricted  | never   | no public render, index, suggestion, or analytics          |

German search prefers current German results, then visibly offers canonical
English equivalents when no current German representation exists. It does not
mix languages without labeling them.

## Ranking

Deterministic ranking prioritizes:

1. exact title and heading match;
2. active locale;
3. current supported product/documentation version;
4. maintained lifecycle and verified freshness;
5. explicit product/content-type context;
6. body match.

Sponsored, personalized, behavioral, or hidden owner-based ranking is
prohibited. Deprecated or historical material never outranks its current
successor for an unfiltered query.

## Accessibility and performance

Language and search controls must:

- use semantic controls with accessible names, state, and result counts;
- work by keyboard without traps and restore focus predictably;
- announce loading, no-result, filtering, and error states without excessive
  interruption;
- expose locale, product, version, type, and lifecycle labels as text rather
  than color alone;
- preserve zoom, reflow, visible focus, target size, and reduced motion;
- keep results usable with scripts delayed and provide navigation fallback; and
- meet an accepted compressed-index and interaction performance budget per
  locale/version.

Index chunks load only for the active locale/version where feasible. A missing
optional index must not break documentation navigation.

## Determinism, privacy, and failure behavior

Identical source revision, toolchain, configuration, locale registry, and
clock-independent inputs produce identical index files and manifest digests.
The manifest records source commit, Pagefind version, eligible page IDs, locale,
version, generation result, and digests.

Queries remain in the browser by default and are not written to URLs or logs
unless an explicit privacy-reviewed design later authorizes it. Search must not
suggest restricted terms derived from excluded sources.

On index failure, the build fails before promotion. On production loading or
integrity failure, search shows a plain error and direct navigation remains
usable. It never falls back to an older unlabeled index or external search.

## Validation and observability

Build evidence records:

- translation source-digest parity, stale/missing coverage, owners, and review
  state;
- locale route, alternate, canonical, switch, link, layout, and accessibility
  checks;
- eligible-page and indexed-page set equality;
- excluded draft/planned/restricted synthetic sentinel tests;
- product/version/status filter and ranking fixtures;
- broken-result, redirect, fragment, and successor checks;
- deterministic rebuild/index digest comparison; and
- size, generation time, query performance, no-result rate from synthetic tests,
  and production integrity acceptance without collecting user queries.

Production acceptance verifies the manifest and representative English/German,
product, version, deprecated, no-result, keyboard, and screen-reader paths.

## Open decisions

Issue #38 must approve the URL locale prefix, fallback policy, stale low-risk display,
supported product-version matrix, search index partitioning, performance
budgets, and locale-retirement authority. Implementation must preserve existing
English URLs or provide reviewed one-hop redirects.
