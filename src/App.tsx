import { lazy, Suspense, useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const HomePage = lazy(() => import('./HomePage'))

type SeoPage = {
  path: string
  title: string
  eyebrow: string
  intro: string
  category: 'core' | 'city' | 'city-service' | 'intent' | 'project' | 'support'
  bullets: string[]
  faq: Array<{ q: string; a: string }>
}

type GuideLink = {
  href: string
  label: string
}

type GuidePage = {
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
    links?: GuideLink[]
  }>
  checklistTitle: string
  checklist: string[]
  faq: Array<{ q: string; a: string }>
  related: GuideLink[]
}

const quoteEndpoint = 'https://shynlicleaningservice.com/quote'

function currentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function quoteHref(extra: Record<string, string | undefined> = {}) {
  const path = currentPath()
  const params = new URLSearchParams({
    service: 'post-construction-cleaning',
    source_page: path,
    landing_page_url: `https://shynlipostconstructioncleaning.com${path === '/' ? '' : path}`,
  })

  Object.entries(extra).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })

  return `${quoteEndpoint}?${params.toString()}`
}

function guideHref(path: string) {
  return path.endsWith('/') ? path : `${path}/`
}

function guideIsoDate(page: GuidePage) {
  const timestamp = Date.parse(`${page.updated} UTC`)
  return Number.isNaN(timestamp) ? '2026-06-16' : new Date(timestamp).toISOString().slice(0, 10)
}

const phaseSteps = [
  {
    title: 'Rough clean',
    eyebrow: 'Phase 01',
    copy: 'Bulk dust reset after trades leave, before punch work and finish protection become the bottleneck.',
    points: ['Debris-ready surfaces', 'Drywall dust control', 'Site paths cleared'],
  },
  {
    title: 'Final clean',
    eyebrow: 'Phase 02',
    copy: 'Top-down detailing for owner walkthroughs, listing photos, leasing, inspections, and move-in day.',
    points: ['Cabinets and fixtures', 'Glass and frames', 'Floors ready for traffic'],
  },
  {
    title: 'Touch-up clean',
    eyebrow: 'Phase 03',
    copy: 'Fast return pass after punch-list work, open house traffic, or last-minute dust before handoff.',
    points: ['Same-week scheduling', 'Punch-list dust', 'Handoff polish'],
  },
]

const serviceAreaGroups = [
  {
    label: 'A-D',
    cities: [
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
    ],
  },
  {
    label: 'E-L',
    cities: ['Elmhurst', 'Geneva', 'Glen Ellyn', 'Hinsdale', 'Homer Glen', 'Itasca', 'Lemont', 'Lisle', 'Lockport', 'Lombard'],
  },
  {
    label: 'M-S',
    cities: ['Montgomery', 'Naperville', 'North Aurora', 'Oak Brook', 'Oswego', 'Plainfield', 'Romeoville', 'St. Charles', 'Streamwood', 'Sugar Grove'],
  },
  {
    label: 'V-Y',
    cities: ['Villa Park', 'Warrenville', 'Wayne', 'West Chicago', 'Westmont', 'Wheaton', 'Willowbrook', 'Winfield', 'Wood Dale', 'Woodridge', 'Yorkville'],
  },
]

const cities = serviceAreaGroups.flatMap((group) => group.cities)

const serviceModifiers = [
  { slug: 'post-construction-cleaning', name: 'Post-construction cleaning' },
  { slug: 'final-cleaning', name: 'Final cleaning' },
  { slug: 'after-renovation-cleaning', name: 'After-renovation cleaning' },
  { slug: 'construction-dust-cleaning', name: 'Construction dust cleaning' },
  { slug: 'touch-up-cleaning', name: 'Touch-up cleaning' },
]

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const priorityCityProfiles: Record<string, { route: string; property: string; pressure: string; nearby: string[] }> = {
  Addison: {
    route: 'Addison requests often need clear parking and access notes for remodels near busier commercial corridors and residential side streets.',
    property: 'Single-family remodels, townhome updates, and small build-outs usually need cabinet, trim, glass, and floor detail before handoff.',
    pressure: 'The quote should call out whether the clean supports move-in, listing photos, inspection, or a contractor walkthrough.',
    nearby: ['Itasca', 'Wood Dale', 'Villa Park'],
  },
  Aurora: {
    route: 'Aurora projects can range from new-home construction to renovated rentals, so photos and square footage matter before dispatch.',
    property: 'Larger homes, basements, kitchens, and turnover units often need a stronger dust plan than a quick surface reset.',
    pressure: 'The timing usually centers on move-in, listing photos, lease turnover, or final walkthrough with a project manager.',
    nearby: ['North Aurora', 'Oswego', 'Montgomery'],
  },
  Bolingbrook: {
    route: 'Bolingbrook cleaning requests often involve family homes, finished basements, and contractor closeouts with driveway or garage access.',
    property: 'Flooring dust, kitchen cabinets, bathroom fixtures, and trim detail should be separated from any remaining construction debris.',
    pressure: 'The best estimate notes whether the space is being handed back to an owner or prepared for a quick move-in.',
    nearby: ['Romeoville', 'Woodridge', 'Plainfield'],
  },
  'Burr Ridge': {
    route: 'Burr Ridge projects often need a more detailed final presentation, especially when larger homes or premium finishes are involved.',
    property: 'Glass, fixtures, millwork, floors, and cabinet interiors should be photographed before quoting so delicate surfaces are handled correctly.',
    pressure: 'The request should identify any owner walkthrough, showing, or move-in deadline that cannot slide.',
    nearby: ['Hinsdale', 'Willowbrook', 'Darien'],
  },
  'Downers Grove': {
    route: 'Downers Grove remodels often have tighter residential access, mature neighborhoods, and a mix of renovation and real-estate timing.',
    property: 'Kitchens, bathrooms, additions, and listing-prep projects benefit from a final clean that prioritizes visible detail.',
    pressure: 'The strongest request explains whether the clean is for photos, inspection, closing, leasing, or family move-in.',
    nearby: ['Westmont', 'Woodridge', 'Glen Ellyn'],
  },
  Naperville: {
    route: 'Naperville projects often involve larger homes, finished basements, new build-outs, and tight move-in or listing timelines.',
    property: 'Cabinets, stair dust, interior glass, appliance surfaces, bathrooms, and flooring usually need a more deliberate final pass.',
    pressure: 'For accurate scheduling, the quote should name the walkthrough date, move-in date, or photo date before the crew is reserved.',
    nearby: ['Aurora', 'Wheaton', 'Plainfield'],
  },
  Oswego: {
    route: 'Oswego requests often come from growing residential areas where new construction and recent remodels can leave heavy drywall dust.',
    property: 'The priority is usually floors, vents, cabinet interiors, bathrooms, glass, and trim before family move-in.',
    pressure: 'Access notes, driveway availability, and whether other trades are still active should be included with photos.',
    nearby: ['Aurora', 'Montgomery', 'Yorkville'],
  },
  Plainfield: {
    route: 'Plainfield jobs often involve newer homes, basement finishing, flooring projects, and kitchen or bath remodels.',
    property: 'Dust on floors, ledges, cabinets, appliance faces, glass, and baseboards should be scoped separately from debris removal.',
    pressure: 'The request should make the handoff goal clear: owner walkthrough, moving day, listing photos, or final contractor punch work.',
    nearby: ['Naperville', 'Bolingbrook', 'Romeoville'],
  },
  'St. Charles': {
    route: 'St. Charles projects may involve custom homes, older-home renovations, or commercial build-outs with specific access windows.',
    property: 'Glass, trim, fixtures, floors, and surface detail are often the difference between dusty and truly walkthrough-ready.',
    pressure: 'The quote should include whether the job is tied to a showing, inspection, owner handoff, or opening date.',
    nearby: ['Geneva', 'Batavia', 'Wayne'],
  },
  Warrenville: {
    route: 'Warrenville projects often sit between Naperville, Wheaton, and West Chicago routes, so timing and access details help confirm availability.',
    property: 'Renovated homes, townhomes, and small build-outs usually need dust removal, glass detail, cabinet interiors, and final floor care.',
    pressure: 'The request should identify if the clean is for move-in, contractor closeout, photography, or a final owner walkthrough.',
    nearby: ['Naperville', 'Wheaton', 'West Chicago'],
  },
  Wheaton: {
    route: 'Wheaton remodels often involve established homes, real-estate preparation, and projects where final presentation matters.',
    property: 'Kitchen and bath renovations, additions, and flooring work usually need cabinets, trim, fixtures, glass, and floors handled carefully.',
    pressure: 'The quote should include the deadline and whether the home is being shown, inspected, sold, or occupied soon.',
    nearby: ['Glen Ellyn', 'Winfield', 'Warrenville'],
  },
  Yorkville: {
    route: 'Yorkville requests can involve newer homes, basement projects, and renovation dust where route timing should be confirmed early.',
    property: 'Final cleaning should separate touch-up dust from deeper construction residue around floors, cabinets, vents, and trim.',
    pressure: 'Photos help confirm whether the project is ready for cleaning or still needs trades to finish first.',
    nearby: ['Oswego', 'Montgomery', 'Aurora'],
  },
}

const serviceProfiles: Record<string, { scenario: string; pricing: string; prep: string; faq: string }> = {
  'post-construction-cleaning': {
    scenario: 'Best fit when the entire space needs construction-aware cleaning before the handoff, not just a single room or quick wipe-down.',
    pricing: 'Pricing depends on square footage, dust level, number of rooms, cabinet and glass detail, floor condition, and whether a rough, final, or touch-up phase is needed.',
    prep: 'Send wide photos of each area, close-ups of dust-heavy surfaces, the turnover date, and a note about active trades or remaining punch-list work.',
    faq: 'Ask whether one visit is enough or whether a final clean plus a smaller touch-up after punch work will protect the deadline better.',
  },
  'final-cleaning': {
    scenario: 'Best fit when construction work is substantially complete and the space needs to look ready for inspection, photos, walkthrough, leasing, or move-in.',
    pricing: 'Final-clean pricing is shaped by detail level: glass, fixtures, cabinet interiors, trim, flooring, bathrooms, kitchen surfaces, and visible dust on finished materials.',
    prep: 'Remove tools and active work where possible, confirm utilities are on, and send photos that show floors, counters, bathrooms, glass, and cabinets.',
    faq: 'Ask what has to be visually perfect first, because final cleaning is about presentation as much as dust removal.',
  },
  'after-renovation-cleaning': {
    scenario: 'Best fit after a remodel, kitchen update, bathroom project, flooring work, painting, or drywall repair inside an occupied or soon-to-be-occupied space.',
    pricing: 'Renovation cleaning is priced around dust migration, room count, delicate surfaces, furniture protection, appliance detail, and whether the home is vacant or lived-in.',
    prep: 'Tell us which rooms were renovated, where dust traveled, whether furniture is in place, and which areas must be ready first.',
    faq: 'Ask whether the cleaning should focus only on the renovated rooms or also reset adjacent rooms affected by dust.',
  },
  'construction-dust-cleaning': {
    scenario: 'Best fit when fine dust is the main problem after drywall, sanding, flooring, cabinetry, paint prep, or trade work.',
    pricing: 'Dust-cleaning pricing depends on how far dust traveled, ceiling and ledge height, vent and trim detail, floor condition, and the number of passes needed.',
    prep: 'Photos should show vents, ledges, floors, baseboards, glass, and cabinet interiors so the dust level is clear before scheduling.',
    faq: 'Ask whether HVAC, specialty vent cleaning, or restoration work is needed separately if dust has moved beyond standard cleaning scope.',
  },
  'touch-up-cleaning': {
    scenario: 'Best fit after punch-list work, open-house traffic, minor trade returns, or last-minute dust before the final handoff.',
    pricing: 'Touch-up pricing is driven by time sensitivity, number of affected rooms, what changed after the final clean, and how much detail must be restored.',
    prep: 'Send photos of the specific areas that changed since the last clean and note the exact deadline for walkthrough, photos, or occupancy.',
    faq: 'Ask whether the touch-up is limited to new dust and fingerprints or whether the space needs another full final clean.',
  },
}

const priorityCityServiceScenarios: Record<string, string[]> = {
  'Aurora:post-construction-cleaning': [
    'Aurora post-construction cleaning often has to account for larger residential footprints, new-home dust, finished basements, and renovated rental spaces where dust can travel beyond the rooms where trades worked.',
    'For Aurora, the quote should separate whole-home dust reset from specific closeout priorities such as stair rails, kitchen cabinets, bathroom fixtures, appliance faces, floor edges, and garage-entry traffic paths.',
  ],
  'Oswego:post-construction-cleaning': [
    'Oswego post-construction cleaning is often tied to newer residential construction, family move-ins, and renovation projects where drywall dust settles into vents, ledges, trim, and flooring transitions.',
    'For Oswego, the quote should confirm whether the home is still in a builder-clean stage or whether it needs a move-in-ready final clean focused on bathrooms, cabinets, glass, floors, and the main living areas.',
  ],
  'Plainfield:after-renovation-cleaning': [
    'Plainfield after-renovation cleaning often follows kitchen remodels, basement finishing, flooring replacement, and painting projects in newer homes where dust travels through open floor plans.',
    'For Plainfield, the estimate should call out which renovated rooms need detail first and whether nearby bedrooms, stairs, hallways, or living spaces also need dust reset before the family uses the space again.',
  ],
  'Bolingbrook:after-renovation-cleaning': [
    'Bolingbrook after-renovation cleaning often involves finished basements, family-room updates, flooring dust, and kitchen or bath projects where the clean has to work around daily home routines.',
    'For Bolingbrook, the estimate should separate renovation rooms from adjacent traffic areas, garage entries, stairways, and high-touch surfaces that collect dust while contractors come and go.',
  ],
  'Naperville:final-cleaning': [
    'Naperville final cleaning usually needs a stronger presentation standard because many projects are tied to owner walkthroughs, listing photos, move-in dates, or larger custom-home finishes.',
    'For Naperville, the estimate should prioritize what will be seen first: entry surfaces, stair detail, kitchen cabinet interiors, appliance faces, bathroom fixtures, interior glass, and final floor lines.',
  ],
  'Downers Grove:final-cleaning': [
    'Downers Grove final cleaning often follows remodels in established homes where older trim, built-ins, tight access, and real-estate timelines make detail sequencing important.',
    'For Downers Grove, the estimate should identify whether the clean supports a showing, inspection, closing, or owner return so the crew can focus on the rooms with the highest visual impact.',
  ],
  'St. Charles:final-cleaning': [
    'St. Charles final cleaning may involve custom home work, commercial build-outs, or renovation projects where glass, millwork, floors, and fixtures need a polished closeout before handoff.',
    'For St. Charles, the quote should clarify access windows, whether the project has specialty finishes, and which spaces must be ready for an owner walkthrough or opening date.',
  ],
  'Burr Ridge:touch-up-cleaning': [
    'Burr Ridge touch-up cleaning is often about preserving a premium finish after punch-list work, last-minute trade visits, or showings that leave fingerprints and fine dust on visible surfaces.',
    'For Burr Ridge, the estimate should focus on the exact rooms affected since the final clean, especially glass, floors, fixtures, cabinet fronts, counters, trim, and entry areas.',
  ],
  'Warrenville:touch-up-cleaning': [
    'Warrenville touch-up cleaning is usually a targeted return visit after minor punch work, route-adjacent scheduling, or a final dust pass before move-in, photos, or walkthrough.',
    'For Warrenville, the estimate should document what changed after the last clean and whether the priority is flooring, cabinets, bathrooms, glass, or entry paths near the work zone.',
  ],
  'Wheaton:construction-dust-cleaning': [
    'Wheaton construction dust cleaning often follows remodeling in established homes where fine dust reaches built-ins, trim profiles, window sills, stair rails, and adjacent living areas.',
    'For Wheaton, the estimate should show where dust migrated from the original work zone and whether the clean must protect furniture, older finishes, or rooms being prepared for showing.',
  ],
}

function cityServiceScenario(city?: string, serviceSlug?: string) {
  if (!city || !serviceSlug) return []
  const priority = priorityCityServiceScenarios[`${city}:${serviceSlug}`]
  if (priority) return priority

  const profile = cityProfile(city)
  const serviceProfile = serviceProfiles[serviceSlug]
  if (!profile || !serviceProfile) return []

  return [
    `${city} ${serviceProfile.scenario.toLowerCase()} ${profile.property}`,
    `${profile.pressure} ${serviceProfile.prep}`,
  ]
}

const legalPages = {
  '/privacy-policy': {
    title: 'Privacy Policy',
    updated: 'February 16, 2026',
    intro:
      'This Privacy Policy explains how SHYNLI LLC, operating Shynli Post-Construction Cleaning, collects, uses, discloses, and protects personal information when you use this website, request a quote, book or receive cleaning services, or communicate with us by phone, SMS/text, email, or web form.',
    sections: [
      {
        title: 'Information we collect',
        body: [
          'We may collect contact details, service address, property type, project condition, scheduling details, access instructions, company/contact information for business clients, limited payment confirmations, and communications you send to us.',
          'We may also collect website/device data such as IP address, browser type, pages visited, clicks, referring URLs, cookies, analytics events, advertising measurement events, quality-control photos, service notes, and opt-in/opt-out records.',
        ],
      },
      {
        title: 'Information we do not intentionally collect',
        body: [
          'Our services are not directed to children under 13. We do not request Social Security numbers, driver license numbers, biometric identifiers, undisclosed audio recordings, or other sensitive identifiers as part of normal cleaning operations.',
        ],
      },
      {
        title: 'How we use information',
        body: [
          'We use information to provide quotes, schedule and perform cleaning services, coordinate access, send confirmations and reminders, process payments, support customers, improve the website, maintain quality standards, document consent preferences, resolve disputes, comply with law, and protect rights, property, and safety.',
        ],
      },
      {
        title: 'Communications, SMS, calls, and email',
        body: [
          'We may send transactional service messages about quotes, access, schedule changes, invoices, and service updates. Marketing email, text messages, or calls are sent only where permitted and, when required, with prior consent. Consent to marketing is not required to purchase services.',
          'You may opt out of marketing texts by replying STOP where available, or contact us for help. Transactional messages necessary to complete requested services may still be sent.',
        ],
      },
      {
        title: 'Cookies, analytics, and advertising',
        body: [
          'We may use essential cookies, analytics tools such as Google Analytics, and advertising/measurement technologies such as Meta Pixel or Google Ads technologies to operate the website, measure performance, understand visits, improve content, and evaluate ad effectiveness.',
          'You can manage non-essential cookies through browser settings and, when available, website cookie settings. Some browsers send Global Privacy Control or Do Not Track signals; our response may vary depending on applicable law and enabled tools.',
        ],
      },
      {
        title: 'Sharing and service providers',
        body: [
          'We do not sell personal information. We may share information with service providers that support payment processing, scheduling/CRM, SMS/communications, hosting, analytics, email, advertising measurement, legal, insurance, and dispute-resolution needs.',
          'Examples of operational vendors may include Stripe, GoHighLevel, Twilio, hosting providers, analytics providers, and advertising platforms, depending on what is enabled.',
        ],
      },
      {
        title: 'Quality-control photos',
        body: [
          'We may take before/after photos for internal quality control, training, and dispute review. We use reasonable efforts to avoid people, personal documents, and sensitive items. QC photos are not used for marketing or public posting without separate express consent.',
          'QC photos are typically retained up to 90 days unless longer retention is reasonably needed for a dispute, insurance, legal, or compliance reason.',
        ],
      },
      {
        title: 'Retention, security, and rights',
        body: [
          'We retain information only as long as reasonably needed for services, records, tax/accounting, dispute resolution, consent logs, legal compliance, and enforcement of agreements. We use reasonable administrative, technical, and physical safeguards, but no method is completely secure.',
          'Depending on applicable law, you may request access, correction, deletion, marketing opt-out, or opt-out of certain targeted advertising/sharing. We may need to verify your identity before fulfilling a request.',
        ],
      },
      {
        title: 'Contact',
        body: [
          'SHYNLI LLC, Attn: Privacy, P.O. Box 2492, Naperville, IL 60566. Email: info@shynli.com. Phone: +1 (630) 812-7077. Website: https://shynlipostconstructioncleaning.com.',
        ],
      },
    ],
  },
  '/terms-of-service': {
    title: 'Terms of Service',
    updated: 'February 16, 2026',
    intro:
      'These Terms of Service are a legally binding agreement between you and SHYNLI LLC, an Illinois limited liability company operating Shynli Post-Construction Cleaning. By requesting a quote, booking, approving an estimate, paying an invoice, or using the website or cleaning services, you agree to these terms.',
    sections: [
      {
        title: 'Key terms',
        body: [
          'Cancellation and no-show fees may apply. Missing-item liability is capped. Limitation of liability applies. Non-solicitation of staff applies. Dispute-resolution, jury-trial waiver, and class-action waiver terms may apply to the maximum extent permitted by law.',
        ],
      },
      {
        title: 'Eligibility and acceptance',
        body: [
          'You represent that you are at least 18 years old, have legal capacity to enter a contract, have authority to bind any business/entity you represent, and will comply with applicable laws, site rules, and building requirements.',
          'Online booking, estimate approval, clicking Book/Confirm, or paying an invoice may constitute electronic acceptance and a binding agreement.',
        ],
      },
      {
        title: 'Services and scope',
        body: [
          'We provide cleaning services only as described and confirmed in the quote, checklist, service level, proposal, order confirmation, or invoice. The confirmed scope controls over general website descriptions.',
          'Post-construction cleaning may include rough cleaning, final cleaning, touch-up cleaning, after-renovation dust removal, and related details only when included in the confirmed scope.',
        ],
      },
      {
        title: 'Out-of-scope and excluded work',
        body: [
          'Additional tasks require prior approval and may require additional time and charges. Unless expressly agreed in writing, we do not provide restoration, hazardous cleanup, biohazard remediation, hoarding cleanup, sewage backup cleanup, mold remediation, asbestos/lead abatement, pest extermination, heavy debris hauling, dumpster service, bulk-item removal, or work requiring specialty licensing or PPE beyond standard cleaning.',
        ],
      },
      {
        title: 'Client information and site condition',
        body: [
          'You must provide accurate and current information about the property, size, project condition, dust/soil level, fragile or specialty surfaces, access, parking, building rules, site schedule, and special requests.',
          'If actual conditions materially differ from the information provided, we may adjust the scope, extend time, modify pricing, offer a different service level, reschedule, refuse service, or stop service.',
        ],
      },
      {
        title: 'Access, utilities, and safety',
        body: [
          'You must provide access at the scheduled time, working lighting, electricity, running water, safe conditions, and accurate entry/parking instructions. If access is unavailable, incorrect, blocked, or delayed, no-access or no-show fees may apply.',
          'We may refuse, suspend, or terminate service if conditions are unsafe, hostile, hazardous, blocked by active work, or inappropriate for standard cleaning. Fees may be retained for reserved labor, dispatch, travel, and work performed, subject to refunds required by law.',
        ],
      },
      {
        title: 'Cameras, recording, and photos',
        body: [
          'You must disclose cameras or recording devices in advance. We do not consent to undisclosed audio recording of private conversations. Video-only security cameras in common areas may be allowed if disclosed and lawful.',
          'We may take before/after quality-control photos for internal quality control, training, and dispute review, with reasonable efforts to avoid sensitive items. Marketing use requires separate consent.',
        ],
      },
      {
        title: 'Payments, pricing, and changes',
        body: [
          'Quotes and estimates are based on information available before service. Final pricing may change if site conditions, scope, access, or requested work differ from what was disclosed. Deposits, prepayments, payment holds, or payment methods may be required to reserve service.',
        ],
      },
      {
        title: 'Cancellations, no-shows, and delays',
        body: [
          'Cancellation, reschedule, no-access, and no-show fees are governed by the Cancellation Policy, which is incorporated into these Terms. Appointment times are estimated service windows, and delays may occur due to traffic, weather, building access, or conditions at prior jobs.',
        ],
      },
      {
        title: 'Limitations and disputes',
        body: [
          'To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including business interruption, lost rental income, guest refunds, lost profits, or delay-related losses.',
          'Disputes should first be raised promptly so we can review the issue. Any arbitration, class-action waiver, jury-trial waiver, or venue terms apply only to the extent permitted by applicable law.',
        ],
      },
      {
        title: 'Contact',
        body: ['SHYNLI LLC, P.O. Box 2492, Naperville, IL 60566. Email: info@shynli.com. Phone: +1 (630) 812-7077.'],
      },
    ],
  },
  '/cancellation-policy': {
    title: 'Cancellation Policy',
    updated: 'February 13, 2026',
    intro:
      'This Cancellation Policy applies to bookings with SHYNLI LLC operating Shynli Post-Construction Cleaning. It is a summary; the Terms of Service control if there is any inconsistency. All timing is based on America/Chicago Central Time.',
    sections: [
      {
        title: 'How to cancel or reschedule',
        body: [
          'You may cancel or reschedule by replying to a confirmation/reminder SMS, emailing info@shynli.com, or calling/texting +1 (630) 812-7077. Requests are effective when received; processing may be delayed outside normal operating hours.',
        ],
      },
      {
        title: 'Cancellation or reschedule fees',
        body: [
          'More than 48 hours before the appointment: $0.',
          '24-48 hours before: $50 flat fee.',
          '12-24 hours before: 50% of the booked price.',
          'Less than 12 hours before, same-day cancellation, or same-day reschedule: 100% of the booked price.',
          'Fees are intended to cover reserved team time and dispatch/processing costs and will not exceed the booked price. Dispatch/processing costs already incurred are non-refundable to the extent permitted by law.',
        ],
      },
      {
        title: 'No-show or no-access',
        body: [
          'A booking may be treated as a no-show and charged 100% of the booked price if our team arrives but cannot enter, the code/key/lockbox fails, building or security denies entry, the property is unavailable, the site is not vacant when required, or you are unreachable and cannot provide access.',
          'If entry cannot be obtained within 15 minutes of arrival due to access issues, the appointment may be treated as a no-show. If you request the team to wait beyond 15 minutes and we are able to stay, waiting time may be billed at $45/hour, prorated.',
        ],
      },
      {
        title: 'Rebooking reduction',
        body: [
          'If we successfully rebook the cancelled or rescheduled time slot, we may reduce the cancellation fee by the amount of labor revenue recovered from the replacement booking, excluding non-refundable dispatch or processing costs, up to the fee charged.',
        ],
      },
      {
        title: 'Deposits and refunds',
        body: [
          'We may require a valid payment method, prepayment, or deposit to reserve a time slot. If a refund is due, it is issued to the original payment method when feasible and subject to bank or processor timelines.',
        ],
      },
      {
        title: 'Late arrival by the company',
        body: [
          'Appointment times are estimated service windows. If we arrive more than 60 minutes late for reasons within our reasonable control and cannot complete the booked scope, we will reschedule at no charge or issue a proportional credit for the unperformed portion, at our choice, unless a different remedy is required by law.',
          'This does not apply to delays outside our reasonable control, such as severe weather, road closures, accidents, emergencies, building restrictions, or unsafe site conditions.',
        ],
      },
      {
        title: 'Safety or unsuitable conditions',
        body: [
          'If service is refused or terminated because of unsafe conditions, prohibited conditions, access issues, active work interference, or conduct issues, we may retain amounts reasonably related to reserved labor time, dispatch/travel, and costs incurred, and may invoice for work performed, subject to refunds required by law.',
        ],
      },
    ],
  },
}

function setMeta({
  title,
  description,
  path,
  keywords,
  robots = 'index,follow',
  schema,
}: {
  title: string
  description: string
  path: string
  keywords?: string[] | string
  robots?: string
  schema?: Record<string, unknown>
}) {
  document.title = title

  const setMetaTag = (selector: string, create: () => HTMLMetaElement, value: string) => {
    const existing = document.head.querySelector(selector) as HTMLMetaElement | null
    const tag = existing ?? create()
    tag.setAttribute('content', value)
    if (!existing) document.head.appendChild(tag)
  }

  setMetaTag(
    'meta[name="description"]',
    () => {
      const tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      return tag
    },
    description,
  )

  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords
  const existingKeywords = document.head.querySelector('meta[name="keywords"]')
  if (keywordContent) {
    setMetaTag(
      'meta[name="keywords"]',
      () => {
        const tag = document.createElement('meta')
        tag.setAttribute('name', 'keywords')
        return tag
      },
      keywordContent,
    )
  } else {
    existingKeywords?.remove()
  }

  setMetaTag(
    'meta[name="robots"]',
    () => {
      const tag = document.createElement('meta')
      tag.setAttribute('name', 'robots')
      return tag
    },
    robots,
  )

  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  const canonicalPath = path === '/' ? '' : path.endsWith('/') ? path : `${path}/`
  canonical.setAttribute('href', `https://shynlipostconstructioncleaning.com${canonicalPath}`)

  document.querySelectorAll('script[data-page-schema="true"]').forEach((node) => node.remove())
  if (schema) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.pageSchema = 'true'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)
  }
}

function seoDescription(page: SeoPage) {
  const city = page.title.match(/ in (.+)$/)?.[1]
  const service = serviceModifiers.find((item) => page.path.endsWith(`/${item.slug}`))

  if (page.category === 'city' && city) {
    return `Post-construction cleaning in ${city} for remodels, build-outs, walkthroughs, listing photos, and move-in preparation. Get a local quote.`
  }

  if (page.category === 'city-service' && city && service) {
    return `${page.title}. Get ${service.name.toLowerCase()} scope, pricing logic, timing, prep, and photo quote details for ${city} projects.`
  }

  if (page.category === 'intent') {
    return `${page.title}. Compare scope, timing, cost drivers, preparation steps, closeout priorities, and quote details for construction cleaning.`
  }

  if (page.category === 'project') {
    return `${page.title}. Plan construction dust removal, final detail work, timing, boundaries, and quote details for the project.`
  }

  if (page.category === 'support') {
    return `${page.title}. Review service scope, timing, preparation, boundaries, and quote details before booking.`
  }

  return `${page.title}. Review scope, timing, prep, boundaries, and quote details for post-construction cleaning before booking.`
}

function pageSchema(page: SeoPage) {
  const city = page.title.match(/ in (.+)$/)?.[1]
  const service = serviceModifiers.find((item) => page.path.endsWith(`/${item.slug}`))

  return {
    '@context': 'https://schema.org',
    '@type': page.category === 'support' ? 'FAQPage' : 'Service',
    name: page.title,
    description: seoDescription(page),
    ...(service ? { serviceType: service.name } : {}),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Shynli Post-Construction Cleaning',
      url: 'https://shynlipostconstructioncleaning.com',
      telephone: '+1-630-812-7077',
      areaServed: city ?? 'Chicagoland',
    },
    ...(page.category === 'support'
      ? {
          mainEntity: page.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : {}),
  }
}

function guideHubSchema(pages: GuidePage[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Post-construction cleaning guides',
    description:
      'Human answers to common post-construction cleaning questions from homeowners, remodelers, and property teams.',
    url: 'https://shynlipostconstructioncleaning.com/guides/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: pages.map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.h1,
        url: `https://shynlipostconstructioncleaning.com${guideHref(page.path)}`,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shynlipostconstructioncleaning.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://shynlipostconstructioncleaning.com/guides/' },
      ],
    },
  }
}

function guideArticleSchema(page: GuidePage) {
  const updatedIso = guideIsoDate(page)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: page.h1,
        description: page.description,
        datePublished: updatedIso,
        dateModified: updatedIso,
        author: {
          '@type': 'Organization',
          name: 'Shynli Post-Construction Cleaning',
          url: 'https://shynlipostconstructioncleaning.com',
        },
        publisher: {
          '@type': 'LocalBusiness',
          name: 'Shynli Post-Construction Cleaning',
          url: 'https://shynlipostconstructioncleaning.com',
          telephone: '+1-630-812-7077',
        },
        mainEntityOfPage: `https://shynlipostconstructioncleaning.com${guideHref(page.path)}`,
        articleSection: 'Post-construction cleaning guides',
        keywords: page.keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shynlipostconstructioncleaning.com' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://shynlipostconstructioncleaning.com/guides/' },
          {
            '@type': 'ListItem',
            position: 3,
            name: page.h1,
            item: `https://shynlipostconstructioncleaning.com${guideHref(page.path)}`,
          },
        ],
      },
    ],
  }
}

function cityProfile(city?: string) {
  if (!city) return undefined
  const priority = priorityCityProfiles[city]
  if (priority) return priority

  const index = cities.indexOf(city)
  const previous = cities[(index - 1 + cities.length) % cities.length]
  const next = cities[(index + 1) % cities.length]
  const secondNext = cities[(index + 2) % cities.length]
  return {
    route: `${city} requests are reviewed by route availability, parking, access, and how close the project is to handoff.`,
    property: `Most ${city} projects need a practical mix of dust removal, surface detail, glass, cabinets, fixtures, trim, and final floor care.`,
    pressure: `The quote should explain whether the clean is for inspection, owner walkthrough, listing photos, leasing, closing, or move-in.`,
    nearby: [previous, next, secondNext].filter(Boolean),
  }
}

function cityServiceDetails(page: SeoPage) {
  const city = page.title.match(/ in (.+)$/)?.[1]
  const service = serviceModifiers.find((item) => page.path.endsWith(`/${item.slug}`))
  const profile = cityProfile(city)
  const serviceProfile = service ? serviceProfiles[service.slug] : undefined

  if (!city && !serviceProfile) return undefined

  return {
    city,
    service,
    profile,
    serviceProfile,
    serviceScenario: cityServiceScenario(city, service?.slug),
    nearbyLinks:
      profile?.nearby.map((nearbyCity) => ({
        href: `/service-areas/${slugify(nearbyCity)}${service ? `/${service.slug}` : ''}`,
        label: service ? `${service.name} in ${nearbyCity}` : `Post-construction cleaning in ${nearbyCity}`,
      })) ?? [],
  }
}

function categoryCopy(page: SeoPage) {
  const cityMatch = page.title.match(/ in (.+)$/)
  const city = cityMatch?.[1]
  const service = serviceModifiers.find((item) => page.path.endsWith(`/${item.slug}`))

  if (page.category === 'city') {
    return [
      `${page.title} is planned around local access, parking, building rules, and the timing of the handoff. A city page should help a homeowner, remodeler, builder, or property manager understand whether the route is realistic before they ask for a quote.`,
      `For ${city}, the most useful details are the project ZIP, property type, approximate square footage, cleaning phase, dust level, and whether the space is being prepared for photos, inspection, walkthrough, leasing, closing, or move-in.`,
    ]
  }

  if (page.category === 'city-service' && city && service) {
    const profile = cityProfile(city)
    const serviceProfile = serviceProfiles[service.slug]

    return [
      `${service.name} in ${city} is quoted by phase, not by a generic house-cleaning checklist. ${serviceProfile.scenario}`,
      `${profile?.property ?? `For ${city}, the quote should reflect the property type, project condition, and handoff timing.`} ${serviceProfile.prep}`,
    ]
  }

  if (page.category === 'intent') {
    return [
      `${page.title} pages answer the practical questions customers ask before booking: what affects price, what is included, how long the work may take, and what information is needed for an accurate estimate.`,
      'The goal is to make the quote conversation faster. Instead of guessing from a generic cleaning menu, the page explains project condition, dust level, access, timing, and the difference between rough, final, and touch-up cleaning.',
    ]
  }

  if (page.category === 'project') {
    return [
      `${page.title} usually depends on the type of space, what trades recently finished, and how soon the room needs to be shown or occupied. A build-out, remodel, rental turnover, and open-house clean can all need different priorities.`,
      'We focus the request around visible dust, surface detail, cabinets, glass, fixtures, floors, and final presentation. If the project includes heavy debris, hazardous material, or specialty restoration, that must be handled separately.',
    ]
  }

  if (page.category === 'support') {
    return [
      `${page.title} helps set expectations before a quote is requested. Clear boundaries make the cleaning smoother and reduce surprises on the day of service.`,
      'Use this resource to compare service levels, prepare the site, understand timing, and decide whether the job is ready for standard post-construction cleaning or needs a different type of vendor first.',
    ]
  }

  return [
    `${page.title} is built for spaces that are past ordinary recurring cleaning and need construction-aware dust removal, detail work, and closeout timing.`,
    'The quote starts with the project phase, turnover date, access notes, photos, and scope priorities so the crew can plan the right amount of time and the right expectations.',
  ]
}

function relatedLinks(page: SeoPage) {
  const city = page.title.match(/ in (.+)$/)?.[1]
  const service = serviceModifiers.find((item) => page.path.endsWith(`/${item.slug}`))
  const citySlug = city ? slugify(city) : undefined

  if (page.category === 'city' && citySlug) {
    return [
      ...serviceModifiers.map((item) => ({
        href: `/service-areas/${citySlug}/${item.slug}`,
        label: `${item.name} in ${city}`,
      })),
      { href: '/post-construction-cleaning-cost', label: 'Post-construction cleaning cost' },
      { href: '/construction-cleaning-checklist', label: 'Construction cleaning checklist' },
      { href: '/service-areas', label: 'All service areas' },
    ]
  }

  if (page.category === 'city-service' && citySlug && service) {
    return [
      { href: `/service-areas/${citySlug}`, label: `Post-construction cleaning in ${city}` },
      { href: `/${service.slug}`, label: service.name },
      ...serviceModifiers
        .filter((item) => item.slug !== service.slug)
        .slice(0, 3)
        .map((item) => ({ href: `/service-areas/${citySlug}/${item.slug}`, label: `${item.name} in ${city}` })),
      { href: quoteHref({ cta: 'related-city-service' }), label: 'Request a quote' },
      { href: '/what-is-included-in-post-construction-cleaning', label: 'What is included' },
    ]
  }

  if (page.category === 'core') {
    return [
      { href: '/post-construction-cleaning-cost', label: 'Cost guide' },
      { href: '/construction-cleaning-checklist', label: 'Cleaning checklist' },
      { href: '/service-areas/naperville', label: 'Naperville service area' },
      { href: '/service-areas/aurora', label: 'Aurora service area' },
      { href: '/service-areas/plainfield', label: 'Plainfield service area' },
      { href: '/what-is-included-in-post-construction-cleaning', label: 'What is included' },
    ]
  }

  return [
    { href: '/post-construction-cleaning', label: 'Post-construction cleaning' },
    { href: '/final-cleaning', label: 'Final cleaning' },
    { href: '/after-renovation-cleaning', label: 'After-renovation cleaning' },
    { href: '/service-areas', label: 'Service areas' },
    { href: quoteHref({ cta: 'related-default' }), label: 'Request a quote' },
    { href: '/construction-cleaning-checklist', label: 'Cleaning checklist' },
  ]
}

function relatedGuideLinks(path: string): GuideLink[] {
  const allGuides = [
    {
      href: guideHref('/guides/why-construction-dust-keeps-coming-back'),
      label: 'Why construction dust keeps coming back',
    },
    {
      href: guideHref('/guides/cleaning-after-contractors-left'),
      label: 'Cleaning after contractors left a mess',
    },
    {
      href: guideHref('/guides/can-you-live-at-home-during-renovation-cleaning'),
      label: 'Living at home during renovation cleaning',
    },
    {
      href: guideHref('/guides/what-to-clean-before-final-payment-to-contractor'),
      label: 'What to clean before final contractor payment',
    },
    {
      href: guideHref('/guides/post-renovation-cleaning-before-baby-pets-guests'),
      label: 'Cleaning before babies, pets, or guests',
    },
    {
      href: guideHref('/guides/cleaning-after-punch-list-work-returns'),
      label: 'Cleaning after punch-list work returns',
    },
    {
      href: guideHref('/guides/how-to-photograph-construction-dust-for-cleaning-quote'),
      label: 'How to photograph construction dust',
    },
    {
      href: guideHref('/guides/contractor-cleanup-vs-hiring-post-construction-cleaner'),
      label: 'Contractor cleanup vs hiring a cleaner',
    },
    {
      href: guideHref('/guides/hvac-dust-after-renovation-cleaning'),
      label: 'HVAC dust after renovation cleaning',
    },
    {
      href: guideHref('/guides/grout-haze-paint-overspray-and-renovation-residue'),
      label: 'Grout haze, paint overspray, and residue',
    },
    {
      href: guideHref('/guides/why-floors-feel-gritty-after-construction-cleaning'),
      label: 'Why floors feel gritty after cleaning',
    },
    {
      href: guideHref('/guides/should-post-construction-cleaners-clean-walls-and-ceilings'),
      label: 'Cleaning walls and ceilings after construction',
    },
    {
      href: guideHref('/guides/cleaning-renovation-dust-from-furniture-and-belongings'),
      label: 'Cleaning dust from furniture and belongings',
    },
    {
      href: guideHref('/guides/can-post-construction-cleaning-remove-renovation-smells'),
      label: 'Renovation smells after cleaning',
    },
    {
      href: guideHref('/guides/when-renovation-dust-needs-specialty-remediation'),
      label: 'When dust needs specialty remediation',
    },
  ]

  const map: Record<string, string[]> = {
    '/post-construction-cleaning': [allGuides[7].href, allGuides[10].href, allGuides[14].href],
    '/post-construction-cleaning-faq': [allGuides[14].href, allGuides[13].href, allGuides[8].href],
    '/construction-dust-cleaning': [allGuides[14].href, allGuides[11].href, allGuides[0].href],
    '/drywall-dust-cleaning': [allGuides[11].href, allGuides[14].href, allGuides[0].href],
    '/renovation-dust-cleaning': [allGuides[12].href, allGuides[11].href, allGuides[0].href],
    '/vent-cleaning-after-renovation-dust': [allGuides[8].href, allGuides[0].href, allGuides[6].href],
    '/after-renovation-cleaning': [allGuides[13].href, allGuides[12].href, allGuides[10].href],
    '/post-renovation-house-cleaning': [allGuides[12].href, allGuides[13].href, allGuides[2].href],
    '/construction-cleaning-for-homeowners': [allGuides[12].href, allGuides[14].href, allGuides[7].href],
    '/residential-post-construction-cleaning': [allGuides[12].href, allGuides[10].href, allGuides[8].href],
    '/cleaning-after-remodel': [allGuides[13].href, allGuides[12].href, allGuides[7].href],
    '/remodel-cleanup-service': [allGuides[7].href, allGuides[5].href, allGuides[6].href],
    '/contractor-cleanup-service': [allGuides[7].href, allGuides[1].href, allGuides[5].href],
    '/construction-cleaning-for-contractors': [allGuides[7].href, allGuides[5].href, allGuides[3].href],
    '/general-contractor-final-cleaning': [allGuides[7].href, allGuides[5].href, allGuides[3].href],
    '/what-is-not-included-in-post-construction-cleaning': [allGuides[14].href, allGuides[13].href, allGuides[9].href],
    '/what-is-included-in-post-construction-cleaning': [allGuides[10].href, allGuides[11].href, allGuides[4].href],
    '/cleaning-before-owner-walkthrough': [allGuides[5].href, allGuides[9].href, allGuides[3].href],
    '/cleaning-before-final-inspection': [allGuides[5].href, allGuides[8].href, allGuides[3].href],
    '/punch-list-cleaning': [allGuides[5].href, allGuides[3].href, allGuides[7].href],
    '/handoff-cleaning': [allGuides[5].href, allGuides[3].href, allGuides[8].href],
    '/cleaning-before-move-in': [allGuides[12].href, allGuides[10].href, allGuides[4].href],
    '/move-in-ready-construction-cleaning': [allGuides[12].href, allGuides[10].href, allGuides[4].href],
    '/post-construction-cleaning-cost': [allGuides[10].href, allGuides[6].href, allGuides[13].href],
    '/post-construction-cleaning-prices': [allGuides[6].href, allGuides[7].href, allGuides[5].href],
    '/post-construction-cleaning-estimate': [allGuides[6].href, allGuides[7].href, allGuides[5].href],
    '/post-construction-cleaning-quote': [allGuides[6].href, allGuides[7].href, allGuides[5].href],
    '/construction-cleaning-estimate': [allGuides[6].href, allGuides[7].href, allGuides[5].href],
    '/post-construction-cleaning-photo-quote': [allGuides[6].href, allGuides[8].href, allGuides[9].href],
    '/post-construction-cleaning-checklist': [allGuides[10].href, allGuides[11].href, allGuides[6].href],
    '/construction-cleaning-checklist': [allGuides[10].href, allGuides[11].href, allGuides[14].href],
    '/floor-cleaning-after-construction': [allGuides[10].href, allGuides[9].href, allGuides[6].href],
    '/dust-cleaning-after-floor-installation': [allGuides[10].href, allGuides[9].href, allGuides[6].href],
    '/flooring-project-cleanup': [allGuides[10].href, allGuides[13].href, allGuides[9].href],
    '/window-track-cleaning-after-construction': [allGuides[9].href, allGuides[6].href, allGuides[3].href],
    '/window-installation-cleanup': [allGuides[9].href, allGuides[6].href, allGuides[3].href],
    '/cleaning-after-painting-and-remodeling': [allGuides[13].href, allGuides[11].href, allGuides[9].href],
    '/painting-project-cleanup': [allGuides[13].href, allGuides[11].href, allGuides[9].href],
    '/cleaning-after-kitchen-remodel': [allGuides[13].href, allGuides[12].href, allGuides[9].href],
    '/cleaning-after-bathroom-remodel': [allGuides[13].href, allGuides[12].href, allGuides[11].href],
    '/cabinet-interior-cleaning-after-construction': [allGuides[12].href, allGuides[13].href, allGuides[6].href],
    '/post-construction-cleaning-boundaries': [allGuides[14].href, allGuides[13].href, allGuides[11].href],
  }

  const exact = map[path]
  if (exact) return exact.map((href) => allGuides.find((guide) => guide.href === href)).filter(Boolean) as GuideLink[]

  if (path.includes('vent') || path.includes('hvac')) return [allGuides[8], allGuides[0], allGuides[6]]
  if (path.includes('dust')) return [allGuides[14], allGuides[11], allGuides[0]]
  if (path.includes('paint')) return [allGuides[13], allGuides[11], allGuides[9]]
  if (path.includes('floor')) return [allGuides[10], allGuides[9], allGuides[6]]
  if (path.includes('window')) return [allGuides[9], allGuides[6]]
  if (path.includes('remodel') || path.includes('renovation')) return [allGuides[13], allGuides[12], allGuides[7]]
  if (path.includes('walkthrough') || path.includes('inspection') || path.includes('handoff')) return [allGuides[5], allGuides[3], allGuides[9]]
  if (path.includes('homeowner') || path.includes('move-in')) return [allGuides[7], allGuides[6], allGuides[4]]

  return []
}

function usePageMeta(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Post-Construction Cleaning',
      areaServed: 'Chicagoland',
      serviceType: ['Rough cleaning', 'Final cleaning', 'Touch-up cleaning', 'After-renovation cleaning'],
      provider: {
        '@type': 'LocalBusiness',
        name: 'Shynli Post-Construction Cleaning',
        url: 'https://shynlipostconstructioncleaning.com',
      },
    }

    setMeta({
      title: 'Shynli Post-Construction Cleaning | Inspection-ready final cleans',
      description:
        'Post-construction cleaning for remodels, build-outs, final walkthroughs, listing photos, and move-in-ready spaces across Chicagoland suburbs.',
      path: '/',
      schema,
    })
  }, [enabled])
}

function Header({ legal = false }: { legal?: boolean }) {
  const home = legal ? '/' : '#top'
  const anchor = (target: string) => (legal ? `/${target}` : target)

  return (
    <header className="site-header">
      <a href={home} className="brand" aria-label="Shynli Post-Construction Cleaning home">
        <span className="brand-mark">S</span>
        <span>Shynli Post</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href={anchor('#phases')}>Phases</a>
        <a href={anchor('#scope')}>Scope</a>
        <a href={anchor('#areas')}>Areas</a>
        <a href={anchor('#proof')}>Proof</a>
        <a href="/guides/">Guides</a>
        <a href={quoteHref({ cta: 'header-nav' })}>Quote</a>
      </nav>
      <Button asChild className="header-cta">
        <a href={quoteHref({ cta: 'header-bid' })}>Request a bid</a>
      </Button>
    </header>
  )
}

function LegalPage({
  page,
}: {
  page: {
    title: string
    updated: string
    intro: string
    sections: Array<{ title: string; body: string[] }>
  }
}) {
  useEffect(() => {
    setMeta({
      title: `${page.title} | Shynli Post-Construction Cleaning`,
      description: `${page.title} for Shynli Post-Construction Cleaning. Review service, privacy, scheduling, and customer policy details before requesting a post-construction cleaning quote.`,
      path: `/${page.title.toLowerCase().replace(/\s+/g, '-')}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.intro,
        publisher: {
          '@type': 'LocalBusiness',
          name: 'Shynli Post-Construction Cleaning',
          url: 'https://shynlipostconstructioncleaning.com',
        },
      },
    })
  }, [page])

  return (
    <section className="legal-page" id="top">
      <div className="legal-hero">
        <div className="section-kicker">Legal</div>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        <span>Last updated: {page.updated}</span>
      </div>
      <div className="legal-content">
        {page.sections.map((section) => (
          <article className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}

function SeoLandingPage({ page }: { page: SeoPage }) {
  const copyBlocks = categoryCopy(page)
  const links = relatedLinks(page)
  const guideLinks = relatedGuideLinks(page.path)
  const localDetails = cityServiceDetails(page)

  useEffect(() => {
    setMeta({
      title: `${page.title} | Shynli Post-Construction Cleaning`,
      description: seoDescription(page),
      path: page.path,
      schema: pageSchema(page),
    })
  }, [page])

  return (
    <section className="seo-page" id="top">
      <div className="seo-hero">
        <Badge className="hero-badge">{page.eyebrow}</Badge>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        <div className="hero-actions">
          <Button asChild size="lg">
            <a href={quoteHref({ cta: 'seo-hero-bid' })}>Request a bid <span className="icon-arrow" aria-hidden="true">-&gt;</span></a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="/#scope">See scope</a>
          </Button>
        </div>
      </div>

      <section className="seo-copy-band" aria-label={`${page.title} details`}>
        <div>
          <div className="section-kicker">Service fit</div>
          <h2>Built for the last stage of the project, not ordinary house cleaning.</h2>
        </div>
        <div className="seo-copy-stack">
          {copyBlocks.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Shynli Post-Construction Cleaning is designed for the moment when the work is almost finished and the
            space needs to look finished too. The request can be shaped around construction dust, cabinet interiors,
            fixtures, glass, floors, trim, access windows, and the handoff deadline instead of a one-size-fits-all
            cleaning menu.
          </p>
          <p>
            The sales conversation stays practical: what needs to be cleaned, what is already finished, what is still
            active on site, and what result has to be ready for the next person who walks in. That may be an owner,
            buyer, tenant, inspector, superintendent, leasing team, photographer, or family moving into a remodeled
            home. The page is written to help that person decide whether to request a bid and what to send with the
            first message. It also keeps expectations honest before arrival, so the crew, customer, and project team
            are aligned on what can be cleaned well in the available window.
          </p>
        </div>
      </section>

      <div className="seo-grid">
        <article className="seo-panel">
          <div className="section-kicker">Scope planning</div>
          <h2>What this page helps quote.</h2>
          <div className="checklist">
            {page.bullets.map((item) => (
              <div className="checkline" key={item}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="seo-panel seo-panel-dark">
          <div className="section-kicker">Cleaning phases</div>
          <h2>Match the request to the job phase.</h2>
          <div className="phase-list compact">
            {phaseSteps.map((step) => (
              <div className="mini-phase" key={step.title}>
                <span>{step.eyebrow}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <section className="seo-detail-grid">
        <article>
          <div className="section-kicker">Before we quote</div>
          <h2>What makes the estimate accurate.</h2>
          <p>
            The strongest quote requests include the service address or ZIP, rough square footage, photos of the
            current condition, the cleaning phase, the turnover date, parking and access notes, and any fragile or
            specialty surfaces. These details help us understand whether the space is ready for a rough clean, final
            clean, or touch-up visit.
          </p>
        </article>
        <article>
          <div className="section-kicker">What customers get</div>
          <h2>A practical closeout clean with clear boundaries.</h2>
          <p>
            The clean can focus on top-down dust removal, visible surfaces, cabinets, shelves, drawers, fixtures,
            switches, ledges, trim, interior glass, tracks, sills, kitchens, bathrooms, appliances, vacuuming,
            mopping, and final detail work. Heavy debris hauling, hazardous cleanup, mold, asbestos, lead, and
            restoration work need a different specialty provider unless separately confirmed in writing.
          </p>
        </article>
      </section>

      {localDetails && (
        <section className="seo-local-grid">
          {localDetails.profile && (
            <article>
              <div className="section-kicker">Local relevance</div>
              <h2>{localDetails.city ? `${localDetails.city} planning notes` : 'Route planning notes'}.</h2>
              <p>{localDetails.profile.route}</p>
              <p>{localDetails.profile.pressure}</p>
            </article>
          )}
          {localDetails.serviceProfile && (
            <article>
              <div className="section-kicker">Pricing logic</div>
              <h2>{localDetails.service?.name} estimate logic.</h2>
              <p>{localDetails.serviceProfile.pricing}</p>
              <p>{localDetails.serviceProfile.faq}</p>
            </article>
          )}
          {localDetails.serviceScenario.length > 0 && (
            <article>
              <div className="section-kicker">Local scenario</div>
              <h2>{localDetails.city} {localDetails.service?.name.toLowerCase()} fit.</h2>
              {localDetails.serviceScenario.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          )}
          {localDetails.nearbyLinks.length > 0 && (
            <article>
              <div className="section-kicker">Nearby routes</div>
              <h2>Nearby pages for the same cleaning need.</h2>
              <div className="nearby-links">
                {localDetails.nearbyLinks.map((link) => (
                  <a href={link.href} key={link.href}>
                    <span>{link.label}</span>
                    <span className="icon-arrow" aria-hidden="true">-&gt;</span>
                  </a>
                ))}
              </div>
            </article>
          )}
        </section>
      )}

      <section className="seo-links">
        <div className="section-kicker">Related pages</div>
        <h2>Continue planning the right construction clean.</h2>
        <div className="seo-link-grid">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              <span>{link.label}</span>
              <span className="icon-arrow" aria-hidden="true">-&gt;</span>
            </a>
          ))}
        </div>
      </section>

      {guideLinks.length > 0 && (
        <section className="seo-links guide-crosslinks">
          <div className="section-kicker">Related guides</div>
          <h2>Helpful answers before the final clean.</h2>
          <div className="seo-link-grid">
            {guideLinks.map((link) => (
              <a href={link.href} key={link.href}>
                <span>{link.label}</span>
                <span className="icon-arrow" aria-hidden="true">-&gt;</span>
              </a>
            ))}
            <a href="/guides/">
              <span>All post-construction cleaning guides</span>
              <span className="icon-arrow" aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </section>
      )}

      <section className="seo-faq">
        <div className="section-kicker">Common questions</div>
        <h2>Questions before you book.</h2>
        <Accordion type="single" collapsible className="faq-list">
          {page.faq.map((item, index) => (
            <AccordionItem value={`seo-${index}`} key={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="seo-related">
        <div>
          <div className="section-kicker">Next step</div>
          <h2>Send photos and timing details.</h2>
          <p>
            The fastest estimate path is a project ZIP, turnover date, rough square footage, cleaning phase, and a
            few photos showing dust, cabinets, glass, floors, and access conditions.
          </p>
        </div>
        <Button asChild size="lg">
          <a href={quoteHref({ cta: 'seo-final-quote' })}>Request a project quote <span className="icon-arrow" aria-hidden="true">-&gt;</span></a>
        </Button>
      </section>
    </section>
  )
}

function GuideHubPage({ pages }: { pages: GuidePage[] }) {
  useEffect(() => {
    setMeta({
      title: 'Post-Construction Cleaning Guides | Shynli Post-Construction Cleaning',
      description:
        'Post-construction cleaning guides for renovation dust, gritty floors, walls, furniture, odors, remediation boundaries, quote photos, and final walkthroughs.',
      keywords: [
        'post construction cleaning guides',
        'renovation cleaning questions',
        'construction dust cleaning guide',
        'post construction cleanup questions',
        'renovation dust quote photos',
        'gritty floors after renovation',
        'renovation smells after construction',
        'hazardous renovation dust',
        'final cleaning guide',
        'post renovation cleaning help',
      ],
      path: '/guides/',
      schema: guideHubSchema(pages),
    })
  }, [pages])

  return (
    <section className="guide-page guide-hub" id="top">
      <div className="guide-hero">
        <Badge className="hero-badge">Post-construction cleaning guides</Badge>
        <h1>Human answers for the questions people ask before the final clean.</h1>
        <p>
          Practical guides for homeowners, remodelers, property teams, and contractors dealing with renovation dust,
          gritty floors, dusty walls, furniture, renovation smells, remediation boundaries, quote photos, contractor
          cleanup, punch-list returns, residue, move-in timing, and final walkthroughs.
        </p>
      </div>

      <section className="guide-hub-intro">
        <div>
          <div className="section-kicker">Why these guides exist</div>
          <h2>Post-construction cleaning questions usually show up when the project is almost done.</h2>
        </div>
        <div>
          <p>
            Most customers do not start with a perfect cleaning scope. They start with a frustrating room: dust keeps
            coming back, the contractor says the work is finished, the family needs to sleep in the house, or the final
            walkthrough is close and the space still feels like a jobsite.
          </p>
          <p>
            These guides are written around that moment. They explain what a cleaning crew can help with, what should
            stay on the contractor punch list, what details make a quote accurate, and when another specialty provider
            may be needed before ordinary post-construction cleaning is the right next step.
          </p>
          <p>
            Use the guides to name the problem before you request a bid. If the issue is fine dust, start with the dust
            guide. If the contractor left a mess, document the condition first. If you are living in the home, plan the
            cleaning around bedrooms, bathrooms, kitchen use, pets, furniture, and daily traffic instead of expecting a
            vacant-house reset.
          </p>
          <p>
            When you are ready to ask for pricing, send photos, square footage, the project ZIP, the cleaning deadline,
            and whether the clean supports move-in, owner walkthrough, listing photos, inspection, leasing, or final
            handoff. That context helps us recommend rough cleaning, final cleaning, touch-up cleaning, or a heavier
            renovation dust reset without overpromising.
          </p>
          <p>
            If the project has sharp debris, heavy trash, exposed materials, water damage, lead, asbestos, mold, or
            anything that feels unsafe, treat that as a separate scope first. These articles help with normal
            post-construction cleaning decisions; they do not replace remediation, hauling, inspection, or contractor
            repair work when the site is not ready for cleaners.
          </p>
          <p>When in doubt, send photos before moving dust, tools, or debris.</p>
        </div>
      </section>

      <section className="guide-card-grid" aria-label="Post-construction cleaning guides">
        {pages.map((page) => (
          <article className="guide-card" key={page.path}>
            <div>
              <span>{page.eyebrow}</span>
              <h2>
                <a href={guideHref(page.path)}>{page.h1}</a>
              </h2>
              <p>{page.summary}</p>
            </div>
            <div className="guide-card-meta">
              <span>{page.readTime}</span>
              <a href={guideHref(page.path)}>
                Read guide <span className="icon-arrow" aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="seo-related">
        <div>
          <div className="section-kicker">Need a quote</div>
          <h2>Send project photos and the handoff deadline.</h2>
          <p>
            If the space is already dusty, unfinished, or close to walkthrough day, a few photos can tell us which
            cleaning phase fits best.
          </p>
        </div>
        <Button asChild size="lg">
          <a href={quoteHref({ cta: 'guides-hub-quote' })}>
            Request a project quote <span className="icon-arrow" aria-hidden="true">-&gt;</span>
          </a>
        </Button>
      </section>
    </section>
  )
}

function GuideArticlePage({ page }: { page: GuidePage }) {
  useEffect(() => {
    setMeta({
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      path: guideHref(page.path),
      schema: guideArticleSchema(page),
    })
  }, [page])

  return (
    <article className="guide-page guide-article" id="top">
      <div className="guide-article-shell">
        <div className="guide-main">
          <div className="guide-hero">
            <Badge className="hero-badge">{page.eyebrow}</Badge>
            <h1>{page.h1}</h1>
            <p>{page.summary}</p>
            <div className="guide-meta">
              <span>{page.readTime}</span>
              <time dateTime={guideIsoDate(page)}>{page.updated}</time>
              <span>{page.sourceQuestion}</span>
            </div>
          </div>

          <section className="guide-short-answer">
            <div className="section-kicker">Short answer</div>
            <p>{page.shortAnswer}</p>
          </section>

          {page.sections.map((section) => (
            <section className="guide-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.links && (
                <div className="guide-inline-links">
                  {section.links.map((link) => (
                    <a href={link.href} key={link.href}>
                      <span>{link.label}</span>
                      <span className="icon-arrow" aria-hidden="true">-&gt;</span>
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="guide-checklist">
            <div className="section-kicker">Checklist</div>
            <h2>{page.checklistTitle}</h2>
            <div className="checklist">
              {page.checklist.map((item) => (
                <div className="checkline" key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="seo-links guide-related-pages">
            <div className="section-kicker">Related pages</div>
            <h2>Keep planning the cleanup.</h2>
            <div className="seo-link-grid">
              {page.related.map((link) => (
                <a href={link.href} key={link.href}>
                  <span>{link.label}</span>
                  <span className="icon-arrow" aria-hidden="true">-&gt;</span>
                </a>
              ))}
              <a href="/guides/">
                <span>All guides</span>
                <span className="icon-arrow" aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </section>

          <section className="seo-faq guide-faq">
            <div className="section-kicker">Common questions</div>
            <h2>Questions people ask before booking.</h2>
            <Accordion type="single" collapsible className="faq-list">
              {page.faq.map((item, index) => (
                <AccordionItem value={`guide-${index}`} key={item.q}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside className="guide-sidebar" aria-label="Guide planning links">
          <div>
            <div className="section-kicker">Plan the clean</div>
            <h2>Get the scope clear before the crew arrives.</h2>
            <p>
              Send the project ZIP, photos, square footage, dust level, access notes, and the date the space has to
              be ready.
            </p>
          </div>
          <div className="guide-sidebar-links">
            <a href="/post-construction-cleaning">Post-construction cleaning</a>
            <a href="/post-construction-cleaning-cost">Cost guide</a>
            <a href="/construction-cleaning-checklist">Cleaning checklist</a>
            <a href="/post-construction-cleaning-faq">FAQ</a>
            <a href={quoteHref({ cta: 'guide-sidebar-quote' })}>Request a bid</a>
          </div>
        </aside>
      </div>

      <section className="seo-related guide-final-cta">
        <div>
          <div className="section-kicker">Ready to price it</div>
          <h2>Send photos before the dust gets moved around again.</h2>
          <p>
            A photo quote helps confirm whether the project needs rough cleaning, final cleaning, touch-up cleaning,
            or a heavier renovation dust reset.
          </p>
        </div>
        <Button asChild size="lg">
          <a href={quoteHref({ cta: 'guide-final-quote' })}>
            Request a project quote <span className="icon-arrow" aria-hidden="true">-&gt;</span>
          </a>
        </Button>
      </section>
    </article>
  )
}

function Footer({ legal = false }: { legal?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href={legal ? '/' : '#top'} className="brand footer-logo" aria-label="Shynli Post-Construction Cleaning home">
            <span className="brand-mark">S</span>
            <span>Shynli Post</span>
          </a>
          <p>
            Post-construction cleaning for renovated and newly finished spaces that need to feel ready for
            walkthrough, listing, or move-in.
          </p>
          <a className="footer-domain" href="https://shynlipostconstructioncleaning.com">
            shynlipostconstructioncleaning.com
          </a>
          <div className="footer-trust">
            <span>Insured crew</span>
            <span>Chicagoland service area</span>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h3>Services</h3>
            <a href="/rough-cleaning">Rough cleaning</a>
            <a href="/final-cleaning">Final cleaning</a>
            <a href="/touch-up-cleaning">Touch-up cleaning</a>
            <a href="/after-renovation-cleaning">After-renovation dust removal</a>
            <a href="/guides/">Post-construction guides</a>
          </div>
          <div>
            <h3>For</h3>
            <a href="/construction-cleaning-for-contractors">General contractors</a>
            <a href="/remodeler-final-cleaning">Remodelers</a>
            <a href="/property-manager-construction-cleaning">Property teams</a>
            <a href="/construction-cleaning-for-homeowners">Homeowners after renovation</a>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="tel:+16308127077">+1 (630) 812-7077</a>
            <a href={quoteHref({ cta: 'footer-contact' })}>Request a project quote</a>
            <a href="/service-areas">View service areas</a>
            <a href="/what-is-included-in-post-construction-cleaning">See what is included</a>
            <a href="/guides/">Read guides</a>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Shynli Post-Construction Cleaning. All rights reserved.</p>
        <div>
          <a href={quoteHref({ cta: 'footer-bottom' })}>Quote request</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms-of-service">Terms</a>
          <a href="/cancellation-policy">Cancellation</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const legalPage = legalPages[path as keyof typeof legalPages]
  const [seoPage, setSeoPage] = useState<SeoPage | null | undefined>(undefined)
  const [guidePage, setGuidePage] = useState<GuidePage | null | undefined>(undefined)
  const [guidePages, setGuidePages] = useState<GuidePage[] | undefined>(undefined)
  const shouldLoadSeoPage = !legalPage && path !== '/'
  const isGuidesHub = path === '/guides'

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return

      window.requestAnimationFrame(() => {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
      })
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)

    return () => {
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  useEffect(() => {
    if (!shouldLoadSeoPage) {
      return
    }

    let active = true

    import('./seo-pages').then(({ seoPages, guidePages }) => {
      if (active) {
        setSeoPage(seoPages.find((page) => page.path === path) ?? null)
        setGuidePage(guidePages.find((page) => page.path === path) ?? null)
        setGuidePages(guidePages)
      }
    })

    return () => {
      active = false
    }
  }, [path, shouldLoadSeoPage])

  const dynamicPagesResolved =
    !shouldLoadSeoPage || (seoPage !== undefined && guidePage !== undefined && (!isGuidesHub || guidePages))

  usePageMeta(path === '/' || (!legalPage && dynamicPagesResolved && seoPage === null && guidePage === null && !isGuidesHub))

  if (legalPage) {
    return (
      <>
        <Header legal />
        <main>
          <LegalPage page={legalPage} />
        </main>
        <Footer legal />
      </>
    )
  }

  if (seoPage) {
    return (
      <>
        <Header legal />
        <main>
          <SeoLandingPage page={seoPage} />
        </main>
        <Footer legal />
      </>
    )
  }

  if (isGuidesHub && guidePages) {
    return (
      <>
        <Header legal />
        <main>
          <GuideHubPage pages={guidePages} />
        </main>
        <Footer legal />
      </>
    )
  }

  if (guidePage) {
    return (
      <>
        <Header legal />
        <main>
          <GuideArticlePage page={guidePage} />
        </main>
        <Footer legal />
      </>
    )
  }

  if (shouldLoadSeoPage && !dynamicPagesResolved) {
    return (
      <>
        <Header legal />
        <main />
        <Footer legal />
      </>
    )
  }

  return (
    <>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
      <Footer />
    </>
  )
}

export default App
