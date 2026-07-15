---
id: wunderbox-concepts
title: Wunderbox concepts
description: Use a neutral vocabulary for infrastructure platform responsibilities and boundaries.
slug: /wunderbox/concepts/
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
    - infrastructure architects
  last_reviewed: "2026-07-14"
  review_cadence: annual
---

# Wunderbox concepts

This vocabulary supports design and operations discussions. It does not name
implemented Wunderbox services or promise a particular topology.

| Term                | Meaning in this documentation                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Platform boundary   | The infrastructure resources and management responsibilities governed as Wunderbox               |
| Capacity            | Compute, memory, storage, network, and operational headroom available to host approved workloads |
| Platform service    | A shared infrastructure capability with a defined owner and service contract                     |
| Consumer            | A workload or team using an approved platform capability                                         |
| Management boundary | The identities, interfaces, networks, and evidence used to administer the platform               |
| Workload boundary   | The isolation and resource contract between hosted consumers                                     |
| Failure domain      | A set of resources that can be affected by one fault or maintenance action                       |
| Recovery unit       | The smallest service or data set that can be restored and verified independently                 |

## Capacity is more than allocation

Allocated resources do not describe usable service capacity. A platform owner
also needs headroom for maintenance, failure, recovery, security updates, and
observability. Define thresholds and decision owners in the implementation
documentation rather than publishing real utilization here.

## A platform service needs a contract

For every shared capability, document:

- its owner and intended consumers;
- supported interfaces and version contract;
- identity, authorization, and data-classification boundaries;
- availability, backup, recovery, and retention requirements;
- dependency and failure-domain assumptions;
- health and outcome verification; and
- upgrade and retirement behavior.

The contract describes the implemented environment. A public concept page
cannot substitute for that evidence.

## Shared responsibility

The platform owner protects and operates the infrastructure boundary. Workload
owners remain responsible for their application configuration, data handling,
supported dependencies, and outcome verification unless an explicit service
contract assigns a responsibility elsewhere.

Continue with the [conceptual architecture](./architecture.md) and
[operations model](./operations.md).
