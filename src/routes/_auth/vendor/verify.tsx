import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { VendorVerifyForm } from "@/components/auth/VendorVerifyForm"

const searchSchema = z.object({
  email: z.string().optional(),
  token: z.string().optional(),
})

export const Route = createFileRoute("/_auth/vendor/verify")({
  validateSearch: (search) => searchSchema.parse(search),
  component: function VendorVerifyPage() {
    const { email, token } = Route.useSearch()
    return <VendorVerifyForm email={email} token={token} />
  },
})
