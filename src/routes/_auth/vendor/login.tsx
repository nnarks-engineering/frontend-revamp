import { VendorLoginForm } from "@/components/auth/VendorLoginForm"
import { requireGuest } from "@/shared/middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/vendor/login")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: () => <VendorLoginForm />,
})
