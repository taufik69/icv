import { describe, expect, it } from 'vitest'
import { linePath, niceTicks, scale, spacedIndexes } from './chartScale'

describe('chartScale', () => {
  it('rounds the axis up to whole, even steps and stops at the max', () => {
    expect(niceTicks(0)).toEqual([0, 1])
    expect(niceTicks(2)).toEqual([0, 1, 2])
    expect(niceTicks(7)).toEqual([0, 2, 4, 6, 8])
    expect(niceTicks(10)).toEqual([0, 5, 10])
    expect(niceTicks(130)).toEqual([0, 50, 100, 150])
  })

  it('maps values between ranges, and a flat domain to the start', () => {
    expect(scale(0, 10, 0, 100)(5)).toBe(50)
    expect(scale(0, 4, 200, 0)(1)).toBe(150)
    expect(scale(3, 3, 10, 20)(3)).toBe(10)
  })

  it('spaces axis labels evenly, keeping the first and last', () => {
    expect(spacedIndexes(3)).toEqual([0, 1, 2])
    expect(spacedIndexes(31, 4)).toEqual([0, 10, 20, 30])
    expect(spacedIndexes(13, 7)).toEqual([0, 2, 4, 6, 8, 10, 12])
  })

  it('draws a path through the points', () => {
    expect(linePath([[0, 10], [5.25, 2]])).toBe('M0.0,10.0L5.3,2.0')
  })
})
