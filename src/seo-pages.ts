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
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
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
      { href: '/request-a-bid', label: 'Project intake' },
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
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/post-construction-cleaning-quote', label: 'Cleaning scope page' },
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
      { href: '/request-a-bid', label: 'Project intake' },
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
      { href: '/request-a-bid', label: 'Project intake' },
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
      { href: '/request-a-bid', label: 'Project intake' },
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
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/cleaning-after-punch-list-work-returns',
    title: 'Cleaning After Punch-List Work Returns | Shynli Post-Construction Cleaning',
    keywords: [
      'cleaning after punch list work',
      'post construction touch up cleaning',
      'contractor returned after final clean',
      'cleaning after trades return',
      'dust after punch list repairs',
    ],
    description:
      'What to do when a trade returns after the final clean, how to decide between a touch-up clean and a full reset, and what to document before the walkthrough.',
    eyebrow: 'Touch-up timing guide',
    h1: 'What to do when punch-list work creates dust after the final clean.',
    summary:
      'A returned trade can undo a clean room quickly. The right answer is usually a small, targeted touch-up, not starting the whole project over.',
    readTime: '7 min read',
    sourceQuestion: 'Do I need another cleaning after the contractor comes back for punch-list work?',
    updated: 'June 20, 2026',
    shortAnswer:
      'If a contractor returns after the final clean for sanding, drilling, paint touch-ups, cabinet adjustments, flooring transitions, or fixture work, you may need a targeted touch-up clean. Start by documenting what changed, separating fresh dust from unfinished work, and deciding whether only the affected rooms need attention before the walkthrough, move-in, photos, or final handoff.',
    sections: [
      {
        title: 'A returned trade can change the cleaning plan',
        body: [
          'Final cleaning works best after the dusty work is truly finished. When a painter, drywall finisher, flooring installer, cabinet installer, plumber, electrician, or handyman comes back afterward, even a short visit can put dust back on floors, counters, fixtures, baseboards, glass, stairs, and nearby rooms.',
          'That does not always mean the first clean failed. It usually means the project moved backward for a moment. Treat the new mess as its own scope: what trade returned, where they worked, what surfaces were touched, and what deadline is now at risk.',
        ],
        links: [
          { href: '/touch-up-cleaning', label: 'Touch-up cleaning' },
          { href: '/punch-list-cleaning', label: 'Punch-list cleaning' },
          { href: '/final-cleaning', label: 'Final cleaning' },
        ],
      },
      {
        title: 'Decide whether it is a touch-up or a full reset',
        body: [
          'A touch-up clean is usually enough when the return work was contained: one bathroom mirror, one patched wall, a few cabinet adjustments, a small trim repair, a light paint correction, or a dusty path from the entry to the work area.',
          'A full reset may be needed if the trade sanded drywall, cut flooring indoors, opened dusty cavities, ran the HVAC during work, left doors open, or moved through several rooms. The difference matters because a touch-up can be priced and scheduled very differently from another whole-home clean.',
        ],
        links: [
          { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
          { href: '/construction-dust-cleaning', label: 'Construction dust cleaning' },
          { href: '/post-construction-cleaning-scheduling', label: 'Scheduling' },
        ],
      },
      {
        title: 'Protect the punch list before anyone wipes evidence away',
        body: [
          'Before cleaning the new dust, take photos of the affected areas. Show the repaired item, the dust or residue around it, the floor path, and any surfaces that were clean before the trade returned. This helps you keep cleaning separate from contractor completion.',
          'Cleaning should make the space readable for the walkthrough, not hide unfinished work. Scratches, paint misses, loose hardware, damaged flooring, bad caulk, or missing trim are still punch-list items even if the surrounding dust is removed.',
        ],
        links: [
          { href: '/cleaning-before-owner-walkthrough', label: 'Owner walkthrough cleaning' },
          { href: '/guides/what-to-clean-before-final-payment-to-contractor/', label: 'Cleaning before final payment' },
        ],
      },
      {
        title: 'Schedule the touch-up close to the real finish',
        body: [
          'If more trades are still scheduled, wait if the deadline allows it. A touch-up is most useful when it happens after the last dusty return visit and before the moment that matters: listing photos, move-in, leasing, final inspection, owner walkthrough, or guest arrival.',
          'When requesting a quote, say that this is a post-final-clean touch-up. Include the original clean date, the trade that returned, where they worked, photos of the new dust, and the date the space must look finished again.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/cleaning-before-final-inspection', label: 'Final inspection cleaning' },
          { href: '/handoff-cleaning', label: 'Handoff cleaning' },
        ],
      },
    ],
    checklistTitle: 'Send these details for a punch-list touch-up quote',
    checklist: [
      'Which trade returned and what work they did after the final clean.',
      'Which rooms, halls, stairs, floors, counters, glass, or fixtures were affected.',
      'Whether any sanding, drilling, cutting, paint prep, or drywall patching happened.',
      'Photos from before and after the return visit if you have both.',
      'Whether more trades are still scheduled before the walkthrough.',
      'The deadline: photos, move-in, inspection, owner handoff, or final payment review.',
    ],
    faq: [
      {
        q: 'Do I need to clean the whole home again after punch-list work?',
        a: 'Not always. If the work was contained, a targeted touch-up may be enough. If dust traveled through several rooms or the HVAC moved it around, the scope may need to be larger.',
      },
      {
        q: 'Is punch-list dust the contractor responsibility?',
        a: 'It depends on what your agreement says and what happened during the return visit. Document the condition first, then decide whether to ask the contractor to address it or book your own touch-up clean.',
      },
      {
        q: 'Should the touch-up happen before or after final walkthrough?',
        a: 'Usually before the walkthrough if the dust blocks a fair inspection, but after the last scheduled dusty trade if possible.',
      },
      {
        q: 'Can cleaners work around unfinished punch-list items?',
        a: 'They can clean accessible surfaces, but unfinished work, damage, missing materials, or repairs should stay clearly documented and separate from the cleaning scope.',
      },
    ],
    related: [
      { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
      { href: '/touch-up-cleaning', label: 'Touch-up cleaning' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/construction-cleaning-checklist', label: 'Construction cleaning checklist' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/how-to-photograph-construction-dust-for-cleaning-quote',
    title: 'How To Photograph Construction Dust For A Cleaning Quote | Shynli',
    keywords: [
      'post construction cleaning photo quote',
      'construction dust photos for quote',
      'how to photograph renovation dust',
      'cleaning quote photos',
      'post renovation cleaning estimate photos',
    ],
    description:
      'The photos to send for a better post-construction cleaning quote, including dust level, rooms, vents, cabinets, floors, access, debris, and deadline details.',
    eyebrow: 'Quote photo guide',
    h1: 'How to photograph construction dust before the cleaner prices the job.',
    summary:
      'Good photos show the dust, the rooms, the access, and the real scope. They help avoid a quote that is too light for the job.',
    readTime: '7 min read',
    sourceQuestion: 'What photos should I send for a post-construction cleaning estimate?',
    updated: 'June 20, 2026',
    shortAnswer:
      'For a post-construction cleaning quote, send wide room photos, close-ups of dust and residue, floors, cabinet interiors, window tracks, vents, bathrooms, kitchens, stairs, glass, access points, and any leftover debris or active work areas. Add the ZIP code, approximate square footage, project type, deadline, and whether the home is vacant or occupied.',
    sections: [
      {
        title: 'Start with wide photos so the room makes sense',
        body: [
          'Close-ups show dust, but wide photos show scale. Take one photo from each corner if you can, plus one from the doorway. This helps the cleaning company see room size, furniture, floor type, ceiling height, clutter, access paths, and whether the work area is contained or spread out.',
          'For whole-home projects, include the main rooms first: kitchen, bathrooms, living areas, stairs, hallways, bedrooms, basement, entry, and the room where the work happened. If only one room was renovated but dust traveled elsewhere, show the nearby rooms too.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/post-construction-cleaning-quote', label: 'Cleaning scope page' },
        ],
      },
      {
        title: 'Then show the dust where it collects',
        body: [
          'Construction dust hides in predictable places: baseboards, window tracks, cabinet shelves, drawer interiors, vent covers, light fixtures, stair edges, floor transitions, trim, ledges, appliance faces, bathroom fixtures, and glass. Photograph those areas with enough distance to identify the surface.',
          'If the dust is hard to see, use side light from a window or a phone flashlight at an angle. Do not wipe one clean stripe for the photo unless you want to show thickness. A real dust photo helps set the right cleaning level.',
        ],
        links: [
          { href: '/construction-dust-cleaning', label: 'Construction dust cleaning' },
          { href: '/window-track-cleaning-after-construction', label: 'Window track cleaning' },
          { href: '/cabinet-interior-cleaning-after-construction', label: 'Cabinet interior cleaning' },
        ],
      },
      {
        title: 'Include anything that changes time or safety',
        body: [
          'Photos should also show what may slow or change the job: furniture, boxes, rugs, tools, ladders, paint cans, heavy debris, sharp scraps, unfinished rooms, active workers, locked areas, parking limits, stairs, elevators, and narrow access.',
          'This is not about making the home look perfect before the cleaner sees it. It is about showing what the crew is actually walking into. A small room with clear floors can be faster than a larger room full of belongings, even if the dust level looks similar.',
        ],
        links: [
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
        ],
      },
      {
        title: 'Add the details photos cannot show',
        body: [
          'A quote also needs context: ZIP code, rough square footage, project type, phase of cleaning, deadline, occupancy, parking, access, whether utilities are on, and whether more trades will return. The same photo can mean different things if the home is vacant, occupied, being listed, or being turned over to an owner.',
          'If you are not sure whether you need rough cleaning, final cleaning, or touch-up cleaning, say that. The photos can help identify the right phase before anyone promises a price or crew size.',
        ],
        links: [
          { href: '/rough-cleaning', label: 'Rough cleaning' },
          { href: '/final-cleaning', label: 'Final cleaning' },
          { href: '/touch-up-cleaning', label: 'Touch-up cleaning' },
        ],
      },
    ],
    checklistTitle: 'Photo set that usually gives the cleanest quote',
    checklist: [
      'One wide photo from each main room and doorway.',
      'Close-ups of dust on floors, ledges, baseboards, vents, window tracks, and cabinets.',
      'Kitchen photos: counters, sink, cabinet interiors, appliance faces, backsplash, and floors.',
      'Bathroom photos: vanity, mirror, shower glass, tub, fixtures, floor edges, and exhaust cover.',
      'Access photos: entry, stairs, elevator, parking, tools, boxes, furniture, or leftover debris.',
      'Deadline and purpose: move-in, listing photos, walkthrough, leasing, inspection, or handoff.',
    ],
    faq: [
      {
        q: 'Can I get a cleaning quote from photos only?',
        a: 'Often yes for many residential post-construction projects, as long as the photos show scale, dust level, surfaces, access, and timing. Some complex jobs may still need more details.',
      },
      {
        q: 'Should I clean before taking photos?',
        a: 'No. Send the real condition. If you clean first, the quote may miss how much dust or residue is actually present.',
      },
      {
        q: 'How many photos are enough?',
        a: 'For a small project, 10 to 15 clear photos may be enough. For a whole home, send a full room set plus close-ups of the dustiest areas.',
      },
      {
        q: 'What if the dust does not show well in photos?',
        a: 'Use angled light, take close-ups of dark surfaces or ledges, and add a short note explaining where the dust feels heavy even if it is hard to see.',
      },
    ],
    related: [
      { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/post-construction-cleaning-quote', label: 'Cleaning scope page' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/contractor-cleanup-vs-hiring-post-construction-cleaner',
    title: 'Contractor Cleanup Vs Hiring A Post-Construction Cleaner | Shynli',
    keywords: [
      'contractor cleanup vs post construction cleaner',
      'should contractor clean after remodel',
      'hire cleaner after construction',
      'post construction cleanup responsibility',
      'professional final cleaning after contractor',
    ],
    description:
      'How to decide whether to ask the contractor for cleanup, hire a post-construction cleaner, or separate punch-list corrections from final cleaning.',
    eyebrow: 'Scope decision guide',
    h1: 'Contractor cleanup vs hiring a post-construction cleaner: who should do what?',
    summary:
      'Contractor cleanup and professional final cleaning are not always the same thing. The difference affects cost, timing, and expectations.',
    readTime: '8 min read',
    sourceQuestion: 'Should my contractor clean up, or should I hire a separate cleaner?',
    updated: 'June 20, 2026',
    shortAnswer:
      'Ask the contractor to remove their tools, heavy debris, unsafe scraps, and unfinished work issues. Hire a post-construction cleaner when the project needs detailed dust removal, floors, cabinets, fixtures, glass, baseboards, window tracks, bathrooms, kitchens, and move-in or walkthrough readiness. Check the contract first so cleanup responsibility is not guessed after the fact.',
    sections: [
      {
        title: 'Contractor cleanup usually starts with jobsite responsibility',
        body: [
          'A contractor should normally leave the work area safe and remove their tools, packaging, major scraps, and obvious jobsite debris according to the agreement. If sharp materials, screws, broken tile, heavy bags, or active work hazards remain, that is not the same as asking for a detailed house clean.',
          'If cleanup was promised in the contract, use the contract language when you ask about it. If the agreement only says broom clean or debris removal, detailed dusting of cabinets, windows, fixtures, floors, vents, trim, and bathrooms may not be included.',
        ],
        links: [
          { href: '/contractor-cleanup-service', label: 'Contractor cleanup service' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
        ],
      },
      {
        title: 'Professional final cleaning is a different level of detail',
        body: [
          'Post-construction cleaning focuses on making the space usable and presentable after the building work: dust removal, floor detail, cabinet interiors, counters, fixtures, bathroom surfaces, kitchen surfaces, window tracks, baseboards, doors, trim, reachable vent covers, and glass.',
          'That level of detail is often outside a trade worker daily cleanup. A plumber, painter, carpenter, or flooring installer may sweep their area, but that does not mean the entire home is ready for move-in, photos, leasing, or owner handoff.',
        ],
        links: [
          { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
          { href: '/final-cleaning', label: 'Final cleaning' },
          { href: '/construction-cleaning-checklist', label: 'Cleaning checklist' },
        ],
      },
      {
        title: 'Do not use cleaning to solve unfinished construction',
        body: [
          'Some problems look like cleaning at first but are really finish issues: grout haze that needs installer correction, paint overspray on delicate surfaces, missing caulk, scratched flooring, loose hardware, uneven drywall, damaged trim, or residue that requires specialty removal.',
          'A cleaner can help reveal the work, but they should not be responsible for deciding whether a contractor finished properly. Document questionable areas before cleaning, then keep repair conversations separate from dust removal.',
        ],
        links: [
          { href: '/guides/grout-haze-paint-overspray-and-renovation-residue/', label: 'Residue after renovation' },
          { href: '/guides/what-to-clean-before-final-payment-to-contractor/', label: 'Cleaning before final payment' },
        ],
      },
      {
        title: 'The best plan is often both, in the right order',
        body: [
          'For many projects, the contractor finishes the work, removes jobsite debris, addresses obvious punch-list items, and leaves safe access. Then a cleaning crew performs the detailed final clean. If the contractor returns afterward, a smaller touch-up may follow.',
          'When you request a bid, explain what the contractor has already cleaned, what still feels unfinished, and what the deadline is. That helps the cleaning quote stay focused instead of absorbing contractor tasks by accident.',
        ],
        links: [
          { href: '/guides/cleaning-after-punch-list-work-returns/', label: 'Cleaning after punch-list returns' },
          { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
          { href: '/request-a-bid', label: 'Project intake' },
        ],
      },
    ],
    checklistTitle: 'Use this split before deciding who should clean',
    checklist: [
      'Contractor: tools, heavy debris, unsafe scraps, active work materials, and unfinished repairs.',
      'Contractor: punch-list issues, damage, missing caulk, paint defects, loose hardware, and finish corrections.',
      'Cleaner: dust removal, floors, counters, cabinets, fixtures, glass, baseboards, trim, and reachable vents.',
      'Cleaner: move-in, listing photo, walkthrough, leasing, or handoff readiness after the jobsite is safe.',
      'Owner: contract review, documentation, access, deadline, and deciding whether more trades will return.',
      'Quote request: photos, ZIP code, square footage, project phase, dust level, and timing.',
    ],
    faq: [
      {
        q: 'Is a contractor final clean the same as post-construction cleaning?',
        a: 'Not always. Some contractors include a professional final clean, but others only promise broom cleaning or debris removal. Ask what surfaces and rooms are included.',
      },
      {
        q: 'Should I hire a cleaner before the contractor is done?',
        a: 'Usually no for final cleaning. If trades still need to sand, cut, paint, or install, wait or plan for a touch-up after they return.',
      },
      {
        q: 'Can cleaners remove construction debris?',
        a: 'Light trash may be handled if agreed, but heavy debris hauling, dumpsters, hazardous material, and unsafe scraps are not ordinary post-construction cleaning unless specifically confirmed.',
      },
      {
        q: 'What should I ask my contractor before hiring a cleaner?',
        a: 'Ask what cleanup is included, whether all trades are finished, whether any punch-list work remains, and whether the space will be safe and accessible for cleaners.',
      },
    ],
    related: [
      { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
      { href: '/contractor-cleanup-service', label: 'Contractor cleanup service' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/hvac-dust-after-renovation-cleaning',
    title: 'HVAC Dust After Renovation Cleaning | Shynli Post-Construction Cleaning',
    keywords: [
      'hvac dust after renovation',
      'dust blowing from vents after remodel',
      'construction dust in vents',
      'post renovation dust keeps coming back',
      'cleaning after HVAC dust',
    ],
    description:
      'What to check when dust seems to come from vents after renovation cleaning, what a cleaner can handle, and when HVAC or duct help may be separate.',
    eyebrow: 'HVAC dust guide',
    h1: 'What if dust keeps coming from the HVAC after renovation cleaning?',
    summary:
      'If dust returns every time the system runs, the issue may be more than surface cleaning. Start with filters, vents, source rooms, and timing.',
    readTime: '7 min read',
    sourceQuestion: 'Why does renovation dust keep blowing from my vents?',
    updated: 'June 20, 2026',
    shortAnswer:
      'If dust appears after the HVAC runs, check whether filters were changed, vents were covered during the work, returns pulled dust from the work area, and more dusty trades are still active. A post-construction cleaner can clean reachable vent covers and surrounding surfaces, but duct cleaning, HVAC service, hidden contamination, or air-quality testing are separate services.',
    sections: [
      {
        title: 'First check whether the system moved dust during construction',
        body: [
          'Renovation dust spreads faster when the furnace or air conditioning runs during drywall sanding, flooring cuts, demolition, painting prep, or cabinet work. Return vents can pull fine dust out of the work zone and supply vents can move it into rooms that were never renovated.',
          'If the home looked clean until the system ran, make a note of which vents seem involved, which rooms get dusty first, and whether the filter looks loaded. That pattern helps separate surface dust from air movement.',
        ],
        links: [
          { href: '/vent-cleaning-after-renovation-dust', label: 'Vent cleaning after renovation dust' },
          { href: '/construction-dust-cleaning', label: 'Construction dust cleaning' },
        ],
      },
      {
        title: 'Change filters before judging the cleaning',
        body: [
          'A filter that collected construction dust can keep the system struggling and may make the home feel dusty again. If the filter was not changed after the dusty phase, replace it before or around the cleaning timeline and keep another replacement ready if dust was heavy.',
          'Filters are not a magic fix for settled dust on trim, floors, ledges, cabinets, or furniture. They are one part of the plan. A home may still need top-down cleaning and damp wiping after airborne dust has had time to settle.',
        ],
        links: [
          { href: '/guides/why-construction-dust-keeps-coming-back/', label: 'Why dust keeps coming back' },
          { href: '/renovation-dust-cleaning', label: 'Renovation dust cleaning' },
        ],
      },
      {
        title: 'Know the boundary between cleaning and HVAC work',
        body: [
          'Post-construction cleaning can include reachable vent covers, dusty surfaces around registers, floors below vents, trim, ledges, doors, and nearby walls when included in the quote. It does not automatically include cleaning inside ductwork or diagnosing the HVAC system.',
          'If dust visibly blows from vents after reachable surfaces are clean, or if the system smells dusty every time it starts, you may need an HVAC or duct conversation in addition to cleaning. That is a separate specialty, not a failed floor wipe.',
        ],
        links: [
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
        ],
      },
      {
        title: 'Book the cleaning after the dust source is controlled',
        body: [
          'If sanding, cutting, drilling, or demo is still happening, the HVAC question is not solved yet. Cleaning before the dust source ends can make the home look better briefly, then disappoint everyone when the system moves the next layer around.',
          'When requesting a quote, send photos of vent covers, the dustiest rooms, filter condition if relevant, and surfaces where dust returns fastest. Mention whether HVAC ran during the work and whether the home is occupied.',
        ],
        links: [
          { href: '/guides/how-to-photograph-construction-dust-for-cleaning-quote/', label: 'Dust photos before booking' },
          { href: '/post-construction-cleaning-scheduling', label: 'Scheduling' },
          { href: '/request-a-bid', label: 'Project intake' },
        ],
      },
    ],
    checklistTitle: 'Before blaming the clean, check these HVAC dust clues',
    checklist: [
      'Was the HVAC running during drywall sanding, flooring cuts, demo, or paint prep?',
      'Were supply and return vents covered during the dusty work?',
      'Were filters changed after construction dust was created?',
      'Does dust return only after the system runs, or all day even when it is off?',
      'Are vent covers dusty, or does dust seem to come from inside the system?',
      'Are more trades scheduled that could restart the dust problem?',
    ],
    faq: [
      {
        q: 'Do post-construction cleaners clean inside ducts?',
        a: 'Standard post-construction cleaning can include reachable vent covers and nearby surfaces, but duct cleaning and HVAC service are separate unless specifically confirmed.',
      },
      {
        q: 'Should I change the HVAC filter before or after cleaning?',
        a: 'If the filter is loaded with construction dust, change it before judging the cleaning result. For heavy dust, you may need another replacement after the home has been cleaned and the remaining dust has settled.',
      },
      {
        q: 'Can dust from vents make the home dirty again?',
        a: 'Yes, if the system pulled dust into returns or ducts during construction. Surface cleaning helps, but the air movement source may also need attention.',
      },
      {
        q: 'Should I run the HVAC during cleaning?',
        a: 'That depends on the dust level and conditions. If dust is heavy, talk through the plan first so the system does not keep spreading fine particles while surfaces are being reset.',
      },
    ],
    related: [
      { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
      { href: '/vent-cleaning-after-renovation-dust', label: 'Vent cleaning after renovation dust' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/grout-haze-paint-overspray-and-renovation-residue',
    title: 'Grout Haze, Paint Overspray, And Renovation Residue | Shynli',
    keywords: [
      'grout haze after renovation',
      'paint overspray after remodel',
      'construction residue cleaning',
      'post construction residue removal',
      'renovation cleaning vs repair',
    ],
    description:
      'How to tell whether grout haze, paint overspray, caulk residue, adhesive, or construction marks belong in cleaning, contractor correction, or specialty restoration.',
    eyebrow: 'Residue guide',
    h1: 'Grout haze, paint overspray, and renovation residue: cleaning or contractor correction?',
    summary:
      'Some residue is ordinary post-construction detail cleaning. Some is finish damage or specialty removal. The safest move is to identify it before scrubbing.',
    readTime: '8 min read',
    sourceQuestion: 'Can post-construction cleaners remove grout haze, paint overspray, or dried residue?',
    updated: 'June 20, 2026',
    shortAnswer:
      'Light dust, fingerprints, smudges, and some surface residue may fit post-construction cleaning. Hardened grout haze, paint overspray, adhesive, caulk, mortar, scratches, etching, or chemical-sensitive surfaces may need installer correction, specialty products, or restoration. Photograph the residue, identify the surface, and confirm the scope before anyone scrapes or uses strong chemicals.',
    sections: [
      {
        title: 'Not every mark is a cleaning problem',
        body: [
          'After renovation, it is common to see dust, fingerprints, floor film, window smudges, cabinet dust, bathroom residue, and light specks. Those can often be discussed as part of post-construction final cleaning when the surface is safe to clean.',
          'But a white film on tile, cured paint on hardware, adhesive on flooring, scratched glass, caulk smears, mortar, or damaged finish may not be a normal cleaning task. It may be a trade correction or specialty removal issue.',
        ],
        links: [
          { href: '/what-is-included-in-post-construction-cleaning', label: 'What is included' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
        ],
      },
      {
        title: 'Surface type changes the risk',
        body: [
          'Porcelain tile, natural stone, hardwood, LVP, laminate, stainless steel, painted trim, glass, acrylic tubs, shower doors, fixtures, and sealed counters do not react the same way to scraping or chemicals. What is safe on one surface can ruin another.',
          'That is why the quote should include close-up photos and surface names if you know them. A cleaner should not guess with blades, acids, solvents, or abrasive pads on a finished surface without a clear agreement.',
        ],
        links: [
          { href: '/floor-cleaning-after-construction', label: 'Floor cleaning after construction' },
          { href: '/window-track-cleaning-after-construction', label: 'Window track cleaning after construction' },
          { href: '/fixture-cleaning-after-construction', label: 'Fixture cleaning after construction' },
        ],
      },
      {
        title: 'Use cleaning to reveal defects, not erase responsibility',
        body: [
          'If grout haze or paint overspray was left by a trade, document it before trying to remove it. The installer may need to correct the work, especially if the residue is heavy, cured, or tied to finish quality.',
          'A final clean can make floors, counters, glass, fixtures, and trim easier to inspect. It should not make it impossible to show what was left behind. Photos before cleaning protect the conversation.',
        ],
        links: [
          { href: '/guides/what-to-clean-before-final-payment-to-contractor/', label: 'Cleaning before final payment' },
          { href: '/cleaning-before-owner-walkthrough', label: 'Owner walkthrough cleaning' },
        ],
      },
      {
        title: 'Ask for the residue to be scoped separately',
        body: [
          'When you request a cleaning quote, do not hide residue in a general dust request. Say exactly what you see: grout haze on porcelain tile, paint specks on glass, adhesive on LVP, caulk on fixtures, mortar dust on trim, or film on new floors.',
          'The response may be: yes, it fits the cleaning scope; no, it belongs to the contractor; or maybe, but only after a test spot and written approval. That answer is better than discovering the risk in the middle of the cleaning visit.',
        ],
        links: [
          { href: '/guides/how-to-photograph-construction-dust-for-cleaning-quote/', label: 'How to photograph residue' },
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/post-construction-cleaning-quality-control', label: 'Quality control' },
        ],
      },
    ],
    checklistTitle: 'Before asking cleaners to remove residue',
    checklist: [
      'Photograph the residue close up and from a wider room angle.',
      'Name the surface if you know it: porcelain, stone, glass, LVP, hardwood, acrylic, stainless, or painted trim.',
      'Ask whether the installer left product instructions or cleaning limits.',
      'Separate dust cleaning from scraping, solvent work, acid work, or specialty restoration.',
      'Document heavy residue before final payment or contractor signoff.',
      'Confirm test spots and written approval before aggressive removal is attempted.',
    ],
    faq: [
      {
        q: 'Can post-construction cleaners remove grout haze?',
        a: 'Light haze on a compatible surface may be possible, but heavy or cured haze can require installer correction, specialty products, and careful testing. Natural stone and delicate finishes need extra caution.',
      },
      {
        q: 'Can cleaners scrape paint off windows?',
        a: 'Sometimes, but scraper use depends on the glass, coating, paint type, and risk of scratching. It should be agreed before the visit rather than assumed.',
      },
      {
        q: 'Is paint overspray part of standard cleaning?',
        a: 'Not automatically. Fine dust and smudges are different from cured paint on finished surfaces. Overspray may need contractor correction or specialty removal.',
      },
      {
        q: 'Should I try removing residue myself first?',
        a: 'Be careful. Scrubbing, acids, solvents, blades, or abrasive pads can damage new finishes. Photograph first and ask what method is safe for the surface.',
      },
    ],
    related: [
      { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
      { href: '/construction-cleaning-checklist', label: 'Construction cleaning checklist' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/why-floors-feel-gritty-after-construction-cleaning',
    title: 'Why Floors Feel Gritty After Construction Cleaning | Shynli',
    keywords: [
      'floors feel gritty after construction cleaning',
      'gritty floors after renovation',
      'construction dust on floors',
      'post construction floor cleaning',
      'dusty floors after remodel',
    ],
    description:
      'Why floors still feel gritty after construction cleaning, what causes dust film or residue, and when the issue is cleaning, floor finish, or more trade work.',
    eyebrow: 'Floor dust guide',
    h1: 'Why floors still feel gritty after construction cleaning.',
    summary:
      'A floor can look clean and still feel sandy, chalky, sticky, or filmed after renovation work. The cause matters before anyone keeps mopping.',
    readTime: '7 min read',
    sourceQuestion: 'Why do my floors still feel gritty after renovation cleaning?',
    updated: 'June 23, 2026',
    shortAnswer:
      'Floors can feel gritty after construction cleaning because fine drywall dust, sawdust, tile dust, concrete dust, floor finish residue, or adhesive film keeps releasing from edges, seams, baseboards, transitions, and nearby rooms. The fix is not always more mopping. The floor may need controlled vacuuming, repeated microfiber passes, edge detail, residue checks, or contractor correction if the finish itself is rough.',
    sections: [
      {
        title: 'Grit is often trapped at the edges',
        body: [
          'Construction dust does not sit only in the center of the room. It hides under toe kicks, along baseboards, in floor transitions, beside vents, behind doors, inside corners, on stair treads, and under cabinet overhangs. When people walk through, that hidden dust gets pulled back onto the open floor.',
          'That is why the floor may pass a quick visual check but still feel dusty in socks. A post-construction floor reset usually needs edge work first, then open-floor detail. If the edges are skipped, the mop keeps chasing dust that was never removed from the source line.',
        ],
        links: [
          { href: '/floor-cleaning-after-construction', label: 'Floor cleaning after construction' },
          { href: '/baseboard-cleaning-after-construction', label: 'Baseboard cleaning after construction' },
        ],
      },
      {
        title: 'More water can make some dust feel worse',
        body: [
          'Fine drywall or plaster dust can turn into a cloudy film when it is dragged around with a wet mop too early. The same thing can happen when dirty mop water is reused, when floors are cleaned before the high dust is removed, or when dust from ledges and trim settles after the floor pass.',
          'For many projects, the better order is top-down dust control, careful vacuuming with the right filtration, detail wiping, then floor cleaning. If the floor is cleaned first, it becomes the landing pad for dust that was still above it.',
        ],
        links: [
          { href: '/drywall-dust-cleaning', label: 'Drywall dust cleaning' },
          { href: '/construction-dust-cleaning', label: 'Construction dust cleaning' },
          { href: '/guides/why-construction-dust-keeps-coming-back/', label: 'Why dust keeps coming back' },
        ],
      },
      {
        title: 'Residue is different from loose dust',
        body: [
          'A gritty floor is not always loose dust. It can be grout haze, thinset residue, paint specks, adhesive, sealer haze, floor finish texture, concrete dust, or residue from the installation process. Those issues should be identified before anyone uses stronger chemicals or abrasive pads.',
          'If the floor finish feels rough, scratches appear, or a white film stays in the same place after careful cleaning, the issue may belong to the installer or a specialty floor-care provider. A cleaner can help reveal the problem, but cleaning should not be used to hide a finish defect.',
        ],
        links: [
          { href: '/guides/grout-haze-paint-overspray-and-renovation-residue/', label: 'Residue after renovation' },
          { href: '/dust-cleaning-after-floor-installation', label: 'Dust after floor installation' },
          { href: '/flooring-project-cleanup', label: 'Flooring project cleanup' },
        ],
      },
      {
        title: 'Send photos before asking for a floor quote',
        body: [
          'Photos help because floor problems can look similar in words. A wide room photo shows project scale. A close-up shows whether the issue is dust, haze, streaking, debris, scratches, adhesive, grout film, or finish texture. A photo of the floor edge shows whether dust is coming from trim and transitions.',
          'When you request a bid, include the floor type if you know it: hardwood, LVP, laminate, tile, concrete, stone, or carpet-adjacent hard flooring. Mention whether the floor is new, refinished, recently grouted, recently sealed, or still under contractor warranty.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
          { href: '/request-a-bid', label: 'Project intake' },
        ],
      },
    ],
    checklistTitle: 'What to check when floors still feel gritty',
    checklist: [
      'Look at floor edges, baseboards, vents, thresholds, stair corners, and cabinet toe kicks.',
      'Check whether high ledges, trim, walls, fans, or shelves were cleaned before the floor pass.',
      'Note the floor type and whether it was newly installed, refinished, sealed, grouted, or painted around.',
      'Take close-up photos of film, grit, streaks, scratches, adhesive, grout haze, or rough finish areas.',
      'Ask whether any trades still need to sand, cut, paint, grout, install, or punch-list the space.',
      'Separate ordinary dust cleaning from finish correction, residue removal, or floor restoration.',
    ],
    faq: [
      {
        q: 'Can post-construction cleaners fix gritty floors?',
        a: 'They can often remove fine dust, edge dust, footprints, light residue, and normal post-construction floor soil. If the grit is part of the floor finish, grout haze, adhesive, scratches, or installation residue, it may need contractor correction or specialty floor care.',
      },
      {
        q: 'Why does mopping make the floor cloudy after construction?',
        a: 'Fine dust can mix with water and spread into a film if the floor is mopped before the dust is controlled. Dirty mop water, high dust settling afterward, and residue from the project can also leave the floor cloudy.',
      },
      {
        q: 'Should floors be cleaned first or last?',
        a: 'Floors should usually be handled late in the process after high surfaces, ledges, trim, cabinets, vents, and nearby dust sources are addressed. Otherwise clean floors collect the next layer of settling dust.',
      },
      {
        q: 'What photos help with a gritty floor quote?',
        a: 'Send wide room photos, close-ups of the grit or film, floor edges, transitions, baseboards, vents, and any areas where the surface looks scratched, hazy, sticky, or rough.',
      },
    ],
    related: [
      { href: '/floor-cleaning-after-construction', label: 'Floor cleaning after construction' },
      { href: '/dust-cleaning-after-floor-installation', label: 'Dust after floor installation' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/should-post-construction-cleaners-clean-walls-and-ceilings',
    title: 'Should Post-Construction Cleaners Clean Walls And Ceilings? | Shynli',
    keywords: [
      'post construction wall cleaning',
      'clean dust from walls after renovation',
      'ceiling dust after construction',
      'drywall dust on walls',
      'should cleaners clean walls after remodel',
    ],
    description:
      'Should post-construction cleaners clean walls and ceilings? Learn what is reasonable, what can damage paint, and how to scope dust on vertical surfaces.',
    eyebrow: 'Walls and ceilings',
    h1: 'Should post-construction cleaners clean walls and ceilings?',
    summary:
      'Walls and ceilings collect fine renovation dust, but they also carry the biggest risk of smearing, paint damage, or unrealistic expectations.',
    readTime: '7 min read',
    sourceQuestion: 'Do post-construction cleaners clean dust from walls and ceilings?',
    updated: 'June 23, 2026',
    shortAnswer:
      'Post-construction cleaners may dust reachable walls, ceilings, corners, vents, trim, doors, and ledges when that scope is agreed in advance. But washing walls, scrubbing flat paint, removing stains, cleaning high ceilings, treating soot, or fixing paint defects is different from ordinary dust removal. The safe plan depends on paint type, height, dust level, surface condition, and whether the wall was recently painted.',
    sections: [
      {
        title: 'Walls collect dust even when they look fine',
        body: [
          'Drywall sanding, flooring cuts, demolition, cabinet work, and paint prep can leave a powdery layer on walls and ceilings. It may not show until sunlight hits the room or until a hand leaves a gray mark on a door frame, switch plate, or painted corner.',
          'This is especially common near work zones, hallways, staircases, bathroom remodels, kitchens, and rooms where plastic barriers were opened often. A good cleaning plan looks beyond floors and counters when the dust was fine enough to travel.',
        ],
        links: [
          { href: '/drywall-dust-cleaning', label: 'Drywall dust cleaning' },
          { href: '/dust-cleaning-after-drywall-repair', label: 'Dust after drywall repair' },
        ],
      },
      {
        title: 'Dusting is not the same as washing walls',
        body: [
          'Light wall dusting, cobweb removal, ledge wiping, door detailing, and switch-plate cleaning can fit many post-construction scopes. Full wall washing is a larger request and can be risky on flat paint, fresh paint, textured walls, wallpaper, delicate finishes, or areas with unfinished repairs.',
          'If the wall has scuffs, stains, paint defects, overspray, caulk smears, nail pops, water marks, or patch texture, that is not just dust. It may need painter correction, touch-up paint, or a different cleaning method than the rest of the room.',
        ],
        links: [
          { href: '/cleaning-after-painting-and-remodeling', label: 'Cleaning after painting and remodeling' },
          { href: '/painting-project-cleanup', label: 'Painting project cleanup' },
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
        ],
      },
      {
        title: 'Height and access change the quote',
        body: [
          'Reachable wall dust is different from two-story ceilings, high stairwells, vaulted rooms, exposed beams, skylight wells, or commercial build-out ceilings. Ladders, high dusting tools, access limits, furniture, and safety conditions can change whether the work is included.',
          'Before booking, show the height and the dust. A single close-up photo does not show whether the crew can safely reach the area. Send a wide photo of the room, then close-ups of corners, ceiling lines, vents, trim, and dusty patches.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/how-to-prepare-for-post-construction-cleaning', label: 'How to prepare' },
        ],
      },
      {
        title: 'Time the cleaning after paint and sanding are finished',
        body: [
          'If painters, drywall finishers, electricians, or carpenters still need to return, walls and ceilings may get dusty again. Cleaning vertical surfaces before the dustiest trades are finished usually creates frustration instead of a clean handoff.',
          'For walkthroughs or listing photos, ask whether wall dusting should be part of the final clean or saved for a touch-up after punch-list work. The right answer depends on the deadline and how much work remains.',
        ],
        links: [
          { href: '/touch-up-cleaning', label: 'Touch-up cleaning' },
          { href: '/cleaning-before-owner-walkthrough', label: 'Owner walkthrough cleaning' },
          { href: '/guides/cleaning-after-punch-list-work-returns/', label: 'Cleaning after punch-list returns' },
        ],
      },
    ],
    checklistTitle: 'Details to send if walls or ceilings need attention',
    checklist: [
      'Which rooms have visible wall or ceiling dust.',
      'Whether paint is fresh, flat, textured, wallpapered, glossy, or unknown.',
      'Photos of corners, ceiling lines, vents, switch plates, doors, trim, and ledges.',
      'Room height, stairwell height, vaulted areas, beams, skylights, or ladder constraints.',
      'Any scuffs, stains, overspray, caulk, patch marks, water marks, or paint defects.',
      'Whether painters, drywall crews, or punch-list trades still need to return.',
    ],
    faq: [
      {
        q: 'Do cleaners wipe every wall after construction?',
        a: 'Not automatically. Reachable wall dusting or spot attention may be included when scoped, but full wall washing is a separate expectation and may not be safe for every paint or finish.',
      },
      {
        q: 'Can cleaning damage fresh paint?',
        a: 'Yes. Fresh or flat paint can mark, streak, or burnish if it is scrubbed too aggressively. Paint condition and cure time should be considered before wall cleaning is promised.',
      },
      {
        q: 'Are ceilings included in post-construction cleaning?',
        a: 'Reachable ceiling corners, vents, and cobwebs may be included if agreed. High ceilings, beams, skylights, heavy dust, or specialty access can change the scope and price.',
      },
      {
        q: 'Should walls be cleaned before floors?',
        a: 'Usually yes. Dust from walls, ceilings, trim, and ledges should be controlled before the final floor pass, otherwise clean floors can collect another layer of dust.',
      },
    ],
    related: [
      { href: '/drywall-dust-cleaning', label: 'Drywall dust cleaning' },
      { href: '/cleaning-after-painting-and-remodeling', label: 'Cleaning after painting' },
      { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/cleaning-renovation-dust-from-furniture-and-belongings',
    title: 'Cleaning Renovation Dust From Furniture And Belongings | Shynli',
    keywords: [
      'renovation dust on furniture',
      'construction dust on belongings',
      'cleaning furniture after remodel dust',
      'post construction cleaning with furniture',
      'dust on clothes after renovation',
    ],
    description:
      'How to handle renovation dust on furniture, rugs, clothes, electronics, toys, and personal items, and where post-construction cleaning boundaries begin.',
    eyebrow: 'Belongings guide',
    h1: 'Cleaning renovation dust from furniture, clothes, and personal belongings.',
    summary:
      'Occupied remodels create a different problem than empty new builds: the dust lands on the life already inside the home.',
    readTime: '8 min read',
    sourceQuestion: 'What should I do when construction dust gets on furniture and belongings?',
    updated: 'June 23, 2026',
    shortAnswer:
      'When renovation dust lands on furniture and belongings, separate hard surfaces from soft goods. Post-construction cleaners can usually help with reachable hard surfaces, floors, ledges, cabinet exteriors, nearby vents, and clear surfaces. Laundry, upholstery cleaning, electronics detail, toy-by-toy washing, rugs, mattresses, curtains, and fragile personal items may need owner preparation or specialty cleaning.',
    sections: [
      {
        title: 'Occupied remodels spread dust onto daily life',
        body: [
          'A bathroom, kitchen, flooring, or drywall project can leave dust far beyond the work area. Beds, sofas, rugs, pet beds, toys, books, open shelves, clothes, electronics, and kitchen items may collect a fine layer even when the contractor used plastic barriers.',
          'That does not mean every personal item belongs in a standard cleaning scope. It means the quote needs to be honest about what is accessible, what is fragile, what should be moved by the owner, and what needs a different kind of cleaning.',
        ],
        links: [
          { href: '/guides/can-you-live-at-home-during-renovation-cleaning/', label: 'Living at home during renovation cleaning' },
          { href: '/post-renovation-house-cleaning', label: 'Post-renovation house cleaning' },
        ],
      },
      {
        title: 'Hard surfaces are usually the better fit',
        body: [
          'Cleared counters, shelves, tables, dressers, windowsills, baseboards, cabinet faces, doors, floors, and reachable vent covers can usually be planned as part of a post-renovation cleaning visit. The crew can work faster when the surfaces are not covered with small loose items.',
          'If shelves are packed, counters are full, or closets are open, the work shifts from dust removal into item handling. That adds time, risk, and ambiguity. The best prep is to box small items, close closets, remove fragile decor, and decide what areas should be skipped.',
        ],
        links: [
          { href: '/how-to-prepare-for-post-construction-cleaning', label: 'How to prepare' },
          { href: '/what-is-included-in-post-construction-cleaning', label: 'What is included' },
        ],
      },
      {
        title: 'Soft goods may need a separate plan',
        body: [
          'Sofas, rugs, curtains, bedding, clothing, pillows, mattresses, pet beds, and fabric toys hold dust differently than hard surfaces. A cleaner may vacuum around or lightly address accessible surfaces, but deep upholstery cleaning, carpet extraction, laundering, and mattress cleaning are usually separate services.',
          'If the dust reached bedrooms or living areas, decide what you will wash, what you want the cleaning crew to work around, and what should be handled by an upholstery or carpet provider. That separation prevents a cleaning visit from becoming an undefined restoration job.',
        ],
        links: [
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
          { href: '/guides/post-renovation-cleaning-before-baby-pets-guests/', label: 'Cleaning before family use' },
        ],
      },
      {
        title: 'Electronics and fragile items need caution',
        body: [
          'Fine dust around televisions, computers, speakers, keyboards, routers, appliances, collectibles, art, and delicate fixtures should be handled carefully. A general cleaning crew should not open electronics, disassemble devices, or use moisture where it could create damage.',
          'Before booking, remove or protect fragile items and send photos of rooms where dust landed on belongings. If electronics were heavily exposed, consider the manufacturer guidance or a specialty provider instead of asking a cleaner to guess.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/request-a-bid', label: 'Project intake' },
        ],
      },
    ],
    checklistTitle: 'Prepare belongings before the cleaning crew arrives',
    checklist: [
      'Box small items, loose decor, papers, toys, and fragile pieces before the visit.',
      'Close closets and cabinets you do not want opened or cleaned inside.',
      'Decide what laundry, bedding, curtains, rugs, upholstery, and pet items you will handle separately.',
      'Move or protect electronics, art, collectibles, heirlooms, and delicate objects.',
      'Send room photos showing where dust landed beyond the construction area.',
      'Tell the crew which rooms are occupied, off limits, or most important for daily use.',
    ],
    faq: [
      {
        q: 'Will post-construction cleaners wash all dusty belongings?',
        a: 'Usually no. Standard cleaning focuses on agreed surfaces and accessible areas. Item-by-item washing, laundry, fragile belongings, and packed shelves need separate preparation or a custom scope.',
      },
      {
        q: 'Can cleaners clean couches or rugs after renovation dust?',
        a: 'They may vacuum around accessible soft surfaces if agreed, but upholstery cleaning, carpet extraction, rug cleaning, and mattress cleaning are normally separate services.',
      },
      {
        q: 'Should I move furniture before post-construction cleaning?',
        a: 'Move small and fragile items if possible. Heavy furniture movement should be discussed before the visit so the crew can plan safely and quote the time correctly.',
      },
      {
        q: 'What if dust got into electronics?',
        a: 'Do not ask a general cleaner to open or wet-clean electronics. Follow manufacturer guidance or use an electronics-safe service if the exposure was heavy.',
      },
    ],
    related: [
      { href: '/post-renovation-house-cleaning', label: 'Post-renovation house cleaning' },
      { href: '/residential-post-construction-cleaning', label: 'Residential construction cleaning' },
      { href: '/how-to-prepare-for-post-construction-cleaning', label: 'How to prepare' },
      { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/can-post-construction-cleaning-remove-renovation-smells',
    title: 'Can Post-Construction Cleaning Remove Renovation Smells? | Shynli',
    keywords: [
      'renovation smell after construction',
      'paint smell after remodel',
      'adhesive smell after renovation',
      'post construction cleaning odors',
      'chemical smell after remodel',
    ],
    description:
      'Can post-construction cleaning remove renovation smells? Learn what cleaning can help, when ventilation matters, and when odors are not a cleaning issue.',
    eyebrow: 'Odor guide',
    h1: 'Can post-construction cleaning remove renovation smells?',
    summary:
      'Some renovation smells improve after dust and residue are removed. Others come from fresh materials, adhesives, paint, moisture, or unfinished work.',
    readTime: '7 min read',
    sourceQuestion: 'Will cleaning get rid of paint, adhesive, or renovation smells?',
    updated: 'June 23, 2026',
    shortAnswer:
      'Post-construction cleaning can reduce some renovation smells by removing dust, residue, trash, dirty surfaces, packaging, and film left by trades. But odors from fresh paint, adhesives, caulk, flooring, sealers, cabinets, moisture, sewer gas, mold, gas, or chemical off-gassing may need ventilation, curing time, contractor correction, HVAC help, or another specialist. Strong or sudden chemical smells should be handled cautiously before cleaning is scheduled.',
    sections: [
      {
        title: 'First identify whether the smell is on surfaces or from materials',
        body: [
          'Dusty floors, dirty bathrooms, packaging, sawdust, wet mop residue, trash, and construction film can make a renovated space smell unfinished. Cleaning can help when the odor source is normal surface soil or leftover jobsite mess.',
          'Fresh paint, caulk, adhesive, grout, flooring, cabinets, sealers, and new materials can smell even when the room is clean. In that case, cleaning may make the space look ready while the odor still needs time, airflow, or contractor input.',
        ],
        links: [
          { href: '/cleaning-after-painting-and-remodeling', label: 'Cleaning after painting' },
          { href: '/flooring-project-cleanup', label: 'Flooring project cleanup' },
        ],
      },
      {
        title: 'Cleaning helps most when residue is still present',
        body: [
          'A detailed clean can remove dusty residue from floors, trim, cabinets, windowsills, fixtures, bathrooms, counters, vents covers, and nearby surfaces. That can reduce the stale jobsite smell that comes from powder, dirt, and debris sitting in the home.',
          'If the odor is strongest near cabinets, floors, tile, fresh paint, a bathroom, or a recently opened wall, tell the cleaner that. The source area matters more than a general request to make the house smell better.',
        ],
        links: [
          { href: '/what-is-included-in-post-construction-cleaning', label: 'What is included' },
          { href: '/cabinet-interior-cleaning-after-construction', label: 'Cabinet interior cleaning' },
          { href: '/cleaning-after-bathroom-remodel', label: 'Bathroom remodel cleaning' },
        ],
      },
      {
        title: 'Ventilation and curing time may matter more than scrubbing',
        body: [
          'Many post-renovation odors improve as products cure and the room is ventilated. Opening windows when weather allows, changing HVAC filters, removing leftover materials, and asking the contractor about product cure times may do more than repeated wiping.',
          'If a room smells like solvent, fuel, sewer gas, smoke, mold, or something sharp and unusual, do not treat it as a normal cleaning annoyance. Pause, ventilate if appropriate, and identify the source before asking a cleaning crew to work in the area.',
        ],
        links: [
          { href: '/guides/hvac-dust-after-renovation-cleaning/', label: 'HVAC dust after renovation' },
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
        ],
      },
      {
        title: 'Do not cover an odor with fragrance',
        body: [
          'A clean renovation should smell neutral, not perfumed. Heavy fragrance can hide whether dust, moisture, trash, adhesive, paint, or a mechanical issue is still present. It can also bother people who are sensitive to scents.',
          'When requesting a quote, describe the odor plainly: paint-like, glue-like, musty, dusty, sewer-like, smoky, chemical, or unknown. Include when it started, where it is strongest, and whether it changes when HVAC, fans, windows, or doors are used.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/post-construction-cleaning-faq', label: 'FAQ' },
          { href: '/request-a-bid', label: 'Project intake' },
        ],
      },
    ],
    checklistTitle: 'What to note before asking about renovation smells',
    checklist: [
      'Where the odor is strongest: floors, cabinets, bathroom, painted room, vents, basement, or kitchen.',
      'Whether the smell is dusty, paint-like, glue-like, chemical, musty, sewer-like, smoky, or unknown.',
      'When the odor started and whether it changes with HVAC, windows, fans, or closed doors.',
      'Which products were recently used: paint, adhesive, caulk, grout, flooring, sealer, cabinets, or solvents.',
      'Whether trash, packaging, debris, damp materials, or leftover supplies are still on site.',
      'Whether anyone has already ruled out gas, sewer, moisture, mold, or other safety issues when relevant.',
    ],
    faq: [
      {
        q: 'Can cleaning remove paint smell after remodeling?',
        a: 'Cleaning can remove paint dust, drips, film, and jobsite residue, but the smell of fresh paint may need curing time and ventilation. If the odor is unusually strong, ask the painter or product manufacturer about next steps.',
      },
      {
        q: 'Will post-construction cleaning remove adhesive smell?',
        a: 'Not always. Adhesive or flooring odors may come from the material itself, not dirt. Cleaning surrounding residue may help the room feel better, but product curing, ventilation, or installer guidance may still be needed.',
      },
      {
        q: 'Should cleaners use fragrance after construction?',
        a: 'Fragrance should not be used to hide an unresolved source. It is better to remove dust and residue, ventilate appropriately, and identify unusual smells rather than mask them.',
      },
      {
        q: 'What smells are not a normal cleaning issue?',
        a: 'Gas, sewer, mold, smoke, heavy chemical odors, moisture problems, or odors tied to damaged materials should be identified by the right professional before ordinary cleaning is treated as the solution.',
      },
    ],
    related: [
      { href: '/cleaning-after-painting-and-remodeling', label: 'Cleaning after painting' },
      { href: '/flooring-project-cleanup', label: 'Flooring project cleanup' },
      { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
      { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
  {
    path: '/guides/when-renovation-dust-needs-specialty-remediation',
    title: 'When Renovation Dust Needs Specialty Remediation | Shynli',
    keywords: [
      'renovation dust remediation',
      'lead dust after renovation',
      'asbestos dust after remodel',
      'hazardous construction dust cleanup',
      'when post construction cleaning is not enough',
    ],
    description:
      'When renovation dust is not ordinary post-construction cleaning: lead, asbestos, mold, sewage, heavy debris, unsafe materials, and specialty remediation boundaries.',
    eyebrow: 'Safety boundary guide',
    h1: 'When renovation dust needs specialty remediation, not ordinary cleaning.',
    summary:
      'Some post-project mess is normal dust. Some dust or debris should stop the cleaning plan until a qualified specialty provider clears the risk.',
    readTime: '8 min read',
    sourceQuestion: 'When is renovation dust too hazardous for a normal cleaner?',
    updated: 'June 23, 2026',
    shortAnswer:
      'Renovation dust may need specialty remediation when it could involve lead paint, asbestos-containing material, mold, sewage, biohazards, heavy chemical residue, fire or smoke damage, water damage, sharp debris, or unsafe construction waste. Ordinary post-construction cleaners are for finished, safe spaces. If the material is unknown or potentially hazardous, stop, document it, and use the proper inspector, contractor, or certified remediation provider before final cleaning.',
    sections: [
      {
        title: 'Ordinary dust and hazardous dust are not the same job',
        body: [
          'Normal post-construction cleaning is built for finished spaces: drywall dust, sawdust, floor dust, cabinet dust, fixtures, trim, glass, bathrooms, kitchens, reachable vents, and final detail work after the jobsite is safe.',
          'Potentially hazardous dust is different. If the project disturbed old paint, suspect insulation, old flooring, moldy materials, sewage, smoke damage, or unknown residue, the first question is not price. The first question is whether the area is safe for ordinary cleaners.',
        ],
        links: [
          { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
          { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
        ],
      },
      {
        title: 'Lead and asbestos concerns should be separated early',
        body: [
          'Homes built before 1978 can raise lead-based paint questions when painted surfaces are disturbed. EPA guidance recommends lead-safe certified contractors for renovation, repair, and painting work in older homes. That is not the same as asking a house cleaner to wipe up unknown dust.',
          'Asbestos concerns also require caution. EPA information points homeowners toward asbestos professionals when material may be disturbed or removal is needed. If you suspect asbestos-containing material, do not sweep, vacuum, or hire an ordinary cleaning crew to guess.',
        ],
        links: [
          { href: '/guides/cleaning-after-contractors-left/', label: 'Cleaning after contractors left' },
          { href: '/guides/how-to-photograph-construction-dust-for-cleaning-quote/', label: 'Documenting dust before cleanup' },
        ],
      },
      {
        title: 'Other red flags can also pause cleaning',
        body: [
          'Moldy drywall, active leaks, sewage, rodent waste, fire residue, smoke damage, chemical spills, strong unknown odors, wet insulation, exposed nails, broken tile, loose glass, and heavy demolition debris are not ordinary cleaning details. They can create safety, liability, or specialty-scope problems.',
          'A cleaning crew can often work after the site is made safe and the specialty issue is resolved. They should not be used as the first line of response when the material is unidentified or the room is still a hazard.',
        ],
        links: [
          { href: '/guides/can-post-construction-cleaning-remove-renovation-smells/', label: 'Renovation smells' },
          { href: '/construction-cleaning-for-homeowners', label: 'Cleaning for homeowners' },
        ],
      },
      {
        title: 'Use photos to ask the right question',
        body: [
          'If you are unsure, take photos without disturbing the material. Show the age of the home if relevant, what was cut or removed, where the dust landed, and whether the contractor identified the material. Avoid dry sweeping, blowing dust, or using a household vacuum on unknown material.',
          'When you contact a cleaner, be direct. Say that the dust may involve old paint, asbestos, mold, water damage, chemical residue, or another concern. A responsible answer may be: call remediation first, get clearance, then schedule final cleaning.',
        ],
        links: [
          { href: '/post-construction-cleaning-photo-quote', label: 'Photo-based planning' },
          { href: '/post-construction-cleaning-scheduling', label: 'Scheduling' },
          { href: '/request-a-bid', label: 'Project intake' },
        ],
      },
    ],
    checklistTitle: 'Pause ordinary cleaning if any of these are present',
    checklist: [
      'Dust from disturbed paint in an older home where lead may be possible.',
      'Suspected asbestos material, old insulation, old flooring, pipe wrap, or unknown demolition debris.',
      'Mold, active moisture, sewage, fire residue, smoke damage, rodent waste, or biohazard concerns.',
      'Strong unknown chemical odors, solvent spills, or product residue that has not been identified.',
      'Sharp debris, exposed nails, broken tile, glass, loose materials, or unsafe access paths.',
      'A contractor, inspector, or specialist has not yet cleared the area for normal occupancy or cleaning.',
    ],
    faq: [
      {
        q: 'Can post-construction cleaners clean lead dust?',
        a: 'Ordinary post-construction cleaning should not be treated as lead remediation. If lead dust is possible, use the proper lead-safe contractor, inspector, or remediation process before final cleaning.',
      },
      {
        q: 'Can cleaners clean asbestos dust?',
        a: 'No ordinary cleaning crew should be asked to clean suspected asbestos dust. Stop and use qualified asbestos professionals if asbestos-containing material may have been disturbed.',
      },
      {
        q: 'What if I am not sure whether the dust is hazardous?',
        a: 'Do not disturb it further. Take photos, ask the contractor what material was disturbed, and contact the appropriate inspector or specialist before booking ordinary cleaning.',
      },
      {
        q: 'Can final cleaning happen after remediation?',
        a: 'Often yes, after the specialty provider has completed their work and the space is safe for normal cleaning. The final clean can then focus on ordinary dust, surfaces, floors, fixtures, and handoff readiness.',
      },
    ],
    related: [
      { href: '/what-is-not-included-in-post-construction-cleaning', label: 'What is not included' },
      { href: '/post-construction-cleaning-boundaries', label: 'Cleaning boundaries' },
      { href: '/construction-dust-cleaning', label: 'Construction dust cleaning' },
      { href: '/post-construction-cleaning-faq', label: 'FAQ' },
      { href: '/request-a-bid', label: 'Project intake' },
    ],
  },
]

export const publicRoutes = [
  '/',
  '/privacy-policy',
  '/terms-of-service',
  '/cancellation-policy',
  '/guides/',
  ...guidePages.map((page) => `${page.path}/`),
  ...seoPages.map((page) => page.path),
]
