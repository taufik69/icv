import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Unmount whatever a test rendered, so tests never see each other's DOM.
afterEach(cleanup)

// jsdom has no scrolling; components call scrollIntoView after step changes.
Element.prototype.scrollIntoView ??= () => {}

// jsdom has no modal <dialog>: open/close it the way browsers do (the `open` attribute + a close event).
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() { this.setAttribute('open', '') }
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}
