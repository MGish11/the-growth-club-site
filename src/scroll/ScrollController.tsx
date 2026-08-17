import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LENIS } from '../config/tuning'

gsap.registerPlugin(ScrollTrigger)

/**
 * Owns smooth scrolling. Renders nothing.
 *
 * Unlike the quandary setup this does NOT install a ScrollTrigger
 * scrollerProxy — that was only needed there because snapping issued
 * programmatic scrolls that fought Lenis. This page scrolls the window
 * normally, so the standard integration is enough: feed Lenis from
 * GSAP's ticker and push every Lenis scroll into ScrollTrigger.update.
 *
 * lagSmoothing(0) matters — without it GSAP silently skips ticks after
 * a long frame and Lenis visibly jumps.
 */
export function ScrollController() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      lerp: LENIS.lerp,
      wheelMultiplier: LENIS.wheelMultiplier,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    if (import.meta.env.DEV) {
      // Debug handles for driving scroll from the console.
      ;(window as unknown as Record<string, unknown>).__lenis = lenis
      ;(window as unknown as Record<string, unknown>).__ST = ScrollTrigger
    }

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
