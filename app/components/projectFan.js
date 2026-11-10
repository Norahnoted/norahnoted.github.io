// Layout helpers for the Recent work drawer card fan.
export function carouselOffset(index, center, total) {
  let diff = index - center;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}
