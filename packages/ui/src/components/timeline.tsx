import * as React from "react";
import { cn } from "../lib/utils";

export type TipoEvento =
  | "whatsapp"
  | "email"
  | "call"
  | "reuniao"
  | "nota";

export interface TimelineEvent {
  id: string;
  tipo: TipoEvento;
  descricao: string;
  data: string | Date;
}

interface TimelineProps {
  events: TimelineEvent[];
  onRemove?: (id: string) => void;
  className?: string;
}

const TIPO_LABEL: Record<TipoEvento, string> = {
  whatsapp: "WhatsApp",
  email: "E-mail",
  call: "Ligação",
  reuniao: "Reunião",
  nota: "Nota",
};

function TipoIcon({ tipo, className }: { tipo: TipoEvento; className?: string }) {
  const cls = cn("h-3.5 w-3.5", className);
  if (tipo === "whatsapp")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm5.207 14.293c-.22.616-1.285 1.176-1.76 1.215-.476.04-.49.358-3.085-.806-2.593-1.162-4.18-3.965-4.304-4.15-.123-.184-1.003-1.338-1.003-2.552S7.8 8.576 8.12 8.23c.32-.348.698-.434.931-.44.234-.005.466-.01.67.5.204.51.693 1.758.754 1.884.061.126.101.274.02.443-.081.169-.122.274-.244.422-.123.148-.257.33-.367.445-.122.124-.249.258-.107.506.142.248.632 1.044 1.357 1.691.932.822 1.719 1.075 1.967 1.197.248.122.393.102.537-.061.144-.163.616-.72.78-.967.165-.247.33-.206.556-.123.225.083 1.431.675 1.678.799.246.124.41.185.47.287.061.102.061.594-.16 1.21Z"/>
      </svg>
    );
  if (tipo === "email")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    );
  if (tipo === "call")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.22 6.22l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    );
  if (tipo === "reuniao")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    );
  // nota
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function formatarData(data: string | Date): string {
  const d = typeof data === "string" ? new Date(data) : data;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Timeline({ events, onRemove, className }: TimelineProps) {
  if (!events.length) {
    return (
      <p className={cn("text-sm text-foreground/40 py-4", className)}>
        Nenhuma interação registrada.
      </p>
    );
  }

  return (
    <ol className={cn("relative flex flex-col gap-0", className)}>
      {events.map((ev, i) => (
        <li key={ev.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Linha vertical */}
          {i < events.length - 1 && (
            <span
              className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-border/20"
              aria-hidden
            />
          )}
          {/* Ícone */}
          <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/20 bg-background text-foreground/50">
            <TipoIcon tipo={ev.tipo} />
          </span>
          {/* Conteúdo */}
          <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
                {TIPO_LABEL[ev.tipo]}
              </span>
              <div className="flex items-center gap-2">
                <time className="text-xs text-foreground/30" dateTime={String(ev.data)}>
                  {formatarData(ev.data)}
                </time>
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(ev.id)}
                    className="flex h-5 w-5 items-center justify-center rounded text-foreground/25 transition-colors hover:text-destructive"
                    aria-label="Remover interação"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">{ev.descricao}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
