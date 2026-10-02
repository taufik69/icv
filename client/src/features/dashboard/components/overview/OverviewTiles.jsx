import { BookOpenIcon, ClockIcon, FileTextIcon, PenLineIcon } from '@/shared/components/icons'
import { change, previousPeriod } from '../../lib/overviewFormat'
import { KpiTile } from './KpiTile'

// The four headline numbers: enrolments and enquiries in the period (vs the one before, with a trend
// line), what is waiting for a first look (all time), and live courses.
export function OverviewTiles({ stats, days }) {
  const { enrolments, applications, waiting, courses } = stats.totals
  const caption = `vs ${previousPeriod(days)}`
  const waitingTotal = waiting.enrolments + waiting.applications
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiTile label="Enrolment applications" Icon={PenLineIcon} value={enrolments.current} change={change(enrolments.current, enrolments.previous)} caption={caption}
        trend={stats.timeline.map((d) => d.enrolments)} to="/dashboard/enrolments" />
      <KpiTile label="Course enquiries" Icon={FileTextIcon} value={applications.current} change={change(applications.current, applications.previous)} caption={caption}
        trend={stats.timeline.map((d) => d.applications)} to="/dashboard/applications" />
      <KpiTile label="Waiting for review" Icon={ClockIcon} value={waitingTotal} to="/dashboard/enrolments" search={{ status: 'New' }}
        note={waitingTotal ? `${waiting.enrolments} enrolments and ${waiting.applications} enquiries are still New` : 'Everything has been picked up'} />
      <KpiTile label="Live courses" Icon={BookOpenIcon} value={courses.active ?? 0} to="/dashboard/courses"
        note={`${courses.inactive ?? 0} inactive, ${courses.draft ?? 0} draft`} />
    </div>
  )
}
