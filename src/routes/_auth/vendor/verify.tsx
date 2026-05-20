import { VendorVerifyForm } from "@/components/auth/VendorVerifyForm"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const searchSchema = z.object({
  email: z.string().optional(),
  token: z.string().optional(),
  flow: z.enum(["magic", "signup"]).optional(),
})

export const Route = createFileRoute("/_auth/vendor/verify")({
  validateSearch: (search) => searchSchema.parse(search),
  component: function VendorVerifyPage() {
    const { email, token, flow } = Route.useSearch()
    return <VendorVerifyForm email={email} token={token} flow={flow} />
  },
})
