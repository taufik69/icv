// Checks the course form before saving, with the same rules (and words) as the API, so problems show on
// their fields instead of coming back as a list. Returns { 'field.path': message }; empty = OK to save.
const REQUIRED = [
  ['title', 'Course title is required'],
  ['code', 'Course code is required'],
  ['market', 'Market is required'],
  ['studyArea', 'Study area is required'],
  ['level', 'Level is required'],
]
export const URL_MESSAGE = 'Enter a full web address starting with http:// or https://'

export function isWebAddress(text) {
  try {
    return ['http:', 'https:'].includes(new URL(text).protocol)
  } catch {
    return false
  }
}

export function validateCourseForm(values) {
  const errors = {}
  for (const [key, message] of REQUIRED) if (!String(values[key] ?? '').trim()) errors[key] = message
  // Both become links on the site, so only http(s) web addresses.
  for (const [path, url] of [['externalUrl', values.externalUrl], ['detail.guideUrl', values.detail?.guideUrl]]) {
    const text = String(url ?? '').trim()
    if (text && !isWebAddress(text)) errors[path] = URL_MESSAGE
  }
  if (String(values.summary ?? '').length > 300) errors.summary = 'Use 300 characters or fewer'
  return errors
}
