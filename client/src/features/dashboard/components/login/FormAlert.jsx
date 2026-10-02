// Error line above a sign-in step's button (server message, or a connection problem).
export function FormAlert({ error }) {
  if (!error) return null
  const text = error.status ? error.message : "Can't reach the server. Check your connection and try again."
  return <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-ink">{text}</p>
}
