/* @vitest-environment jsdom */

import { act, type AnchorHTMLAttributes, type ComponentType, type ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { createRoot, type Root } from "react-dom/client";

import { mdxComponents } from "./mdx-components";

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

describe("MDX components", () => {
  it("renders inline links with visible clickable styling", () => {
    const Anchor = mdxComponents.a;

    if (!Anchor) {
      throw new Error("MDX anchor component is missing");
    }

    const AnchorComponent = Anchor as ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
    const view = render(
      <AnchorComponent href="/courses/learn-llm/chapter-11">第 11 章</AnchorComponent>,
    );
    const anchor = view.querySelector("a");

    expect(anchor?.getAttribute("href")).toBe("/courses/learn-llm/chapter-11");
    expect(anchor?.className).toContain("text-primary");
    expect(anchor?.className).toContain("underline");
  });

  it("renders body copy with a compact reading scale", () => {
    const Paragraph = mdxComponents.p;

    if (!Paragraph) {
      throw new Error("MDX paragraph component is missing");
    }

    const ParagraphComponent = Paragraph as ComponentType<{
      children: ReactNode;
      className?: string;
    }>;
    const view = render(<ParagraphComponent>正文内容</ParagraphComponent>);
    const paragraph = view.querySelector("p");

    expect(paragraph?.className).toContain("text-[15px]");
    expect(paragraph?.className).toContain("leading-7");
  });
});
