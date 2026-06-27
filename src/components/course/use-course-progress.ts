"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  type CourseProgress,
  markChapterComplete,
  readProgress,
} from "@/lib/progress";

const EMPTY_PROGRESS: CourseProgress = { completedSlugs: [] };

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>(EMPTY_PROGRESS);

  useEffect(() => {
    setProgress(readProgress(window.localStorage));
  }, []);

  const completedSet = useMemo(
    () => new Set(progress.completedSlugs),
    [progress.completedSlugs],
  );

  const completeChapter = useCallback((slug: string) => {
    setProgress(markChapterComplete(window.localStorage, slug));
  }, []);

  return {
    progress,
    completedSet,
    completeChapter,
  };
}
