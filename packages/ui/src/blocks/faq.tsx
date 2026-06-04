import * as React from "react";
import { cn } from "../lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  title?: string;
  items: FaqItem[];
  className?: string;
}

export function Faq({ title = "Perguntas frequentes", items, className }: FaqProps) {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <section className={cn("py-16 px-6", className)}>
      <h2 className="mb-10 text-2xl md:text-3xl font-bold text-foreground/90 text-center">
        {title}
      </h2>
      <div className="mx-auto max-w-2xl flex flex-col gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-border/18 bg-card/90 overflow-hidden"
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground/90 hover:bg-accent/5 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              {item.question}
              <svg
                className={cn(
                  "h-4 w-4 shrink-0 text-primary transition-transform",
                  open === i && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-foreground/55 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
