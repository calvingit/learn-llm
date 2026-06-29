/* @vitest-environment jsdom */

import { act, type ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { createRoot, type Root } from "react-dom/client";

import { UnitQuiz } from "./unit-quiz";

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

describe("UnitQuiz", () => {
  it("renders quiz with questions and submit button", () => {
    const view = render(<UnitQuiz unitSlug="unit-01" />);

    expect(view.textContent).toContain("单元测验");
    expect(view.textContent).toContain("提交答案");
    expect(view.textContent).toContain("跳过测验，进入下一单元");
    // 第一单元有3道题
    expect(view.textContent).toContain("AI、机器学习、深度学习、大模型之间的关系是什么？");
    expect(view.textContent).toContain("GPT 路线与其他 AI 技术最大的不同是什么？");
    expect(view.textContent).toContain("遇到一个新 AI 产品时，应该优先判断什么？");
  });

  it("renders null for unknown unit slug", () => {
    const view = render(<UnitQuiz unitSlug="unit-99" />);

    // 无效 slug 时组件返回 null，容器内无实际内容
    expect(view.textContent).toBe("");
  });

  it("submit button is disabled until all questions answered", () => {
    const view = render(<UnitQuiz unitSlug="unit-01" />);

    // 找到"提交答案"按钮（disabled因为还没回答）
    const buttons = view.querySelectorAll("button");
    const submitBtn = Array.from(buttons).find((b) => b.textContent === "提交答案");
    expect(submitBtn).toBeTruthy();
    expect((submitBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it("last unit has no skip link", () => {
    const view = render(<UnitQuiz unitSlug="unit-07" />);

    expect(view.textContent).toContain("单元测验");
    expect(view.textContent).not.toContain("跳过测验，进入下一单元");
  });
});
