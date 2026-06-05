import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { getInitials } from "@/shared/lib/initials";
import { cn } from "@/shared/lib/utils";
import type { Company } from "@/types/companies";
import { useNavigate } from "@tanstack/react-router";
import { ChevronsUpDown, Plus } from "lucide-react";
import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";

interface Props {
  readonly isCollapsed: boolean;
}

export function SidebarCompanySwitcher({ isCollapsed }: Props) {
  const navigate = useNavigate();
  const { data: companies = [] } = useMyCompanies();
  const { activeCompanyId: activeId, setActiveCompanyId } = useActiveCompany();

  const activeCompany: Company | null =
    companies.find((c) => c.id === activeId) ?? companies[0] ?? null;

  const handleSelect = (company: Company) => {
    setActiveCompanyId(company.id);
  };

  const displayName =
    activeCompany?.display_name ?? activeCompany?.name ?? "Select Company";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full flex items-center  rounded-br-xl bg-primary-50 border-r border-background! gap-2.5 px-2.5 py-1.5 text-sm font-medium",
            " hover:bg-primary-100 transition-all duration-150 outline-none focus:outline-none",
            isCollapsed && "justify-center px-0"
          )}
        >
          <div
            className={cn(
              "shrink-0 flex items-center justify-center text-[11px] font-bold text-primary-foreground",
              "bg-linear-to-br from-primary to-primary/70",
              isCollapsed ? "w-8 h-8" : "w-7 h-7"
            )}
          >
            {activeCompany ? (
              getInitials(activeCompany.name)
            ) : (
              <NnarksLogo className="w-4 h-4 text-primary-foreground" />
            )}
          </div>

          {!isCollapsed && (
            <>
              <div className="flex-1 text-left min-w-0">
                <p className="text-[13px] font-semibold truncate">{displayName}</p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {activeCompany?.slug ? `@${activeCompany.slug}` : "Company"}
                </p>
              </div>
              <ChevronsUpDown className="w-4 h-4 text-muted-foreground/60 shrink-0" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-56"
        side="bottom"
        align="start"
        sideOffset={8}
      >
        {companies.length > 0 && (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
              Your Companies
            </DropdownMenuLabel>
            {companies.map((company) => (
              <DropdownMenuItem
                key={company.id}
                onClick={() => handleSelect(company)}
                className={cn(
                  "gap-2 p-2 cursor-pointer",
                  activeCompany?.id === company.id && "bg-accent"
                )}
              >
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
                  {getInitials(company.name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm truncate">
                    {company.display_name ?? company.name ?? "Unnamed"}
                  </span>
                  {company.slug && (
                    <span className="text-xs text-muted-foreground truncate">
                      @{company.slug}
                    </span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          onClick={() => navigate({ to: "/vendor" as never })}
          className="gap-2 p-2 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-md border flex items-center justify-center shrink-0">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-muted-foreground">New Company</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
