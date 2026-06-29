import { describe, expect, it } from "vitest";

import { learnLLMChapters } from "@/lib/courses";

describe("LearnLLMCoursePage", () => {
  it("describes the current 25-chapter, 7-unit course", () => {
    const contentChapterCount = learnLLMChapters.filter((chapter) =>
      chapter.slug.startsWith("chapter-"),
    ).length;
    const unitCount = new Set(learnLLMChapters.map((chapter) => chapter.unit)).size;

    expect(`Learn-LLM ${contentChapterCount} 章交互式课程目录。`).toBe(
      "Learn-LLM 25 章交互式课程目录。",
    );
    expect(unitCount).toBe(7);
  });
});
