// Typed facts and fees of a course as label/value rows for the dashboard view page.
const money = (cents) => `$${(cents / 100).toLocaleString('en-AU', { maximumFractionDigits: 2 })}`

export function factRows({ facts = {}, fees = [], paymentOptions }) {
  const rows = [
    ['Duration', facts.durationText && `${facts.durationText} (${facts.durationWeeks ?? '?'} weeks)`],
    ['Delivery', facts.deliveryText ?? facts.delivery],
    ['Study mode', facts.studyMode],
    ['Campus', facts.campus],
    ['Next intake', facts.intake],
    ['Work placement', facts.placementHours && `${facts.placementHours} hours`],
    ['CRICOS code', facts.cricosCode],
    ...fees.map((f) => [f.label, [f.amountCents !== undefined && money(f.amountCents), f.text].filter(Boolean).join(' · ')]),
    ['Payment options', paymentOptions],
  ]
  return rows.filter(([, value]) => value).map(([label, value]) => ({ label, value }))
}
