// Seeds demo applications so the dashboard has something to show. Skips if any exist (pass --force to replace).
// Usage: npm run seed:applications [-- --force]
import { connectDb, disconnectDb } from '../config/db.js'
import { Application } from '../modules/application/application.model.js'

const row = (receivedAt, studentType, name, email, phone, course, heard, status, extra = {}) => {
  const [firstName, lastName] = name.split(' ')
  const at = new Date(receivedAt)
  return { studentType, firstName, lastName, email, phone, course, heard, status, dob: '', street: '', city: '', state: '', postcode: '', country: '', message: '', ...extra, createdAt: at, updatedAt: at }
}

const demo = [
  row('2026-09-28T09:14', 'Domestic', 'Mia Nguyen', 'mia.nguyen@gmail.com', '0412 558 203', 'CHC43015', 'Google', 'New', {
    dob: '1994-03-11', street: '18 Rosslyn St', city: 'West Melbourne', state: 'VIC', postcode: '3003', country: 'Australia',
    message: 'I work part-time in aged care and want to move into a team leader role. Are evening classes available?',
  }),
  row('2026-09-27T16:40', 'International', 'Arjun Mehta', 'arjun.mehta@outlook.com', '+91 98200 44121', 'CPC30220', 'Agent', 'New', {
    city: 'Pune', country: 'India', message: 'My agent is Global Pathways. When is the next intake for carpentry?',
  }),
  row('2026-09-27T11:05', 'Domestic', 'Liam Walsh', 'liam.walsh@icloud.com', '0433 190 876', 'CPC40120', 'Word of Mouth', 'Contacted', {
    dob: '1988-07-02', street: '4/90 Mt Alexander Rd', city: 'Flemington', state: 'VIC', postcode: '3031', country: 'Australia',
    message: 'Carpenter with 10 years on site. Interested in RPL toward the Cert IV.',
  }),
  row('2026-09-26T13:22', 'Domestic', 'Sofia Rossi', 'sofia.rossi@gmail.com', '0401 772 610', 'CHC30121', 'Instagram', 'Contacted'),
  row('2026-09-25T10:48', 'International', 'Kenji Watanabe', 'kenji.w@yahoo.co.jp', '+81 90 3321 7788', 'CPC50220', 'Google', 'Enrolled', { city: 'Osaka', country: 'Japan' }),
  row('2026-09-24T15:31', 'Domestic', 'Chloe Martin', 'chloe.martin@gmail.com', '0422 318 045', 'CPCCWHS1001', 'Facebook', 'Enrolled', {
    message: 'Need my White Card before starting a labouring job next month.',
  }),
  row('2026-09-23T09:02', 'Domestic', 'Daniel Okafor', 'd.okafor@hotmail.com', '0450 661 902', 'CHC50121', 'Google', 'New'),
  row('2026-09-22T17:18', 'International', 'Maria Santos', 'maria.santos@gmail.com', '+63 917 555 0142', 'CHC43015', 'Study Cairns/Gold Coast Website', 'Closed', {
    city: 'Manila', country: 'Philippines', message: 'Is this course available for student visa holders?',
  }),
  row('2026-09-21T12:40', 'Domestic', 'Hannah Lee', 'hannah.lee@gmail.com', '0409 214 377', 'CHC43115', 'Other', 'Contacted'),
  row('2026-09-20T08:55', 'Domestic', 'Tom Fraser', 'tom.fraser@bigpond.com', '0418 402 959', 'CPC40120', 'Google', 'Closed'),
]

await connectDb()
const existing = await Application.countDocuments()
if (existing && !process.argv.includes('--force')) {
  console.log(`Skipped: ${existing} applications already exist (use --force to replace).`)
} else {
  if (existing) await Application.deleteMany({})
  // Raw insert so the demo createdAt dates are kept instead of "now".
  await Application.collection.insertMany(demo)
  console.log(`Seeded ${demo.length} applications.`)
}
await disconnectDb()
