import { useEffect, useRef, useState } from 'react'
import { INQUIRY, PROJECT_TYPES } from '../config/content'
import { Reveal } from '../components/Reveal'

const MAX_FILE_MB = 10
const MAX_TOTAL_MB = 25
const MAX_FILES = 10
const ACCEPT = 'image/*,.pdf,.svg'

type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'unconfigured'

type Picked = { file: File; url: string | null }

const mb = (bytes: number) => bytes / 1024 / 1024
const describe = (f: File) => `${f.name} · ${mb(f.size).toFixed(1)} MB`

/**
 * Inquiry form: a few text fields plus logo and reference uploads.
 *
 * The site is static, so submission goes to a form backend as a multipart
 * POST — see INQUIRY.endpoint. With no endpoint set the form says so
 * rather than pretending it sent anything.
 *
 * Files are held in component state rather than left to the native input,
 * so a second pick adds to the selection instead of replacing it — which
 * is what people expect after attaching one photo at a time.
 */
export function Inquire() {
  const [picked, setPicked] = useState<Picked[]>([])
  const [logo, setLogo] = useState<Picked | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [problem, setProblem] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // Object URLs leak if the component unmounts with files still selected.
  useEffect(
    () => () => {
      picked.forEach((p) => p.url && URL.revokeObjectURL(p.url))
      if (logo?.url) URL.revokeObjectURL(logo.url)
    },
    [picked, logo],
  )

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!INQUIRY.endpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    const data = new FormData(event.currentTarget)
    // The native inputs are cleared on every pick, so send from state.
    data.delete('logo')
    data.delete('attachments')
    if (logo) data.append('logo', logo.file, logo.file.name)
    picked.forEach((p) => data.append('attachments', p.file, p.file.name))

    try {
      const res = await fetch(INQUIRY.endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      picked.forEach((p) => p.url && URL.revokeObjectURL(p.url))
      if (logo?.url) URL.revokeObjectURL(logo.url)
      setPicked([])
      setLogo(null)
      formRef.current?.reset()
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const message =
    problem ||
    (status === 'sent' && INQUIRY.success) ||
    (status === 'failed' && INQUIRY.error) ||
    (status === 'unconfigured' && INQUIRY.unconfigured) ||
    ''

  return (
    <section className="section section--deep inquire" id="inquire">
      <div className="wrap">
        <p className="t-label marker inquire__eyebrow">{INQUIRY.eyebrow}</p>

        <Reveal className="inquire__intro" stagger>
          <h2 className="t-section inquire__heading">{INQUIRY.heading}</h2>
          <p className="t-body t-body--lg inquire__body">{INQUIRY.body}</p>
        </Reveal>

        <form className="inquire__form" ref={formRef} onSubmit={onSubmit}>
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
                onChange={(e) => {
                  addFiles(e.target.files)
                  e.target.value = ''
                }}
              />
              <span className="t-label drop__cue">
                Choose files — images or PDF, up to {MAX_FILE_MB} MB each
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
            <button
              className="t-label inquire__submit"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send inquiry →'}
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
