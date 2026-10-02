import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { join } from 'node:path'
import { after, before, describe, it } from 'node:test'
import mongoose from 'mongoose'
import { createApp } from '../src/app.js'
import { env } from '../src/config/env.js'
import { STORAGE_ROOT } from '../src/modules/enrolment/enrolment.constants.js'
import { Enrolment } from '../src/modules/enrolment/enrolment.model.js'
import { signIn } from './signIn.js'
import { enrolmentForm, PDF, PNG, validData } from './fixtures.js'

// Real HTTP against the app, on a separate database ("icv_test", emptied before and after) so dev data is untouched.
let server
let base
let cookie // staff session for every route except the public submit
const call = async (path, init = {}) => {
  const res = await fetch(`${base}/api/v1/enrolments${path}`, { ...init, headers: { cookie, ...init.headers } })
  const type = res.headers.get('content-type') ?? ''
  return { status: res.status, headers: res.headers, body: type.includes('json') ? await res.json() : Buffer.from(await res.arrayBuffer()) }
}
const post = (form) => call('', { method: 'POST', body: form })
const json = (method, body) => ({ method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
const exists = (path) => access(path).then(() => true, () => false)

before(async () => {
  await mongoose.connect(env.MONGODB_URI, { dbName: 'icv_test', serverSelectionTimeoutMS: 10_000 })
  await Enrolment.deleteMany({})
  server = createApp().listen(0)
  base = `http://localhost:${server.address().port}`
  cookie = await signIn(base)
})

after(async () => {
  await Enrolment.deleteMany({}).catch(() => {})
  await signIn.cleanUp()
  await mongoose.disconnect()
  server?.closeAllConnections()
  server?.close()
})

describe('POST /enrolments', () => {
  it('rejects a submission without a signature', async () => {
    const res = await post(enrolmentForm(validData(), {}))
    assert.equal(res.status, 400)
    assert.deepEqual(res.body.error.details, { signature: ['upload an image of the signature'] })
  })

  it('reports invalid answers by their full path', async () => {
    const data = validData()
    data.personal.dob = '12/04/2001'
    const res = await post(enrolmentForm(data))
    assert.equal(res.status, 400)
    assert.deepEqual(res.body.error.details, { 'personal.dob': ['use YYYY-MM-DD'] })
  })

  it('reports follow-up rules (OSHC ticked, no provider)', async () => {
    const data = validData()
    data.health.oshc.has = true
    const res = await post(enrolmentForm(data))
    assert.deepEqual(Object.keys(res.body.error.details).sort(), ['health.oshc.membershipNumber', 'health.oshc.provider'])
  })

  it('refuses answers that are not JSON', async () => {
    const res = await post(enrolmentForm('{not json'))
    assert.equal(res.status, 400)
    assert.match(res.body.error.message, /JSON/)
  })

  it('refuses a file whose content does not match its type', async () => {
    const res = await post(enrolmentForm(validData(), { signature: [[PDF, 'signature.png', 'image/png']] }))
    assert.equal(res.status, 400)
    assert.match(res.body.error.message, /not a real PNG/)
  })

  it('refuses files for a document that is not ticked', async () => {
    const res = await post(enrolmentForm(validData(), { signature: [[PNG, 's.png', 'image/png']], attachment_visa: [[PDF, 'visa.pdf', 'application/pdf']] }))
    assert.equal(res.status, 400)
    assert.ok(res.body.error.details.attachment_visa)
  })

  it('refuses a file over 10 MB', async () => {
    const big = Buffer.concat([PDF, Buffer.alloc(10 * 1024 * 1024)])
    const res = await post(enrolmentForm(validData(), { signature: [[PNG, 's.png', 'image/png']], attachment_passport: [[big, 'passport.pdf', 'application/pdf']] }))
    assert.equal(res.status, 400)
    assert.match(res.body.error.message, /too large/)
  })
})

describe('an enrolment from submit to delete', () => {
  let created

  it('creates it and answers with a reference only', async () => {
    const res = await post(enrolmentForm(validData(), {
      signature: [[PNG, 'signature.png', 'image/png']],
      agentStamp: [[PNG, 'stamp.png', 'image/png']],
      attachment_passport: [[PDF, 'passport.pdf', 'application/pdf']],
    }))
    assert.equal(res.status, 201)
    created = res.body.data
    assert.match(created.reference, /^ENR-\d{4}-[A-Z2-9]{6}$/)
    assert.equal(created.status, 'New')
    assert.deepEqual(Object.keys(created).sort(), ['id', 'reference', 'status', 'submittedAt'])
  })

  it('lists it with search, status filter, paging and counts', async () => {
    const found = await call('?q=sharma&status=New&page=1&limit=10')
    assert.equal(found.status, 200)
    assert.equal(found.body.data.length, 1)
    assert.equal(found.body.data[0].reference, created.reference)
    assert.equal(found.body.data[0].personal.passportNumber, undefined) // list rows stay short
    assert.deepEqual(found.body.meta, { total: 1, page: 1, limit: 10, pages: 1, counts: { New: 1 } })
    assert.equal((await call('?q=nobody')).body.data.length, 0)
    assert.deepEqual((await call('/counts')).body.data, { New: 1 })
  })

  it('returns the full application with its documents', async () => {
    const { body } = await call(`/${created.id}`)
    const passport = body.data.attachments[0]
    assert.equal(passport.label, 'Certified copy of Passport')
    assert.equal(passport.files[0].name, 'passport.pdf')
    assert.equal(body.data.agent.stamp.name, 'stamp.png')
    assert.equal(body.data.declaration.signature.mimeType, 'image/png')
    assert.equal(body.data.files, undefined)
  })

  it('serves an uploaded file back, byte for byte', async () => {
    const { body } = await call(`/${created.id}`)
    const file = await call(`/${created.id}/files/${body.data.attachments[0].files[0].id}`)
    assert.equal(file.status, 200)
    assert.equal(file.headers.get('content-type'), 'application/pdf')
    assert.match(file.headers.get('content-disposition'), /inline; filename\*=UTF-8''passport\.pdf/)
    assert.deepEqual(file.body, PDF)
    assert.equal((await call(`/${created.id}/files/000000000000.pdf`)).status, 404)
  })

  it('updates status and staff note, refusing unknown statuses', async () => {
    const res = await call(`/${created.id}`, json('PATCH', { status: 'In review', staffNote: 'Passport checked' }))
    assert.equal(res.body.data.status, 'In review')
    assert.equal(res.body.data.staffNote, 'Passport checked')
    assert.equal((await call(`/${created.id}`, json('PATCH', { status: 'Done' }))).status, 400)
  })

  it('deletes it together with its files', async () => {
    assert.equal(await exists(join(STORAGE_ROOT, created.id)), true)
    assert.equal((await call(`/${created.id}`, { method: 'DELETE' })).status, 204)
    assert.equal(await exists(join(STORAGE_ROOT, created.id)), false)
    assert.equal((await call(`/${created.id}`)).status, 404)
  })

  it('refuses staff routes without a session', async () => {
    const res = await fetch(`${base}/api/v1/enrolments`)
    assert.equal(res.status, 401)
  })

  it('answers 400 for a malformed id', async () => {
    assert.equal((await call('/123')).status, 400)
  })
})
