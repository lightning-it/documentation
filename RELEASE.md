# Release and deployment model

## Branches

- `develop`: protected default integration branch.
- `main`: protected stable branch and Cloudflare production source.
- topic branches: short-lived pull-request branches.

All changes use pull requests, required checks, review, stale-approval
dismissal, last-push approval, and resolved conversations. Force pushes and
branch deletion are disabled for protected branches.

## Pull-request validation

The required aggregate gate installs from the lockfile, checks formatting,
lint, TypeScript, Markdown, terminology, metadata, links, images, duplicate
identifiers, secrets, licenses, dependencies, unit tests, Docusaurus build,
Pagefind index, generated HTML, accessibility, and browser smoke tests. A
preview must not receive production credentials.

## Production promotion

1. Open a `develop` to `main` pull request.
2. Repeat the complete required validation.
3. Review content, migration, security, and preview evidence. Finalize the
   content and proposed `maintained`/`approved` metadata, then generate the
   deterministic documentation-tree approval request with
   `npm run approval:request`. An independent authorized CODEOWNER records the
   matching per-role decisions in `evidence/document-approval.json` without
   changing the reviewed documents. Each reviewer must be explicitly mapped to
   the document's declared approver role in the protected authority policy.
   Regenerate and repeat review after any documentation change.
4. Merge without bypassing a failed gate.
5. Build the immutable static artifact, software bill of materials, and
   provenance where supported.
6. Deploy `main` to Cloudflare Pages.
7. Wait until the public deployment marker serves the promoted commit, then
   validate DNS, TLS, canonical host, headers, navigation, search, links,
   accessibility smoke checks, and representative performance from the public
   endpoint.
8. Record production commit, deployment identifier, test results, and rollback
   version in private release evidence when environment detail is sensitive.

## Rollback

Cloudflare's previous accepted immutable deployment is the fastest content
rollback. If the source must also be corrected, revert the production commit in
a reviewed pull request and promote the fix normally. Do not change DNS for a
routine rollback. Confirm the restored version at `https://docs.l-it.io` and
record the acceptance evidence.

## Release evidence

Public evidence is sanitized and reproducible. It may include commit IDs,
dependency/SBOM metadata, test summaries, and public URLs. Tokens, account and
zone identifiers, internal logs, private source paths, security findings,
customer facts, and protected audit evidence remain in approved private
systems.
