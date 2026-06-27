"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  type CourseProgress,
  markChapterComplete,
  readProgress,
} from "@/lib/progress";

const EMPTY_PROGRESS: CourseProgress = { completedSlugs: [] };

function getProgressStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch (error) {
    console.warn(
      "Learn-LLM progress storage is unavailable; progress will stay in memory.",
      error,
    );
    return undefined;
  }
}

function completeProgressInMemory(
  progress: CourseProgress,
  slug: string,
): CourseProgress {
  if (progress.completedSlugs.includes(slug)) {
    return progress;
  }

  return {
    completedSlugs: [...progress.completedSlugs, slug],
  };
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>(EMPTY_PROGRESS);

  useEffect(() => {
    const storage = getProgressStorage();

    if (!storage) {
      return;
    }

    try {
      setProgress(readProgress(storage));
    } catch (error) {
      console.warn(
        "Learn-LLM progress could not be read; progress will stay in memory.",
        error,
      );
    }
  }, []);

  const completedSet = useMemo(
    () => new Set(progress.completedSlugs),
    [progress.completedSlugs],
  );

  const completeChapter = useCallback((slug: string) => {
    setProgress((currentProgress) => {
      const inMemoryProgress = completeProgressInMemory(currentProgress, slug);
      const storage = getProgressStorage();

      if (!storage) {
        return inMemoryProgress;
      }

      try {
        return markChapterComplete(storage, slug);
      } catch (error) {
        console.warn(
          "Learn-LLM progress could not be saved; progress will stay in memory.",
          error,
        );
        return inMemoryProgress;
      }
    });
  }, []);

  return {
    progress,
    completedSet,
    completeChapter,
  };
}
