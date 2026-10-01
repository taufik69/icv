import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { courseBlockIds } from '../../data/courseFormBlocks'
import { OutlineList } from './OutlineList'

// lg+ sidebar: the course page as a spine of blocks, pinned while the page scrolls (its column must stretch
// to the page height — see `self-stretch` on the aside). With `linked`, the section on screen is highlighted
// and each step jumps to its section. Scrolls inside itself on short screens.
export function BlocksRail({ blocks, caption = 'Green blocks appear on the course page.', linked = true }) {
  const active = useActiveSection(courseBlockIds)
  const filled = blocks.filter((b) => b.filled).length

  return (
    <nav aria-label="Page outline" className="sticky top-8 flex max-h-[calc(100svh-4rem)] flex-col rounded-2xl bg-secondary text-white shadow-brand">
      <div className="border-b border-white/10 p-5 pb-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-heading text-base text-white">Page outline</h2>
          <span className="text-xs text-white/80 tabular-nums">{filled} of {blocks.length} filled</span>
        </div>
        <p className="mt-2.5 text-xs text-white/80">{caption}</p>
      </div>
      <div className="overflow-y-auto p-5 pt-4">
        <OutlineList blocks={blocks} active={linked ? active : null} linked={linked} />
      </div>
    </nav>
  )
}
