import { AuthLayout } from '@/components/auth/AuthLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute("/_auth")({
  component: AuthLayoutWrapper,
})

function AuthLayoutWrapper() {
  return (
    <div className="auth-layout-container">
      <AuthLayout>
 <Outlet />
      </AuthLayout>
     
    </div>
  )
}
