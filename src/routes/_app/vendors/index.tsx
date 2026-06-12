import { createFileRoute } from '@tanstack/react-router'

import { VendorsPageClient } from '@/components/app/page/vendors/VendorsPageClient'

export const Route = createFileRoute('/_app/vendors/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VendorsPageClient />
}
