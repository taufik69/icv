import { Container } from '@/shared/components/ui'

// Standard page wrapper: clears the fixed header.
export function PageContainer({ children }) {
  return <Container className="pt-32 pb-16">{children}</Container>
}
