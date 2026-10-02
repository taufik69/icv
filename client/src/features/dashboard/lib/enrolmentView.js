import { formatDate } from './formatDate'

// Pure helpers that shape one enrolment (GET /enrolments/:id) for the view page. Rows are
// [label, value, wide?]; an empty value reads "Not provided" in DetailList.
const yesNo = (b) => (b ? 'Yes' : 'No')
const date = (d) => (d ? formatDate(d) : '')
const join = (...parts) => parts.filter(Boolean).join(', ')

export const fullName = ({ personal }) => `${personal.givenNames} ${personal.lastName}`
export const initials = ({ personal }) => `${personal.givenNames[0] ?? ''}${personal.lastName[0] ?? ''}`.toUpperCase()

// "Certificate III in Carpentry (CPC30220), 2027 intake"
export const courseLine = ({ course }) => `${course.title} (${course.code}), ${course.intakeYear} intake`

// Ticked documents, and how many of them have at least one file.
export function documentSummary(attachments = []) {
  return { ticked: attachments.length, withFiles: attachments.filter((a) => a.files.length).length }
}

// The parts shown as label/value cards, in paper form order. Education (F, G) and documents (M, N)
// have their own cards.
export function enrolmentSections(item) {
  const { course, personal, contact, emergencyContact: ec, health, visa, marketing, agent } = item
  const { oshc, arrangeOshc, disability } = health
  return [
    { id: 'course', letters: 'A', title: 'Course', rows: [
      ['Course', `${course.code} ${course.title}`, true], ['Intake year', course.intakeYear], ['Duration', course.duration],
      ['Application fee', course.applicationFee], ['Tuition fee', course.tuitionFee], ['Material fee', course.materialFee],
      ['Course entered by hand', course.manual ? 'Yes, not from the course list' : ''],
    ].filter(([, v], i) => i < 6 || v) },
    { id: 'personal', letters: 'B', title: 'Personal details', rows: [
      ['Name', `${personal.title} ${fullName(item)}`], ['Gender', personal.gender], ['Date of birth', date(personal.dob)],
      ['Country of birth', personal.countryOfBirth], ['Nationality', personal.nationality], ['First language', personal.firstLanguage],
      ['Passport number', personal.passportNumber], ['Passport expiry', date(personal.passportExpiry)],
    ] },
    { id: 'contact', letters: 'C D', title: 'Contact', rows: [
      ['Email', contact.email], ['Mobile', contact.mobile], ['Phone', contact.phone],
      ['Address in home country', join(contact.home.address, contact.home.city, contact.home.postcode, contact.home.country), true],
      ['Address in Australia', join(contact.australia.address, contact.australia.suburb, contact.australia.state, contact.australia.postcode), true],
      ['Emergency contact', join(ec.name, ec.relationship)], ['Emergency number', ec.number],
    ] },
    { id: 'health', letters: 'E', title: 'Health cover', rows: [
      ['Has OSHC', oshc.has ? join(oshc.provider, oshc.type && `${oshc.type} cover`) : 'No'],
      ['Membership number', oshc.has ? oshc.membershipNumber : ''], ['OSHC expiry', oshc.has ? date(oshc.expiry) : ''],
      ['ICV to arrange OSHC', arrangeOshc.wanted ? join(arrangeOshc.duration === 'Other' ? arrangeOshc.durationOther : arrangeOshc.duration, arrangeOshc.type) : 'No'],
      ['Disability or medical condition', disability.has ? join(...disability.types) || 'Yes' : 'No'],
      ['Other medical conditions', disability.otherMedical, true],
    ].filter(([, v], i) => i === 0 || i === 3 || i === 4 || v) },
    { id: 'visa', letters: 'H I', title: 'Visa', rows: [
      ['Holds an Australian visa', visa.holds ? join(visa.type, visa.subclass && `subclass ${visa.subclass}`) : 'No'],
      ['Visa expiry', visa.holds ? date(visa.expiry) : ''],
      ['Immigration or Commission Office', visa.immigrationOffice, true], ['Visa application date', date(visa.applicationDate)],
    ].filter(([, v], i) => i !== 1 || v) },
    { id: 'agent', letters: 'J K', title: 'Agent', rows: [
      ['Heard about ICV from', marketing.heard === 'Other' ? join('Other', marketing.heardOther) : marketing.heard],
      ['Agent company', agent.company], ['Agent name', agent.name], ['Agent email', agent.email], ['Agent phone', agent.phone],
    ] },
  ]
}

export { yesNo }
