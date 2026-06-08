import { getAllSearchableItems } from "@/app/nav-config";
import { SearchHighlight } from "@/components/ui/search-highlight";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/shared/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import * as React from "react";

interface GlobalSearchProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const items = React.useMemo(() => getAllSearchableItems(), []);
  const defaultItems = React.useMemo(() => items.slice(0, 8), [items]);

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
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const handleClose = React.useCallback(() => {
    setSearch("");
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSelect = (to: string) => {
    handleClose();
    navigate({ to });
  };

  const hasQuery = search.trim().length > 0;
  const hasResults = filteredItems.length > 0;

  return (
    <>
      {!open && (
        <div
          className={cn(
            "relative flex items-center border group rounded-full transition-all duration-200",
            "border-border-deep! dark:bg-primary-900/30 dark:border-none hover:bg-muted/50 hover:border-primary/30",
          )}
        >
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
          <button
            type="button"
            onClick={() => onOpenChange(true)}
            className="w-full pl-9 pr-4 py-2 text-[13px] text-left text-muted-foreground/50"
          >
            Search a feature, ...
          </button>
          <kbd className="absolute right-3 hidden lg:inline text-[10px] font-mono text-border-deep border border-border-deep! rounded px-1.5 py-0.5 bg-background pointer-events-none">
            ⌘K
          </kbd>
        </div>
      )}

      <Sheet open={open} onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) setSearch("");
      }}>
        <SheetContent side="right" className="p-0" aria-describedby={undefined}>
          <div className="h-full flex flex-col">
            <SheetHeader variant="primary" withIllustration={false} className="px-5 pt-5 pb-4">
              <SheetTitle>Need help?</SheetTitle>
              <SheetDescription>We've got everything you need right here.</SheetDescription>
              <div className="relative group mt-3">
                <Search className="absolute group-focus-within:text-primary-fg transition-all group-focus-within:rotate-18 group-focus-within:scale-110 duration-500 left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && handleClose()}
                  placeholder="Search for help"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-transparent bg-background outline-none text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-primary-fg-hover hover:text-primary-fg hover:bg-white/60 rounded transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-auto py-3 px-2">
              {!hasQuery && (
                <>
                  <p className="px-3 pt-1 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Quick Links
                  </p>
                  <div className="space-y-1">
                    {defaultItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect(item.to)}
                          className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-md bg-primary-bg group shrink-0 text-primary-700">
                            {Icon ? <Icon className="w-4 h-4" /> : <Search className="w-4 h-4 group-hover:scale-105 group-hover:text-primary-fg transition-all duration-300" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-base font-semibold text-foreground leading-tight">{item.label}</p>
                            <p className="text-sm text-muted-foreground truncate">{item.breadcrumbLabel}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {hasQuery && !hasResults && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No results found for &ldquo;{search}&rdquo;.
                </div>
              )}

              {hasQuery && hasResults && (
                <>
                  <p className="px-3 pt-1 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Navigation
                  </p>
                  <div className="space-y-1">
                    {filteredItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect(item.to)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          {Icon && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/50 shrink-0 text-muted-foreground">
                              <Icon className="w-4 h-4" />
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
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
