export const ownedCloudflareChallengeTargets = new Set([
  "https://l-it.io/",
  "https://l-it.io/produkte/lcp",
  "https://www.l-it.io/",
  "https://www.l-it.io/produkte/lcp",
]);

export function isVerifiedOwnedCloudflareChallenge(
  requestedUrl,
  { status, url: finalUrl, headers },
) {
  return (
    status === 403 &&
    ownedCloudflareChallengeTargets.has(requestedUrl) &&
    ownedCloudflareChallengeTargets.has(finalUrl) &&
    headers.get("cf-mitigated") === "challenge" &&
    /^cloudflare$/i.test(headers.get("server") ?? "") &&
    Boolean(headers.get("cf-ray"))
  );
}
