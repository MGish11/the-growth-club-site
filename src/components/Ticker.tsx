import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { TICKER } from '../config/tuning'

/**
 * Infinite horizontal marquee.
 *
 * Renders the item list three times — the reference does the same —
 * and translates the whole strip by exactly one track's width before
 * wrapping with modulo. Three copies rather than two so a wide viewport
 * never runs out of content mid-loop.
 *
 * Width is measured after layout rather than assumed, so the loop stays
 * seamless when the font swaps in or the viewport resizes.
 */
export function Ticker({
  items,
  separator = '✦',
  speed = TICKER.speed,
  className = '',
}: {
  items: string[]
  separator?: string
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const track = el.querySelector<HTMLElement>('.ticker__track')
    if (!track) return

    let width = track.offsetWidth
    const wrap = gsap.utils.wrap(-width, 0)

    const tick = gsap.quickSetter(el.children, 'x', 'px')
    let x = 0
    let last = performance.now()

    const update = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      x = wrap(x - speed * dt)
      tick(x)
    }

    gsap.ticker.add(update)

    const ro = new ResizeObserver(() => {
      width = track.offsetWidth
    })
    ro.observe(track)

    return () => {
      gsap.ticker.remove(update)
      ro.disconnect()
    }
  }, [speed])

  const track = (key: number, hidden: boolean) => (
    <div className="ticker__track" key={key} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span className="ticker__item" key={i}>
          {item}
          <span aria-hidden="true"> {separator}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`ticker ${className}`} ref={ref}>
      {[0, 1, 2].map((i) => track(i, i > 0))}
    </div>
  )
}
