const time = (iso) => new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

// "Saved on this device" status line for the draft.
export function SavedNote({ savedAt }) {
  return (
    <p aria-live="polite">
      {savedAt ? `Draft saved on this device, ${time(savedAt)}.` : 'Your progress is saved on this device after each step.'}
    </p>
  )
}
