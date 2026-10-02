import { useState } from 'react'
import { useUpdateEnrolment } from '../../hooks/useEnrolmentMutations'

// Staff-only note on an enrolment (never shown to the student). Save is enabled once the text changes.
export function StaffNote({ item }) {
  const [text, setText] = useState(item.staffNote ?? '')
  const update = useUpdateEnrolment()
  const changed = text.trim() !== (item.staffNote ?? '')

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); update.mutate({ id: item.id, staffNote: text.trim() }) }}
      className="mt-4 grid gap-2 border-t border-white/10 pt-5"
    >
      <label htmlFor="enrol-note" className="text-sm text-white/80">Staff note</label>
      <textarea
        id="enrol-note" rows={4} value={text} onChange={(e) => setText(e.target.value)} maxLength={5000}
        placeholder="e.g. Passport checked, waiting for IELTS"
        className="resize-y rounded-xl bg-white/10 px-3.5 py-2.5 text-sm text-white ring-1 ring-white/20 placeholder:text-white/50 focus:ring-primary focus:outline-none"
      />
      <div className="flex items-center justify-between gap-3">
        <p role="status" className="text-xs text-white/80">
          {update.isPending ? 'Saving…' : update.isError ? `Couldn't save: ${update.error.message}` : update.isSuccess && !changed ? 'Note saved' : ''}
        </p>
        <button type="submit" disabled={!changed || update.isPending} className="rounded-pill bg-white px-4 py-1.5 font-heading text-sm font-semibold text-secondary transition hover:bg-primary-soft disabled:opacity-40">
          Save note
        </button>
      </div>
    </form>
  )
}
