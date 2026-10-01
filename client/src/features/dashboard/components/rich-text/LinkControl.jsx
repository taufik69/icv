import { useState } from 'react'
import { LinkIcon } from '@/shared/components/icons'
import { ToolbarButton } from './ToolbarButton'

// Link button with a small inline form: paste a URL to link the selected text, or remove the link.
export function LinkControl({ editor, active }) {
  const [open, setOpen] = useState(false)
  const [href, setHref] = useState('')

  const toggle = () => {
    setHref(editor.getAttributes('link').href ?? '')
    setOpen((o) => !o)
  }
  const apply = (url) => {
    const chain = editor.chain().focus().extendMarkRange('link')
    ;(url ? chain.setLink({ href: url }) : chain.unsetLink()).run()
    setOpen(false)
  }

  return (
    <div className="relative">
      <ToolbarButton label="Link" icon={LinkIcon} active={active || open} onClick={toggle} />
      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 flex w-80 max-w-[80vw] gap-2 rounded-xl bg-surface p-2 shadow-elevated ring-1 ring-line">
          <input
            autoFocus
            type="url"
            value={href}
            placeholder="https://…"
            aria-label="Link address"
            onChange={(e) => setHref(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); apply(href.trim()) }
              if (e.key === 'Escape') setOpen(false)
            }}
            className="min-w-0 flex-1 rounded-lg border border-line px-3 py-1.5 text-sm focus:border-primary-hover focus:outline-none"
          />
          <button type="button" onClick={() => apply(href.trim())} className="rounded-lg bg-secondary px-3 text-sm font-semibold text-white hover:bg-secondary-dark">
            {href ? 'Apply' : 'Remove'}
          </button>
        </div>
      )}
    </div>
  )
}
