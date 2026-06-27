import { describe, expect, it } from "vitest";
import {
  getAdjacentChapters,
  getChapterBySlug,
  learnLLMChapters,
} from "./courses";

describe("learnLLMChapters", () => {
  it("defines exactly twelve ordered course chapters", () => {
    expect(learnLLMChapters).toHaveLength(12);
    expect(learnLLMChapters.map((chapter) => chapter.slug)).toEqual([
      "chapter-01",
      "chapter-02",
      "chapter-03",
      "chapter-04",
      "chapter-05",
      "chapter-06",
      "chapter-07",
      "chapter-08",
      "chapter-09",
      "chapter-10",
      "chapter-11",
      "chapter-12",
    ]);
    expect(learnLLMChapters.map((chapter) => chapter.order)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);
  });

  it("keeps the required chapter fields populated", () => {
    for (const chapter of learnLLMChapters) {
      expect(chapter.title).not.toHaveLength(0);
      expect(chapter.unit).not.toHaveLength(0);
      expect(chapter.description).not.toHaveLength(0);
      expect(chapter.estimatedMinutes).toBeGreaterThan(0);
    }
  });

  it("finds chapters and their neighbors by slug", () => {
    expect(getChapterBySlug("chapter-06")?.title).toBe(
      "为什么“接下一句话”能变成“像在理解”",
    );
    expect(getAdjacentChapters("chapter-06")).toMatchObject({
      previous: { slug: "chapter-05" },
      next: { slug: "chapter-07" },
    });
    expect(getAdjacentChapters("chapter-01")).toMatchObject({
      next: { slug: "chapter-02" },
    });
    expect(getAdjacentChapters("chapter-12")).toMatchObject({
      previous: { slug: "chapter-11" },
    });
  });
});
