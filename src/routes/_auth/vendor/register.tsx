import { VendorRegisterForm } from "@/components/auth/VendorRegisterForm"
import { requireGuest } from "@/shared/middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/vendor/register")({
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: () => <VendorRegisterForm />,
})
