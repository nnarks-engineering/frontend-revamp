import { useEffect, useState } from "react";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";


// ── Font-size hook (shared logic, reusable anywhere) ──────────────────────────
export function useFontSize() {
  const [fontSize, setFontSize] = useState<string>(() => {
    if (globalThis.window === undefined) return "16";
    return localStorage.getItem("font-size") ?? "16";
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("font-size", fontSize);
  }, [fontSize]);

  return { fontSize, setFontSize };
}

// ── Font-size buttons (standalone, drop anywhere) ─────────────────────────────
interface FontSizePickerProps {
  fontSize: string;
  setFontSize: (size: string) => void;
  className?: string;
}

const FONT_SIZES = ["14", "16", "18", "20"] as const;
const FONT_LABELS: Record<string, string> = { "14": "S", "16": "M", "18": "L", "20": "XL" };

export function FontSizePicker({ fontSize, setFontSize, className }: FontSizePickerProps) {
  return (
    <div className={cn("flex items-center justify-between gap-1", className)}>
      {FONT_SIZES.map((size) => (
        <Button
          key={size}
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 text-xs",
            fontSize === size
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "hover:bg-accent"
          )}
          onClick={() => setFontSize(size)}
        >
          {FONT_LABELS[size]}
        </Button>
      ))}
    </div>
  );
}

// ── Theme buttons (standalone, drop anywhere) ─────────────────────────────────
interface ThemePickerProps {
  className?: string;
}

export function ThemePicker({ className }: ThemePickerProps) {
  const { setTheme, theme } = useTheme();

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark",  label: "Dark",  icon: Moon },
    { value: "system", label: "System", icon: SunMoon },
  ] as const;

  return (
    <div className={cn("flex flex-col", className)}>
      {options.map(({ value, label, icon: Icon }) => (
        <button
        type="button"
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm w-full hover:bg-accent transition-colors",
            theme === value && "bg-accent text-accent-foreground"
          )}
        >
          <Icon className="size-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

// ── All-in-one Appearance submenu (for use inside a DropdownMenu) ─────────────
interface AppearanceSubMenuProps {
  fontSize: string;
  setFontSize: (size: string) => void;
}

export function AppearanceSubMenu({ fontSize, setFontSize }: AppearanceSubMenuProps) {
  const { setTheme, theme } = useTheme();

  const themes = [
    { value: "light",  label: "Light",  icon: Sun },
    { value: "dark",   label: "Dark",   icon: Moon },
    { value: "system", label: "System", icon: SunMoon },
  ] as const;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="gap-2 cursor-pointer">
        <SunMoon className="size-4" />
        Appearance
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="min-w-48">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Theme
          </DropdownMenuLabel>
          {themes.map(({ value, label, icon: Icon }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "gap-2 cursor-pointer",
                theme === value && "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Font Size
          </DropdownMenuLabel>
          <div className="px-2 py-1.5">
            <FontSizePicker fontSize={fontSize} setFontSize={setFontSize} />
          </div>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

// ── Standalone Appearance button (no parent DropdownMenu needed) ──────────────
// Use this anywhere outside an existing DropdownMenu, e.g. a Navbar.
interface AppearanceDropdownProps {
  fontSize: string;
  setFontSize: (size: string) => void;
  /** Optional custom trigger. Defaults to a SunMoon icon button. */
  trigger?: React.ReactNode;
}

export function AppearanceDropdown({ fontSize, setFontSize, trigger }: AppearanceDropdownProps) {
  const { setTheme, theme } = useTheme();

  const themes = [
    { value: "light",  label: "Light",  icon: Sun },
    { value: "dark",   label: "Dark",   icon: Moon },
    { value: "system", label: "System", icon: SunMoon },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <button className="p-2 rounded-md text-foreground/70 hover:text-foreground bg-background-space hover:bg-muted/60 transition-colors outline-none focus:outline-none">
            <SunMoon className="size-4" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 rounded-lg" align="end" sideOffset={8}>
        <DropdownMenuLabel className="text-xs text-muted-foreground">Theme</DropdownMenuLabel>
        {themes.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "gap-2 cursor-pointer",
              theme === value && "bg-accent text-accent-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground">Font Size</DropdownMenuLabel>
        <div className="px-2 py-1.5">
          <FontSizePicker fontSize={fontSize} setFontSize={setFontSize} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
