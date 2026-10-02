import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AuthCard } from './AuthCard'
import { CodeForm } from './CodeForm'
import { ForgotForm } from './ForgotForm'
import { LoginAside } from './LoginAside'
import { LoginForm } from './LoginForm'
import { NewPasswordForm } from './NewPasswordForm'

const steps = {
  login: { title: 'Welcome back', lead: 'Sign in with your ICV staff account.' },
  forgot: { title: 'Reset your password', lead: "Enter your work email and we'll send you a 6-digit code." },
  code: { title: 'Check your email', lead: null },
  password: { title: 'Choose a new password', lead: 'You will sign in with it from now on.' },
}

// Staff sign-in: photo panel (lg+) | one card that walks through sign in, or the reset: email → code
// (5-minute countdown) → new password → back to sign in with a confirmation.
export function LoginPage({ redirectTo = '/dashboard' }) {
  const navigate = useNavigate()
  const [flow, setFlow] = useState({ step: 'login', email: '', expiresAt: null, resetToken: null, notice: null })
  const go = (step, more = {}) => setFlow((f) => ({ ...f, notice: null, ...more, step }))
  const { title, lead } = steps[flow.step]

  return (
    <div className="grid min-h-svh bg-surface-muted lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <LoginAside />
      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <AuthCard key={flow.step} title={title} notice={flow.notice}
          lead={lead ?? `If ${flow.email} is a staff account, a 6-digit code is on its way. It works for 5 minutes.`}>
          {flow.step === 'login' && (
            <LoginForm email={flow.email} onForgot={(email) => go('forgot', { email })} onSignedIn={() => navigate({ href: redirectTo, replace: true })} />
          )}
          {flow.step === 'forgot' && (
            <ForgotForm email={flow.email} onBack={() => go('login')} onSent={(email, expiresAt) => go('code', { email, expiresAt })} />
          )}
          {flow.step === 'code' && (
            <CodeForm email={flow.email} expiresAt={flow.expiresAt} onBack={() => go('forgot')}
              onResent={(expiresAt) => setFlow((f) => ({ ...f, expiresAt }))} onVerified={(resetToken) => go('password', { resetToken })} />
          )}
          {flow.step === 'password' && (
            <NewPasswordForm resetToken={flow.resetToken} onDone={() => go('login', { resetToken: null, notice: 'Password changed. Sign in with your new password.' })} />
          )}
        </AuthCard>
      </main>
    </div>
  )
}
