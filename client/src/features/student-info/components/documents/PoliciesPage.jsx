import { policiesContent } from '@/features/student-info/data/documentsContent'
import { PageHero } from '@/shared/components/layout'
import { DocumentsBlueprint } from './DocumentsBlueprint'

// Policies and Procedures: banner, then every policy as a blueprint bento (same design as Forms).
// The live page has no list heading, so the featured cell reuses the page title.
export function PoliciesPage() {
  return (
    <>
      <PageHero accent="muted" grid id="policies-title" current="Policies and Procedures" {...policiesContent.hero} />
      <DocumentsBlueprint id="policies-list" content={policiesContent} heading="Policies and Procedures" />
    </>
  )
}
