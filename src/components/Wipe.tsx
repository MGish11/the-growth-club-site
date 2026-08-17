import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WIPE } from '../config/tuning'

gsap.registerPlugin(ScrollTrigger)

/**
 * The signature move: a word inside a heading that recolors to
 * --accent behind a hard left-to-right edge as it scrolls in.
 *
 * Two stacked copies of the same text. The base sits in the inherited
 * color and never moves; the fill sits exactly on top in --accent with
 * `clip-path: inset(0 100% 0 0)`, and the clip opens to 0%. Because the
 * base is always there the layout never shifts and the word stays
 * readable before the animation fires.
 *
 * The fill copy is aria-hidden so screen readers hear the word once.
 *
 * Use it inline:
 *   <p className="t-statement">
 *     WE BUILD <Wipe>PREDICTABLE</Wipe> GROWTH SYSTEMS
 *   </p>
 */
export function Wipe({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fill = el.querySelector('.wipe__fill')
    if (!fill) return

    const ctx = gsap.context(() => {
      gsap.to(fill, {
        clipPath: 'inset(0 0% 0 0)',
        duration: WIPE.duration,
        ease: WIPE.ease,
        delay,
        scrollTrigger: { trigger: el, start: WIPE.start, once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [delay])

  return (
    <span className="wipe" ref={ref}>
      <span className="wipe__base">{children}</span>
      <span className="wipe__fill" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}
