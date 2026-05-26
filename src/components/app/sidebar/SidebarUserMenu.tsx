import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentProfile, useCurrentUser, useLogout } from "@/shared/hooks/use-auth";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { CompanySubMenu, useCompanySwitcher } from "./CompanySwitcher";
import { AppearanceSubMenu, useFontSize } from "@/components/common/ThemeSwitcher";

export function SidebarUserMenu() {
  const { data: user } = useCurrentUser();
  const { data: profile } = useCurrentProfile();
  const logout = useLogout();

  const { fontSize, setFontSize } = useFontSize();
  const { activeCompany } = useCompanySwitcher();

  const displayName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : (user?.username ?? user?.email ?? "User");

  const email = user?.email ?? "";

  const companyHandle = activeCompany?.slug
    ? `@${activeCompany.slug}`
    : (activeCompany?.name ?? "Company");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13.5px] font-medium hover:bg-muted/60 transition-all duration-150 outline-none focus:outline-none">
          <UserAvatar
            firstName={profile?.first_name}
            lastName={profile?.last_name}
            email={user?.email}
            size="md"
          />
          <div className="flex-1 min-w-0 text-left hidden lg:block">
            <p className="text-[13px] font-semibold text-foreground truncate">Me</p>
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
            <UserAvatar
              firstName={profile?.first_name}
              lastName={profile?.last_name}
              email={user?.email}
              size="lg"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <Settings className="size-4" />
            Settings
          </DropdownMenuItem>

          {/* ↓ drop-in reusable submenus */}
          <CompanySubMenu />
          <AppearanceSubMenu fontSize={fontSize} setFontSize={setFontSize} />
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
