import { describe, expect, it } from 'vitest'
import { enrolmentValues } from '@/test/fixtures/enrolmentValues'
import { buildEnrolmentFormData } from './buildEnrolmentFormData'
import { dataUrlToBlob } from './dataUrlToBlob'

const pdf = (name) => new File(['%PDF-1.4'], name, { type: 'application/pdf' })

describe('dataUrlToBlob', () => {
  it('decodes a base64 data URL with its type', async () => {
    const blob = dataUrlToBlob('data:image/png;base64,aGVsbG8=')
    expect(blob.type).toBe('image/png')
    expect(await blob.text()).toBe('hello')
  })
})

describe('buildEnrolmentFormData', () => {
  it('sends the answers as JSON in "data"', () => {
    const body = buildEnrolmentFormData(enrolmentValues())
    expect(JSON.parse(body.get('data')).personal.givenNames).toBe('Priya')
  })

  it('attaches the signature, and the stamp only when there is one', () => {
    const plain = buildEnrolmentFormData(enrolmentValues())
    expect(plain.get('signature').type).toBe('image/png')
    expect(plain.get('signature').name).toBe('signature.png')
    expect(plain.has('agentStamp')).toBe(false)
    const stamped = buildEnrolmentFormData(enrolmentValues({ agentStamp: 'data:image/jpeg;base64,/9j/' }))
    expect(stamped.get('agentStamp').name).toBe('agent-stamp.jpg')
  })

  it('sends files only for ticked documents, under attachment_<key>', () => {
    const files = { 'Certified copy of Passport': [pdf('p1.pdf'), pdf('p2.pdf')], 'Copy of Visa (if applicable)': [pdf('visa.pdf')], Other: [pdf('letter.pdf')] }
    const body = buildEnrolmentFormData(enrolmentValues({ attachments: ['Certified copy of Passport', 'Other'] }), files)
    expect(body.getAll('attachment_passport').map((f) => f.name)).toEqual(['p1.pdf', 'p2.pdf'])
    expect(body.getAll('attachment_other').map((f) => f.name)).toEqual(['letter.pdf'])
    expect(body.has('attachment_visa')).toBe(false)
  })
})
