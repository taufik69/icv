// "data:image/png;base64,…" (the signature / stamp in the draft) → a Blob to upload.
export function dataUrlToBlob(dataUrl) {
  const [head, body] = dataUrl.split(',')
  const type = head.match(/^data:([^;]+)/)?.[1] ?? 'application/octet-stream'
  const bytes = Uint8Array.from(atob(body), (c) => c.charCodeAt(0))
  return new Blob([bytes], { type })
}
