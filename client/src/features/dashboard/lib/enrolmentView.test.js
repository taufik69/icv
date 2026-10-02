import { describe, expect, it } from 'vitest'
import { enrolmentDetail } from '@/test/fixtures/enrolmentDetail'
import { courseLine, documentSummary, enrolmentSections, fullName, initials } from './enrolmentView'

const rows = (item, id) => Object.fromEntries(enrolmentSections(item).find((s) => s.id === id).rows.map(([label, value]) => [label, value]))

describe('enrolmentView', () => {
  it('names the student and course', () => {
    const item = enrolmentDetail()
    expect(fullName(item)).toBe('Priya Sharma')
    expect(initials(item)).toBe('PS')
    expect(courseLine(item)).toBe('Certificate III in Carpentry (CPC30220), 2027 intake')
  })

  it('lists the sections in paper form order with their letters', () => {
    expect(enrolmentSections(enrolmentDetail()).map((s) => s.letters)).toEqual(['A', 'B', 'C D', 'E', 'H I', 'J K'])
  })

  it('joins addresses and leaves empty ones blank', () => {
    const contact = rows(enrolmentDetail(), 'contact')
    expect(contact['Address in home country']).toBe('12 MG Road, New Delhi, 110001, India')
    expect(contact['Address in Australia']).toBe('')
    expect(contact['Emergency contact']).toBe('Anita Sharma, Mother')
  })

  it('summarises health cover and hides details that do not apply', () => {
    const health = rows(enrolmentDetail(), 'health')
    expect(health['Has OSHC']).toBe('No')
    expect(health['ICV to arrange OSHC']).toBe('12 Months, Single')
    expect(health).not.toHaveProperty('Membership number')
    const covered = rows(enrolmentDetail({ health: { ...enrolmentDetail().health, oshc: { has: true, provider: 'Bupa', membershipNumber: 'M1', type: 'Single', expiry: '' } } }), 'health')
    expect(covered['Has OSHC']).toBe('Bupa, Single cover')
    expect(covered['Membership number']).toBe('M1')
  })

  it('describes the visa', () => {
    expect(rows(enrolmentDetail(), 'visa')['Holds an Australian visa']).toBe('No')
    const held = rows(enrolmentDetail({ visa: { holds: true, type: 'Student', subclass: '500', expiry: '2027-01-01', immigrationOffice: '', applicationDate: '' } }), 'visa')
    expect(held['Holds an Australian visa']).toBe('Student, subclass 500')
    expect(held['Visa expiry']).toMatch(/2027/)
  })

  it('counts ticked documents that have files', () => {
    expect(documentSummary(enrolmentDetail().attachments)).toEqual({ ticked: 2, withFiles: 1 })
    expect(documentSummary([])).toEqual({ ticked: 0, withFiles: 0 })
  })
})
