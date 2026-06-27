import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ChapterCompletion } from "@/components/course/chapter-completion";
import { ChapterNav } from "@/components/course/chapter-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdjacentChapters, getChapterBySlug, learnLLMChapters } from "@/lib/courses";
import { getChapterContent } from "@/lib/chapter-content";

type ChapterPageProps = {
  params: Promise<{
    chapter: string;
  }>;
};

export function generateStaticParams() {
  return learnLLMChapters.map((chapter) => ({
    chapter: chapter.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "章节不存在",
    };
  }

  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: slug } = await params;
  const chapter = getChapterBySlug(slug);
  const ChapterContent = getChapterContent(slug);

  if (!chapter || !ChapterContent) {
    notFound();
  }

  const { previous, next } = getAdjacentChapters(slug);

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-5 py-8">
        <Button asChild variant="ghost">
          <Link href="/courses/learn-llm">
            <ArrowLeft data-icon="inline-start" />
            返回课程目录
          </Link>
        </Button>
        <header className="bg-card mt-8 rounded-xl border p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap gap-3">
            <Badge variant="muted">{chapter.unit}</Badge>
            <Badge variant="secondary">
              {chapter.slug.startsWith("unit-")
                ? "单元总结"
                : `第 ${String(chapter.order).padStart(2, "0")} 章`}
            </Badge>
          </div>
          <h1 className="mt-5 text-4xl leading-tight font-semibold tracking-normal md:text-5xl">
            {chapter.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">{chapter.description}</p>
          <div className="mt-6">
            <ChapterCompletion chapter={chapter} chapters={learnLLMChapters} />
          </div>
        </header>

        <article className="bg-card mt-8 rounded-xl border px-5 py-2 shadow-sm md:px-8">
          <ChapterContent />
        </article>

        <ChapterNav previous={previous} next={next} />
      </div>
    </main>
  );
}
