export function isValidGitHubUserIdentity(value) {
  return (
    typeof value === "string" &&
    /^@[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/.test(value)
  );
}
