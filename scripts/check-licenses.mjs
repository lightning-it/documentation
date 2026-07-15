import { access, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  failIfErrors,
  generatedEvidenceDirectory,
  repositoryRoot,
  sha256,
  writeEvidence,
} from "./lib/validation.mjs";

const allowedLicenseIdentifiers = new Set([
  "0BSD",
  "Apache-2.0",
  "Artistic-2.0",
  "BlueOak-1.0.0",
  "BSD",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "CC-BY-3.0",
  "CC-BY-4.0",
  "CC-BY-SA-4.0",
  "CC0-1.0",
  "EPL-2.0",
  "ISC",
  "MIT",
  "MIT-0",
  "MPL-2.0",
  "Python-2.0",
  "Unicode-3.0",
  "Unicode-DFS-2016",
  "Unlicense",
  "WTFPL",
  "Zlib",
]);
const prohibitedLicense =
  /\b(?:AGPL|BUSL|Commons-Clause|CPAL|GPL|LGPL|OSL|SSPL)-?/i;

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizeLicense(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeLicense(item))
      .filter(Boolean)
      .join(" OR ");
  }
  if (value && typeof value === "object") {
    return normalizeLicense(value.type);
  }
  if (typeof value !== "string") {
    return undefined;
  }
  return value
    .trim()
    .replace(/^CC BY-SA 4\.0$/i, "CC-BY-SA-4.0")
    .replace(/^Apache 2(?:\.0)?$/i, "Apache-2.0");
}

function licenseTokens(expression) {
  return expression
    .replace(/[()]/g, " ")
    .split(/\s+(?:AND|OR|WITH)\s+|\s+/i)
    .filter(Boolean);
}

function inferredLicense(licenseFiles) {
  const combined = licenseFiles.map(({ content }) => content).join("\n");
  if (
    /Permission is hereby granted, free of charge, to any person/i.test(
      combined,
    )
  ) {
    return "MIT";
  }
  if (/Redistribution and use in source and binary forms/i.test(combined)) {
    return "BSD";
  }
  return undefined;
}

async function attributionFiles(packageDirectory) {
  const files = [];
  for (const entry of await readdir(packageDirectory, {
    withFileTypes: true,
  })) {
    if (
      entry.isFile() &&
      /^(?:COPYING|LICEN[CS]E|NOTICE)(?:\..+)?$/i.test(entry.name)
    ) {
      const content = await readFile(
        path.join(packageDirectory, entry.name),
        "utf8",
      );
      files.push({ name: entry.name, content: content.trim() });
    }
  }
  return files;
}

async function main() {
  const lockfilePath = path.join(repositoryRoot, "package-lock.json");
  const lockfileSource = await readFile(lockfilePath, "utf8");
  const lockfile = JSON.parse(lockfileSource);
  const errors = [];
  const reviewed = [];
  const uniqueAttributionTexts = new Map();
  let absentOptionalPackages = 0;

  for (const [packagePath, lockMetadata] of Object.entries(
    lockfile.packages ?? {},
  )) {
    if (!packagePath || !lockMetadata.version) {
      continue;
    }

    const packageDirectory = path.join(repositoryRoot, packagePath);
    const manifestPath = path.join(packageDirectory, "package.json");
    if (!(await exists(manifestPath))) {
      if (lockMetadata.optional === true) {
        absentOptionalPackages += 1;
        continue;
      }
      errors.push(`${packagePath}: locked package is not installed`);
      continue;
    }

    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    const packageName =
      manifest.name ?? packagePath.replace(/^node_modules\//, "");
    const packageVersion = manifest.version ?? lockMetadata.version;
    const files = await attributionFiles(packageDirectory);
    const expression =
      normalizeLicense(manifest.license ?? manifest.licenses) ??
      inferredLicense(files);

    if (!expression) {
      errors.push(
        `${packageName}@${packageVersion}: missing license metadata and recognizable license text`,
      );
      continue;
    }
    if (prohibitedLicense.test(expression)) {
      errors.push(
        `${packageName}@${packageVersion}: prohibited license ${expression}`,
      );
      continue;
    }

    const unknownTokens = licenseTokens(expression).filter(
      (token) =>
        !allowedLicenseIdentifiers.has(token) &&
        !token.endsWith("-exception-2.0"),
    );
    if (unknownTokens.length > 0) {
      errors.push(
        `${packageName}@${packageVersion}: unreviewed license ${expression}`,
      );
      continue;
    }

    const attributionDigests = [];
    for (const file of files) {
      const digest = sha256(file.content);
      attributionDigests.push(digest);
      if (!uniqueAttributionTexts.has(digest)) {
        uniqueAttributionTexts.set(digest, file.content);
      }
    }
    reviewed.push({
      name: packageName,
      version: packageVersion,
      license: expression,
      attributionDigests: [...new Set(attributionDigests)].sort(),
    });
  }

  reviewed.sort((left, right) =>
    `${left.name}@${left.version}`.localeCompare(
      `${right.name}@${right.version}`,
    ),
  );
  await writeEvidence("license-review.json", {
    status: errors.length === 0 ? "passed" : "failed",
    scope:
      "complete installed runtime, build, validation, and optional dependency graph",
    reviewedPackages: reviewed.length,
    absentPlatformOptionalPackages: absentOptionalPackages,
    uniqueAttributionTexts: uniqueAttributionTexts.size,
    allowedLicenseIdentifiers: [...allowedLicenseIdentifiers].sort(),
    lockfileSha256: sha256(lockfileSource),
  });

  const notices = [
    "Lightning IT Documentation — Third-Party Software Notices",
    "",
    "Generated from the exact installed package graph. The package list and retained",
    "license/NOTICE texts below accompany the static documentation artifact.",
    "",
    "Package inventory",
    "=================",
    ...reviewed.map(
      (item) =>
        `${item.name}@${item.version} — ${item.license} — texts: ${item.attributionDigests.join(", ") || "none in package"}`,
    ),
    "",
    "Retained license and NOTICE texts",
    "=================================",
  ];
  for (const [digest, content] of [...uniqueAttributionTexts].sort(
    ([left], [right]) => left.localeCompare(right),
  )) {
    notices.push("", `--- SHA-256 ${digest} ---`, "", content);
  }
  await writeFile(
    path.join(generatedEvidenceDirectory, "THIRD_PARTY_NOTICES.txt"),
    `${notices.join("\n")}\n`,
    "utf8",
  );

  failIfErrors("Installed dependency license and attribution review", errors);
  console.log(
    `Reviewed ${reviewed.length} installed packages and retained ${uniqueAttributionTexts.size} unique attribution texts.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
