import { describe, expect, it } from 'vitest'
import { isWebAddress, URL_MESSAGE, validateCourseForm } from './validateCourseForm'

const ok = { title: 'Certificate III in Carpentry', code: 'CPC30220', market: 'domestic', studyArea: 'building', level: 'cert-iii', externalUrl: '' }

describe('validateCourseForm', () => {
  it('passes a complete course, with or without an external page', () => {
    expect(validateCourseForm(ok)).toEqual({})
    expect(validateCourseForm({ ...ok, externalUrl: 'https://icv.edu.au/courses/x/' })).toEqual({})
  })

  it('names every missing required field', () => {
    expect(Object.keys(validateCourseForm({ title: ' ' }))).toEqual(['title', 'code', 'market', 'studyArea', 'level'])
  })

  it('refuses an external page that is not a web address (the "Invalid URL" save error)', () => {
    expect(validateCourseForm({ ...ok, externalUrl: 'Dolor lorem natus do' })).toEqual({ externalUrl: URL_MESSAGE })
    expect(validateCourseForm({ ...ok, externalUrl: 'icv.edu.au/page' }).externalUrl).toBe(URL_MESSAGE)
  })

  it('checks the course guide link the same way', () => {
    expect(validateCourseForm({ ...ok, detail: { guideUrl: 'javascript:alert(1)' } })).toEqual({ 'detail.guideUrl': URL_MESSAGE })
    expect(validateCourseForm({ ...ok, detail: { guideUrl: 'https://icv.edu.au/guide.pdf' } })).toEqual({})
  })

  it('accepts only http and https addresses', () => {
    expect(isWebAddress('http://icv.edu.au')).toBe(true)
    expect(isWebAddress('javascript:alert(1)')).toBe(false)
    expect(isWebAddress('mailto:info@icv.edu.au')).toBe(false)
  })

  it('caps the card summary at 300 characters', () => {
    expect(validateCourseForm({ ...ok, summary: 'x'.repeat(301) }).summary).toMatch(/300/)
  })
})
