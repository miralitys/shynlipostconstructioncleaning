export type SeoPage = {
  path: string
  title: string
  eyebrow: string
  intro: string
  category: 'core' | 'city' | 'city-service' | 'intent' | 'project' | 'support'
  bullets: string[]
  faq: Array<{ q: string; a: string }>
}

export type GuidePage = {
  path: string
  title: string
  keywords: string[]
  description: string
  eyebrow: string
  h1: string
  summary: string
  readTime: string
  sourceQuestion: string
  updated: string
  shortAnswer: string
  sections: Array<{
    title: string
    body: string[]
    links?: Array<{ href: string; label: string }>
  }>
  checklistTitle: string
  checklist: string[]
  faq: Array<{ q: string; a: string }>
  related: Array<{ href: string; label: string }>
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

export const guidePages: GuidePage[] = [
  {
    path: '/guides/why-construction-dust-keeps-coming-back',
    title: 'Why Construction Dust Keeps Coming Back | Shynli Post-Construction Cleaning',
    keywords: [
      'construction dust keeps coming back',
      'dust after renovation',
      'drywall dust keeps settling',
      'post construction dust cleaning',
      'renovation dust cleanup',
    ],
    description:
      'Learn why fine construction dust keeps resettling after a remodel, what a cleaner can fix, and when HVAC, filters, vents, or unfinished work may still be the source.',
    eyebrow: 'Dust reset guide',
    h1: 'Why construction dust keeps coming back after you already cleaned.',
    summary:
      'Fine drywall and construction dust can keep appearing because it hides in vents, ledges, floors, trim, fabrics, and unfinished work zones before settling again.',
    readTime: '7 min read',
    sourceQuestion: 'Why is my house still dusty weeks after construction?',
    updated: 'June 16, 2026',
    shortAnswer:
      'Construction dust often keeps coming back because the first cleaning lifts fine particles into the air, dust remains in vents and high ledges, or trades are still disturbing unfinished areas. A real post-construction clean usually needs top-down dusting, controlled vacuuming, damp wiping, floor detail, and sometimes a smaller touch-up after the dust settles again.',
    sections: [
      {
        title: 'The dust is finer than normal household dust',
        body: [
          'Drywall dust, sawdust, sanding residue, flooring dust, and paint-prep dust behave differently from ordinary dust. They are light enough to float, stick to slightly damp surfaces, collect in corners, and reappear after people walk through the room.',
          'That is why a home can look clean for one evening and feel dusty again the next morning. The first pass often removes the visible layer, but it also disturbs the powder sitting on trim, vent covers, cabinet tops, window tracks, baseboards, and floor edges.',
        ],
        links: [
          { href: '/construction-dust-cleaning', label: 'Construction dust cleaning' },
          { href: '/drywall-dust-cleaning', label: 'Drywall dust cleaning' },
        ],
      },
      {
        title: 'The source may still be active',
        body: [
          'If a contractor comes back for sanding, cabinet adjustments, paint touch-ups, flooring transitions, or punch-list repairs, the space is not truly finished yet. Even a small return visit can put dust back on counters, fixtures, doors, stairs, and floors.',
          'This is why many projects need two different expectations: a final clean when the major work is done, and a smaller touch-up clean after punch-list work. The final clean makes the space usable and presentable; the touch-up protects the walkthrough or move-in deadline.',
        ],
        links: [
          { href: '/final-cleaning', label: 'Final cleaning' },
          { href: '/touch-up-cleaning', label: 'Touch-up cleaning' },
          { href: '/punch-list-cleaning', label: 'Punch-list cleaning' },
        ],
      },
      {
        title: 'Vents, filters, and air movement matter',
        body: [
          'A cleaner can remove dust from reachable surfaces, vents covers, floors, trim, and visible registers. But if fine dust has been pulled into HVAC filters, ducts, or hidden cavities, the air system can keep moving residue through the house after the cleaning visit.',
          'Before booking, it helps to check whether filters were changed after the dusty work. If dust is blowing from vents or returning immediately after the system runs, the cleaning plan may need to be paired with filter changes or a separate HVAC conversation.',
        ],
        links: [
          { href: '/vent-cleaning-after-renovation-dust', label: 'Vent cleaning after renovation dust' },
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
        ],
      },
      {
        title: 'One pass is not always the honest answer',
        body: [
          'A good post-construction cleaning request should describe how dusty the work was, where dust traveled, whether the home is occupied, and whether any trades are still active. Photos help because dust in a kitchen remodel is different from dust after a whole-house drywall project.',
          'If the goal is move-in, listing photos, inspection, or an owner walkthrough, say that up front. The cleaning can then focus on what people will notice first: floors, counters, cabinet interiors, fixtures, glass, bathroom surfaces, baseboards, ledges, stairs, and entry paths.',
        ],
        links: [
          { href: '/cleaning-before-move-in', label: 'Cleaning before move-in' },
          { href: '/cleaning-before-final-inspection', label: 'Cleaning before final inspection' },
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo quote' },
        ],
      },
    ],
    checklistTitle: 'Send these details before asking for a dust reset quote',
    checklist: [
      'Which rooms were renovated and which rooms only collected traveling dust.',
      'Whether drywall sanding, flooring cuts, paint prep, or cabinet work created the dust.',
      'Whether the HVAC was running during the work and whether filters were changed.',
      'Whether furniture, rugs, curtains, bedding, or personal items are still in the space.',
      'Photos of floors, vents, window tracks, cabinets, stairs, ledges, and baseboards.',
      'The deadline: move-in, photos, inspection, walkthrough, leasing, or family use.',
    ],
    faq: [
      {
        q: 'Can one cleaning remove all construction dust?',
        a: 'Sometimes, but heavy drywall or sanding dust often needs more than one pass. A final clean can remove the major dust load, and a touch-up may be needed after the remaining particles settle or after punch-list work.',
      },
      {
        q: 'Should I vacuum or wipe construction dust first?',
        a: 'Dry dust should be controlled carefully before damp wiping. A poor vacuum can blow fine dust back into the room, so the method and filters matter. The safest plan depends on the surface, dust level, and whether the material is delicate.',
      },
      {
        q: 'Do you clean inside HVAC ducts?',
        a: 'Standard post-construction cleaning can include reachable vent covers and surrounding surfaces, but duct cleaning or HVAC service is a separate specialty unless confirmed in writing.',
      },
      {
        q: 'When should I book if the dust keeps settling?',
        a: 'Book after the dustiest trades are done. If the project still has sanding or punch-list work, plan a final clean now and consider a smaller touch-up before the walkthrough or move-in.',
      },
    ],
    related: [
      { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/construction-cleaning-checklist', label: 'Construction cleaning checklist' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Request a bid' },
    ],
  },
  {
    path: '/guides/cleaning-after-contractors-left',
    title: 'Cleaning After Contractors Left a Mess | Shynli Post-Construction Cleaning',
    keywords: [
      'cleaning after contractors left a mess',
      'contractor left dust everywhere',
      'cleanup after remodel contractor',
      'post renovation cleaning help',
      'construction mess after contractor',
    ],
    description:
      'What to do when contractors leave dust, footprints, packaging, paint specks, or unfinished cleanup after a remodel, and how to separate cleaning from repairs or debris hauling.',
    eyebrow: 'Homeowner guide',
    h1: 'What to do when contractors leave dust, debris, or a messy finished space.',
    summary:
      'A practical way to separate normal post-construction cleaning from unfinished work, damage, heavy debris, and punch-list issues after a contractor leaves.',
    readTime: '8 min read',
    sourceQuestion: 'How much mess is normal after a contractor leaves?',
    updated: 'June 16, 2026',
    shortAnswer:
      'Some dust and light cleanup are normal after remodeling, but a home should not be left unsafe, full of screws, heavy debris, or unclear damage. Start by documenting the condition, separating cleaning from repairs, checking the contract, and deciding whether you need a final clean, a touch-up clean, debris hauling, or a contractor punch-list conversation.',
    sections: [
      {
        title: 'Separate cleaning mess from unfinished work',
        body: [
          'Dust on floors, counters, trim, cabinets, fixtures, and window tracks is usually a cleaning problem. Missing caulk, damaged trim, paint flaws, loose hardware, scratches, and uneven finishes are not cleaning problems. They belong on the punch list.',
          'This distinction protects everyone. A cleaning crew can make the space presentable, but cleaners should not be expected to repair contractor work, remove hazardous material, haul heavy construction debris, or decide whether a finish is acceptable.',
        ],
        links: [
          { href: '/what-is-included-in-post-construction-cleaning', label: 'What is included' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
        ],
      },
      {
        title: 'Document the mess before you disturb it',
        body: [
          'Take wide photos of each room, then close-ups of floors, vents, cabinets, baseboards, glass, countertops, hardware, screws, packaging, paint specks, and any areas that feel unsafe. If you plan to talk with the contractor, photos are much clearer than a frustrated text.',
          'Documentation also helps a cleaning company quote honestly. A few images can show whether the job is a normal final clean, a heavier renovation dust clean, or a project that needs debris removal before cleaners can safely work.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo quote' },
          { href: '/post-construction-cleaning-quote', label: 'Post-construction cleaning quote' },
        ],
      },
      {
        title: 'Check what the contractor actually promised',
        body: [
          'Some contracts include broom-clean cleanup. Others include a professional final clean. Many say the contractor will remove their tools and debris but do not promise a detailed clean of cabinets, windows, fixtures, floors, ledges, or dust that traveled outside the work area.',
          'If the contract is vague, ask directly what cleanup was included and what the contractor considers complete. If a separate cleaning crew is needed, the photos and contract language can help you decide whether to request a credit, schedule your own cleaner, or hold a punch-list conversation.',
        ],
        links: [
          { href: '/contractor-cleanup-service', label: 'Contractor cleanup service' },
          { href: '/general-contractor-final-cleaning', label: 'General contractor final cleaning' },
        ],
      },
      {
        title: 'Choose the right cleanup path',
        body: [
          'If the space mostly has fine dust, fingerprints, dirty floors, cabinet dust, glass smudges, and bathroom residue, a post-construction final clean may be the right fit. If active work is still happening, a touch-up after the contractor returns may be smarter.',
          'If there are nails, screws, broken tile, large scraps, old materials, paint cans, heavy bags, or unsafe waste, do not treat that as ordinary house cleaning. Ask whether debris removal, contractor correction, or a different specialty service is needed before the final cleaning visit.',
        ],
        links: [
          { href: '/final-cleaning', label: 'Final cleaning' },
          { href: '/touch-up-cleaning', label: 'Touch-up cleaning' },
          { href: '/cleaning-after-remodel', label: 'Cleaning after remodel' },
        ],
      },
    ],
    checklistTitle: 'Before you book cleanup after contractors leave',
    checklist: [
      'Take photos before moving items or wiping surfaces.',
      'List what looks like cleaning, what looks like damage, and what looks unfinished.',
      'Check the contract language for cleanup, broom clean, final clean, and debris removal.',
      'Ask whether any trades still need to return before the final cleaning.',
      'Remove or flag sharp objects, screws, exposed materials, or unsafe areas.',
      'Send the cleaner the deadline and the reason: move-in, walkthrough, photos, or occupancy.',
    ],
    faq: [
      {
        q: 'Should the contractor pay for cleaning?',
        a: 'It depends on the contract and what was promised. Some contractors include a professional final clean, some only remove their own debris, and some leave the owner responsible for detailed cleaning.',
      },
      {
        q: 'Can cleaners remove paint specks or caulk residue?',
        a: 'Light residue may be removable from some surfaces, but scraping or chemical removal can damage finishes. Share photos first so the scope can be confirmed instead of assumed.',
      },
      {
        q: 'What if there are screws, nails, or broken materials left behind?',
        a: 'That may be debris or safety cleanup, not standard post-construction detail cleaning. The site should be made safe before a final clean is scheduled.',
      },
      {
        q: 'Should I clean before talking to the contractor?',
        a: 'If you are disputing the condition, document it first. After photos are taken, you can decide whether to clean, ask for a contractor return, or use the photos to request a quote.',
      },
    ],
    related: [
      { href: '/cleaning-after-remodel', label: 'Cleaning after remodel' },
      { href: '/remodel-cleanup-service', label: 'Remodel cleanup service' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Request a bid' },
    ],
  },
  {
    path: '/guides/can-you-live-at-home-during-renovation-cleaning',
    title: 'Can You Live At Home During Renovation Cleaning? | Shynli Post-Construction Cleaning',
    keywords: [
      'live at home during renovation cleaning',
      'cleaning while remodeling',
      'renovation dust in occupied home',
      'post renovation cleaning while living there',
      'cleaning after remodel with furniture',
    ],
    description:
      'How to plan post-renovation cleaning when you are still living in the home, including dust migration, furniture, pets, kids, rooms to close off, and realistic cleaning phases.',
    eyebrow: 'Occupied home guide',
    h1: 'Can you live at home during renovation cleaning?',
    summary:
      'Yes, but the plan changes when furniture, kids, pets, bedding, daily routines, and active work zones are still inside the home.',
    readTime: '7 min read',
    sourceQuestion: 'Can we keep living in the house while renovation dust is being cleaned?',
    updated: 'June 16, 2026',
    shortAnswer:
      'You can often live at home during renovation cleaning if the dusty work is contained, unsafe areas are avoided, and expectations are realistic. The cleaner needs to know which rooms are occupied, where dust traveled, what furniture is staying, and which spaces must be usable first. Occupied homes usually need staged cleaning rather than a perfect one-day reset.',
    sections: [
      {
        title: 'Occupied homes need a priority order',
        body: [
          'A vacant home can usually be cleaned in a cleaner sequence: top to bottom, room to room, then final floor detail. An occupied home has beds, dishes, toys, pet bowls, laundry, toiletries, chargers, and daily traffic moving through the work area.',
          'The best plan starts with the rooms that affect life fastest: bedrooms, bathrooms, kitchen surfaces, main walking paths, and the room where the renovation happened. If everything is treated as equally urgent, the work gets slower and less focused.',
        ],
        links: [
          { href: '/after-renovation-cleaning', label: 'After-renovation cleaning' },
          { href: '/construction-cleaning-for-homeowners', label: 'Cleaning for homeowners' },
        ],
      },
      {
        title: 'Dust travels farther than the remodel room',
        body: [
          'A kitchen remodel can leave dust on stairs, hallway trim, bathroom counters, bedroom door frames, and living room furniture. Flooring and drywall work can move through open floor plans quickly, especially when doors are open or HVAC is running.',
          'Before the cleaning visit, walk the home slowly and note where dust actually landed, not just where the contractor worked. Photos of adjacent rooms help the quote match reality and reduce the chance that the crew arrives with the wrong scope.',
        ],
        links: [
          { href: '/renovation-dust-cleaning', label: 'Renovation dust cleaning' },
          { href: '/post-renovation-house-cleaning', label: 'Post-renovation house cleaning' },
        ],
      },
      {
        title: 'Furniture and personal items change the scope',
        body: [
          'If furniture stays in place, cleaners can clean around and under what is accessible, but they may not move heavy items, unpack boxes, wash all fabrics, or handle every personal object. Open shelves, toys, books, electronics, and clothing slow the job down.',
          'A good preparation step is to clear counters, protect delicate items, remove small objects from dusty surfaces, and decide which closets or rooms are off limits. This keeps the crew focused on dust removal and surface reset instead of sorting the household.',
        ],
        links: [
          { href: '/how-to-prepare-for-post-construction-cleaning', label: 'How to prepare' },
          { href: '/post-construction-cleaning-boundaries', label: 'Service boundaries' },
        ],
      },
      {
        title: 'Plan around pets, kids, and daily use',
        body: [
          'A cleaning crew needs safe access and space to work. Pets should be secured, children should stay away from wet floors or active cleaning areas, and the household should avoid walking through freshly cleaned rooms until the floor detail is done.',
          'If the family needs to sleep in the home that night, say that before scheduling. The clean can be staged so bedrooms, bathrooms, kitchen touchpoints, and main paths are handled first, while less urgent areas are cleaned after the living spaces are usable.',
        ],
        links: [
          { href: '/cleaning-before-move-in', label: 'Cleaning before move-in' },
          { href: '/move-in-ready-construction-cleaning', label: 'Move-in ready cleaning' },
        ],
      },
    ],
    checklistTitle: 'Occupied-home details to send with your quote request',
    checklist: [
      'Which rooms are lived in and which rooms are empty.',
      'Whether pets, kids, or remote work will be present during the clean.',
      'Which rooms need to be usable first that same day.',
      'Whether furniture, rugs, curtains, bedding, or boxes are staying in place.',
      'Where dust traveled beyond the remodel area.',
      'Any off-limit rooms, fragile surfaces, access limits, or building rules.',
    ],
    faq: [
      {
        q: 'Do we need to leave the house during the cleaning?',
        a: 'Not always, but the crew needs clear access and safe work zones. For heavy dust, wet floors, or active cleaning in kitchens and bathrooms, being out of the way helps the work finish cleaner and faster.',
      },
      {
        q: 'Can cleaners work around furniture?',
        a: 'Yes, within reason. Light items can often be worked around, but heavy furniture, packed belongings, delicate objects, and clutter can limit what is reachable.',
      },
      {
        q: 'Should cleaning happen before or after the final contractor visit?',
        a: 'If more dusty work is scheduled, wait for that work to finish or plan a touch-up afterward. Cleaning too early can lead to the same dust returning.',
      },
      {
        q: 'Can you clean only the rooms affected by renovation dust?',
        a: 'Yes. The quote can focus on affected rooms, but it helps to include photos of nearby halls, stairs, bathrooms, and living areas so dust migration is not missed.',
      },
    ],
    related: [
      { href: '/after-renovation-cleaning', label: 'After-renovation cleaning' },
      { href: '/construction-cleaning-for-homeowners', label: 'Cleaning for homeowners' },
      { href: '/construction-cleaning-checklist', label: 'Cleaning checklist' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/request-a-bid', label: 'Request a bid' },
    ],
  },
  {
    path: '/guides/what-to-clean-before-final-payment-to-contractor',
    title: 'What To Clean Before Final Payment To A Contractor | Shynli Post-Construction Cleaning',
    keywords: [
      'clean before final payment contractor',
      'final walkthrough cleaning checklist',
      'post construction cleaning before final payment',
      'contractor final payment walkthrough',
      'renovation punch list cleaning',
    ],
    description:
      'A homeowner-focused guide to what should be clean and visible before final walkthrough or final payment, and what belongs on the punch list instead of the cleaning scope.',
    eyebrow: 'Walkthrough guide',
    h1: 'What should be clean before final payment to a contractor?',
    summary:
      'Before final payment, the space should be clean enough to inspect finishes clearly, but cleaning should not hide unresolved punch-list issues.',
    readTime: '8 min read',
    sourceQuestion: 'Should I clean before releasing final payment to my contractor?',
    updated: 'June 16, 2026',
    shortAnswer:
      'Before final payment, the home should be clean enough for you to see the work: floors, counters, cabinets, fixtures, glass, trim, and corners should not be covered in construction dust. But do not use cleaning to cover up damage, unfinished details, or contract issues. Document first, clean for visibility, then walk the project with a clear punch list.',
    sections: [
      {
        title: 'Clean so you can inspect, not so problems disappear',
        body: [
          'A dusty room makes it hard to see scratches, paint misses, cabinet alignment, grout haze, floor edges, hardware, trim gaps, and fixture condition. A final clean can reveal the finished work so the walkthrough is about the project, not the dust.',
          'At the same time, cleaning should not erase evidence if there is a dispute. If something looks damaged or unfinished, photograph it before anyone scrubs, moves, or polishes the area.',
        ],
        links: [
          { href: '/cleaning-before-owner-walkthrough', label: 'Cleaning before owner walkthrough' },
          { href: '/cleaning-before-final-inspection', label: 'Cleaning before final inspection' },
        ],
      },
      {
        title: 'Know what belongs on the punch list',
        body: [
          'Dust, footprints, cabinet dust, glass smudges, and light construction residue usually belong in the cleaning scope. Missing paint, damaged floors, loose trim, unfinished caulk, cracked tile, poorly installed hardware, and visible defects belong on the punch list.',
          'This matters before final payment because a cleaner can make a space look presentable without solving contractor issues. If the finish itself is wrong, cleaning will not turn it into completed work.',
        ],
        links: [
          { href: '/punch-list-cleaning', label: 'Punch-list cleaning' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
        ],
      },
      {
        title: 'Focus on the areas you need to judge',
        body: [
          'For a kitchen, that may mean counters, cabinet fronts and interiors, appliance faces, sink area, hardware, floors, toe kicks, backsplash, light fixtures, and window tracks. For a bathroom, it may mean vanity, mirror, fixtures, grout lines, tub, shower glass, floor edges, exhaust cover, and trim.',
          'For whole-home work, the entry path, stairs, hallway trim, doors, baseboards, interior glass, vents, and floors often reveal whether the final stage was truly handled. Those are the areas owners notice when they walk the project slowly.',
        ],
        links: [
          { href: '/cleaning-after-kitchen-remodel', label: 'Kitchen remodel cleaning' },
          { href: '/cleaning-after-bathroom-remodel', label: 'Bathroom remodel cleaning' },
          { href: '/floor-cleaning-after-construction', label: 'Floor cleaning after construction' },
        ],
      },
      {
        title: 'Time the clean around the final walkthrough',
        body: [
          'If the final clean happens too early, the contractor may return for touch-ups and create more dust. If it happens too late, you may walk the project while surfaces are still dirty and miss details that should have been visible.',
          'The best timing is usually after major work is complete and before the owner walkthrough, with a small touch-up option if punch-list work happens afterward. Share the walkthrough date, final payment timing, and any open contractor items when requesting the cleaning quote.',
        ],
        links: [
          { href: '/handoff-cleaning', label: 'Handoff cleaning' },
          { href: '/post-construction-cleaning-scheduling', label: 'Scheduling' },
          { href: '/post-construction-cleaning-quality-control', label: 'Quality control' },
        ],
      },
    ],
    checklistTitle: 'Before final payment, make these areas visible',
    checklist: [
      'Floors, corners, transitions, stairs, and entry paths.',
      'Counters, sinks, fixtures, mirrors, glass, and appliance faces.',
      'Cabinet fronts, shelves, drawers, toe kicks, and hardware.',
      'Baseboards, trim, doors, window tracks, sills, and ledges.',
      'Bathrooms, kitchens, and any room tied to final acceptance.',
      'Punch-list items photographed before cleaning changes the scene.',
    ],
    faq: [
      {
        q: 'Should I pay the contractor before the final clean?',
        a: 'That depends on your contract and relationship, but you should be able to inspect finished work clearly. If dust prevents a fair walkthrough, discuss final cleaning and punch-list timing before releasing final payment.',
      },
      {
        q: 'Can a cleaner help identify punch-list issues?',
        a: 'A cleaner may notice dust, residue, or visible surface concerns, but they are not a construction inspector. Use cleaning to reveal the work, then review the project with your contractor.',
      },
      {
        q: 'What if the contractor says cleaning is not included?',
        a: 'Then you may need to schedule your own final clean. Before doing that, document the current condition and confirm whether any debris removal or unfinished work remains.',
      },
      {
        q: 'Should the clean happen before listing photos?',
        a: 'Yes, if the home will be photographed. Listing photos, walkthroughs, and final payment reviews all depend on floors, glass, fixtures, counters, and trim looking finished.',
      },
    ],
    related: [
      { href: '/cleaning-before-owner-walkthrough', label: 'Owner walkthrough cleaning' },
      { href: '/punch-list-cleaning', label: 'Punch-list cleaning' },
      { href: '/post-construction-cleaning-checklist', label: 'Post-construction cleaning checklist' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/request-a-bid', label: 'Request a bid' },
    ],
  },
  {
    path: '/guides/post-renovation-cleaning-before-baby-pets-guests',
    title: 'Cleaning Before Babies, Pets, or Guests | Shynli Post-Construction Cleaning',
    keywords: [
      'post renovation cleaning before baby',
      'construction dust pets',
      'cleaning after remodel before guests',
      'renovation dust family home',
      'post construction cleaning occupied home',
    ],
    description:
      'How to prioritize dust, floors, vents, bedrooms, bathrooms, and high-touch surfaces before babies, pets, or guests use a recently renovated space.',
    eyebrow: 'Family-ready guide',
    h1: 'Post-renovation cleaning before babies, pets, or guests come back in.',
    summary:
      'When a renovated home needs to feel usable again, the cleaning priorities shift toward dust migration, floors, bedrooms, bathrooms, vents, and high-touch surfaces.',
    readTime: '7 min read',
    sourceQuestion: 'What should I clean before my baby, pets, or guests use a renovated room?',
    updated: 'June 16, 2026',
    shortAnswer:
      'Before babies, pets, or guests use a renovated space, prioritize fine dust, floors, reachable vents, bedrooms, bathrooms, kitchen touchpoints, baseboards, window tracks, and surfaces people touch or walk on. Avoid medical promises: cleaning can reduce visible dust and residue, but hazardous materials, lead, asbestos, mold, or air-quality problems need the right specialty provider.',
    sections: [
      {
        title: 'Start with the rooms people will actually use',
        body: [
          'After renovation, it is tempting to clean every dusty corner at once. But if family or guests are coming soon, the first priority should be the rooms that affect use: bedrooms, bathrooms, kitchen counters, eating surfaces, living areas, stairs, and main walking paths.',
          'The goal is not to pretend the home was never a jobsite. The goal is to make the space feel ready for normal life again by removing visible dust, resetting surfaces, and controlling the residue people touch, step on, or place items on.',
        ],
        links: [
          { href: '/cleaning-before-move-in', label: 'Cleaning before move-in' },
          { href: '/move-in-ready-construction-cleaning', label: 'Move-in ready cleaning' },
        ],
      },
      {
        title: 'Look low, high, and inside edges',
        body: [
          'Babies and pets spend more time near floors, baseboards, rugs, low shelves, and corners. Guests notice bathrooms, floors, entry paths, glass, counters, and obvious dusty surfaces. A good post-renovation clean needs both views.',
          'That means dusting ledges and trim, cleaning reachable vent covers, wiping cabinet interiors, detailing baseboards, cleaning floor edges, and giving extra attention to window tracks, door frames, stairs, bathroom surfaces, and the kitchen area.',
        ],
        links: [
          { href: '/baseboard-cleaning-after-construction', label: 'Baseboard cleaning' },
          { href: '/window-track-cleaning-after-construction', label: 'Window track cleaning' },
          { href: '/cabinet-interior-cleaning-after-construction', label: 'Cabinet interior cleaning' },
        ],
      },
      {
        title: 'Be realistic about soft items',
        body: [
          'Construction dust can settle on curtains, bedding, rugs, upholstery, pet beds, toys, and stored items. A post-construction cleaner may handle reachable hard surfaces and floors, but laundry, upholstery cleaning, carpet extraction, and item-by-item washing may be a separate task.',
          'Before the cleaning visit, remove what you can from dusty surfaces and decide what needs to be laundered separately. This makes the professional clean more effective because the crew can focus on hard surfaces, rooms, fixtures, floors, and dust travel paths.',
        ],
        links: [
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
          { href: '/how-to-prepare-for-post-construction-cleaning', label: 'How to prepare' },
        ],
      },
      {
        title: 'Know when cleaning is not the right service',
        body: [
          'If the project may involve lead dust, asbestos, mold, sewage, chemical residue, pest contamination, or any other hazardous condition, do not book ordinary cleaning as the solution. Those situations need proper testing, remediation, or a specialty provider.',
          'For normal renovation dust, the quote should still be clear about what happened: drywall work, flooring, painting, cabinet installation, tile work, window replacement, or full remodel. The more specific the dust source, the better the cleaning plan.',
        ],
        links: [
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
          { href: '/post-construction-cleaning-faq', label: 'Post-construction cleaning FAQ' },
        ],
      },
    ],
    checklistTitle: 'Family-ready cleaning priorities after renovation',
    checklist: [
      'Bedroom surfaces, bathroom surfaces, kitchen counters, and eating areas.',
      'Floors, stairs, baseboards, corners, and main walking paths.',
      'Reachable vent covers, window tracks, door frames, ledges, and trim.',
      'Cabinet interiors, drawers, shelves, appliance faces, and fixtures.',
      'Pet areas, low shelves, toy areas, and places small hands touch.',
      'Soft items separated for laundry, upholstery care, or carpet cleaning if needed.',
    ],
    faq: [
      {
        q: 'Is post-renovation cleaning safe for babies or pets?',
        a: 'Cleaning can reduce visible dust and residue, but safety depends on what materials were disturbed. If lead, asbestos, mold, or hazardous residue may be involved, use the proper specialty provider before ordinary cleaning.',
      },
      {
        q: 'Should pets stay away during the clean?',
        a: 'Yes. Pets should be secured away from active work areas, wet floors, open doors, equipment, and freshly cleaned rooms until the crew is done.',
      },
      {
        q: 'Do guests notice renovation dust?',
        a: 'Usually yes, especially on floors, bathrooms, kitchen counters, glass, stairs, and entry areas. A final clean helps the home feel finished instead of almost finished.',
      },
      {
        q: 'Can you clean bedrooms first?',
        a: 'Yes. If the family needs to sleep in the home, tell us which bedrooms and bathrooms should be prioritized so the cleaning sequence matches the day-to-day need.',
      },
    ],
    related: [
      { href: '/construction-dust-cleaning', label: 'Construction dust cleaning' },
      { href: '/cleaning-before-move-in', label: 'Cleaning before move-in' },
      { href: '/what-is-included-in-post-construction-cleaning', label: 'What is included' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Request a bid' },
    ],
  },
]

export const publicRoutes = [
  '/',
  '/privacy-policy',
  '/terms-of-service',
  '/cancellation-policy',
  '/guides',
  ...guidePages.map((page) => page.path),
  ...seoPages.map((page) => page.path),
]
