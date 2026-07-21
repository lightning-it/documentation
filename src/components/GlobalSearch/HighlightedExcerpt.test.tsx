import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HighlightedExcerpt from "./HighlightedExcerpt";

describe("HighlightedExcerpt", () => {
  it("renders Pagefind highlights without injecting arbitrary HTML", () => {
    const { container } = render(
      <p>
        <HighlightedExcerpt
          excerpt={
            "Safe &amp; <mark>visible</mark> <img src=x onerror=alert(1)>"
          }
        />
      </p>,
    );

    expect(screen.getByText("visible").tagName).toBe("MARK");
    expect(container).toHaveTextContent("Safe & visible");
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("decodes numeric entities in result excerpts", () => {
    render(
      <HighlightedExcerpt excerpt="Role &#x2192; <mark>collection</mark>" />,
    );

    expect(screen.getByText(/Role →/)).toBeInTheDocument();
    expect(screen.getByText("collection")).toBeInTheDocument();
  });

  it("replaces out-of-range numeric entities without throwing", () => {
    render(
      <HighlightedExcerpt excerpt="Invalid &#x110000; &#9999999999999999999999; &#xD800;" />,
    );

    expect(screen.getByText(/Invalid � � �/)).toBeInTheDocument();
  });

  it("treats malformed tags as escaped text", () => {
    const { container } = render(
      <p>
        <HighlightedExcerpt
          excerpt={'Before <img title="unterminated> after'}
        />
      </p>,
    );

    expect(container).toHaveTextContent(
      'Before <img title="unterminated> after',
    );
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("does not create elements from script tags with a spaced end tag", () => {
    const { container } = render(
      <p>
        <HighlightedExcerpt
          excerpt={
            'Before <script data-value=">">window.pwned = true</ script> after'
          }
        />
      </p>,
    );

    expect(container).toHaveTextContent("Before window.pwned = true after");
    expect(container.querySelector("script")).not.toBeInTheDocument();
  });

  it("renders encoded markup as text instead of interpreting it", () => {
    const { container } = render(
      <p>
        <HighlightedExcerpt
          excerpt={
            "Encoded &lt;img src=x onerror=alert(1)&gt; &lt;mark&gt;literal&lt;/mark&gt;"
          }
        />
      </p>,
    );

    expect(container).toHaveTextContent(
      "Encoded <img src=x onerror=alert(1)> <mark>literal</mark>",
    );
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("mark")).not.toBeInTheDocument();
  });

  it("discards attributes from Pagefind highlight elements", () => {
    const { container } = render(
      <p>
        <HighlightedExcerpt
          excerpt={'<mark class="bad" onclick="alert(1)">safe</mark>'}
        />
      </p>,
    );

    const highlight = screen.getByText("safe");
    expect(highlight.tagName).toBe("MARK");
    expect(highlight).not.toHaveAttribute("class");
    expect(highlight).not.toHaveAttribute("onclick");
    expect(container.querySelectorAll("mark")).toHaveLength(1);
  });

  it("coalesces nested marks and highlights an unclosed final mark", () => {
    const { container } = render(
      <p>
        <HighlightedExcerpt excerpt="A <mark>nested <mark>deep</mark> tail</mark> and <mark>open" />
      </p>,
    );

    const highlights = container.querySelectorAll("mark");
    expect(highlights).toHaveLength(2);
    expect(highlights[0]).toHaveTextContent("nested deep tail");
    expect(highlights[1]).toHaveTextContent("open");
    expect(container).toHaveTextContent("A nested deep tail and open");
  });
});
