import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

import { ClientVerifyForm } from "@/components/auth/client/VerifyForm"

const searchSchema = z.object({
  email: z.string().optional(),
  token: z.string().optional(),
  flow: z.enum(["magic", "signup"]).optional(),
  name: z.string().optional(),
})

export const Route = createFileRoute("/_auth/verify")({
  validateSearch: (search) => searchSchema.parse(search),
  component: VerifyPage,
})

function VerifyPage() {
  const { email, token, flow, name } = Route.useSearch()
  return <ClientVerifyForm email={email} token={token} flow={flow} name={name} />
}
