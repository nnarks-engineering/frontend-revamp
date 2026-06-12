import { redirect } from "@tanstack/react-router";

import { checkOnboardingComplete, getStoredUserType } from "@/shared/lib/auth";

import type { RouterContext } from "./types";

type ContextArgs = {
  context: RouterContext;
  location?: {
    href: string;
    pathname: string;
  };
};

function getLoginRoute(pathname?: string): "/login" | "/vendor/login" {
  if (pathname?.startsWith("/home")) {
    return "/login";
  }

  return getStoredUserType() === "client" ? "/login" : "/vendor/login";
}

// ── requireAuth ───────────────────────────────────────────────────────

export function requireAuth({ context, location }: ContextArgs): void {
  if (!context.auth.isAuthenticated()) {
    throw redirect({
      to: getLoginRoute(location?.pathname),
      search: location ? { returnTo: encodeURIComponent(location.href) } : undefined,
    });
  }
}

// ── requireGuest ──────────────────────────────────────────────────────

export async function requireGuest({ context }: ContextArgs): Promise<void> {
  if (context.auth.isAuthenticated()) {
    const userType = getStoredUserType();

    // If the user arrived here via a returnTo redirect (e.g. invitation link),
    // send them back to that URL instead of the default dashboard.
    const returnTo = new URLSearchParams(globalThis.location.search).get("returnTo");
    if (returnTo) {
      throw redirect({ to: decodeURIComponent(returnTo) });
    }

    if (userType === "client") {
      throw redirect({ to: "/home" });
    }

    const isOnboarded = await checkOnboardingComplete(context.queryClient, userType);
    throw redirect({
      to: isOnboarded ? "/home" : "/onboarding/org",
    });
  }
}

// ── requireOnboarding ─────────────────────────────────────────────────

export async function requireOnboarding({ context, location }: ContextArgs): Promise<void> {
  if (!context.auth.isAuthenticated()) {
    throw redirect({
      to: getLoginRoute(location?.pathname),
      search: location ? { returnTo: encodeURIComponent(location.href) } : undefined,
    });
  }
  const isOnboarded = await checkOnboardingComplete(context.queryClient);
  if (isOnboarded) {
    throw redirect({ to: "/home" });
  }
}
