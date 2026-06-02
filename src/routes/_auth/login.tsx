import { ClientLoginForm } from "@/components/auth/ClientLoginForm"
import { requireGuest } from "@/shared/middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: ClientLoginForm,
})
