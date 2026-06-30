import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

import { VendorVerifyForm } from "@/components/auth/vendor/VerifyForm"

const searchSchema = z.object({
  email: z.string().optional(),
  token: z.string().optional(),
  flow: z.enum(["magic", "signup"]).optional(),
  returnTo: z.string().optional(),
})

export const Route = createFileRoute("/_auth/vendor/verify")({
  validateSearch: (search) => searchSchema.parse(search),
  component: function VendorVerifyPage() {
    const { email, token, flow } = Route.useSearch()
    return <VendorVerifyForm email={email} token={token} flow={flow} />
  },
})
