import { Application } from '../application/application.model.js'
import { Course } from '../course/course.model.js'
import { Enrolment } from '../enrolment/enrolment.model.js'
import { TIME_ZONE, TOP } from './stats.constants.js'
import { bucketFormat, bucketKeys, timeline } from './stats.timeline.js'

const DAY = 86_400_000
const countBy = (field) => [{ $group: { _id: field, count: { $sum: 1 } } }, { $sort: { count: -1, _id: 1 } }]
// The biggest TOP - 1 rows, then everything else folded into one "Other" row (so nothing is dropped).
const top = (rows) => {
  const named = rows.map((r) => ({ label: r._id || 'Not given', count: r.count }))
  if (named.length <= TOP) return named
  const rest = named.slice(TOP - 1).reduce((n, r) => n + r.count, 0)
  return [...named.slice(0, TOP - 1), { label: 'Other', count: rest }]
}
const byStatus = (rows) => Object.fromEntries(rows.map((r) => [r._id, r.count]))

// Everything the dashboard overview shows for the last `days` days (and the same length before it, for
// the change figures). Pipeline/status counts and "waiting" are all-time: they describe today's workload.
export async function overview(days, now = new Date()) {
  const from = new Date(now.getTime() - days * DAY)
  const before = new Date(from.getTime() - days * DAY)
  const monthly = days > 90
  const inRange = { createdAt: { $gte: from, $lte: now } }
  const perBucket = [{ $match: inRange }, { $group: { _id: { $dateToString: { date: '$createdAt', format: bucketFormat(monthly), timezone: TIME_ZONE } }, count: { $sum: 1 } } }]
  const prev = { createdAt: { $gte: before, $lt: from } }

  const [
    enrolNow, enrolPrev, appNow, appPrev, enrolDaily, appDaily, enrolStatus, appStatus,
    courses, nationalities, heard, studentTypes, courseStatus, recentEnrol, recentApp,
  ] = await Promise.all([
    Enrolment.countDocuments(inRange), Enrolment.countDocuments(prev),
    Application.countDocuments(inRange), Application.countDocuments(prev),
    Enrolment.aggregate(perBucket), Application.aggregate(perBucket),
    Enrolment.aggregate(countBy('$status')), Application.aggregate(countBy('$status')),
    Enrolment.aggregate([{ $match: inRange }, { $group: { _id: '$course.code', title: { $first: '$course.title' }, count: { $sum: 1 } } }, { $sort: { count: -1, _id: 1 } }]),
    Enrolment.aggregate([{ $match: inRange }, ...countBy('$personal.nationality')]),
    Enrolment.aggregate([{ $match: inRange }, ...countBy('$marketing.heard')]),
    Application.aggregate([{ $match: inRange }, ...countBy('$studentType')]),
    Course.aggregate(countBy('$status')),
    Enrolment.find({}, 'reference status createdAt personal.givenNames personal.lastName course.title').sort({ createdAt: -1 }).limit(TOP).lean(),
    Application.find({}, 'status createdAt firstName lastName course studentType').sort({ createdAt: -1 }).limit(TOP).lean(),
  ])

  const recent = [
    ...recentEnrol.map((e) => ({ kind: 'enrolment', id: String(e._id), name: `${e.personal.givenNames} ${e.personal.lastName}`, detail: e.course.title, status: e.status, at: e.createdAt })),
    ...recentApp.map((a) => ({ kind: 'application', id: String(a._id), name: `${a.firstName} ${a.lastName}`, detail: a.course || `${a.studentType} enquiry`, status: a.status, at: a.createdAt })),
  ].sort((a, b) => b.at - a.at).slice(0, TOP)

  return {
    range: { days, from, to: now, grouping: monthly ? 'month' : 'day' },
    totals: {
      enrolments: { current: enrolNow, previous: enrolPrev },
      applications: { current: appNow, previous: appPrev },
      waiting: { enrolments: byStatus(enrolStatus).New ?? 0, applications: byStatus(appStatus).New ?? 0 },
      courses: byStatus(courseStatus),
    },
    timeline: timeline(bucketKeys(from, now, monthly), { enrolments: enrolDaily, applications: appDaily }),
    enrolmentStatus: byStatus(enrolStatus),
    topCourses: courses.slice(0, TOP).map((c) => ({ code: c._id, label: c.title, count: c.count })),
    nationalities: top(nationalities),
    heard: top(heard),
    studentTypes: byStatus(studentTypes),
    recent,
  }
}
