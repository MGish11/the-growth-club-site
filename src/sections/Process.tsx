import { PROCESS, TESTIMONIAL } from '../config/content'
import { Reveal } from '../components/Reveal'
import { Statement } from '../components/Statement'

/** Deep block: four steps, then the pull quote on the same ground. */
export function Process() {
  return (
    <section className="section section--deep process" id="process">
      <div className="wrap">
        <p className="t-label marker process__eyebrow">How we work</p>

        <Reveal className="process__grid" stagger>
          {PROCESS.map((step) => (
            <article className="process__step" key={step.n}>
              <h3 className="t-eyebrow process__n">
                {step.n}. {step.title}
              </h3>
              <p className="t-body process__body">{step.body}</p>
            </article>
          ))}
        </Reveal>

        <hr className="rule process__rule" />

        <figure className="process__quote">
          <Statement text={TESTIMONIAL.quote} className="t-quote process__quote-text" />
          <figcaption className="t-label process__attrib">
            {TESTIMONIAL.name} — {TESTIMONIAL.role}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
