import * as React from "react";
import { cn } from "../lib/utils";

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}

export interface TestimonialProps {
  items: TestimonialItem[];
  className?: string;
}

export function Testimonial({ items, className }: TestimonialProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, i) => (
        <figure
          key={i}
          className="flex flex-col gap-4 rounded-lg border border-border/25 bg-card/90 p-6 shadow-card"
        >
          <blockquote className="text-sm text-foreground/70 leading-relaxed">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <figcaption className="flex items-center gap-3 mt-auto">
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item.author}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-accent/40"
              />
            ) : (
              <div
                className="h-9 w-9 rounded-full bg-gradient-avatar ring-2 ring-accent/40 flex items-center justify-center text-xs font-bold text-foreground/70"
                aria-hidden
              >
                {item.author[0]}
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-foreground/90">{item.author}</div>
              {item.role && (
                <div className="text-xs text-foreground/45">{item.role}</div>
              )}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
