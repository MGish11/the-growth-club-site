import { useEffect, useRef, useState } from 'react'
import { INQUIRY, PROJECT_TYPES } from '../config/content'
import { Reveal } from '../components/Reveal'

/**
 * FormSubmit caps everything attached to one submission at 10 MB. These sit
 * under that so a submission is refused here, with a message, rather than
 * rejected downstream after the page has already navigated.
 */
const MAX_FILE_MB = 8
const MAX_TOTAL_MB = 9
const MAX_FILES = 10
const ACCEPT = 'image/*,.pdf,.svg'

/** Marker `_next` carries back, so the return trip can show the receipt. */
const SENT = 'sent'

type Picked = { file: File; url: string | null }

const mb = (bytes: number) => bytes / 1024 / 1024
const describe = (f: File) => `${f.name} · ${mb(f.size).toFixed(1)} MB`

/**
 * Inquiry form: a few text fields plus logo and reference uploads.
 *
 * This submits NATIVELY rather than through fetch. FormSubmit only accepts
 * attachments on a real multipart POST — its AJAX endpoint answers in JSON
 * but discards files — so the page navigates away and `_next` brings it
 * back with ?sent=1, which is what renders the thank-you line.
 *
 * Files are still held in React state so a second pick adds to the
 * selection instead of replacing it, and so previews can be shown. The
 * accumulated list is written back into the native inputs through a
 * DataTransfer before submit; without that, the POST would carry only
 * whatever the last pick happened to contain.
 */
export function Inquire() {
  const [picked, setPicked] = useState<Picked[]>([])
  const [logo, setLogo] = useState<Picked | null>(null)
  const [problem, setProblem] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [returnTo, setReturnTo] = useState('')

  const logoRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.searchParams.get(SENT) === '1') {
      setSent(true)
      // Drop the marker so a refresh does not re-show the receipt.
      url.searchParams.delete(SENT)
      window.history.replaceState(null, '', `${url.pathname}${url.search}#inquire`)
    }
    const back = new URL(import.meta.env.BASE_URL, window.location.origin)
    back.searchParams.set(SENT, '1')
    setReturnTo(back.toString())
  }, [])

  // Object URLs leak if the component unmounts with files still selected.
  useEffect(
    () => () => {
      picked.forEach((p) => p.url && URL.revokeObjectURL(p.url))
      if (logo?.url) URL.revokeObjectURL(logo.url)
    },
    [picked, logo],
  )

  // Mirror state back into the native inputs — this is what actually gets
  // posted. Guarded because DataTransfer is absent in non-browser contexts.
  useEffect(() => {
    if (typeof DataTransfer === 'undefined') return
    if (filesRef.current) {
      const dt = new DataTransfer()
      picked.forEach((p) => dt.items.add(p.file))
      filesRef.current.files = dt.files
    }
    if (logoRef.current) {
      const dt = new DataTransfer()
      if (logo) dt.items.add(logo.file)
      logoRef.current.files = dt.files
    }
  }, [picked, logo])

  const wrap = (file: File): Picked => ({
    file,
    url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
  })

  const totalMb = () => mb(picked.reduce((n, p) => n + p.file.size, 0) + (logo?.file.size ?? 0))

  const addFiles = (list: FileList | null) => {
    if (!list?.length) return
    const incoming = [...list]

    const oversize = incoming.find((f) => mb(f.size) > MAX_FILE_MB)
    if (oversize) {
      setProblem(`${oversize.name} is over ${MAX_FILE_MB} MB. Compress it or send a link instead.`)
      return
    }
    if (picked.length + incoming.length > MAX_FILES) {
      setProblem(`That is more than ${MAX_FILES} files. Send the most useful ones.`)
      return
    }
    const next = [...picked, ...incoming.map(wrap)]
    if (mb(next.reduce((n, p) => n + p.file.size, 0) + (logo?.file.size ?? 0)) > MAX_TOTAL_MB) {
      setProblem(`Attachments come to more than ${MAX_TOTAL_MB} MB in total.`)
      return
    }
    setProblem('')
    setPicked(next)
  }

  const setLogoFile = (list: FileList | null) => {
    const file = list?.[0]
    if (!file) return
    if (mb(file.size) > MAX_FILE_MB) {
      setProblem(`${file.name} is over ${MAX_FILE_MB} MB.`)
      return
    }
    if (mb(file.size) + mb(picked.reduce((n, p) => n + p.file.size, 0)) > MAX_TOTAL_MB) {
      setProblem(`Attachments come to more than ${MAX_TOTAL_MB} MB in total.`)
      return
    }
    if (logo?.url) URL.revokeObjectURL(logo.url)
    setProblem('')
    setLogo(wrap(file))
  }

  const removeAt = (i: number) => {
    const gone = picked[i]
    if (gone.url) URL.revokeObjectURL(gone.url)
    setPicked(picked.filter((_, n) => n !== i))
  }

  const dropLogo = () => {
    if (logo?.url) URL.revokeObjectURL(logo.url)
    setLogo(null)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!INQUIRY.endpoint) {
      event.preventDefault()
      setProblem(INQUIRY.unconfigured)
      return
    }
    if (totalMb() > MAX_TOTAL_MB) {
      event.preventDefault()
      setProblem(`Attachments come to more than ${MAX_TOTAL_MB} MB in total.`)
      return
    }
    // Otherwise let the browser post it; the page navigates and returns.
    setSending(true)
  }

  const message = problem || (sent && INQUIRY.success) || ''

  return (
    <section className="section section--deep inquire" id="inquire">
      <div className="wrap">
        <p className="t-label marker inquire__eyebrow">{INQUIRY.eyebrow}</p>

        <Reveal className="inquire__intro" stagger>
          <h2 className="t-section inquire__heading">{INQUIRY.heading}</h2>
          <p className="t-body t-body--lg inquire__body">{INQUIRY.body}</p>
        </Reveal>

        <form
          className="inquire__form"
          method="POST"
          action={INQUIRY.endpoint}
          encType="multipart/form-data"
          onSubmit={onSubmit}
        >
          {/* FormSubmit control fields. _honey is a bot trap: a real person
              never sees it, so anything that fills it is discarded. */}
          <input type="hidden" name="_subject" value={INQUIRY.subject} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={returnTo} />
          <input
            className="u-sr"
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="field">
            <label className="t-label" htmlFor="q-name">
              Your name
            </label>
            <input className="t-body" id="q-name" name="name" type="text" required />
          </div>

          <div className="field">
            <label className="t-label" htmlFor="q-email">
              Email
            </label>
            <input className="t-body" id="q-email" name="email" type="email" required />
          </div>

          <div className="field">
            <label className="t-label" htmlFor="q-business">
              Business or brand
            </label>
            <input className="t-body" id="q-business" name="business" type="text" />
          </div>

          <div className="field">
            <label className="t-label" htmlFor="q-type">
              What do you need
            </label>
            <select className="t-body" id="q-type" name="projectType" defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="field field--wide">
            <label className="t-label" htmlFor="q-brief">
              Tell us about it
            </label>
            <textarea
              className="t-body"
              id="q-brief"
              name="brief"
              rows={5}
              required
              placeholder="What you are trying to do, who it is for, and anything you already have."
            />
          </div>

          <div className="field field--wide">
            <label className="t-label" htmlFor="q-budget">
              Budget <span className="inquire__optional">optional</span>
            </label>
            <input
              className="t-body"
              id="q-budget"
              name="budget"
              type="text"
              aria-describedby="q-budget-note"
              placeholder="Whatever you have in mind"
            />
            <p className="t-body inquire__note" id="q-budget-note">
              {INQUIRY.budgetNote}
            </p>
          </div>

          <div className="field field--wide">
            <span className="t-label">Logo</span>
            <label className="drop" htmlFor="q-logo">
              <input
                id="q-logo"
                name="logo"
                type="file"
                accept={ACCEPT}
                ref={logoRef}
                onChange={(e) => setLogoFile(e.target.files)}
              />
              <span className="t-label drop__cue">
                {logo ? describe(logo.file) : 'Choose a file'}
              </span>
            </label>
            {logo && (
              <ul className="thumbs">
                <li className="thumb">
                  {logo.url ? <img src={logo.url} alt="" /> : <span className="t-label">PDF</span>}
                  <button className="t-label thumb__x" type="button" onClick={dropLogo}>
                    Remove<span className="u-sr">{` ${logo.file.name}`}</span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="field field--wide">
            <span className="t-label">Photos and references</span>
            <label className="drop" htmlFor="q-files">
              <input
                id="q-files"
                name="attachments"
                type="file"
                accept={ACCEPT}
                multiple
                ref={filesRef}
                onChange={(e) => addFiles(e.target.files)}
              />
              <span className="t-label drop__cue">
                Choose files — images or PDF, {MAX_TOTAL_MB} MB total
              </span>
            </label>

            {picked.length > 0 && (
              <>
                <ul className="thumbs">
                  {picked.map((p, i) => (
                    <li className="thumb" key={`${p.file.name}-${i}`}>
                      {p.url ? <img src={p.url} alt="" /> : <span className="t-label">PDF</span>}
                      <button className="t-label thumb__x" type="button" onClick={() => removeAt(i)}>
                        Remove<span className="u-sr">{` ${p.file.name}`}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="t-label inquire__tally">
                  {picked.length} of {MAX_FILES} · {totalMb().toFixed(1)} of {MAX_TOTAL_MB} MB
                </p>
              </>
            )}
          </div>

          <div className="field field--wide inquire__actions">
            <button className="t-label inquire__submit" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send inquiry →'}
            </button>

            <p className="t-body inquire__status" role="status" aria-live="polite">
              {message}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
