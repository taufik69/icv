import { describe, expect, it } from 'vitest'
import { safeRedirect } from './safeRedirect'

describe('safeRedirect', () => {
  it('keeps dashboard paths, with their search', () => {
    expect(safeRedirect('/dashboard/applications?status=New')).toBe('/dashboard/applications?status=New')
    expect(safeRedirect('/dashboard')).toBe('/dashboard')
  })

  it('refuses other sites, other pages and the login page itself', () => {
    for (const bad of ['https://evil.example', '//evil.example/dashboard', '/about', '/dashboardx', '/dashboard/login?redirect=/x', undefined, 42]) {
      expect(safeRedirect(bad)).toBe('/dashboard')
    }
  })
})
