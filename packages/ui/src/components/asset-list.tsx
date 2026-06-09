import * as React from "react";
import { cn } from "../lib/utils";
import { Badge } from "./badge";

export type CategoriaAsset = "logo" | "referencia" | "material" | "outro";

export interface Asset {
  id: string;
  titulo: string;
  url: string;
  categoria: CategoriaAsset;
  criadoEm?: string | Date;
}

interface AssetListProps {
  assets: Asset[];
  onRemove?: (id: string) => void;
  className?: string;
}

const CATEGORIA_LABEL: Record<CategoriaAsset, string> = {
  logo: "Logo",
  referencia: "Referência",
  material: "Material",
  outro: "Outro",
};

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cn("h-3.5 w-3.5", className)} aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cn("h-3.5 w-3.5", className)} aria-hidden>
      <path d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

export function AssetList({ assets, onRemove, className }: AssetListProps) {
  if (!assets.length) {
    return (
      <p className={cn("text-sm text-foreground/40 py-4", className)}>
        Nenhum asset cadastrado.
      </p>
    );
  }

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {assets.map((asset) => (
        <li
          key={asset.id}
          className="flex items-center gap-3 rounded-lg border border-border/15 bg-background/50 px-4 py-3 transition-colors hover:border-border/30"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/15 bg-background text-foreground/40">
            <LinkIcon />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium text-foreground/90">
                {asset.titulo}
              </span>
              <Badge variant="outline" className="shrink-0 text-[10px] py-0">
                {CATEGORIA_LABEL[asset.categoria]}
              </Badge>
            </div>
            <span className="block truncate text-xs text-foreground/40">{asset.url}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <a
              href={asset.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-foreground/40 transition-colors hover:bg-accent/10 hover:text-foreground/80"
              aria-label={`Abrir ${asset.titulo}`}
            >
              <ExternalIcon />
            </a>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(asset.id)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-foreground/25 transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Remover ${asset.titulo}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
