import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import mongoose from 'mongoose'
import { env } from '../src/config/env.js'
import { Application } from '../src/modules/application/application.model.js'
import { Enrolment } from '../src/modules/enrolment/enrolment.model.js'
import { overview } from '../src/modules/stats/stats.service.js'
import { bucketKeys, timeline } from '../src/modules/stats/stats.timeline.js'
import { validData } from './fixtures.js'

const NOW = new Date('2026-10-02T02:00:00Z') // noon in Melbourne
const daysAgo = (n) => new Date(NOW.getTime() - n * 86_400_000)
const file = { id: 'aaaaaaaaaaaa.png', name: 's.png', mimeType: 'image/png', size: 1 }

describe('stats timeline', () => {
  it('lists every day of the period in the Melbourne calendar', () => {
    const keys = bucketKeys(daysAgo(7), NOW, false)
    assert.equal(keys.length, 8)
    assert.equal(keys[0], '2026-09-25')
    assert.equal(keys.at(-1), '2026-10-02')
  })

  it('lists months for a year, without gaps or repeats', () => {
    const keys = bucketKeys(daysAgo(365), NOW, true)
    assert.equal(keys[0], '2025-10')
    assert.equal(keys.at(-1), '2026-10')
    assert.equal(new Set(keys).size, keys.length)
    assert.equal(keys.length, 13)
  })

  it('fills buckets with no rows as 0', () => {
    const rows = timeline(['2026-10-01', '2026-10-02'], { enrolments: [{ _id: '2026-10-02', count: 3 }], applications: [] })
    assert.deepEqual(rows, [{ date: '2026-10-01', enrolments: 0, applications: 0 }, { date: '2026-10-02', enrolments: 3, applications: 0 }])
  })
})

describe('stats overview (icv_test database)', () => {
  const enrolment = (at, over) => {
    const d = validData()
    return { ...d, status: 'New', ...over, reference: `ENR-2026-T${Math.random().toString(36).slice(2, 7).toUpperCase()}`, agent: { ...d.agent, stamp: null }, attachments: [], declaration: { ...d.declaration, signature: file }, createdAt: at, updatedAt: at }
  }
  const application = (at, studentType, status = 'New') => ({ studentType, firstName: 'Test', lastName: 'Person', email: 't@example.com', status, createdAt: at, updatedAt: at })

  before(async () => {
    await mongoose.connect(env.MONGODB_URI, { dbName: 'icv_test', serverSelectionTimeoutMS: 10_000 })
    await Promise.all([Enrolment.deleteMany({}), Application.deleteMany({})])
    const base = validData()
    await Enrolment.collection.insertMany([
      enrolment(daysAgo(1)), enrolment(daysAgo(2), { status: 'Enrolled', personal: { ...base.personal, nationality: 'Nepali' } }),
      enrolment(daysAgo(40)), // previous 30-day period
    ])
    await Application.collection.insertMany([application(daysAgo(3), 'Domestic'), application(daysAgo(3), 'International', 'Closed')])
  })

  after(async () => {
    await Promise.all([Enrolment.deleteMany({}), Application.deleteMany({})]).catch(() => {})
    await mongoose.disconnect()
  })

  it('counts this period against the one before', async () => {
    const { totals } = await overview(30, NOW)
    assert.deepEqual(totals.enrolments, { current: 2, previous: 1 })
    assert.deepEqual(totals.applications, { current: 2, previous: 0 })
    assert.deepEqual(totals.waiting, { enrolments: 2, applications: 1 }) // all-time New
  })

  it('puts each submission on its day, with every day present', async () => {
    const { timeline: days, range } = await overview(30, NOW)
    assert.equal(range.grouping, 'day')
    assert.equal(days.length, 31)
    assert.deepEqual(days.find((d) => d.date === '2026-09-29'), { date: '2026-09-29', enrolments: 0, applications: 2 })
    assert.equal(days.reduce((n, d) => n + d.enrolments, 0), 2)
  })

  it('breaks enrolments down by status, course, nationality and source', async () => {
    const s = await overview(30, NOW)
    assert.deepEqual(s.enrolmentStatus, { New: 2, Enrolled: 1 })
    assert.deepEqual(s.topCourses, [{ code: 'CPC30220', label: 'Certificate III in Carpentry', count: 2 }])
    assert.deepEqual(s.nationalities, [{ label: 'Indian', count: 1 }, { label: 'Nepali', count: 1 }])
    assert.deepEqual(s.heard, [{ label: 'Agent', count: 2 }])
    assert.deepEqual(s.studentTypes, { Domestic: 1, International: 1 })
  })

  it('lists recent activity newest first, across both kinds', async () => {
    const { recent } = await overview(30, NOW)
    assert.deepEqual(recent.map((r) => r.kind), ['enrolment', 'enrolment', 'application', 'application', 'enrolment'])
    assert.equal(recent[0].name, 'Priya Sharma')
  })
})
