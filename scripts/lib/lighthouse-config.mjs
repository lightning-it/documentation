export function resolveLighthouseRunConfig(env = process.env) {
  const externalBaseUrl = env.LIGHTHOUSE_BASE_URL?.trim() || undefined;
  const localPortRaw = env.LIGHTHOUSE_PORT?.trim();
  let localPort = 3100;

  if (!externalBaseUrl && localPortRaw) {
    localPort = Number(localPortRaw);
    if (!Number.isInteger(localPort) || localPort < 1 || localPort > 65_535) {
      throw new Error(
        `LIGHTHOUSE_PORT must be an integer from 1 to 65535, got: ${localPortRaw}`,
      );
    }
  }

  return {
    externalBaseUrl,
    localBaseUrl: `http://127.0.0.1:${localPort}`,
    localPort,
  };
}
