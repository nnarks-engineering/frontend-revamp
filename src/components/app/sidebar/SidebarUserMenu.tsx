import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentProfile, useCurrentUser, useLogout } from "@/shared/hooks/use-auth";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { cn } from "@/shared/lib/utils";
import { ArrowLeftRight, Building2, ChevronsUpDown, LogOut, Moon, Plus, Settings, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  email?: string
): string {
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName.slice(0, 2).toUpperCase();
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

export function SidebarUserMenu() {
  const { data: user } = useCurrentUser();
  const { data: profile } = useCurrentProfile();
  const logout = useLogout();
  const { setTheme, theme } = useTheme();

  const [fontSize, setFontSize] = useState<string>(() => {
    return typeof window !== "undefined"
      ? (localStorage.getItem("font-size") ?? "16")
      : "16";
  });

  const updateFontSize = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem("font-size", size);
  };

  const { data: companies = [] } = useMyCompanies();
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(() => {
    return localStorage.getItem("nnarks_active_company_id") ?? null;
  });

  const activeCompany = companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null;

  const handleSelectCompany = (companyId: string) => {
    setActiveCompanyId(companyId);
    localStorage.setItem("nnarks_active_company_id", companyId);
  };

  const displayName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : (user?.username ?? user?.email ?? "User");

  const email = user?.email ?? "";
  const initials = getInitials(profile?.first_name, profile?.last_name, user?.email);
  const companyHandle = activeCompany?.slug ? `@${activeCompany.slug}` : (activeCompany?.name ?? "Company");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13.5px] font-medium hover:bg-muted/60 transition-all duration-150 outline-none focus:outline-none"
        >
          <div className="w-7 h-7 shrink-0 rounded-full bg-linear-to-br from-primary via-primary/80 to-secondary flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0 text-left hidden lg:block">
            <p className="text-[13px] font-semibold text-foreground truncate">
              Me
            </p>
            <p className="text-[11px] text-muted-foreground truncate">{companyHandle}</p>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground/50 shrink-0 hidden lg:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={8}
      >
        {/* User info header */}
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Settings link */}
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <Settings className="size-4" />
            Settings
          </DropdownMenuItem>

          {/* Company switcher submenu */}
          {companies.length > 0 && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger hideChevron className="gap-2 cursor-pointer">
                <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">
                  {activeCompany ? getInitials(activeCompany.name) : <Building2 className="w-3 h-3" />}
                </div>
                <span className="truncate flex-1 text-left">{activeCompany?.display_name ?? activeCompany?.name ?? "Switch Company"}</span>
                <ArrowLeftRight className="ml-auto size-4 text-muted-foreground" />
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="min-w-48">
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Your Companies
                  </DropdownMenuLabel>
                  {companies.map((company) => (
                    <DropdownMenuItem
                      key={company.id}
                      onClick={() => handleSelectCompany(company.id)}
                      className={cn(
                        "gap-2 cursor-pointer",
                        activeCompany?.id === company.id && "bg-accent text-accent-foreground"
                      )}
                    >
                      <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">
                        {getInitials(company.name)}
                      </div>
                      <span className="truncate">{company.display_name ?? company.name}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 cursor-pointer text-muted-foreground"
                    onClick={() => window.location.href = "/vendor"}
                  >
                    <Plus className="size-4" />
                    New Company
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}

          {/* Appearance submenu */}
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
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className={cn(
                    "gap-2 cursor-pointer",
                    theme === "light" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Sun className="size-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "gap-2 cursor-pointer",
                    theme === "dark" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Moon className="size-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className={cn(
                    "gap-2 cursor-pointer",
                    theme === "system" && "bg-accent text-accent-foreground"
                  )}
                >
                  <SunMoon className="size-4" />
                  System
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Font Size
                </DropdownMenuLabel>
                <div className="px-2 py-1.5 flex items-center justify-between gap-1">
                  {(["14", "16", "18", "20"] as const).map((size) => (
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
                      onClick={() => updateFontSize(size)}
                    >
                      {size === "14" ? "S" : size === "16" ? "M" : size === "18" ? "L" : "XL"}
                    </Button>
                  ))}
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="size-4" />
          {logout.isPending ? "Signing out…" : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
