import { useMemo, useState } from 'react'
import { EnquiryModalContext } from '@/shared/lib/enquiryModal'

// Holds which enquiry popup is open: `request` = { course, id } or null. `id` changes on every open, so
// the form inside starts fresh each time.
export function EnquiryModalProvider({ children }) {
  const [request, setRequest] = useState(null)
  const value = useMemo(() => ({
    request,
    show: (course) => setRequest({ course, id: Date.now() }),
    close: () => setRequest(null),
  }), [request])
  return <EnquiryModalContext.Provider value={value}>{children}</EnquiryModalContext.Provider>
}
