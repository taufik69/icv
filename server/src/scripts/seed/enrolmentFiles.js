import { randomBytes } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { STORAGE_ROOT } from '../../modules/enrolment/enrolment.constants.js'

// Demo files for seeded enrolments, drawn here so the seed needs no binary fixtures: a handwritten-style
// signature (PNG), an agent's round stamp (PNG), a passport scan clearly marked SPECIMEN (JPG) and an
// English test report (PDF). Every file is written to storage/enrolments/<id>/ like a real upload.
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const png = (svg) => sharp(Buffer.from(svg)).png().toBuffer()

export const signaturePng = (name) => png(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
  <rect width="600" height="200" fill="#fff"/>
  <text x="40" y="120" font-family="URW Chancery L, Z003, Comic Sans MS, cursive" font-style="italic" font-size="64" fill="#1b2a4a">${esc(name)}</text>
  <path d="M40 150 C 180 135, 320 170, 520 140" stroke="#1b2a4a" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`)

// Letters of `text` placed one by one on a circle (radius r) across the top of the stamp; librsvg (used by
// sharp) can't render <textPath>, so each letter gets its own position and rotation.
const ringText = (text, r, cx = 210, cy = 210) => {
  const chars = [...text]
  const step = Math.min(13, 250 / chars.length)
  const first = -90 - (step * (chars.length - 1)) / 2
  return chars.map((c, i) => {
    const deg = first + i * step
    const rad = (deg * Math.PI) / 180
    return `<text x="${(cx + r * Math.cos(rad)).toFixed(1)}" y="${(cy + r * Math.sin(rad)).toFixed(1)}" transform="rotate(${(deg + 90).toFixed(1)} ${(cx + r * Math.cos(rad)).toFixed(1)} ${(cy + r * Math.sin(rad)).toFixed(1)})" text-anchor="middle" dominant-baseline="middle">${esc(c)}</text>`
  }).join('')
}

export const stampPng = (company) => png(`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420">
  <g fill="none" stroke="#b3261e" stroke-width="8" opacity="0.85"><circle cx="210" cy="210" r="190"/><circle cx="210" cy="210" r="120"/></g>
  <g font-family="DejaVu Sans, Arial" font-size="28" font-weight="bold" fill="#b3261e">${ringText(company.toUpperCase(), 155)}</g>
  <text x="210" y="200" text-anchor="middle" font-family="DejaVu Sans, Arial" font-size="26" font-weight="bold" fill="#b3261e">AUTHORISED</text>
  <text x="210" y="238" text-anchor="middle" font-family="DejaVu Sans, Arial" font-size="26" font-weight="bold" fill="#b3261e">AGENT</text>
  <text x="210" y="352" text-anchor="middle" font-family="DejaVu Sans, Arial" font-size="20" fill="#b3261e">★ DEMO ★</text>
</svg>`)

export const passportJpg = ({ givenNames, lastName, nationality, passportNumber, dob, passportExpiry }) => sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="680">
  <rect width="1000" height="680" rx="24" fill="#e9eef5"/>
  <rect x="0" y="0" width="1000" height="90" rx="24" fill="#0a2449"/>
  <text x="40" y="60" font-family="DejaVu Sans, Arial" font-size="36" font-weight="bold" fill="#fff">PASSPORT</text>
  <text x="960" y="60" text-anchor="end" font-family="DejaVu Sans, Arial" font-size="24" fill="#cfd8e6">${esc(nationality.toUpperCase())}</text>
  <rect x="40" y="130" width="250" height="320" rx="12" fill="#c7d2e2"/>
  <circle cx="165" cy="250" r="70" fill="#9fb0c8"/><rect x="85" y="330" width="160" height="110" rx="60" fill="#9fb0c8"/>
  ${[['Surname', lastName], ['Given names', givenNames], ['Nationality', nationality], ['Date of birth', dob], ['Passport no.', passportNumber], ['Date of expiry', passportExpiry]]
    .map(([k, v], i) => `<text x="330" y="${160 + i * 52}" font-family="DejaVu Sans, Arial" font-size="18" fill="#5c6b80">${k}</text><text x="330" y="${184 + i * 52}" font-family="DejaVu Sans, Arial" font-size="24" font-weight="bold" fill="#0a2449">${esc(v.toUpperCase())}</text>`).join('')}
  <text x="500" y="560" text-anchor="middle" font-family="DejaVu Sans, Arial" font-size="64" font-weight="bold" fill="#b3261e" opacity="0.35" transform="rotate(-12 500 560)">SPECIMEN – DEMO DATA</text>
  <text x="40" y="640" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="#0a2449">P&lt;${esc(nationality.slice(0, 3).toUpperCase())}${esc(lastName.toUpperCase())}&lt;&lt;${esc(givenNames.toUpperCase()).replace(/ /g, '&lt;')}&lt;&lt;&lt;&lt;&lt;&lt;</text>
</svg>`)).jpeg({ quality: 82 }).toBuffer()

// A one-page PDF with plain text lines (Helvetica), with correct xref offsets.
export function textPdf(lines) {
  const text = lines.map((l, i) => `BT /F1 ${i ? 13 : 20} Tf 60 ${760 - i * 26} Td (${l.replace(/[()\\]/g, '\\$&')}) Tj ET`).join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${Buffer.byteLength(text)} >>\nstream\n${text}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]
  let out = '%PDF-1.4\n'
  const offsets = objects.map((body, i) => {
    const at = Buffer.byteLength(out)
    out += `${i + 1} 0 obj\n${body}\nendobj\n`
    return at
  })
  const xref = Buffer.byteLength(out)
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
  return Buffer.from(out)
}

const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'application/pdf': 'pdf' }

// Writes one file for enrolment `enrolmentId` and returns its stored file ref ({ id, name, mimeType, size }).
export async function saveDemoFile(enrolmentId, name, mimeType, buffer) {
  const dir = join(STORAGE_ROOT, String(enrolmentId))
  await mkdir(dir, { recursive: true })
  const id = `${randomBytes(6).toString('hex')}.${EXT[mimeType]}`
  await writeFile(join(dir, id), buffer)
  return { id, name, mimeType, size: buffer.length }
}
