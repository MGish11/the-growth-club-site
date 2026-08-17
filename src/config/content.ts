/**
 * All copy in one place — swap it here, not in the components.
 *
 * Everything below is placeholder, written to the right shape and
 * length so the layout holds; the design depends on these staying
 * roughly this size.
 *
 * Placeholders are deliberately generic. Client names, results,
 * testimonials and track-record figures are the kind of thing that
 * must never reach a live site as invented copy — a fake case study
 * or an attributed quote that no one actually said is a false claim
 * to anyone reading it, whether or not it was meant as filler.
 * Replace them with real, verifiable content before launch, or cut
 * the section.
 */

export const BRAND = {
  name: 'The Growth Club',
  /** Six characters. The hero font size is tuned to this length. */
  wordmark: 'GROWTH',
  tagline: 'Growth marketing for brands that are done guessing.',
  /** PLACEHOLDER contact details — 555 is a reserved fictional range. */
  email: 'hello@example.com',
  phone: '+1 (555) 018 4420',
  /** PLACEHOLDER founding year, shown in the hero. */
  founded: 'YYYY',
  /** PLACEHOLDER availability line, shown in the hero. */
  availability: 'Availability line',
  year: new Date().getFullYear(),
} as const

export const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
] as const

export const TICKER_ITEMS = [
  'PAID ACQUISITION',
  'LIFECYCLE',
  'CRO',
  'BRAND',
  'ANALYTICS',
  'RETENTION',
]

export const BADGE_TEXT = 'GROWTH • STRATEGY • PERFORMANCE • '

export const ABOUT = {
  eyebrow: 'About',
  /** Words wrapped in {} get the wipe treatment. */
  statement:
    'WE BUILD {PREDICTABLE} GROWTH SYSTEMS FOR BRANDS THAT HAVE OUTGROWN {GUESSWORK} AND WANT COMPOUNDING {RESULTS}.',
  columns: [
    'The Growth Club is a small senior team. No account managers, no handoffs — the people who scope your strategy are the people who run it. We take on a limited number of clients so each one gets real attention.',
    'We work in tight loops: instrument, test, read the data, cut what fails, put budget behind what works. This paragraph is placeholder sized to show how a third column of body copy sits in the block.',
    'We are channel-agnostic and revenue-obsessed. If paid social is not the lever, we will tell you that on the first call rather than sell you a retainer for it.',
  ],
  /**
   * PLACEHOLDER — these are your real numbers to fill in, not ours to
   * invent. Keep the values short (2–5 characters) or the row breaks.
   */
  stats: [
    { value: '—', label: 'Managed spend' },
    { value: '—', label: 'Median ROAS' },
    { value: '—', label: 'Brands scaled' },
    { value: '—', label: 'Years running' },
  ],
} as const

export const SERVICES = [
  {
    n: '01',
    title: 'Paid Acquisition',
    body: 'Meta, Google, TikTok and programmatic, run as one budget with one target. Creative testing built into the media plan rather than bolted on.',
  },
  {
    n: '02',
    title: 'Lifecycle & Retention',
    body: 'Email and SMS flows that carry real revenue. Segmentation, winback, post-purchase — the unglamorous compounding stuff.',
  },
  {
    n: '03',
    title: 'Conversion Rate',
    body: 'Landing pages and checkout paths rebuilt against session data. We ship tests weekly and kill losers fast.',
  },
  {
    n: '04',
    title: 'Analytics & Attribution',
    body: 'Clean tracking, server-side events, and a dashboard you actually trust. You cannot scale what you cannot measure.',
  },
] as const

/**
 * PLACEHOLDER CASE STUDIES — every field here is a slot, not a claim.
 * Invented client names and results read as real case studies to anyone
 * visiting, so these stay generic until you have permission to name a
 * client and a number you can stand behind. Cut the section rather than
 * ship it filled in with anything approximate.
 */
export const WORK = [
  {
    client: 'Client One',
    sector: 'Sector · Category',
    result: 'Headline result',
    body: 'Placeholder case study copy, sized to show how two lines of summary sit under the media well.',
  },
  {
    client: 'Client Two',
    sector: 'Sector · Category',
    result: 'Headline result',
    body: 'One sentence on the problem, one on what you changed. Keep it to roughly this length.',
  },
  {
    client: 'Client Three',
    sector: 'Sector · Category',
    result: 'Headline result',
    body: 'Placeholder case study copy, sized to show how two lines of summary sit under the media well.',
  },
  {
    client: 'Client Four',
    sector: 'Sector · Category',
    result: 'Headline result',
    body: 'One sentence on the problem, one on what you changed. Keep it to roughly this length.',
  },
] as const

export const PROCESS = [
  {
    n: '01',
    title: 'Audit',
    body: 'Two weeks inside your accounts, analytics and creative. You get the findings whether or not we work together.',
  },
  {
    n: '02',
    title: 'Plan',
    body: 'A ninety-day plan with named channels, budgets and the specific numbers we are moving. No vague deliverables.',
  },
  {
    n: '03',
    title: 'Run',
    body: 'We execute weekly. Standing call, shared dashboard, and a written summary every Friday.',
  },
  {
    n: '04',
    title: 'Scale',
    body: 'Once a channel is profitable and stable we push budget into it and start the loop again on the next lever.',
  },
] as const

/**
 * PLACEHOLDER — an invented quote attributed to a named person at a
 * named company is a fabricated endorsement, full stop. Use a real one
 * with the client's sign-off, or delete the block from Process.tsx.
 */
export const TESTIMONIAL = {
  quote:
    'PLACEHOLDER TESTIMONIAL COPY, SET AT ROUGHLY THE LENGTH A REAL CLIENT QUOTE SHOULD RUN TO IN THIS BLOCK.',
  name: 'Client name',
  role: 'Title, Company',
} as const

/**
 * Prices are yours to set — these are structural placeholders showing
 * how three tiers sit in the grid, not a recommendation.
 */
export const PRICING = [
  {
    name: 'Audit',
    price: '$6K',
    cadence: 'one-time',
    body: 'A full teardown of acquisition, lifecycle and tracking, with a prioritised ninety-day plan.',
    features: ['Account + analytics audit', 'Creative teardown', '90-day plan', 'Two review calls'],
    featured: false,
  },
  {
    name: 'Growth Retainer',
    price: '$12K',
    cadence: 'per month',
    body: 'The core engagement. We run acquisition and lifecycle as one system against a shared target.',
    features: [
      'Everything in Audit',
      'Paid media management',
      'Lifecycle + CRO',
      'Weekly reporting',
      'Standing strategy call',
    ],
    featured: true,
  },
  {
    name: 'Embedded',
    price: 'Custom',
    cadence: 'quarterly',
    body: 'For teams that need senior growth leadership in the building rather than on a call.',
    features: [
      'Everything in Retainer',
      'Fractional growth lead',
      'Team training',
      'Board-ready reporting',
    ],
    featured: false,
  },
] as const

export const CONTACT = {
  eyebrow: 'Get in touch',
  display: "LET'S TALK",
  body: 'Tell us what you are trying to grow and what you have already tried. If we are not the right fit we will say so and point you somewhere better.',
} as const
