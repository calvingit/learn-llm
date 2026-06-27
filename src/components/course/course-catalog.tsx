"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CourseChapter } from "@/lib/courses";
import { useCourseProgress } from "./use-course-progress";

type CourseCatalogProps = {
  chapters: CourseChapter[];
};

function groupByUnit(chapters: CourseChapter[]) {
  return chapters.reduce<Array<{ unit: string; chapters: CourseChapter[] }>>((groups, chapter) => {
    const lastGroup = groups.at(-1);

    if (lastGroup?.unit === chapter.unit) {
      lastGroup.chapters.push(chapter);
      return groups;
    }

    groups.push({ unit: chapter.unit, chapters: [chapter] });
    return groups;
  }, []);
}

export function CourseCatalog({ chapters }: CourseCatalogProps) {
  const { completedSet } = useCourseProgress();
  const completedCount = chapters.filter((chapter) => completedSet.has(chapter.slug)).length;
  const progressValue = chapters.length > 0 ? (completedCount / chapters.length) * 100 : 0;
  const nextChapter = chapters.find((chapter) => !completedSet.has(chapter.slug)) ?? chapters[0];

  return (
    <div className="flex flex-col gap-8">
      <section className="bg-card rounded-xl border p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm font-medium">学习进度</p>
            <h2 className="text-2xl font-semibold tracking-normal">
              已完成 {completedCount} / {chapters.length} 章
            </h2>
          </div>
          <Button asChild>
            <Link href={`/courses/learn-llm/${nextChapter.slug}`}>
              继续学习
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <Progress className="mt-5" value={progressValue} />
      </section>

      {groupByUnit(chapters).map((group) => (
        <section key={group.unit} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary size-2 rounded-full" />
            <h2 className="text-xl font-semibold tracking-normal">{group.unit}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {group.chapters.map((chapter) => {
              const completed = completedSet.has(chapter.slug);

              return (
                <Card key={chapter.slug} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <Badge variant={completed ? "default" : "muted"}>
                        {String(chapter.order).padStart(2, "0")}
                      </Badge>
                      <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                        {completed ? (
                          <CheckCircle2 data-icon="inline-start" className="size-4" />
                        ) : (
                          <Circle data-icon="inline-start" className="size-4" />
                        )}
                        {completed ? "已完成" : "未完成"}
                      </span>
                    </div>
                    <CardTitle>{chapter.title}</CardTitle>
                    <CardDescription>{chapter.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild variant={completed ? "outline" : "default"}>
                      <Link href={`/courses/learn-llm/${chapter.slug}`}>
                        {completed ? "重新阅读" : "开始学习"}
                        <ArrowRight data-icon="inline-end" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
