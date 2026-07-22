---
id: contributing-github-issues
title: GitHub issue guidelines
description: Create public GitHub issues that are actionable, traceable, and safe to disclose.
slug: /contributing/github-issues/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Repository Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - contributors
    - repository maintainers
    - product owners
    - security reviewers
  last_reviewed: "2026-07-21"
  review_cadence: annual
---

<!-- cspell:words jira Änderungsmanagement Entwicklung -->

# GitHub issue guidelines

Use GitHub issues to define a bounded outcome, route it to the canonical owner,
and preserve a public-safe path from need to verified delivery. An issue is a
coordination record, not proof of certification, control implementation, risk
acceptance, or audit success.

## Scope and routing

These guidelines apply to public repositories in the `lightning-it`
organization. A repository may provide a narrower form or additional fields for
its component, but it must preserve the disclosure boundary and traceability
requirements on this page.

Choose the surface that owns the work:

| Surface                      | Use it for                                                                                  | Do not use it for                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| GitHub issue                 | A bounded feature, defect, change, task, decision, or public readiness gap                  | Credentials, customer context, undisclosed vulnerabilities, or private evidence      |
| Pull request                 | A reviewable implementation that resolves or advances an accepted issue                     | Defining an unreviewed or ambiguous requirement                                      |
| Discussion                   | Public questions and proposals that are not ready for committed work                        | Incident response, protected decisions, or operational authorization                 |
| Private vulnerability report | A suspected vulnerability or unsafe public disclosure                                       | Normal hardening, dependency, or readiness work without an undisclosed vulnerability |
| Internal work record         | Customer work, internal topology, audit evidence, risk decisions, and restricted operations | Content intended for public collaboration                                            |

Before opening an issue, search for an existing canonical record and confirm
the target repository owns the requested outcome. Use the repository's local
issue forms when present. GitHub does not combine organization defaults with
local templates: any file in a repository's `.github/ISSUE_TEMPLATE` directory
causes that repository to use its local set instead.

## Issue types

| Type                             | Purpose                                                                        | Minimum information                                                          | Expected outcome                                                           |
| -------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Feature                          | Add a user-visible capability                                                  | Need, users, proposed outcome, acceptance criteria                           | Reviewed implementation and documentation                                  |
| Bug                              | Correct behavior that differs from a supported contract                        | Current and expected behavior, safe reproduction, environment, impact        | Reproduced defect, regression protection, and fix or explained disposition |
| Change                           | Modify deployed behavior, configuration, interfaces, or operating procedure    | Scope, impact, risk, test plan, rollback, and authorization needs            | Controlled and verified change with a traceable rollback path              |
| Task                             | Complete bounded maintenance or engineering work                               | Outcome, scope, owner, acceptance criteria, and dependencies                 | Verifiable result or documented disposition                                |
| Documentation                    | Add or correct public guidance                                                 | Affected page or gap, audience, expected content, publication classification | Reviewed and published canonical documentation                             |
| Technical debt                   | Reduce a known maintainability or reliability burden                           | Current burden, consequence, boundaries, and measurable improvement          | Reduced burden without unintended behavior change                          |
| Compliance or security readiness | Improve control support or security posture without disclosing a vulnerability | Requirement source, gap stated publicly, owner, and verification method      | Implemented improvement and public-safe evidence link                      |
| Research or decision             | Resolve a material choice before implementation                                | Question, constraints, alternatives, decision criteria, and owner            | Recorded decision and linked follow-up work                                |
| Migration                        | Move an accepted source into its canonical target                              | Source identifier, classification, mapping, exclusions, and validation       | Traceable migration with no protected disclosure                           |

If one request spans multiple owner repositories, keep the user or product
outcome in the primary issue and create linked implementation issues for each
owner. Do not duplicate the same acceptance contract without a clear parent.

## Required issue information

Provide the following when it applies:

- a precise title and issue type;
- the problem or desired outcome, affected users, and relevant context;
- the owning product, repository, component, and accountable role;
- priority with a reason, not urgency language alone;
- functional and non-functional requirements;
- measurable acceptance criteria;
- security, privacy, availability, and operational impact;
- dependencies, constraints, assumptions, and excluded scope;
- verification and test methods;
- rollback, recovery, or a safe stopping point for operational changes;
- documentation and release impact;
- source traceability, such as a public Jira identifier;
- links to related decisions, issues, pull requests, tests, and releases; and
- a clear closure reason.

Use placeholders and reserved documentation values in public examples. Suitable
values include `example.com`, `host01.example.com`, `192.0.2.0/24`,
`198.51.100.0/24`, `203.0.113.0/24`, and `2001:db8::/32`.

## Definition of Ready

An issue is ready for implementation when:

- the scope and outcome are understandable;
- the canonical repository and owner are identified;
- acceptance criteria and verification are defined;
- relevant risks, dependencies, and exclusions are recorded;
- the content is safe for its repository's visibility; and
- completion and closure criteria are explicit.

Incomplete issues remain in triage. A maintainer may request clarification,
reroute the issue, or close it with a reason rather than infer protected or
material facts.

## Definition of Done

Close an accepted issue only when:

- its acceptance criteria are met or an authorized owner records why they were
  rejected or superseded;
- reviewed changes, tests, and public-safe evidence are linked;
- required documentation is updated;
- rollback or recovery was verified where applicable;
- release or deployment status is traceable where applicable;
- residual work and known limitations have linked follow-up issues; and
- the closure reason is one of `Done`, `Rejected`, `Duplicate`, or `Obsolete`.

Creating a branch or pull request does not by itself satisfy the issue.

## Public information boundary

Do not place the following in a public issue, comment, attachment, project
field, or linked public artifact:

- passwords, tokens, private keys, recovery secrets, or credentials;
- personal data, customer data, or customer identifiers;
- real internal hosts, addresses, domains, inventories, or topology;
- private repository locations or environment-specific configuration;
- raw logs, dumps, archives, or screenshots with unreviewed context;
- internal findings, audit evidence, accepted risks, or escalation paths; or
- reproduction details for an undisclosed vulnerability.

Redaction, encryption, blurring, or a private-looking link does not
automatically make content safe to publish. When classification is uncertain,
stop and use a private approved channel. Follow the
[public documentation boundary](../security/publication-boundary.md) for
classification and sanitization rules.

## Security reports and readiness work

Do not open a public issue for a suspected vulnerability, exposed credential,
or unsafe publication. Use the repository's **Security** tab and private
vulnerability reporting, or follow its `SECURITY.md`. Do not include live
credentials or protected customer data even in the initial report; identify
the approved secure exchange channel needed for those details.

A public security-readiness issue is appropriate for planned hardening,
OpenSSF work, secure defaults, or process improvement only when it does not
reveal an exploitable condition. Information-security incidents follow the
private incident-management process, not the public issue lifecycle.

## Labels and status

Keep labels small and composable. Prefer one value from each applicable
namespace rather than many overlapping labels.

| Label            | Meaning                                                                             |
| ---------------- | ----------------------------------------------------------------------------------- |
| `type:*`         | Work type such as feature, bug, change, task, documentation, decision, or migration |
| `status:*`       | Lifecycle state when a project field is not the canonical status                    |
| `priority:*`     | Maintainer-assigned delivery priority with a recorded reason                        |
| `area:*`         | Stable product or component area                                                    |
| `security`       | Public security hardening or readiness work                                         |
| `compliance`     | Public control-support or mapping work without protected evidence                   |
| `documentation`  | Public documentation work                                                           |
| `jira-migration` | Work migrated from Jira with retained source traceability                           |
| `blocked`        | Progress requires an identified dependency or decision                              |
| `needs-decision` | An accountable owner must select among recorded alternatives                        |

Repositories may initially use GitHub's common `bug`, `enhancement`, `chore`,
and `documentation` labels while namespaced labels are rolled out. A form can
apply a label only when that label already exists in the target repository.

Use these lifecycle states:

```text
Triage -> Ready -> In Progress -> In Review -> Done
                    |              |
                    +-> Blocked ---+

Triage or Ready -> Rejected | Duplicate | Obsolete
```

`Blocked` is temporary and names the missing dependency. `Rejected`,
`Duplicate`, and `Obsolete` are terminal dispositions and require a reason.

## Traceability and migrated work

Maintain the public-safe chain:

```text
Issue -> Decision -> Pull request -> Tests -> Release or deployment -> Documentation
```

For Jira migrations, retain the Jira identifier in the title or body, the
source URL, former status, and original issue type. Include former assignee or
reporter information only when it is intentionally public. Do not migrate
closed Jira items when the approved migration scope excludes them.

Use linked owner issues when one outcome needs multiple implementations. For
example, an OpenShift deployment can have a primary Helm issue and a linked
Terraform configuration issue; neither issue should pretend to own the other's
acceptance criteria.

## Standards relationship

This guideline supports traceability and disciplined change handling. It does
not assert applicability, certification, conformity, implementation, audit
success, or risk acceptance. Those decisions depend on the information
security management system (ISMS), risk assessment, Statement of
Applicability, authorized approvals, and retained evidence.

| Reference                                                                                                                                                                                                                                                             | Relationship to this guideline                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BSI IT-Grundschutz OPS.1.1.3: Patch- und Änderungsmanagement](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Grundschutz/IT-GS-Kompendium_Einzel_PDFs_2022/04_OPS_Betrieb/OPS_1_1_3_Patch_und_Aenderungsmanagement_Edition_2022.pdf?__blob=publicationFile&v=3) | Issues can record planned scope, responsibility, verification, result, and rollback for controlled changes.                                                     |
| [BSI IT-Grundschutz CON.8: Software-Entwicklung](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Grundschutz/IT-GS-Kompendium_Einzel_PDFs_2023/03_CON_Konzepte_und_Vorgehensweisen/CON_8_Software_Entwicklung_Edition_2023.html)                                  | Requirements, security considerations, review, and test links support a secure development lifecycle.                                                           |
| [ISO guidance on IT change management](https://www.iso.org/information-security/it-change-management) and ISO/IEC 27001 or 27002                                                                                                                                      | A controlled issue-to-change record can support documented change planning and implementation; the applicable controls and evidence are determined by the ISMS. |
| [ISO/IEC 27035-2:2023](https://www.iso.org/standard/78974.html)                                                                                                                                                                                                       | Private security routing separates incident preparation and response from public work tracking.                                                                 |
| [NIST SP 800-218 Secure Software Development Framework](https://csrc.nist.gov/projects/ssdf)                                                                                                                                                                          | Issues can track security requirements, risks, design decisions, verification, and remediation through the software lifecycle.                                  |
| [OpenSSF Best Practices](https://www.bestpractices.dev/)                                                                                                                                                                                                              | Public readiness tasks can track project documentation, secure contribution, testing, and supply-chain improvements.                                            |

Public issues may link to sanitized release evidence, but they are not the
storage location for internal audit evidence, risk registers, incident records,
or customer control evidence.

## Maintainer operation

Maintainers should:

1. classify and route a new issue;
2. remove or privately escalate unsafe content immediately;
3. confirm owner, acceptance criteria, and readiness before implementation;
4. keep status and dependency links current;
5. require a reviewed pull request and proportionate validation;
6. close with a disposition and links to the delivered result; and
7. review these guidelines after material GitHub, ISMS, regulatory, or
   repository-governance changes.

Organization-wide forms are defaults only. A repository with any local file in
`.github/ISSUE_TEMPLATE` replaces the complete default form set and must keep
its specialized forms aligned with this guideline.
