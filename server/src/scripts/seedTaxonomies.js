// Creates the default study areas and levels (the values courses used before they became editable).
// Existing items (same type + key) are left alone. Usage: npm run seed:taxonomies
import { connectDb, disconnectDb } from '../config/db.js'
import { Taxonomy } from '../modules/taxonomy/taxonomy.model.js'

const defaults = [
  ...[
    ['building', 'Building and construction', 'hammer'],
    ['whiteCard', 'White card', 'badge'],
    ['ecec', 'Early childhood', 'smile'],
    ['community', 'Community services', 'heart'],
    ['management', 'Management', 'briefcase'],
  ].map(([key, label, icon], order) => ({ type: 'study-areas', key, label, icon, order })),
  ...['Short course', 'Certificate III', 'Certificate IV', 'Diploma', 'Graduate Diploma'].map((label, order) => ({ type: 'levels', key: label, label, order })),
]

await connectDb()
let created = 0
for (const item of defaults) {
  const res = await Taxonomy.updateOne({ type: item.type, key: item.key }, { $setOnInsert: item }, { upsert: true })
  created += res.upsertedCount
}
console.log(`Taxonomies: ${created} created, ${defaults.length - created} already there.`)
await disconnectDb()
