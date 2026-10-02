// Every enrolment form field → its path in the API's JSON (server/docs/enrolment-api.md) and the step it
// is on. Used to put server errors back on the right field and step. A path also covers the paths under
// it ("education.qualifications" catches "education.qualifications.0.year").
const by = (step, rows) => rows.map(([field, path]) => ({ field, path, step }))

export const enrolmentFields = [
  ...by('course', [
    ['course', 'course.code'], ['courseTitle', 'course.title'], ['duration', 'course.duration'], ['applicationFee', 'course.applicationFee'],
    ['tuitionFee', 'course.tuitionFee'], ['materialFee', 'course.materialFee'], ['year', 'course.intakeYear'],
  ]),
  ...by('personal', ['title', 'givenNames', 'lastName', 'gender', 'dob', 'countryOfBirth', 'nationality', 'firstLanguage', 'passportNumber', 'passportExpiry'].map((f) => [f, `personal.${f}`])),
  ...by('contact', [
    ['homeAddress', 'contact.home.address'], ['homeCity', 'contact.home.city'], ['homeCountry', 'contact.home.country'], ['homePostcode', 'contact.home.postcode'],
    ['auAddress', 'contact.australia.address'], ['auSuburb', 'contact.australia.suburb'], ['auState', 'contact.australia.state'], ['auPostcode', 'contact.australia.postcode'],
    ['phone', 'contact.phone'], ['mobile', 'contact.mobile'], ['email', 'contact.email'],
    ['emergencyName', 'emergencyContact.name'], ['emergencyRelationship', 'emergencyContact.relationship'], ['emergencyNumber', 'emergencyContact.number'],
  ]),
  ...by('health', [
    ['hasOshc', 'health.oshc.has'], ['oshcProvider', 'health.oshc.provider'], ['oshcMembership', 'health.oshc.membershipNumber'],
    ['oshcType', 'health.oshc.type'], ['oshcExpiry', 'health.oshc.expiry'],
    ['arrangeOshc', 'health.arrangeOshc.wanted'], ['arrangeDuration', 'health.arrangeOshc.duration'],
    ['arrangeDurationOther', 'health.arrangeOshc.durationOther'], ['arrangeType', 'health.arrangeOshc.type'],
    ['disability', 'health.disability.has'], ['disabilityTypes', 'health.disability.types'], ['otherMedical', 'health.disability.otherMedical'],
  ]),
  ...by('education', [['qualifications', 'education.qualifications'], ['creditTransfer', 'education.creditTransfer'], ['englishTests', 'education.englishTests']]),
  ...by('visa', [
    ['holdsVisa', 'visa.holds'], ['visaType', 'visa.type'], ['visaSubclass', 'visa.subclass'], ['visaExpiry', 'visa.expiry'],
    ['immigrationOffice', 'visa.immigrationOffice'], ['visaApplicationDate', 'visa.applicationDate'],
  ]),
  ...by('agent', [
    ['heard', 'marketing.heard'], ['heardOther', 'marketing.heardOther'], ['agentCompany', 'agent.company'], ['agentName', 'agent.name'],
    ['agentEmail', 'agent.email'], ['agentPhone', 'agent.phone'], ['agentStamp', 'agentStamp'],
  ]),
  ...by('declaration', [['attachments', 'attachments'], ['declaration', 'declaration.agreed'], ['signature', 'signature'], ['signedDate', 'declaration.signedDate']]),
]
