import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RightPanelState {
  /**
   * Content registered by the current page.
   * `null` means "no page content" → AppLayout falls back to the AI Panel.
   */
  content: ReactNode;
  isOpen: boolean;
}

export interface RightPanelContextValue extends RightPanelState {
  setContent: (content: ReactNode) => void;
  clearContent: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RightPanelContext = createContext<RightPanelContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function RightPanelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RightPanelState>({
    content: null,
    isOpen: false,
  });

  const setContent = useCallback((content: ReactNode) => {
    setState((prev) => ({ ...prev, content }));
  }, []);

  const clearContent = useCallback(() => {
    setState((prev) => ({ ...prev, content: null }));
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
