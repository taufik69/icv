import { useEffect, useRef, useState } from 'react'

const SPY_LINE = 200 // px from the top: just under the site header + sticky tab bar

// Section tabs that scroll instead of switching: clicking smooth-scrolls to the section and writes the
// hash; while you scroll, the tab of the section under the tab bar lights up (scroll-spy). A hash in
// the URL (#fees) scrolls there on load. The active tab is kept centred in the bar on phones.
export function useCourseTabs(ids) {
  const [active, setActive] = useState(ids[0])
  const lockUntil = useRef(0)
  const listRef = useRef(null)
  const tabRefs = useRef({})
  const key = ids.join()

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      if (Date.now() < lockUntil.current) return
      const passed = ids.filter((id) => document.getElementById(id)?.getBoundingClientRect().top <= SPY_LINE)
      setActive(passed.at(-1) ?? ids[0])
    }
    const onScroll = () => (frame ||= requestAnimationFrame(check))
    window.addEventListener('scroll', onScroll, { passive: true })
    const initial = window.location.hash.slice(1)
    if (ids.includes(initial)) document.fonts.ready.then(() => document.getElementById(initial)?.scrollIntoView())
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const list = listRef.current
    const tab = tabRefs.current[active]
    if (list && tab) list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  const go = (id) => (e) => {
    e.preventDefault()
    setActive(id)
    lockUntil.current = Date.now() + 900
    window.history.replaceState(null, '', `#${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { active, go, listRef, tabRef: (id) => (el) => (tabRefs.current[id] = el) }
}
