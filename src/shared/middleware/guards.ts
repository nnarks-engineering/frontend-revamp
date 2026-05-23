import { redirect } from "@tanstack/react-router";
import type { RouterContext } from "./types";
import { checkOnboardingComplete } from "@/shared/lib/auth";

type ContextArgs = { context: RouterContext; location?: any };

// ── requireAuth ───────────────────────────────────────────────────────

export function requireAuth({ context, location }: ContextArgs): void {
  if (!context.auth.isAuthenticated()) {
    throw redirect({
      to: "/vendor/login",
      search: location ? { returnTo: encodeURIComponent(location.href) } : undefined,
    });
  }
}

// ── requireGuest ──────────────────────────────────────────────────────

export async function requireGuest({ context }: ContextArgs): Promise<void> {
  if (context.auth.isAuthenticated()) {
    // If the user arrived here via a returnTo redirect (e.g. invitation link),
    // send them back to that URL instead of the default dashboard.
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    if (returnTo) {
      throw redirect({ to: decodeURIComponent(returnTo) });
    }
    const isOnboarded = await checkOnboardingComplete(context.queryClient);
    throw redirect({
      to: isOnboarded ? "/org" : "/onboarding/org",
    });
  }
}

// ── requireOnboarding ─────────────────────────────────────────────────

export async function requireOnboarding({ context, location }: ContextArgs): Promise<void> {
  if (!context.auth.isAuthenticated()) {
    throw redirect({
      to: "/vendor/login",
      search: location ? { returnTo: encodeURIComponent(location.href) } : undefined,
    });
  }
  const isOnboarded = await checkOnboardingComplete(context.queryClient);
  if (isOnboarded) {
    throw redirect({ to: "/org" });
  }
}
