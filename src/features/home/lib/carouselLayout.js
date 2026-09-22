// Slot geometry for the connected carousel. Returns pixel boxes centred on the stage:
// x = left edge relative to the stage centre, y = top edge relative to the centre.
const GAP = 22 // room for the connector notch between the active card and its neighbours

const tiers = {
  desktop: { active: [760, 470], near: [110, 340], far: [76, 210] },
  tablet: { active: [560, 470], near: [84, 320], far: null },
}

export function tierFor(width) {
  if (width >= 1120) return 'desktop'
  return width >= 768 ? 'tablet' : 'mobile'
}

// Mobile uses MobileTestimonial (normal flow) instead of these positioned slots.
export function activeSize(tier) {
  return tiers[tier].active
}

export function slotBox(offset, tier) {
  const [aw, ah] = activeSize(tier)
  const { near, far } = tiers[tier]
  const side = Math.sign(offset)
  const box = (w, h, x, visible = true) => ({ w, h, x, y: -h / 2, visible })

  if (offset === 0) return box(aw, ah, -aw / 2)
  const nearX = (w) => (side < 0 ? -aw / 2 - GAP - w : aw / 2 + GAP)
  if (Math.abs(offset) === 1) return box(near[0], near[1], nearX(near[0]))

  const nearEdge = aw / 2 + GAP + near[0] + 18
  if (Math.abs(offset) === 2 && far) return box(far[0], far[1], side < 0 ? -nearEdge - far[0] : nearEdge)

  const [w, h] = far ?? near
  return box(w, h, side < 0 ? -nearEdge - w - 140 : nearEdge + 140, false)
}
