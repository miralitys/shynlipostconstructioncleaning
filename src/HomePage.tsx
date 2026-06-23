import { useMemo, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const heroImage = '/images/post-construction-hero.avif'
const heroImageSrcSet = '/images/post-construction-hero-720.avif 720w, /images/post-construction-hero.avif 1200w'
const dustImage = '/images/renovation-dust.webp'
const dustImageSrcSet = '/images/renovation-dust-480.webp 480w, /images/renovation-dust.webp 720w'
const finishedImage = '/images/finished-interior.webp'
const finishedImageSrcSet = '/images/finished-interior-560.webp 560w, /images/finished-interior.webp 1200w'
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
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

const trust = ['Insured crew', 'Rough / final / touch-up', 'Chicagoland service area', 'Photo quote path']

const proofItems = [
  ['Turnover dates stay visible', 'We quote around your walkthrough, listing, inspection, or move-in date so the clean supports the handoff.'],
  ['Scope is clear before arrival', 'Dust level, square footage, cabinets, glass, floors, and access notes are collected before the crew is scheduled.'],
  ['Built for homes and jobsites', 'Renovation homeowners, remodelers, and property teams can all request the right level of final clean.'],
]

const audienceBlocks = [
  {
    mark: 'GC',
    title: 'General contractors',
    copy: 'A cleaner closeout partner for final inspection, owner walkthrough, and occupancy handoff.',
  },
  {
    mark: 'RM',
    title: 'Remodelers',
    copy: 'After-renovation dust, cabinet interiors, glass, floors, fixtures, and the last visual reset.',
  },
  {
    mark: 'PM',
    title: 'Property teams',
    copy: 'Turnover cleaning for renovated units, build-outs, leasing photos, and move-in schedules.',
  },
]

const checklist = [
  'Top-down construction dust removal',
  'Cabinet interiors, shelves, and drawers',
  'Fixtures, switches, vents, ledges, and trim',
  'Interior glass, frames, tracks, and sills',
  'Kitchen, bathrooms, appliances, and surfaces',
  'Floor vacuuming, mopping, and final detail pass',
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

const guideHighlights = [
  {
    href: '/guides/why-construction-dust-keeps-coming-back/',
    eyebrow: 'Dust reset guide',
    title: 'Why construction dust keeps coming back',
    copy: 'What causes fine renovation dust to settle again after cleaning, and when vents, filters, or punch work may still be involved.',
  },
  {
    href: '/guides/cleaning-after-contractors-left/',
    eyebrow: 'Homeowner guide',
    title: 'Cleaning after contractors left a mess',
    copy: 'How to separate normal post-construction cleaning from heavy debris, damage, and unresolved punch-list work.',
  },
  {
    href: '/guides/why-floors-feel-gritty-after-construction-cleaning/',
    eyebrow: 'Floor dust guide',
    title: 'Why floors still feel gritty after cleaning',
    copy: 'How to tell whether the floor needs another detail pass, residue review, or contractor correction.',
  },
  {
    href: '/guides/when-renovation-dust-needs-specialty-remediation/',
    eyebrow: 'Safety boundary guide',
    title: 'When dust is not ordinary cleaning',
    copy: 'Where normal post-construction cleaning stops and specialty remediation, inspection, or contractor correction should happen first.',
  },
]

const questions = [
  {
    q: 'When should post-construction cleaning happen?',
    a: 'The main final clean should happen after major trades are done and before inspection, listing photos, walkthrough, or move-in. A smaller touch-up pass can follow punch-list work.',
  },
  {
    q: 'Do you handle heavy debris or hazardous materials?',
    a: 'Standard post-construction cleaning does not include hauling, dumpsters, hazardous cleanup, or construction waste removal unless that scope is separately confirmed in writing.',
  },
  {
    q: 'What makes this different from regular house cleaning?',
    a: 'The service language is built around dust, phases, turnover deadlines, jobsite photos, and project handoff. It is not positioned like recurring maid service.',
  },
]

function BidForm() {
  const [phase, setPhase] = useState('Final clean')
  const phases = useMemo(() => ['Rough clean', 'Final clean', 'Touch-up', 'After-renovation'], [])

  return (
    <form className="bid-panel" id="quote" action={quoteEndpoint} method="get">
      <input type="hidden" name="service" value="post-construction-cleaning" />
      <input type="hidden" name="phase" value={phase} />
      <input type="hidden" name="source_page" value={currentPath()} />
      <input type="hidden" name="landing_page_url" value={`https://shynlipostconstructioncleaning.com${currentPath() === '/' ? '' : currentPath()}`} />
      <div className="bid-panel__head">
        <Badge>Project quote</Badge>
        <p>Fast estimate path for photos, scope, and turnover date.</p>
      </div>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <Input name="name" placeholder="Your name" />
        </label>
        <label>
          <span>Phone</span>
          <Input name="phone" placeholder="(312) 555-0188" />
        </label>
        <label>
          <span>Project ZIP</span>
          <Input name="zip" placeholder="60564" />
        </label>
        <label>
          <span>Turnover date</span>
          <Input name="turnover_date" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" pattern="(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}" />
        </label>
      </div>
      <div className="phase-picker" role="group" aria-label="Cleaning phase">
        {phases.map((item) => (
          <button className={phase === item ? 'phase-option active' : 'phase-option'} key={item} onClick={() => setPhase(item)} type="button">
            {item}
          </button>
        ))}
      </div>
      <label className="scope-field">
        <span>Scope notes</span>
        <textarea name="notes" placeholder="Project type, square footage, dust level, windows, cabinets, access notes..." />
      </label>
      <div className="bid-actions">
        <Button type="submit" size="lg">
          Send project details <span className="icon-arrow" aria-hidden="true">-&gt;</span>
        </Button>
      </div>
    </form>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img
        src={heroImage}
        srcSet={heroImageSrcSet}
        sizes="100vw"
        alt="Construction site ready for final cleaning"
        className="hero__image"
        fetchPriority="high"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__copy">
          <Badge className="hero-badge">Post-construction cleaning</Badge>
          <h1>Inspection-ready final cleans for closeout, walkthrough, and move-in.</h1>
          <p>
            Detailed cleaning after remodels, build-outs, and construction work. We remove the dust, reset the
            surfaces, and help the space feel ready to show.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg">
              <a href={quoteHref({ cta: 'hero-bid' })}>Request a bid <span className="icon-arrow" aria-hidden="true">-&gt;</span></a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#scope">See scope</a>
            </Button>
          </div>
          <div className="trust-row" aria-label="Trust signals">
            {trust.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <BidForm />
      </div>
    </section>
  )
}

function PhaseSection() {
  return (
    <section className="section phase-section" id="phases">
      <div className="section-kicker">Service architecture</div>
      <div className="split">
        <div className="sticky-copy">
          <h2>A clean closeout plan for every phase of the project.</h2>
          <p>
            Choose the level of cleaning that matches where the job stands: early dust reset, final detailing,
            or a quick <span className="mark">touch-up pass</span> before the space is handed over.
          </p>
        </div>
        <div className="phase-list">
          {phaseSteps.map((step) => (
            <article className="phase-card" key={step.title}>
              <span>{step.eyebrow}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <ul>
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScopeSection() {
  return (
    <section className="section scope-section" id="scope">
      <div className="scope-media">
        <img
          src={dustImage}
          srcSet={dustImageSrcSet}
          sizes="(max-width: 900px) calc(100vw - 32px), 50vw"
          alt="Interior renovation space before final cleaning"
          loading="lazy"
          decoding="async"
        />
        <div className="media-label">Dust-heavy renovation context</div>
      </div>
      <div className="scope-copy">
        <div className="section-kicker">What is included</div>
        <h2>A checklist customers can scan before they call.</h2>
        <p>
          Every project is different, but the quote starts with the details that usually matter most after
          construction work is finished.
        </p>
        <div className="checklist">
          {checklist.map((item) => (
            <div className="checkline" key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceAreasSection() {
  return (
    <section className="section service-areas" id="areas">
      <div className="areas-head">
        <div>
          <div className="section-kicker">Service areas</div>
          <h2>Post-construction cleaning across Chicagoland suburbs.</h2>
        </div>
        <p>
          Tell us the project ZIP, turnover date, and phase needed. We will confirm route availability before the
          clean is scheduled.
        </p>
      </div>
      <div className="areas-grid">
        {serviceAreaGroups.map((group) => (
          <article className="area-group" key={group.label}>
            <h3>{group.label}</h3>
            <div className="city-list">
              {group.cities.map((city) => (
                <a href={`/service-areas/${slugify(city)}`} key={city}>
                  {city}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProofSection() {
  return (
    <section className="section proof-section" id="proof">
      <div className="proof-head">
        <div>
          <div className="section-kicker">Why crews call us</div>
          <h2>A cleaning partner built for tight schedules and final walkthroughs.</h2>
        </div>
        <Button asChild variant="secondary">
          <a href={quoteHref({ cta: 'proof-bid' })}>Start bid request</a>
        </Button>
      </div>
      <div className="proof-grid">
        {proofItems.map(([title, copy]) => (
          <Card key={title} className="proof-card">
            <CardContent>
              <span className="proof-mark" aria-hidden="true">✦</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="audience-grid">
        {audienceBlocks.map((block) => (
          <article className="audience-tile" key={block.title}>
            <span className="audience-mark" aria-hidden="true">{block.mark}</span>
            <h3>{block.title}</h3>
            <p>{block.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function GuidePreviewSection() {
  return (
    <section className="section guide-preview-section">
      <div className="areas-head">
        <div>
          <div className="section-kicker">Guides</div>
          <h2>Answers for the messy questions after construction work.</h2>
        </div>
        <p>
          These guides are written for the real decisions customers make before a final clean: dust that keeps
          returning, contractor cleanup, walkthrough timing, and rooms that need to be usable again.
        </p>
      </div>
      <div className="guide-card-grid">
        {guideHighlights.map((guide) => (
          <article className="guide-card" key={guide.href}>
            <div>
              <span>{guide.eyebrow}</span>
              <h3>
                <a href={guide.href}>{guide.title}</a>
              </h3>
              <p>{guide.copy}</p>
            </div>
            <div className="guide-card-meta">
              <a href={guide.href}>
                Read guide <span className="icon-arrow" aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="guide-preview-more">
        <a href="/guides/">
          View all guides <span className="icon-arrow" aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </section>
  )
}

function VisualBreak() {
  return (
    <section className="visual-break">
      <img
        src={finishedImage}
        srcSet={finishedImageSrcSet}
        sizes="100vw"
        alt="Finished interior after detailed cleaning"
        loading="lazy"
        decoding="async"
      />
      <div>
        <span>Final result</span>
        <h2>From dusty jobsite to handoff-ready space.</h2>
        <p>
          The last clean should make the work feel finished: glass clearer, floors ready, surfaces reset, and
          details ready for walkthrough.
        </p>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="section faq-section">
      <div className="section-kicker">Common questions</div>
      <h2>Know what happens before your clean.</h2>
      <Accordion type="single" collapsible className="faq-list">
        {questions.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={item.q}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div>
        <span className="icon-glyph icon-glyph-large" aria-hidden="true">✓</span>
        <h2>Ready for a cleaner closeout?</h2>
        <p>
          Send the project details, turnover date, and a few jobsite photos. We will help map the right clean.
        </p>
      </div>
      <Button asChild size="lg">
        <a href={quoteHref({ cta: 'final-cta' })}>Request a project quote <span className="icon-arrow" aria-hidden="true">-&gt;</span></a>
      </Button>
    </section>
  )
}

function StickyBar() {
  return (
    <aside className="sticky-bar" aria-label="Quick contact">
      <a href="tel:+16308127077" aria-label="Call Shynli Post-Construction Cleaning"><span className="icon-glyph" aria-hidden="true">☎</span></a>
      <a href={quoteHref({ cta: 'sticky-quote' })} aria-label="Open quote form"><span className="icon-glyph" aria-hidden="true">✓</span></a>
    </aside>
  )
}

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <PhaseSection />
        <ScopeSection />
        <ServiceAreasSection />
        <ProofSection />
        <GuidePreviewSection />
        <VisualBreak />
        <FaqSection />
        <FinalCta />
      </main>
      <StickyBar />
    </>
  )
}
