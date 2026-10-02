import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { enrolmentSteps } from '../../data/enrolment/enrolmentSteps'
import { StepFooter } from './StepFooter'

const form = (over = {}) => ({ step: 7, steps: enrolmentSteps, isLast: true, back: () => {}, errors: {}, sending: false, sendError: null, ...over })

describe('StepFooter', () => {
  it('shows Save and continue with the next step on earlier steps', () => {
    render(<StepFooter form={form({ step: 2, isLast: false })} />)
    expect(screen.getByRole('button', { name: /Save and continue/ })).toBeEnabled()
    expect(screen.getByText('Next: Health cover')).toBeInTheDocument()
  })

  it('shows Submit application on the last step, and Sending… while it posts', () => {
    const { rerender } = render(<StepFooter form={form()} />)
    expect(screen.getByRole('button', { name: 'Submit application' })).toBeEnabled()
    rerender(<StepFooter form={form({ sending: true })} />)
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled()
  })

  it('explains a failed send, and that the answers are kept', () => {
    render(<StepFooter form={form({ sendError: Object.assign(new Error('Invalid body'), { status: 400 }) })} />)
    expect(screen.getByRole('alert')).toHaveTextContent('could not be sent: Invalid body')
    expect(screen.getByRole('alert')).toHaveTextContent('still saved on this device')
  })

  it('blames the connection when the API cannot be reached', () => {
    render(<StepFooter form={form({ sendError: new TypeError('Failed to fetch') })} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Check your connection')
  })

  it('counts fields that need attention instead, when there are any', () => {
    render(<StepFooter form={form({ errors: { dob: 'x', email: 'y' }, sendError: new Error('Invalid body') })} />)
    expect(screen.getByRole('alert')).toHaveTextContent('2 fields need attention')
  })
})
