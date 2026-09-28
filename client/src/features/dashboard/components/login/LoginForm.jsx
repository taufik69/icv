import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/components/ui'
import { EyeIcon, LockIcon, MailIcon } from '@/shared/components/icons'
import { InputField } from '../course-form/fields/InputField'

// Static sign-in form: Sign in links straight to the dashboard until auth exists.
export function LoginForm() {
  return (
    <div className="w-full max-w-sm">
      <img src="/images/icv-logo-dark.webp" alt="International College of Victoria" width="240" height="110" className="mb-10 h-12 w-auto lg:hidden" />
      <h1 className="text-3xl">Sign in to course admin</h1>
      <p className="mt-2 text-ink-muted">Use your ICV staff email.</p>

      <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <InputField label="Email" type="email" name="email" autoComplete="username" placeholder="name@icv.edu.au" icon={MailIcon} />
        <InputField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          icon={LockIcon}
          trailing={
            <button type="button" aria-label="Show password" className="grid size-9 place-items-center rounded-lg text-ink-subtle hover:bg-surface-muted hover:text-secondary">
              <EyeIcon className="size-4.5" />
            </button>
          }
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-muted">
            <input type="checkbox" className="size-4 accent-primary-hover" /> Keep me signed in
          </label>
          <a href="mailto:info@icv.edu.au" className="font-semibold text-secondary hover:text-primary-hover">Forgot password?</a>
        </div>
        <Button as={Link} to="/dashboard/courses" variant="secondary" className="mt-2 w-full">
          Sign in
        </Button>
      </form>
    </div>
  )
}
