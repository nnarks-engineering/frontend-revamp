
import { redirect } from "@tanstack/react-router";
import type { RouterContext } from "./types";

type ContextArgs = { context: RouterContext };

// ── requireAuth ───────────────────────────────────────────────────────

export function requireAuth({ context }: ContextArgs): void {
  if (!context.auth.isAuthenticated()) {
    throw redirect({ to: "/vendor/login" });
  }
}

// ── requireGuest ──────────────────────────────────────────────────────

export function requireGuest({ context }: ContextArgs): void {
  if (context.auth.isAuthenticated()) {
    throw redirect({
      to: context.auth.isOnboardingComplete() ? "/org" : "/onboarding/org",
    });
  }
}

// ── requireOnboarding ─────────────────────────────────────────────────

export function requireOnboarding({ context }: ContextArgs): void {
  if (!context.auth.isAuthenticated()) {
    throw redirect({ to: "/vendor/login" });
  }
  if (context.auth.isOnboardingComplete()) {
    throw redirect({ to: "/org" });
  }
}
