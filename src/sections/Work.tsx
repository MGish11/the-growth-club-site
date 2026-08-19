import { WORK } from '../config/content'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { SiteEmbed } from '../components/SiteEmbed'

/**
 * Cream block, two-column case study grid. Each card holds a media
 * well with a parallax mover inside — drop an <img> in place of the
 * placeholder and the drift works as-is.
 *
 * An item carrying a `url` shows the live site instead. That card skips
 * the parallax: drifting a container whose child scrolls on its own puts
 * two competing motions in one well.
 */
export function Work() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <p className="t-label marker work__eyebrow">Selected work</p>

        <Reveal className="work__grid" stagger>
          {WORK.map((item, i) => (
            <article className="work__card" key={item.client}>
              <div className="work__media">
                {'url' in item ? (
                  <SiteEmbed url={item.url} label={`${item.client} — live site`} />
                ) : (
                  <Parallax className="work__media-inner" rate={0.14 + (i % 2) * 0.06}>
                    <div className="work__placeholder" aria-hidden="true">
                      <span className="t-label">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </Parallax>
                )}
              </div>

              <div className="work__meta">
                <h3 className="t-section">{item.client}</h3>
                <p className="t-label work__sector">{item.sector}</p>
              </div>
              <p className="t-body work__body">{item.body}</p>
              <p className="t-eyebrow work__result">{item.result}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
