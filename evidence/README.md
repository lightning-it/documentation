# Public evidence

This directory contains only evidence safe for publication: schemas, aggregate
migration results, redirect decisions, and reproducible validation summaries.

`migration-target-index.json` identifies only public target paths at an
immutable content commit. It intentionally records no source paths or source
repository identity and keeps all human approval fields pending.

Private filenames, source-repository identity, customer/internal findings,
Cloudflare account or zone identifiers, raw scanner logs, risk registers,
audit evidence, and security findings belong in approved private evidence
systems. CI writes transient public-safe output to `evidence/generated/`; that
directory is not committed.
