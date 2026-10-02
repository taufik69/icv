import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChartCard } from './ChartCard'
import { ColumnChart } from './ColumnChart'
import { DonutChart } from './DonutChart'
import { KpiTile } from './KpiTile'
import { PipelineChart } from './PipelineChart'
import { RankList } from './RankList'
import { SplitBar } from './SplitBar'

describe('overview parts', () => {
  it('PipelineChart leads with the enrolled share and keeps every status, zero included', () => {
    const { container } = render(<PipelineChart status={{ New: 3, 'In review': 1, Enrolled: 1, Declined: 1 }} />)
    expect(screen.getByText(/enrolled, 1 of 6/).parentElement).toHaveTextContent('17% enrolled') // headline share
    expect(screen.getByText(/enrolled, 1 of 6 applications/)).toBeInTheDocument()
    for (const s of ['New', 'In review', 'Offer sent', 'Enrolled', 'Declined', 'Withdrawn']) expect(screen.getByText(s)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Offer sent 0/ })).toBeInTheDocument()
    expect([...container.querySelectorAll('[role=img] span')].map((el) => el.style.width)).toEqual(['50%', '16.666666666666664%', '16.666666666666664%', '16.666666666666664%'])
    render(<PipelineChart status={{}} />)
    expect(screen.getByText('No enrolment applications yet.')).toBeInTheDocument()
  })

  it('RankList numbers the rows and shows each share', () => {
    render(<RankList rows={[{ label: 'Carpentry', sub: 'CPC30220', count: 3 }, { label: 'Ageing Support', sub: 'CHC43015', count: 1 }]} />)
    const first = screen.getByText('Carpentry').closest('li')
    expect(first).toHaveTextContent('1')
    expect(first).toHaveTextContent('75%')
    expect(screen.getByText('Ageing Support').closest('li')).toHaveTextContent('25%')
  })

  it('ColumnChart sizes columns against a round axis and labels every value', () => {
    const { container } = render(<ColumnChart rows={[{ label: 'Indian', count: 2 }, { label: 'Nepali', count: 1 }]} />)
    expect(screen.getByTitle('Indian')).toBeInTheDocument()
    expect([...container.querySelectorAll('li span.bg-chart-1')].map((el) => el.style.height)).toEqual(['100%', '50%'])
  })

  it('DonutChart shows the total in the middle and every part in the legend', () => {
    render(<DonutChart totalLabel="applications" parts={[{ label: 'Agent', count: 3, fill: 'stroke-chart-1', bg: 'bg-chart-1' }, { label: 'Events', count: 1, fill: 'stroke-chart-5', bg: 'bg-chart-5' }]} />)
    expect(screen.getByRole('img', { name: 'Agent 3, Events 1' })).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('Agent').closest('li')).toHaveTextContent('75%')
  })

  it('SplitBar shows counts and shares', () => {
    render(<SplitBar parts={[{ label: 'Domestic', count: 7, bg: 'bg-chart-1' }, { label: 'International', count: 3, bg: 'bg-chart-2' }]} />)
    expect(screen.getByRole('img', { name: 'Domestic 7, International 3' })).toBeInTheDocument()
    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(screen.getByText('30%')).toBeInTheDocument()
  })

  it('KpiTile states the change in words, not just colour', () => {
    render(<KpiTile label="Enrolment applications" value={8} change={{ text: '+20%', direction: 'up' }} caption="vs the previous 30 days" />)
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText(/\+20%/)).toHaveClass('text-success-ink')
    expect(screen.getByText(/\+20%/).parentElement).toHaveTextContent('↑ +20% vs the previous 30 days')
  })

  it('ChartCard switches between the chart and its table', () => {
    const table = { caption: 'Sources', columns: [{ key: 'label', label: 'Source' }, { key: 'count', label: 'Count', numeric: true }], rows: [{ label: 'Agent', count: 4 }] }
    render(<ChartCard id="heard" title="How students heard" table={table}><p>chart here</p></ChartCard>)
    fireEvent.click(screen.getByRole('button', { name: 'Show table' }))
    const grid = screen.getByRole('table', { name: 'Sources' })
    expect(within(grid).getByText('Agent')).toBeInTheDocument()
    expect(screen.queryByText('chart here')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show chart' })).toHaveAttribute('aria-pressed', 'true')
  })
})
