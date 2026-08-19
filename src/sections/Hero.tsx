import { BRAND, BADGE_TEXT, TICKER_ITEMS } from '../config/content'
import { CircleBadge } from '../components/CircleBadge'
import { Ticker } from '../components/Ticker'
import { Reveal } from '../components/Reveal'

/**
 * Deep block, oversized Bebas wordmark bleeding to the gutters, a
 * rotating seal, and the service ticker on the bottom rule.
 */
export function Hero() {
  // Founded this year: 'EST. 2026 — 2026' reads as a typo, so collapse the span.
  const span =
    BRAND.founded === String(BRAND.year)
      ? `EST. ${BRAND.founded}`
      : `EST. ${BRAND.founded} — ${BRAND.year}`

  return (
    <section className="hero section section--deep section--flush" id="top">
      <div className="hero__inner wrap">
        <Reveal className="hero__meta" stagger>
          <p className="t-label">{BRAND.tagline}</p>
          <p className="t-label hero__meta-right">
            {span} <br /> {BRAND.availability}
          </p>
        </Reveal>

        <h1 className="t-display hero__wordmark">{BRAND.wordmark}</h1>

        <div className="hero__base">
          <Reveal className="hero__pitch">
            <p className="t-body t-body--lg">{BRAND.pitch}</p>
          </Reveal>
          <CircleBadge text={BADGE_TEXT} size={150} className="hero__badge">
            <span className="t-label hero__badge-dot">↓</span>
          </CircleBadge>
        </div>
      </div>

      <hr className="rule" />
      <Ticker items={TICKER_ITEMS} className="t-label hero__ticker" />
      <hr className="rule" />
    </section>
  )
}
