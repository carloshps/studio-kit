import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/button";
import { Badge } from "../components/badge";

export interface HeroProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-36",
        "bg-background shadow-hero",
        className
      )}
    >
      {eyebrow && (
        <Badge variant="accent" className="mb-6">
          {eyebrow}
        </Badge>
      )}

      <h1 className="max-w-3xl text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground/92">
        {titleHighlight ? (
          <>
            {title}{" "}
            <span className="text-primary">{titleHighlight}</span>
          </>
        ) : (
          title
        )}
      </h1>

      {subtitle && (
        <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/50 leading-relaxed">
          {subtitle}
        </p>
      )}

      {(primaryCta || secondaryCta) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {primaryCta && (
            <Button asChild variant="default" size="lg">
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
          )}
          {secondaryCta && (
            <Button asChild variant="outline" size="lg">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
