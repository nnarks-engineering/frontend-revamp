
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { hasUserTypeAccess, type UserType } from "@/shared/lib/auth";

import { NAV_GROUPS } from "./nav-data-si";

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

export function canAccessItem(item: NavItem): boolean {
  return hasUserTypeAccess(item.userTypes);
}

export function filterItemByAccess(item: NavItem): NavItem | null {
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

export function getVisibleTopLevelItems(): NavItem[] {
  return NAV_GROUPS.flatMap((group) =>
    group.items
      .map(filterItemByAccess)
      .filter((item): item is NavItem => item !== null),
  );
}

// ─── Route helpers ────────────────────────────────────────────────────────────

export function canAccessPath(pathname: string): boolean {
  const allItems = NAV_GROUPS.flatMap((group) => group.items);
  let matchedItem: NavItem | null = null;
  let maxMatchLength = -1;

  function traverse(items: NavItem[]) {
    for (const item of items) {
      if (pathname === item.to || pathname.startsWith(item.to + "/")) {
        if (item.to.length > maxMatchLength) {
          maxMatchLength = item.to.length;
          matchedItem = item;
        }
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  }

  traverse(allItems);

  if (matchedItem && matchedItem.userTypes) {
    return hasUserTypeAccess(matchedItem.userTypes);
  }
  
  // Default to true if the route is not defined in the nav config,
  // or doesn't have explicit userTypes.
  return true;
}

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
  return "Home";
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
