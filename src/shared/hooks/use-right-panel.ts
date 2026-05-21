import { useRightPanelContext } from "@/shared/contexts/right-panel-context";
import { type DependencyList, type ReactNode, useEffect } from "react";

/**
 * Register content in the app-level right panel from any page component.
 *
 * - `content` is re-set whenever `deps` change (defaults to mount only).
 * - Content is cleared automatically when the component unmounts,
 *   restoring the default AI Panel fallback.
 * - Pass `openOnMount: true` to auto-open the panel when the page mounts.
 *
 * @example
 * // Static panel — open on mount
 * useRightPanel(<MyDetailPanel />, { openOnMount: true });
 *
 * // Dynamic panel — updates when `item` changes
 * useRightPanel(<ItemDetail item={item} />, { deps: [item] });
 */
export function useRightPanel(
    content: ReactNode,
    {
        openOnMount = false,
        deps = [],
    }: { openOnMount?: boolean; deps?: DependencyList } = {},
) {
    const { setContent, clearContent, open, isOpen, toggle, close } =
        useRightPanelContext();

    // Keep content in sync with deps
    useEffect(() => {
        setContent(content);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    // Auto-open on mount; always clear on unmount
    useEffect(() => {
        if (openOnMount) open();
        return () => clearContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isOpen, toggle, open, close };
}
