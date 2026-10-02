import { useNavigate } from '@tanstack/react-router'
import { LogOutIcon } from '@/shared/components/icons'
import { useLogout } from '../../hooks/useAuth'

// Ends the session (the API clears the cookie), forgets cached dashboard data, and goes to sign in.
export function SignOutButton({ className = '', iconClass = 'size-4' }) {
  const logout = useLogout()
  const navigate = useNavigate()
  return (
    <button
      type="button" aria-label="Sign out" title="Sign out" disabled={logout.isPending}
      onClick={() => logout.mutate(undefined, { onSettled: () => navigate({ to: '/dashboard/login', replace: true }) })}
      className={`grid place-items-center rounded-lg transition disabled:opacity-60 ${className}`}
    >
      <LogOutIcon className={iconClass} />
    </button>
  )
}
