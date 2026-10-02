const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 2, minimumFractionDigits: 0 })
const fee = (fees, kind) => {
  const cents = fees?.find((f) => f.kind === kind)?.amountCents
  return cents == null ? '' : money.format(cents / 100)
}

// API course (finder fields) → the (A) Course Details row of the paper form. A value the API doesn't
// have is '' so the form asks the student for it.
export function toEnrolmentCourse(c) {
  return {
    course: c.code,
    courseTitle: c.title,
    duration: c.facts?.durationText ?? '',
    applicationFee: fee(c.fees, 'application'),
    tuitionFee: fee(c.fees, 'tuition'),
    materialFee: fee(c.fees, 'material'),
  }
}
