import { useState } from 'react'
import { ClockIcon } from '@/shared/components/icons'
import { useForgotPassword, useVerifyCode } from '../../hooks/useAuth'
import { mmss, useCountdown } from '../../hooks/useCountdown'
import { FormAlert } from './FormAlert'
import { SubmitButton } from './SubmitButton'

const box = 'h-14 w-full rounded-xl border border-line bg-surface-alt text-center font-heading text-3xl font-bold tracking-[0.6em] text-secondary transition placeholder:text-ink-disabled focus:border-secondary focus:bg-surface focus:ring-4 focus:ring-secondary/10 focus:outline-none'

// Step 2: the 6-digit code from the email. A 5-minute countdown shows how long the code works; when it
// runs out the code is refused and "Send a new code" appears. `onVerified(resetToken)` moves on.
export function CodeForm({ email, expiresAt, onResent, onVerified, onBack }) {
  const [code, setCode] = useState('')
  const seconds = useCountdown(expiresAt)
  const verify = useVerifyCode()
  const resend = useForgotPassword()

  const submit = (e) => {
    e.preventDefault()
    verify.mutate({ email, code }, { onSuccess: (data) => onVerified(data.resetToken) })
  }
  const again = () => resend.mutate(email, { onSuccess: (data) => { setCode(''); verify.reset(); onResent(data.expiresAt) } })

  return (
    <form className="grid gap-5" onSubmit={submit} noValidate>
      <div>
        <label htmlFor="reset-code" className="mb-2 block text-sm font-semibold text-secondary">6-digit code</label>
        <input
          id="reset-code" name="code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          inputMode="numeric" autoComplete="one-time-code" placeholder="••••••" maxLength={6} autoFocus className={box}
        />
      </div>
      <p aria-live="polite" className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${seconds ? 'bg-surface-muted text-ink-muted' : 'bg-warning-soft text-warning-ink'}`}>
        <ClockIcon className="size-4 shrink-0" />
        {seconds ? <>Code expires in <strong className="font-heading text-ink-strong tabular-nums">{mmss(seconds)}</strong></> : 'This code has expired. Send a new one.'}
      </p>
      <FormAlert error={verify.error ?? resend.error} />
      {seconds > 0 ? (
        <SubmitButton busy={verify.isPending} busyLabel="Checking…">Check code</SubmitButton>
      ) : (
        <button type="button" onClick={again} disabled={resend.isPending} className="flex h-12 items-center justify-center rounded-xl bg-secondary font-heading font-semibold text-white transition hover:bg-secondary-dark disabled:opacity-70">
          {resend.isPending ? 'Sending…' : 'Send a new code'}
        </button>
      )}
      <button type="button" onClick={onBack} className="text-sm font-medium text-secondary-muted hover:text-secondary">Use a different email</button>
    </form>
  )
}
