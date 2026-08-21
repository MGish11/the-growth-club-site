import { ABOUT } from '../config/content'
import { Statement } from '../components/Statement'
import { Reveal } from '../components/Reveal'

/**
 * Cream block. The statement carries the wipe; the columns carry the texture.
 *
 * A track-record stats row sat under the columns until there were real
 * figures for it. Restore it here once those exist.
 */
export function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <p className="t-label marker about__eyebrow">{ABOUT.eyebrow}</p>

        <Statement text={ABOUT.statement} className="about__statement" />

        <Reveal className="about__columns" stagger>
          {ABOUT.columns.map((col, i) => (
            <p className="t-body" key={i}>
              {col}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
