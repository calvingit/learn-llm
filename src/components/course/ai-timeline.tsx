"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stages = [
  {
    title: "传统程序",
    explanation: "人把规则写清楚，机器照着一步一步执行。",
    example: "像一本菜谱：先做什么、后做什么都写死。",
  },
  {
    title: "机器学习",
    explanation: "人给机器很多例子，机器自己总结判断规律。",
    example: "像看过很多邮件后，学会判断哪些像垃圾邮件。",
  },
  {
    title: "深度学习",
    explanation: "机器开始从大量材料里自己找关键特征。",
    example: "像小孩看过很多猫后，不用背定义也能认猫。",
  },
  {
    title: "大模型",
    explanation: "把很多任务统一成不断预测下一个文字块。",
    example: "像一个读过很多书的人，能顺着上下文继续说。",
  },
  {
    title: "Agent",
    explanation: "模型负责判断下一步，外部工具负责真正执行。",
    example: "像会出主意的助手，旁边配了能干活的工具箱。",
  },
];

export function AITimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = stages[activeIndex];

  return (
    <section className="my-8 rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mt-0 text-xl font-semibold tracking-normal">
            AI 演进时间线
          </h3>
          <p className="my-2 text-sm leading-6 text-muted-foreground">
            点击每个阶段，看看 AI 是怎样一步步发展到 Agent 的。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {stages.map((stage, index) => (
            <Button
              key={stage.title}
              type="button"
              variant={activeIndex === index ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveIndex(index)}
            >
              {stage.title}
            </Button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-5">
          {stages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              className={cn(
                "h-3 rounded-full transition-colors",
                activeIndex === index ? "bg-primary" : "bg-muted",
              )}
              aria-label={`查看${stage.title}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <motion.div
          key={activeStage.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="rounded-lg bg-muted p-5"
        >
          <h3 className="mt-0 text-xl font-semibold">{activeStage.title}</h3>
          <p className="my-3 leading-7 text-foreground/82">
            {activeStage.explanation}
          </p>
          <p className="my-0 rounded-md bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">
            {activeStage.example}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
