export type SeoPage = {
  path: string
  title: string
  eyebrow: string
  intro: string
  category: 'core' | 'city' | 'city-service' | 'intent' | 'project' | 'support'
  bullets: string[]
  faq: Array<{ q: string; a: string }>
}

export const cities = [
  'Addison',
  'Aurora',
  'Bartlett',
  'Batavia',
  'Bolingbrook',
  'Bristol',
  'Burr Ridge',
  'Carol Stream',
  'Clarendon Hills',
  'Darien',
  'Downers Grove',
  'Elmhurst',
  'Geneva',
  'Glen Ellyn',
  'Hinsdale',
  'Homer Glen',
  'Itasca',
  'Lemont',
  'Lisle',
  'Lockport',
  'Lombard',
  'Montgomery',
  'Naperville',
  'North Aurora',
  'Oak Brook',
  'Oswego',
  'Plainfield',
  'Romeoville',
  'St. Charles',
  'Streamwood',
  'Sugar Grove',
  'Villa Park',
  'Warrenville',
  'Wayne',
  'West Chicago',
  'Westmont',
  'Wheaton',
  'Willowbrook',
  'Winfield',
  'Wood Dale',
  'Woodridge',
  'Yorkville',
]

export const serviceModifiers = [
  { slug: 'post-construction-cleaning', name: 'Post-construction cleaning' },
  { slug: 'final-cleaning', name: 'Final cleaning' },
  { slug: 'after-renovation-cleaning', name: 'After-renovation cleaning' },
  { slug: 'construction-dust-cleaning', name: 'Construction dust cleaning' },
  { slug: 'touch-up-cleaning', name: 'Touch-up cleaning' },
]

const corePages = [
  ['post-construction-cleaning', 'Post-construction cleaning'],
  ['construction-cleaning', 'Construction cleaning'],
  ['final-cleaning', 'Final cleaning'],
  ['rough-cleaning', 'Rough cleaning'],
  ['touch-up-cleaning', 'Touch-up cleaning'],
  ['after-renovation-cleaning', 'After-renovation cleaning'],
  ['construction-dust-cleaning', 'Construction dust cleaning'],
  ['commercial-post-construction-cleaning', 'Commercial post-construction cleaning'],
  ['residential-post-construction-cleaning', 'Residential post-construction cleaning'],
  ['construction-cleaning-services', 'Construction cleaning services'],
  ['post-construction-cleaning-services', 'Post-construction cleaning services'],
  ['request-a-bid', 'Request a post-construction cleaning bid'],
] as const

const intentPages = [
  ['post-construction-cleaning-cost', 'Post-construction cleaning cost'],
  ['post-construction-cleaning-prices', 'Post-construction cleaning prices'],
  ['construction-cleaning-checklist', 'Construction cleaning checklist'],
  ['post-construction-cleaning-checklist', 'Post-construction cleaning checklist'],
  ['final-cleaning-checklist', 'Final cleaning checklist'],
  ['rough-cleaning-checklist', 'Rough cleaning checklist'],
  ['after-renovation-cleaning-checklist', 'After-renovation cleaning checklist'],
  ['construction-dust-removal', 'Construction dust removal'],
  ['drywall-dust-cleaning', 'Drywall dust cleaning'],
  ['renovation-dust-cleaning', 'Renovation dust cleaning'],
  ['cleaning-before-final-inspection', 'Cleaning before final inspection'],
  ['cleaning-before-owner-walkthrough', 'Cleaning before owner walkthrough'],
  ['cleaning-before-move-in', 'Cleaning before move-in'],
  ['cleaning-before-listing-photos', 'Cleaning before listing photos'],
  ['cleaning-after-remodel', 'Cleaning after remodel'],
  ['cleaning-after-kitchen-remodel', 'Cleaning after kitchen remodel'],
  ['cleaning-after-bathroom-remodel', 'Cleaning after bathroom remodel'],
  ['cabinet-interior-cleaning-after-construction', 'Cabinet interior cleaning after construction'],
  ['window-track-cleaning-after-construction', 'Window track cleaning after construction'],
  ['floor-cleaning-after-construction', 'Floor cleaning after construction'],
  ['fixture-cleaning-after-construction', 'Fixture cleaning after construction'],
  ['vent-cleaning-after-renovation-dust', 'Vent cleaning after renovation dust'],
  ['baseboard-cleaning-after-construction', 'Baseboard cleaning after construction'],
  ['new-home-construction-cleaning', 'New home construction cleaning'],
  ['new-build-cleaning', 'New build cleaning'],
  ['builder-cleaning-service', 'Builder cleaning service'],
  ['contractor-cleanup-service', 'Contractor cleanup service'],
  ['punch-list-cleaning', 'Punch-list cleaning'],
  ['handoff-cleaning', 'Handoff cleaning'],
  ['turnover-cleaning-after-construction', 'Turnover cleaning after construction'],
  ['move-in-ready-construction-cleaning', 'Move-in ready construction cleaning'],
  ['same-week-post-construction-cleaning', 'Same-week post-construction cleaning'],
  ['urgent-final-cleaning', 'Urgent final cleaning'],
  ['construction-cleaning-estimate', 'Construction cleaning estimate'],
  ['post-construction-cleaning-quote', 'Post-construction cleaning quote'],
  ['construction-cleaning-for-contractors', 'Construction cleaning for contractors'],
  ['construction-cleaning-for-homeowners', 'Construction cleaning for homeowners'],
  ['construction-cleaning-for-property-managers', 'Construction cleaning for property managers'],
  ['post-renovation-house-cleaning', 'Post-renovation house cleaning'],
  ['remodel-cleanup-service', 'Remodel cleanup service'],
  ['dust-cleaning-after-floor-installation', 'Dust cleaning after floor installation'],
  ['dust-cleaning-after-drywall-repair', 'Dust cleaning after drywall repair'],
  ['cleaning-after-painting-and-remodeling', 'Cleaning after painting and remodeling'],
  ['post-construction-cleaning-near-me', 'Post-construction cleaning near me'],
] as const

const projectPages = [
  ['apartment-post-construction-cleaning', 'Apartment post-construction cleaning'],
  ['condo-post-construction-cleaning', 'Condo post-construction cleaning'],
  ['single-family-home-post-construction-cleaning', 'Single-family home post-construction cleaning'],
  ['townhome-post-construction-cleaning', 'Townhome post-construction cleaning'],
  ['multifamily-final-cleaning', 'Multifamily final cleaning'],
  ['office-buildout-cleaning', 'Office build-out cleaning'],
  ['retail-buildout-cleaning', 'Retail build-out cleaning'],
  ['restaurant-buildout-cleaning', 'Restaurant build-out cleaning'],
  ['medical-office-buildout-cleaning', 'Medical office build-out cleaning'],
  ['real-estate-listing-cleaning-after-renovation', 'Real estate listing cleaning after renovation'],
  ['rental-turnover-cleaning-after-renovation', 'Rental turnover cleaning after renovation'],
  ['property-manager-construction-cleaning', 'Property manager construction cleaning'],
  ['general-contractor-final-cleaning', 'General contractor final cleaning'],
  ['remodeler-final-cleaning', 'Remodeler final cleaning'],
  ['builder-closeout-cleaning', 'Builder closeout cleaning'],
  ['custom-home-final-cleaning', 'Custom home final cleaning'],
  ['basement-remodel-cleaning', 'Basement remodel cleaning'],
  ['kitchen-renovation-cleaning', 'Kitchen renovation cleaning'],
  ['bathroom-renovation-cleaning', 'Bathroom renovation cleaning'],
  ['flooring-project-cleanup', 'Flooring project cleanup'],
  ['painting-project-cleanup', 'Painting project cleanup'],
  ['window-installation-cleanup', 'Window installation cleanup'],
  ['tenant-improvement-cleaning', 'Tenant improvement cleaning'],
  ['construction-cleaning-for-open-house', 'Construction cleaning for open house'],
] as const

const supportPages = [
  ['service-areas', 'Post-construction cleaning service areas'],
  ['post-construction-cleaning-faq', 'Post-construction cleaning FAQ'],
  ['post-construction-cleaning-vs-deep-cleaning', 'Post-construction cleaning vs deep cleaning'],
  ['final-cleaning-vs-touch-up-cleaning', 'Final cleaning vs touch-up cleaning'],
  ['rough-cleaning-vs-final-cleaning', 'Rough cleaning vs final cleaning'],
  ['what-is-included-in-post-construction-cleaning', 'What is included in post-construction cleaning'],
  ['what-is-not-included-in-post-construction-cleaning', 'What is not included in post-construction cleaning'],
  ['how-to-prepare-for-post-construction-cleaning', 'How to prepare for post-construction cleaning'],
  ['how-long-does-post-construction-cleaning-take', 'How long post-construction cleaning takes'],
  ['post-construction-cleaning-supplies', 'Post-construction cleaning supplies'],
  ['post-construction-cleaning-quality-control', 'Post-construction cleaning quality control'],
  ['post-construction-cleaning-photo-quote', 'Post-construction cleaning photo quote'],
  ['post-construction-cleaning-scheduling', 'Post-construction cleaning scheduling'],
  ['post-construction-cleaning-boundaries', 'Post-construction cleaning boundaries'],
] as const

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const makeFaq = (topic: string, context: string) => [
  {
    q: `When should I schedule ${topic.toLowerCase()}?`,
    a: `Schedule ${topic.toLowerCase()} after major trades are finished and before walkthrough, listing photos, inspection, or move-in whenever possible.`,
  },
  {
    q: `What details do you need for ${context.toLowerCase()}?`,
    a: 'We need the project ZIP, square footage, turnover date, cleaning phase, access notes, dust level, and any photos that show the current site condition.',
  },
  {
    q: 'Do you remove heavy construction debris?',
    a: 'Heavy debris hauling, dumpsters, hazardous cleanup, asbestos, lead, mold, and biohazard work are not included unless separately confirmed in writing.',
  },
]

const makePage = (
  path: string,
  title: string,
  category: SeoPage['category'],
  eyebrow: string,
  intro: string,
  context: string,
): SeoPage => ({
  path,
  title,
  category,
  eyebrow,
  intro,
  bullets: [
    'Quote built around project condition, square footage, access, and turnover date.',
    'Scope can include rough clean, final clean, touch-up clean, or after-renovation dust removal.',
    'Photo-based estimate path helps confirm dust level, glass, cabinets, floors, and site readiness.',
    'No heavy debris hauling or hazardous cleanup is promised unless separately confirmed.',
  ],
  faq: makeFaq(title, context),
})

export const seoPages: SeoPage[] = [
  ...corePages.map(([slug, title]) =>
    makePage(
      `/${slug}`,
      title,
      'core',
      'Core service',
      `${title} for renovated, newly finished, and turnover-ready spaces that need a cleaner handoff.`,
      'core service pages',
    ),
  ),
  ...cities.map((city) =>
    makePage(
      `/service-areas/${slugify(city)}`,
      `Post-construction cleaning in ${city}`,
      'city',
      'Local service area',
      `Post-construction cleaning in ${city} for remodels, build-outs, final walkthroughs, listing photos, and move-in preparation.`,
      `${city} projects`,
    ),
  ),
  ...cities.flatMap((city) =>
    serviceModifiers.map((service) =>
      makePage(
        `/service-areas/${slugify(city)}/${service.slug}`,
        `${service.slug === 'post-construction-cleaning' ? 'Post-construction cleaning service' : service.name} in ${city}`,
        'city-service',
        'City + service',
        `${service.name} in ${city} with quote details based on dust level, site access, project phase, and turnover timing.`,
        `${city} ${service.name}`,
      ),
    ),
  ),
  ...intentPages.map(([slug, title]) =>
    makePage(
      `/${slug}`,
      title,
      'intent',
      'Project intent',
      `${title} guidance for planning the right cleaning scope after construction, remodeling, or renovation work.`,
      'intent page',
    ),
  ),
  ...projectPages.map(([slug, title]) =>
    makePage(
      `/${slug}`,
      title,
      'project',
      'Project type',
      `${title} for spaces that need dust removal, surface reset, and final cleaning before they are shown or occupied.`,
      'project type page',
    ),
  ),
  ...supportPages.map(([slug, title]) =>
    makePage(
      `/${slug}`,
      title,
      'support',
      'Resource',
      `${title} for customers comparing scope, timing, cost factors, preparation steps, and service boundaries.`,
      'support page',
    ),
  ),
]

export const publicRoutes = ['/', '/privacy-policy', '/terms-of-service', '/cancellation-policy', ...seoPages.map((page) => page.path)]
