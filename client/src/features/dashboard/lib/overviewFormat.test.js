import { describe, expect, it } from 'vitest'
import { bucketLabel, change, compact, previousPeriod } from './overviewFormat'

describe('overviewFormat', () => {
  it('describes the change against the previous period', () => {
    expect(change(12, 10)).toEqual({ text: '+20%', direction: 'up' })
    expect(change(5, 10)).toEqual({ text: '-50%', direction: 'down' })
    expect(change(10, 10)).toEqual({ text: 'No change', direction: 'flat' })
    expect(change(4, 0)).toEqual({ text: 'New this period', direction: 'new' })
    expect(change(0, 0)).toEqual({ text: 'No change', direction: 'flat' })
  })

  it('labels day and month buckets', () => {
    expect(bucketLabel('2026-10-02')).toBe('2 Oct')
    expect(bucketLabel('2026-10-02', true)).toBe('Fri, 2 Oct')
    expect(bucketLabel('2026-09')).toBe('Sept 2026')
  })

  it('shortens big numbers and names the comparison period', () => {
    expect(compact(8)).toBe('8')
    expect(compact(1284)).toBe('1.3K')
    expect(previousPeriod(30)).toBe('the previous 30 days')
    expect(previousPeriod(365)).toBe('the previous 12 months')
  })
})
