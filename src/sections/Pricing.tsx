import { PRICING, PRICING_NOTE } from '../config/content'
import { Reveal } from '../components/Reveal'

/**
 * Cream block, three tiers. The featured tier inverts to deep.
 *
 * The tiers carry a rank rather than a figure — see PRICING for why — so
 * the note under the grid is load-bearing, not decoration.
 */
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
              <p className="t-subdisplay pricing__rank">{tier.rank}</p>
              <p className="t-label pricing__shape">{tier.shape}</p>
              <p className="t-body pricing__body">{tier.body}</p>

              <ul className="pricing__features">
                {tier.features.map((f) => (
                  <li className="t-label pricing__feature" key={f}>
                    <span aria-hidden="true">¬</span> {f}
                  </li>
                ))}
              </ul>

              <a className="t-label pricing__cta" href="#inquire">
                Start here →
              </a>
            </article>
          ))}
        </Reveal>

        <p className="t-body pricing__note">{PRICING_NOTE}</p>
      </div>
    </section>
  )
}
