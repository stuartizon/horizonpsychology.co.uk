// The decisions a carousel makes as it moves between slides, kept apart from
// the DOM so they can be unit tested.

/** How far a pointer moves, in pixels, before its drag counts as a swipe or a scroll. */
const SLOP = 4;

/** How much of the carousel's width a swipe crosses to move to the next slide. */
const SWIPE_THRESHOLD = 0.2;

/** The slide `index` refers to among `count`, going round from either end. */
export function wrap(index: number, count: number) {
  return ((index % count) + count) % count;
}

/** Whether a drag of `dx` across and `dy` down is a swipe ("x") or a scroll ("y"), once it has moved far enough to say. */
export function dragAxis(dx: number, dy: number): "x" | "y" | undefined {
  if (Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return undefined;
  return Math.abs(dx) > Math.abs(dy) ? "x" : "y";
}

/** The slide to show after a swipe of `dx` across a carousel `width` wide, showing slide `index` of `count`. */
export function slideAfterSwipe(index: number, count: number, dx: number, width: number) {
  if (Math.abs(dx) <= width * SWIPE_THRESHOLD) return index;
  return wrap(index + (dx < 0 ? 1 : -1), count);
}
