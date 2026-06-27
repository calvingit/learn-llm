/* @vitest-environment jsdom */

import { act, type ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { createRoot, type Root } from "react-dom/client";

import { ChapterCompletion } from "./chapter-completion";
import { AiHierarchyMap, LearningByExamples } from "./interactive-widgets";
import { learnLLMChapters } from "@/lib/courses";

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

function clickButtonByText(element: HTMLElement, text: string) {
  const button = Array.from(element.querySelectorAll("button,label")).find((item) => {
    return item.textContent?.includes(text);
  });

  if (!button) {
    throw new Error(`Button not found: ${text}`);
  }

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

function clickElementByLabel(element: HTMLElement, label: string) {
  const control = element.querySelector<HTMLElement>(`[aria-label="${label}"]`);

  if (!control) {
    throw new Error(`Control not found: ${label}`);
  }

  act(() => {
    control.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  container?.remove();
  root = undefined;
  container = undefined;
  window.localStorage.clear();
});

describe("course client interactions", () => {
  it("switches the AI hierarchy active layer", () => {
    const view = render(<AiHierarchyMap />);

    expect(view.textContent).toContain("当前圈层：AI");

    clickButtonByText(view, "机器学习");

    expect(view.textContent).toContain("当前圈层：机器学习");
    expect(view.textContent).toContain("从例子里找规律");
  });

  it("switches the AI hierarchy when the visual ring is clicked", () => {
    const view = render(<AiHierarchyMap />);

    clickElementByLabel(view, "查看深度学习圈层");

    expect(view.textContent).toContain("当前圈层：深度学习");
    expect(view.textContent).toContain("提取特征");
  });

  it("backs the AI hierarchy with native radio state", () => {
    const view = render(<AiHierarchyMap />);
    const radio = view.querySelector<HTMLInputElement>(
      'input[type="radio"][value="machine-learning"]',
    );

    expect(radio).not.toBeNull();

    clickElementByLabel(view, "查看机器学习圈层");

    expect(radio?.checked).toBe(true);
  });

  it("reveals learning examples with native radio state", () => {
    const view = render(<LearningByExamples />);
    const radio = view.querySelector<HTMLInputElement>(
      'input[type="radio"][name="learning-example-step"][value="2"]',
    );

    expect(radio).not.toBeNull();

    clickElementByLabel(view, "显示 2 个训练样本");

    expect(radio?.checked).toBe(true);
  });

  it("marks a chapter complete in local progress", () => {
    const view = render(
      <ChapterCompletion chapter={learnLLMChapters[0]} chapters={learnLLMChapters} />,
    );

    expect(view.textContent).toContain("已完成 0 / 24 章");

    clickButtonByText(view, "标记本章完成");

    expect(view.textContent).toContain("本章已完成");
    expect(view.textContent).toContain("已完成 1 / 24 章");
  });

  it("keeps chapter completion interactive when localStorage is unavailable", () => {
    const originalLocalStorage = Object.getOwnPropertyDescriptor(window, "localStorage");

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("Storage is unavailable", "SecurityError");
      },
    });

    try {
      const view = render(
        <ChapterCompletion chapter={learnLLMChapters[0]} chapters={learnLLMChapters} />,
      );

      expect(view.textContent).toContain("已完成 0 / 24 章");

      clickButtonByText(view, "标记本章完成");

      expect(view.textContent).toContain("本章已完成");
      expect(view.textContent).toContain("已完成 1 / 24 章");
    } finally {
      if (originalLocalStorage) {
        Object.defineProperty(window, "localStorage", originalLocalStorage);
      }
    }
  });
});
