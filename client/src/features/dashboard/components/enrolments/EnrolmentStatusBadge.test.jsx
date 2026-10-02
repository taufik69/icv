import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { enrolmentStatuses } from '../../data/enrolmentStatus'
import { EnrolmentStatusBadge } from './EnrolmentStatusBadge'

describe('EnrolmentStatusBadge', () => {
  it('has a colour for every status the API knows', () => {
    for (const status of enrolmentStatuses) {
      const { container, unmount } = render(<EnrolmentStatusBadge status={status} />)
      expect(screen.getByText(status)).toBeInTheDocument()
      expect(container.firstChild.className).not.toMatch(/undefined/)
      unmount()
    }
  })

  it('marks only New with a dot', () => {
    const { container, rerender } = render(<EnrolmentStatusBadge status="New" />)
    expect(container.querySelectorAll('span span')).toHaveLength(1)
    rerender(<EnrolmentStatusBadge status="Enrolled" />)
    expect(container.querySelectorAll('span span')).toHaveLength(0)
  })
})
