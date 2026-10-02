import { describe, expect, it } from 'vitest'
import { titleCase } from './titleCase'

describe('titleCase', () => {
  it('turns all-caps headings into title case', () => {
    expect(titleCase('SCHOLARSHIP AVAILABLE FOR INTERNATIONAL STUDENTS')).toBe('Scholarship Available For International Students')
    expect(titleCase('LAUNCH YOUR CAREER TO A NEW LEVEL!')).toBe('Launch Your Career To A New Level!')
    expect(titleCase('ENQUIRE NOW')).toBe('Enquire Now')
  })

  it('keeps known abbreviations and punctuation', () => {
    expect(titleCase('STUDY AT ICV, 0* TUITION')).toBe('Study At ICV, 0* Tuition')
  })
})
