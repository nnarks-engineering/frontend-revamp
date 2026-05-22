import { redirect } from "@tanstack/react-router";
import type { RouterContext } from "./types";
import { checkOnboardingComplete } from "@/shared/lib/auth";

type ContextArgs = { context: RouterContext };

// ── requireAuth ───────────────────────────────────────────────────────

export function requireAuth({ context }: ContextArgs): void {
  if (!context.auth.isAuthenticated()) {
    throw redirect({ to: "/vendor/login" });
  }
}

// ── requireGuest ──────────────────────────────────────────────────────

export async function requireGuest({ context }: ContextArgs): Promise<void> {
  if (context.auth.isAuthenticated()) {
    const isOnboarded = await checkOnboardingComplete(context.queryClient);
    throw redirect({
      to: isOnboarded ? "/org" : "/onboarding/org",
    });
  }
}

// ── requireOnboarding ─────────────────────────────────────────────────

export async function requireOnboarding({ context }: ContextArgs): Promise<void> {
  if (!context.auth.isAuthenticated()) {
    throw redirect({ to: "/vendor/login" });
  }
  const isOnboarded = await checkOnboardingComplete(context.queryClient);
  if (isOnboarded) {
    throw redirect({ to: "/org" });
  }
}
