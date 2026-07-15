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

function asPlainText(value: string): string {
  return decodeEntities(value.replace(/<[^>]*>/g, ""));
}

interface HighlightedExcerptProps {
  excerpt: string;
}

export default function HighlightedExcerpt({
  excerpt,
}: HighlightedExcerptProps): ReactNode {
  const tokens = excerpt.split(/(<mark(?:\s[^>]*)?>.*?<\/mark>)/gis);

  return tokens.map((token, index) => {
    const highlighted = /^<mark(?:\s[^>]*)?>/i.test(token);
    const text = asPlainText(
      token.replace(/^<mark(?:\s[^>]*)?>/i, "").replace(/<\/mark>$/i, ""),
    );

    if (!text) {
      return null;
    }

    return (
      <Fragment key={`${index}-${text.slice(0, 12)}`}>
        {highlighted ? <mark>{text}</mark> : text}
      </Fragment>
    );
  });
}
