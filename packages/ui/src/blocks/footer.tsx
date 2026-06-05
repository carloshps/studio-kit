import * as React from "react";
import { cn } from "../lib/utils";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  brand: {
    name: string;
    tagline?: string;
  };
  columns?: FooterColumn[];
  legal?: string;
  className?: string;
}

export function Footer({ brand, columns = [], legal, className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border/10 bg-background-secondary", className)}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap gap-10">
          <div className="w-full md:flex-1 min-w-[180px]">
            <span className="text-base font-bold text-foreground/90">{brand.name}</span>
            {brand.tagline && (
              <p className="mt-2 max-w-xs text-sm text-foreground/45 leading-relaxed">
                {brand.tagline}
              </p>
            )}
          </div>
          {columns.map((col) => (
            <div key={col.title} className="min-w-[120px]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/55 hover:text-foreground/90 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/35">
          <span>© {year} {brand.name}</span>
          {legal && <span>{legal}</span>}
        </div>
      </div>
    </footer>
  );
}
