import type { LucideIcon } from "lucide-react";
import {
    Briefcase,
    Building2,
    Inbox,
    LayoutDashboard,
    LineChart,
    Users,
    Wallet,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * How children of a nav item are displayed when the item is active:
 *  - "horizontal-tabs"  → a slim tab bar appears just below the app header
 *  - "vertical-sidebar" → children expand inline inside the left sidebar
 */
export type ChildrenLayout = "horizontal-tabs" | "vertical-sidebar";

export interface NavItem {
    id: string;
    label: string;
    /** Icon — only used by top-level sidebar items. */
    icon?: LucideIcon;
    /** Route path this item navigates to. */
    to: string;
    /** Optional badge (e.g. unread count). */
    badge?: string | number;
    /**
     * Determines how `children` are rendered when this item is active.
     * Omit for leaf items (no children).
     */
    childrenLayout?: ChildrenLayout;
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
                childrenLayout: "horizontal-tabs",
                children: [
                    { id: "dashboard-overview", label: "Overview", to: "/dashboard" },
                    { id: "dashboard-analytics", label: "Analytics", to: "/dashboard/analytics" },
                    { id: "dashboard-reports", label: "Reports", to: "/dashboard/reports" },
                ],
            },
            {
                id: "advisory",
                label: "Advisory",
                icon: LineChart,
                to: "/advisory",
            },
        ],
    },
    {
        title: "Escrow & Trust",
        items: [
            {
                id: "projects",
                label: "Projects",
                icon: Briefcase,
                to: "/projects",
                childrenLayout: "vertical-sidebar",
                children: [
                    { id: "projects-all", label: "All Projects", to: "/projects" },
                    { id: "projects-active", label: "Active", to: "/projects/active" },
                    { id: "projects-completed", label: "Completed", to: "/projects/completed" },
                    { id: "projects-disputes", label: "Disputes", to: "/projects/disputes" },
                ],
            },
            {
                id: "circles",
                label: "Trust Circles",
                icon: Users,
                to: "/circles",
            },
            {
                id: "escrow",
                label: "Escrow Ledger",
                icon: Wallet,
                to: "/escrow",
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
                    {
                        id: "org-members",
                        label: "Members",
                        to: "/organization/members",
                        childrenLayout: "horizontal-tabs",
                        children: [
                            { id: "org-members-overview", label: "Overview", to: "/organization/members" },
                            { id: "org-members-list", label: "Members List", to: "/organization/members/list" },
                            { id: "org-members-invitations", label: "Invitations", to: "/organization/members/invitations" },
                        ],
                    },
                    {
                        id: "org-settings",
                        label: "Settings",
                        to: "/organization/settings",
                        childrenLayout: "horizontal-tabs",
                        children: [
                            { id: "org-settings-agent", label: "Agent", to: "/organization/settings" },
                            { id: "org-settings-plan", label: "Plan", to: "/organization/settings/plan" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Communication",
        items: [
            {
                id: "inbox",
                label: "Inbox",
                icon: Inbox,
                to: "/inbox",
                badge: 3,
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
 * Resolves which horizontal tabs to display for the given pathname.
 * Returns `null` when there are no sub-tabs for the current view.
 *
 * Handles two levels of depth:
 *  1. Top-level item with `childrenLayout: "horizontal-tabs"` (e.g. Dashboard)
 *  2. Vertical-sidebar item → child with `childrenLayout: "horizontal-tabs"`
 *     (e.g. Organization → Members → Overview / Members List / Invitations)
 */
export function resolveHorizontalTabs(pathname: string): NavItem[] | null {
    for (const group of NAV_GROUPS) {
        for (const item of group.items) {
            if (!isUnder(pathname, item.to)) continue;

            // Case 1 — Top-level item with horizontal tabs (e.g. Dashboard)
            if (item.childrenLayout === "horizontal-tabs" && item.children?.length) {
                return item.children;
            }

            // Case 2 — Top-level item with vertical sidebar → find child with horizontal tabs
            if (item.childrenLayout === "vertical-sidebar" && item.children?.length) {
                for (const child of item.children) {
                    if (
                        child.childrenLayout === "horizontal-tabs" &&
                        child.children?.length &&
                        isUnder(pathname, child.to)
                    ) {
                        return child.children;
                    }
                }
            }
        }
    }
    return null;
}

/**
 * From a list of sibling tabs, returns the id of the most specific
 * (longest path prefix) tab matching `pathname`.
 */
export function resolveActiveTabId(tabs: NavItem[], pathname: string): string | null {
    let best: NavItem | null = null;
    for (const tab of tabs) {
        if (isUnder(pathname, tab.to)) {
            if (!best || tab.to.length > best.to.length) {
                best = tab;
            }
        }
    }
    return best?.id ?? null;
}

/**
 * Returns the label of the top-level nav section for a given pathname.
 * Used as the breadcrumb page title in the header.
 */
export function resolvePageTitle(pathname: string): string {
    for (const group of NAV_GROUPS) {
        for (const item of group.items) {
            if (isUnder(pathname, item.to)) return item.label;
        }
    }
    return "Dashboard";
}
