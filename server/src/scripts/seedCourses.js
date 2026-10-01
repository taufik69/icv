// Imports every course page from the client data files into MongoDB. Existing courses (same market + slug)
// are skipped so dashboard edits survive; pass --force to overwrite them from the files.
// Photos are copied from client/public into server/public/uploads/courses and stored as server URLs.
// Usage: npm run seed:courses [-- --force]
import { connectDb, disconnectDb } from '../config/db.js'
import { Course } from '../modules/course/course.model.js'
import { copyCourseImages } from './seed/copyImages.js'
import { loadClientCourses } from './seed/loadClientCourses.js'
import { toCourseDoc } from './seed/toCourseDoc.js'

const force = process.argv.includes('--force')
const { modules, cards } = await loadClientCourses()

await connectDb()
await Course.syncIndexes()
const tally = { created: 0, replaced: 0, skipped: 0, failed: 0 }

for (const mod of modules) {
  const doc = toCourseDoc(mod, cards[`${mod.market}/${mod.slug}`])
  const id = `${doc.market}/${doc.slug}`
  const existing = await Course.findOne({ market: doc.market, slug: doc.slug })
  if (existing && !force) {
    tally.skipped++
    continue
  }
  try {
    doc.images = await copyCourseImages(doc.images)
    if (existing) {
      existing.overwrite({ ...doc, publishedAt: existing.publishedAt })
      await existing.save()
      tally.replaced++
    } else {
      await Course.create(doc)
      tally.created++
    }
    const dropped = Object.keys(doc).filter((k) => !Course.schema.path(k) && !Course.schema.nested[k])
    if (dropped.length) console.warn(`  ${id}: fields not in the schema, not saved: ${dropped.join(', ')}`)
  } catch (err) {
    tally.failed++
    console.error(`  ${id}: ${err.message}`)
  }
}

console.log(`Courses: ${tally.created} created, ${tally.replaced} replaced, ${tally.skipped} skipped, ${tally.failed} failed.`)
await disconnectDb()
