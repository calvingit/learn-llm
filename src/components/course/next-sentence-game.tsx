"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const options = [
  {
    label: "A",
    text: "他回去拿伞。",
    correct: true,
    explanation: "这句话最符合上下文：下雨、没带伞、走到门口，所以回去拿伞很合理。",
  },
  {
    label: "B",
    text: "他开始唱歌。",
    correct: false,
    explanation: "这不是完全不可能，但和前面的关键信息关系不强。",
  },
  {
    label: "C",
    text: "他打开电视。",
    correct: false,
    explanation: "这句话跳到了另一个场景，和“走到门口”不太衔接。",
  },
];

export function NextSentenceGame() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const selected = options.find((option) => option.label === selectedLabel);

  return (
    <section className="my-8 rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="mt-0 text-xl font-semibold tracking-normal">
          预测下一句话
        </h3>
        <p className="my-2 text-sm leading-6 text-muted-foreground">
          选择你觉得最符合上下文的一句，再看为什么它更合理。
        </p>
      </div>
      <div className="rounded-lg bg-muted p-5">
        <p className="my-0 text-lg font-semibold leading-8">
          小明没带伞，外面正在下雨，他走到门口……
        </p>
      </div>
      <div className="mt-4 grid gap-3">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            className={cn(
              "rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted",
              selectedLabel === option.label && option.correct && "border-primary bg-primary/8",
              selectedLabel === option.label &&
                !option.correct &&
                "border-accent bg-accent/8",
            )}
            onClick={() => setSelectedLabel(option.label)}
          >
            <span className="font-semibold">{option.label}. </span>
            {option.text}
          </button>
        ))}
      </div>
      {selected ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg border bg-muted p-4"
        >
          <p className="my-0 font-semibold">
            {selected.correct ? "最合理的下一句" : "这句不太贴合上下文"}
          </p>
          <p className="mb-0 mt-2 leading-7 text-foreground/82">
            {selected.explanation}
          </p>
          <p className="mb-0 mt-3 text-sm leading-6 text-muted-foreground">
            模型不是魔法，它是在判断哪句话最符合当前上下文。
          </p>
        </motion.div>
      ) : null}
      <Button
        className="mt-4"
        type="button"
        variant="outline"
        onClick={() => setSelectedLabel(null)}
      >
        重选一次
      </Button>
    </section>
  );
}
