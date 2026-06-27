import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
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
}
