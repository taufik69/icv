import { formsContent } from '@/features/student-info/data/documentsContent'
import { PageHero } from '@/shared/components/layout'
import { DocumentsBlueprint } from './DocumentsBlueprint'

// Forms: banner, then the international student forms as a blueprint bento.
export function FormsPage() {
  return (
    <>
      <PageHero accent="muted" grid id="forms-title" current="Forms" {...formsContent.hero} />
      <DocumentsBlueprint id="forms-list" content={formsContent} />
    </>
  )
}
