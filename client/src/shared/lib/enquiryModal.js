import { createContext, useContext } from 'react'

// Site-wide "open the enquiry form in a popup". Provided by app/providers/EnquiryModalProvider; the popup
// itself (features/apply EnquiryDialog) is rendered by the root route. Value: { request, show(course?), close }.
// null outside the provider, so callers can fall back to a normal link to /enquire-now.
export const EnquiryModalContext = createContext(null)
export const useEnquiryModal = () => useContext(EnquiryModalContext)
