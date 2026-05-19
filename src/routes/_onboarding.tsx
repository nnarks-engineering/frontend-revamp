import { createFileRoute, Outlet } from '@tanstack/react-router'
import RoundingLine from "@/assets/svg/rounding-line.svg?react"

export const Route = createFileRoute('/_onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative w-full min-h-screen">
      <Outlet />

      <div className="absolute opacity-50 -top-10 -right-2 w-fit">
        <RoundingLine className="w-full text-secondary" />
      </div>
    </div>
  )
}
