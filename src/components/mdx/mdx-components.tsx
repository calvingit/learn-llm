import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "text-foreground mt-9 scroll-m-20 text-xl font-semibold tracking-normal",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "text-foreground mt-7 scroll-m-20 text-lg font-semibold tracking-normal",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("text-foreground/82 my-4 text-[15px] leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 flex list-disc flex-col gap-1.5 pl-5", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("text-foreground/82 text-[15px] leading-7", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "text-primary decoration-primary/35 hover:decoration-primary underline underline-offset-4 transition-colors",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-primary bg-primary/8 text-foreground my-5 rounded-lg border-l-4 px-4 py-3 text-base leading-7 font-medium",
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
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
  th: ({ children }) => (
    <th className="text-foreground px-4 py-3 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => <td className="border-t px-4 py-3">{children}</td>,
};
