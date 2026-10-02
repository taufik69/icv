import { describe, expect, it } from 'vitest'
import { overviewTables } from './overviewTables'

const stats = {
  range: { grouping: 'day' },
  timeline: [{ date: '2026-10-01', enrolments: 1, applications: 0 }, { date: '2026-10-02', enrolments: 2, applications: 3 }],
  enrolmentStatus: { New: 3, Enrolled: 1 },
  topCourses: [{ code: 'CPC30220', label: 'Certificate III in Carpentry', count: 2 }],
  nationalities: [{ label: 'Indian', count: 2 }],
  heard: [{ label: 'Agent', count: 4 }],
  studentTypes: { Domestic: 7, International: 3 },
}

describe('overviewTables', () => {
  it('gives every chart a table, newest day first', () => {
    const t = overviewTables(stats)
    expect(Object.keys(t)).toEqual(['timeline', 'pipeline', 'courses', 'nationalities', 'heard', 'studentTypes'])
    expect(t.timeline.rows[0]).toEqual({ date: 'Fri, 2 Oct', enrolments: 2, applications: 3 })
    expect(t.timeline.columns[0].label).toBe('Day')
  })

  it('turns counts by name into rows', () => {
    const t = overviewTables(stats)
    expect(t.pipeline.rows).toEqual([{ label: 'New', count: 3 }, { label: 'Enrolled', count: 1 }])
    expect(t.courses.rows).toEqual([{ label: 'CPC30220 Certificate III in Carpentry', count: 2 }])
    expect(t.studentTypes.rows).toHaveLength(2)
  })

  it('labels the timeline by month for a year', () => {
    expect(overviewTables({ ...stats, range: { grouping: 'month' }, timeline: [{ date: '2026-09', enrolments: 7, applications: 10 }] }).timeline.columns[0].label).toBe('Month')
  })
})
