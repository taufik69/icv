import { LoginAside } from './LoginAside'
import { LoginForm } from './LoginForm'

// Staff sign-in: photo panel (lg+) | the sign-in card on a soft grey panel. UI only — nothing submits yet.
export function LoginPage() {
  return (
    <div className="grid min-h-svh bg-surface-muted lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <LoginAside />
      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <LoginForm />
      </main>
    </div>
  )
}
