import { useEffect } from 'react'

// Keeps a sliding highlight under the active item of a list: writes the item's box relative to the list to
// CSS variables on it (--ind-x / --ind-y / --ind-w / --ind-h), re-measured when the list or item resizes.
// Works for horizontal and vertical lists. `itemRefs` is a ref holding { [key]: element }.
export function useSlidingIndicator(listRef, itemRefs, active) {
  useEffect(() => {
    const list = listRef.current
    const item = itemRefs.current[active]
    if (!list || !item) return
    const measure = () => {
      const l = list.getBoundingClientRect()
      const r = item.getBoundingClientRect()
      list.style.setProperty('--ind-x', `${r.left - l.left + list.scrollLeft - list.clientLeft}px`)
      list.style.setProperty('--ind-y', `${r.top - l.top + list.scrollTop - list.clientTop}px`)
      list.style.setProperty('--ind-w', `${r.width}px`)
      list.style.setProperty('--ind-h', `${r.height}px`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    observer.observe(item)
    return () => observer.disconnect()
  }, [listRef, itemRefs, active])
}
