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
import Chapter13 from "@/content/courses/learn-llm/chapter-13.mdx";
import Chapter14 from "@/content/courses/learn-llm/chapter-14.mdx";
import Chapter15 from "@/content/courses/learn-llm/chapter-15.mdx";
import Chapter16 from "@/content/courses/learn-llm/chapter-16.mdx";
import Chapter17 from "@/content/courses/learn-llm/chapter-17.mdx";
import Chapter18 from "@/content/courses/learn-llm/chapter-18.mdx";
import Chapter19 from "@/content/courses/learn-llm/chapter-19.mdx";
import Chapter20 from "@/content/courses/learn-llm/chapter-20.mdx";
import Chapter21 from "@/content/courses/learn-llm/chapter-21.mdx";
import Chapter22 from "@/content/courses/learn-llm/chapter-22.mdx";
import Chapter23 from "@/content/courses/learn-llm/chapter-23.mdx";
import Chapter24 from "@/content/courses/learn-llm/chapter-24.mdx";

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
  "chapter-13": Chapter13,
  "chapter-14": Chapter14,
  "chapter-15": Chapter15,
  "chapter-16": Chapter16,
  "chapter-17": Chapter17,
  "chapter-18": Chapter18,
  "chapter-19": Chapter19,
  "chapter-20": Chapter20,
  "chapter-21": Chapter21,
  "chapter-22": Chapter22,
  "chapter-23": Chapter23,
  "chapter-24": Chapter24,
};

export function getChapterContent(slug: string) {
  return chapterContentBySlug[slug];
}
