import { createFileRoute } from '@tanstack/react-router'
import { PortalLoginPage, portalRoles } from '@/features/portal'

// Student / Trainer portal sign-in. ?role=trainer opens the trainer tab (default: student).
export const Route = createFileRoute('/portal')({
  validateSearch: (search) => ({ role: search.role in portalRoles ? search.role : undefined }),
  component: PortalRoute,
})

function PortalRoute() {
  const { role = 'student' } = Route.useSearch()
  const navigate = Route.useNavigate()
  const setRole = (next) => navigate({ search: { role: next === 'student' ? undefined : next }, replace: true })
  return <PortalLoginPage role={role} onRoleChange={setRole} />
}
