import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/button";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo: React.ReactNode;
  links?: NavLink[];
  cta?: { label: string; href: string };
  className?: string;
}

export function Navbar({ logo, links = [], cta, className }: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/10 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center">{logo}</div>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/60 hover:text-foreground/90 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {cta && (
            <Button asChild variant="primary" size="sm" className="hidden md:inline-flex">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}
          <button
            className="md:hidden p-2 text-foreground/60 hover:text-foreground/90 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/10 bg-background/95 px-6 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/60 hover:text-foreground/90 transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {cta && (
            <Button asChild variant="primary" size="sm" className="mt-2 w-full">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
