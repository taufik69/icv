import { useEffect, useState } from 'react'
import { CloseIcon, LayersIcon } from '@/shared/components/icons'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { courseBlockIds } from '../../data/courseFormBlocks'
import { OutlineList } from './OutlineList'

// Below lg: a floating "Sections" button (showing the section on screen) that opens the outline as a
// bottom sheet; picking a step jumps there and closes it. Esc or the backdrop also close it.
export function MobileOutline({ blocks }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(courseBlockIds)
  const current = blocks.find((b) => b.id === active)?.label ?? blocks[0].label

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="btn-shine fixed right-4 bottom-4 z-30 flex max-w-[calc(100vw-2rem)] items-center gap-2.5 rounded-pill bg-secondary py-3 pr-5 pl-4 font-heading text-sm font-semibold text-white shadow-brand"
      >
        <LayersIcon className="size-4.5 shrink-0 text-primary" />
        <span className="truncate">Sections<span className="font-normal text-white/80"> · {current}</span></span>
      </button>

      {open && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Page outline">
          <button type="button" aria-label="Close outline" onClick={() => setOpen(false)} className="absolute inset-0 bg-secondary-dark/60 backdrop-blur-sm motion-safe:animate-[fade-in_200ms_ease-out]" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[80svh] flex-col rounded-t-3xl bg-secondary text-white shadow-elevated motion-safe:animate-[sheet-up_250ms_ease-out]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-heading text-base text-white">Page outline</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close outline" className="grid size-9 place-items-center rounded-lg text-white/85 hover:bg-white/10 hover:text-white">
                <CloseIcon className="size-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <OutlineList blocks={blocks} active={active} onPick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
