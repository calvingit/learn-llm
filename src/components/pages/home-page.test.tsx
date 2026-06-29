/* @vitest-environment jsdom */

import { act, type ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { createRoot, type Root } from "react-dom/client";

import HomePage from "./home-page";

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function render(ui: ReactNode) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);

  act(() => {
    root?.render(ui);
  });

  return container;
}

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  container?.remove();
  root = undefined;
  container = undefined;
});

describe("HomePage", () => {
  it("renders the recommended hero navigation and full seven-unit path", () => {
    const view = render(<HomePage />);

    const headerStartLink = view.querySelector("header a[href='/courses/learn-llm/chapter-01']");
    const unitLinks = view.querySelectorAll("#path a[href^='/courses/learn-llm#unit-']");

    expect(headerStartLink).not.toBeNull();
    expect(headerStartLink?.textContent ?? "").toContain("开始学习");
    expect(unitLinks).toHaveLength(7);
    unitLinks.forEach((link) => {
      expect(link.textContent ?? "").not.toMatch(/\d+\s*章/);
    });
    expect(view.textContent).toContain("25 章");
    expect(view.textContent).toContain("7 个单元");
    expect(view.textContent).toContain("把 AI 讲清楚，把判断权留给你。");
    expect(view.textContent).not.toContain("保持短、清楚、可互动");
  });
});
