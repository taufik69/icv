import { EnquiryModalProvider } from '@/app/providers/EnquiryModalProvider'
import { QueryProvider } from '@/app/providers/QueryProvider'

export function AppProviders({ children }) {
  return (
    <QueryProvider>
      <EnquiryModalProvider>{children}</EnquiryModalProvider>
    </QueryProvider>
  )
}
