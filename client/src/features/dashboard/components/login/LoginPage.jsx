import { LoginAside } from './LoginAside'
import { LoginForm } from './LoginForm'

// Staff sign-in. UI only — the form does not submit anywhere yet.
export function LoginPage() {
  return (
    <div className="grid min-h-svh bg-surface-muted lg:grid-cols-[minmax(0,53fr)_minmax(0,47fr)]">
      <LoginAside />
      <main className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-10">
        <LoginForm />
      </main>
    </div>
  )
}
