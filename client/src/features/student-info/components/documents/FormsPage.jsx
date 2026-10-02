import { formsContent } from '@/features/student-info/data/documentsContent'
import { DocumentsPage } from './DocumentsPage'

export function FormsPage() {
  return <DocumentsPage id="forms-title" current="Forms" content={formsContent} />
}
