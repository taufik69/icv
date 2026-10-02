import { useEffect, useRef } from 'react'
import { useEnquiryModal } from '@/shared/lib/enquiryModal'
import { courseOptions } from '../../data/applyOptions'
import { useEnquiryWizard } from '../../hooks/useEnquiryWizard'
import { ApplySuccess } from '../ApplySuccess'
import { EnquiryWizard } from './EnquiryWizard'

const knownCourse = (code) => (courseOptions.some((c) => c.code === code) ? code : undefined)

// The enquiry form in a popup over the current page, opened by any "Enquire" link (see AppLink). A native
// modal <dialog>: focus stays inside, Esc / × / a click on the dimmed backdrop closes it, and the page
// behind stops scrolling. Each opening starts a fresh form, with the link's course already picked.
export function EnquiryDialog() {
  const modal = useEnquiryModal()
  if (!modal?.request) return null
  return <EnquiryPopup key={modal.request.id} course={knownCourse(modal.request.course)} onClose={modal.close} />
}

function EnquiryPopup({ course, onClose }) {
  const ref = useRef(null)
  const form = useEnquiryWizard(course ? { course } : undefined)

  useEffect(() => {
    if (!ref.current.open) ref.current.showModal()
    const root = document.documentElement
    root.style.overflow = 'hidden'
    return () => { root.style.overflow = '' }
  }, [])

  return (
    <dialog
      ref={ref} aria-label="Enquire to ICV" onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-3xl bg-transparent p-0 backdrop:bg-secondary-dark/70 backdrop:backdrop-blur-sm motion-safe:animate-[fade-in_200ms_ease-out]"
    >
      {form.sent ? (
        <div className="relative rounded-3xl bg-surface p-6 md:p-10" onClickCapture={(e) => e.target.closest('a') && onClose()}>
          <ApplySuccess name={form.values.firstName} />
          <button type="button" onClick={onClose} className="mt-2 font-heading text-sm font-semibold text-ink-muted hover:text-secondary">Close</button>
        </div>
      ) : (
        <EnquiryWizard form={form} onClose={onClose} />
      )}
    </dialog>
  )
}
