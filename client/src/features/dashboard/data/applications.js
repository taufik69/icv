// Demo applications for the dashboard UI, in the shape the website's apply form collects.
const app = (id, receivedAt, studentType, name, email, phone, course, heard, status, extra = {}) => {
  const [firstName, lastName] = name.split(' ')
  return { id, receivedAt, studentType, firstName, lastName, email, phone, course, heard, status, dob: '', street: '', city: '', state: '', postcode: '', country: '', message: '', ...extra }
}

export const applications = [
  app('a1042', '2026-09-28T09:14', 'Domestic', 'Mia Nguyen', 'mia.nguyen@gmail.com', '0412 558 203', 'CHC43015', 'Google', 'New', {
    dob: '1994-03-11', street: '18 Rosslyn St', city: 'West Melbourne', state: 'VIC', postcode: '3003', country: 'Australia',
    message: 'I work part-time in aged care and want to move into a team leader role. Are evening classes available?',
  }),
  app('a1041', '2026-09-27T16:40', 'International', 'Arjun Mehta', 'arjun.mehta@outlook.com', '+91 98200 44121', 'CPC30220', 'Agent', 'New', {
    city: 'Pune', country: 'India', message: 'My agent is Global Pathways. When is the next intake for carpentry?',
  }),
  app('a1040', '2026-09-27T11:05', 'Domestic', 'Liam Walsh', 'liam.walsh@icloud.com', '0433 190 876', 'CPC40120', 'Word of Mouth', 'Contacted', {
    dob: '1988-07-02', street: '4/90 Mt Alexander Rd', city: 'Flemington', state: 'VIC', postcode: '3031', country: 'Australia',
    message: 'Carpenter with 10 years on site. Interested in RPL toward the Cert IV.',
  }),
  app('a1039', '2026-09-26T13:22', 'Domestic', 'Sofia Rossi', 'sofia.rossi@gmail.com', '0401 772 610', 'CHC30121', 'Instagram', 'Contacted'),
  app('a1038', '2026-09-25T10:48', 'International', 'Kenji Watanabe', 'kenji.w@yahoo.co.jp', '+81 90 3321 7788', 'CPC50220', 'Google', 'Enrolled', { city: 'Osaka', country: 'Japan' }),
  app('a1037', '2026-09-24T15:31', 'Domestic', 'Chloe Martin', 'chloe.martin@gmail.com', '0422 318 045', 'CPCCWHS1001', 'Facebook', 'Enrolled', {
    message: 'Need my White Card before starting a labouring job next month.',
  }),
  app('a1036', '2026-09-23T09:02', 'Domestic', 'Daniel Okafor', 'd.okafor@hotmail.com', '0450 661 902', 'CHC50121', 'Google', 'New'),
  app('a1035', '2026-09-22T17:18', 'International', 'Maria Santos', 'maria.santos@gmail.com', '+63 917 555 0142', 'CHC43015', 'Study Cairns/Gold Coast Website', 'Closed', {
    city: 'Manila', country: 'Philippines', message: 'Is this course available for student visa holders?',
  }),
  app('a1034', '2026-09-21T12:40', 'Domestic', 'Hannah Lee', 'hannah.lee@gmail.com', '0409 214 377', 'CHC43115', 'Other', 'Contacted'),
  app('a1033', '2026-09-20T08:55', 'Domestic', 'Tom Fraser', 'tom.fraser@bigpond.com', '0418 402 959', 'CPC40120', 'Google', 'Closed'),
]

export const findApplication = (id) => applications.find((a) => a.id === id)

export const applicationCounts = applications.reduce((acc, a) => ({ ...acc, [a.status]: (acc[a.status] ?? 0) + 1 }), {})

// Demo filtering for the list UI: { status?, q? }.
export function filterApplications({ status, q } = {}) {
  const needle = q?.toLowerCase()
  return applications.filter((a) =>
    (!status || a.status === status) &&
    (!needle || [a.firstName, a.lastName, a.email, a.course].some((v) => v.toLowerCase().includes(needle))))
}
