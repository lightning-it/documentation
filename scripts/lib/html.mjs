import { parse, parseFragment } from "parse5";

function children(node) {
  const childNodes = node.childNodes ?? [];
  return node.content ? [...childNodes, node.content] : childNodes;
}

export function parseHtmlDocument(source) {
  return parse(source, {
    scriptingEnabled: false,
    sourceCodeLocationInfo: true,
  });
}

export function htmlElements(root) {
  const result = [];

  function visit(node) {
    if (node.tagName) {
      result.push(node);
    }
    for (const child of children(node)) {
      visit(child);
    }
  }

  visit(root);
  return result;
}

export function htmlAttribute(element, name) {
  const normalizedName = name.toLocaleLowerCase("en-US");
  return element.attrs?.find((attribute) => attribute.name === normalizedName)
    ?.value;
}

export function htmlText(node) {
  if (node.nodeName === "#text") {
    return node.value;
  }
  return children(node).map(htmlText).join("");
}

export function htmlFragmentText(source) {
  return htmlText(parseFragment(source, { scriptingEnabled: false }));
}

export function inlineScriptBodies(source) {
  const bodies = [];
  const document = parse(source, {
    scriptingEnabled: true,
    sourceCodeLocationInfo: true,
  });

  for (const script of htmlElements(document).filter(
    (element) => element.tagName === "script",
  )) {
    if (htmlAttribute(script, "src") !== undefined) {
      continue;
    }

    const startOffset = script.sourceCodeLocation?.startTag?.endOffset;
    const endOffset = script.sourceCodeLocation?.endTag?.startOffset;
    const body =
      Number.isInteger(startOffset) &&
      Number.isInteger(endOffset) &&
      endOffset >= startOffset
        ? source.slice(startOffset, endOffset)
        : htmlText(script);
    if (body.length > 0) {
      bodies.push(body);
    }
  }

  return bodies;
}
