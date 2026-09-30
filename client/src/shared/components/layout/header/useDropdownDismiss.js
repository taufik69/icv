import { useState } from 'react'

// Hover/focus dropdowns stay open while focus is inside them, so after a row is clicked we blur it and
// hold the menu shut until the pointer leaves the nav item (then hover works again).
export function useDropdownDismiss() {
  const [closed, setClosed] = useState(false)
  const dismiss = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    setClosed(true)
  }
  const reset = () => setClosed(false)
  return { closed, dismiss, reset }
}
