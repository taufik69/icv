import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { BrandLogo } from '@/shared/components/ui'
import { ArrowRightIcon, EyeIcon, LockIcon, MailIcon, ShieldCheckIcon } from '@/shared/components/icons'
import { LoginField } from './LoginField'

// Static sign-in card: Sign in links straight to the dashboard until auth exists.
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="w-full max-w-xl rounded-3xl border border-line-soft bg-surface px-6 py-10 shadow-elevated sm:px-14 sm:py-14">
      <BrandLogo className="mb-10 text-[0.6875rem] text-secondary lg:hidden" />
      <h1 className="text-left text-4xl font-bold tracking-tight sm:text-5xl">Welcome back</h1>
      <p className="mt-3 text-left text-lg text-ink-subtle">Sign in with your ICV staff account.</p>

      <form className="mt-10 grid gap-6" onSubmit={(e) => e.preventDefault()}>
        <LoginField label="Work email" type="email" name="email" autoComplete="username" placeholder="name@icv.edu.au" icon={MailIcon} />
        <LoginField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="current-password"
          icon={LockIcon}
          trailing={
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
              className={`grid size-10 place-items-center rounded-xl transition hover:bg-surface-muted ${showPassword ? 'text-secondary' : 'text-ink-subtle'}`}
            >
              <EyeIcon className="size-5" />
            </button>
          }
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-3 text-ink-muted">
            <input type="checkbox" defaultChecked className="size-5 rounded accent-secondary" /> Keep me signed in
          </label>
          <a href="mailto:info@icv.edu.au" className="font-semibold text-secondary hover:text-primary-hover">Forgot password?</a>
        </div>
        <Link
          to="/dashboard/courses"
          className="btn-shine group mt-2 flex h-16 items-center justify-center gap-3 rounded-full bg-secondary text-lg font-semibold text-white shadow-brand transition hover:bg-secondary-dark"
        >
          Sign in securely
          <ArrowRightIcon className="size-5 transition group-hover:translate-x-1" />
        </Link>
      </form>

      <div className="mt-8 flex items-center gap-4 text-sm font-medium text-secondary">
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <span className="grid size-11 place-items-center rounded-full bg-primary-soft text-secondary">
          <ShieldCheckIcon className="size-5" />
        </span>
        Protected staff access
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
    </div>
  )
}
