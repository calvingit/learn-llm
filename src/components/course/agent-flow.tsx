import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "用户提出任务",
    detail: "比如：帮我查资料，并整理成一段说明。",
  },
  {
    title: "模型判断下一步",
    detail: "模型先决定现在应该搜索、读取文件，还是直接回答。",
  },
  {
    title: "调用工具",
    detail: "系统把模型选中的动作交给真实工具执行。",
  },
  {
    title: "工具返回结果",
    detail: "工具把搜索结果、文件内容或执行结果交回来。",
  },
  {
    title: "模型继续判断",
    detail: "模型根据新信息决定继续查、修正，还是给出最终答案。",
  },
];

export function AgentFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const visibleSteps = steps.slice(0, activeStep + 1);

  return (
    <section className="bg-card my-8 rounded-xl border p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mt-0 text-xl font-semibold tracking-normal">Agent 工具调用流程</h3>
          <p className="text-muted-foreground my-2 text-sm leading-6">
            逐步点亮每一步，观察模型和外部工具如何配合。
          </p>
        </div>
        <div className="grid gap-3">
          {steps.map((step, index) => {
            const active = index <= activeStep;

            return (
              <motion.div
                key={step.title}
                initial={false}
                animate={{ opacity: active ? 1 : 0.45 }}
                className={cn(
                  "rounded-lg border p-4 transition-colors",
                  active ? "bg-primary/8" : "bg-card",
                )}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="bg-primary text-primary-foreground inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="mt-0 text-lg font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground my-0 text-sm leading-6">{step.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="bg-muted text-muted-foreground rounded-lg p-4 text-sm leading-7">
          当前已经点亮：{visibleSteps.map((step) => step.title).join(" → ")}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => setActiveStep((step) => Math.min(step + 1, steps.length - 1))}
          >
            下一步
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button type="button" variant="outline" onClick={() => setActiveStep(0)}>
            重新开始
          </Button>
        </div>
      </div>
    </section>
  );
}
