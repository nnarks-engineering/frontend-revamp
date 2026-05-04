import { createFileRoute } from "@tanstack/react-router"
import { VerifyForm } from "@/components/auth/VerifyForm"
import { z } from "zod"

const searchSchema = z.object({
  email: z.string().optional(),
})

export const Route = createFileRoute("/_auth/verify")({
  validateSearch: (search) => searchSchema.parse(search),
  component: VerifyPage,
})

function VerifyPage() {
  const { email } = Route.useSearch()
  return <VerifyForm email={email} />
}
