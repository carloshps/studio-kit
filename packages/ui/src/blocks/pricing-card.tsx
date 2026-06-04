import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/button";
import { Badge } from "../components/badge";

export interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period = "único",
  description,
  features,
  cta,
  highlight = false,
  badge,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border bg-card/90 p-8 shadow-card",
        highlight
          ? "border-accent/40 shadow-hero"
          : "border-border/25",
        className
      )}
    >
      {highlight && (
        <span
          className="absolute inset-x-0 top-0 h-0.5 rounded-t-lg bg-primary"
          aria-hidden
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground/90">{name}</h3>
        {badge && <Badge variant="accent">{badge}</Badge>}
      </div>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-extrabold text-foreground/92">{price}</span>
        <span className="mb-1 text-sm text-foreground/45">/ {period}</span>
      </div>

      {description && (
        <p className="mt-2 text-sm text-foreground/50 leading-snug">{description}</p>
      )}

      <ul className="mt-6 flex flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground/75">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <Button asChild variant={highlight ? "primary" : "default"} size="lg" className="mt-8 w-full">
        <a href={cta.href}>{cta.label}</a>
      </Button>
    </div>
  );
}
