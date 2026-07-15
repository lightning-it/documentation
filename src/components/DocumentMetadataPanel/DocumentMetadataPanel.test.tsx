import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocumentMetadataPanel from "./index";

describe("DocumentMetadataPanel", () => {
  it("renders governance and computed review metadata accessibly", () => {
    render(
      <DocumentMetadataPanel
        document={{
          status: "review-candidate",
          approval_status: "pending",
          version: "1.0",
          classification: "PUBLIC",
          owner: "Documentation Maintainers",
          approver: "Product Owners",
          audience: ["platform engineers", "security reviewers"],
          last_reviewed: "2026-07-14",
          review_cadence: "semiannual",
        }}
      />,
    );

    const panel = screen.getByRole("region", { name: "Document metadata" });
    expect(within(panel).getByText("Review candidate")).toBeVisible();
    expect(within(panel).getByText("Pending")).toBeVisible();
    expect(within(panel).getByText("Documentation Maintainers")).toBeVisible();
    expect(
      within(panel).getByText("platform engineers, security reviewers"),
    ).toBeVisible();
    expect(within(panel).getByText("2027-01-14")).toHaveAttribute(
      "datetime",
      "2027-01-14",
    );
  });
});
