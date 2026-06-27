import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { describe, expect, it } from "vitest";

const courseDir = join(process.cwd(), "src/content/courses/learn-llm");
const visualsDir = join(process.cwd(), "public/images/learn-llm/visuals");

const requiredSections = [
  "## 核心问题",
  "## 先建立直觉",
  "## 概念拆解",
  "## 互动理解",
  "## 常见误区",
  "## 实用方法",
  "## 一句话总结",
];

const chapterFiles = Array.from({ length: 24 }, (_, index) => {
  return join(courseDir, `chapter-${String(index + 1).padStart(2, "0")}.mdx`);
});

function readChapter(file: string) {
  return readFileSync(file, "utf8");
}

describe("learn-llm chapter content quality", () => {
  it("keeps every chapter substantial and consistently structured", () => {
    for (const file of chapterFiles) {
      const content = readChapter(file);

      expect(content.startsWith("## 核心问题"), basename(file)).toBe(true);
      expect(content.length, basename(file)).toBeGreaterThanOrEqual(1400);

      for (const section of requiredSections) {
        expect(content, `${basename(file)} missing ${section}`).toContain(section);
      }

      expect(content, `${basename(file)} should include at least one MDX component`).toMatch(
        /<[A-Z][A-Za-z0-9]*\b/,
      );
    }
  });

  it("keeps generated visual references in the project image directory", () => {
    const courseVisualPattern = /<CourseVisual\s+([\s\S]*?)\/>/g;

    for (const file of chapterFiles) {
      const content = readChapter(file);
      const visualMatches = [...content.matchAll(courseVisualPattern)];

      for (const match of visualMatches) {
        const props = match[1];
        const src = props.match(/src="([^"]+)"/)?.[1];
        const alt = props.match(/alt="([^"]+)"/)?.[1];
        const caption = props.match(/caption="([^"]+)"/)?.[1];

        expect(src, `${basename(file)} CourseVisual src`).toMatch(
          /^\/images\/learn-llm\/visuals\/[a-z0-9-]+\.(png|jpg|jpeg|webp)$/,
        );
        expect(alt?.length ?? 0, `${basename(file)} CourseVisual alt`).toBeGreaterThan(10);
        expect(caption?.length ?? 0, `${basename(file)} CourseVisual caption`).toBeGreaterThan(10);

        if (src) {
          const projectPath = join(visualsDir, src.replace("/images/learn-llm/visuals/", ""));
          expect(existsSync(projectPath), `${basename(file)} missing image ${src}`).toBe(true);
        }
      }
    }
  });
});
