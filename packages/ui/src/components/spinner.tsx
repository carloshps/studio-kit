import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "../lib/utils";

const spinnerVariants = cva("animate-spin text-current", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "default" },
});

interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

/**
 * Spinner — indicador de carregamento indeterminado.
 * Ícone `Loader2` (lucide) com `animate-spin`; 3 tamanhos via `size`.
 */
function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label="Carregando"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner };
