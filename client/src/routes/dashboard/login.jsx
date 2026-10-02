import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage, meQuery, safeRedirect } from '@/features/dashboard'

// Staff sign-in (and password reset). Already signed in → straight on. ?redirect= is where to go after
// signing in (dashboard paths only, see safeRedirect).
export const Route = createFileRoute('/dashboard/login')({
  validateSearch: (search) => ({ redirect: typeof search.redirect === 'string' ? search.redirect : undefined }),
  beforeLoad: async ({ context: { queryClient }, search }) => {
    const me = await queryClient.ensureQueryData(meQuery()).catch(() => null)
    if (me) throw redirect({ href: safeRedirect(search.redirect) })
  },
  component: LoginRoute,
})

function LoginRoute() {
  return <LoginPage redirectTo={safeRedirect(Route.useSearch().redirect)} />
}
