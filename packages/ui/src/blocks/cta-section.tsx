import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/button";

export interface CtaSectionProps {
  title: string;
  subtitle?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

export function CtaSection({ title, subtitle, cta, secondaryCta, className }: CtaSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-lg border border-accent/25 bg-gradient-result px-8 py-16 text-center shadow-hero",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-foreground/92">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base text-foreground/50 max-w-lg mx-auto">{subtitle}</p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button asChild variant="primary" size="lg">
          <a href={cta.href}>{cta.label}</a>
        </Button>
        {secondaryCta && (
          <Button asChild variant="outline" size="lg">
            <a href={secondaryCta.href}>{secondaryCta.label}</a>
          </Button>
        )}
      </div>
    </section>
  );
}
