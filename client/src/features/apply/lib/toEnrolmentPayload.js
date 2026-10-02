import { attachmentKeys, attachments, OTHER_ATTACHMENT } from '../data/enrolment/enrolmentOptions'

const keyOf = (label) => (label === OTHER_ATTACHMENT ? 'other' : attachmentKeys[attachments.indexOf(label)])
const filled = (row) => Object.values(row).some((v) => String(v).trim())

// Form values → the `data` JSON of POST /enrolments (server/docs/enrolment-api.md). Follow-up answers
// that no longer apply (OSHC details after unticking, visa details after "No"…) are sent blank, and
// empty table rows are dropped, so stale draft values never trip the server's rules.
export function toEnrolmentPayload(v) {
  const holdsVisa = v.holdsVisa === 'Yes'
  const hasDisability = v.disability === 'Yes'
  return {
    course: {
      code: v.course, title: v.courseTitle, duration: v.duration, applicationFee: v.applicationFee, tuitionFee: v.tuitionFee,
      materialFee: v.materialFee, manual: Boolean(v.courseManual), intakeYear: v.year.match(/\d{4}/)?.[0] ?? '',
    },
    personal: {
      title: v.title, givenNames: v.givenNames, lastName: v.lastName, gender: v.gender, dob: v.dob, countryOfBirth: v.countryOfBirth,
      nationality: v.nationality, firstLanguage: v.firstLanguage, passportNumber: v.passportNumber, passportExpiry: v.passportExpiry,
    },
    contact: {
      home: { address: v.homeAddress, city: v.homeCity, country: v.homeCountry, postcode: v.homePostcode },
      australia: { address: v.auAddress, suburb: v.auSuburb, state: v.auState, postcode: v.auPostcode },
      phone: v.phone, mobile: v.mobile, email: v.email,
    },
    emergencyContact: { name: v.emergencyName, relationship: v.emergencyRelationship, number: v.emergencyNumber },
    health: {
      oshc: v.hasOshc
        ? { has: true, provider: v.oshcProvider, membershipNumber: v.oshcMembership, type: v.oshcType, expiry: v.oshcExpiry }
        : { has: false, provider: '', membershipNumber: '', type: '', expiry: '' },
      arrangeOshc: v.arrangeOshc
        ? { wanted: true, duration: v.arrangeDuration, durationOther: v.arrangeDuration === 'Other' ? v.arrangeDurationOther : '', type: v.arrangeType }
        : { wanted: false, duration: '', durationOther: '', type: '' },
      disability: { has: hasDisability, types: hasDisability ? v.disabilityTypes : [], otherMedical: hasDisability ? v.otherMedical : '' },
    },
    education: {
      qualifications: v.qualifications.filter(filled),
      creditTransfer: v.creditTransfer.startsWith('Yes'),
      englishTests: v.englishTests.filter(filled),
    },
    visa: {
      holds: holdsVisa, type: holdsVisa ? v.visaType : '', subclass: holdsVisa ? v.visaSubclass : '', expiry: holdsVisa ? v.visaExpiry : '',
      immigrationOffice: v.immigrationOffice, applicationDate: v.visaApplicationDate,
    },
    marketing: { heard: v.heard, heardOther: v.heard === 'Other' ? v.heardOther : '' },
    agent: { company: v.agentCompany, name: v.agentName, email: v.agentEmail, phone: v.agentPhone },
    attachments: v.attachments.map((label) => ({ key: keyOf(label), name: label === OTHER_ATTACHMENT ? v.attachmentOther : '' })).filter((a) => a.key),
    declaration: { agreed: v.declaration, signedDate: v.signedDate },
  }
}
