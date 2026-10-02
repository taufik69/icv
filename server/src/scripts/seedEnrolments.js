// Seeds demo international enrolments, with their uploaded files (signature, agent's stamp, passport
// scan, test results…), so the dashboard has something to show. Skips if any enrolments exist
// (pass --force to replace them and their files).
// Usage: npm run seed:enrolments [-- --force]
import { randomInt } from 'node:crypto'
import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import { Types } from 'mongoose'
import { connectDb, disconnectDb } from '../config/db.js'
import { ATTACHMENT_TYPES, STORAGE_ROOT } from '../modules/enrolment/enrolment.constants.js'
import { Enrolment } from '../modules/enrolment/enrolment.model.js'
import { demoEnrolments } from './seed/enrolmentDemo.js'
import { passportJpg, saveDemoFile, signaturePng, stampPng, textPdf } from './seed/enrolmentFiles.js'

const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const reference = (at) => `ENR-${at.slice(0, 4)}-${Array.from({ length: 6 }, () => LETTERS[randomInt(LETTERS.length)]).join('')}`
const demoPdf = (title, lines) => textPdf([title, 'DEMO DATA - not a real document', '', ...lines])

// One document's demo file(s), by checklist key.
function documentFiles(d) {
  const { personal: p, education: e, visa, health } = d
  const name = `${p.givenNames} ${p.lastName}`
  const test = e.englishTests[0]
  return {
    passport: () => [[`passport-${p.lastName.toLowerCase()}.jpg`, 'image/jpeg', passportJpg(p)]],
    english: () => [['english-test-result.pdf', 'application/pdf', demoPdf(`${test.test} - Test Report Form`, [
      `Candidate: ${name}`, `Test date: ${test.date}`, `Listening ${test.listening}   Reading ${test.reading}   Writing ${test.writing}   Speaking ${test.speaking}`, `Overall: ${test.overall}`])]],
    year11: () => [['year-12-certificate.pdf', 'application/pdf', demoPdf(e.qualifications.at(-1).qualification, [`Awarded to: ${name}`, `Year: ${e.qualifications.at(-1).year}`, `Country: ${e.qualifications.at(-1).country}`])]],
    visa: () => [['visa-grant-notice.pdf', 'application/pdf', demoPdf('Visa Grant Notice', [`Holder: ${name}`, `Visa: ${visa.type} (subclass ${visa.subclass})`, `Expiry: ${visa.expiry}`])]],
    oshc: () => [['oshc-certificate.pdf', 'application/pdf', demoPdf('Overseas Student Health Cover - Certificate', [`Member: ${name}`, `Provider: ${health.oshc.provider}`, `Membership: ${health.oshc.membershipNumber}`, `Cover: ${health.oshc.type}, until ${health.oshc.expiry}`])]],
    rpl: () => [['work-experience-letter.pdf', 'application/pdf', demoPdf('Statement of Work Experience', [`This confirms ${name} worked full time in the field for 3 years.`])]],
  }
}

async function build({ at, docs, ...data }) {
  const _id = new Types.ObjectId()
  const save = async ([name, type, buffer]) => saveDemoFile(_id, name, type, await buffer)
  const files = documentFiles(data)
  const attachments = []
  for (const key of docs) {
    attachments.push({ key, label: ATTACHMENT_TYPES.find((t) => t.key === key).label, name: '', files: await Promise.all(files[key]().map(save)) })
  }
  const signature = await save(['signature.png', 'image/png', signaturePng(`${data.personal.givenNames} ${data.personal.lastName}`)])
  const stamp = data.agent.company ? await save(['agent-stamp.png', 'image/png', stampPng(data.agent.company)]) : null
  const when = new Date(at)
  const doc = new Enrolment({ _id, ...data, reference: reference(at), agent: { ...data.agent, stamp }, attachments, declaration: { ...data.declaration, signature } })
  await doc.validate()
  return { ...doc.toObject(), createdAt: when, updatedAt: when }
}

await connectDb()
const existing = await Enrolment.find({}, '_id').lean()
if (existing.length && !process.argv.includes('--force')) {
  console.log(`Skipped: ${existing.length} enrolments already exist (use --force to replace them and their files).`)
} else {
  if (existing.length) {
    await Enrolment.deleteMany({})
    await Promise.all(existing.map((e) => rm(join(STORAGE_ROOT, String(e._id)), { recursive: true, force: true })))
  }
  const docs = []
  for (const demo of demoEnrolments) docs.push(await build(demo))
  // Raw insert so the demo createdAt dates are kept instead of "now".
  await Enrolment.collection.insertMany(docs)
  const files = docs.reduce((n, d) => n + d.attachments.reduce((m, a) => m + a.files.length, 0) + 1 + (d.agent.stamp ? 1 : 0), 0)
  console.log(`Seeded ${docs.length} enrolments with ${files} files (storage/enrolments/).`)
}
await disconnectDb()
