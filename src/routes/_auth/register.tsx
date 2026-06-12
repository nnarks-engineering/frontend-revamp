import { createFileRoute } from "@tanstack/react-router"

import { ClientRegisterForm } from "@/components/auth/client/RegisterForm"
import { requireGuest } from "@/shared/middleware"

export const Route = createFileRoute("/_auth/register")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: ClientRegisterForm,
})

