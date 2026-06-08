import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Toaster (sonner) — sistema de toasts empilháveis via a lib `sonner`.
 * O tema acompanha a classe `.light` no <html> (sem next-themes), e as
 * cores usam os tokens da marca. Renderize uma vez na raiz da app e
 * dispare com `toast()` importado de `sonner`.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setTheme(root.classList.contains("light") ? "light" : "dark");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground/90 group-[.toaster]:border group-[.toaster]:border-border/20 group-[.toaster]:rounded-lg group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-foreground/60",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-accent/20 group-[.toast]:text-foreground/70",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
