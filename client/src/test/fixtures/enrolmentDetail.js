// One enrolment as GET /enrolments/:id returns it (server/docs/enrolment-api.md). `over` merges per part.
const file = (id, name, mimeType = 'application/pdf') => ({ id, name, mimeType, size: 284113 })

export const enrolmentDetail = (over = {}) => ({
  id: '6abf5a42a8713070a56bb9f8', reference: 'ENR-2026-D9UWZU', status: 'New', staffNote: '',
  submittedAt: '2026-10-02T07:16:18.893Z', updatedAt: '2026-10-02T07:16:18.893Z',
  course: { code: 'CPC30220', title: 'Certificate III in Carpentry', duration: '64 Weeks', applicationFee: '$500', tuitionFee: '$18,000', materialFee: '$500', manual: false, intakeYear: '2027' },
  personal: { title: 'Ms', givenNames: 'Priya', lastName: 'Sharma', gender: 'Female', dob: '2001-04-12', countryOfBirth: 'India', nationality: 'Indian', firstLanguage: 'Hindi', passportNumber: 'N1234567', passportExpiry: '2031-08-30' },
  contact: {
    home: { address: '12 MG Road', city: 'New Delhi', country: 'India', postcode: '110001' },
    australia: { address: '', suburb: '', state: '', postcode: '' }, phone: '', mobile: '+91 98765 43210', email: 'priya@example.com',
  },
  emergencyContact: { name: 'Anita Sharma', relationship: 'Mother', number: '+91 98111 22334' },
  health: {
    oshc: { has: false, provider: '', membershipNumber: '', type: '', expiry: '' },
    arrangeOshc: { wanted: true, duration: '12 Months', durationOther: '', type: 'Single' },
    disability: { has: false, types: [], otherMedical: '' },
  },
  education: { qualifications: [{ qualification: 'Higher Secondary Certificate', year: '2019', country: 'India' }], creditTransfer: false, englishTests: [] },
  visa: { holds: false, type: '', subclass: '', expiry: '', immigrationOffice: 'Australian High Commission, New Delhi', applicationDate: '2026-12-01' },
  marketing: { heard: 'Agent', heardOther: '' },
  agent: { company: 'Global Education Services', name: 'Rahul Mehta', email: '', phone: '', stamp: null },
  attachments: [
    { key: 'passport', label: 'Certified copy of Passport', name: '', files: [file('e70aa7b8b1dd.pdf', 'passport.pdf')] },
    { key: 'visa', label: 'Copy of Visa (if applicable)', name: '', files: [] },
  ],
  declaration: { agreed: true, signedDate: '2026-10-02', signature: file('c30dd5071c91.png', 'signature.png', 'image/png') },
  ...over,
})
