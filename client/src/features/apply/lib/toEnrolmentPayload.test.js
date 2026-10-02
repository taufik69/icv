import { describe, expect, it } from 'vitest'
import { enrolmentValues } from '@/test/fixtures/enrolmentValues'
import { toEnrolmentPayload } from './toEnrolmentPayload'

describe('toEnrolmentPayload', () => {
  it('groups the form values the way the API expects', () => {
    const p = toEnrolmentPayload(enrolmentValues())
    expect(p.course).toEqual({ code: 'CPC30220', title: 'Certificate III in Carpentry', duration: '64 Weeks', applicationFee: '$500', tuitionFee: '$18,000', materialFee: '$500', manual: false, intakeYear: '2027' })
    expect(p.personal.passportNumber).toBe('N1234567')
    expect(p.contact.home).toEqual({ address: '12 MG Road', city: 'New Delhi', country: 'India', postcode: '110001' })
    expect(p.emergencyContact).toEqual({ name: 'Anita Sharma', relationship: 'Mother', number: '+91 98111 22334' })
    expect(p.marketing).toEqual({ heard: 'Agent', heardOther: '' })
    expect(p.agent).toEqual({ company: 'Global Education Services', name: 'Rahul Mehta', email: '', phone: '' })
    expect(p.declaration).toEqual({ agreed: true, signedDate: '2026-10-02' })
  })

  it('turns yes/no answers into booleans', () => {
    const p = toEnrolmentPayload(enrolmentValues({ creditTransfer: 'Yes (attach copies)', holdsVisa: 'Yes', visaType: 'Student', disability: 'Yes', disabilityTypes: ['Vision'] }))
    expect(p.education.creditTransfer).toBe(true)
    expect(p.visa).toMatchObject({ holds: true, type: 'Student' })
    expect(p.health.disability).toEqual({ has: true, types: ['Vision'], otherMedical: '' })
    expect(toEnrolmentPayload(enrolmentValues()).health.disability.has).toBe(false)
  })

  it('drops empty qualification and test rows', () => {
    const p = toEnrolmentPayload(enrolmentValues())
    expect(p.education.qualifications).toHaveLength(1)
    expect(p.education.englishTests).toEqual([])
  })

  it('blanks follow-up answers that no longer apply', () => {
    const p = toEnrolmentPayload(enrolmentValues({
      hasOshc: false, oshcProvider: 'Bupa', arrangeOshc: false, arrangeDuration: 'Other', arrangeDurationOther: '18 months',
      holdsVisa: 'No', visaType: 'Student', disability: 'No (skip to next step)', disabilityTypes: ['Hearing'], heard: 'Facebook', heardOther: 'old',
    }))
    expect(p.health.oshc).toEqual({ has: false, provider: '', membershipNumber: '', type: '', expiry: '' })
    expect(p.health.arrangeOshc).toEqual({ wanted: false, duration: '', durationOther: '', type: '' })
    expect(p.health.disability.types).toEqual([])
    expect(p.visa.type).toBe('')
    expect(p.marketing.heardOther).toBe('')
  })

  it('keeps "other duration" only when Other is chosen', () => {
    const base = { arrangeOshc: true, arrangeType: 'Single', arrangeDurationOther: '18 months' }
    expect(toEnrolmentPayload(enrolmentValues({ ...base, arrangeDuration: 'Other' })).health.arrangeOshc.durationOther).toBe('18 months')
    expect(toEnrolmentPayload(enrolmentValues({ ...base, arrangeDuration: '12 Months' })).health.arrangeOshc.durationOther).toBe('')
  })

  it('maps ticked documents to API keys, naming "Other"', () => {
    const p = toEnrolmentPayload(enrolmentValues({ attachments: ['Certified copy of Passport', 'Other', 'Copy of Visa (if applicable)'], attachmentOther: 'Work letter' }))
    expect(p.attachments).toEqual([{ key: 'passport', name: '' }, { key: 'other', name: 'Work letter' }, { key: 'visa', name: '' }])
  })

  it('reads the intake year out of the "Year – 2027" option', () => {
    expect(toEnrolmentPayload(enrolmentValues({ year: 'Year – 2026' })).course.intakeYear).toBe('2026')
    expect(toEnrolmentPayload(enrolmentValues({ year: '' })).course.intakeYear).toBe('')
  })
})
