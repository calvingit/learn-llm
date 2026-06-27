import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CourseCatalog } from "@/components/course/course-catalog";
import { Button } from "@/components/ui/button";
import { learnLLMChapters } from "@/lib/courses";

export const metadata: Metadata = {
  title: "课程目录",
  description: "Learn-LLM 12 章课程目录。",
};

export default function LearnLLMCoursePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            返回首页
          </Link>
        </Button>
        <section className="mt-8 flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-normal md:text-5xl">
            Learn-LLM 课程目录
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            12 章、4 个单元，从“AI 到底是什么”讲到“普通人怎么正确使用大模型”。每章都围绕一个问题展开，保持短、清楚、可互动。
          </p>
        </section>
        <section className="mt-10">
          <CourseCatalog chapters={learnLLMChapters} />
        </section>
      </div>
    </main>
  );
}
