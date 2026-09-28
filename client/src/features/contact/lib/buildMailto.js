// No form backend yet: the enquiry is handed to the visitor's email app, addressed to ICV, with every answer listed.
export function buildMailto(to, labels, values) {
  const subject = `Course enquiry: ${values.firstName} ${values.lastName}`
  const body = Object.keys(labels)
    .map((key) => `${labels[key]}: ${values[key]}`)
    .join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
