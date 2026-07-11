import { describe, expect, it } from "vitest";

import { getUnitQuiz, unitQuizData } from "./quiz-questions";

describe("quiz-questions", () => {
  it("has quiz data for all 7 units", () => {
    const units = Object.keys(unitQuizData);
    expect(units).toHaveLength(7);
    expect(units).toEqual([
      "unit-01",
      "unit-02",
      "unit-03",
      "unit-04",
      "unit-05",
      "unit-06",
      "unit-07",
    ]);
  });

  it("each unit has 2-3 questions including at least one scenario", () => {
    const correctIndexes = new Set<number>();

    for (const [slug, data] of Object.entries(unitQuizData)) {
      expect(data.questions.length).toBeGreaterThanOrEqual(2);
      expect(data.questions.length).toBeLessThanOrEqual(3);
      expect(
        data.questions.some((question) => question.kind === "scenario"),
        slug,
      ).toBe(true);

      for (const q of data.questions) {
        expect(["concept", "scenario"]).toContain(q.kind);
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(q.options.length);
        expect(q.options.every((option) => option.trim().length > 0)).toBe(true);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.question.length).toBeGreaterThan(0);
        expect(q.explanation.length).toBeGreaterThan(0);
        correctIndexes.add(q.correctIndex);
      }
    }

    expect(correctIndexes.size).toBeGreaterThanOrEqual(3);
  });

  it("unit-07 has no next chapter (last unit)", () => {
    const data = getUnitQuiz("unit-07");
    expect(data?.nextChapterSlug).toBe("");
  });

  it("all other units have a next chapter slug", () => {
    for (const slug of Object.keys(unitQuizData)) {
      if (slug === "unit-07") continue;
      const data = getUnitQuiz(slug);
      expect(data?.nextChapterSlug).toBeTruthy();
    }
  });

  it("getUnitQuiz returns undefined for unknown slug", () => {
    expect(getUnitQuiz("unit-99")).toBeUndefined();
  });
});
