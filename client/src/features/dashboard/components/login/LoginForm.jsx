import { useState } from 'react'
import { EyeIcon, LockIcon, MailIcon } from '@/shared/components/icons'
import { useLogin } from '../../hooks/useAuth'
import { FormAlert } from './FormAlert'
import { LoginField } from './LoginField'
import { SubmitButton } from './SubmitButton'

// Sign in with email + password. On success `onSignedIn` runs (the page then goes to the dashboard).
// "Forgot password?" starts the reset with whatever email is typed.
export function LoginForm({ email: startEmail = '', onForgot, onSignedIn }) {
  const [email, setEmail] = useState(startEmail)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const login = useLogin()
  const fields = login.error?.details ?? {}

  const submit = (e) => {
    e.preventDefault()
    login.mutate({ email, password }, { onSuccess: onSignedIn })
  }

  return (
    <form className="grid gap-5" onSubmit={submit} noValidate>
      <LoginField label="Work email" type="email" name="email" autoComplete="username" placeholder="name@icv.edu.au" icon={MailIcon}
        value={email} onChange={(e) => setEmail(e.target.value)} error={fields.email?.[0]} required autoFocus={!startEmail} />
      <LoginField
        label="Password" type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" placeholder="Your password" icon={LockIcon}
        value={password} onChange={(e) => setPassword(e.target.value)} error={fields.password?.[0]} required autoFocus={Boolean(startEmail)}
        aside={<button type="button" onClick={() => onForgot(email)} className="text-sm font-medium text-secondary-muted hover:text-secondary">Forgot password?</button>}
        trailing={
          <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((v) => !v)}
            className={`grid size-9 place-items-center rounded-lg transition hover:bg-surface-muted ${showPassword ? 'text-secondary' : 'text-ink-subtle'}`}>
            <EyeIcon className="size-4.5" />
          </button>
        }
      />
      {!login.error?.details && <FormAlert error={login.error} />}
      <SubmitButton busy={login.isPending} busyLabel="Signing in…">Sign in securely</SubmitButton>
    </form>
  )
}
