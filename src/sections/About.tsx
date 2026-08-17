import { ABOUT } from '../config/content'
import { Statement } from '../components/Statement'
import { Reveal } from '../components/Reveal'

/** Cream block. The statement carries the wipe; the columns carry the texture. */
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

        <hr className="rule about__rule" />

        <Reveal className="about__stats" stagger>
          {ABOUT.stats.map((stat) => (
            <div className="about__stat" key={stat.label}>
              <p className="t-subdisplay">{stat.value}</p>
              <p className="t-label about__stat-label">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
