import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * ChoiceCard — escolha única estilo Typeform.
 *
 * Cada opção é um cartão clicável. Construído sobre Radix RadioGroup, então
 * herda semântica de radiogroup, navegação por setas e roving tabindex.
 *
 *   <ChoiceCardGroup value={v} onValueChange={setV}>
 *     <ChoiceCard value="a" optionKey="A" label="Começando" description="..." />
 *     <ChoiceCard value="b" optionKey="B" label="Gerar contatos" />
 *   </ChoiceCardGroup>
 */

const ChoiceCardGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-3", className)}
    {...props}
  />
));
ChoiceCardGroup.displayName = "ChoiceCardGroup";

interface ChoiceCardProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Letra/atalho exibido no badge à esquerda (ex.: "A"). Opcional. */
  optionKey?: string;
  /** Título da opção. */
  label?: React.ReactNode;
  /** Texto auxiliar abaixo do título. */
  description?: React.ReactNode;
  /** Ícone à esquerda — substitui o badge da letra quando presente. */
  icon?: React.ReactNode;
}

const ChoiceCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  ChoiceCardProps
>(
  (
    { className, optionKey, label, description, icon, children, ...props },
    ref
  ) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "group relative flex w-full items-center gap-4 rounded-xl border border-border/20 bg-card/40 px-4 py-3.5 text-left transition-all",
        "hover:border-border/40 hover:bg-card/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/[0.06] data-[state=checked]:shadow-[0_0_0_1px_rgb(var(--primary)/0.6)]",
        className
      )}
      {...props}
    >
      {(icon || optionKey) && (
        <span
          aria-hidden="true"
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/25 bg-background text-sm font-bold text-foreground/55 transition-colors",
            "group-data-[state=checked]:border-primary/60 group-data-[state=checked]:bg-primary/15 group-data-[state=checked]:text-primary"
          )}
        >
          {icon ?? optionKey}
        </span>
      )}

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        {label != null && (
          <span className="text-sm font-semibold leading-snug text-foreground/90">
            {label}
          </span>
        )}
        {description != null && (
          <span className="text-xs leading-relaxed text-foreground/50">
            {description}
          </span>
        )}
        {children}
      </span>

      <RadioGroupPrimitive.Indicator className="shrink-0">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-background"
        >
          <Check size={13} strokeWidth={3} />
        </span>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
);
ChoiceCard.displayName = "ChoiceCard";

export { ChoiceCardGroup, ChoiceCard };
