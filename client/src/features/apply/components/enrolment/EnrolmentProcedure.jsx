import { offerProcedure, submitWays } from '../../data/enrolment/enrolmentOptions'

const heading = 'font-heading font-semibold text-secondary'

// (L) Enrolment Procedure, as on the paper form: 1. how to send the form (a, b, c), 2. letter of offer.
export function EnrolmentProcedure() {
  return (
    <ol className="grid list-decimal gap-5 pl-5 text-sm leading-relaxed text-ink-muted marker:font-heading marker:font-semibold marker:text-secondary sm:col-span-2">
      <li>
        <p className={heading}>Enrolment Procedure</p>
        <p className="mt-1">Fill out the Enrolment Form and submit it through</p>
        <ol className="mt-1 list-[lower-alpha] pl-5">
          {submitWays.map((w) => (
            <li key={w.text}>
              {w.lead && `${w.lead} `}
              {w.href ? <a href={w.href}>{w.text}</a> : w.text}
              {w.or && <strong className="text-ink"> OR</strong>}
            </li>
          ))}
        </ol>
      </li>
      <li>
        <p className={heading}>Letter of Offer and Enrolment Agreement</p>
        {offerProcedure.map((p) => <p key={p.slice(0, 20)} className="mt-1">{p}</p>)}
      </li>
    </ol>
  )
}
