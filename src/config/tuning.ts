/**
 * Single place for every motion constant. Traced from the reference
 * where a value was measurable; otherwise chosen to match its feel.
 */

export const LENIS = {
  lerp: 0.09,
  wheelMultiplier: 1,
} as const

export const WIPE = {
  /** Fires when the word's top hits this point in the viewport. */
  start: 'top 85%',
  duration: 0.8,
  ease: 'power2.out',
  /** Delay between consecutive wipes inside the same heading. */
  stagger: 0.12,
} as const

export const REVEAL = {
  start: 'top 88%',
  duration: 0.7,
  ease: 'power3.out',
  y: 20,
  stagger: 0.08,
} as const

/**
 * Parallax rate. Measured on the reference: a 1552px block moved
 * -217px and a 248px block moved -55px over the same scroll — both
 * ≈ 0.14 × element height. Rate scales with height, so taller media
 * travels further and the page gains depth without anything drifting
 * out of its section.
 */
export const PARALLAX = {
  rate: 0.14,
  ease: 'none',
} as const

export const TICKER = {
  /** Pixels per second. Negative scrolls right-to-left. */
  speed: 60,
} as const

export const BADGE = {
  /** Radius in px that each character is pushed out to. */
  radius: 75,
  /**
   * Degrees between characters. The reference measured 4.3°, but that
   * only closes the circle for a string of ~84 characters — CircleBadge
   * derives the step from the actual text length instead and this stays
   * here as the manual override.
   */
  step: 4.3,
  /** Seconds for one full rotation. */
  period: 24,
} as const
