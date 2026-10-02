// Uploaded checklist files for the enrolment draft, kept in IndexedDB (files are too big for
// localStorage). One record per document: key → File[]. Every call is guarded: if IndexedDB is blocked
// (private window, old browser) files simply aren't kept, and the form still works.
const DB = 'icv-enrolment-files'
const STORE = 'files'

const open = () => new Promise((resolve, reject) => {
  const req = indexedDB.open(DB, 1)
  req.onupgradeneeded = () => req.result.createObjectStore(STORE)
  req.onsuccess = () => resolve(req.result)
  req.onerror = () => reject(req.error)
})

const run = async (mode, work) => {
  const db = await open()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode)
    const result = work(tx.objectStore(STORE))
    tx.oncomplete = () => resolve(result?.result)
    tx.onerror = () => reject(tx.error)
  })
}

export async function loadFiles() {
  try {
    const db = await open()
    return await new Promise((resolve) => {
      const all = {}
      const req = db.transaction(STORE).objectStore(STORE).openCursor()
      req.onsuccess = () => {
        const cursor = req.result
        if (!cursor) return resolve(all)
        all[cursor.key] = cursor.value
        cursor.continue()
      }
      req.onerror = () => resolve({})
    })
  } catch {
    return {}
  }
}

export const saveFiles = (key, files) => run('readwrite', (s) => s.put(files, key)).catch(() => {})
export const clearFiles = () => run('readwrite', (s) => s.clear()).catch(() => {})
