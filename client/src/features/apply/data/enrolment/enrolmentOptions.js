// Choices from the international enrolment form, verbatim.
export const titles = ['Mr', 'Miss', 'Mrs', 'Ms']
export const genders = ['Male', 'Female', 'Unspecified']
export const yesNo = ['Yes', 'No']
export const creditAnswers = ['Yes (attach copies)', 'No']
export const coverTypes = ['Single', 'Couple', 'Family']
export const coverDurations = ['12 Months', 'Other']
export const disabilityAnswers = ['Yes', 'No (skip to next step)']
export const disabilityTypes = ['Hearing', 'Vision', 'Learning', 'Mobility']
export const heardOptions = ['Agent', 'Google Search', 'Facebook', 'Government Websites', 'Events', 'Other']
export const australianStates = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']

export const emptyQualification = { qualification: '', year: '', country: '' }
export const emptyEnglishTest = { test: '', date: '', reading: '', writing: '', speaking: '', listening: '', overall: '' }

// (M) Attachment Checklist
export const attachments = [
  'Certified evidence of English language proficiency like IELTS, TOEFL, PTE and ELICOS, etc.',
  'Certified documented evidence of Australian Year 11 or equivalent (with certified translation, if not in English)',
  'Certified copy of Passport',
  'Copy of Visa (if applicable)',
  'Release letter from current Institute (if there for less than 6 months)',
  'Evidence of Overseas Health Cover (if applicable)',
  'Certified copies of documents to be assessed for Recognition of Prior Learning (RPL) if required',
]

// Short names for the upload buttons, in the same order as `attachments` ("Upload passport").
export const attachmentShort = ['English test results', 'Year 11 or equivalent', 'passport', 'visa', 'release letter', 'health cover', 'RPL documents']
export const OTHER_ATTACHMENT = 'Other'

// (L) Enrolment Procedure, step 2
// (L) Enrolment Procedure, part 1: the ways to send the form (verbatim; `href` makes a link).
export const submitWays = [
  { lead: 'email to', text: 'info@icv.edu.au', href: 'mailto:info@icv.edu.au', or: true },
  { text: 'Post to: level 1, 541 King Street, West Melbourne VIC 3003', or: true },
  { text: 'in person to ICV approved education agent or at the ICV reception.' },
]

export const offerProcedure = [
  'ICV Admissions will assess the enrolment application and will issue letter and enrolment agreement of offer within 5 working days, if application is approved.',
  'Please note that the student who have not completed six months of their principal course may require a release letter from their principal provider, as per the Education Service for Overseas Students (ESOS) Act 2000. If you require a letter of release from your current provider, you are required to provide the letter of releases to ICV before acceptance in to the course.',
]

export const declarationText =
  'I hereby declare that the information provided above is true and correct to the best of my knowledge.'
