import { useEffect, useRef, useState } from 'react'
import {
  asset,
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  WORK,
  WORK_COPY,
  WORK_FILTERS,
  type PortfolioItem,
} from '../config/content'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { SiteEmbed } from '../components/SiteEmbed'
import { getLenis } from '../scroll/lenis'

type Filter = (typeof WORK_FILTERS)[number]

/**
 * Everything the studio has made, in one grid: live sites alongside the
 * ads, brochures and infographics.
 *
 * The two kinds of cell behave differently on purpose. A site is a real
 * page you scroll inside (see SiteEmbed); a still opens full size in the
 * lightbox, because a brochure or infographic is unreadable at card size.
 * They share a 4:3 well so the grid stays even either way.
 *
 * An entry with no `url` keeps the numbered placeholder, and a piece
 * category with nothing in it shows labelled empty slots — neither
 * invents work that was not done.
 */
export function Work() {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState<PortfolioItem | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const sites = filter === 'All' || filter === 'Websites' ? WORK : []
  const pieces = PORTFOLIO.filter(
    (p) => filter === 'All' || (filter !== 'Websites' && p.category === filter),
  )

  // Empty slots only where there is genuinely nothing: one per category
  // under All, two when a single empty category is selected.
  const slots =
    pieces.length > 0 || filter === 'Websites'
      ? []
      : filter === 'All'
        ? PORTFOLIO.length === 0
          ? [...PORTFOLIO_CATEGORIES]
          : []
        : [filter, filter]

  // Lenis keeps driving window scroll behind a modal, so it is paused while
  // one is open. It is absent under reduced motion, hence the overflow lock
  // as well rather than instead.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      getLenis()?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      if (dialog.open) dialog.close()
      getLenis()?.start()
      document.body.style.overflow = ''
    }

    return () => {
      getLenis()?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <p className="t-label marker work__eyebrow">{WORK_COPY.eyebrow}</p>

        <Reveal className="work__intro" stagger>
          <h2 className="t-section work__heading">{WORK_COPY.heading}</h2>
          <p className="t-body t-body--lg work__body-lead">{WORK_COPY.body}</p>
        </Reveal>

        <div className="work__filters" role="group" aria-label="Filter work">
          {WORK_FILTERS.map((f) => (
            <button
              className={`t-label work__filter${filter === f ? ' is-on' : ''}`}
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="work__grid">
          {sites.map((item, i) => (
            <li className="work__cell" key={item.client}>
              <article className="work__card">
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
              </article>
            </li>
          ))}

          {pieces.map((item) => (
            <li className="work__cell" key={item.src}>
              <button className="piece" type="button" onClick={() => setOpen(item)}>
                <span className={`piece__media${item.fit === 'contain' ? ' piece__media--contain' : ''}`}>
                  <img src={asset(item.src)} alt={item.alt} loading="lazy" />
                  {item.video && (
                    <span className="piece__play">
                      <span aria-hidden="true">▶</span>
                      <span className="u-sr">Video</span>
                    </span>
                  )}
                </span>
                <span className="piece__meta">
                  <span className="t-label piece__title">{item.title}</span>
                  <span className="t-label piece__cat">{item.category}</span>
                </span>
              </button>
            </li>
          ))}

          {slots.map((c, i) => (
            <li className="work__cell" key={`${c}-${i}`}>
              <div className="piece piece--empty">
                <span className="piece__media piece__media--empty">
                  <span className="t-label">{WORK_COPY.empty}</span>
                </span>
                <span className="piece__meta">
                  <span className="t-label piece__cat">{c}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        className="lightbox"
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          // Clicking the backdrop lands on the dialog itself, not its content.
          if (e.target === dialogRef.current) setOpen(null)
        }}
      >
        {open && (
          <div className="lightbox__inner">
            {open.video ? (
              // Audio is stripped from these transcodes, so muted is accurate
              // rather than a trick to get past the autoplay policy.
              <video
                className="lightbox__video"
                src={asset(open.video)}
                poster={asset(open.src)}
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img className="lightbox__img" src={asset(open.src)} alt={open.alt} />
            )}
            <div className="lightbox__bar">
              <div>
                <p className="t-label lightbox__title">{open.title}</p>
                <p className="t-label lightbox__cat">{open.category}</p>
                {open.note && <p className="t-body lightbox__note">{open.note}</p>}
              </div>
              <div className="lightbox__actions">
                {open.file && (
                  <a
                    className="t-label lightbox__link"
                    href={asset(open.file)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open full version ↗
                  </a>
                )}
                <button
                  className="t-label lightbox__close"
                  type="button"
                  onClick={() => setOpen(null)}
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
