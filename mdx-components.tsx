import type { MDXComponents } from "mdx/types";

import { AgentFlow } from "@/components/course/agent-flow";
import { AITimeline } from "@/components/course/ai-timeline";
import {
  AgentDebugger,
  AgentWorkflowViewer,
  AiHierarchyMap,
  ArchitectureShowdown,
  ContextWindowMeter,
  CotStepByStep,
  DistillationDemo,
  EmbeddingMap,
  FeatureDetector,
  HallucinationDetector,
  LearningByExamples,
  ModelEvolutionSimulator,
  ModelLandscape,
  PredictNextWordSimulator,
  PromptSandbox,
  RAGSimulator,
  ReasoningPathCompare,
  RiskBoundaryCards,
  SamplingPlayground,
  TokenCostCalculator,
  TokenSplitter,
  ToolCallingStepper,
  TrainingTimeline,
  WorkflowBuilder,
} from "@/components/course/interactive-widgets";
import { NextSentenceGame } from "@/components/course/next-sentence-game";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AITimeline,
    AgentFlow,
    NextSentenceGame,
    AgentDebugger,
    AgentWorkflowViewer,
    AiHierarchyMap,
    ArchitectureShowdown,
    ContextWindowMeter,
    CotStepByStep,
    EmbeddingMap,
    FeatureDetector,
    HallucinationDetector,
    LearningByExamples,
    ModelEvolutionSimulator,
    PredictNextWordSimulator,
    PromptSandbox,
    RAGSimulator,
    ReasoningPathCompare,
    RiskBoundaryCards,
    SamplingPlayground,
    TokenCostCalculator,
    TokenSplitter,
    ToolCallingStepper,
    TrainingTimeline,
    DistillationDemo,
    ModelLandscape,
    WorkflowBuilder,
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "text-foreground mt-10 scroll-m-20 text-2xl font-semibold tracking-normal",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "text-foreground mt-8 scroll-m-20 text-xl font-semibold tracking-normal",
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p className={cn("text-foreground/82 my-5 leading-8", className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-5 flex list-disc flex-col gap-2 pl-6", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("text-foreground/82 leading-7", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-primary bg-primary/8 text-foreground my-6 rounded-lg border-l-4 px-5 py-4 text-lg leading-8 font-medium",
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "bg-muted text-foreground rounded-md px-1.5 py-0.5 text-sm font-medium",
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "bg-muted text-foreground my-6 overflow-x-auto rounded-lg border p-4 text-sm leading-7",
          className,
        )}
        {...props}
      />
    ),
    ...components,
  };
}
