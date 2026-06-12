import { type ComponentType, type DependencyList, type ReactNode, useEffect } from "react";

import { useRightPanelContext } from "@/shared/contexts/ui/right-panel-context";

/**
 * Register content in the app-level right panel from any page component.
 *
 * - `content` is re-set whenever `deps` change (defaults to mount only).
 * - Content is cleared automatically when the component unmounts,
 *   restoring the default AI Panel fallback.
 * - Pass `openOnMount: true` to auto-open the panel when the page mounts.
 * - Pass `icon` to customise the FAB icon shown when the panel is collapsed.
 *
 * @example
 * // Static panel — open on mount
 * useRightPanel(<MyDetailPanel />, { openOnMount: true });
 *
 * // Dynamic panel — updates when `item` changes
 * useRightPanel(<ItemDetail item={item} />, { deps: [item] });
 *
 * // Custom FAB icon
 * useRightPanel(<MyPanel />, { icon: Megaphone, openOnMount: true });
 */
export function useRightPanel(
    content: ReactNode,
    {
        openOnMount = false,
        deps = [],
        icon,
    }: { openOnMount?: boolean; deps?: DependencyList; icon?: ComponentType<{ className?: string }> } = {},
) {
    const { setContent, clearContent, open, isOpen, toggle, close } =
        useRightPanelContext();

    // Keep content in sync with deps
    useEffect(() => {
        setContent(content, icon);
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

