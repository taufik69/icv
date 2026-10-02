import { useState } from 'react'
import { MailIcon } from '@/shared/components/icons'
import { useForgotPassword } from '../../hooks/useAuth'
import { FormAlert } from './FormAlert'
import { LoginField } from './LoginField'
import { SubmitButton } from './SubmitButton'

// Step 1 of a reset: the account's email. The API answers the same for any email (so it can't be used
// to find accounts) and sends a 6-digit code in the background; `onSent(email, expiresAt)` moves on.
export function ForgotForm({ email: startEmail = '', onSent, onBack }) {
  const [email, setEmail] = useState(startEmail)
  const forgot = useForgotPassword()

  const submit = (e) => {
    e.preventDefault()
    forgot.mutate(email.trim(), { onSuccess: (data) => onSent(email.trim().toLowerCase(), data.expiresAt) })
  }

  return (
    <form className="grid gap-5" onSubmit={submit} noValidate>
      <LoginField label="Work email" type="email" name="email" autoComplete="username" placeholder="name@icv.edu.au" icon={MailIcon}
        value={email} onChange={(e) => setEmail(e.target.value)} error={forgot.error?.details?.email?.[0]} required autoFocus />
      {!forgot.error?.details && <FormAlert error={forgot.error} />}
      <SubmitButton busy={forgot.isPending} busyLabel="Sending code…">Email me a code</SubmitButton>
      <button type="button" onClick={onBack} className="text-sm font-medium text-secondary-muted hover:text-secondary">Back to sign in</button>
    </form>
  )
}
