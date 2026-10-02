import { fireEvent, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { enrolmentDetail } from '@/test/fixtures/enrolmentDetail'
import { answerFetch, renderWithQuery } from '@/test/renderWithQuery'
import { StaffNote } from './StaffNote'

afterEach(() => vi.unstubAllGlobals())

describe('StaffNote', () => {
  it('enables Save only after the note changes', () => {
    renderWithQuery(<StaffNote item={enrolmentDetail({ staffNote: 'Checked' })} />)
    const save = screen.getByRole('button', { name: 'Save note' })
    expect(save).toBeDisabled()
    fireEvent.change(screen.getByLabelText('Staff note'), { target: { value: 'Checked passport' } })
    expect(save).toBeEnabled()
  })

  it('PATCHes the trimmed note to the enrolment', async () => {
    const item = enrolmentDetail()
    const fetch = answerFetch(vi, 200, { data: { ...item, staffNote: 'Waiting for IELTS' } })
    renderWithQuery(<StaffNote item={item} />)
    fireEvent.change(screen.getByLabelText('Staff note'), { target: { value: '  Waiting for IELTS ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }))
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce())
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe(`http://api.test/api/v1/enrolments/${item.id}`)
    expect(init.method).toBe('PATCH')
    expect(JSON.parse(init.body)).toEqual({ staffNote: 'Waiting for IELTS' })
  })

  it('shows why a save failed', async () => {
    answerFetch(vi, 404, { error: { message: 'Enrolment not found' } })
    renderWithQuery(<StaffNote item={enrolmentDetail()} />)
    fireEvent.change(screen.getByLabelText('Staff note'), { target: { value: 'x' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }))
    expect(await screen.findByText("Couldn't save: Enrolment not found")).toBeInTheDocument()
  })
})
