import { useEffect, useRef, useState } from 'react'
import { ChatIcon, CloseIcon } from '@/shared/components/icons'
import { contactActions } from '@/shared/config/contactActions'
import { arcPoints } from '@/shared/lib/arcPoints'
import { FabItem } from './FabItem'

const RADIUS = 140
const points = arcPoints(contactActions.length, RADIUS)
const CLOSE_MS = contactActions.length * 70 + 300

// Circle-menu contact button: items spring out along an arc (staggered); closing spins the
// ring back with a blur while the trigger shakes and swells (styles/fab.css).
export function ContactFab() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const ref = useRef(null)

  const close = () => {
    setOpen(false)
    setClosing(true)
    setTimeout(() => setClosing(false), CLOSE_MS)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    const onDown = (e) => !ref.current?.contains(e.target) && close()
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div ref={ref} className="fixed right-4 bottom-28 z-40 size-14 md:right-6 md:bottom-6">
      <div className={`absolute inset-0 ${closing ? 'motion-safe:animate-[fab-spin-close_550ms_linear]' : ''}`}>
        {contactActions.map((action, i) => (
          <FabItem key={action.label} action={action} point={points[i]} index={i} open={open} />
        ))}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Contact us'}
        onClick={() => (open ? close() : setOpen(true))}
        className={`relative grid size-14 place-items-center rounded-full bg-secondary text-white shadow-brand ring-4 ring-white/80 transition hover:brightness-125 ${closing ? 'motion-safe:animate-[fab-trigger-close_450ms_linear]' : ''}`}
      >
        {!open && !closing && <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" />}
        <span key={open ? 'x' : 'chat'} className="motion-safe:animate-[fab-icon-in_200ms_ease-out]">
          {open ? <CloseIcon className="size-6" /> : <ChatIcon className="size-6" />}
        </span>
      </button>
    </div>
  )
}
