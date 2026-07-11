import { describe, expect, it } from "vitest";
import { getAdjacentChapters, getChapterBySlug, learnLLMChapters } from "./courses";

describe("learnLLMChapters", () => {
  it("defines an expanded course with contiguous slugs and orders", () => {
    expect(learnLLMChapters).toHaveLength(32);
    const chapterSlugs = learnLLMChapters
      .map((chapter) => chapter.slug)
      .filter((slug) => slug.startsWith("chapter-"));
    const summarySlugs = learnLLMChapters
      .map((chapter) => chapter.slug)
      .filter((slug) => slug.startsWith("unit-"));

    expect(chapterSlugs).toEqual(
      Array.from({ length: 25 }, (_, index) => `chapter-${String(index + 1).padStart(2, "0")}`),
    );
    expect(summarySlugs).toEqual(
      Array.from({ length: 7 }, (_, index) => `unit-${String(index + 1).padStart(2, "0")}-summary`),
    );
    // Verify ascending orders
    const orders = learnLLMChapters.map((c) => c.order);
    for (let i = 1; i < orders.length; i++) {
      expect(
        orders[i],
        `order[${i}] (${orders[i]}) > order[${i - 1}] (${orders[i - 1]})`,
      ).toBeGreaterThan(orders[i - 1]);
    }
  });

  it("keeps the required chapter fields populated", () => {
    for (const chapter of learnLLMChapters) {
      expect(chapter.title).not.toHaveLength(0);
      expect(chapter.unit).not.toHaveLength(0);
      expect(chapter.description).not.toHaveLength(0);
    }
  });

  it("covers the new course bridge topics needed for RAG and Agent lessons", () => {
    expect(learnLLMChapters.map((chapter) => chapter.title)).toEqual(
      expect.arrayContaining([
        "上下文窗口：为什么长对话会忘记前面？",
        "RAG：给 AI 一场开卷考试",
        "Embedding：机器怎样按“意思”找资料？",
        "工具调用：模型怎样拥有“手”？",
        "Workflow：不要追求一个万能 Prompt",
      ]),
    );
  });

  it("uses open-weight terminology for chapter 24 metadata", () => {
    expect(getChapterBySlug("chapter-24")).toMatchObject({
      title: "开放权重模型：除了托管服务还有什么选择？",
      description: expect.stringContaining("开放权重"),
    });
  });

  it("finds chapters and their neighbors by slug", () => {
    expect(getChapterBySlug("chapter-08")?.title).toBe(
      "接下一句话：为什么预测下一个词能表现得像理解？",
    );
    expect(getAdjacentChapters("chapter-08")).toMatchObject({
      previous: { slug: "chapter-07" },
      next: { slug: "chapter-09" },
    });
    expect(getAdjacentChapters("chapter-01")).toMatchObject({
      next: { slug: "chapter-02" },
    });
    expect(getAdjacentChapters(learnLLMChapters.at(-1)?.slug ?? "")).toMatchObject({
      previous: { slug: "chapter-25" },
    });
  });
});
