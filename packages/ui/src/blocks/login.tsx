import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";

export interface LoginProps {
  /** Título do card. */
  title?: string;
  /** Texto de apoio abaixo do título. */
  subtitle?: string;
  /** Texto do botão de submit. */
  ctaLabel?: string;
  /** Link da recuperação de senha. Omita para esconder. */
  forgotHref?: string;
  /** Conteúdo do rodapé (ex: link de cadastro). */
  footer?: React.ReactNode;
  /**
   * Callback de envio. Recebe { email, password }.
   * Retorne uma Promise para que o botão exiba estado de loading.
   */
  onSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
  className?: string;
}

/**
 * Login — tela de autenticação. Card centralizado com campos de e-mail e
 * senha, botão de acesso e link de recuperação. Gerencia estado de loading
 * internamente quando `onSubmit` devolve uma Promise.
 */
export function Login({
  title = "Acesse sua conta",
  subtitle,
  ctaLabel = "Entrar",
  forgotHref,
  footer,
  onSubmit,
  className,
}: LoginProps) {
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!onSubmit) return;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as {
      email: string;
      password: string;
    };
    try {
      setLoading(true);
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-lg border border-border/25 bg-card/90 p-8 shadow-card",
        className
      )}
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground/92">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-foreground/50">{subtitle}</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-email">E-mail</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Senha</Label>
            {forgotHref && (
              <a
                href={forgotHref}
                className="text-xs text-primary/80 hover:text-primary transition-colors"
              >
                Esqueceu a senha?
              </a>
            )}
          </div>
          <Input
            id="login-password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <Button type="submit" variant="primary" size="lg" disabled={loading} className="mt-1">
          {loading ? "Entrando…" : ctaLabel}
        </Button>
      </form>

      {footer && (
        <div className="mt-6 text-center text-sm text-foreground/50">{footer}</div>
      )}
    </div>
  );
}
