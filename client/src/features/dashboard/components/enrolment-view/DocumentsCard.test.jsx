import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { enrolmentDetail } from '@/test/fixtures/enrolmentDetail'
import { DocumentsCard } from './DocumentsCard'

describe('DocumentsCard', () => {
  it('lists each ticked document with links to its files', () => {
    const item = enrolmentDetail()
    render(<DocumentsCard enrolmentId={item.id} attachments={item.attachments} />)
    expect(screen.getByRole('heading', { name: /Section M: Documents/ })).toBeInTheDocument()
    expect(screen.getByText('1 of 2 with files')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /passport\.pdf/ })
    expect(link).toHaveAttribute('href', `http://api.test/api/v1/enrolments/${item.id}/files/e70aa7b8b1dd.pdf`)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('flags a ticked document with no file', () => {
    const item = enrolmentDetail()
    render(<DocumentsCard enrolmentId={item.id} attachments={item.attachments} />)
    const visa = screen.getByText('Copy of Visa (if applicable)').closest('li')
    expect(within(visa).getByText('No file')).toBeInTheDocument()
  })

  it('names "Other" documents and handles none ticked', () => {
    const other = [{ key: 'other', label: 'Other', name: 'Work letter', files: [] }]
    const { rerender } = render(<DocumentsCard enrolmentId="x" attachments={other} />)
    expect(screen.getByText('Other: Work letter')).toBeInTheDocument()
    rerender(<DocumentsCard enrolmentId="x" attachments={[]} />)
    expect(screen.getByText('No documents ticked.')).toBeInTheDocument()
  })
})
