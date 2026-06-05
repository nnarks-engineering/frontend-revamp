import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/projects/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/projects/create"!</div>
}
