import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/button";
import { Input } from "../components/input";

export interface LeadFormProps {
  title?: string;
  subtitle?: string;
  apiEndpoint: string;
  ctaLabel?: string;
  successMessage?: string;
  className?: string;
}

export function LeadForm({
  title,
  subtitle,
  apiEndpoint,
  ctaLabel = "Quero começar",
  successMessage = "Recebemos seu contato. Retorno em breve.",
  className,
}: LeadFormProps) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Erro ao enviar. Tente novamente ou fale pelo WhatsApp.");
    }
  }

  return (
    <div className={cn("rounded-lg border border-border/25 bg-card/90 p-8 shadow-card", className)}>
      {title && (
        <h2 className="text-xl font-bold text-foreground/92 mb-1">{title}</h2>
      )}
      {subtitle && (
        <p className="text-sm text-foreground/50 mb-6">{subtitle}</p>
      )}

      {status === "success" ? (
        <p className="text-sm text-primary font-medium py-4">{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input name="name" placeholder="Seu nome" required autoComplete="name" />
          <Input name="email" type="email" placeholder="E-mail" required autoComplete="email" />
          <Input name="whatsapp" placeholder="WhatsApp (opcional)" autoComplete="tel" />
          <textarea
            name="message"
            placeholder="Como posso te ajudar?"
            rows={3}
            className={cn(
              "flex w-full rounded-lg border border-border/18 bg-background/60 px-4 py-2 text-sm text-foreground/90 placeholder:text-foreground/40 transition-colors resize-none",
              "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-accent/40"
            )}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" variant="default" size="lg" disabled={status === "loading"}>
            {status === "loading" ? "Enviando…" : ctaLabel}
          </Button>
        </form>
      )}
    </div>
  );
}
