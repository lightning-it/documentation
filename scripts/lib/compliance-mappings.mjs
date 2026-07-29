import { canonicalJson, digest } from "./evidence-records.mjs";

const ref = (record) => `${record.evidence_id}@${record.record_version}`;
const order = (left, right) => (left < right ? -1 : left > right ? 1 : 0);

export function validateComplianceMappings(set, evidenceRecords) {
  const errors = [];
  const frameworks = new Map();
  const requirements = new Map();
  const evidence = new Map(
    evidenceRecords.map((record) => [ref(record), record]),
  );
  const activeEvidenceStatuses = new Set(["passed", "warning"]);
  const requiredFrameworks = [
    "bsi-it-grundschutz",
    "bsi-200-1",
    "bsi-200-2",
    "bsi-200-3",
    "bsi-200-4",
    "cis-benchmarks",
    "openssf-best-practices",
    "openssf-scorecard",
    "slsa",
    "spdx",
    "cyclonedx",
    "in-toto",
    "sigstore",
    "nist-ssdf",
  ];

  for (const framework of set.frameworks) {
    if (frameworks.has(framework.id))
      errors.push(`${framework.id}: duplicate framework`);
    frameworks.set(framework.id, framework);
  }
  for (const id of requiredFrameworks) {
    if (!frameworks.has(id))
      errors.push(`${id}: required framework is not registered`);
  }
  for (const requirement of set.requirements) {
    if (requirements.has(requirement.id))
      errors.push(`${requirement.id}: duplicate requirement`);
    requirements.set(requirement.id, requirement);
    const framework = frameworks.get(requirement.framework);
    if (!framework)
      errors.push(
        `${requirement.id}: unknown framework ${requirement.framework}`,
      );
    else if (framework.version !== requirement.framework_version) {
      errors.push(`${requirement.id}: framework version mismatch`);
    }
  }

  const mappings = new Set();
  for (const mapping of set.mappings) {
    if (mappings.has(mapping.id))
      errors.push(`${mapping.id}: duplicate mapping`);
    mappings.add(mapping.id);
    const requirement = requirements.get(mapping.requirement_id);
    if (!requirement)
      errors.push(
        `${mapping.id}: unknown requirement ${mapping.requirement_id}`,
      );
    if (mapping.applicability === "not-applicable") {
      if (mapping.implementation_status !== "not-applicable") {
        errors.push(
          `${mapping.id}: not-applicable decision requires matching status`,
        );
      }
      if (
        !mapping.approved_by ||
        !mapping.review_at ||
        mapping.review_triggers.length === 0
      ) {
        errors.push(`${mapping.id}: incomplete not-applicable decision`);
      }
    }
    if (
      mapping.implementation_status === "not-applicable" &&
      mapping.applicability !== "not-applicable"
    ) {
      errors.push(
        `${mapping.id}: not-applicable status requires applicability decision`,
      );
    }
    const supporting = [];
    for (const edge of mapping.evidence) {
      const record = evidence.get(edge.reference);
      if (!record) {
        errors.push(`${mapping.id}: missing evidence ${edge.reference}`);
        continue;
      }
      if (edge.relation === "supports" || edge.relation === "verifies") {
        supporting.push(record);
      }
    }
    if (mapping.implementation_status === "implemented") {
      if (
        mapping.scope.products.length + mapping.scope.components.length ===
        0
      ) {
        errors.push(`${mapping.id}: implemented mapping has no bounded scope`);
      }
      if (
        !supporting.some((record) => activeEvidenceStatuses.has(record.status))
      ) {
        errors.push(
          `${mapping.id}: implemented mapping lacks current admissible evidence`,
        );
      }
      if (mapping.assurance_types.length === 0) {
        errors.push(`${mapping.id}: implemented mapping lacks assurance type`);
      }
    }
    if (
      mapping.implementation_status === "partially-implemented" &&
      supporting.length === 0
    ) {
      errors.push(`${mapping.id}: partial mapping lacks supporting evidence`);
    }
    if (mapping.assessed_at >= mapping.review_at)
      errors.push(`${mapping.id}: review date is not after assessment`);
  }
  return errors;
}

export function createComplianceOutputs(set) {
  const frameworks = [...set.frameworks].sort((a, b) => order(a.id, b.id));
  const requirements = [...set.requirements].sort((a, b) => order(a.id, b.id));
  const mappings = [...set.mappings].sort((a, b) => order(a.id, b.id));
  const statusCounts = Object.fromEntries(
    [
      "implemented",
      "partially-implemented",
      "planned",
      "not-applicable",
      "not-assessed",
    ].map((status) => [
      status,
      mappings.filter((entry) => entry.implementation_status === status).length,
    ]),
  );
  const applicabilityCounts = Object.fromEntries(
    [
      "applicable",
      "conditionally-applicable",
      "not-applicable",
      "applicability-unknown",
    ].map((status) => [
      status,
      mappings.filter((entry) => entry.applicability === status).length,
    ]),
  );
  const catalog = {
    mapping_set: set.mapping_set,
    frameworks,
    requirements,
    mappings,
  };
  const catalogSha256 = digest(canonicalJson(catalog));
  return {
    catalog,
    manifest: {
      schema_version: 1,
      generator: "compliance-mapping-generator@1.0",
      mapping_set_id: set.mapping_set.id,
      mapping_set_version: set.mapping_set.version,
      catalog_sha256: catalogSha256,
      framework_count: frameworks.length,
      requirement_denominator: requirements.length,
      mapping_denominator: mappings.length,
      applicability_counts: applicabilityCounts,
      implementation_status_counts: statusCounts,
      success_percentage: null,
      success_percentage_reason:
        "Not calculated: not-applicable and not-assessed records are never successes.",
    },
  };
}
