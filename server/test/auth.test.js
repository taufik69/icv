import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import mongoose from 'mongoose'
import { createApp } from '../src/app.js'
import { env } from '../src/config/env.js'
import { hashOtp } from '../src/modules/auth/auth.crypto.js'
import { sendWithRetry } from '../src/modules/auth/auth.mailer.js'
import { User } from '../src/modules/auth/auth.model.js'
import { signIn, TEST_USER } from './signIn.js'

let server
let base
const post = (path, body, cookie) => fetch(`${base}/api/v1/auth/${path}`, { method: 'POST', headers: { 'content-type': 'application/json', ...(cookie && { cookie }) }, body: JSON.stringify(body) })
const json = async (res) => ({ status: res.status, body: res.status === 204 ? null : await res.json(), cookie: res.headers.get('set-cookie') })
// Sets a known code on the account (the real one is only emailed), as forgot-password would.
const plantCode = (code, expiresAt = new Date(Date.now() + 300_000)) =>
  User.updateOne({ email: TEST_USER.email }, { resetCode: { hash: hashOtp(TEST_USER.email, code), expiresAt, attempts: 0 } })

before(async () => {
  await mongoose.connect(env.MONGODB_URI, { dbName: 'icv_test', serverSelectionTimeoutMS: 10_000 })
  server = createApp().listen(0)
  base = `http://localhost:${server.address().port}`
})
after(async () => {
  await signIn.cleanUp()
  await mongoose.disconnect()
  server?.closeAllConnections()
  server?.close()
})

describe('sign in', () => {
  it('sets an httpOnly session cookie that opens staff routes', async () => {
    const cookie = await signIn(base)
    const me = await fetch(`${base}/api/v1/auth/me`, { headers: { cookie } })
    assert.equal((await me.json()).data.email, TEST_USER.email)
    const res = await json(await post('login', TEST_USER))
    assert.match(res.cookie, /icv_session=.+; Max-Age=604800; Path=\/;.*HttpOnly; SameSite=Lax/)
    assert.equal(res.body.data.passwordHash, undefined)
  })

  it('gives one message for a wrong password and an unknown email', async () => {
    const wrong = await json(await post('login', { email: TEST_USER.email, password: 'wrong-password' }))
    const unknown = await json(await post('login', { email: 'nobody@example.com', password: 'whatever-1' }))
    assert.equal(wrong.status, 401)
    assert.deepEqual(wrong.body, unknown.body)
  })

  it('locks the account for 15 minutes after 5 wrong passwords', async () => {
    await signIn(base)
    for (let i = 0; i < 5; i++) await post('login', { email: TEST_USER.email, password: 'wrong-password' })
    const locked = await json(await post('login', TEST_USER))
    assert.equal(locked.status, 429)
    assert.match(locked.body.error.message, /Try again in 15 minutes/)
  })

  it('signs out by clearing the cookie', async () => {
    const res = await json(await post('logout', {}))
    assert.equal(res.status, 204)
    assert.match(res.cookie, /icv_session=;/)
  })
})

describe('forgot password', () => {
  it('answers the same for any email, and keeps one live code at a time', async () => {
    await signIn(base)
    const known = await json(await post('forgot-password', { email: TEST_USER.email }))
    const unknown = await json(await post('forgot-password', { email: 'nobody@example.com' }))
    assert.equal(known.status, 202)
    assert.equal(known.body.data.message, unknown.body.data.message)
    const expires = new Date(known.body.data.expiresAt) - Date.now()
    assert.ok(expires > 295_000 && expires <= 300_000, 'code lives 5 minutes')
    const again = await json(await post('forgot-password', { email: TEST_USER.email }))
    assert.equal(again.body.data.expiresAt, known.body.data.expiresAt) // no second email while the first works
  })

  it('counts down wrong codes, then cancels the code', async () => {
    await plantCode('123456')
    const first = await json(await post('verify-code', { email: TEST_USER.email, code: '000000' }))
    assert.match(first.body.error.message, /4 tries left/)
    for (let i = 0; i < 3; i++) await post('verify-code', { email: TEST_USER.email, code: '000000' })
    const last = await json(await post('verify-code', { email: TEST_USER.email, code: '000000' }))
    assert.match(last.body.error.message, /Too many wrong codes/)
    const right = await json(await post('verify-code', { email: TEST_USER.email, code: '123456' }))
    assert.match(right.body.error.message, /expired or was already used/)
  })

  it('refuses an expired code', async () => {
    await plantCode('123456', new Date(Date.now() - 1000))
    const res = await json(await post('verify-code', { email: TEST_USER.email, code: '123456' }))
    assert.equal(res.status, 400)
  })

  it('resets the password once, ending older sessions', async () => {
    const oldCookie = await signIn(base)
    await plantCode('654321')
    const { body } = await json(await post('verify-code', { email: TEST_USER.email, code: '654321' }))
    const reset = await json(await post('reset-password', { resetToken: body.data.resetToken, password: 'Brand-New-Pass-1' }))
    assert.equal(reset.status, 200)
    assert.equal((await fetch(`${base}/api/v1/auth/me`, { headers: { cookie: oldCookie } })).status, 401)
    assert.equal((await post('login', { email: TEST_USER.email, password: 'Brand-New-Pass-1' })).status, 200)
    const reuse = await json(await post('reset-password', { resetToken: body.data.resetToken, password: 'Third-Pass-1234' }))
    assert.equal(reuse.status, 400)
  })
})

describe('background mail', () => {
  const quiet = { warn: () => {}, error: () => {} }

  it('retries a failed send 3 times, then gives up', async () => {
    let calls = 0
    const ok = await sendWithRetry({ to: 'a@example.com' }, { send: async () => { calls++; throw new Error('SMTP down') }, backoff: 1, log: quiet })
    assert.equal(ok, false)
    assert.equal(calls, 4) // first try + 3 retries
  })

  it('stops as soon as a send works', async () => {
    let calls = 0
    const ok = await sendWithRetry({ to: 'a@example.com' }, { send: async () => { if (++calls < 3) throw new Error('busy') }, backoff: 1, log: quiet })
    assert.equal(ok, true)
    assert.equal(calls, 3)
  })
})
