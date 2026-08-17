import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { BADGE } from '../config/tuning'

/**
 * The rotating seal.
 *
 * Each character is absolutely positioned and given its own rotation,
 * `step` degrees apart, then pushed out to `radius` — the reference
 * does exactly this (≈4.3° per char at a 75px radius) rather than
 * using an SVG textPath. Per-character transforms keep the letters
 * upright-relative-to-the-ring and let the whole thing spin with one
 * cheap transform on the parent.
 *
 * The text is duplicated into an sr-only span so the ring itself can be
 * aria-hidden — screen readers get one clean string, not 30 letters.
 */
export function CircleBadge({
  text,
  size = 150,
  radius = BADGE.radius,
  step,
  period = BADGE.period,
  className = '',
  children,
}: {
  text: string
  size?: number
  radius?: number
  /** Degrees between characters. Defaults to an even spread over 360°. */
  step?: number
  period?: number
  className?: string
  children?: ReactNode
}) {
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ring.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tween = gsap.to(el, {
      rotation: 360,
      duration: period,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [period])

  const chars = [...text]
  // Spread evenly over the full circle unless the caller pins a step.
  // The reference's 4.3° only worked because its string ran ~84 chars.
  const deg = step ?? 360 / chars.length

  return (
    <div
      className={`badge ${className}`}
      style={{ '--badge-size': `${size}px` } as React.CSSProperties}
    >
      <div className="badge__ring" ref={ring} aria-hidden="true">
        {chars.map((ch, i) => (
          <span
            className="badge__char"
            key={i}
            style={{ transform: `rotate(${i * deg}deg) translateY(-${radius}px)` }}
          >
            {ch}
          </span>
        ))}
      </div>
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clipPath: 'inset(50%)',
        }}
      >
        {text}
      </span>
      {children}
    </div>
  )
}
