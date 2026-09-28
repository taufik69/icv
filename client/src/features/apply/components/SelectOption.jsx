import { Fragment } from 'react'
import { CheckIcon } from '@/shared/components/icons'

// One row in ApplySelect's list, with an optional group heading above it.
export function SelectOption({ id, index, option, heading, selected, active, onHover, onPick }) {
  return (
    <Fragment>
      {heading && (
        <li role="presentation" className="px-3 pt-3 pb-1.5 text-xs font-semibold text-ink-subtle first:pt-1.5">{heading}</li>
      )}
      <li
        id={id}
        role="option"
        aria-selected={selected}
        data-index={index}
        onPointerMove={onHover}
        onClick={onPick}
        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${active ? 'bg-primary-soft' : ''} ${selected ? 'font-semibold text-secondary' : 'text-ink'}`}
      >
        {/* Code sits above the title on phones, in its own column from sm. */}
        <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
          {option.badge && (
            <span className={`block font-heading text-xs font-bold sm:w-24 sm:shrink-0 ${selected ? 'text-primary-hover' : 'text-ink-subtle'}`}>{option.badge}</span>
          )}
          <span className="block leading-snug">{option.label}</span>
        </span>
        <CheckIcon className={`size-4.5 shrink-0 text-primary-hover ${selected ? '' : 'invisible'}`} />
      </li>
    </Fragment>
  )
}
