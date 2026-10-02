import { enrolmentAdminApi } from '../../api/enrolmentAdminApi'

// A signature or stamp image on a signature line, linking to the full-size file.
export function SignedImage({ enrolmentId, file, label }) {
  return (
    <figure className="min-w-0">
      <a href={enrolmentAdminApi.fileUrl(enrolmentId, file.id)} target="_blank" rel="noreferrer" className="grid h-32 place-items-center rounded-xl border-b-2 border-secondary bg-surface-alt px-4 transition hover:bg-surface-muted">
        <img src={enrolmentAdminApi.fileUrl(enrolmentId, file.id)} alt={label} className="max-h-24 max-w-full object-contain" />
      </a>
      <figcaption className="mt-2 text-sm text-ink-subtle">{label}</figcaption>
    </figure>
  )
}
