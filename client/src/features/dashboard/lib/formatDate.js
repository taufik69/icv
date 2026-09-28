const dateFmt = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
const timeFmt = new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: '2-digit' })

// "28 Sept 2026" and "9:14 am" for ISO date-times.
export const formatDate = (iso) => dateFmt.format(new Date(iso))
export const formatTime = (iso) => timeFmt.format(new Date(iso))
