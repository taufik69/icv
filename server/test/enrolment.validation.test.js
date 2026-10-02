import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { enrolmentBody } from '../src/modules/enrolment/enrolment.validation.js'
import { validData } from './fixtures.js'

// Paths of every issue zod reports, e.g. ['personal.dob'].
const problems = (data) => {
  const result = enrolmentBody.safeParse(data)
  return result.success ? [] : result.error.issues.map((i) => i.path.join('.'))
}
const withChange = (change) => {
  const d = validData()
  change(d)
  return d
}

describe('enrolment validation', () => {
  it('accepts a complete application', () => {
    assert.deepEqual(problems(validData()), [])
  })

  it('fills optional parts that are left out', () => {
    const d = validData()
    delete d.agent
    delete d.contact.australia
    delete d.attachments
    const parsed = enrolmentBody.parse({ ...d, marketing: { heard: 'Facebook' } })
    assert.equal(parsed.agent.company, '')
    assert.equal(parsed.contact.australia.state, '')
    assert.deepEqual(parsed.attachments, [])
  })

  it('requires the always-required fields', () => {
    const d = validData()
    d.personal.givenNames = ' '
    d.contact.mobile = ''
    d.emergencyContact.name = ''
    assert.deepEqual(problems(d).sort(), ['contact.mobile', 'emergencyContact.name', 'personal.givenNames'])
  })

  it('checks dates, email, enums and the declaration', () => {
    const d = withChange((x) => {
      x.personal.dob = '12/04/2001'
      x.contact.email = 'not-an-email'
      x.personal.title = 'Dr'
      x.declaration.agreed = false
      x.course.intakeYear = 'next year'
    })
    assert.deepEqual(problems(d).sort(), ['contact.email', 'course.intakeYear', 'declaration.agreed', 'personal.dob', 'personal.title'])
  })

  it('makes OSHC details required only when the student has OSHC', () => {
    assert.deepEqual(problems(withChange((x) => { x.health.oshc.has = true })).sort(), ['health.oshc.membershipNumber', 'health.oshc.provider'])
    assert.deepEqual(problems(withChange((x) => { x.health.oshc.provider = '' })), [])
  })

  it('asks for "other duration" only when ICV arranges OSHC for another length', () => {
    assert.deepEqual(problems(withChange((x) => { x.health.arrangeOshc.duration = 'Other' })), ['health.arrangeOshc.durationOther'])
    assert.deepEqual(problems(withChange((x) => { x.health.arrangeOshc = { wanted: false, duration: 'Other', durationOther: '', type: '' } })), [])
  })

  it('needs a disability type or description when the answer is yes', () => {
    assert.deepEqual(problems(withChange((x) => { x.health.disability.has = true })), ['health.disability.types'])
    assert.deepEqual(problems(withChange((x) => { x.health.disability = { has: true, types: ['Vision'], otherMedical: '' } })), [])
  })

  it('needs the visa type when the student holds a visa', () => {
    assert.deepEqual(problems(withChange((x) => { x.visa.holds = true })), ['visa.type'])
    assert.deepEqual(problems(withChange((x) => { x.visa.subclass = '5000' })), ['visa.subclass'])
  })

  it('needs agent company and name when the student heard through an agent', () => {
    assert.deepEqual(problems(withChange((x) => { x.agent = { company: '', name: '' } })).sort(), ['agent.company', 'agent.name'])
    assert.deepEqual(problems(withChange((x) => { x.marketing.heard = 'Events'; x.agent = {} })), [])
  })

  it('refuses unknown or repeated attachment keys', () => {
    assert.deepEqual(problems(withChange((x) => { x.attachments = [{ key: 'diploma' }] })), ['attachments.0.key'])
    assert.deepEqual(problems(withChange((x) => { x.attachments = [{ key: 'visa' }, { key: 'visa' }] })), ['attachments'])
  })
})
