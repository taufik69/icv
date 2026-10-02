import { overviewRanges } from '../../data/overviewRanges'
import { useOverviewStats } from '../../hooks/useOverviewStats'
import { PageHeader } from '../shell/PageHeader'
import { OverviewCharts } from './OverviewCharts'
import { OverviewTiles } from './OverviewTiles'
import { RangePicker } from './RangePicker'

// Dashboard home: one period switch on top scopes the headline numbers and every chart below it, all from
// GET /admin/stats. Changing the period keeps the current numbers on screen, faded, until the new ones land.
export function OverviewPage({ days }) {
  const { stats, updating } = useOverviewStats(days)
  const period = `last ${overviewRanges.find((r) => r.days === days).label}`

  // Left-aligned paragraphs here (the site justifies them, which gaps short notes badly).
  return (
    <div className="[&_p]:text-left">
      <PageHeader title="Dashboard" crumbs={{ current: 'Overview' }} description="How enrolments and course enquiries are going, from live website submissions.">
        <RangePicker days={days} />
      </PageHeader>
      <div aria-busy={updating} className={`mt-8 grid gap-4 transition-opacity duration-300 ${updating ? 'opacity-60' : ''}`}>
        <OverviewTiles stats={stats} days={days} />
        <OverviewCharts stats={stats} period={period} />
      </div>
    </div>
  )
}
