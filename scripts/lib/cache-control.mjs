function normalizedDirective(value) {
  const [rawName, ...rawValue] = value.split("=");
  const name = rawName.trim().toLocaleLowerCase("en-US");
  if (!name || rawValue.length > 1) {
    return null;
  }
  if (rawValue.length === 0) {
    return name;
  }
  const directiveValue = rawValue[0].trim().toLocaleLowerCase("en-US");
  return directiveValue ? `${name}=${directiveValue}` : null;
}

export function exactCacheControl(value, expectedDirectives) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }
  const directives = value.split(",").map(normalizedDirective);
  if (directives.some((directive) => directive === null)) {
    return false;
  }
  const expected = expectedDirectives.map((directive) =>
    normalizedDirective(directive),
  );
  if (
    expected.some((directive) => directive === null) ||
    directives.length !== expected.length ||
    new Set(directives).size !== directives.length
  ) {
    return false;
  }
  const expectedSet = new Set(expected);
  return directives.every((directive) => expectedSet.has(directive));
}

export function exactCacheControlOneOf(value, expectedPolicies) {
  return expectedPolicies.some((policy) => exactCacheControl(value, policy));
}
