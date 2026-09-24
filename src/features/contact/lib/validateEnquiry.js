// Every field on the icv.edu.au form is required. Returns { field: message } for invalid fields.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+()\d\s-]{8,}$/

export function validateEnquiry(values) {
  const errors = {}
  for (const [key, value] of Object.entries(values)) {
    if (!String(value).trim()) errors[key] = 'This field is required.'
  }
  if (values.email && !EMAIL.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (values.phone && !PHONE.test(values.phone)) errors.phone = 'Please enter a valid phone number.'
  return errors
}
