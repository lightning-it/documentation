# Testing

## Test profiles

| Profile       | Purpose                                               | Typical command           |
| ------------- | ----------------------------------------------------- | ------------------------- |
| format        | Deterministic source formatting                       | `npm run format:check`    |
| lint          | TypeScript source, Markdown, and terminology          | `npm run lint`            |
| content       | Metadata, links, images, IDs, and safety checks       | `npm run test:content`    |
| unit          | Custom component behavior                             | `npm run test:unit`       |
| build         | Docusaurus, public commit marker, and Pagefind output | `npm run build`           |
| browser       | Navigation, search, themes, mobile, 404, and console  | `npm run test:e2e`        |
| accessibility | Representative WCAG-oriented automation               | `npm run test:a11y`       |
| performance   | Lighthouse thresholds                                 | `npm run test:lighthouse` |
| approval      | Exact content-tree human-review evidence              | `npm run test:approval`   |
| complete      | Required local/CI aggregate                           | `npm run validate`        |

CI uses a clean `npm ci` installation and the committed lockfile. A build must
also succeed without network access after the package cache is populated where
the runner permits that test.

Production promotion additionally requires `npm run test:approval`. Generate a
non-circular candidate evidence record with `npm run approval:request`; only an
authorized CODEOWNER may copy the reviewed digest and exact document ID set to
the tracked approval record, add role-matched decisions by reviewers present in
the protected authority policy, and mark every approval record approved. The
authority policy intentionally fails closed until organization owners populate
it.

## Required browser journeys

The end-to-end suite covers the landing page, Pagefind search, all four product
entries, architecture, security, compliance, theme switching, mobile
navigation, TYPO3 and public GitHub outbound links, the custom 404 page, browser
console errors, and failed first-party requests.

## Performance budgets

Representative Lighthouse runs enforce justified minimum scores of 90 for
performance and 95 for accessibility, best practices, and search-engine
optimization. A threshold is a floor, not a target; material regressions must
be fixed even if the score still passes.

## Scheduled checks

Scheduled validation checks external links, dependency/vulnerability health,
stale review metadata, public domain/TLS availability, and the production smoke
journey. Network-dependent failures are triaged rather than silently ignored.
On every `main` push, production acceptance first waits a bounded time for
`/deployment-commit.json` to match the promoted commit, then records DNS, TLS,
header, caching, search, link, accessibility, smoke, and Lighthouse evidence.
