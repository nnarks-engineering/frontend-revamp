import { LoginForm } from "@/components/auth/LoginForm"
import { requireGuest } from "@/shared/middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: LoginForm,
})
