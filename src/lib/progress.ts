export const PROGRESS_STORAGE_KEY = "learn-llm:progress:v1";

export type CourseProgress = {
  completedSlugs: string[];
};

function normalizeProgress(value: unknown): CourseProgress {
  if (
    typeof value !== "object" ||
    value === null ||
    !("completedSlugs" in value)
  ) {
    return { completedSlugs: [] };
  }

  const completedSlugs = (value as { completedSlugs: unknown }).completedSlugs;

  if (!Array.isArray(completedSlugs)) {
    return { completedSlugs: [] };
  }

  return {
    completedSlugs: Array.from(
      new Set(
        completedSlugs.filter(
          (slug): slug is string => typeof slug === "string" && slug.length > 0,
        ),
      ),
    ),
  };
}

export function readProgress(storage: Pick<Storage, "getItem">): CourseProgress {
  const rawProgress = storage.getItem(PROGRESS_STORAGE_KEY);

  if (!rawProgress) {
    return { completedSlugs: [] };
  }

  try {
    return normalizeProgress(JSON.parse(rawProgress));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { completedSlugs: [] };
    }

    throw error;
  }
}

export function writeProgress(
  storage: Pick<Storage, "setItem">,
  progress: CourseProgress,
): void {
  storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
}

export function markChapterComplete(
  storage: Pick<Storage, "getItem" | "setItem">,
  slug: string,
): CourseProgress {
  const progress = readProgress(storage);
  const completedSlugs = progress.completedSlugs.includes(slug)
    ? progress.completedSlugs
    : [...progress.completedSlugs, slug];
  const nextProgress = { completedSlugs };

  writeProgress(storage, nextProgress);
  return nextProgress;
}
