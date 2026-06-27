import type { ComponentType } from "react";

import Chapter01 from "@/content/courses/learn-llm/chapter-01.mdx";
import Chapter02 from "@/content/courses/learn-llm/chapter-02.mdx";
import Chapter03 from "@/content/courses/learn-llm/chapter-03.mdx";
import Chapter04 from "@/content/courses/learn-llm/chapter-04.mdx";
import Chapter05 from "@/content/courses/learn-llm/chapter-05.mdx";
import Chapter06 from "@/content/courses/learn-llm/chapter-06.mdx";
import Chapter07 from "@/content/courses/learn-llm/chapter-07.mdx";
import Chapter08 from "@/content/courses/learn-llm/chapter-08.mdx";
import Chapter09 from "@/content/courses/learn-llm/chapter-09.mdx";
import Chapter10 from "@/content/courses/learn-llm/chapter-10.mdx";
import Chapter11 from "@/content/courses/learn-llm/chapter-11.mdx";
import Chapter12 from "@/content/courses/learn-llm/chapter-12.mdx";

const chapterContentBySlug: Record<string, ComponentType> = {
  "chapter-01": Chapter01,
  "chapter-02": Chapter02,
  "chapter-03": Chapter03,
  "chapter-04": Chapter04,
  "chapter-05": Chapter05,
  "chapter-06": Chapter06,
  "chapter-07": Chapter07,
  "chapter-08": Chapter08,
  "chapter-09": Chapter09,
  "chapter-10": Chapter10,
  "chapter-11": Chapter11,
  "chapter-12": Chapter12,
};

export function getChapterContent(slug: string) {
  return chapterContentBySlug[slug];
}
