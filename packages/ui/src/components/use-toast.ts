import * as React from "react";
import type { ToastProps } from "./toast";

type ToastData = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
};

type State = { toasts: ToastData[] };
type Action =
  | { type: "ADD"; toast: ToastData }
  | { type: "UPDATE"; toast: Partial<ToastData> & { id: string } }
  | { type: "DISMISS"; toastId?: string }
  | { type: "REMOVE"; toastId?: string };

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4000;

let count = 0;
const genId = () => (++count).toString();

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
let listeners: ((state: State) => void)[] = [];
let memoryState: State = { toasts: [] };

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE", toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
    case "UPDATE":
      return { toasts: state.toasts.map(t => t.id === action.toast.id ? { ...t, ...action.toast } : t) };
    case "DISMISS": {
      const { toastId } = action;
      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach(t => addToRemoveQueue(t.id));
      return { toasts: state.toasts.map(t => (!toastId || t.id === toastId) ? { ...t, open: false } : t) };
    }
    case "REMOVE":
      return { toasts: action.toastId ? state.toasts.filter(t => t.id !== action.toastId) : [] };
  }
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach(l => l(memoryState));
}

function toast(props: Omit<ToastData, "id">) {
  const id = genId();
  const dismiss = () => dispatch({ type: "DISMISS", toastId: id });
  dispatch({ type: "ADD", toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dismiss(); } } });
  return { id, dismiss, update: (p: Partial<ToastData>) => dispatch({ type: "UPDATE", toast: { ...p, id } }) };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => { listeners = listeners.filter(l => l !== setState); };
  }, []);
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS", toastId }),
  };
}

export { useToast, toast };
