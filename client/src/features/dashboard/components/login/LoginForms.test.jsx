import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { answerFetch, renderWithQuery } from '@/test/renderWithQuery'
import { CodeForm } from './CodeForm'
import { LoginForm } from './LoginForm'

afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers() })

describe('LoginForm', () => {
  it('posts the email and password, then calls onSignedIn', async () => {
    const fetch = answerFetch(vi, 200, { data: { id: '1', email: 'a@icv.edu.au', name: 'Admin', role: 'admin' } })
    const onSignedIn = vi.fn()
    renderWithQuery(<LoginForm onForgot={() => {}} onSignedIn={onSignedIn} />)
    fireEvent.change(screen.getByLabelText('Work email'), { target: { value: 'a@icv.edu.au' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secret-password' } })
    fireEvent.click(screen.getByRole('button', { name: 'Sign in securely' }))
    await waitFor(() => expect(onSignedIn).toHaveBeenCalled())
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('http://api.test/api/v1/auth/login')
    expect(init.credentials).toBe('include')
    expect(JSON.parse(init.body)).toEqual({ email: 'a@icv.edu.au', password: 'secret-password' })
  })

  it("shows the server's message for a wrong password", async () => {
    answerFetch(vi, 401, { error: { message: 'Email or password is incorrect.' } })
    renderWithQuery(<LoginForm onForgot={() => {}} onSignedIn={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Sign in securely' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Email or password is incorrect.')
  })

  it('starts a reset with the email typed so far', () => {
    const onForgot = vi.fn()
    renderWithQuery(<LoginForm onForgot={onForgot} onSignedIn={() => {}} />)
    fireEvent.change(screen.getByLabelText('Work email'), { target: { value: 'me@icv.edu.au' } })
    fireEvent.click(screen.getByRole('button', { name: 'Forgot password?' }))
    expect(onForgot).toHaveBeenCalledWith('me@icv.edu.au')
  })
})

describe('CodeForm', () => {
  it('counts down 5 minutes, then offers a new code instead', () => {
    vi.useFakeTimers()
    renderWithQuery(<CodeForm email="a@icv.edu.au" expiresAt={new Date(Date.now() + 300_000)} onResent={() => {}} onVerified={() => {}} onBack={() => {}} />)
    expect(screen.getByText('5:00')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(301_000))
    expect(screen.getByText('This code has expired. Send a new one.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send a new code' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Check code' })).not.toBeInTheDocument()
  })

  it('keeps only digits, at most 6', () => {
    renderWithQuery(<CodeForm email="a@icv.edu.au" expiresAt={new Date(Date.now() + 300_000)} onResent={() => {}} onVerified={() => {}} onBack={() => {}} />)
    const input = screen.getByLabelText('6-digit code')
    fireEvent.change(input, { target: { value: '12a 34-5678' } })
    expect(input).toHaveValue('123456')
  })

  it('hands the reset token on when the code is right', async () => {
    answerFetch(vi, 200, { data: { resetToken: 'tok' } })
    const onVerified = vi.fn()
    renderWithQuery(<CodeForm email="a@icv.edu.au" expiresAt={new Date(Date.now() + 300_000)} onResent={() => {}} onVerified={onVerified} onBack={() => {}} />)
    fireEvent.change(screen.getByLabelText('6-digit code'), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: 'Check code' }))
    await waitFor(() => expect(onVerified).toHaveBeenCalledWith('tok'))
  })
})
