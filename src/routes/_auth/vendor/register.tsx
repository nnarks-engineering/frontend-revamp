import { createFileRoute } from "@tanstack/react-router"
import { VendorRegisterForm } from "@/components/auth/VendorRegisterForm"

export const Route = createFileRoute("/_auth/vendor/register")({
  component: () => <VendorRegisterForm />,
})
