// Eight demo international students for `npm run seed:enrolments` (made-up people; every file they
// "upload" is drawn by enrolmentFiles.js and marked as demo data).
const COURSES = {
  CPC30220: ['Certificate III in Carpentry', '64 Weeks', '$18,000'],
  CPC40120: ['Certificate IV in Building and Construction', '52 Weeks', '$16,500'],
  CPC50220: ['Diploma of Building and Construction (Building)', '78 Weeks', '$22,000'],
  CHC43015: ['Certificate IV in Ageing Support', '52 Weeks', '$14,000'],
  CHC50121: ['Diploma of Early Childhood Education and Care', '78 Weeks', '$21,000'],
}
const course = (code, intakeYear) => {
  const [title, duration, tuitionFee] = COURSES[code]
  return { code, title, duration, applicationFee: '$500', tuitionFee, materialFee: '$500', manual: false, intakeYear }
}
const AGENTS = {
  global: { company: 'Global Education Services', name: 'Rahul Mehta', email: 'rahul@globaledu.example', phone: '+61 400 123 456' },
  pathway: { company: 'Pathway Study Consultants', name: 'Grace Lim', email: 'grace@pathwaystudy.example', phone: '+61 411 555 019' },
  none: { company: '', name: '', email: '', phone: '' },
}
const noOshc = { has: false, provider: '', membershipNumber: '', type: '', expiry: '' }
const arrange = (type = 'Single') => ({ wanted: true, duration: '12 Months', durationOther: '', type })
const noArrange = { wanted: false, duration: '', durationOther: '', type: '' }
const noVisa = (office, applicationDate) => ({ holds: false, type: '', subclass: '', expiry: '', immigrationOffice: office, applicationDate })
const ielts = (date, r, w, s, l, o) => [{ test: 'IELTS Academic', date, reading: r, writing: w, speaking: s, listening: l, overall: o }]

const student = ({ at, status, note = '', who, code, intake, home, agent = 'none', heard = 'Agent', oshc = noOshc, arrangeOshc = arrange(), disability = { has: false, types: [], otherMedical: '' }, visa, qualifications, englishTests = [], creditTransfer = false, docs = ['passport', 'english'] }) => {
  const [title, givenNames, lastName, gender, dob, countryOfBirth, nationality, firstLanguage, passportNumber, passportExpiry] = who
  const [address, city, country, postcode, mobile, email, emergency] = home
  return {
    at, status, staffNote: note,
    course: course(code, intake),
    personal: { title, givenNames, lastName, gender, dob, countryOfBirth, nationality, firstLanguage, passportNumber, passportExpiry },
    contact: { home: { address, city, country, postcode }, australia: { address: '', suburb: '', state: '', postcode: '' }, phone: '', mobile, email },
    emergencyContact: { name: emergency[0], relationship: emergency[1], number: emergency[2] },
    health: { oshc, arrangeOshc: oshc.has ? noArrange : arrangeOshc, disability },
    education: { qualifications, creditTransfer, englishTests },
    visa, marketing: { heard, heardOther: '' }, agent: AGENTS[agent],
    docs, declaration: { agreed: true, signedDate: at.slice(0, 10) },
  }
}

export const demoEnrolments = [
  student({ at: '2026-10-01T10:12', status: 'New', code: 'CPC30220', intake: '2027', agent: 'global',
    who: ['Ms', 'Priya', 'Sharma', 'Female', '2001-04-12', 'India', 'Indian', 'Hindi', 'N1234567', '2031-08-30'],
    home: ['12 MG Road, Sector 4', 'New Delhi', 'India', '110001', '+91 98765 43210', 'priya.sharma@example.com', ['Anita Sharma', 'Mother', '+91 98111 22334']],
    visa: noVisa('Australian High Commission, New Delhi, India', '2026-12-01'),
    qualifications: [{ qualification: 'Higher Secondary Certificate', year: '2019', country: 'India' }],
    englishTests: ielts('2025-11-02', '6.5', '6.0', '7.0', '6.5', '6.5') }),
  student({ at: '2026-09-30T15:40', status: 'New', code: 'CHC43015', intake: '2027', heard: 'Google Search',
    who: ['Mrs', 'Maria Luisa', 'Santos', 'Female', '1993-09-21', 'Philippines', 'Filipino', 'Tagalog', 'P8812045B', '2032-02-14'],
    home: ['88 Mabini Street, Barangay 4', 'Quezon City', 'Philippines', '1100', '+63 917 555 0142', 'maria.santos@example.com', ['Jose Santos', 'Husband', '+63 917 555 0199']],
    oshc: { has: true, provider: 'Bupa', membershipNumber: 'BUP-4471920', type: 'Couple', expiry: '2027-12-31' },
    visa: { holds: true, type: 'Visitor', subclass: '600', expiry: '2026-12-20', immigrationOffice: 'Department of Home Affairs, Melbourne', applicationDate: '2026-10-15' },
    qualifications: [{ qualification: 'Bachelor of Science in Nursing', year: '2015', country: 'Philippines' }], creditTransfer: true,
    englishTests: ielts('2026-06-18', '7.0', '6.5', '7.5', '7.0', '7.0'), docs: ['passport', 'english', 'visa', 'oshc', 'rpl'] }),
  student({ at: '2026-09-29T09:05', status: 'In review', note: 'Passport and IELTS checked. Waiting for the Year 12 certificate.', code: 'CPC40120', intake: '2027', agent: 'pathway',
    who: ['Mr', 'Arjun', 'Mehta', 'Male', '1998-01-30', 'India', 'Indian', 'Gujarati', 'M7741203', '2030-05-09'],
    home: ['4 Shanti Nagar, Paldi', 'Ahmedabad', 'India', '380007', '+91 98200 44121', 'arjun.mehta@example.com', ['Rakesh Mehta', 'Father', '+91 98200 44100']],
    visa: noVisa('Australian Consulate-General, Mumbai, India', '2026-11-20'),
    qualifications: [{ qualification: 'Diploma in Civil Engineering', year: '2019', country: 'India' }, { qualification: 'Higher Secondary Certificate', year: '2016', country: 'India' }],
    englishTests: ielts('2026-03-09', '6.0', '6.0', '6.5', '6.5', '6.0'), docs: ['passport', 'english', 'year11'] }),
  student({ at: '2026-09-27T13:22', status: 'Offer sent', note: 'Offer letter emailed 30 Sep. Waiting for the signed agreement.', code: 'CHC50121', intake: '2027', agent: 'global',
    who: ['Miss', 'Thi Lan', 'Nguyen', 'Female', '2000-07-04', 'Vietnam', 'Vietnamese', 'Vietnamese', 'C4410298', '2033-01-22'],
    home: ['27 Le Loi, District 1', 'Ho Chi Minh City', 'Vietnam', '700000', '+84 90 312 4477', 'lan.nguyen@example.com', ['Nguyen Van Minh', 'Brother', '+84 90 312 4400']],
    disability: { has: true, types: ['Vision'], otherMedical: 'Wears glasses; no support needed in class.' },
    visa: noVisa('Australian Embassy, Hanoi, Vietnam', '2026-11-05'),
    qualifications: [{ qualification: 'High School Graduation Diploma', year: '2018', country: 'Vietnam' }],
    englishTests: ielts('2026-02-14', '6.5', '6.0', '6.0', '6.5', '6.5') }),
  student({ at: '2026-09-25T11:48', status: 'Enrolled', note: 'COE issued. Starts with the February intake.', code: 'CPC50220', intake: '2026', heard: 'Events',
    who: ['Mr', 'Kenji', 'Watanabe', 'Male', '1995-11-15', 'Japan', 'Japanese', 'Japanese', 'TK5520183', '2034-06-01'],
    home: ['3-14-2 Namba, Chuo-ku', 'Osaka', 'Japan', '542-0076', '+81 90 3321 7788', 'kenji.watanabe@example.com', ['Yuki Watanabe', 'Sister', '+81 90 3321 7700']],
    arrangeOshc: arrange('Single'),
    visa: { holds: true, type: 'Working Holiday', subclass: '417', expiry: '2027-03-31', immigrationOffice: 'Department of Home Affairs, Melbourne', applicationDate: '2026-10-01' },
    qualifications: [{ qualification: 'Bachelor of Engineering (Architecture)', year: '2018', country: 'Japan' }], creditTransfer: true,
    englishTests: ielts('2025-12-06', '7.5', '6.5', '7.0', '7.5', '7.0'), docs: ['passport', 'english', 'visa', 'rpl'] }),
  student({ at: '2026-09-23T16:30', status: 'New', code: 'CPC30220', intake: '2027', heard: 'Facebook',
    who: ['Mr', 'Bikash', 'Thapa', 'Male', '2002-02-08', 'Nepal', 'Nepali', 'Nepali', 'PA0938817', '2031-11-30'],
    home: ['Ward 10, New Baneshwor', 'Kathmandu', 'Nepal', '44600', '+977 984 112 3344', 'bikash.thapa@example.com', ['Sita Thapa', 'Mother', '+977 984 112 3300']],
    visa: noVisa('Australian Embassy, Kathmandu, Nepal', '2026-12-10'),
    qualifications: [{ qualification: 'Secondary Education Examination (+2)', year: '2020', country: 'Nepal' }],
    englishTests: [{ test: 'PTE Academic', date: '2026-05-21', reading: '58', writing: '60', speaking: '62', listening: '57', overall: '59' }] }),
  student({ at: '2026-09-21T10:02', status: 'Declined', note: 'Course full for 2026; suggested the 2027 intake. Student declined.', code: 'CHC43015', intake: '2026', agent: 'pathway',
    who: ['Ms', 'Amina', 'Bello', 'Female', '1990-05-27', 'Nigeria', 'Nigerian', 'Hausa', 'A09912744', '2029-08-17'],
    home: ['15 Ahmadu Bello Way', 'Kaduna', 'Nigeria', '800001', '+234 803 555 0123', 'amina.bello@example.com', ['Musa Bello', 'Husband', '+234 803 555 0100']],
    visa: noVisa('Australian High Commission, Abuja, Nigeria', '2026-10-30'),
    qualifications: [{ qualification: 'West African Senior School Certificate', year: '2008', country: 'Nigeria' }],
    englishTests: ielts('2026-01-17', '6.0', '5.5', '6.5', '6.0', '6.0') }),
  student({ at: '2026-09-18T14:15', status: 'Withdrawn', note: 'Withdrew: accepted a place at another college.', code: 'CPC40120', intake: '2027', heard: 'Government Websites',
    who: ['Mr', 'Diego', 'Fernández', 'Male', '1997-08-03', 'Colombia', 'Colombian', 'Spanish', 'CO4471882', '2032-09-12'],
    home: ['Calle 85 #11-53', 'Bogotá', 'Colombia', '110221', '+57 310 555 7788', 'diego.fernandez@example.com', ['Lucía Fernández', 'Mother', '+57 310 555 7700']],
    visa: noVisa('Australian Embassy, Bogotá, Colombia', '2026-11-12'),
    qualifications: [{ qualification: 'Técnico en Construcción', year: '2017', country: 'Colombia' }],
    englishTests: ielts('2026-04-25', '6.5', '6.0', '6.5', '6.0', '6.5'), docs: ['passport'] }),
]
