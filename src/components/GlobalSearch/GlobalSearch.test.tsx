import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import GlobalSearch, { SearchTrigger } from "./index";
import { searchDocumentation } from "./searchClient";

vi.mock("./searchClient", () => ({
  searchDocumentation: vi.fn(),
}));

const searchDocumentationMock = vi.mocked(searchDocumentation);

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe("GlobalSearch", () => {
  beforeEach(() => {
    searchDocumentationMock.mockResolvedValue([
      {
        url: "/modulix/concepts/",
        title: "ModuLix concepts",
        excerpt: "Create reusable <mark>automation</mark> content.",
      },
    ]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps the compact trigger explicitly named when its text is hidden", () => {
    render(<SearchTrigger label="Find documentation" />);

    expect(
      screen.getByRole("button", { name: "Find documentation" }),
    ).toHaveAttribute("aria-label", "Find documentation");
  });

  it("opens with the keyboard shortcut and moves focus to the search input", async () => {
    render(<GlobalSearch />);

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    expect(
      await screen.findByRole("dialog", {
        name: "Search public documentation",
      }),
    ).toHaveAttribute("open");
    expect(
      screen.getByRole("searchbox", { name: "Search terms" }),
    ).toHaveFocus();
  });

  it("returns keyboard-focusable Pagefind results with safe highlighting", async () => {
    const user = userEvent.setup();
    render(<GlobalSearch />);

    await user.click(
      screen.getByRole("button", { name: "Search documentation" }),
    );
    await user.type(await screen.findByRole("searchbox"), "ModuLix");

    await waitFor(() =>
      expect(searchDocumentationMock).toHaveBeenCalledWith("ModuLix"),
    );

    const result = await screen.findByRole("link", {
      name: /ModuLix concepts/,
    });
    expect(result).toHaveAttribute("href", "/modulix/concepts/");
    expect(screen.getByText("automation").tagName).toBe("MARK");

    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "ArrowDown" });
    expect(result).toHaveFocus();
  });

  it("moves from the input to the final result with ArrowUp", async () => {
    searchDocumentationMock.mockResolvedValue([
      {
        url: "/modulix/",
        title: "ModuLix",
        excerpt: "Automation content.",
      },
      {
        url: "/atlas/",
        title: "Atlas",
        excerpt: "Observability platform.",
      },
    ]);
    const user = userEvent.setup();
    render(<GlobalSearch />);

    await user.click(
      screen.getByRole("button", { name: "Search documentation" }),
    );
    await user.type(await screen.findByRole("searchbox"), "platform");
    const atlasResult = await screen.findByRole("link", { name: /Atlas/ });

    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "ArrowUp" });

    expect(atlasResult).toHaveFocus();
  });

  it("restores the original focus after a repeated shortcut and actual dialog close", async () => {
    render(<GlobalSearch />);
    const trigger = screen.getByRole("button", {
      name: "Search documentation",
    });
    trigger.focus();

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(await screen.findByRole("searchbox")).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "Close search" }));

    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.querySelector("dialog")).not.toHaveAttribute("open");
  });

  it("ignores a queued close event after the dialog has been reopened", async () => {
    render(<GlobalSearch />);
    const trigger = screen.getByRole("button", {
      name: "Search documentation",
    });
    trigger.focus();

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    fireEvent.click(await screen.findByRole("button", { name: "Close search" }));
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    const dialog = screen.getByRole("dialog", {
      name: "Search public documentation",
    });
    fireEvent(dialog, new Event("close"));

    await waitFor(() => expect(dialog).toHaveAttribute("open"));
    expect(screen.getByRole("searchbox")).toHaveFocus();
  });

  it("invalidates an in-flight result immediately when the query changes", async () => {
    vi.useFakeTimers();
    const staleRequest =
      deferred<Awaited<ReturnType<typeof searchDocumentation>>>();
    const currentRequest =
      deferred<Awaited<ReturnType<typeof searchDocumentation>>>();
    searchDocumentationMock.mockImplementation((searchQuery) =>
      searchQuery === "first" ? staleRequest.promise : currentRequest.promise,
    );
    render(<GlobalSearch />);

    fireEvent.click(
      screen.getByRole("button", { name: "Search documentation" }),
    );
    await act(async () => {});
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "first" } });
    await act(() => vi.advanceTimersByTimeAsync(150));
    expect(searchDocumentationMock).toHaveBeenCalledWith("first");

    fireEvent.change(input, { target: { value: "second" } });
    await act(async () => {
      staleRequest.resolve([
        { url: "/stale/", title: "Stale result", excerpt: "Outdated." },
      ]);
      await staleRequest.promise;
    });
    expect(screen.queryByText("Stale result")).not.toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(150));
    await act(async () => {
      currentRequest.resolve([
        {
          url: "/current/",
          title: "Current result",
          excerpt: "Current.",
        },
      ]);
      await currentRequest.promise;
    });
    expect(screen.getByText("Current result")).toBeInTheDocument();
  });

  it("invalidates an in-flight result immediately when the query is cleared", async () => {
    vi.useFakeTimers();
    const request = deferred<Awaited<ReturnType<typeof searchDocumentation>>>();
    searchDocumentationMock.mockReturnValue(request.promise);
    render(<GlobalSearch />);

    fireEvent.click(
      screen.getByRole("button", { name: "Search documentation" }),
    );
    await act(async () => {});
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "temporary" } });
    await act(() => vi.advanceTimersByTimeAsync(150));

    fireEvent.change(input, { target: { value: "" } });
    await act(async () => {
      request.resolve([
        { url: "/stale/", title: "Stale result", excerpt: "Outdated." },
      ]);
      await request.promise;
    });

    expect(screen.queryByText("Stale result")).not.toBeInTheDocument();
    expect(screen.getByText("Try a product, task, or topic.")).toBeVisible();
  });

  it("shows a useful empty result state", async () => {
    searchDocumentationMock.mockResolvedValue([]);
    const user = userEvent.setup();
    render(<GlobalSearch />);

    await user.click(
      screen.getByRole("button", { name: "Search documentation" }),
    );
    await user.type(await screen.findByRole("searchbox"), "not-a-real-topic");

    expect(
      await screen.findByText("No results for “not-a-real-topic”"),
    ).toBeInTheDocument();
  });
});
