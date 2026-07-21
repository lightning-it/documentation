import { Fragment, type ReactNode } from "react";

const namedEntities: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

function decodeEntities(value: string): string {
  const decodeCodePoint = (code: string, radix: number): string => {
    const codePoint = Number.parseInt(code, radix);
    const isInvalid =
      !Number.isFinite(codePoint) ||
      codePoint <= 0 ||
      codePoint > 0x10ffff ||
      (codePoint >= 0xd800 && codePoint <= 0xdfff);

    return isInvalid ? "\uFFFD" : String.fromCodePoint(codePoint);
  };

  return value.replace(
    /&(#x[\da-f]+|#\d+|[a-z]+);/gi,
    (entity, code: string) => {
      if (code.startsWith("#x")) {
        return decodeCodePoint(code.slice(2), 16);
      }

      if (code.startsWith("#")) {
        return decodeCodePoint(code.slice(1), 10);
      }

      return namedEntities[code.toLowerCase()] ?? entity;
    },
  );
}

interface ParsedTag {
  end: number;
  kind: "mark-close" | "mark-open" | "other";
}

interface TextSegment {
  highlighted: boolean;
  text: string;
}

function isAsciiLetter(character: string | undefined): boolean {
  if (!character) {
    return false;
  }

  const codePoint = character.codePointAt(0) ?? 0;
  return (
    (codePoint >= 65 && codePoint <= 90) ||
    (codePoint >= 97 && codePoint <= 122)
  );
}

function isTagNameCharacter(character: string | undefined): boolean {
  if (!character) {
    return false;
  }

  const codePoint = character.codePointAt(0) ?? 0;
  return (
    isAsciiLetter(character) ||
    (codePoint >= 48 && codePoint <= 57) ||
    character === ":" ||
    character === "-"
  );
}

function isHtmlWhitespace(character: string | undefined): boolean {
  return (
    character === " " ||
    character === "\t" ||
    character === "\n" ||
    character === "\f" ||
    character === "\r"
  );
}

function findTagEnd(value: string, start: number): number | null {
  let quote: "'" | '"' | null = null;

  for (let index = start + 1; index < value.length; index += 1) {
    const character = value[index];

    if (quote) {
      if (character === quote) {
        quote = null;
      }

      continue;
    }

    if (character === "'" || character === '"') {
      quote = character;
      continue;
    }

    if (character === ">") {
      return index + 1;
    }
  }

  return null;
}

function parseTag(value: string, start: number): ParsedTag | null {
  if (value.startsWith("<!--", start)) {
    const commentEnd = value.indexOf("-->", start + 4);

    return commentEnd === -1 ? null : { end: commentEnd + 3, kind: "other" };
  }

  let index = start + 1;
  const firstCharacter = value[index];

  if (firstCharacter === "!" || firstCharacter === "?") {
    const end = findTagEnd(value, start);
    return end === null ? null : { end, kind: "other" };
  }

  const closing = firstCharacter === "/";
  if (closing) {
    index += 1;
    while (isHtmlWhitespace(value[index])) {
      index += 1;
    }
  } else if (!isAsciiLetter(firstCharacter)) {
    return null;
  }

  const nameStart = index;
  while (isTagNameCharacter(value[index])) {
    index += 1;
  }

  if (nameStart === index) {
    return null;
  }

  const end = findTagEnd(value, start);
  if (end === null) {
    return null;
  }

  const delimiter = value[index];
  const hasValidDelimiter =
    delimiter === ">" || delimiter === "/" || isHtmlWhitespace(delimiter);
  const name = value.slice(nameStart, index).toLowerCase();

  let lastContentIndex = end - 2;
  while (isHtmlWhitespace(value[lastContentIndex])) {
    lastContentIndex -= 1;
  }

  const selfClosing = value[lastContentIndex] === "/";
  if (name !== "mark" || !hasValidDelimiter || selfClosing) {
    return { end, kind: "other" };
  }

  return { end, kind: closing ? "mark-close" : "mark-open" };
}

function tokenizeExcerpt(value: string): TextSegment[] {
  // Excerpt bytes only become React text children. Parsed tags can change the
  // highlight state, but they are never copied into the rendered element tree.
  const segments: TextSegment[] = [];
  let cursor = 0;
  let highlightDepth = 0;

  const appendText = (text: string): void => {
    const decodedText = decodeEntities(text);
    if (!decodedText) {
      return;
    }

    const highlighted = highlightDepth > 0;
    const previous = segments.at(-1);
    if (previous?.highlighted === highlighted) {
      previous.text += decodedText;
      return;
    }

    segments.push({ highlighted, text: decodedText });
  };

  while (cursor < value.length) {
    const tagStart = value.indexOf("<", cursor);
    if (tagStart === -1) {
      appendText(value.slice(cursor));
      break;
    }

    appendText(value.slice(cursor, tagStart));

    const tag = parseTag(value, tagStart);
    if (!tag) {
      appendText("<");
      cursor = tagStart + 1;
      continue;
    }

    if (tag.kind === "mark-open") {
      highlightDepth += 1;
    } else if (tag.kind === "mark-close" && highlightDepth > 0) {
      highlightDepth -= 1;
    }

    cursor = tag.end;
  }

  return segments;
}

interface HighlightedExcerptProps {
  excerpt: string;
}

export default function HighlightedExcerpt({
  excerpt,
}: HighlightedExcerptProps): ReactNode {
  return tokenizeExcerpt(excerpt).map(({ highlighted, text }, index) => {
    return (
      <Fragment key={`${index}-${text.slice(0, 12)}`}>
        {highlighted ? <mark>{text}</mark> : text}
      </Fragment>
    );
  });
}
