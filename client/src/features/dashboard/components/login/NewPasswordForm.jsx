import { useState } from 'react'
import { EyeIcon, LockIcon } from '@/shared/components/icons'
import { useResetPassword } from '../../hooks/useAuth'
import { FormAlert } from './FormAlert'
import { LoginField } from './LoginField'
import { SubmitButton } from './SubmitButton'

const MIN = 10

// Step 3: the new password, typed twice (checked here before sending; the API checks the length too).
// `onDone` returns to sign in.
export function NewPasswordForm({ resetToken, onDone }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [tried, setTried] = useState(false)
  const reset = useResetPassword()
  const tooShort = password.length < MIN && `Use at least ${MIN} characters.`
  const mismatch = confirm !== password && 'The two passwords are different.'

  const submit = (e) => {
    e.preventDefault()
    setTried(true)
    if (!tooShort && !mismatch) reset.mutate({ resetToken, password }, { onSuccess: onDone })
  }
  const eye = (
    <button type="button" aria-label={show ? 'Hide passwords' : 'Show passwords'} aria-pressed={show} onClick={() => setShow((v) => !v)}
      className={`grid size-9 place-items-center rounded-lg transition hover:bg-surface-muted ${show ? 'text-secondary' : 'text-ink-subtle'}`}>
      <EyeIcon className="size-4.5" />
    </button>
  )

  return (
    <form className="grid gap-5" onSubmit={submit} noValidate>
      <LoginField label="New password" type={show ? 'text' : 'password'} name="new-password" autoComplete="new-password" icon={LockIcon} trailing={eye}
        placeholder={`At least ${MIN} characters`} value={password} onChange={(e) => setPassword(e.target.value)} error={tried ? tooShort || reset.error?.details?.password?.[0] : undefined} autoFocus />
      <LoginField label="Type it again" type={show ? 'text' : 'password'} name="confirm-password" autoComplete="new-password" icon={LockIcon}
        placeholder="Same password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={tried ? mismatch : undefined} />
      {!reset.error?.details && <FormAlert error={reset.error} />}
      <SubmitButton busy={reset.isPending} busyLabel="Saving…">Save new password</SubmitButton>
    </form>
  )
}
