import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  LayoutDashboard,
  LineChart,
  MessagesSquare,
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
  /**
   * "vertical-sidebar" → sub-items appear in the left sidebar when this
   * top-level item is active.  Only meaningful on top-level items.
   * Sub-items with children always render as collapsible accordions.
   */
  childrenLayout?: "vertical-sidebar";
  children?: NavItem[];
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
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
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
          { id: "projects-all", label: "All Projects", to: "/projects" },
          {
            id: "projects-active",
            label: "Active",
            to: "/projects/active",
            children: [
              { id: "projects-active-progress", label: "In Progress", to: "/projects/active" },
              { id: "projects-active-pending", label: "Pending Review", to: "/projects/active/pending" },
            ],
          },
          {
            id: "projects-disputes",
            label: "Disputes",
            to: "/projects/disputes",
            children: [
              { id: "projects-disputes-open", label: "Open", to: "/projects/disputes" },
              { id: "projects-disputes-review", label: "In Review", to: "/projects/disputes/review" },
            ],
          },
          { id: "projects-completed", label: "Completed", to: "/projects/completed" },
          { id: "projects-ledger", label: "Escrow Ledger", to: "/escrow" },
          { id: "projects-circles", label: "Trust Circles", to: "/circles" },
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
        to: "/inbox",
        childrenLayout: "vertical-sidebar",
        children: [
          {
            id: "inbox-messages",
            label: "Messages",
            to: "/inbox",
            children: [
              { id: "inbox-messages-all", label: "All Chats", to: "/inbox" },
              { id: "inbox-messages-direct", label: "Direct", to: "/inbox/direct" },
              { id: "inbox-messages-groups", label: "Group Chats", to: "/inbox/groups" },
            ],
          },
          { id: "inbox-email", label: "Email", to: "/inbox/email" },
          { id: "inbox-notifications", label: "Notifications", to: "/inbox/notifications" },
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
          { id: "org-overview", label: "Overview", to: "/organization" },
          {
            id: "org-members",
            label: "Members",
            to: "/organization/members",
            children: [
              { id: "org-members-all", label: "All Members", to: "/organization/members" },
              { id: "org-members-invitations", label: "Invitations", to: "/organization/members/invitations" },
              { id: "org-members-roles", label: "Roles & Access", to: "/organization/members/roles" },
            ],
          },
          { id: "org-teams", label: "Teams", to: "/organization/teams" },
          {
            id: "org-kyc",
            label: "KYC & Compliance",
            to: "/organization/kyc",
            children: [
              { id: "org-kyc-queue", label: "Verification Queue", to: "/organization/kyc" },
              { id: "org-kyc-approved", label: "Approved", to: "/organization/kyc/approved" },
              { id: "org-kyc-rejected", label: "Rejected", to: "/organization/kyc/rejected" },
            ],
          },
          {
            id: "org-agents",
            label: "Agents",
            to: "/organization/agents",
            children: [
              { id: "org-agents-active", label: "Active Agents", to: "/organization/agents" },
              { id: "org-agents-logs", label: "Activity Logs", to: "/organization/agents/logs" },
              { id: "org-agents-config", label: "Configuration", to: "/organization/agents/config" },
            ],
          },
          {
            id: "org-evidence",
            label: "Evidence",
            to: "/organization/evidence",
            children: [
              { id: "org-evidence-cases", label: "Cases", to: "/organization/evidence" },
              { id: "org-evidence-docs", label: "Documents", to: "/organization/evidence/documents" },
            ],
          },
          {
            id: "org-billing",
            label: "Billing & Plan",
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
          { id: "advisory-overview", label: "Overview", to: "/advisory" },
          { id: "advisory-insights", label: "Insights", to: "/advisory/insights" },
          { id: "advisory-reports", label: "Reports", to: "/advisory/reports" },
        ],
      },
    ],
  },
];

// ─── Route helpers ────────────────────────────────────────────────────────────

/** True when `pathname` equals `base` or starts with `base/`. */
export function isUnder(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(base + "/");
}

/**
 * True when a nav item "owns" the given pathname — either because the pathname
 * matches the item's own route, or because any of its descendants' routes match.
 *
 * This allows items whose `to` lives outside a parent's path (e.g. `/escrow`
 * nested under a Projects item whose `to` is `/projects`) to correctly activate
 * the parent's sidebar and top-nav tab.
 */
export function isOwnedBy(pathname: string, item: NavItem): boolean {
  if (isUnder(pathname, item.to)) return true;
  return item.children?.some((child) => isOwnedBy(pathname, child)) ?? false;
}

/**
 * Among a list of sibling nav items, returns the id of the item that most
 * specifically matches `pathname` — i.e. the one with the longest `to` path
 * that is still a prefix of `pathname`.  Returns `null` when nothing matches.
 *
 * This prevents a parent-level "Overview" at `/foo` from being highlighted
 * when you are at a deeper route like `/foo/bar`.
 */
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

/** All top-level nav items across every group (used by TopNavBar). */
export function getAllTopLevelItems(): NavItem[] {
  return NAV_GROUPS.flatMap((g) => g.items);
}

/**
 * For the current pathname, returns the vertical-sidebar children of the
 * owning top-level item, or `null` when there is no sidebar for this route.
 *
 * Uses recursive ownership so that "guest" routes (e.g. `/escrow` nested
 * inside Projects) correctly surface the parent section's sidebar.
 */
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
