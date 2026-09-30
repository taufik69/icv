import { useEffect, useRef, useState } from 'react'

// Keyboard + pointer behaviour for a single-select listbox popup (WAI-ARIA "select-only combobox" pattern):
// Enter/Space/arrows open it, arrows/Home/End move, Enter/Space pick, Escape/Tab/outside click close.
export function useListbox({ options, value, onSelect }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const selectedIndex = options.findIndex((o) => o.value === value)

  const show = () => {
    setActive(Math.max(selectedIndex, 0))
    setOpen(true)
  }
  const close = (refocus = true) => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }
  const pick = (i) => {
    onSelect(options[i].value)
    close()
  }

  useEffect(() => {
    if (!open) return
    listRef.current?.focus()
    const onDown = (e) => !rootRef.current?.contains(e.target) && close(false)
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const onTriggerKeyDown = (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      show()
    }
  }

  const onListKeyDown = (e) => {
    const last = options.length - 1
    const moves = { ArrowDown: Math.min(active + 1, last), ArrowUp: Math.max(active - 1, 0), Home: 0, End: last }
    if (e.key in moves) {
      e.preventDefault()
      setActive(moves[e.key])
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(active)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      close(false)
    }
  }

  return { open, active, setActive, rootRef, triggerRef, listRef, toggle: () => (open ? close() : show()), pick, onTriggerKeyDown, onListKeyDown }
}
