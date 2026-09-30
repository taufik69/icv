import { BookmarkIcon } from '@/shared/components/icons'

// Round bookmark on the card photo (sits above the card's stretched link).
export function SaveButton({ title, saved, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      className={`absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full backdrop-blur-sm transition ${
        saved ? 'bg-secondary text-white' : 'bg-white/90 text-secondary hover:bg-white'
      }`}
    >
      <BookmarkIcon className="size-4" fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}
