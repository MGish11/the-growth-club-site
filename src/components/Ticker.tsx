import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { TICKER } from '../config/tuning'

/**
 * Infinite horizontal marquee.
 *
 * Renders the item list enough times to span the container plus the one
 * track's width the loop translates by, then wraps with modulo. A short
 * item list needs more copies than a long one, so the count is derived
 * from the measured track width rather than fixed — three is the floor.
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
  const xRef = useRef(0)
  const [copies, setCopies] = useState(3)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const track = el.querySelector<HTMLElement>('.ticker__track')
    if (!track) return

    let wrap = gsap.utils.wrap(-track.offsetWidth, 0)

    const fit = () => {
      const width = track.offsetWidth
      if (!width) return
      wrap = gsap.utils.wrap(-width, 0)
      setCopies(Math.max(3, Math.ceil(el.offsetWidth / width) + 1))
    }
    fit()

    const tick = gsap.quickSetter(el.children, 'x', 'px')

    // gsap.ticker hands the callback (time, deltaTime, ...) where time is in
    // SECONDS and deltaTime in MILLISECONDS. Differencing time against a
    // performance.now() baseline mixes the two units and yields a per-frame
    // delta near zero, which reads as a stopped marquee — take deltaTime.
    const update = (_time: number, deltaTime: number) => {
      xRef.current = wrap(xRef.current - (speed * deltaTime) / 1000)
      tick(xRef.current)
    }

    gsap.ticker.add(update)

    const ro = new ResizeObserver(fit)
    ro.observe(track)
    ro.observe(el)

    return () => {
      gsap.ticker.remove(update)
      ro.disconnect()
    }
  }, [speed, copies])

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
      {Array.from({ length: copies }, (_, i) => track(i, i > 0))}
    </div>
  )
}
