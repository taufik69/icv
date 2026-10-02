import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mmss, useCountdown } from './useCountdown'

describe('useCountdown', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('counts down to 0 once a second', () => {
    const until = new Date(Date.now() + 5 * 60_000)
    const { result } = renderHook(() => useCountdown(until))
    expect(result.current).toBe(300)
    act(() => vi.advanceTimersByTime(61_000))
    expect(result.current).toBe(239)
    act(() => vi.advanceTimersByTime(300_000))
    expect(result.current).toBe(0)
  })

  it('formats minutes and seconds', () => {
    expect(mmss(300)).toBe('5:00')
    expect(mmss(59)).toBe('0:59')
    expect(mmss(61)).toBe('1:01')
  })
})
