---
id: io-overview
title: IO overview
description: Understand IO as the Automation Runtime product in the Lightning IT portfolio.
slug: /io/overview/
sidebar_position: 1
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

# IO overview

IO is the **Automation Runtime** product in the Lightning IT portfolio. Its
conceptual verb is **Run**: IO is the portfolio boundary concerned with
controlled execution of automation content.

IO is a peer of [ModuLix](../modulix/index.md),
[Wunderbox](../wunderbox/index.md), and [Atlas](../atlas/index.md). “Build → Run”
describes a possible functional interaction between ModuLix and IO; it does not
make either product a subcomponent of the other.

## Public documentation scope

The first public IO documentation establishes a deployment-neutral operating
model:

- the vocabulary needed to discuss a controlled automation run;
- conceptual trust and responsibility boundaries;
- readiness, observation, and evidence expectations;
- security decisions around identity, secrets, scope, and output; and
- a troubleshooting method that does not expose an environment.

It deliberately does not assert a command-line interface, application
programming interface (API), scheduler, queue, storage backend, supported
platform, or deployment topology. Those are implementation claims and require a
verified public release contract before they can be documented here.

## Operator outcomes

An IO operating model should let an authorized team answer:

1. Which immutable content and inputs were selected?
2. Who or what was authorized to request execution?
3. What target boundary and privilege were approved?
4. Which runtime identity performed the work?
5. What redacted execution status was observed?
6. What independent check established the target outcome?
7. Where is classified evidence retained, and for how long?

These are documentation requirements, not claims that a specific IO release
already exposes each item through a particular interface.

## Continue

- [Concepts](./concepts.md) defines the public vocabulary.
- [Architecture](./architecture.md) explains conceptual boundaries.
- [Operations](./operations.md) provides readiness and run-review checklists.
- [Security](./security.md) covers identity, secret, and evidence handling.
- [Troubleshooting](./troubleshooting.md) provides a safe diagnostic flow.
