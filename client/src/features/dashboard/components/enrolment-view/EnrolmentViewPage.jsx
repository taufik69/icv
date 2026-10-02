import { useNavigate } from '@tanstack/react-router'
import { MailIcon } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'
import { useEnrolment } from '../../hooks/useEnrolments'
import { useDeleteEnrolment } from '../../hooks/useEnrolmentMutations'
import { courseLine, enrolmentSections, fullName } from '../../lib/enrolmentView'
import { DeleteApplication } from '../application-view/DeleteApplication'
import { DetailList } from '../application-view/DetailList'
import { DeclarationCard } from './DeclarationCard'
import { DocumentsCard } from './DocumentsCard'
import { EducationCard } from './EducationCard'
import { EnrolmentStatusPanel } from './EnrolmentStatusPanel'
import { SectionCard } from './SectionCard'
import { PageHeader } from '../shell/PageHeader'

// One international enrolment application, in paper form order (A … N). Status and the staff note
// save from the side panel; delete asks once, then removes the application and its files and returns
// to the list.
export function EnrolmentViewPage({ id }) {
  const item = useEnrolment(id)
  const remove = useDeleteEnrolment()
  const navigate = useNavigate()
  const onDelete = () => remove.mutate(id, { onSuccess: () => navigate({ to: '/dashboard/enrolments' }) })
  const [course, personal, contact, health, visa, agent] = enrolmentSections(item)

  return (
    <>
      <PageHeaderBlock item={item} pending={remove.isPending} onDelete={onDelete} />
      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          {[course, personal, contact, health].map((s) => (
            <SectionCard key={s.id} {...s}><DetailList rows={s.rows} /></SectionCard>
          ))}
          <EducationCard education={item.education} />
          {[visa, agent].map((s) => (
            <SectionCard key={s.id} {...s}><DetailList rows={s.rows} /></SectionCard>
          ))}
          <DocumentsCard enrolmentId={item.id} attachments={item.attachments} />
          <DeclarationCard enrolmentId={item.id} declaration={item.declaration} stamp={item.agent.stamp} />
        </div>
        <aside className="lg:sticky lg:top-8">
          <EnrolmentStatusPanel item={item} />
        </aside>
      </div>
    </>
  )
}

function PageHeaderBlock({ item, pending, onDelete }) {
  return (
    <PageHeader title={fullName(item)} crumbs={{ trail: [{ label: 'Enrolments', to: '/dashboard/enrolments' }] }} description={courseLine(item)}>
      <Button as="a" href={`mailto:${item.contact.email}?subject=${encodeURIComponent(`Your ICV enrolment ${item.reference}`)}`} variant="secondary">
        <MailIcon className="size-4.5" /> Email {item.personal.givenNames}
      </Button>
      <DeleteApplication pending={pending} onConfirm={onDelete} />
    </PageHeader>
  )
}
