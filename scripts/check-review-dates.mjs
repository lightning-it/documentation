import path from "node:path";

import matter from "gray-matter";
import { parse as parseYaml } from "yaml";

import {
  addUtcMonths,
  cadenceMonths,
  failIfErrors,
  repositoryPath,
  repositoryRoot,
  walkFiles,
  writeEvidence,
} from "./lib/validation.mjs";

function yamlEngine(value) {
  return parseYaml(value);
}

function parseDate(value) {
  return new Date(`${value}T00:00:00.000Z`);
}

async function main() {
  const todayText =
    process.env.REVIEW_DATE ?? new Date().toISOString().slice(0, 10);
  const today = parseDate(todayText);
  const errors = [];
  const records = [];
  const files = await walkFiles(
    path.join(repositoryRoot, "docs"),
    (filePath) => filePath.endsWith(".md") || filePath.endsWith(".mdx"),
  );

  for (const filePath of files) {
    const { data } = matter.read(filePath, { engines: { yaml: yamlEngine } });
    const reviewedText = data.document?.last_reviewed;
    const cadence = data.document?.review_cadence;
    if (typeof reviewedText !== "string" || !cadenceMonths(cadence)) {
      errors.push(
        `${repositoryPath(filePath)}: review date or cadence is missing`,
      );
      continue;
    }

    const reviewed = parseDate(reviewedText);
    if (Number.isNaN(reviewed.valueOf())) {
      errors.push(`${repositoryPath(filePath)}: review date is invalid`);
      continue;
    }
    if (reviewed > today) {
      errors.push(`${repositoryPath(filePath)}: review date is in the future`);
    }

    const nextReview = addUtcMonths(reviewed, cadenceMonths(cadence));
    const stale = nextReview < today;
    if (stale) {
      errors.push(
        `${repositoryPath(filePath)}: review was due ${nextReview.toISOString().slice(0, 10)}`,
      );
    }
    records.push({
      id: data.id,
      lastReviewed: reviewedText,
      cadence,
      nextReview: nextReview.toISOString().slice(0, 10),
      stale,
    });
  }

  records.sort((left, right) => left.id.localeCompare(right.id));
  await writeEvidence("review-date-validation.json", {
    status: errors.length === 0 ? "passed" : "failed",
    checkedAt: todayText,
    documents: records.length,
    staleDocuments: records.filter(({ stale }) => stale).length,
    reviews: records,
  });
  failIfErrors("Documentation review-date validation", errors);
  console.log(`Validated review freshness for ${records.length} documents.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
