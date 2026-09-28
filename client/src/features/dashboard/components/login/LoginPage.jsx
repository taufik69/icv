import { LoginAside } from './LoginAside'
import { LoginForm } from './LoginForm'

// Staff sign-in. UI only — the form does not submit anywhere yet.
export function LoginPage() {
  return (
    <div className="grid min-h-svh bg-surface lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <LoginAside />
      <main className="flex items-center justify-center px-5 py-12 sm:px-8">
        <LoginForm />
      </main>
    </div>
  )
}
