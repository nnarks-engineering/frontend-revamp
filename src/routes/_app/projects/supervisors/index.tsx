import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/projects/supervisors/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/projects/supervisor/"!</div>
}
