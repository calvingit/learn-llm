import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CourseCatalog } from "@/components/course/course-catalog";
import { Button } from "@/components/ui/button";
import { learnLLMChapters } from "@/lib/courses";

const contentChapterCount = learnLLMChapters.filter((chapter) =>
  chapter.slug.startsWith("chapter-"),
).length;
const unitCount = new Set(learnLLMChapters.map((chapter) => chapter.unit)).size;

export const metadata: Metadata = {
  title: "课程目录",
  description: `Learn-LLM ${contentChapterCount} 章交互式课程目录。`,
};

export default function LearnLLMCoursePage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            返回首页
          </Link>
        </Button>
        <section className="mt-8 flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-normal md:text-5xl">Learn-LLM 课程目录</h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-8">
            {contentChapterCount} 章、{unitCount} 个单元，从“AI 到底是什么”讲到 RAG、Agent
            和日常工作流。每章都围绕一个问题展开，保持短、清楚、可互动。
          </p>
        </section>
        <section className="mt-10">
          <CourseCatalog chapters={learnLLMChapters} />
        </section>
      </div>
    </main>
  );
}
