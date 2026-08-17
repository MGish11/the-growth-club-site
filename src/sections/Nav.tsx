import { BRAND, NAV } from '../config/content'

/**
 * Fixed hairline nav. Readable over both grounds without a scroll
 * listener — see the mix-blend-mode note in sections.css for what it
 * actually renders as.
 */
export function Nav() {
  return (
    <header className="nav">
      <a className="t-label nav__brand" href="#top">
        {BRAND.name}
      </a>
      <nav className="nav__links">
        {NAV.map((item) => (
          <a className="t-label nav__link" key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="t-label nav__cta" href="#contact">
        Book a call
      </a>
    </header>
  )
}
