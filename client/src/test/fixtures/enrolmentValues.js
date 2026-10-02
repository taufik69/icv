import { emptyEnrolment } from '@/features/apply/lib/enrolmentDraft'

// A finished enrolment form, as useEnrolmentForm holds it. `over` replaces any field.
export const enrolmentValues = (over = {}) => ({
  ...emptyEnrolment(),
  course: 'CPC30220', courseTitle: 'Certificate III in Carpentry', duration: '64 Weeks', applicationFee: '$500', tuitionFee: '$18,000', materialFee: '$500', year: 'Year – 2027',
  title: 'Ms', givenNames: 'Priya', lastName: 'Sharma', gender: 'Female', dob: '2001-04-12', countryOfBirth: 'India', nationality: 'Indian',
  firstLanguage: 'Hindi', passportNumber: 'N1234567', passportExpiry: '2031-08-30',
  homeAddress: '12 MG Road', homeCity: 'New Delhi', homeCountry: 'India', homePostcode: '110001',
  mobile: '+91 98765 43210', email: 'priya@example.com',
  emergencyName: 'Anita Sharma', emergencyRelationship: 'Mother', emergencyNumber: '+91 98111 22334',
  disability: 'No (skip to next step)',
  qualifications: [{ qualification: 'Higher Secondary Certificate', year: '2019', country: 'India' }, { qualification: '', year: '', country: '' }],
  creditTransfer: 'No',
  englishTests: [{ test: '', date: '', reading: '', writing: '', speaking: '', listening: '', overall: '' }],
  holdsVisa: 'No', immigrationOffice: 'Australian High Commission, New Delhi', visaApplicationDate: '2026-12-01',
  heard: 'Agent', agentCompany: 'Global Education Services', agentName: 'Rahul Mehta',
  attachments: ['Certified copy of Passport'],
  declaration: true, signature: 'data:image/png;base64,iVBORw0KGgo=', signedDate: '2026-10-02',
  ...over,
})
