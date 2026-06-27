import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CourseChapter } from "@/lib/courses";

type ChapterNavProps = {
  previous?: CourseChapter;
  next?: CourseChapter;
};

export function ChapterNav({ previous, next }: ChapterNavProps) {
  return (
    <nav className="mt-12 grid gap-4 border-t pt-8 md:grid-cols-2">
      <div>
        {previous ? (
          <Button asChild variant="outline">
            <Link href={`/courses/learn-llm/${previous.slug}`}>
              <ArrowLeft data-icon="inline-start" />
              上一章：{previous.title}
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link href="/courses/learn-llm">
              <ArrowLeft data-icon="inline-start" />
              返回课程目录
            </Link>
          </Button>
        )}
      </div>
      <div className="md:justify-self-end">
        {next ? (
          <Button asChild>
            <Link href={`/courses/learn-llm/${next.slug}`}>
              下一章：{next.title}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/courses/learn-llm">
              回到课程目录
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
