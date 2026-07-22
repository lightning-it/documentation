# GitHub Copilot review instructions

- Review every change for correctness, security, least privilege, and failure behavior.
- When present, apply all repository-specific guidance in `AGENTS.md` and path-scoped instruction files.
- Treat malformed external input as an error rather than silently coercing it.
- Check that credentials are scoped to the smallest required job.
- Require new or modified third-party GitHub Actions dependencies to use immutable commit SHAs.
- Explain each finding's impact and propose a concrete fix.
- Prefer a regression test for bugs and security issues.
- For IHR changes, enforce `LIT-DOC-IHR`, stable rule IDs, BCP-47 language
  metadata, complete planned-versus-actual execution records, phase gates, and
  full immutable references. Do not treat platform DNS or time services as
  mandatory product firewall flows. Reject customer values and secret content
  in public examples.
