const done = new Set()

// Adds <link rel="preconnect"> once per origin — call on hover/focus to warm up a
// third-party connection just before the user needs it.
export function preconnect(...origins) {
  origins.forEach((origin) => {
    if (done.has(origin)) return
    done.add(origin)
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    link.crossOrigin = ''
    document.head.appendChild(link)
  })
}
