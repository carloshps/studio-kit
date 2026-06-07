import * as React from "react";
import { cn } from "../lib/utils";

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Itens exibidos em loop contínuo (logos, cards, depoimentos…). */
  children: React.ReactNode;
  /** Espaço entre itens, em px. */
  gap?: number;
  /** Pausa o movimento ao passar o mouse. */
  pauseOnHover?: boolean;
  /** Inverte a direção do movimento. */
  reverse?: boolean;
  /** Duração de um ciclo completo, em segundos (menor = mais rápido). */
  speed?: number;
}

/**
 * Carrossel "marquee" — rolagem horizontal infinita e suave.
 * Os itens são duplicados para o loop ser perfeito; as bordas são
 * apagadas (marquee-mask) e o movimento respeita prefers-reduced-motion.
 */
export function Carousel({
  children,
  gap = 20,
  pauseOnHover = true,
  reverse = false,
  speed = 40,
  className,
  ...props
}: CarouselProps) {
  const items = React.Children.toArray(children);

  return (
    <div className={cn("marquee-mask group w-full overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "flex w-max animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {/* Segunda cópia — garante a continuidade no -50% do keyframe */}
        {items.map((child, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
