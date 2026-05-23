import { VendorLoginForm } from "@/components/auth/VendorLoginForm"
import { requireGuest } from "@/shared/middleware"
import { createFileRoute } from "@tanstack/react-router"

type LoginSearch = {
  returnTo?: string
}

export const Route = createFileRoute("/_auth/vendor/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    returnTo: search.returnTo as string | undefined,
  }),
  beforeLoad: ({ context }) => requireGuest({ context }),
  component: () => <VendorLoginForm />,
})
