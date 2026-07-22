const ownedCloudflareChallengeTargets = new Set([
  "https://l-it.io/",
  "https://l-it.io/produkte/lcp",
  "https://www.l-it.io/",
  "https://www.l-it.io/produkte/lcp",
]);

export function isRetryableExternalLinkResult({ status, error }) {
  return (
    error === "network" ||
    error === "timeout" ||
    status === 429 ||
    (typeof status === "number" && status >= 500 && status <= 599)
  );
}

export function isVerifiedOwnedCloudflareChallenge(
  requestedUrl,
  { status, url: finalUrl, headers },
) {
  let normalizedRequestedUrl;
  let normalizedFinalUrl;
  try {
    normalizedRequestedUrl = new URL(requestedUrl).href;
    normalizedFinalUrl = new URL(finalUrl).href;
  } catch {
    return false;
  }
  return (
    status === 403 &&
    ownedCloudflareChallengeTargets.has(normalizedRequestedUrl) &&
    ownedCloudflareChallengeTargets.has(normalizedFinalUrl) &&
    headers.get("cf-mitigated") === "challenge" &&
    /^cloudflare$/i.test(headers.get("server") ?? "") &&
    Boolean(headers.get("cf-ray"))
  );
}
