import { courseOptions } from '@/features/apply'
import { useNavigate } from '@tanstack/react-router'
import { MailIcon } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'
import { useApplication } from '../../hooks/useApplications'
import { useDeleteApplication } from '../../hooks/useApplicationMutations'
import { formatDate } from '../../lib/formatDate'
import { DeleteApplication } from './DeleteApplication'
import { ViewCard } from '../course-view/ViewCard'
import { PageHeader } from '../shell/PageHeader'
import { DetailList } from './DetailList'
import { StatusPanel } from './StatusPanel'

const courseName = (code) => {
  const c = courseOptions.find((o) => o.code === code)
  return c ? `${c.code} - ${c.title}` : ''
}

// One application from the API, grouped the way the apply form asks for it. Status saves from the side panel;
// delete asks once, then returns to the list.
export function ApplicationViewPage({ id }) {
  const item = useApplication(id)
  const remove = useDeleteApplication()
  const navigate = useNavigate()
  const onDelete = () => remove.mutate(id, { onSuccess: () => navigate({ to: '/dashboard/applications' }) })
  const name = `${item.firstName} ${item.lastName}`
  const address = [item.street, item.city, item.state, item.postcode, item.country].filter(Boolean).join(', ')

  return (
    <>
      <PageHeader title={name} crumbs={{ trail: [{ label: 'Applications', to: '/dashboard/applications' }] }} description={`${item.studentType} student`}>
        <Button as="a" href={`mailto:${item.email}`} variant="secondary">
          <MailIcon className="size-4.5" /> Email {item.firstName}
        </Button>
        <DeleteApplication pending={remove.isPending} onConfirm={onDelete} />
      </PageHeader>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <ViewCard id="applicant" title="About the applicant">
            <DetailList rows={[
              ['Email', item.email], ['Phone number', item.phone],
              ['Date of birth', item.dob && formatDate(item.dob)], ['Student type', item.studentType],
            ]} />
          </ViewCard>
          <ViewCard id="course" title="Course interest">
            <DetailList rows={[
              ['Course', courseName(item.course), true],
              ['Heard about us from', item.heard, true],
              ['Additional information', item.message, true],
            ]} />
          </ViewCard>
          <ViewCard id="address" title="Address">
            <DetailList rows={[['Postal address', address, true]]} />
          </ViewCard>
        </div>
        <aside className="lg:sticky lg:top-8">
          <StatusPanel item={item} />
        </aside>
      </div>
    </>
  )
}
