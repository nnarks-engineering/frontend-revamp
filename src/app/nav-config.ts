import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouseChimney,
  faGaugeHigh,
  faFolderOpen,
  faList,
  faGavel,
  faLock,
  faUserShield,
  faInbox,
  faComments,
  faEnvelopeOpen,
  faBell,
  faBrain,
  faPeopleGroup,
  faChartPie,
  faUserGroup,
  faIdCard,
  faWallet,
  faMicrochip,
  faSearch,
  faFileInvoiceDollar,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { hasUserTypeAccess, type UserType } from "@/shared/lib/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon?: IconDefinition;
  to: string;
  badge?: string | number;
  description?: string;
  userTypes?: UserType[];
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

function canAccessItem(item: NavItem): boolean {
  return hasUserTypeAccess(item.userTypes);
}

function filterItemByAccess(item: NavItem): NavItem | null {
  if (!canAccessItem(item)) {
    return null;
  }

  const visibleChildren = item.children
    ?.map(filterItemByAccess)
    .filter((child): child is NavItem => child !== null);

  return {
    ...item,
    children: visibleChildren,
  };
}

function getVisibleTopLevelItems(): NavItem[] {
  return NAV_GROUPS.flatMap((group) =>
    group.items
      .map(filterItemByAccess)
      .filter((item): item is NavItem => item !== null),
  );
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
        icon: faHouseChimney,
        to: "/org",
        userTypes: ["vendor"],
      },
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Your main dashboard and daily overview.",
        icon: faGaugeHigh,
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
        icon: faFolderOpen,
        to: "/projects",
        userTypes: ["client", "vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
          { id: "projects-list", label: "List", icon: faList, to: "/projects" },
          { id: "projects-disputes", label: "Disputes", icon: faGavel, to: "/projects/disputes" },
          { id: "projects-ledger", label: "Escrow Ledger", icon: faLock, to: "/escrow" },
          { id: "projects-circles", label: "Trust Circles", icon: faUserShield, to: "/circles" },
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
        icon: faInbox,
        to: "/inbox/direct",
        userTypes: ["client", "vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
          {
            id: "inbox-chats",
            label: "Chats",
            icon: faComments,
            to: "/inbox",
            userTypes: ["client", "vendor"],
            children: [
              {
                id: "inbox-chats-direct",
                label: "Direct Messages",
                to: "/inbox/direct",
                userTypes: ["client", "vendor"],
              },
              {
                id: "inbox-chats-org",
                label: "Organizational",
                to: "/inbox/org",
                userTypes: ["vendor"],
              },
            ],
          },
          {
            id: "inbox-email",
            label: "Email",
            icon: faEnvelopeOpen,
            to: "/inbox/email",
            userTypes: ["client", "vendor"],
          },
          {
            id: "inbox-notifications",
            label: "Notifications",
            icon: faBell,
            to: "/inbox/notifications",
            userTypes: ["client", "vendor"],
          },
          {
            id: "inbox-ai", label: "Nnarks AI", icon: faBrain, to: "/inbox/ai",
            description: "Chat with your intelligent assistant.",
            userTypes: ["client", "vendor"],
          },
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
        icon: faPeopleGroup,
        to: "/organization",
        userTypes: ["vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
          { id: "org-overview", label: "Overview", icon: faChartPie, to: "/organization" },
          { id: "org-team", label: "Team", icon: faUserGroup, to: "/organization/team" },
          { id: "org-kyc", label: "KYC & Compliance", icon: faIdCard, to: "/organization/kyc" },
          { id: "org-wallet", label: "Wallet", icon: faWallet, to: "/organization/wallet" },
          { id: "org-agents", label: "Agents", icon: faMicrochip, to: "/organization/agents" },
          { id: "org-evidence", label: "Evidence", icon: faSearch, to: "/organization/evidence" },
          {
            id: "org-billing",
            label: "Billing & Plan",
            icon: faFileInvoiceDollar,
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
            icon: faSliders,
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
  // {
  //   title: "Ai",
  //   items: [
  //     {
  //       id: "vendor-dashboard",
  //       label: "Home",
  //       description: "Overview of your business, activity, and key metrics.",
  //       icon: faRobot,
  //       to: "/inbox/ai",
  //     },

  //   ],
  // },
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
  for (const item of getVisibleTopLevelItems()) {
    if (isOwnedBy(pathname, item)) return item.label;
  }
  return "Dashboard";
}

/** All top-level nav items across every group (used by AppHeader). */
export function getAllTopLevelItems(): NavItem[] {
  return getVisibleTopLevelItems();
}

/** Flatten all nav items for global search, enriching them with breadcrumbs. */
export function getAllSearchableItems(): SearchableItem[] {
  const result: SearchableItem[] = [];
  function traverse(items: NavItem[], parentPath: string[]) {
    for (const item of items) {
      const currentPath = parentPath.length > 0 && parentPath.at(-1) === item.label
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

  for (const group of NAV_GROUPS) {
    const visibleItems = group.items
      .map(filterItemByAccess)
      .filter((item): item is NavItem => item !== null);

    traverse(visibleItems, group.title ? [group.title] : []);
  }
  return result;
}

export function resolveVerticalSidebarItems(pathname: string): NavItem[] | null {
  for (const item of getVisibleTopLevelItems()) {
    if (
      item.childrenLayout === "vertical-sidebar" &&
      item.children?.length &&
      isOwnedBy(pathname, item)
    ) {
      return item.children;
    }
  }
  return null;
}

/**
 * Returns the horizontal tab children for the current route, or null if no
 * tabs apply. Tabs are children of nav items that do NOT use vertical-sidebar
 * layout.
 */
export function resolveHorizontalTabs(pathname: string): NavItem[] | null {
  for (const item of getVisibleTopLevelItems()) {
    if (
      item.childrenLayout !== "vertical-sidebar" &&
      item.children?.length &&
      isOwnedBy(pathname, item)
    ) {
      return item.children;
    }
  }
  return null;
}

/** Returns the id of the active tab from a list of tabs for the given pathname. */
export function resolveActiveTabId(tabs: NavItem[], pathname: string): string | null {
  return findBestMatchId(tabs, pathname);
}
