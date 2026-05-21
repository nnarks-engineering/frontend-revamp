import { RegisterForm } from "@/components/auth/RegisterForm"
import { requireGuest } from "@/shared/middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/register")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: RegisterForm,
})

