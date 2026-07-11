import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { describe, expect, it } from "vitest";

import { learnLLMChapters } from "@/lib/courses";

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

const orderedSections = [
  "## 核心问题",
  "## 先建立直觉",
  "## 概念拆解",
  "## 互动理解",
  "## 常见误区",
  "## 实用方法",
  "## 自我检查",
  "## 真实场景",
  "## 延伸阅读",
  "## 一句话总结",
];

const rejectedClaims = [
  "所有现代大模型的底座",
  "训练是四个阶段的接力",
  "每一步分工不同，缺一不可",
  "纯文本模型覆盖了 80% 以上的需求",
];

const chapterFiles = Array.from({ length: 25 }, (_, index) => {
  return join(courseDir, `chapter-${String(index + 1).padStart(2, "0")}.mdx`);
});

function readChapter(file: string) {
  return readFileSync(file, "utf8");
}

function stripMdxImports(content: string) {
  return content.replace(/^(import .+;\n)+\n?/, "");
}

describe("learn-llm chapter content quality", () => {
  it("keeps every chapter substantial and consistently structured", () => {
    for (const file of chapterFiles) {
      const content = readChapter(file);
      const body = stripMdxImports(content);

      expect(body.startsWith("## 核心问题"), basename(file)).toBe(true);
      expect(content.length, basename(file)).toBeGreaterThanOrEqual(1400);

      for (const section of requiredSections) {
        expect(content, `${basename(file)} missing ${section}`).toContain(section);
      }

      expect(content, `${basename(file)} should include at least one MDX component`).toMatch(
        /<[A-Z][A-Za-z0-9]*\b/,
      );
    }
  });

  it("keeps chapter sections in the expected reading order", () => {
    for (const file of chapterFiles) {
      const content = readChapter(file);
      const positions = orderedSections.map((section) => content.indexOf(section));

      for (let index = 1; index < positions.length; index += 1) {
        expect(
          positions[index],
          `${basename(file)} should place ${orderedSections[index]} after ${orderedSections[index - 1]}`,
        ).toBeGreaterThan(positions[index - 1]);
      }
    }
  });

  it("keeps metadata and course files aligned at exactly 25 chapters and 7 summaries", () => {
    const chapterSlugs = learnLLMChapters
      .map((chapter) => chapter.slug)
      .filter((slug) => /^chapter-\d{2}$/.test(slug));
    const summarySlugs = learnLLMChapters
      .map((chapter) => chapter.slug)
      .filter((slug) => /^unit-\d{2}-summary$/.test(slug));

    expect(chapterSlugs).toEqual(
      Array.from({ length: 25 }, (_, index) => `chapter-${String(index + 1).padStart(2, "0")}`),
    );
    expect(summarySlugs).toEqual(
      Array.from({ length: 7 }, (_, index) => `unit-${String(index + 1).padStart(2, "0")}-summary`),
    );

    for (const slug of [...chapterSlugs, ...summarySlugs]) {
      expect(existsSync(join(courseDir, `${slug}.mdx`)), `${slug}.mdx`).toBe(true);
    }
  });

  it("rejects the specific overclaims identified by the content review", () => {
    for (const file of [
      ...chapterFiles,
      ...Array.from({ length: 7 }, (_, index) =>
        join(courseDir, `unit-${String(index + 1).padStart(2, "0")}-summary.mdx`),
      ),
    ]) {
      const content = readChapter(file);

      for (const claim of rejectedClaims) {
        expect(content, `${basename(file)} should not contain: ${claim}`).not.toContain(claim);
      }
    }
  });

  it("distinguishes open source from open weights throughout chapter 24", () => {
    const content = readChapter(join(courseDir, "chapter-24.mdx"));

    expect(content).toContain("“开源”通常意味着");
    expect(content).toContain("“开放权重”表示");
    expect(content).toContain("“可商用”则取决于");
    expect(content).not.toContain("开源模型");
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
