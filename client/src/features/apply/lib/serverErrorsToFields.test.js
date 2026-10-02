import { describe, expect, it } from 'vitest'
import { serverErrorsToFields } from './serverErrorsToFields'

describe('serverErrorsToFields', () => {
  it('puts API paths back on form fields as sentences', () => {
    const { errors } = serverErrorsToFields({ 'personal.dob': ['use YYYY-MM-DD'], 'contact.home.city': ['required'] })
    expect(errors).toEqual({ dob: 'Use YYYY-MM-DD.', homeCity: 'Required.' })
  })

  it('opens the earliest step that has an error', () => {
    expect(serverErrorsToFields({ 'visa.type': ['required'], 'personal.dob': ['x'] }).step).toBe(1)
    expect(serverErrorsToFields({ signature: ['upload an image of the signature'] }).step).toBe(7)
  })

  it('maps nested rows and file fields to their list field', () => {
    const { errors } = serverErrorsToFields({ 'education.englishTests.0.date': ['use YYYY-MM-DD'], attachment_visa: ['add it to "attachments" too'] })
    expect(errors).toEqual({ englishTests: 'Use YYYY-MM-DD.', attachments: 'Add it to "attachments" too.' })
  })

  it('ignores paths with no field, and missing details', () => {
    expect(serverErrorsToFields({ body: ['bad'] })).toEqual({ errors: {}, step: -1 })
    expect(serverErrorsToFields(undefined)).toEqual({ errors: {}, step: -1 })
  })
})
