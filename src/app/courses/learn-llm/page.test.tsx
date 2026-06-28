/* @vitest-environment jsdom */

import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import LearnLLMCoursePage, { metadata } from "./page";

vi.mock("@/components/course/course-catalog", () => ({
  CourseCatalog: ({ chapters }: { chapters: unknown[] }) => (
    <div data-testid="course-catalog">{chapters.length}</div>
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("LearnLLMCoursePage", () => {
  it("describes the current 25-chapter, 7-unit course", () => {
    expect(metadata.description).toBe("Learn-LLM 25 章交互式课程目录。");

    const html = renderToStaticMarkup(LearnLLMCoursePage());

    expect(html).toContain("25 章、7 个单元");
  });
});
