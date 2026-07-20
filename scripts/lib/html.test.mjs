import assert from "node:assert/strict";
import { test } from "node:test";

import {
  htmlAttribute,
  htmlElements,
  hasExactCanonicalUrl,
  inlineScriptBodies,
  parseHtmlDocument,
} from "./html.mjs";

import {
  canonicalMatchesGeneratedRoute,
  generatedPageUrl,
  isMixedContentReference,
  isSafeErrorPageReference,
  normalizedHeadingId,
  sameOriginPathname,
} from "./validation.mjs";

test("canonical URL matching is independent of HTML attribute order", () => {
  const canonicalUrl = "https://docs.l-it.io/guide/";

  assert.equal(
    hasExactCanonicalUrl(
      `<link data-rh="true" href="${canonicalUrl}" rel="canonical">`,
      canonicalUrl,
    ),
    true,
  );
  assert.equal(
    hasExactCanonicalUrl(
      `<link rel="canonical" href="${canonicalUrl}">`,
      canonicalUrl,
    ),
    true,
  );
  assert.equal(
    hasExactCanonicalUrl(
      `<link rel="canonical" href="${canonicalUrl}">` +
        `<link rel="canonical" href="${canonicalUrl}">`,
      canonicalUrl,
    ),
    false,
  );
  assert.equal(
    hasExactCanonicalUrl(
      '<link rel="canonical" href="https://docs.l-it.io/other/">',
      canonicalUrl,
    ),
    false,
  );
});

test("HTML parsing handles quoted tag delimiters and exact script attributes", () => {
  const source =
    '<script data-note="src=not-an-attribute > still inline">runInline()</script>' +
    '<script src="/assets/application.js">ignoreExternal()</script>';
  const document = parseHtmlDocument(source);
  const scripts = htmlElements(document).filter(
    (element) => element.tagName === "script",
  );

  assert.equal(
    htmlAttribute(scripts[0], "data-note"),
    "src=not-an-attribute > still inline",
  );
  assert.deepEqual(inlineScriptBodies(source), ["runInline()"]);
});

test("inline script parsing accepts spaced end tags and an end-of-file body", () => {
  const source =
    "<script>closedWithWhitespace()</script >" +
    "<script>unterminatedAtEndOfFile()";

  assert.deepEqual(inlineScriptBodies(source), [
    "closedWithWhitespace()",
    "unterminatedAtEndOfFile()",
  ]);
});

test("scripts represented inside no-script fallback text are not CSP inputs", () => {
  const source =
    "<noscript><script>neverExecutable()</script></noscript>" +
    "<script>executable()</script>";

  assert.deepEqual(inlineScriptBodies(source), ["executable()"]);
});

test("no-script fallback elements are scanned once for local and mixed-content references", () => {
  const source =
    '<img src="/always-visible.svg">' +
    '<noscript><a href="fallback/">Fallback</a>' +
    '<img src="http://assets.example.invalid/unsafe.svg"></noscript>';
  const elements = htmlElements(parseHtmlDocument(source));
  const images = elements.filter((element) => element.tagName === "img");
  const fallbackLink = elements.find((element) => element.tagName === "a");

  assert.equal(images.length, 2);
  assert.equal(htmlAttribute(fallbackLink, "href"), "fallback/");
  assert.equal(
    isMixedContentReference(
      htmlAttribute(images[1], "src"),
      "https://docs.l-it.io/guide/",
    ),
    true,
  );
  assert.equal(
    sameOriginPathname(
      htmlAttribute(fallbackLink, "href"),
      "https://docs.l-it.io/guide/nested/",
      "https://docs.l-it.io",
    ),
    "/guide/nested/fallback/",
  );
});

test("heading normalization removes nested HTML through a standards parser", () => {
  assert.equal(
    normalizedHeadingId(
      'Heading <span data-note="1 > 0">with <em>nested</em> markup</span> &amp; entities',
    ),
    "heading-with-nested-markup-entities",
  );
});

test("first-party paths require exact URL origin equality", () => {
  const origin = "https://docs.l-it.io";
  const pageUrl = "https://docs.l-it.io/guides/nested/";

  assert.equal(
    sameOriginPathname("child/", pageUrl, origin),
    "/guides/nested/child/",
  );
  assert.equal(
    sameOriginPathname("../sibling/?view=all#top", pageUrl, origin),
    "/guides/sibling/",
  );
  assert.equal(
    sameOriginPathname("https://docs.l-it.io/reference/", pageUrl, origin),
    "/reference/",
  );
  assert.equal(
    sameOriginPathname(
      "https://docs.l-it.io.evil.example/reference/",
      pageUrl,
      origin,
    ),
    undefined,
  );
  assert.equal(
    sameOriginPathname(
      "https://docs.l-it.io@example.com/reference/",
      pageUrl,
      origin,
    ),
    undefined,
  );
});

test("canonical metadata cannot redirect relative-reference validation", () => {
  const origin = "https://docs.l-it.io";
  const pageUrl = generatedPageUrl("build/guides/generated/index.html", origin);
  const mismatchedCanonical = "https://docs.l-it.io/guides/elsewhere/";

  assert.equal(
    canonicalMatchesGeneratedRoute(
      "https://docs.l-it.io/guides/generated/",
      pageUrl,
    ),
    true,
  );
  assert.equal(
    canonicalMatchesGeneratedRoute(mismatchedCanonical, pageUrl),
    false,
  );
  assert.equal(
    sameOriginPathname("child/", pageUrl, origin),
    "/guides/generated/child/",
  );
});

test("generated routes recognize only an index.html path segment", () => {
  const origin = "https://docs.l-it.io";

  assert.equal(generatedPageUrl("build/index.html", origin).pathname, "/");
  assert.equal(
    generatedPageUrl("build/guides/index.html", origin).pathname,
    "/guides/",
  );
  assert.equal(
    generatedPageUrl("build/notindex.html", origin).pathname,
    "/notindex.html",
  );
  assert.equal(
    generatedPageUrl("build/guides/myindex.html", origin).pathname,
    "/guides/myindex.html",
  );
});

test("error-page references are independent of the requested missing route", () => {
  for (const reference of [
    "/assets/application.js",
    "//cdn.example.com/application.js",
    "https://docs.l-it.io/assets/application.js",
    "mailto:security@example.com",
    "#content",
  ]) {
    assert.equal(isSafeErrorPageReference(reference), true, reference);
  }

  for (const reference of [
    "assets/application.js",
    "./assets/application.js",
    "../assets/application.js",
    "?preview=true",
    "",
  ]) {
    assert.equal(isSafeErrorPageReference(reference), false, reference);
  }
});
