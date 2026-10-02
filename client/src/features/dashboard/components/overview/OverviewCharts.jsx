import { overviewTables } from '../../lib/overviewTables'
import { ChartCard } from './ChartCard'
import { ColumnChart } from './ColumnChart'
import { DonutChart } from './DonutChart'
import { PipelineChart } from './PipelineChart'
import { RankList } from './RankList'
import { RecentActivity } from './RecentActivity'
import { SplitBar } from './SplitBar'
import { TrendChart } from './TrendChart'

// Series in fixed order: applications (enrolment form) always chart-1 (blue), enquiries always chart-2 (green).
const series = [
  { key: 'enrolments', label: 'Applications', stroke: 'stroke-chart-1', fill: 'fill-chart-1', bg: 'bg-chart-1' },
  { key: 'applications', label: 'Enquiries', stroke: 'stroke-chart-2', fill: 'fill-chart-2', bg: 'bg-chart-2' },
]

// "How did you hear" sources in the form's order, each with a fixed colour. The donut draws them in this
// order, so neighbouring slices are always the colour pairs that passed the colour-blindness check.
// (Full class names, so Tailwind generates them.)
const SOURCES = [
  { label: 'Agent', fill: 'stroke-chart-1', bg: 'bg-chart-1' },
  { label: 'Google Search', fill: 'stroke-chart-3', bg: 'bg-chart-3' },
  { label: 'Facebook', fill: 'stroke-chart-4', bg: 'bg-chart-4' },
  { label: 'Government Websites', fill: 'stroke-chart-2', bg: 'bg-chart-2' },
  { label: 'Events', fill: 'stroke-chart-5', bg: 'bg-chart-5' },
  { label: 'Other', fill: 'stroke-chart-6', bg: 'bg-chart-6' },
]
const sourceParts = (heard) => SOURCES.map((s) => ({ ...s, count: heard.find((h) => h.label === s.label)?.count ?? 0 })).filter((p) => p.count)

// Charts under the tiles: trend (wide) + pipeline; courses, nationalities, sources; student types + recent.
export function OverviewCharts({ stats, period }) {
  const t = overviewTables(stats)
  const { studentTypes: st } = stats
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <ChartCard id="trend" title="Submissions over time" subtitle={`Applications and enquiries, ${period}, by ${stats.range.grouping}`} table={t.timeline} className="xl:col-span-2">
        <TrendChart data={stats.timeline} series={series} label={`Line chart of applications and enquiries per ${stats.range.grouping}, ${period}. Use the table view for exact values.`} />
      </ChartCard>
      <ChartCard id="pipeline" title="Application pipeline" subtitle="Every application, by where it is now" table={t.pipeline}>
        <PipelineChart status={stats.enrolmentStatus} />
      </ChartCard>
      <ChartCard id="courses" title="Top courses" subtitle={`Applications, ${period}`} table={t.courses}>
        <RankList rows={stats.topCourses.map((c) => ({ label: c.label, sub: c.code, count: c.count }))} />
      </ChartCard>
      <ChartCard id="nationalities" title="Nationalities" subtitle={`Applications, ${period}`} table={t.nationalities}>
        <ColumnChart rows={stats.nationalities} />
      </ChartCard>
      <ChartCard id="heard" title="How students heard about ICV" subtitle={`Applications, ${period}`} table={t.heard}>
        <DonutChart parts={sourceParts(stats.heard)} totalLabel="applications" />
      </ChartCard>
      <ChartCard id="types" title="Enquiries by student type" subtitle={`Enquiries, ${period}`} table={t.studentTypes}>
        <SplitBar parts={[
          { label: 'Domestic', count: st.Domestic ?? 0, bg: 'bg-chart-1' },
          { label: 'International', count: st.International ?? 0, bg: 'bg-chart-2' },
        ]} />
      </ChartCard>
      <ChartCard id="recent" title="Recent activity" subtitle="Latest applications and enquiries, newest first" className="xl:col-span-2">
        <RecentActivity items={stats.recent} />
      </ChartCard>
    </div>
  )
}
