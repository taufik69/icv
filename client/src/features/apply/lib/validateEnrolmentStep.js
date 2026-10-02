const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const need = (values, errors, fields) => {
  for (const [key, message] of fields) if (!String(values[key] ?? '').trim()) errors[key] = message
}

const rules = {
  course: (v, e) => {
    need(v, e, [['course', v.courseManual ? 'Enter the course code.' : 'Choose a course.'], ['year', 'Choose the year you want to start.']])
    if (v.courseManual) need(v, e, [['courseTitle', 'Enter the course title.']])
  },
  personal: (v, e) => need(v, e, [
    ['title', 'Choose a title.'], ['givenNames', 'Enter your given name(s).'], ['lastName', 'Enter your last name.'],
    ['gender', 'Choose a gender.'], ['dob', 'Enter your date of birth.'], ['countryOfBirth', 'Enter your country of birth.'],
    ['nationality', 'Enter your nationality.'], ['passportNumber', 'Enter your passport number.'],
    ['passportExpiry', 'Enter your passport expiry date.'],
  ]),
  contact: (v, e) => {
    need(v, e, [
      ['homeAddress', 'Enter your address in your home country.'], ['homeCity', 'Enter your city.'],
      ['homeCountry', 'Enter your country.'], ['mobile', 'Enter a mobile number.'], ['email', 'Enter your email address.'],
      ['emergencyName', 'Enter a name.'], ['emergencyRelationship', 'Enter how they are related to you.'],
      ['emergencyNumber', 'Enter their phone number.'],
    ])
    if (v.email && !EMAIL.test(v.email)) e.email = 'Enter an email address like name@example.com.'
  },
  health: (v, e) => {
    // OSHC details are asked only when their checkbox is ticked; the disability question is always required.
    need(v, e, [['disability', 'Choose yes or no.']])
    if (v.hasOshc) need(v, e, [['oshcProvider', "Enter your provider's name."], ['oshcMembership', 'Enter your membership number.']])
    if (v.arrangeOshc) need(v, e, [['arrangeDuration', 'Choose a duration.'], ['arrangeType', 'Choose a cover type.']])
    if (v.arrangeOshc && v.arrangeDuration === 'Other') need(v, e, [['arrangeDurationOther', 'Enter how long you need cover for.']])
    if (v.disability === 'Yes' && !v.disabilityTypes.length && !v.otherMedical.trim())
      e.disabilityTypes = 'Choose at least one, or describe another medical condition.'
  },
  education: (v, e) => need(v, e, [['creditTransfer', 'Choose yes or no.']]),
  visa: (v, e) => {
    need(v, e, [['holdsVisa', 'Choose yes or no.']])
    if (v.holdsVisa === 'Yes') need(v, e, [['visaType', 'Enter your visa type.']])
  },
  agent: (v, e) => {
    need(v, e, [['heard', 'Choose how you heard about ICV.']])
    if (v.heard === 'Agent') need(v, e, [['agentCompany', "Enter your agent's company name."], ['agentName', "Enter your agent's name."]])
    if (v.agentEmail && !EMAIL.test(v.agentEmail)) e.agentEmail = 'Enter an email address like name@example.com.'
  },
  declaration: (v, e) => {
    if (!v.declaration) e.declaration = 'Tick the declaration to send your application.'
    need(v, e, [['signature', 'Type your full name as your signature.'], ['signedDate', 'Enter the date.']])
  },
}

// Errors for one step only, as { field: message }. Empty object = the step can be saved.
export function validateEnrolmentStep(stepId, values) {
  const errors = {}
  rules[stepId]?.(values, errors)
  return errors
}
