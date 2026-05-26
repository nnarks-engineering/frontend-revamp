import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { cn } from "@/shared/lib/utils";
import { ArrowLeftRight, Building2, Plus } from "lucide-react";
import { getInitials } from "./UserAvatar";

// ── Company avatar (reusable independently) ───────────────────────────────────
interface CompanyAvatarProps {
  name?: string | null;
  className?: string;
}

export function CompanyAvatar({ name, className }: CompanyAvatarProps) {
  return (
    <div
      className={cn(
        "w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0",
        className
      )}
    >
      {name ? getInitials(name) : <Building2 className="w-3 h-3" />}
    </div>
  );
}

// ── Hook: active company (reusable anywhere) ──────────────────────────────────
export function useCompanySwitcher() {
  const { data: companies = [] } = useMyCompanies();
  const { activeCompanyId, setActiveCompanyId } = useActiveCompany();
  const activeCompany = companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null;

  return {
    companies,
    activeCompany,
    setActiveCompanyId,
  };
}

// ── Dropdown submenu variant (for use inside a DropdownMenu) ──────────────────
export function CompanySubMenu() {
  const { companies, activeCompany, setActiveCompanyId } = useCompanySwitcher();

  if (companies.length === 0) return null;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger hideChevron className="gap-2 cursor-pointer">
        <CompanyAvatar name={activeCompany?.name} />
        <span className="truncate flex-1 text-left">
          {activeCompany?.display_name ?? activeCompany?.name ?? "Switch Company"}
        </span>
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
              onClick={() => setActiveCompanyId(company.id)}
              className={cn(
                "gap-2 cursor-pointer",
                activeCompany?.id === company.id && "bg-accent text-accent-foreground"
              )}
            >
              <CompanyAvatar name={company.name} />
              <span className="truncate">{company.display_name ?? company.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-muted-foreground"
            onClick={() => { globalThis.window.location.href = "/vendor"; }}
          >
            <Plus className="size-4" />
            New Company
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

// ── Standalone list variant (for use outside a DropdownMenu, e.g. a settings page) ──
export function CompanyList() {
  const { companies, activeCompany, setActiveCompanyId } = useCompanySwitcher();

  return (
    <div className="flex flex-col gap-1">
      {companies.map((company) => (
        <button
        type="button"
          key={company.id}
          onClick={() => setActiveCompanyId(company.id)}
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm w-full hover:bg-accent transition-colors",
            activeCompany?.id === company.id && "bg-accent text-accent-foreground font-medium"
          )}
        >
          <CompanyAvatar name={company.name} />
          <span className="truncate">{company.display_name ?? company.name}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => { globalThis.window.location.href = "/vendor"; }}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-accent transition-colors"
      >
        <Plus className="size-4" />
        New Company
      </button>
    </div>
  );
}
