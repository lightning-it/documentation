const ownedCloudflareChallengeTargets = new Set([
  "https://l-it.io/",
  "https://l-it.io/produkte/lcp",
  "https://www.l-it.io/",
  "https://www.l-it.io/produkte/lcp",
]);

// These authoritative publisher pages are publicly indexed but return 403 to
// automated clients. Keep this list exact so a missing or moved ISO page cannot
// be hidden by a hostname-wide exception.
const publisherAccessBlockedTargets = new Set([
  "https://www.iso.org/information-security/it-change-management",
  "https://www.iso.org/standard/78974.html",
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

export function isKnownPublisherAccessBlock(
  requestedUrl,
  { status, url: finalUrl },
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
    publisherAccessBlockedTargets.has(normalizedRequestedUrl) &&
    normalizedFinalUrl === normalizedRequestedUrl
  );
}
