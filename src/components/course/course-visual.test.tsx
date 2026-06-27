/* @vitest-environment jsdom */

import { act, type ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { createRoot, type Root } from "react-dom/client";

import { CourseVisual } from "./course-visual";

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

describe("CourseVisual", () => {
  it("renders an accessible project image with a caption", () => {
    const view = render(
      <CourseVisual
        alt="一张办公桌被资料挤满，用来说明上下文窗口容量有限"
        caption="上下文窗口像办公桌，空间有限，需要取舍。"
        src="/images/learn-llm/visuals/context-window-desk.png"
      />,
    );

    const image = view.querySelector("img");

    expect(image?.getAttribute("src")).toBe("/images/learn-llm/visuals/context-window-desk.png");
    expect(image?.getAttribute("alt")).toBe("一张办公桌被资料挤满，用来说明上下文窗口容量有限");
    expect(view.querySelector("figcaption")?.textContent).toContain("上下文窗口像办公桌");
  });
});
