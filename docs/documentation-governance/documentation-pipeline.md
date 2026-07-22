---
id: ihr-documentation-pipeline
title: IHR validation pipeline
description: Reusable validation and review workflow for schema-valid, phase-aware Installation and Handover Records.
slug: /documentation-governance/ihr-pipeline/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience: [documentation maintainers, tool developers]
  last_reviewed: "2026-07-22"
  review_cadence: annual
---

# IHR validation pipeline

Validate a concrete record with:

```bash
node scripts/validate-ihr.mjs path/to/installation-and-handover-record.md
```

The command emits the machine-readable finding format and exits non-zero for
errors. Repository validation also runs metadata, Markdown, spelling, links,
secret detection, embedded YAML, code, unit, build, accessibility, and license
checks. `.vale.ini` and `rules/vale/` define the IHR prose checks. ShellCheck
and Ansible-Lint apply when an IHR embeds or changes corresponding executable
sources. Human review remains mandatory; validation does not grant installation
authority, customer acceptance, or publication approval.
