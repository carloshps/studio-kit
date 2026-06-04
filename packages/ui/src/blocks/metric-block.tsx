import * as React from "react";
import { cn } from "../lib/utils";

export interface MetricBlockProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
}

export function MetricBlock({ value, label, description, className }: MetricBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg border border-border/25 bg-card/90 p-6 shadow-metric",
        className
      )}
    >
      <span
        className="text-4xl font-extrabold text-primary"
        style={{ textShadow: "0 0 16px rgba(0,173,207,0.40)" }}
      >
        {value}
      </span>
      <span className="text-sm font-semibold text-foreground/90">{label}</span>
      {description && (
        <span className="text-xs text-foreground/45 leading-snug">{description}</span>
      )}
    </div>
  );
}
