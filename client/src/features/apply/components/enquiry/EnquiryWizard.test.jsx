import { fireEvent, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { answerFetch, renderWithQuery } from '@/test/renderWithQuery'
import { useEnquiryWizard } from '../../hooks/useEnquiryWizard'
import { EnquiryWizard } from './EnquiryWizard'

function Harness({ initial }) {
  const form = useEnquiryWizard(initial)
  return form.sent ? <p>sent</p> : <EnquiryWizard form={form} />
}
const cont = () => fireEvent.click(screen.getByRole('button', { name: /Continue|Send enquiry/ }))

afterEach(() => vi.unstubAllGlobals())

describe('EnquiryWizard', () => {
  it('asks for a student type before going on', () => {
    renderWithQuery(<Harness />)
    expect(screen.getByText('Step 1 of 5 — Student type')).toBeInTheDocument()
    cont()
    expect(screen.getByText('Choose one to continue.')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText(/I am overseas/))
    cont()
    expect(screen.getByText('Step 2 of 5 — Course interest')).toBeInTheDocument()
  })

  it("filters the course dropdown to the chosen area, and picks a one-course area's course", () => {
    renderWithQuery(<Harness initial={{ studentType: 'Domestic' }} />)
    cont()
    fireEvent.click(screen.getByLabelText('Building & Construction'))
    const list = screen.getByRole('listbox', { hidden: true })
    const names = [...list.querySelectorAll('[role=option]')].map((o) => o.textContent)
    expect(names).toHaveLength(4)
    expect(names.join(' ')).toContain('Certificate III in Stonemasonry')
    expect(names.join(' ')).not.toContain('Carpentry')
    expect(screen.getByRole('button', { name: /Course in Building & Construction/ })).toHaveTextContent('Choose one of 4 courses')
    fireEvent.click(screen.getByLabelText('Carpentry'))
    expect(screen.getByRole('button', { name: /Course in Carpentry/ })).toHaveTextContent('Certificate III in Carpentry')
    fireEvent.click(screen.getByRole('button', { name: 'Show all courses' }))
    expect(screen.getByRole('listbox', { hidden: true }).querySelectorAll('[role=option]')).toHaveLength(10)
  })

  it('opens with the area of a course from the link already picked', () => {
    renderWithQuery(<Harness initial={{ studentType: 'Domestic', course: 'CHC43015' }} />)
    cont()
    expect(screen.getByLabelText('Aged Care')).toBeChecked()
  })

  it('checks contact details, keeps answers when going back, and sends everything at the end', async () => {
    const fetch = answerFetch(vi, 201, { data: { id: 'x' } })
    renderWithQuery(<Harness initial={{ studentType: 'International', course: 'CPC30220' }} />)
    cont(); cont()
    cont()
    expect(screen.getByText('Step 3 of 5 — Contact details')).toBeInTheDocument()
    expect(screen.getAllByText('This field is required.')).toHaveLength(3)
    fireEvent.change(screen.getByLabelText(/First name/), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByLabelText(/Last name/), { target: { value: 'Smith' } })
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jane@example.com' } })
    cont()
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Melbourne' } })
    cont()
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByLabelText('City')).toHaveValue('Melbourne')
    cont(); cont()
    await waitFor(() => expect(screen.getByText('sent')).toBeInTheDocument())
    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body).toMatchObject({ studentType: 'International', course: 'CPC30220', firstName: 'Jane', email: 'jane@example.com', city: 'Melbourne' })
  })
})
