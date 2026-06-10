import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Orb — indicador de processamento em camadas animadas.
 *
 * Inspirado no "teatro de análise" do onboarding do Studio: comunica
 * trabalho em andamento sem o ruído visual de um spinner giratório.
 *
 * Três camadas sobrepostas:
 *   1. Anel estático externo — delimitador de espaço
 *   2. Anel expansor (animate-ping) — pulso de "ondas saindo"
 *   3. Núcleo pulsante (animate-pulse) — miolo que respira
 *
 * Cada camada usa a cor semântica `primary` via Tailwind, então herda
 * automaticamente o tema dark/light do Studio Kit.
 *
 * Uso básico:
 *   <Orb />
 *
 * Com tamanho customizado:
 *   <Orb size="lg" />
 *
 * Desativando animações (ex.: estado pausado):
 *   <Orb animate={false} />
 *
 * Embrulhado num container com label acessível:
 *   <div role="status" aria-label="Processando…">
 *     <Orb />
 *   </div>
 *
 * @remarks
 * A animação é automaticamente suprimida quando o sistema operacional
 * tem `prefers-reduced-motion: reduce` ativado (via classe Tailwind
 * `motion-safe:`). Nesse caso o Orb fica estático mas visível.
 *
 * Timing padrão: 2s em ambas as animações — compatível com o `showAnalysis`
 * do modal-onboarding.js do Studio (delays [0, 900, 1750]ms / total 5s).
 */

export type OrbSize = "sm" | "md" | "lg";

export interface OrbProps {
  /** Tamanho do orbe. Padrão: "md" (56 × 56 px). */
  size?: OrbSize;
  /** Duração das animações em milissegundos. Padrão: 2000. */
  durationMs?: number;
  /** Desativa as animações mantendo a forma visual. */
  animate?: boolean;
  className?: string;
}

const SIZE: Record<OrbSize, { root: string; ring: string; core: string }> = {
  sm: {
    root: "h-9 w-9",
    ring: "-inset-1.5",
    core: "inset-[4px]",
  },
  md: {
    root: "h-14 w-14",
    ring: "-inset-2",
    core: "inset-[6px]",
  },
  lg: {
    root: "h-20 w-20",
    ring: "-inset-3",
    core: "inset-[9px]",
  },
};

const Orb = React.forwardRef<HTMLDivElement, OrbProps>(
  (
    { size = "md", durationMs = 2000, animate = true, className, ...props },
    ref
  ) => {
    const s = SIZE[size];
    const duration = `${durationMs}ms`;

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn("relative shrink-0 rounded-full", s.root, className)}
        {...props}
      >
        {/* Anel estático externo */}
        <span className="absolute inset-0 rounded-full border border-primary/30" />

        {/* Anel expansor — ondas saindo */}
        <span
          className={cn(
            "absolute rounded-full border border-primary/15",
            s.ring,
            animate && "motion-safe:animate-ping"
          )}
          style={{ animationDuration: duration }}
        />

        {/* Núcleo pulsante — miolo que respira */}
        <span
          className={cn(
            "absolute rounded-full bg-primary/20",
            s.core,
            animate && "motion-safe:animate-pulse"
          )}
          style={{ animationDuration: duration }}
        />
      </div>
    );
  }
);
Orb.displayName = "Orb";

export { Orb };
