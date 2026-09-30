import { PlusIcon } from '@/shared/components/icons'

const corners = ['-top-3 -left-3', '-top-3 -right-3', '-bottom-3 -left-3', '-bottom-3 -right-3']
const tones = {
  dark: { card: 'border-white/25 bg-white/4 hover:border-white/50 hover:bg-white/7', plus: 'text-white/60' },
  light: { card: 'border-secondary/25 bg-surface hover:border-secondary/50', plus: 'text-secondary/50' },
}

// Blueprint-style bento card: dashed outline with a plus mark on each corner (they turn a quarter on hover).
// Adapted from the Ruixen "bento cards" pattern to ICV tokens. `tone` = dark (on navy) | light.
export function PlusCard({ children, tone = 'dark', as: Tag = 'div', className = '' }) {
  const t = tones[tone]
  return (
    <Tag className={`group/plus relative rounded-lg border border-dashed p-6 transition duration-300 ${t.card} ${className}`}>
      {corners.map((c) => (
        <PlusIcon
          key={c}
          strokeWidth="1.5"
          className={`absolute ${c} size-6 transition duration-500 group-hover/plus:rotate-90 motion-reduce:transition-none ${t.plus}`}
        />
      ))}
      {children}
    </Tag>
  )
}
