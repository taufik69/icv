import { fileURLToPath } from 'node:url'

// Choices from the "Enrolment Application Form – International" V8.0, verbatim, as the website's
// enrolment form offers them (client/src/features/apply/data/enrolment/enrolmentOptions.js).
export const TITLES = ['Mr', 'Miss', 'Mrs', 'Ms']
export const GENDERS = ['Male', 'Female', 'Unspecified']
export const COVER_TYPES = ['Single', 'Couple', 'Family']
export const COVER_DURATIONS = ['12 Months', 'Other']
export const DISABILITY_TYPES = ['Hearing', 'Vision', 'Learning', 'Mobility']
export const HEARD_OPTIONS = ['Agent', 'Google Search', 'Facebook', 'Government Websites', 'Events', 'Other']
export const AUSTRALIAN_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']

// Staff workflow for a received application.
export const STATUSES = ['New', 'In review', 'Offer sent', 'Enrolled', 'Declined', 'Withdrawn']

// (M) Attachment Checklist. `key` is the API name (and the multipart field `attachment_<key>`);
// `label` is the paper form's wording.
export const ATTACHMENT_TYPES = [
  { key: 'english', label: 'Certified evidence of English language proficiency like IELTS, TOEFL, PTE and ELICOS, etc.' },
  { key: 'year11', label: 'Certified documented evidence of Australian Year 11 or equivalent (with certified translation, if not in English)' },
  { key: 'passport', label: 'Certified copy of Passport' },
  { key: 'visa', label: 'Copy of Visa (if applicable)' },
  { key: 'releaseLetter', label: 'Release letter from current Institute (if there for less than 6 months)' },
  { key: 'oshc', label: 'Evidence of Overseas Health Cover (if applicable)' },
  { key: 'rpl', label: 'Certified copies of documents to be assessed for Recognition of Prior Learning (RPL) if required' },
  { key: 'other', label: 'Other' },
]
export const ATTACHMENT_KEYS = ATTACHMENT_TYPES.map((a) => a.key)

// Uploaded documents (passports, visas…) are private: kept outside public/ and served only through
// GET /enrolments/:id/files/:fileId.
export const STORAGE_ROOT = fileURLToPath(new URL('../../../storage/enrolments/', import.meta.url))
export const FILE_MAX_BYTES = 10 * 1024 * 1024
export const FILES_PER_DOCUMENT = 5
export const FILE_TYPES = { 'application/pdf': 'pdf', 'image/jpeg': 'jpg', 'image/png': 'png' }
// Signature and agent's stamp: images only, smaller.
export const IMAGE_MAX_BYTES = 2 * 1024 * 1024
