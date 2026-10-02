// A complete, valid enrolment (the `data` JSON of POST /enrolments) and tiny real files to upload.
export const validData = () => ({
  course: { code: 'CPC30220', title: 'Certificate III in Carpentry', duration: '64 Weeks', applicationFee: '$500', tuitionFee: '$18,000', materialFee: '$500', manual: false, intakeYear: '2027' },
  personal: { title: 'Ms', givenNames: 'Priya', lastName: 'Sharma', gender: 'Female', dob: '2001-04-12', countryOfBirth: 'India', nationality: 'Indian', firstLanguage: 'Hindi', passportNumber: 'N1234567', passportExpiry: '2031-08-30' },
  contact: {
    home: { address: '12 MG Road', city: 'New Delhi', country: 'India', postcode: '110001' },
    australia: { address: '', suburb: '', state: '', postcode: '' },
    phone: '', mobile: '+91 98765 43210', email: 'priya.sharma@example.com',
  },
  emergencyContact: { name: 'Anita Sharma', relationship: 'Mother', number: '+91 98111 22334' },
  health: {
    oshc: { has: false, provider: '', membershipNumber: '', type: '', expiry: '' },
    arrangeOshc: { wanted: true, duration: '12 Months', durationOther: '', type: 'Single' },
    disability: { has: false, types: [], otherMedical: '' },
  },
  education: {
    qualifications: [{ qualification: 'Higher Secondary Certificate', year: '2019', country: 'India' }],
    creditTransfer: false,
    englishTests: [{ test: 'IELTS Academic', date: '2025-11-02', reading: '6.5', writing: '6.0', speaking: '7.0', listening: '6.5', overall: '6.5' }],
  },
  visa: { holds: false, type: '', subclass: '', expiry: '', immigrationOffice: 'Australian High Commission, New Delhi', applicationDate: '2026-12-01' },
  marketing: { heard: 'Agent', heardOther: '' },
  agent: { company: 'Global Education Services', name: 'Rahul Mehta', email: 'rahul@globaledu.example', phone: '+61 400 123 456' },
  attachments: [{ key: 'passport', name: '' }],
  declaration: { agreed: true, signedDate: '2026-10-02' },
})

// 1×1 PNG and a minimal PDF; their first bytes are what the server checks.
export const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64')
export const PDF = Buffer.from('%PDF-1.4\n%test\n')

// multipart body for POST /enrolments. `files` = { field: [[buffer, name, type], …] }.
export function enrolmentForm(data, files = { signature: [[PNG, 'signature.png', 'image/png']] }) {
  const form = new FormData()
  form.append('data', typeof data === 'string' ? data : JSON.stringify(data))
  for (const [field, list] of Object.entries(files)) {
    for (const [buffer, name, type] of list) form.append(field, new Blob([buffer], { type }), name)
  }
  return form
}
