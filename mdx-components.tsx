import type { MDXComponents } from "mdx/types";

import { AgentFlow } from "@/components/course/agent-flow";
import { AITimeline } from "@/components/course/ai-timeline";
import { NextSentenceGame } from "@/components/course/next-sentence-game";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AITimeline,
    AgentFlow,
    NextSentenceGame,
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 text-2xl font-semibold tracking-normal text-foreground",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-xl font-semibold tracking-normal text-foreground",
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p className={cn("my-5 leading-8 text-foreground/82", className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-5 flex list-disc flex-col gap-2 pl-6", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("leading-7 text-foreground/82", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-6 rounded-lg border-l-4 border-primary bg-primary/8 px-5 py-4 text-lg font-medium leading-8 text-foreground",
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "rounded-md bg-muted px-1.5 py-0.5 text-sm font-medium text-foreground",
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "my-6 overflow-x-auto rounded-lg border bg-muted p-4 text-sm leading-7 text-foreground",
          className,
        )}
        {...props}
      />
    ),
    ...components,
  };
}
