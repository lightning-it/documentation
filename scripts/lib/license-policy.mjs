// Tool-only exception: this is not a general allowance for LGPL dependencies.
export function spellingDictionaryException({
  packagePath,
  packageName,
  packageVersion,
  expression,
  lockMetadata,
  rootManifest,
  files,
}) {
  if (
    packagePath !== "node_modules/@cspell/dict-de-de" ||
    packageName !== "@cspell/dict-de-de" ||
    packageVersion !== "4.1.3" ||
    lockMetadata.version !== "4.1.3" ||
    expression !== "LGPL-3.0" ||
    lockMetadata.dev !== true ||
    rootManifest.devDependencies?.[packageName] !== "4.1.3" ||
    rootManifest.dependencies?.[packageName] !== undefined ||
    !files.some(({ content }) =>
      /GNU LESSER GENERAL PUBLIC LICENSE/.test(content),
    )
  ) {
    return undefined;
  }
  return {
    package: "@cspell/dict-de-de@4.1.3",
    license: "LGPL-3.0",
    purpose:
      "German dictionary used only by the documentation spelling checker",
    scope: "Development tooling; no runtime embedding of dictionary data",
    obligations:
      "Retain upstream license texts and attribution in generated notices; review source availability before distributing the dictionary itself",
  };
}
