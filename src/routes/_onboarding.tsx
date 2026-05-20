import NnarksLogo from "@/assets/nnarks-logo.svg?react"
import RoundingLine from "@/assets/svg/rounding-line.svg?react"
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding')({
  component: OnboardingLayoutWrapper,
})

function OnboardingLayoutWrapper() {
  return (
    <div className="relative min-h-screen w-full bg-background flex flex-col">
      {/* Subtle brand decoration */}
      <div className="absolute opacity-20 -top-10 -right-2 w-fit pointer-events-none" aria-hidden>
        <RoundingLine className="w-full text-secondary" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center px-6 py-5 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2 group">
          <NnarksLogo className="h-8 w-auto text-primary group-hover:scale-105 transition-transform" />
        </Link>
      </header>

      {/* Scrollable content area */}
      <main className="relative z-10 flex-1 overflow-y-auto flex items-start justify-center p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  )
}
