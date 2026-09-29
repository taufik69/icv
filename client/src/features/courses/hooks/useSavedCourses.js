import { useState } from 'react'

const KEY = 'icv-saved-courses'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

// Bookmarked course ids, remembered in this browser only (a convenience, so storage failures are ignored).
export function useSavedCourses() {
  const [saved, setSaved] = useState(read)

  const toggle = (id) =>
    setSaved((list) => {
      const next = list.includes(id) ? list.filter((v) => v !== id) : [...list, id]
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        // private mode / blocked storage: keep the in-memory list
      }
      return next
    })

  return { saved, isSaved: (id) => saved.includes(id), toggle }
}
