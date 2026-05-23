import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  LayoutDashboard,
  LineChart,
  MessagesSquare,
  Folder, AlertCircle, ScrollText, Users,
  MessageSquare, Mail, Bell, Sparkles,
  PieChart, Users2, ShieldCheck, Bot, FileText, CreditCard, Settings, FolderKanban, FileSearch, Wallet
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  /** Icon — only rendered by top-level tab bar items. */
  icon?: LucideIcon;
  /** Route path this item navigates to. */
  to: string;
  /** Optional badge (e.g. unread count). */
  badge?: string | number;
  /** Searchable description for the global search. */
  description?: string;
  /** Allowed user types to see this nav item. */
  userTypes?: ("vendor" | "client")[];

  childrenLayout?: "vertical-sidebar";
  children?: NavItem[];
}

export interface SearchableItem extends NavItem {
  breadcrumbLabel: string;
  breadcrumbPath: string[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

// ─── Navigation tree ──────────────────────────────────────────────────────────

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        id: "vendor-dashboard",
        label: "Home",
        description: "Overview of your business, activity, and key metrics.",
        icon: LayoutDashboard,
        to: "/org",
        userTypes: ["vendor"],
      },
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Your main dashboard and daily overview.",
        icon: LayoutDashboard,
        to: "/dashboard",
        userTypes: ["client"],
      },
    ],
  },
  {
    title: "Work",
    items: [
      {
        id: "projects",
        label: "Projects",
        icon: Briefcase,
        to: "/projects",
        childrenLayout: "vertical-sidebar",
        children: [
          { id: "projects-list", label: "List", icon: Folder, to: "/projects" },
          { id: "projects-disputes", label: "Disputes", icon: AlertCircle, to: "/projects/disputes" },
          { id: "projects-ledger", label: "Escrow Ledger", icon: ScrollText, to: "/escrow" },
          { id: "projects-circles", label: "Trust Circles", icon: Users, to: "/circles" },
        ],
      },
    ],
  },
  {
    title: "Inbox",
    items: [
      {
        id: "inbox",
        label: "Inbox",
        icon: MessagesSquare,
        to: "/inbox/direct",
        childrenLayout: "vertical-sidebar",
        children: [
          {
            id: "inbox-chats",
            label: "Chats",
            icon: MessageSquare,
            to: "/inbox",
            children: [
              { id: "inbox-chats-direct", label: "Direct Messages", to: "/inbox/direct" },
              { id: "inbox-chats-org", label: "Organizational", to: "/inbox/org" },
            ],
          },
          { id: "inbox-email", label: "Email", icon: Mail, to: "/inbox/email" },
          { id: "inbox-notifications", label: "Notifications", icon: Bell, to: "/inbox/notifications" },
          { id: "inbox-ai", label: "Nnarks AI", description: "Chat with your intelligent assistant.", icon: Sparkles, to: "/inbox/ai" },
        ],
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        id: "organization",
        label: "Organization",
        icon: Building2,
        to: "/organization",
        childrenLayout: "vertical-sidebar",
        children: [
          { id: "org-overview", label: "Overview", icon: PieChart, to: "/organization" },
          { id: "org-team", label: "Team", icon: Users2, to: "/organization/team" },
          { id: "org-kyc", label: "KYC & Compliance", icon: ShieldCheck, to: "/organization/kyc" },
          { id: "org-wallet", label: "Wallet", icon: Wallet, to: "/organization/wallet" },
          { id: "org-agents", label: "Agents", icon: Bot, to: "/organization/agents" },
          { id: "org-evidence", label: "Evidence", icon: FileSearch, to: "/organization/evidence" },
          {
            id: "org-billing",
            label: "Billing & Plan",
            icon: CreditCard,
            to: "/organization/billing",
            children: [
              { id: "org-billing-plan", label: "Current Plan", to: "/organization/billing" },
              { id: "org-billing-invoices", label: "Invoices", to: "/organization/billing/invoices" },
              { id: "org-billing-payment", label: "Payment Methods", to: "/organization/billing/payment" },
            ],
          },
          {
            id: "org-settings",
            label: "Settings",
            icon: Settings,
            to: "/organization/settings",
            children: [
              { id: "org-settings-general", label: "General", to: "/organization/settings" },
              { id: "org-settings-security", label: "Security", to: "/organization/settings/security" },
              { id: "org-settings-integrations", label: "Integrations", to: "/organization/settings/integrations" },
              { id: "org-settings-notifications", label: "Notifications", to: "/organization/settings/notifications" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Advisory",
    items: [
      {
        id: "advisory",
        label: "Advisory",
        icon: LineChart,
        to: "/advisory",
        childrenLayout: "vertical-sidebar",
        children: [
          { id: "advisory-overview", label: "Overview", icon: PieChart, to: "/advisory" },
          { id: "advisory-insights", label: "Insights", icon: LineChart, to: "/advisory/insights" },
          { id: "advisory-reports", label: "Reports", icon: FileText, to: "/advisory/reports" },
        ],
      },
    ],
  },
];

// ─── Route helpers ────────────────────────────────────────────────────────────

export function isUnder(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(base + "/");
}


export function isOwnedBy(pathname: string, item: NavItem): boolean {
  if (isUnder(pathname, item.to)) return true;
  return item.children?.some((child) => isOwnedBy(pathname, child)) ?? false;
}


export function findBestMatchId(items: NavItem[], pathname: string): string | null {
  let bestId: string | null = null;
  let bestLen = -1;
  for (const item of items) {
    if (isUnder(pathname, item.to) && item.to.length > bestLen) {
      bestLen = item.to.length;
      bestId = item.id;
    }
  }
  return bestId;
}

/**
 * Returns the label of the top-level nav section that owns the given pathname.
 */
export function resolvePageTitle(pathname: string): string {
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      if (isOwnedBy(pathname, item)) return item.label;
    }
  }
  return "Dashboard";
}

/** All top-level nav items across every group (used by AppHeader). */
export function getAllTopLevelItems(): NavItem[] {
  // For now, statically filter out client-only items. Later, use active user type.
  return NAV_GROUPS.flatMap((g) => g.items).filter(
    (item) => !item.userTypes || item.userTypes.includes("vendor")
  );
}

/** Flatten all nav items for global search, enriching them with breadcrumbs. */
export function getAllSearchableItems(): SearchableItem[] {
  const result: SearchableItem[] = [];
  function traverse(items: NavItem[], parentPath: string[]) {
    for (const item of items) {
      if (!item.userTypes || item.userTypes.includes("vendor")) {
        const currentPath = parentPath.length > 0 && parentPath[parentPath.length - 1] === item.label
          ? [...parentPath]
          : [...parentPath, item.label];

        result.push({
          ...item,
          breadcrumbLabel: currentPath.join(" > "),
          breadcrumbPath: currentPath,
        });
        if (item.children) traverse(item.children, currentPath);
      }
    }
  }

  for (const group of NAV_GROUPS) {
    traverse(group.items, group.title ? [group.title] : []);
  }
  return result;
}

export function resolveVerticalSidebarItems(pathname: string): NavItem[] | null {
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      if (
        item.childrenLayout === "vertical-sidebar" &&
        item.children?.length &&
        isOwnedBy(pathname, item)
      ) {
        return item.children;
      }
    }
  }
  return null;
}
