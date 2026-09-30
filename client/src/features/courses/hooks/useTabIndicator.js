import { useEffect } from 'react'

// Keeps the sliding pill under the active tab: writes its offset / width to CSS variables on the list
// (--tab-x / --tab-w), re-measured when the list or the tab resizes (fonts loading, viewport changes).
export function useTabIndicator(listRef, tabRefs, active) {
  useEffect(() => {
    const list = listRef.current
    const tab = tabRefs.current[active]
    if (!list || !tab) return
    const measure = () => {
      const x = tab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft - list.clientLeft
      list.style.setProperty('--tab-x', `${x}px`)
      list.style.setProperty('--tab-w', `${tab.offsetWidth}px`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    observer.observe(tab)
    return () => observer.disconnect()
  }, [listRef, tabRefs, active])
}
