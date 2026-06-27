import { describe, expect, it } from "vitest";
import { markChapterComplete, readProgress } from "./progress";

function createStorage(seed?: Record<string, string>): Storage {
  const values = new Map(Object.entries(seed ?? {}));

  return {
    get length() {
      return values.size;
    },
    clear() {
      values.clear();
    },
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(values.keys())[index] ?? null;
    },
    removeItem(key: string) {
      values.delete(key);
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}

describe("course progress storage", () => {
  it("returns empty progress when storage is empty or invalid", () => {
    expect(readProgress(createStorage())).toEqual({ completedSlugs: [] });
    expect(
      readProgress(createStorage({ "learn-llm:progress:v1": "{bad json" })),
    ).toEqual({ completedSlugs: [] });
    expect(
      readProgress(createStorage({ "learn-llm:progress:v1": "{}" })),
    ).toEqual({ completedSlugs: [] });
  });

  it("marks chapters complete without duplicating slugs", () => {
    const storage = createStorage();

    expect(markChapterComplete(storage, "chapter-01")).toEqual({
      completedSlugs: ["chapter-01"],
    });
    expect(markChapterComplete(storage, "chapter-01")).toEqual({
      completedSlugs: ["chapter-01"],
    });
    expect(markChapterComplete(storage, "chapter-02")).toEqual({
      completedSlugs: ["chapter-01", "chapter-02"],
    });
    expect(readProgress(storage)).toEqual({
      completedSlugs: ["chapter-01", "chapter-02"],
    });
  });
});
