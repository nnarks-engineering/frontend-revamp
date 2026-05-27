import { AppLayout } from '@/components/app/layout/AppLayout'
import { requireAuth } from '@/shared/middleware'
import { createFileRoute } from '@tanstack/react-router'
// import "@/app/styles/index.css";


export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => requireAuth({ context, location }),
  component: AppLayout,
})
