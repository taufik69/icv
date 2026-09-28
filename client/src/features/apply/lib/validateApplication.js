// Required fields match the live form: student type, first name, last name, email. Returns { field: message }.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+()\d\s-]{8,}$/
const REQUIRED = ['studentType', 'firstName', 'lastName', 'email']

export function validateApplication(values) {
  const errors = {}
  for (const key of REQUIRED) {
    if (!values[key].trim()) errors[key] = 'This field is required.'
  }
  if (values.email && !EMAIL.test(values.email)) errors.email = 'Enter an email like name@example.com.'
  if (values.phone && !PHONE.test(values.phone)) errors.phone = 'Enter a phone number with at least 8 digits.'
  return errors
}
