import { act, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { enrolmentValues } from '@/test/fixtures/enrolmentValues'
import { answerFetch, renderHookWithQuery } from '@/test/renderWithQuery'
import { useSubmitEnrolment } from './useSubmitEnrolment'

afterEach(() => vi.unstubAllGlobals())

describe('useSubmitEnrolment', () => {
  it('POSTs the multipart form and returns the reference', async () => {
    const fetch = answerFetch(vi, 201, { data: { id: 'a1', reference: 'ENR-2026-ABC234', status: 'New', submittedAt: '2026-10-02T07:00:00Z' } })
    const { result } = renderHookWithQuery(() => useSubmitEnrolment())
    act(() => result.current.mutate(enrolmentValues()))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data.reference).toBe('ENR-2026-ABC234')
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('http://api.test/api/v1/enrolments')
    expect(init.method).toBe('POST')
    expect(init.body).toBeInstanceOf(FormData)
    expect(init.headers?.['Content-Type']).toBeUndefined() // the browser sets the multipart boundary
    expect(JSON.parse(init.body.get('data')).course.code).toBe('CPC30220')
  })

  it('maps a 400 back to form fields and the step to open', async () => {
    answerFetch(vi, 400, { error: { message: 'Invalid body', details: { 'personal.passportExpiry': ['use YYYY-MM-DD'] } } })
    const { result } = renderHookWithQuery(() => useSubmitEnrolment())
    act(() => result.current.mutate(enrolmentValues()))
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error.status).toBe(400)
    expect(result.current.error.errors).toEqual({ passportExpiry: 'Use YYYY-MM-DD.' })
    expect(result.current.error.step).toBe(1)
  })
})
