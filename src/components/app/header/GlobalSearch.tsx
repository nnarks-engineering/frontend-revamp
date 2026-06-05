import { getAllSearchableItems } from "@/app/nav-config";
import { SearchHighlight } from "@/components/ui/search-highlight";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";

interface GlobalSearchProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [anchorWidth, setAnchorWidth] = React.useState<number | undefined>();

  const items = React.useMemo(() => getAllSearchableItems(), []);

  const filteredItems = React.useMemo(() => {
    if (!search.trim()) return [];
    const tokens = search.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      const haystack = [item.breadcrumbLabel, item.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
  }, [items, search]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        setSearch("");
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  React.useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAnchorWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleClose = React.useCallback(() => {
    setSearch("");
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSelect = (to: string) => {
    handleClose();
    navigate({ to });
  };

  const hasQuery = search.trim().length > 0;

  // Three states drive the dropdown content:
  //   1. open + no query  → empty state (recents / suggestions)
  //   2. open + query + no results → no-results state
  //   3. open + query + results → results list


  function getSearchState(hasQuery: boolean, hasResults: boolean) {
  if (!hasQuery) return "empty";
  if (!hasResults) return "no-results";
  return "results";
}

const searchState = getSearchState(hasQuery, filteredItems.length > 0);

  return (
    <>
      {/* Backdrop — portalled to escape header stacking context */}
      {open &&
        createPortal(
          <button
            type="button"
            aria-label="Close search"
            className="fixed inset-x-0 top-14 md:inset-0 bottom-0 z-40 cursor-default bg-black/70 dark:bg-black/70 backdrop-blur-[1px] animate-in fade-in duration-150"
            onClick={handleClose}
          />,
          document.body,
        )}

      <Popover
        open={open}
        // Let Radix know we're fully controlled — never let it self-close.
        // Closing is handled exclusively by: backdrop click, Escape key, item select.
        onOpenChange={() => {}}
      >
        <PopoverAnchor asChild>
          <div
            ref={anchorRef}
            className={cn(
              "relative flex items-center border group focus-within:flex-1 rounded-full transition-all duration-200",
              open
                ? "border-primary-800/50! "
                : "border-border-deep! dark:bg-primary-900/30 dark:border-none hover:bg-muted/50 hover:border-primary/30",
            )}
          >
            <Search className="absolute group-focus-within:text-primary-600 left-3 w-4 h-4 text-muted-foreground/60 pointer-events-none" />

            {open ? (
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && handleClose()}
                placeholder="Search for pages, features, or settings..."
                className="w-full pl-9 pr-8 py-2 text-[13px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
              />
            ) : (
              <button
                type="button"
                onClick={() => onOpenChange(true)}
                className="w-full pl-9 pr-4 py-2 text-[13px] text-left text-muted-foreground/50"
              >
                Search a feature, ...
              </button>
            )}

            {open && search && (
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearch("");
                }}
                className="absolute right-3 p-0.5 text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {!open && (
              <kbd className="absolute right-3 hidden lg:inline text-[10px] font-mono text-border-deep border border-border-deep! rounded px-1.5 py-0.5 bg-background pointer-events-none">
                ⌘K
              </kbd>
            )}
          </div>
        </PopoverAnchor>
<PopoverContent
          sideOffset={8}
          className="p-0"
          style={anchorWidth ? { width: anchorWidth } : undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
>
  {searchState === "empty" && (
    <div className="py-6 px-4">

    </div>
  )}

  {searchState === "no-results" && (
    <div className="py-8 text-center text-sm text-muted-foreground">
      No results found for &ldquo;{search}&rdquo;.
    </div>
  )}

  {searchState === "results" && (
    <div className="py-1 max-h-120 overflow-y-auto">
      <p className="px-3 pt-2 pb-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        Navigation
      </p>
      {filteredItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleSelect(item.to)}
            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left"
          >
            {Icon && (
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/50 shrink-0 text-muted-foreground">
                <FontAwesomeIcon icon={Icon} className="w-4 h-4" />
              </div>
            )}
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="text-sm font-medium text-foreground truncate flex items-center flex-wrap">
                {item.breadcrumbPath.map((segment, index) => (
                  <React.Fragment key={`${item.id}-seg-${segment}`}>
                    {index > 0 && (
                      <span className="opacity-40 mx-1.5 text-[11px] font-bold">&gt;</span>
                    )}
                    <SearchHighlight text={segment} keyword={search} />
                  </React.Fragment>
                ))}
              </span>
              {item.description && (
                <span className="text-[12px] text-muted-foreground truncate">
                  <SearchHighlight text={item.description} keyword={search} />
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  )}
</PopoverContent>
      </Popover>
    </>
  );
}
