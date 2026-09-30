import { useRef, useState } from 'react'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { useSlidingIndicator } from '@/shared/hooks/useSlidingIndicator'
import { smoothScrollTo } from '@/shared/lib/smoothScrollTo'

// "On this page" nav behaviour: scroll-spy picks the active section; a click eases the page to its section
// (the clicked item stays lit while the page travels), writes the hash, then flags the card `data-landed`
// for a short arrival animation. A navy pill slides to the active item (listRef / itemRef).
export function useSectionNav(ids) {
  const spied = useActiveSection(ids) ?? ids[0]
  const [pinned, setPinned] = useState(null)
  const listRef = useRef(null)
  const itemRefs = useRef({})
  const active = pinned ?? spied

  useSlidingIndicator(listRef, itemRefs, active)

  const go = (id) => (e) => {
    const section = document.getElementById(id)
    if (!section) return
    e.preventDefault()
    setPinned(id)
    window.history.replaceState(null, '', `#${id}`)
    smoothScrollTo(section).then(() => {
      setPinned(null)
      section.dataset.landed = ''
      setTimeout(() => delete section.dataset.landed, 900)
    })
  }

  return { active, go, listRef, itemRef: (id) => (el) => (itemRefs.current[id] = el) }
}
