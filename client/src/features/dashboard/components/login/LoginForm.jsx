import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { BrandLogo } from '@/shared/components/ui'
import { ArrowRightIcon, EyeIcon, LockIcon, MailIcon, ShieldCheckIcon } from '@/shared/components/icons'
import { LoginField } from './LoginField'

// Static sign-in card: Sign in links straight to the dashboard until auth exists.
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="w-full max-w-md rounded-2xl bg-surface p-7 shadow-card ring-1 ring-line-soft sm:p-10">
      <BrandLogo className="mb-8 text-[0.625rem] text-secondary lg:hidden" />
      <h1 className="text-left text-3xl font-bold tracking-tight sm:text-4xl">Welcome back</h1>
      <p className="mt-2 text-left text-ink-subtle">Sign in with your ICV staff account.</p>

      <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <LoginField label="Work email" type="email" name="email" autoComplete="username" placeholder="name@icv.edu.au" icon={MailIcon} />
        <LoginField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
          icon={LockIcon}
          aside={<a href="mailto:info@icv.edu.au" className="text-sm font-medium text-secondary-muted hover:text-secondary">Forgot password?</a>}
          trailing={
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
              className={`grid size-9 place-items-center rounded-lg transition hover:bg-surface-muted ${showPassword ? 'text-secondary' : 'text-ink-subtle'}`}
            >
              <EyeIcon className="size-4.5" />
            </button>
          }
        />
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-muted">
          <input type="checkbox" defaultChecked className="size-4 rounded accent-secondary" /> Keep me signed in
        </label>
        <Link
          to="/dashboard/courses"
          className="group mt-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-secondary font-heading font-semibold text-white transition hover:bg-secondary-dark focus-visible:ring-4 focus-visible:ring-secondary/25 focus-visible:outline-none"
        >
          Sign in securely
          <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
        </Link>
      </form>

      <p className="mt-8 flex items-center justify-center gap-2 border-t border-line-soft pt-6 text-sm text-ink-subtle">
        <ShieldCheckIcon className="size-4 text-primary-hover" />
        Protected staff access
      </p>
    </div>
  )
}
