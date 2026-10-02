import { useEffect, useRef } from 'react'
import { saveDraft } from '../lib/enrolmentDraft'

// Saves the draft a moment after the student stops typing (not only on "Save and continue"), so a
// reload or a closed tab keeps every answer. `onSaved` gets the time to show in the "saved" note.
export function useDraftAutosave({ values, saved, step }, onSaved) {
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const timer = setTimeout(() => {
      const savedAt = new Date().toISOString()
      if (saveDraft({ values, saved, step, savedAt })) onSaved(savedAt)
    }, 600)
    return () => clearTimeout(timer)
    // onSaved is a state setter wrapper; only answer / progress changes should trigger a save.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, saved, step])
}
