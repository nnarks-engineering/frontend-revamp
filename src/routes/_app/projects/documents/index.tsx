import { createFileRoute } from '@tanstack/react-router'

import { DocumentsPageClient } from '@/components/app/page/documents/DocumentsPageClient'

export const Route = createFileRoute('/_app/projects/documents/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DocumentsPageClient />
}
