// Shared by the original desk folder and the Recent work Deflect view.
export function carouselOffset(index, center, total) {
  let diff = index - center;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function carouselLayout(offset, { step, visible, cardScale }) {
  const distance = Math.abs(offset);
  const clamped = Math.max(-(visible + 1), Math.min(visible + 1, offset));
  return {
    x: 50 + clamped * step,
    y: distance * 5,
    scale: cardScale * (distance < .5 ? 1.05 : Math.max(.48, 1 - distance * .18)),
    rotate: clamped * 11,
    opacity: distance > visible ? 0 : Math.max(.22, 1 - distance * .42),
    saturate: Math.max(.5, 1 - distance * .3),
    brightness: Math.max(.72, 1 - distance * .14),
    z: 100 - distance,
    interactive: distance <= visible,
  };
}
