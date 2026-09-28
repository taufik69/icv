export function ErrorMessage({ error, onRetry }) {
  return (
    <div className="rounded-lg border border-danger/30 bg-danger-soft p-4 text-danger-ink">
      <p>{error?.message ?? 'Something went wrong'}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 text-sm font-semibold underline">
          Try again
        </button>
      )}
    </div>
  )
}
