import { useState } from 'react'
import { ArrowRightIcon, EyeIcon, LockIcon, UserIcon } from '@/shared/components/icons'
import { portalRoles } from '../data/portalContent'
import { PortalField } from './PortalField'

// UI only: fields are required so the browser checks them, but submit goes nowhere yet.
// Heading, username hint and button text follow the chosen role; the eye button toggles the password.
export function PortalLoginForm({ role }) {
  const r = portalRoles[role]
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="mt-7 grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <PortalField label={r.userLabel} name="username" autoComplete="username" placeholder={r.userPlaceholder} icon={UserIcon} required />
      <PortalField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        autoComplete="current-password"
        icon={LockIcon}
        required
        trailing={
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((v) => !v)}
            className="grid size-9 place-items-center rounded-lg text-ink-subtle transition hover:bg-surface-muted hover:text-secondary aria-pressed:text-secondary"
          >
            <EyeIcon className="size-4.5" />
          </button>
        }
      />
      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 text-ink-muted">
          <input type="checkbox" name="remember" className="size-4 accent-secondary" /> Remember me
        </label>
        <a href="mailto:info@icv.edu.au?subject=Portal%20password%20reset" className="font-semibold text-secondary underline-offset-4 hover:text-secondary hover:underline">
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="group btn-shine mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 font-heading font-semibold text-white shadow-brand transition hover:bg-secondary-dark"
      >
        {r.submit}
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
      </button>
    </form>
  )
}
