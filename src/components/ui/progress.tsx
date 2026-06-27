import * as React from "react";

import { cn } from "@/lib/utils";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number;
};

function Progress({ className, value, ...props }: ProgressProps) {
  const boundedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={boundedValue}
      {...props}
    >
      <div
        className="h-full rounded-full bg-primary transition-all duration-300"
        style={{ width: `${boundedValue}%` }}
      />
    </div>
  );
}

export { Progress };
