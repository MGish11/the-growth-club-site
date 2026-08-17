/**
 * All copy in one place — swap it here, not in the components.
 * Everything below is placeholder written to the right shape and
 * length; the layout depends on these staying roughly this size.
 */

export const BRAND = {
  name: 'The Growth Club',
  wordmark: 'GROWTH',
  tagline: 'Growth marketing for brands that are done guessing.',
  email: 'hello@thegrowthclub.co',
  phone: '+1 (555) 018 4420',
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
    'We work in tight loops: instrument, test, read the data, cut what fails, double the budget on what works. Most engagements show measurable movement inside the first ninety days.',
    'We are channel-agnostic and revenue-obsessed. If paid social is not the lever, we will tell you that on the first call rather than sell you a retainer for it.',
  ],
  stats: [
    { value: '$40M+', label: 'Managed spend' },
    { value: '3.8×', label: 'Median ROAS' },
    { value: '60+', label: 'Brands scaled' },
    { value: '11', label: 'Years running' },
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

export const WORK = [
  {
    client: 'Northwind Supply',
    sector: 'DTC · Outdoor',
    result: '4.2× ROAS in 6 months',
    body: 'Rebuilt the acquisition stack and cut CAC by 38% while tripling monthly spend.',
  },
  {
    client: 'Aster Health',
    sector: 'Subscription · Wellness',
    result: '2.1× LTV lift',
    body: 'Lifecycle overhaul turned a leaky funnel into the highest-margin channel in the business.',
  },
  {
    client: 'Fold & Co',
    sector: 'Retail · Apparel',
    result: '+61% conversion rate',
    body: 'A checkout rebuild and twelve weeks of disciplined testing on the top five landing pages.',
  },
  {
    client: 'Meridian Tools',
    sector: 'B2B · Hardware',
    result: '$2.4M pipeline added',
    body: 'Paid search plus a rewritten demo funnel, measured end to end for the first time.',
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

export const TESTIMONIAL = {
  quote:
    'THEY FOUND $300K OF WASTED SPEND IN THE FIRST MONTH AND REINVESTED IT BEFORE WE EVEN SIGNED THE FULL RETAINER.',
  name: 'Dana Whitfield',
  role: 'VP Growth, Northwind Supply',
} as const

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
