import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
    type ComponentType,
} from "react";

import type { RightPanelState, RightPanelContextValue } from "@/types/common";

// ─── Context ──────────────────────────────────────────────────────────────────

const RightPanelContext = createContext<RightPanelContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function RightPanelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RightPanelState>({
    content: null,
    icon: null,
    isOpen: false,
  });

  const setContent = useCallback((content: ReactNode, icon?: ComponentType<{ className?: string }>) => {
    setState((prev) => ({ ...prev, content, icon: icon ?? null }));
  }, []);

  const clearContent = useCallback(() => {
    setState((prev) => ({ ...prev, content: null, icon: null }));
  }, []);

  const open = useCallback(
    () => setState((prev) => ({ ...prev, isOpen: true })),
    [],
  );
  const close = useCallback(
    () => setState((prev) => ({ ...prev, isOpen: false })),
    [],
  );
  const toggle = useCallback(
    () => setState((prev) => ({ ...prev, isOpen: !prev.isOpen })),
    [],
  );

  return (
    <RightPanelContext.Provider
      value={{ ...state, setContent, clearContent, open, close, toggle }}
    >
      {children}
    </RightPanelContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRightPanelContext(): RightPanelContextValue {
  const ctx = useContext(RightPanelContext);
  if (!ctx) {
    throw new Error(
      "useRightPanelContext must be used inside <RightPanelProvider>",
    );
  }
  return ctx;
}
