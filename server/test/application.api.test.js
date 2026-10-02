import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import mongoose from 'mongoose'
import { createApp } from '../src/app.js'
import { env } from '../src/config/env.js'
import { Application } from '../src/modules/application/application.model.js'
import { signIn } from './signIn.js'

// The website's enquiry form → POST /applications (public), and the staff routes ("Enquiries" in the
// dashboard). Real HTTP against the "icv_test" database.
let server
let base
let cookie
const send = async (path, { method = 'GET', body, auth = true } = {}) => {
  const res = await fetch(`${base}/api/v1/applications${path}`, {
    method,
    headers: { ...(body && { 'content-type': 'application/json' }), ...(auth && { cookie }) },
    body: body && JSON.stringify(body),
  })
  return { status: res.status, body: res.status === 204 ? null : await res.json() }
}
const enquiry = (over = {}) => ({ studentType: 'International', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', ...over })

// Every course the enquiry form offers (client/src/features/apply/data/applyOptions.js).
const FORM_COURSES = ['CHC30121', 'CHC50121', 'CHC43115', 'CHC43015', 'CPC30220', 'CPC40120', 'CPC50220', 'CPCCWHS1001', 'CPC32320', 'BSB80120']

before(async () => {
  await mongoose.connect(env.MONGODB_URI, { dbName: 'icv_test', serverSelectionTimeoutMS: 10_000 })
  await Application.deleteMany({})
  server = createApp().listen(0)
  base = `http://localhost:${server.address().port}`
  cookie = await signIn(base)
})

after(async () => {
  await Application.deleteMany({}).catch(() => {})
  await signIn.cleanUp()
  await mongoose.disconnect()
  server?.closeAllConnections()
  server?.close()
})

describe('POST /applications (the enquiry form)', () => {
  it('accepts a full enquiry, as the five-step form sends it', async () => {
    const full = enquiry({ phone: '+61 400 111 222', dob: '2001-04-12', street: '12 MG Road', city: 'New Delhi', state: 'Delhi', postcode: '110001', country: 'India', course: 'CPC40120', message: 'When is the next intake?', heard: 'Agent' })
    const res = await send('', { method: 'POST', body: full, auth: false })
    assert.equal(res.status, 201)
    assert.equal(res.body.data.status, 'New')
    assert.equal(res.body.data.course, 'CPC40120')
    assert.equal(res.body.data.email, 'jane.smith@example.com')
  })

  it('accepts just the required fields, filling the rest with blanks', async () => {
    const res = await send('', { method: 'POST', body: enquiry({ studentType: 'Domestic' }), auth: false })
    assert.equal(res.status, 201)
    assert.equal(res.body.data.course, '')
    assert.equal(res.body.data.phone, '')
  })

  it('accepts every course code the form offers', async () => {
    for (const course of FORM_COURSES) {
      const res = await send('', { method: 'POST', body: enquiry({ course, email: `${course.toLowerCase()}@example.com` }), auth: false })
      assert.equal(res.status, 201, course)
    }
  })

  it('names the fields that are missing or wrong', async () => {
    const res = await send('', { method: 'POST', body: { studentType: 'Martian', firstName: ' ', email: 'not-an-email' }, auth: false })
    assert.equal(res.status, 400)
    assert.deepEqual(Object.keys(res.body.error.details).sort(), ['email', 'firstName', 'lastName', 'studentType'])
  })
})

describe('staff routes (Enquiries in the dashboard)', () => {
  it('need a signed-in session', async () => {
    assert.equal((await send('', { auth: false })).status, 401)
    assert.equal((await send('/counts', { auth: false })).status, 401)
  })

  it('list newest first, search and count by status', async () => {
    const list = await send('?q=cpc32320')
    assert.equal(list.status, 200)
    assert.equal(list.body.data.length, 1)
    assert.equal(list.body.data[0].course, 'CPC32320')
    assert.equal((await send('/counts')).body.data.New, 2 + FORM_COURSES.length)
  })

  it('change the status and delete', async () => {
    const [first] = (await send('?q=jane.smith')).body.data
    const updated = await send(`/${first.id}`, { method: 'PATCH', body: { status: 'Contacted' } })
    assert.equal(updated.body.data.status, 'Contacted')
    assert.equal((await send(`/${first.id}`, { method: 'PATCH', body: { status: 'Lost' } })).status, 400)
    assert.equal((await send(`/${first.id}`, { method: 'DELETE' })).status, 204)
    assert.equal((await send(`/${first.id}`)).status, 404)
  })
})
