import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../components/dialog";

export interface ModalProps {
  /** Texto do botão que abre o modal. Ignorado quando `open` é controlado. */
  triggerLabel?: string;
  /** Título exibido no topo do modal. */
  title: string;
  /** Texto de apoio abaixo do título. */
  description?: string;
  /** Conteúdo do corpo do modal. */
  children?: React.ReactNode;
  /** Texto do botão de confirmação. Omita para esconder. */
  confirmLabel?: string;
  /** Texto do botão de cancelar. */
  cancelLabel?: string;
  /** Callback ao confirmar. */
  onConfirm?: () => void;
  /** Estado controlado de abertura (opcional). */
  open?: boolean;
  /** Handler de mudança de estado quando controlado. */
  onOpenChange?: (open: boolean) => void;
  /** Classes adicionais para o conteúdo. */
  className?: string;
}

/**
 * Modal — janela genérica baseada em Dialog (Radix).
 * Overlay escurecido com blur, fecha ao clicar fora ou tecla Esc,
 * foco preso e gerenciado automaticamente. Acessível por padrão.
 */
export function Modal({
  triggerLabel,
  title,
  description,
  children,
  confirmLabel,
  cancelLabel = "Cancelar",
  onConfirm,
  open,
  onOpenChange,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button variant="outline">{triggerLabel}</Button>
        </DialogTrigger>
      )}
      <DialogContent className={cn(className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children && <div className="text-sm text-foreground/70">{children}</div>}

        {(confirmLabel || cancelLabel) && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">{cancelLabel}</Button>
            </DialogClose>
            {confirmLabel && (
              <DialogClose asChild>
                <Button variant="default" onClick={onConfirm}>
                  {confirmLabel}
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
