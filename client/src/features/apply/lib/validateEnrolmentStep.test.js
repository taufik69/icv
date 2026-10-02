import { describe, expect, it } from 'vitest'
import { enrolmentValues } from '@/test/fixtures/enrolmentValues'
import { validateEnrolmentStep } from './validateEnrolmentStep'

const ids = ['course', 'personal', 'contact', 'health', 'education', 'visa', 'agent', 'declaration']

describe('validateEnrolmentStep', () => {
  it('passes every step of a finished form', () => {
    for (const id of ids) expect(validateEnrolmentStep(id, enrolmentValues()), id).toEqual({})
  })

  it('asks for the course title only when the course is typed in', () => {
    expect(validateEnrolmentStep('course', enrolmentValues({ courseManual: true, courseTitle: '' }))).toHaveProperty('courseTitle')
    expect(validateEnrolmentStep('course', enrolmentValues({ courseTitle: '' }))).toEqual({})
  })

  it('checks the email format', () => {
    expect(validateEnrolmentStep('contact', enrolmentValues({ email: 'nope' })).email).toMatch(/name@example.com/)
  })

  it('requires OSHC details when ticked', () => {
    expect(Object.keys(validateEnrolmentStep('health', enrolmentValues({ hasOshc: true }))).sort()).toEqual(['oshcMembership', 'oshcProvider'])
  })

  it('requires agent details only when heard through an agent', () => {
    expect(Object.keys(validateEnrolmentStep('agent', enrolmentValues({ agentCompany: '', agentName: '' }))).sort()).toEqual(['agentCompany', 'agentName'])
    expect(validateEnrolmentStep('agent', enrolmentValues({ heard: 'Events', agentCompany: '' }))).toEqual({})
  })

  it('requires the declaration, a signature image and the date', () => {
    const errors = validateEnrolmentStep('declaration', enrolmentValues({ declaration: false, signature: 'Priya Sharma', signedDate: '' }))
    expect(Object.keys(errors).sort()).toEqual(['declaration', 'signature', 'signedDate'])
  })
})
