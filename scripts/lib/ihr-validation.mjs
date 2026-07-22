import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const gateOrder = [
  "draft",
  "requirements-shared",
  "ready-for-installation",
  "implementation-in-progress",
  "technically-completed",
  "customer-ready",
  "handed-over",
  "accepted",
];

const requiredPhaseIds = [
  "initial-preflight",
  "artifact-staging",
  "host-preparation",
  "complete-preflight",
  "tls-certificates",
  "product-installation",
  "completion-verification",
  "idempotency-verification",
  "evidence-handling",
  "safe-stop-restart-recovery",
];

function finding(rule_id, message, path = "<input>") {
  return { rule_id, severity: "error", message, location: { path } };
}

function atLeast(gate, threshold) {
  return gateOrder.indexOf(gate) >= gateOrder.indexOf(threshold);
}

function schemaRuleId(error) {
  return error.instancePath === "/document/language" ||
    error.params?.missingProperty === "language"
    ? "IHR-LANG-001"
    : "IHR-SCHEMA-001";
}

function containsSecret(value) {
  return [
    /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
    /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
    /\bBearer\s+[-A-Za-z0-9._~+/]{20,}={0,2}\b/i,
    /\b(?:password|passwd|api[_-]?key|access[_-]?token|client[_-]?secret)["']?\s*[:=]\s*["']?(?!example|placeholder|redacted|changeme|\$\{)[^\s"'`,;}{]{8,}/i,
  ].some((pattern) => pattern.test(value));
}

export function validateIhr({ data, markdown, schema, path }) {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const findings = [];
  if (!validate(data)) {
    for (const error of validate.errors ?? []) {
      findings.push(
        finding(
          schemaRuleId(error),
          `${error.instancePath || "/"} ${error.message}`,
          path,
        ),
      );
    }
    return findings;
  }

  const gate = data.document.target_gate;
  if (containsSecret(`${JSON.stringify(data)}\n${markdown}`)) {
    findings.push(
      finding("IHR-SECRET-001", "Possible secret value detected.", path),
    );
  }
  if (
    !/Document language|Dokumentensprache/.test(markdown) ||
    !/Source language|Ausgangssprache/.test(markdown) ||
    !/Translation status|Übersetzungsstatus/.test(markdown) ||
    !/Technical identifiers|Technische Bezeichner/.test(markdown)
  ) {
    findings.push(
      finding(
        "IHR-LANG-002",
        "Required visible language information is incomplete.",
        path,
      ),
    );
  }

  if (atLeast(gate, "ready-for-installation")) {
    for (const phaseId of requiredPhaseIds) {
      if (!markdown.includes(`\`${phaseId}\``)) {
        findings.push(
          finding(
            "IHR-PLAN-001",
            `Missing technical phase ID: ${phaseId}.`,
            path,
          ),
        );
      }
    }
    if (
      !/\b[0-9a-f]{40}\b/i.test(markdown) ||
      !/sha256:[0-9a-f]{64}\b/i.test(markdown) ||
      !/Execution environment/i.test(markdown)
    ) {
      findings.push(
        finding(
          "IHR-PLAN-002",
          "Planned execution lacks complete immutable automation or execution-environment references.",
          path,
        ),
      );
    }
    for (const label of [
      "Working directory",
      "Inventory",
      "Check command",
      "Real-run command",
      "Idempotency command",
      "Verification commands",
      "Safe stop",
      "Restart",
      "Rollback / recovery",
      "Planned evidence",
    ]) {
      if (!markdown.includes(label))
        findings.push(
          finding(
            "IHR-PLAN-003",
            `Missing planned execution field: ${label}.`,
            path,
          ),
        );
    }
    if (
      !/Platform Baseline Requirements|Plattform-Grundanforderungen/.test(
        markdown,
      )
    ) {
      findings.push(
        finding(
          "IHR-PLATFORM-001",
          "Platform baseline requirements are missing.",
          path,
        ),
      );
    }
    if (
      !/Product and Topology Network Flows|Produkt- und Topologie-Netzwerkflüsse/.test(
        markdown,
      )
    ) {
      findings.push(
        finding(
          "IHR-NET-001",
          "Product-specific network flows are missing.",
          path,
        ),
      );
    }
    if (/\b(?:[0-9a-f]{7,39}|sha256:[0-9a-f]{8,63})\b/i.test(markdown)) {
      findings.push(
        finding(
          "IHR-IMMUTABLE-001",
          "An abbreviated SHA or digest was detected.",
          path,
        ),
      );
    }
    if (
      /Installation start authorised\s*\|\s*Pending|Installationsstart genehmigt\s*\|\s*Ausstehend/i.test(
        markdown,
      )
    ) {
      findings.push(
        finding(
          "IHR-READY-001",
          "Installation authorisation is pending.",
          path,
        ),
      );
    }
  }

  if (atLeast(gate, "technically-completed")) {
    if (
      /Actual Execution Record[\s\S]{0,2000}\|\s*Pending\s*\|/i.test(
        markdown,
      ) ||
      !/failed=0/.test(markdown)
    ) {
      findings.push(
        finding(
          "IHR-ACTUAL-001",
          "Actual execution commands, recap, verification, or idempotency evidence is incomplete.",
          path,
        ),
      );
    }
    if (
      /Actual Execution Record[\s\S]{0,3000}\|\s*Pending\s*\|\s*$/im.test(
        markdown,
      ) ||
      !/Deviation|Abweichung/.test(markdown)
    ) {
      findings.push(
        finding(
          "IHR-DEVIATION-001",
          "Plan-to-actual differences require an explicit deviation result or reference.",
          path,
        ),
      );
    }
  }
  if (
    atLeast(gate, "customer-ready") &&
    /OPEN-[0-9]+[\s\S]*\| Pending \| Pending \|/i.test(markdown)
  ) {
    findings.push(
      finding(
        "IHR-HANDOVER-001",
        "An open item lacks complete ownership or next-step data.",
        path,
      ),
    );
  }
  if (
    gate === "accepted" &&
    /\| Pending \| Customer acceptance authority/.test(markdown)
  ) {
    findings.push(
      finding(
        "IHR-ACCEPT-001",
        "Customer acceptance evidence is missing.",
        path,
      ),
    );
  }
  return findings;
}
