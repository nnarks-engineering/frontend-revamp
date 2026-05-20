import { createFileRoute } from "@tanstack/react-router"
import { VendorLoginForm } from "@/components/auth/VendorLoginForm"

export const Route = createFileRoute("/_auth/vendor/login")({
  component: () => <VendorLoginForm />,
})
