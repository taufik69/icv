import { policiesContent } from '@/features/student-info/data/documentsContent'
import { DocumentsPage } from './DocumentsPage'

export function PoliciesPage() {
  return <DocumentsPage id="policies-title" current="Policies and Procedures" content={policiesContent} />
}
