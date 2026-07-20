---
id: modulix-building-block-dhcp
title: DHCP building-block contract
description: Define the public scope, input, validation, and recovery contract for an automated DHCP service.
slug: /modulix/building-blocks/dhcp/
document:
  status: maintained
  approval_status: approved
  version: "1.0"
  classification: PUBLIC
  owner: Lightning IT Documentation Maintainers
  approver: Lightning IT Product Owners
  audience:
    - automation architects
    - platform operators
    - network engineers
  last_reviewed: "2026-07-15"
  review_cadence: semiannual
---

<!-- cspell:words dhcpd kube -->

# DHCP building-block contract

This building block defines the review boundary for a DHCP service. The
published Lightning IT role described below expects a container that provides
an ISC-style `dhcpd` command and configuration by default; it does not select
or publish that container image. The defaults are not a Kea interface unless a
separately reviewed change replaces the command, arguments, configuration, and
validation contract.

DHCP operates on shared network state. A syntactically valid configuration can
still allocate the wrong address, conflict with another server, or direct
clients to the wrong dependency. Network ownership and isolated validation are
therefore prerequisites, not follow-up tasks.

## Published Lightning IT automation interface

The public `lit.supplementary` collection release `v1.40.0`, at immutable
commit
[`9417550`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3),
publishes the role
[`lit.supplementary.dhcp_deploy`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/dhcp_deploy).
It renders an ISC-style configuration and a rootful Podman kube-play manifest,
then can manage a systemd service. The role fails closed for a runtime run
until its production evidence gate is explicit.

The release has no role argument specification. This bounded interface is
derived from the immutable defaults and assertions:

| Variable                                    | Type and requirement in `v1.40.0`                                            | Published default                          | Sensitivity and review note                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `dhcp_deploy_image`                         | Non-empty string; caller-required                                            | Empty string                               | Not secret; use an approved digest such as `registry.example.com/infra/dhcpd@sha256:<digest>`          |
| `dhcp_deploy_interfaces`                    | Sequence; at least one entry is required for runtime deployment              | Empty list                                 | Environment-sensitive because real interface names disclose topology                                   |
| `dhcp_deploy_config`                        | String; required when configuration management is enabled                    | Empty string                               | Sensitive operational data; real pools, options, and reservations must stay private                    |
| `dhcp_deploy_use_host_network`              | Boolean; asserted `true` for the published runtime path                      | `true`                                     | Security-relevant because it joins the host network namespace                                          |
| `dhcp_deploy_required_capabilities`         | Sequence                                                                     | `NET_ADMIN`, `NET_RAW`, `NET_BIND_SERVICE` | Security-relevant; the role keeps `privileged` false but these capabilities still require review       |
| `dhcp_deploy_production_ready`              | Boolean; must be `true` for runtime deployment                               | `false`                                    | Not secret; it is an assertion input, not evidence by itself                                           |
| `dhcp_deploy_production_evidence`           | Mapping; every published evidence flag must be `true` for runtime deployment | All flags `false`                          | May reference private evidence, but must contain no secret values                                      |
| `dhcp_deploy_production_evidence_reference` | Non-empty string for runtime deployment                                      | Empty string                               | Environment-sensitive; use an authorized record identifier rather than embedding evidence              |
| `dhcp_deploy_skip_runtime`                  | Boolean                                                                      | `false`                                    | Setting `true` permits render-only testing and bypasses runtime gates; it is not production acceptance |

The bounded interface has no credential variable. Its configuration, evidence
reference, interface names, and lease paths can still be sensitive.

Inspect the installed release and exact FQCN without executing it:

```bash
ansible-galaxy collection list lit.supplementary
ansible-doc --type role --list lit.supplementary |
  sed -n '/^lit\.supplementary\.dhcp_deploy$/p'
```

The reported collection version must be `1.40.0` for this interface record,
but the version string alone does not prove which bytes are installed. The
official
[`lit-supplementary-1.40.0.tar.gz`](https://github.com/lightning-it/ansible-collection-supplementary/releases/download/v1.40.0/lit-supplementary-1.40.0.tar.gz)
release artifact has SHA-256
`deee742f5514f170a79a44597cb237cc9daca2b961c16f834eecf88f24835d56`;
its published
[release evidence](https://github.com/lightning-it/ansible-collection-supplementary/releases/download/v1.40.0/release-evidence.json)
binds that artifact to the commit above. Verify that digest or equivalent
approved provenance and stop on any mismatch.

## Public boundary

Do not publish real subnets, pools, reservations, relay addresses, client
identifiers, hardware addresses, options, lease data, failover peers, control
endpoints, or address-management records. Public examples may use only the
documentation ranges and names reserved for examples.

## Input and output contract

| Contract part     | Required input                                                                     | Expected output                                                                |
| ----------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Artifact          | Immutable implementation version, package or image identity, and dependencies      | A verified DHCP service artifact                                               |
| Allocation scope  | Address-family choice, approved subnets, pools, exclusions, and reservation owner  | Allocations constrained to non-overlapping authorized ranges                   |
| Client selection  | Approved relay mapping, interfaces, classes, and reservation rules                 | Requests matched only to the intended scope                                    |
| Options           | Owned values, validation rules, and explicit defaults for each client class        | Options delivered exactly as approved                                          |
| Lease state       | Backend, schema compatibility, retention, privacy, and recovery requirements       | Durable and access-controlled lease state when required                        |
| Integration       | DNS-update, time, address-management, observability, and control-channel contracts | Bounded dependencies with authenticated access where the implementation allows |
| Service operation | Availability, capacity, logging, alerting, and maintenance ownership               | Observable service with protected client data handled by policy                |

The source of truth and conflict-resolution owner must be explicit. Automation
must not infer free address space merely because a pool is absent from its own
configuration.

## Prerequisites

- The network owner has approved every allocation range, exclusion, relay
  relationship, reservation source, and option owner.
- An authoritative address-management comparison shows no overlap with another
  DHCP service, static allocation, or reserved infrastructure range.
- Broadcast, relay, routing, firewall, and server-listener paths are understood
  and can be tested without affecting unrelated clients.
- Lease storage and configuration backends are compatible with the selected
  artifact and have a tested recovery contract.
- Clocks, certificate trust, service identities, and protected secret
  references are available through approved runtime channels.
- A maintenance plan explains how existing leases behave during change and how
  a candidate server is prevented from answering prematurely.

## Safe validation

First validate the complete generated configuration with the exact selected
artifact while all production listeners are disabled. Compare its normalized
scope with the approved address plan and review all defaults that the tool
adds.

Then use an isolated network segment and disposable client to test discovery,
offer, request, renewal, expiry, reservation behavior, expected options, and
rejection outside the authorized scope. Exercise dependency and backend
failure without attaching the candidate to a live broadcast domain.

After an authorized change, verify service state, listener scope, lease
backend health, pool utilization, relay-path behavior, and a controlled client
transaction. Stop if more than one uncoordinated service can answer, any pool
overlaps, an option differs, or lease-state compatibility is uncertain.

The release includes a
[`dhcp-deploy-basic` render-only scenario](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/molecule/dhcp-deploy-basic)
that sets `dhcp_deploy_skip_runtime: true`, writes only to the Molecule
ephemeral directory, and inspects the rendered configuration, empty lease
file, capabilities, host-network setting, image, interface, and mounts. From
the reviewed collection checkout, its bounded command is:

```bash
molecule test --scenario-name dhcp-deploy-basic
```

That scenario starts no DHCP listener. It proves rendering for its synthetic
documentation subnet only; it does not prove broadcast reachability, renewal,
lease persistence, reboot recovery, failover, absence of a rogue server,
check-mode support, or runtime idempotence.

## Recovery and rollback considerations

Restoring configuration does not recall leases already issued to clients.
Recovery must account for active lease lifetimes, client renewal behavior,
database schema, DNS updates, and any address-management synchronization.

Keep the prior artifact and configuration, a consistent lease-state backup
when required, and a reviewed procedure for removing the candidate from the
network. The recovery owner chooses restore, repair, controlled coexistence, or
forward correction. Starting an old binary against a newer lease schema is not
an assumed rollback.

## Evidence and limitations

Retain artifact identity, redacted configuration checksum, approved scope
comparison, isolated transaction results, dependency checks, change approval,
post-change health, recovery decision, and acceptance. Lease records and real
address plans remain private.

This contract does not select DHCPv6, a high-availability mode, a lease
backend, dynamic DNS, or an address-management product. The role's default
command selects DHCPv4, but that default does not approve an image or a live
network. Consult the exact implementation release for supported combinations
and upgrade constraints.

The collection is MIT-licensed; the chosen DHCP image and its contents require
their own license and redistribution review. This page remains
`review-candidate` and `pending` until network, DHCP, container-runtime,
automation, and product-owner reviewers accept the exact release, variables,
L2 test evidence, and recovery plan.

## Public references

- [`lit.supplementary` `v1.40.0` source at the reviewed commit](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3)
- [IETF RFC 2131: Dynamic Host Configuration Protocol](https://datatracker.ietf.org/doc/html/rfc2131)
