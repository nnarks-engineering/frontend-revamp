import { createFileRoute } from "@tanstack/react-router"

import { ClientLoginForm } from "@/components/auth/client/LoginForm"
import { requireGuest } from "@/shared/middleware"

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: ClientLoginForm,
})
