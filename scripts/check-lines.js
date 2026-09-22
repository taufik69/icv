// Fails if any source file in src/ exceeds MAX_LINES.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MAX_LINES = 100
const EXTS = /\.(jsx?|tsx?|css)$/
const IGNORE = /routeTree\.gen\./

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : EXTS.test(name) && !IGNORE.test(name) ? [path] : []
  })
}

const offenders = walk('src')
  .map((file) => ({ file, lines: readFileSync(file, 'utf8').split('\n').length }))
  .filter(({ lines }) => lines > MAX_LINES)

if (offenders.length) {
  offenders.forEach(({ file, lines }) => console.error(`✗ ${file}: ${lines} lines (max ${MAX_LINES})`))
  process.exit(1)
}
console.log(`✓ All files within ${MAX_LINES} lines`)
