import { createFileRoute } from "@tanstack/react-router"

import { VendorRegisterForm } from "@/components/auth/vendor/RegisterForm"
import { requireGuest } from "@/shared/middleware"

export const Route = createFileRoute("/_auth/vendor/register")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: () => <VendorRegisterForm />,
})
