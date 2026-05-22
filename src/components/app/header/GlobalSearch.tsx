import { getAllSearchableItems } from "@/app/nav-config";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SearchHighlight } from "@/components/ui/search-highlight";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");

  const items = React.useMemo(() => getAllSearchableItems(), []);

  const filteredItems = React.useMemo(() => {
    if (!search.trim()) return [];

    const tokens = search.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    return items.filter((item) => {
      const combinedText = [item.breadcrumbLabel, item.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return tokens.every((token) => combinedText.includes(token));
    });
  }, [items, search]);

  const handleSelect = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      commandProps={{ shouldFilter: false }}
    >
      <CommandInput
        placeholder="Search for pages, features, or settings..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found for "{search}".</CommandEmpty>
        {filteredItems.length > 0 && (
          <CommandGroup heading="Navigation">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.to)}
                  className="flex items-center gap-3 py-3"
                >
                  {Icon && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/50 shrink-0 text-muted-foreground">
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex flex-col overflow-hidden min-w-0">
                    <span className="text-sm font-medium text-foreground truncate flex items-center flex-wrap">
                      {item.breadcrumbPath.map((segment, index) => (
                        <React.Fragment key={index}>
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
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
