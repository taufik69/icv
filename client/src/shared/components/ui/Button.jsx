const base =
  'btn-shine inline-flex items-center justify-center gap-2 rounded-pill font-heading font-semibold transition disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary',
  secondary: 'bg-secondary text-on-secondary hover:bg-secondary-dark shadow-brand',
  outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-on-secondary',
  ghost: 'text-secondary hover:bg-surface-muted hover:text-secondary',
  danger: 'bg-danger text-white hover:bg-danger-hover',
}

const sizes = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}

// Pass as="a" (with href) for link-styled buttons.
export function Button({ as: Tag = 'button', variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  )
}
