import { SERVICES } from '../config/content'
import { Reveal } from '../components/Reveal'

/** Deep block. Numbered rows separated by hairlines. */
export function Services() {
  return (
    <section className="section section--deep services" id="services">
      <div className="wrap">
        <p className="t-label marker services__eyebrow">Services</p>

        <Reveal className="services__list" stagger>
          {SERVICES.map((s) => (
            <article className="services__row" key={s.n}>
              <p className="t-eyebrow services__n">{s.n}</p>
              <h2 className="t-section services__title">{s.title}</h2>
              <p className="t-body services__body">{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
