import { Link } from '@tanstack/react-router'
import { ChevronDownIcon } from '@/shared/components/icons'

// In-page section shortcuts under the hero title (targets have scroll-mt so the fixed header clears them).
export function JumpLinks({ links }) {
  return (
    <nav aria-label="On this page" className="mt-10">
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.hash}>
            <Link
              to="/about/student-wellbeing"
              hash={link.hash}
              hashScrollIntoView={{ behavior: 'smooth' }}
              className="group inline-flex items-center gap-2 rounded-pill bg-white/10 px-4 py-2 font-heading text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-primary hover:text-on-primary hover:ring-primary"
            >
              {link.label}
              <ChevronDownIcon className="size-4 text-primary transition group-hover:translate-y-0.5 group-hover:text-on-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
