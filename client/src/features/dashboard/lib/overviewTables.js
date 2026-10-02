import { bucketLabel } from './overviewFormat'

const count = { key: 'count', label: 'Count', numeric: true }

// Table views (DataTable props) for every overview chart, from the API's overview numbers.
export function overviewTables(stats) {
  const list = (caption, label, rows) => ({ caption, columns: [{ key: 'label', label }, count], rows })
  return {
    timeline: {
      caption: 'Submissions over time',
      columns: [{ key: 'date', label: stats.range.grouping === 'month' ? 'Month' : 'Day' }, { key: 'enrolments', label: 'Enrolments', numeric: true }, { key: 'applications', label: 'Enquiries', numeric: true }],
      rows: [...stats.timeline].reverse().map((d) => ({ ...d, date: bucketLabel(d.date, true) })),
    },
    pipeline: list('Enrolments by status', 'Status', Object.entries(stats.enrolmentStatus).map(([label, n]) => ({ label, count: n }))),
    courses: list('Enrolments by course', 'Course', stats.topCourses.map((c) => ({ label: `${c.code} ${c.label}`, count: c.count }))),
    nationalities: list('Enrolments by nationality', 'Nationality', stats.nationalities),
    heard: list('How students heard about ICV', 'Source', stats.heard),
    studentTypes: list('Enquiries by student type', 'Student type', Object.entries(stats.studentTypes).map(([label, n]) => ({ label, count: n }))),
  }
}
