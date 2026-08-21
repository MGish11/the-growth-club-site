/**
 * All copy in one place — swap it here, not in the components.
 *
 * Lengths matter: the layout is tuned to them, and a paragraph that runs
 * two lines longer than its neighbours breaks the block it sits in.
 * Match roughly what is there when rewriting.
 *
 * Everything here is real: the two client sites are live and embeddable,
 * and the portfolio pieces are files in public/. The placeholder case
 * studies, the invented testimonial and the empty stats row were cut
 * rather than filled in, because a fake case study or an attributed
 * quote that no one actually said is a false claim to anyone reading
 * it, whether or not it was meant as filler.
 *
 * The same bar applies to anything added later: name a client only with
 * their permission, and quote a number only if you can stand behind it.
 */

export const BRAND = {
  name: 'The Growth Club',
  /** Six characters. The hero font size is tuned to this length. */
  wordmark: 'GROWTH',
  tagline: 'Websites, marketing and creative under one roof.',
  email: 'kizunasolutionsgroup@gmail.com',
  phone: '+1 (757) 647 2720',
  /** Founding year, shown in the hero. */
  founded: '2026',
  /** Availability line, shown in the hero under the founding year. */
  availability: 'Now accepting new clients',
  /** The hero's standfirst, under the wordmark. */
  pitch:
    'A senior studio that builds the site, runs the marketing and makes the creative. One team across research, design, development, campaigns and drone work.',
  year: new Date().getFullYear(),
} as const

/**
 * Public-dir asset URL.
 *
 * Vite rewrites absolute asset paths in HTML and CSS to sit under `base`,
 * but it leaves string literals in JS alone — '/portfolio/x.webp' would
 * keep pointing at the domain root and 404 if this site is ever served
 * from a project subpath. BASE_URL carries a trailing slash, so paths are
 * written here without a leading one.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const PORTFOLIO_CATEGORIES = ['Ads', 'Brochures', 'Infographics', 'Drone'] as const

/** Filter bar for the merged work section. 'Websites' selects the WORK entries. */
export const WORK_FILTERS = ['All', 'Websites', ...PORTFOLIO_CATEGORIES] as const

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number]

export type PortfolioItem = {
  title: string
  category: PortfolioCategory
  /**
   * The still shown in the grid. For a motion piece this is the poster
   * frame. Path under public/, no leading slash — see the folder README.
   */
  src: string
  /** What the piece shows, for anyone who cannot see it. Not the title again. */
  alt: string
  /**
   * Motion pieces only. The grid still shows `src`; this plays in the
   * lightbox, so nothing downloads a video until someone asks for one.
   */
  video?: string
  /**
   * How the still sits in its 4:3 well. 'cover' fills and crops, which is
   * right for landscape photography. Portrait work — a poster, a flyer —
   * needs 'contain' or the crop takes the headline off the top.
   */
  fit?: 'cover' | 'contain'
  /** Optional PDF or full-resolution download, same path rules as `src`. */
  file?: string
  /** One line of context. Optional — the grid reads fine without it. */
  note?: string
}

/**
 * Creative portfolio. Categories with no entries render labelled placeholder
 * slots rather than inventing pieces — a mocked ad or fabricated client
 * brochure is a false claim about work you did.
 *
 * Titles below describe what is in frame. No location is named: the coastal
 * clips look like a specific place but guessing wrong on a portfolio caption
 * is worse than staying general.
 */
export const PORTFOLIO: PortfolioItem[] = [
  {
    title: 'Vince Lee — Avalon Pier',
    category: 'Ads',
    src: 'portfolio/ads/vince-lee-avalon-pier.webp',
    fit: 'contain',
    alt: 'Gig poster for Vince Lee and the Hustle Shuffle with Brittany Pettit, November 22nd at Avalon Pier, NC. Illustrated pier at sunset under a swirling psychedelic sky, framed by palms above a breaking wave',
  },
  {
    title: 'Vince Lee — The Organic Tour',
    category: 'Ads',
    src: 'portfolio/ads/vince-lee-organic-tour.webp',
    fit: 'contain',
    alt: 'Tour poster for Vince Lee and the Hustle Shuffle, The Organic Tour, Spring 2026. Retro sunset over the ocean between two palms, inside an ornate hand-lettered border',
  },
  {
    title: 'Shoreline at Sunset',
    category: 'Drone',
    src: 'portfolio/drone/dji-0019-poster.webp',
    video: 'portfolio/drone/dji-0019.mp4',
    alt: 'Low aerial pass along a beach at sunset, the sun low over houses set behind the dune line and its reflection running across the water',
  },
  {
    title: 'Ridge Line',
    category: 'Drone',
    src: 'portfolio/drone/dji-0112-poster.webp',
    video: 'portfolio/drone/dji-0112.mp4',
    alt: 'Aerial view over a pine ridge toward snow-dusted mountain peaks, with walkers on the trail below',
  },
  {
    title: 'Pier at Golden Hour',
    category: 'Drone',
    src: 'portfolio/drone/dji-0061.webp',
    alt: 'Aerial photograph of a long fishing pier running out over the ocean, with beachfront houses and a low sun on the horizon',
  },
]

export const WORK_COPY = {
  eyebrow: 'Selected work',
  heading: 'SITES, CAMPAIGNS, PRINT AND AERIAL',
  body: 'Live sites you can scroll through, plus the campaign, print and drone work that runs alongside them. Same team, same standard.',
  empty: 'Add work here',
} as const

export const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Inquire', href: '#inquire' },
  { label: 'Contact', href: '#contact' },
] as const

export const TICKER_ITEMS = ['BUILD', 'REINVENT', 'REJUVENATE']

export const BADGE_TEXT = 'GROWTH • STRATEGY • PERFORMANCE • '

export const ABOUT = {
  eyebrow: 'About',
  /** Words wrapped in {} get the wipe treatment. */
  statement:
    'WE RESEARCH, DESIGN, BUILD AND {MARKET} — SO THE SITE, THE CAMPAIGNS AND THE {CREATIVE} ALL PULL IN ONE {DIRECTION}.',
  columns: [
    'The Growth Club is a small senior team covering research, design, development, marketing and camera work. No account managers, no handoffs — the people who scope the work are the people who do it.',
    'Everything is made in house and from scratch — the site, the ad creative, the print, the aerial footage. Nothing is assembled from a template or pulled from a stock library, and nothing is handed off to a stranger.',
    'We are results-driven and obsessed with bringing your idea to life. Tell us how it should feel and we will build it — then judge it on what it returns, not on how nice it looks in a portfolio.',
  ],
} as const

export const SERVICES = [
  {
    n: '01',
    title: 'Lead Generation',
    body: 'Qualified inquiries, not form fills. Offers, funnels and follow-up built so the pipeline still holds up after the ad spend stops.',
  },
  {
    n: '02',
    title: 'Market Research',
    body: 'The work that happens before anything gets built: who is actually buying, the words they search for, and where the competition is weakest.',
  },
  {
    n: '03',
    title: 'Website Development',
    body: 'Custom builds, never page-builder templates. Fast, interactive, and structured so search engines and people both make sense of them.',
  },
  {
    n: '04',
    title: 'Digital Marketing',
    body: 'Search, social and email run as one system against one target. Creative judged on what it returns rather than on what the room liked.',
  },
  {
    n: '05',
    title: 'Drone Photography',
    body: 'Aerial stills and video for property, venue and location work. Shot for the campaign it is going into rather than handed over as raw files.',
  },
] as const

/**
 * Live client sites. Only the name, the sector and the site itself — the
 * work is the claim here, and a visitor can scroll it in the card.
 *
 * No `result` or summary field: a headline number needs the client's
 * permission and a figure you can stand behind, and approximate is the
 * same as invented once it is on a live site. Add those back per entry
 * only alongside a real number.
 */
export const WORK = [
  {
    client: 'Dolce Beauty Lounge',
    sector: 'Beauty & Skincare · Virginia Beach',
    /** Live site, embedded in the card. Must allow framing — see SiteEmbed. */
    url: 'https://mgish11.github.io/dolce-beauty-lounge/',
  },
  {
    client: 'Kristina Furia',
    sector: 'Coaching & Therapy · Breathwork',
    url: 'https://mgish11.github.io/Kristina-Furia-site/',
  },
] as const

export const PROCESS = [
  {
    n: '01',
    title: 'Footprint',
    body: 'We map everywhere you already show up — search, social, reviews, the site you have now. The findings are yours either way.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Then we plan it with you, not at you. Structure, tone and priorities agreed in working sessions before anyone opens an editor.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Site, campaign and creative made in stages you can watch. Nothing ships that has not been checked on real devices and in print.',
  },
  {
    n: '04',
    title: 'Grow',
    body: 'Once it is live we watch what people actually do, then keep tightening the pages, ads and creative that carry the traffic.',
  },
] as const

/**
 * Prices are yours to set — these are structural placeholders showing
 * how three tiers sit in the grid, not a recommendation.
 */
/**
 * Keep price values short (4-5 characters) — the display font is sized to
 * them and a longer string breaks the row.
 */
export const PRICING = [
  {
    name: 'Footprint',
    price: '$500',
    cadence: 'one-time',
    body: 'A full read of where you stand online today, with a prioritised plan for what to build first.',
    features: [
      'Digital footprint analysis',
      'Competitor + search review',
      'Structure and content plan',
      'Two working sessions',
    ],
    featured: false,
  },
  {
    name: 'Website Build',
    price: '$2K+',
    cadence: 'per project',
    body: 'The core engagement. A custom site designed with you, built from scratch and tuned to convert.',
    features: [
      'Everything in Footprint',
      'Custom design and build',
      'Motion and interaction',
      'Performance + search setup',
      'Launch and handover',
    ],
    featured: true,
  },
  {
    name: 'Growth Retainer',
    price: '$1K',
    cadence: 'per month',
    body: 'Ongoing search, social and lead generation once the site is live and earning its traffic.',
    features: [
      'Everything in Build',
      'Lead generation campaigns',
      'Search and social management',
      'Monthly reporting',
      'Standing strategy call',
    ],
    featured: false,
  },
] as const

/**
 * Project inquiry form.
 *
 * Delivery is FormSubmit, which forwards to the address in `endpoint` and
 * needs no account. Two constraints drive the component's design:
 *
 *  - Attachments only survive a NATIVE multipart POST. FormSubmit's AJAX
 *    endpoint returns JSON but drops files, so the form navigates on submit
 *    rather than using fetch, and comes back via `_next`.
 *  - Everything attached must total under 10 MB. The limits in Inquire.tsx
 *    are set below that on purpose.
 *
 * FIRST SUBMISSION ACTIVATES THE ADDRESS: FormSubmit emails a confirmation
 * link that has to be clicked once before anything is forwarded. Until then
 * submissions go nowhere.
 *
 * After confirming, FormSubmit issues a random alias string. Swapping the
 * address here for `https://formsubmit.co/<alias>` keeps the inbox out of
 * the built JavaScript, where scrapers will otherwise find it.
 */
export const INQUIRY = {
  endpoint: 'https://formsubmit.co/kizunasolutionsgroup@gmail.com',
  eyebrow: 'Start a project',
  heading: 'TELL US WHAT YOU HAVE IN MIND',
  body: 'A few details and whatever you have already — a logo, photos, a site you like. It does not need to be organised. We read every one of these ourselves.',
  /**
   * The posted tiers turn away people who would have been a good fit, so
   * the budget field says so out loud rather than leaving them to guess.
   */
  budgetNote:
    'The prices above are starting points, not gates. Tell us what you are working with and we will tell you honestly what is possible for it.',
  success: 'Thank you — that came through. We reply to every inquiry within two working days.',
  error: 'That did not send. Email us directly and we will pick it up from there.',
  unconfigured: 'The form is not connected to a backend yet — set INQUIRY.endpoint in content.ts.',
  subject: 'New inquiry from thegrowth-club.com',
} as const

export const PROJECT_TYPES = [
  'New website',
  'Redesign of an existing site',
  'Digital marketing',
  'Lead generation',
  'Market research',
  'Ads and creative',
  'Drone photography',
  'Not sure yet',
] as const

export const CONTACT = {
  eyebrow: 'Get in touch',
  display: "LET'S TALK",
  body: 'Tell us what you are trying to build or grow, and what you have already tried. If we are not the right fit we will say so and point you somewhere better.',
} as const
