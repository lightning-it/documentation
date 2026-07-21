import { execFileSync } from "node:child_process";

import { repositoryRoot } from "./validation.mjs";

export const deploymentMarkerPath = "/deployment-commit.json";
export const documentationRepository = "lightning-it/documentation";

function validatedCommit(value, source) {
  const commit = value?.trim().toLowerCase();
  if (!commit || !/^[0-9a-f]{40,64}$/.test(commit)) {
    throw new Error(`${source} does not contain a full hexadecimal commit ID.`);
  }
  return { commit, source };
}

export function resolveBuildCommit(environment = process.env) {
  if (environment.CF_PAGES_COMMIT_SHA) {
    return validatedCommit(
      environment.CF_PAGES_COMMIT_SHA,
      "CF_PAGES_COMMIT_SHA",
    );
  }
  if (environment.DOCUMENTATION_BUILD_COMMIT) {
    return validatedCommit(
      environment.DOCUMENTATION_BUILD_COMMIT,
      "DOCUMENTATION_BUILD_COMMIT",
    );
  }
  if (environment.GITHUB_SHA) {
    return validatedCommit(environment.GITHUB_SHA, "GITHUB_SHA");
  }
  return validatedCommit(
    execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: repositoryRoot,
      encoding: "utf8",
    }),
    "git HEAD",
  );
}

export function deploymentMarker(commit) {
  return {
    schemaVersion: 1,
    repository: documentationRepository,
    commit,
  };
}

export function validateDeploymentMarker(value) {
  if (!value || typeof value !== "object") {
    throw new Error("Deployment marker is not a JSON object.");
  }
  if (value.schemaVersion !== 1) {
    throw new Error("Deployment marker has an unsupported schema version.");
  }
  if (value.repository !== documentationRepository) {
    throw new Error("Deployment marker identifies the wrong repository.");
  }
  return validatedCommit(value.commit, "deployment marker").commit;
}
