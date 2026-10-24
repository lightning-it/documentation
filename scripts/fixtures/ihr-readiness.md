---
document:
  id: EXAMPLE-IHR-001
  type: IHR
  language: en-GB
  status: requirements-shared
  phase: readiness
  target_gate: requirements-shared
  classification: PUBLIC
  ruleset: LIT-DOC-IHR
  ruleset_version: 1.0.0
---

# Installation and Handover Record

## Document Information

| Field                 | Value                                   |
| --------------------- | --------------------------------------- |
| Document language     | English (en-GB)                         |
| Source language       | English                                 |
| Translation status    | Original document                       |
| Technical identifiers | Preserved unchanged from source systems |
| Owner / approver      | Delivery owner / customer approver role |
| Approval evidence     | Pending                                 |

## Assignment, Scope and Exclusions

Record the commissioned outcome, boundaries, exclusions, environments, owners,
and authoritative references. This single record is maintained from readiness
through acceptance.

## Installation Prerequisites and Readiness Gate

| Requirement ID | Category       | Requirement               | Minimum        | Agreed value | Actual value | Blocking | Owner                  | Status | Evidence | Source                  | Due date | Impact                    |
| -------------- | -------------- | ------------------------- | -------------- | ------------ | ------------ | -------- | ---------------------- | ------ | -------- | ----------------------- | -------- | ------------------------- |
| REQ-001        | Infrastructure | Supported target capacity | Vendor minimum | Pending      | Pending      | Yes      | Customer platform role | Open   | Pending  | Versioned vendor source | Pending  | Installation cannot start |

### Platform Baseline Requirements

| Baseline requirement | Requirement                                                    | Owner                 | Validation                                  | Status | Evidence |
| -------------------- | -------------------------------------------------------------- | --------------------- | ------------------------------------------- | ------ | -------- |
| Name resolution      | Required names resolve according to the customer design.       | Customer operations   | Forward and, where required, reverse lookup | Open   | Pending  |
| Time synchronisation | Target hosts synchronise with an approved time service.        | Customer operations   | System status                               | Open   | Pending  |
| Package sources      | Required operating-system and product sources are reachable.   | Customer operations   | Repository check                            | Open   | Pending  |
| Proxy                | An approved proxy is usable when required.                     | Customer operations   | Destination-specific connection check       | N/A    | Pending  |
| Trust store          | Required certification paths are installed and valid.          | Customer PKI role     | TLS verification                            | Open   | Pending  |
| Base network         | Routing and platform connectivity match the customer platform. | Customer network role | Preflight                                   | Open   | Pending  |

### Product and Topology Network Flows

Do not add generic DNS or time-service port rows here. Add only commissioned,
product- or topology-specific connections.

| Flow ID  | Source         | Destination         | Protocol / port | Direction | Purpose                        | Customer owner        | Status | Evidence / ticket |
| -------- | -------------- | ------------------- | --------------- | --------- | ------------------------------ | --------------------- | ------ | ----------------- |
| FLOW-001 | Client network | gateway.example.com | TCP/443         | Outbound  | Product user interface and API | Customer network role | Open   | Pending           |

### Readiness Decision

| Decision                                           | Status  | Approver role             | Auditable reference |
| -------------------------------------------------- | ------- | ------------------------- | ------------------- |
| Blocking prerequisites resolved or formally waived | Pending | Customer delivery owner   | Pending             |
| Installation start authorised                      | Pending | Customer change authority | Pending             |

## Planned Target Environment

Record the approved topology, supported product and operating-system versions,
capacity, storage, identity, trust, registry, subscription, and artifact model.

## Installed As-Built State

Complete after installation with observed versions, topology, capacity,
configuration, and immutable artifact references. Do not copy planned values.

## Implementation Activities

Summarise planned and completed activities and link them to the phase records
below.

## Technical Configuration

Record security boundaries, identity, certificates, storage, repositories,
registries, monitoring, logging, backup, restore, and lifecycle configuration.

## Technical Installation and Execution Plan

The phase records below separate planned commands from actual execution. Each
customer document translates the visible headings and explanatory prose while
preserving phase IDs, rule IDs, commands, paths, variables, and API fields.

### Execution Context

| Field             | Planned value                                  |
| ----------------- | ---------------------------------------------- |
| Operator role     | Delivery engineer                              |
| Working directory | `/workspace/automation/ansible`                |
| Inventory         | Protected inventory reference; no secret value |
| Evidence root     | Protected evidence reference                   |

### Immutable Software and Automation References

| Reference             | Immutable planned value                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| Automation            | `0123456789abcdef0123456789abcdef01234567`                                                                      |
| Collection            | `89abcdef0123456789abcdef0123456789abcdef`                                                                      |
| Execution environment | `registry.example.com/example/ee:1.0.0@sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef` |

### Session Variables

```bash
set -euo pipefail
export AUTOMATION_ROOT=/workspace/automation
export INVENTORY_FILE=/protected/inventory.yml
export EVIDENCE_ROOT=/protected/evidence/EXAMPLE-IHR-001
test -n "${AUTOMATION_ROOT}" && test -n "${INVENTORY_FILE}" && test -n "${EVIDENCE_ROOT}"
```

### Input and Secret Validation

Document expected secret variable names, presence, encryption state, file mode,
and validation outcome only. Never record a secret value.

### Planned Execution

Repeat this record for every mandatory phase ID:
`initial-preflight`, `artifact-staging`, `host-preparation`,
`complete-preflight`, `tls-certificates`, `product-installation`,
`completion-verification`, `idempotency-verification`, `evidence-handling`, and
`safe-stop-restart-recovery`.

| Field                    | Planned value                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Phase ID                 | `initial-preflight`                                                                                        |
| Purpose                  | Validate the target without changing it                                                                    |
| Operation type           | Read-only                                                                                                  |
| Working directory        | `/workspace/automation/ansible`                                                                            |
| Required repositories    | Full immutable references above                                                                            |
| Inventory                | `/protected/inventory.yml`                                                                                 |
| Execution environment    | Full tag and digest above                                                                                  |
| Prerequisites and guards | Inputs exist; placeholders and empty values rejected                                                       |
| Check command            | `./scripts/example-runner run runbooks/example-preflight.yml --inventory /protected/inventory.yml --check` |
| Real-run command         | `N/A: read-only phase`                                                                                     |
| Idempotency command      | `./scripts/example-runner run runbooks/example-preflight.yml --inventory /protected/inventory.yml --check` |
| Verification commands    | `./scripts/example-verify --inventory /protected/inventory.yml`                                            |
| Expected marker          | `EXAMPLE_PREFLIGHT_OK`                                                                                     |
| Expected recap           | `failed=0`, `unreachable=0`, `changed=0`                                                                   |
| Safe stop                | Stop before the first mutating phase if the marker is absent                                               |
| Restart                  | Correct the failed prerequisite and repeat this phase                                                      |
| Rollback / recovery      | No rollback required for this read-only phase                                                              |
| Planned evidence         | `${EVIDENCE_ROOT}/initial-preflight/`                                                                      |

### Initial Preflight

Use the Planned Execution record with phase ID `initial-preflight`.

### Artifact Staging

Use the Planned Execution record with phase ID `artifact-staging`.

### Host Preparation

Use the Planned Execution record with phase ID `host-preparation`.

### Complete Preflight

Use the Planned Execution record with phase ID `complete-preflight`.

### TLS and Certificates

Use the Planned Execution record with phase ID `tls-certificates`.

### Product Installation

Use the Planned Execution record with phase ID `product-installation`.

### Technical Completion Verification

Use the Planned Execution record with phase ID `completion-verification`.

### Idempotency Verification

Use the Planned Execution record with phase ID `idempotency-verification`.

### Evidence Handling

Use the Planned Execution record with phase ID `evidence-handling`. Define
classification, redaction, access, integrity, retention, and disposal.

### Safe Stop, Restart and Recovery

Use the Planned Execution record with phase ID `safe-stop-restart-recovery`.
Identify transaction boundaries and the approved recovery reference.

## Technical Execution Record

### Actual Execution Record

| Run ID  | Start / end | Operator role     | Automation commit | Collection commit | EE reference | Inventory reference | Actual command | Result  | Ansible recap | Idempotency | Evidence | Deviation |
| ------- | ----------- | ----------------- | ----------------- | ----------------- | ------------ | ------------------- | -------------- | ------- | ------------- | ----------- | -------- | --------- |
| Pending | Pending     | Delivery engineer | Pending           | Pending           | Pending      | Protected reference | Pending        | Pending | Pending       | Pending     | Pending  | Pending   |

Any difference from Planned Execution requires a stable deviation reference.

## Technical Completion Checks

Record observed product and operating-system versions, health, authenticated
workflow checks, TLS trust, restart persistence, and negative security checks.

## Operational Responsibility Boundaries

| Area                    | Delivery responsibility          | Customer responsibility                       | Status | Evidence |
| ----------------------- | -------------------------------- | --------------------------------------------- | ------ | -------- |
| Monitoring and alerting | Define commissioned integration  | Operate and respond after handover            | Open   | Pending  |
| Backup and restore      | Document commissioned mechanism  | Own schedule, retention, and restore approval | Open   | Pending  |
| External authentication | Configure only when commissioned | Own identity source and approvals             | Open   | Pending  |

## Deviations, Open Items and Non-Commissioned Services

| ID       | Type      | Description                 | Owner               | Impact               | Next step                     | Due date | Approval / evidence |
| -------- | --------- | --------------------------- | ------------------- | -------------------- | ----------------------------- | -------- | ------------------- |
| OPEN-001 | Open item | Example unresolved decision | Customer owner role | Gate remains blocked | Provide an auditable decision | Pending  | Pending             |

## Handover Artifacts

| Artifact              | Protected location | Owner          | Integrity / version | Transfer status |
| --------------------- | ------------------ | -------------- | ------------------- | --------------- |
| Installation evidence | Pending            | Delivery owner | Pending             | Pending         |

## Customer Acceptance

| Decision | Customer role                 | Auditable reference | Residual items |
| -------- | ----------------------------- | ------------------- | -------------- |
| Pending  | Customer acceptance authority | Pending             | Pending        |

## References and Evidence Locations

List versioned vendor sources and protected evidence references. Do not embed
customer evidence or secrets in a public repository.
