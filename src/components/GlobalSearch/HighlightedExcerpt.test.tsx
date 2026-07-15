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
});
