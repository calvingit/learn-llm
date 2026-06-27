"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { CourseChapter } from "@/lib/courses";
import { useCourseProgress } from "./use-course-progress";

type ChapterCompletionProps = {
  chapter: CourseChapter;
  chapters: CourseChapter[];
};

export function ChapterCompletion({ chapter, chapters }: ChapterCompletionProps) {
  const { completedSet, completeChapter } = useCourseProgress();
  const completed = completedSet.has(chapter.slug);
  const completedCount = chapters.filter((item) => completedSet.has(item.slug)).length;
  const progressValue =
    chapters.length > 0 ? (completedCount / chapters.length) * 100 : 0;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">
            本地学习进度
          </p>
          <p className="text-lg font-semibold">
            已完成 {completedCount} / {chapters.length} 章
          </p>
        </div>
        <Button
          type="button"
          variant={completed ? "outline" : "default"}
          onClick={() => completeChapter(chapter.slug)}
        >
          <CheckCircle2 data-icon="inline-start" />
          {completed ? "本章已完成" : "标记本章完成"}
        </Button>
      </div>
      <Progress className="mt-4" value={progressValue} />
    </div>
  );
}
