import { createFileRoute } from "@tanstack/react-router"
import { SuccessView } from "@/components/auth/SuccessView"

export const Route = createFileRoute("/_auth/success")({
  component: SuccessView,
})
