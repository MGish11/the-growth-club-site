# The Growth Club

Marketing site for The Growth Club. React + Vite + TypeScript, GSAP + Lenis.

```bash
npm install
npm run dev     # http://localhost:5183
npm run build
```

Registered in `../.claude/launch.json` as `growth-club`.

---

## Where the design came from

The type system and scroll behaviour were traced from the **Constantine**
Framer template (`constantine.framer.ai`) by measuring the live DOM — not
copied from it. No assets, code, copy or branding came across; the palette
is different and the content is ours. What was taken is technique, which
isn't protectable: negative tracking, justified headings, a clip-path word
reveal.

If you want the original as a reference it's $49 on the Framer marketplace.

## The three things that carry the look

Change anything else before you change these.

**1. `--track: -0.06em` at every size.** The reference used exactly this
ratio at 32px, 28px, 24px, 18px and 16px. Tight negative tracking on Inter
is most of the feel. Small labels loosen to `--track-loose: -0.03em`.

**2. `text-align: justify` on statement headings *and* body copy.** Flush
both edges is what produces the hard-edged blocks. Body also runs at
line-height 1.0–1.2 — tighter than normal — so paragraphs read as texture
rather than prose. Deliberate.

**3. The clip-path word wipe**, in one accent color only.

## Type scale

| Class          | Face       | Size @1440 | LH        | Weight |
| -------------- | ---------- | ---------- | --------- | ------ |
| `t-display`    | Bebas Neue | 160px      | 0.9       | 400    |
| `t-subdisplay` | Bebas Neue | 70px       | 1.2       | 400    |
| `t-statement`  | Inter      | 32px       | 0.95–1.0  | 700    |
| `t-quote`      | Inter      | 28px       | 1.0       | 700    |
| `t-section`    | Inter      | 24px       | 0.95      | 700    |
| `t-eyebrow`    | Inter      | 18px       | 1.0       | 700    |
| `t-label`      | Inter      | 16px       | 1.25      | 600    |
| `t-body`       | Inter      | 16–18px    | 1.0–1.2   | 500    |

All sizes are `clamp()`ed so they hold down to 375px.

## Palette

Same tonal roles as the reference (deep primary / warm off-white / muted
accent), shifted off its navy onto a forest hue.

| Token         | Value       | Role                        |
| ------------- | ----------- | --------------------------- |
| `--deep`      | `#12362b`   | primary blocks, display type |
| `--cream`     | `#efede3`   | page background             |
| `--ink`       | `#111111`   | body text on cream          |
| `--accent`    | `#8fa894`   | the wipe color              |
| `--accent-2`  | `#7c9482`   | secondary text on deep      |
| `--rule`      | `#12362b33` | hairlines on cream          |
| `--wash`      | `#12362b0d` | faint fills                 |
| `--rule-inv`  | `#efede333` | hairlines on deep           |

## Components

- **`Wipe`** — the signature. Two stacked copies of a word; the base sits
  in the inherited color, the fill sits on top in `--accent` clipped to
  `inset(0 100% 0 0)`, and ScrollTrigger opens the clip left→right. The word
  *recolors behind a hard edge* rather than fading. Layout never shifts
  because the base is always present.
- **`Statement`** — renders a justified uppercase block, turning any
  `{braced}` word into a `Wipe` with an automatic left-to-right stagger.
  Copy lives in `config/content.ts`: `'WE BUILD {PREDICTABLE} GROWTH'`.
- **`Parallax`** — travel is `rate × element height`, so tall media drifts
  further than short cards. Measured on the reference: a 1552px block moved
  -217px and a 248px block -55px, both ≈0.14 × height. Height-relative
  means nothing drifts out of its section at any viewport.
- **`Ticker`** — three duplicated tracks, width measured after layout and
  wrapped with modulo, so the loop survives the font swap and resizes.
- **`CircleBadge`** — per-character absolute positioning at a radius, not
  an SVG `textPath`. The whole ring spins with one transform on the parent.
- **`Reveal`** — opacity + rise. `stagger` walks direct children.

All motion constants live in `config/tuning.ts`. All copy lives in
`config/content.ts`.

## Gotchas worth remembering

- **`overflow-x: hidden` on `body` makes body a scroll container.** The
  computed value becomes `hidden auto`. Prefer `overflow-x: clip` if you
  ever see ScrollTrigger measuring against the wrong scroller.
- **Don't put `gap` on the hero flex column.** It applies between the two
  rules and the ticker as well, which silently added ~173px of dead space.
  The one gap that's wanted is a margin on `.hero__inner`.
- **The `↳` glyph (U+21B3) is outside Inter's latin subset** and falls back
  to a mismatched face. Section markers are drawn with CSS borders instead
  (`.marker`).
- **`CircleBadge` step must derive from text length.** The reference's
  4.3°/char only closes the circle for an ~84-character string.
- **The hero wordmark's `36vw` is tuned to six characters.** Bebas caps run
  about 0.42em wide. Change `BRAND.wordmark` length and retune. It's also
  capped at `53vh` so short viewports don't push the ticker below the fold.
- **rAF is paused when the page isn't compositing** (hidden preview pane,
  background tab). GSAP's ticker is rAF-driven, so time-based tweens freeze
  while scrub-based ones still update on scroll events. That's environmental,
  not a bug — check `document.hidden` before debugging further.

## Verified

Typechecks clean. At 1440×900: hero fits 100vh exactly, wordmark spans 91%
of the measure, page is 6075px, no horizontal overflow. At 375px: no
overflow, all grids collapse to one column. Wipes confirmed animating
clip-path 100%→0% in `--accent` with a 0.12s stagger; reveals confirmed
opacity 0→1 with a 20px rise.

## Not done yet

- Real imagery — `Work` renders numbered placeholders. Drop an `<img>`
  inside `.work__media-inner` and the parallax works as-is.
- Contact form is a mailto link, not a form.
- No blog / project detail routes — single page only.

### Content that must be replaced before launch

All copy in `config/content.ts` is placeholder sized to the layout. Most
of it is harmless marketing prose, but these fields are deliberately
generic and must not be filled in with anything approximate:

| Field                | Why                                                |
| -------------------- | -------------------------------------------------- |
| `WORK[]`             | Named clients + results read as real case studies   |
| `TESTIMONIAL`        | An attributed quote nobody said is a fake endorsement |
| `ABOUT.stats`        | Track-record figures are factual claims             |
| `BRAND.founded`      | Founding year                                       |
| `BRAND.email/phone`  | Currently `example.com` and a reserved 555 number   |
| `PRICING[].price`    | Structural only — yours to set                      |

Use real, verifiable content with client sign-off where it names anyone,
or cut the section. Filler that looks like a claim becomes a claim the
moment the site is public.
