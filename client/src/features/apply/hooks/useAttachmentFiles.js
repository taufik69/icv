import { useEffect, useState } from 'react'
import { loadFiles, saveFiles } from '../lib/fileStore'

const TYPES = /\.(pdf|jpe?g|png)$/i
const MAX = 10 * 1024 * 1024

// Files picked for each checklist document, keyed by the document's label. They are kept with the draft
// in IndexedDB (`lib/fileStore`), so they come back after a reload. Wrong types or files over 10 MB are
// refused with a message. Unticking a document keeps its files, so ticking it again brings them back.
export function useAttachmentFiles() {
  const [files, setFiles] = useState({})
  const [problems, setProblems] = useState({})

  useEffect(() => {
    let live = true
    loadFiles().then((stored) => live && setFiles((now) => ({ ...stored, ...now })))
    return () => { live = false }
  }, [])

  const put = (key, list) => {
    setFiles((all) => ({ ...all, [key]: list }))
    saveFiles(key, list)
  }

  const add = (key, picked) => {
    const list = [...picked]
    const ok = list.filter((f) => TYPES.test(f.name) && f.size <= MAX)
    const refused = list.length - ok.length
    setProblems((p) => ({ ...p, [key]: refused ? `${refused === 1 ? '1 file was' : `${refused} files were`} not added. Use PDF, JPG or PNG files up to 10 MB.` : '' }))
    const current = files[key] ?? []
    put(key, [...current, ...ok.filter((f) => !current.some((x) => x.name === f.name))])
  }
  const remove = (key, file) => put(key, (files[key] ?? []).filter((f) => f !== file))

  return { files, problems, add, remove }
}
