import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-border/18 bg-background/60 px-4 py-2 text-sm text-foreground/90 placeholder:text-foreground/40 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-accent/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
