import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EnquiryModalProvider } from '@/app/providers/EnquiryModalProvider'
import { useEnquiryModal } from '@/shared/lib/enquiryModal'
import { renderWithQuery } from '@/test/renderWithQuery'
import { EnquiryDialog } from './EnquiryDialog'

// Stands in for an "Enquire" link: opens the popup with a course code.
function Opener({ course }) {
  const modal = useEnquiryModal()
  return <button type="button" onClick={() => modal.show(course)}>Enquire</button>
}
const setup = (course) => renderWithQuery(
  <EnquiryModalProvider>
    <Opener course={course} />
    <EnquiryDialog />
  </EnquiryModalProvider>,
)
const toCourseStep = () => {
  fireEvent.click(screen.getByLabelText(/I am in Australia/))
  fireEvent.click(screen.getByRole('button', { name: /Continue/ }))
}

describe('EnquiryDialog', () => {
  it('stays closed until an Enquire link asks for it', () => {
    setup()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Enquire' }))
    expect(screen.getByRole('dialog', { name: 'Enquire to ICV' })).toBeInTheDocument()
    expect(screen.getByText('Step 1 of 5 — Student type')).toBeInTheDocument()
  })

  it("picks the link's course, and ignores codes the form doesn't offer", () => {
    setup('CHC43015')
    fireEvent.click(screen.getByRole('button', { name: 'Enquire' }))
    toCourseStep()
    expect(screen.getByLabelText('Aged Care')).toBeChecked()
  })

  it('ignores an unknown course code', () => {
    setup('NOPE123')
    fireEvent.click(screen.getByRole('button', { name: 'Enquire' }))
    toCourseStep()
    expect(screen.getByRole('button', { name: /Or choose a course/ })).toHaveTextContent('Any course from the list')
  })

  it('closes with the × button and the page can scroll again', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: 'Enquire' }))
    expect(document.documentElement.style.overflow).toBe('hidden')
    fireEvent.click(screen.getByRole('button', { name: 'Close enquiry form' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.documentElement.style.overflow).toBe('')
  })
})
