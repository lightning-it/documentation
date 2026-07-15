---
id: bsi-mapping
title: BSI mapping approach
description: Relate public documentation categories to BSI Standards 200-1 through 200-4 without claiming implementation or certification.
slug: /compliance/bsi-mapping/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Security and Compliance Maintainers
  audience:
    - information security managers
    - auditors
    - documentation owners
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# BSI mapping approach

The Bundesamt für Sicherheit in der Informationstechnik (BSI) publishes the
[BSI Standards overview](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/BSI-Standards/bsi-standards_node.html)
and the continuously maintained
[IT-Grundschutz Compendium](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html).

This page maps documentation concerns to the standards as a navigation and
review aid. It is not a Statement of Applicability, target-object model, audit
result, certification statement, or evidence of control implementation.

## Standards and documentation relationships

| Official standard                                                                                                                                           | Area                                    | Public documentation relationship                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BSI Standard 200-1](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Grundschutz/International/bsi-standard-2001_en_pdf.pdf?__blob=publicationFile&v=2) | Information security management systems | Ownership, scope, security objectives, document control, review, and lifecycle provide context for an organization's protected ISMS records                               |
| [BSI Standard 200-2](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Grundschutz/International/bsi-standard-2002_en_pdf.pdf?__blob=publicationFile&v=2) | IT-Grundschutz methodology              | Product boundaries, architecture, inventory concepts, implementation state, and verification help structure inputs to a protected methodology process                     |
| [BSI Standard 200-3](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Grundschutz/International/bsi-standard-2003_en_pdf.pdf?__blob=publicationFile&v=2) | Risk analysis based on IT-Grundschutz   | Trust boundaries, threats, deviations, recovery, and evidence needs help identify topics for a protected risk analysis; this site contains no risk register or acceptance |
| [BSI Standard 200-4](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Grundschutz/BSI_Standards/standard_200_4.pdf?__blob=publicationFile&v=8)           | Business continuity management          | Dependencies, failure domains, backup, recovery, operating priorities, exercises, and lifecycle provide documentation categories for protected continuity planning        |

## Mapping workflow

1. Define the information domain, business processes, target objects, owners,
   and protection needs in the authorized management system.
2. Use the current BSI publications and methodology; do not rely on this site's
   summary as normative text.
3. Determine applicable current IT-Grundschutz modules for each target object.
   Never infer applicability from a product name alone.
4. Map applicable requirements to concrete owners, implemented controls,
   verification, protected evidence, review cadence, and retention.
5. Identify unmet requirements, deviations, compensating controls, and residual
   risks in the protected registers and route them to authorized decision
   owners.
6. Link public product documentation only as contextual design information.
7. Review after relevant architecture, threat, business, standard, control, or
   recovery changes and at the approved periodic cadence.

## Public document categories

| Documentation category             | Typical mapping use                                 | Limitation                                                            |
| ---------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------- |
| Portfolio and product architecture | Define public boundaries and dependencies           | Contains no environment structure analysis                            |
| Security documentation             | State general objectives and threat questions       | Does not prove control implementation or effectiveness                |
| Operations and troubleshooting     | Describe safe decision and verification patterns    | Contains no internal runbook, contacts, or incident evidence          |
| Backup and recovery                | Define recovery documentation and test expectations | Contains no real objectives, targets, keys, or exercise results       |
| Releases and lifecycle             | Support version traceability and change review      | Does not prove a version is deployed or approved                      |
| Document metadata                  | Identify owner roles, status, version, and review   | Does not substitute for named organizational assignments or approvals |

## IT-Grundschutz module selection

The Compendium changes over time, and module applicability depends on the
actual target object and information domain. This public site therefore does
not publish a fixed module-applicability list for the portfolio. The authorized
team must select the current modules, record the edition used, document gaps,
and retain its rationale and evidence privately.

Return to the [compliance overview](./index.md).
