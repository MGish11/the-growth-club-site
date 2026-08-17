import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PARALLAX } from '../config/tuning'

gsap.registerPlugin(ScrollTrigger)

/**
 * Height-proportional parallax.
 *
 * Travel is `rate × element height`, so a tall image drifts further
 * than a short card over the same scroll — matching the reference,
 * where a 1552px block moved -217px while a 248px block moved -55px.
 * Using height rather than a fixed pixel amount means nothing ever
 * drifts outside its own section, whatever the viewport.
 *
 * Wrap the mover in an `overflow: hidden` parent when it's an image,
 * or it will expose an edge at the extremes.
 */
export function Parallax({
  children,
  className = '',
  rate = PARALLAX.rate,
}: {
  children: ReactNode
  className?: string
  rate?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: rate * 50 },
        {
          yPercent: -rate * 50,
          ease: PARALLAX.ease,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [rate])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
