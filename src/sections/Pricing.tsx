import { PRICING } from '../config/content'
import { Reveal } from '../components/Reveal'

/** Cream block, three tiers. The featured tier inverts to deep. */
export function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <p className="t-label marker pricing__eyebrow">Engagements</p>

        <Reveal className="pricing__grid" stagger>
          {PRICING.map((tier) => (
            <article
              className={`pricing__tier${tier.featured ? ' pricing__tier--featured' : ''}`}
              key={tier.name}
            >
              <h3 className="t-section">{tier.name}</h3>
              <p className="t-subdisplay pricing__price">{tier.price}</p>
              <p className="t-label pricing__cadence">{tier.cadence}</p>
              <p className="t-body pricing__body">{tier.body}</p>

              <ul className="pricing__features">
                {tier.features.map((f) => (
                  <li className="t-label pricing__feature" key={f}>
                    <span aria-hidden="true">¬</span> {f}
                  </li>
                ))}
              </ul>

              <a className="t-label pricing__cta" href="#contact">
                Start here →
              </a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
