---
id: modulix-building-block-coredns
title: CoreDNS building-block contract
description: Define the public configuration, validation, and recovery contract for a CoreDNS service building block.
slug: /modulix/building-blocks/coredns/
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

<!-- cspell:words coredns Corefile corefile kube -->

# CoreDNS building-block contract

This building block describes how a blueprint can request a bounded CoreDNS
service. CoreDNS composes DNS behavior through plugins selected in its
configuration. The selected binary, compiled plugin set, plugin order, and
configuration therefore belong to one reviewed change.

This page is a design contract, not a deployment recipe and not a statement
that a particular DNS zone is operated by Lightning IT.

## Published Lightning IT automation interface

The public `lit.supplementary` collection release `v1.40.0`, at immutable
commit
[`9417550`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3),
contains four CoreDNS roles:

| Fully qualified role                                                                                                                                                          | Published responsibility                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`lit.supplementary.coredns_deploy`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/coredns_deploy)     | Render and operate a CoreDNS Podman kube-play deployment                            |
| [`lit.supplementary.coredns_config`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/coredns_config)     | Render the Corefile and request a reload                                            |
| [`lit.supplementary.coredns_validate`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/coredns_validate) | Inspect container state, Corefile presence, and the configured HTTP health endpoint |
| [`lit.supplementary.coredns_ops`](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3/roles/coredns_ops)           | Select `none`, `restart`, `reload`, `status`, or `upgrade` behavior                 |

The release does not publish role argument specifications. The following
bounded interface is taken from that commit's role defaults and assertions;
it is not a substitute for reviewing the complete selected release.

| Variable                          | Type and requirement in `v1.40.0`                           | Published default                   | Sensitivity and review note                                                                                     |
| --------------------------------- | ----------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `coredns_deploy_image`            | Non-empty string                                            | `docker.io/coredns/coredns:1.11.1`  | Not secret; the default is a mutable tag, so an approved run must override it with a digest                     |
| `coredns_deploy_host_ip`          | String; set it explicitly for a reviewable run              | Derived from a named interface fact | Environment-sensitive; the derived expression depends on inventory facts and is not a portable address contract |
| `coredns_deploy_use_host_network` | Boolean                                                     | `false`                             | Not secret; changing it changes listener and isolation behavior                                                 |
| `coredns_deploy_manage_resolver`  | Boolean                                                     | `true`                              | Environment-sensitive; enabling it changes the host's NetworkManager DNS settings                               |
| `coredns_deploy_corefile`         | String                                                      | Generic forwarding Corefile         | Environment-sensitive because real zones and upstreams can disclose topology                                    |
| `coredns_config_corefile`         | String; an empty value inherits `coredns_deploy_corefile`   | Empty string                        | Environment-sensitive for the same reason                                                                       |
| `coredns_validate_mode`           | String: `fail` or `report`                                  | `fail`                              | Not secret; `report` suppresses strict validation failures and is not acceptance                                |
| `coredns_ops_action`              | String: `none`, `restart`, `reload`, `status`, or `upgrade` | `none`                              | Not secret; all actions except `none` and `status` can change runtime state                                     |

None of these bounded inputs is a credential. A Corefile can nevertheless
contain non-public names or upstream addresses and must follow its data
classification.

Inspect the installed collection and role names without executing a role:

```bash
ansible-galaxy collection list lit.supplementary
ansible-doc --type role --list lit.supplementary |
  sed -n '/^lit\.supplementary\.coredns_/p'
```

The collection version must be `1.40.0` for the interface recorded above, but
the version string alone does not prove which bytes are installed. The
official
[`lit-supplementary-1.40.0.tar.gz`](https://github.com/lightning-it/ansible-collection-supplementary/releases/download/v1.40.0/lit-supplementary-1.40.0.tar.gz)
release artifact has SHA-256
`deee742f5514f170a79a44597cb237cc9daca2b961c16f834eecf88f24835d56`;
its published
[release evidence](https://github.com/lightning-it/ansible-collection-supplementary/releases/download/v1.40.0/release-evidence.json)
binds that artifact to the commit above. Verify that digest or equivalent
approved provenance. An empty list, different version, or digest mismatch is a
safe stop.

## Public boundary

Public examples may use names beneath `example.com` and documentation address
ranges. Do not publish real zones, upstream resolvers, forwarding rules,
network interfaces, access-control lists, certificate material, monitoring
targets, or query data. A public plugin name is acceptable; its environment
configuration may not be.

## Input and output contract

| Contract part    | Required input                                                                   | Expected output                                                            |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Artifact         | Immutable CoreDNS release or image digest and the compiled plugin inventory      | The reviewed executable with its identity recorded                         |
| Service scope    | Authoritative zones, forwarding scope, recursion policy, and explicit exclusions | A service that answers only for the approved DNS responsibilities          |
| Configuration    | Reviewed server blocks, plugin directives, ordering assumptions, and defaults    | A syntactically valid configuration bound to the approved artifact         |
| Network boundary | Approved listeners, protocols, clients, upstreams, and firewall dependencies     | Reachability limited to the intended consumers and dependencies            |
| Trust            | Certificate references, validation policy, source ownership, and update path     | Trust material resolved at run time without values stored in public source |
| Operations       | Availability objective, capacity, logs, metrics, alert ownership, and timeouts   | Observable service behavior with protected query data handled by policy    |
| Recovery         | Prior artifact and configuration, state classification, and decision owner       | A tested route to restore or replace the service                           |

Configuration that forwards a zone, enables recursion, changes cache behavior,
or alters plugin composition can change the security boundary. Treat each as a
material review even when the service address remains unchanged.

## Prerequisites

- The DNS owner has approved the exact zone and recursion boundaries.
- Delegations, records, forwarders, and reverse-lookup responsibility have a
  documented source of truth and no overlap with another active service.
- The selected CoreDNS artifact exposes the plugins used by the configuration.
- Listener addresses, ports, firewall paths, certificate references, and
  upstream reachability have been validated without publishing them.
- Capacity, cache policy, query logging, privacy, and retention decisions fit
  the expected client population.
- A second resolver can be introduced without creating a delegation loop or an
  unauthorized open resolver.

## Safe validation

Validate configuration against the exact reviewed artifact before starting a
listener. In an isolated environment, exercise a table of expected positive
answers, negative answers, unsupported record types, refused scope, forwarding
behavior, and upstream failure. Use only documentation names such as
`service.example.com` in public evidence.

After an authorized rollout, compare answers through the intended client path,
not only from the service host. Confirm readiness, bounded listeners, expected
plugins, error rates, latency, and the absence of forwarding or recursion
outside the approved scope. Redact query names when their classification
requires it.

Stop or remove the candidate from service if configuration parsing differs,
the plugin inventory is unexpected, a delegation loop appears, an unapproved
client can recurse, or answers differ from the approved test table.

For an already deployed candidate, the published validation role performs
read-only container, file, and HTTP inspections. This minimal report-mode
example avoids resolver changes and does not accept the service:

```yaml
---
- name: Inspect a CoreDNS candidate
  hosts: dns_candidate
  gather_facts: true
  roles:
    - role: lit.supplementary.coredns_validate
      vars:
        coredns_deploy_host_ip: 127.0.0.1
        coredns_deploy_manage_resolver: false
        coredns_deploy_health_url: http://127.0.0.1:8080/health
        coredns_validate_mode: report
```

Review the effective host path and health port before running it. The release's
four CoreDNS Molecule scenarios are explicitly
[`syntax_stub` coverage](https://github.com/lightning-it/ansible-collection-supplementary/blob/94175506cca554092d71adecd474e15cddd0b6c3/molecule/coredns-deploy-basic/converge.yml),
so this page makes no check-mode, idempotence, runtime-platform, or DNS-answer
correctness claim.

## Recovery and rollback considerations

Keep the prior immutable artifact and configuration independently addressable.
Recover by removing the candidate from traffic and restoring the last accepted
pair, or by applying a separately reviewed forward correction. Account for DNS
caches and record time-to-live values: clients may continue to observe an old
or incorrect answer after the server configuration changes.

If zone data is generated or stored outside version control, include that state
in the private backup and restore contract. Do not assume recreating the
CoreDNS process recreates its authoritative data.

## Evidence and limitations

Retain artifact identity, plugin inventory, redacted configuration checksum,
approval, isolated test table and result, deployment scope, readiness result,
client-path observations, recovery decision, and acceptance. Keep zone data
and query evidence private.

This contract does not select a high-availability topology, DNSSEC design,
service-discovery source, or authoritative-data backend. It does not prove
that a response is semantically correct merely because the service is ready.
The collection is MIT-licensed, but license compatibility for selected images,
plugins, and configuration inputs still requires review.

This page remains `review-candidate` and `pending`. A DNS subject-matter expert,
the automation owner, and the product owner must validate the selected
release, exact variables, runtime behavior, and recovery evidence before
publication approval.

## Public reference

- [CoreDNS manual](https://coredns.io/manual/toc/)
- [`lit.supplementary` `v1.40.0` source at the reviewed commit](https://github.com/lightning-it/ansible-collection-supplementary/tree/94175506cca554092d71adecd474e15cddd0b6c3)
