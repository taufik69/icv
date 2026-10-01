// Red asterisk after a required field's label. Decorative: the input's `required` attribute is what's announced.
export function RequiredMark() {
  return <span aria-hidden="true" className="ml-0.5 text-danger">*</span>
}
