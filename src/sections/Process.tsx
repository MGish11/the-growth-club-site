import { PROCESS } from '../config/content'
import { Reveal } from '../components/Reveal'

/**
 * Deep block: the four steps.
 *
 * A pull quote sat under these until there was a real client quote to put
 * in it. Restore the figure here when one arrives with sign-off.
 */
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
      </div>
    </section>
  )
}
