import { useEffect, useRef, useState } from 'react'

/**
 * A live site in a card-sized well.
 *
 * Three things make this behave:
 *
 * 1. The frame renders at desktop width and is CSS-scaled into the well,
 *    so the site lays out as it would on a monitor rather than reflowing
 *    to its mobile breakpoint at ~600px of card.
 * 2. It mounts only once the card nears the viewport. Each embed is a
 *    full page load; eager-mounting the grid costs a site load per card.
 * 3. Wheel events over a cross-origin frame go to that frame, not to the
 *    parent — great for scrolling the site, awful when a visitor scrolls
 *    past and gets trapped. So the frame is inert until clicked, and goes
 *    inert again on pointer-out.
 *
 * The embedded site must allow framing: no `X-Frame-Options` and no CSP
 * `frame-ancestors` that excludes this origin. There is no parent-side
 * override — a site that refuses renders as an empty well.
 */
export function SiteEmbed({
  url,
  label,
  width = 1440,
}: {
  url: string
  label: string
  /** Viewport width the site is rendered at before scaling down. */
  width?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    setCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setMounted(true)
        io.disconnect()
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      const scale = el.offsetWidth / width
      if (!scale) return
      el.style.setProperty('--embed-scale', String(scale))
      el.style.setProperty('--embed-h', `${Math.round(el.offsetHeight / scale)}px`)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      className={`embed${active ? ' is-active' : ''}`}
      ref={ref}
      style={{ '--embed-w': `${width}px` } as React.CSSProperties}
      onPointerLeave={() => setActive(false)}
    >
      {mounted && (
        <iframe
          className="embed__frame"
          src={url}
          title={label}
          loading="lazy"
          tabIndex={active ? 0 : -1}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}

      {/* On touch there is no hover to release the trap, so the overlay
          stays and sends people to the real site instead. */}
      {coarse ? (
        <a className="embed__cover" href={url} target="_blank" rel="noreferrer noopener">
          <span className="t-label">Open site ↗</span>
        </a>
      ) : (
        !active && (
          <button className="embed__cover" type="button" onClick={() => setActive(true)}>
            <span className="t-label">Scroll inside ↕</span>
          </button>
        )
      )}
    </div>
  )
}
