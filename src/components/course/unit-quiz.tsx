"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getUnitQuiz } from "@/lib/quiz-questions";
import { cn } from "@/lib/utils";

type UnitQuizProps = {
  /** 单元标识，如 "unit-01"、"unit-02" 等 */
  unitSlug: string;
};

export function UnitQuiz({ unitSlug }: UnitQuizProps) {
  const data = getUnitQuiz(unitSlug);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;

  const { questions, nextChapterSlug } = data;

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const correctCount = questions.filter((q, i) => answers[i] === q.correctIndex).length;

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className="bg-card my-8 rounded-xl border p-5 shadow-sm md:p-6">
      <div className="mb-5">
        <h3 className="mt-0 text-xl font-semibold tracking-normal">单元测验</h3>
        <p className="text-muted-foreground my-2 text-sm leading-6">
          检查一下你对本单元核心概念的理解（共 {questions.length} 题）
        </p>
      </div>

      <div className="space-y-5">
        {questions.map((q, qi) => {
          const selectedIndex = answers[qi];
          const isCorrect = selectedIndex === q.correctIndex;

          return (
            <div key={qi} className="rounded-lg border p-4">
              <p className="leading-7 font-semibold">
                {qi + 1}. {q.question}
              </p>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selectedIndex === oi;
                  const isCorrectOption = oi === q.correctIndex;

                  let optionStyle = "border bg-card hover:bg-muted";
                  if (submitted) {
                    if (isCorrectOption) {
                      optionStyle =
                        "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200";
                    } else if (isSelected && !isCorrectOption) {
                      optionStyle =
                        "border-red-400 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200";
                    } else {
                      optionStyle = "border bg-card text-muted-foreground/60";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-primary bg-primary/8";
                  }

                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm leading-6 transition-colors",
                        optionStyle,
                      )}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                          submitted &&
                            isCorrectOption &&
                            "border-emerald-500 bg-emerald-500 text-white",
                          submitted &&
                            isSelected &&
                            !isCorrectOption &&
                            "border-red-400 bg-red-400 text-white",
                          !submitted &&
                            isSelected &&
                            "border-primary bg-primary text-primary-foreground",
                          !submitted &&
                            !isSelected &&
                            "border-muted-foreground/30 text-muted-foreground",
                        )}
                      >
                        {submitted && isCorrectOption ? (
                          <Check className="size-3" />
                        ) : submitted && isSelected && !isCorrectOption ? (
                          <X className="size-3" />
                        ) : (
                          String.fromCharCode(65 + oi)
                        )}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mt-3 rounded-lg border p-3 text-sm leading-6",
                    isCorrect
                      ? "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40"
                      : "border-red-200 bg-red-50 dark:bg-red-950/40",
                  )}
                >
                  <p className="font-semibold">{isCorrect ? "回答正确" : "回答不正确"}</p>
                  <p className="text-muted-foreground mt-1">{q.explanation}</p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <Button type="button" disabled={!allAnswered} onClick={() => setSubmitted(true)}>
            提交答案
          </Button>
        ) : (
          <p className="text-sm font-medium">
            答对 {correctCount} / {questions.length} 题
            {correctCount === questions.length ? " 🎉" : ""}
          </p>
        )}
        <Button type="button" variant="outline" onClick={handleReset}>
          <RotateCcw data-icon="inline-start" />
          重做
        </Button>
        {nextChapterSlug && (
          <Button asChild variant="ghost" className="ml-auto">
            <Link href={`/courses/learn-llm/${nextChapterSlug}`}>
              跳过测验，进入下一单元
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
