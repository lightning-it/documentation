---
id: io-concepts
title: IO concepts
description: Learn the deployment-neutral vocabulary for controlled automation execution.
slug: /io/concepts/
sidebar_position: 2
document:
  status: review-candidate
  approval_status: pending
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - platform engineers
    - automation operators
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# IO concepts

The terms on this page form a conceptual model. They make architecture and
operations discussions precise without claiming that IO implements a named API,
protocol, or data model.

## Execution vocabulary

| Term                 | Meaning                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| Request              | An authenticated proposal to run identified automation content with bounded inputs and targets |
| Authorization        | The decision that permits a request under an approved policy and change context                |
| Content identity     | An immutable release, commit, digest, and source that identifies what may run                  |
| Input set            | Non-secret parameters plus references to secrets resolved through an approved channel          |
| Target scope         | The explicit systems or abstract target class that a run may affect                            |
| Runtime identity     | The workload identity and privileges used during execution                                     |
| Run state            | The runtime's observation of progress or termination; it is not target acceptance              |
| Outcome verification | An independent observation of the intended target or service state                             |
| Run evidence         | The classified, minimal record needed for traceability and review                              |

## Three separate decisions

Keep these decisions distinct:

1. **May this request run?** Authorization evaluates identity, policy, content,
   scope, timing, and risk.
2. **Did execution complete?** Runtime state records what happened inside the
   execution boundary.
3. **Was the outcome accepted?** Verification compares observed target state to
   the approved objective.

Conflating these decisions can turn a transport or process result into a false
claim about service health.

## Reproducibility and repeatability

A request is reproducible when its content, dependency, input-contract, and
runtime identities can be resolved later. A run is repeatable only when the
external conditions that affect it are also controlled. Neither property means
an operation is safe to repeat after partial failure.

## Evidence classification

Run records can include hostnames, identities, source paths, variable values,
and failure output. A public status vocabulary may describe them, but real
records remain in the authorized evidence system. Retain only what the
environment's policy requires and protect it according to its classification.

See [Architecture](./architecture.md) for the conceptual data flow and
[Security](./security.md) for trust-boundary decisions.
