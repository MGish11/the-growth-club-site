import { BRAND, CONTACT, NAV } from '../config/content'
import { Reveal } from '../components/Reveal'

/** Deep footer block, closing on the oversized Bebas call to action. */
export function Contact() {
  return (
    <footer className="section section--deep contact" id="contact">
      <div className="wrap">
        <div className="contact__head">
          <p className="t-label marker">{CONTACT.eyebrow}</p>
          <div className="contact__details">
            <a className="t-label" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
            <a className="t-label" href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`}>
              {BRAND.phone}
            </a>
          </div>
        </div>

        <Reveal>
          <p className="t-body t-body--lg contact__body">{CONTACT.body}</p>
        </Reveal>

        <h2 className="t-display contact__display">{CONTACT.display}</h2>

        <hr className="rule" />

        <div className="contact__foot">
          <p className="t-label">
            © {BRAND.year} {BRAND.name}
          </p>
          <nav className="contact__links">
            {NAV.map((item) => (
              <a className="t-label" key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
