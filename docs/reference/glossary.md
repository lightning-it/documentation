---
id: glossary
title: Glossary
description: Define shared architecture, automation, security, and lifecycle terms.
slug: /reference/glossary/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - all documentation readers
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Glossary

**Ansible collection**
: A versioned distribution unit for Ansible roles, plugins, modules, and related
content.

**Application programming interface (API)**
: A defined interface through which software components exchange requests and
results. Conceptual product pages do not imply an implemented API.

**Atlas**
: The peer Lightning IT product positioned as Observability Platform; its
conceptual verb is Observe.

**Blueprint**
: A reviewed ModuLix design artifact that describes composition, inputs,
dependencies, verification, and recovery without becoming a public
environment inventory.

**BSI**
: Bundesamt für Sicherheit in der Informationstechnik, Germany's Federal Office
for Information Security.

**Building block**
: A bounded automation capability considered together with its content,
inputs, runtime constraints, verification, and recovery decision.

**Classification**
: The handling decision applied after reviewing a document's name, content,
assets, metadata, links, and history.

**Evidence**
: A retained record used to support a review or decision. Evidence has its own
owner, classification, integrity, access, and retention requirements.

**Failure domain**
: Resources or consumers that can be affected by one fault or maintenance
action.

**Fully qualified collection name (FQCN)**
: An Ansible identifier containing namespace, collection, and content name,
such as the verified public role name `lit.rhel.baseline`.

**IO**
: The peer Lightning IT product positioned as Automation Runtime; its
conceptual verb is Run.

**ModuLix**
: The peer Lightning IT product positioned as Automation Content; its
conceptual verb is Build.

**Recovery point objective (RPO)**
: The approved maximum data-loss interval used to design recovery. Real values
are environment-specific and may be protected.

**Recovery time objective (RTO)**
: The approved target time for restoring a defined outcome after disruption.
A public concept does not state an environment's value.

**Release evidence**
: Version-specific results and identities that support claims about a released
artifact. Branch status is not release evidence for a different version.

**Role**
: A reusable, namespaced Ansible automation unit. Suitability depends on the
selected release, inputs, target, and tests.

**Signal path**
: The conceptual collection, processing, retention, and access path between an
observation source and consumer.

**Wunderbox**
: The peer Lightning IT product positioned as Infrastructure Platform; its
conceptual verb is Host.
