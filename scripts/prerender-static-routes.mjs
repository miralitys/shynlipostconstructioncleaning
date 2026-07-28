import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import ts from 'typescript'

const rootDir = process.cwd()
const distDir = resolve(rootDir, 'dist')
const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8')
const seoSource = readFileSync(resolve(rootDir, 'src/seo-pages.ts'), 'utf8')
const quoteEndpoint = 'https://shynlicleaningservice.com/quote'
const domain = 'https://shynlipostconstructioncleaning.com'

/*
 * Профиль Google, общий для всех сайтов сети. В нём 5.0 из 44 настоящих
 * отзывов с ответами владельца, и до 2026-07-28 на него не ссылался ни один
 * сайт. Число отзывов растёт, сверять время от времени.
 */
const businessEmail = 'info@shynli.com'
const googleRating = '5.0'
const googleReviewCount = '44'
const googleReviewsUrl = 'https://www.google.com/maps/place/?q=place_id:ChIJw5zPGN2Y-GMRTHBrFh1rKYE'

if (!existsSync(resolve(distDir, 'index.html'))) {
  throw new Error('dist/index.html was not found. Run this script after vite build and CSS inlining.')
}

const appScriptMatch = indexHtml.match(/const src = "(\/assets\/index-[^"]+\.js)"/)
const appScriptSrc = appScriptMatch?.[1]
const shellStyleMatch = indexHtml.match(/<style>\s*([\s\S]*?)<\/style>/)
const cssMatch = indexHtml.match(/<style data-inlined-build-css>([\s\S]*?)<\/style>/)
const shellStyle = shellStyleMatch?.[1] ?? ''
const inlinedCss = cssMatch?.[1] ?? ''

if (!appScriptSrc) {
  throw new Error('Could not find built app script source in dist/index.html.')
}

if (!inlinedCss) {
  throw new Error('Could not find inlined build CSS in dist/index.html.')
}

const transpiledSeo = ts.transpileModule(seoSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText

const seoModule = await import(`data:text/javascript;base64,${Buffer.from(transpiledSeo).toString('base64')}`)
const { seoPages, guidePages } = seoModule

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function quoteHref(path, extra = {}) {
  const params = new URLSearchParams({
    service: 'post-construction-cleaning',
    source_page: path,
    landing_page_url: `${domain}${path === '/' ? '' : path}`,
  })

  Object.entries(extra).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })

  return `${quoteEndpoint}?${params.toString()}`
}

function guideRoute(path) {
  return path.endsWith('/') ? path : `${path}/`
}

function guideIsoDate(page) {
  const timestamp = Date.parse(`${page.updated} UTC`)
  return Number.isNaN(timestamp) ? '2026-06-16' : new Date(timestamp).toISOString().slice(0, 10)
}

function seoDescription(page) {
  const city = page.title.match(/ in (.+)$/)?.[1]

  if (page.category === 'city' && city) {
    return `Post-construction cleaning in ${city} for remodels, build-outs, walkthroughs, listing photos, and move-in preparation. Get a local quote.`
  }

  if (page.category === 'city-service' && city) {
    return `${page.title}. Get cleaning scope, pricing logic, timing, prep, access notes, and photo quote details for ${city} projects.`
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

function pageSchema(page) {
  const city = page.title.match(/ in (.+)$/)?.[1]

  return {
    '@context': 'https://schema.org',
    '@type': page.category === 'support' ? 'FAQPage' : 'Service',
    name: page.title,
    description: seoDescription(page),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Shynli Post-Construction Cleaning',
      url: domain,
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

function guideHubSchema(pages) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Post-construction cleaning guides',
    description:
      'Human answers to common post-construction cleaning questions from homeowners, remodelers, and property teams.',
    url: `${domain}/guides/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: pages.map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.h1,
        url: `${domain}${guideRoute(page.path)}`,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: domain },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${domain}/guides/` },
      ],
    },
  }
}

function guideArticleSchema(page) {
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
          url: domain,
        },
        publisher: {
          '@type': 'LocalBusiness',
          name: 'Shynli Post-Construction Cleaning',
          url: domain,
          telephone: '+1-630-812-7077',
        },
        mainEntityOfPage: `${domain}${guideRoute(page.path)}`,
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: domain },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${domain}/guides/` },
          { '@type': 'ListItem', position: 3, name: page.h1, item: `${domain}${guideRoute(page.path)}` },
        ],
      },
    ],
  }
}

function categoryParagraphs(page) {
  const city = page.title.match(/ in (.+)$/)?.[1]

  if (page.category === 'city') {
    return [
      `${page.title} is planned around local access, parking, building rules, and the timing of the handoff. A city page should help a homeowner, remodeler, builder, or property manager understand whether the route is realistic before they ask for a quote.`,
      `For ${city}, the most useful details are the project ZIP, property type, approximate square footage, cleaning phase, dust level, and whether the space is being prepared for photos, inspection, walkthrough, leasing, closing, or move-in.`,
    ]
  }

  if (page.category === 'city-service' && city) {
    return [
      `${page.title} is quoted by phase, not by a generic house-cleaning checklist. The estimate should reflect the dust level, site access, project condition, square footage, and the deadline for handoff.`,
      `For ${city}, the quote should identify whether the space is being cleaned for inspection, owner walkthrough, listing photos, leasing, closing, or move-in, and whether other trades are still active.`,
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

function relatedLinks(page) {
  const city = page.title.match(/ in (.+)$/)?.[1]
  const citySlug = city ? slugify(city) : undefined

  if (page.category === 'city' && citySlug) {
    return [
      [`/service-areas/${citySlug}/post-construction-cleaning`, `Post-construction cleaning in ${city}`],
      [`/service-areas/${citySlug}/final-cleaning`, `Final cleaning in ${city}`],
      [`/service-areas/${citySlug}/after-renovation-cleaning`, `After-renovation cleaning in ${city}`],
      [`/service-areas/${citySlug}/construction-dust-cleaning`, `Construction dust cleaning in ${city}`],
      [`/service-areas/${citySlug}/touch-up-cleaning`, `Touch-up cleaning in ${city}`],
      ['/post-construction-cleaning-cost', 'Post-construction cleaning cost'],
      ['/construction-cleaning-checklist', 'Construction cleaning checklist'],
      ['/service-areas', 'All service areas'],
    ]
  }

  return [
    ['/post-construction-cleaning', 'Post-construction cleaning'],
    ['/final-cleaning', 'Final cleaning'],
    ['/after-renovation-cleaning', 'After-renovation cleaning'],
    ['/service-areas', 'Service areas'],
    [quoteHref(page.path, { cta: 'related-default' }), 'Request a quote'],
    ['/construction-cleaning-checklist', 'Cleaning checklist'],
    ['/what-is-included-in-post-construction-cleaning', 'What is included'],
    ['/post-construction-cleaning-cost', 'Cost guide'],
  ]
}

function relatedGuideLinks(path) {
  const allGuides = [
    [guideRoute('/guides/why-construction-dust-keeps-coming-back'), 'Why construction dust keeps coming back'],
    [guideRoute('/guides/cleaning-after-contractors-left'), 'Cleaning after contractors left a mess'],
    [guideRoute('/guides/can-you-live-at-home-during-renovation-cleaning'), 'Living at home during renovation cleaning'],
    [guideRoute('/guides/what-to-clean-before-final-payment-to-contractor'), 'What to clean before final contractor payment'],
    [guideRoute('/guides/post-renovation-cleaning-before-baby-pets-guests'), 'Cleaning before babies, pets, or guests'],
    [guideRoute('/guides/cleaning-after-punch-list-work-returns'), 'Cleaning after punch-list work returns'],
    [guideRoute('/guides/how-to-photograph-construction-dust-for-cleaning-quote'), 'How to photograph construction dust'],
    [guideRoute('/guides/contractor-cleanup-vs-hiring-post-construction-cleaner'), 'Contractor cleanup vs hiring a cleaner'],
    [guideRoute('/guides/hvac-dust-after-renovation-cleaning'), 'HVAC dust after renovation cleaning'],
    [guideRoute('/guides/grout-haze-paint-overspray-and-renovation-residue'), 'Grout haze, paint overspray, and residue'],
    [guideRoute('/guides/why-floors-feel-gritty-after-construction-cleaning'), 'Why floors feel gritty after cleaning'],
    [guideRoute('/guides/should-post-construction-cleaners-clean-walls-and-ceilings'), 'Cleaning walls and ceilings after construction'],
    [guideRoute('/guides/cleaning-renovation-dust-from-furniture-and-belongings'), 'Cleaning dust from furniture and belongings'],
    [guideRoute('/guides/can-post-construction-cleaning-remove-renovation-smells'), 'Renovation smells after cleaning'],
    [guideRoute('/guides/when-renovation-dust-needs-specialty-remediation'), 'When dust needs specialty remediation'],
  ]

  const map = {
    '/post-construction-cleaning': [7, 10, 14],
    '/post-construction-cleaning-faq': [14, 13, 8],
    '/construction-dust-cleaning': [14, 11, 0],
    '/drywall-dust-cleaning': [11, 14, 0],
    '/renovation-dust-cleaning': [12, 11, 0],
    '/vent-cleaning-after-renovation-dust': [8, 0, 6],
    '/after-renovation-cleaning': [13, 12, 10],
    '/post-renovation-house-cleaning': [12, 13, 2],
    '/construction-cleaning-for-homeowners': [12, 14, 7],
    '/residential-post-construction-cleaning': [12, 10, 8],
    '/cleaning-after-remodel': [13, 12, 7],
    '/remodel-cleanup-service': [7, 5, 6],
    '/contractor-cleanup-service': [7, 1, 5],
    '/construction-cleaning-for-contractors': [7, 5, 3],
    '/general-contractor-final-cleaning': [7, 5, 3],
    '/what-is-not-included-in-post-construction-cleaning': [14, 13, 9],
    '/what-is-included-in-post-construction-cleaning': [10, 11, 4],
    '/cleaning-before-owner-walkthrough': [5, 9, 3],
    '/cleaning-before-final-inspection': [5, 8, 3],
    '/punch-list-cleaning': [5, 3, 7],
    '/handoff-cleaning': [5, 3, 8],
    '/cleaning-before-move-in': [12, 10, 4],
    '/move-in-ready-construction-cleaning': [12, 10, 4],
    '/post-construction-cleaning-cost': [10, 6, 13],
    '/post-construction-cleaning-prices': [6, 7, 5],
    '/post-construction-cleaning-estimate': [6, 7, 5],
    '/post-construction-cleaning-quote': [6, 7, 5],
    '/construction-cleaning-estimate': [6, 7, 5],
    '/post-construction-cleaning-photo-quote': [6, 8, 9],
    '/post-construction-cleaning-checklist': [10, 11, 6],
    '/construction-cleaning-checklist': [10, 11, 14],
    '/floor-cleaning-after-construction': [10, 9, 6],
    '/dust-cleaning-after-floor-installation': [10, 9, 6],
    '/flooring-project-cleanup': [10, 13, 9],
    '/window-track-cleaning-after-construction': [9, 6, 3],
    '/window-installation-cleanup': [9, 6, 3],
    '/cleaning-after-painting-and-remodeling': [13, 11, 9],
    '/painting-project-cleanup': [13, 11, 9],
    '/cleaning-after-kitchen-remodel': [13, 12, 9],
    '/cleaning-after-bathroom-remodel': [13, 12, 11],
    '/cabinet-interior-cleaning-after-construction': [12, 13, 6],
    '/post-construction-cleaning-boundaries': [14, 13, 11],
  }

  if (map[path]) return map[path].map((index) => allGuides[index])
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

function deferredLoader() {
  return `<script data-deferred-app-loader>
(() => {
  const src = ${JSON.stringify(appScriptSrc)};
  const load = () => {
    if (window.__shynliAppLoaded) return;
    window.__shynliAppLoaded = true;
    const script = document.createElement('script');
    script.type = 'module';
    script.setAttribute('crossorigin', '');
    script.src = src;
    document.head.appendChild(script);
  };
  window.addEventListener('keydown', load, { once: true });
  window.addEventListener('pointerdown', load, { once: true });
  window.addEventListener('scroll', load, { once: true, passive: true });
  window.addEventListener('touchstart', load, { once: true, passive: true });
  window.addEventListener('wheel', load, { once: true, passive: true });
})();
</script>`
}

function header(path) {
  return `<header class="site-header">
    <a href="/" class="brand" aria-label="Shynli Post-Construction Cleaning home"><span class="brand-mark">S</span><span>Shynli Post</span></a>
    <nav aria-label="Primary navigation"><a href="/#phases">Phases</a><a href="/#scope">Scope</a><a href="/#areas">Areas</a><a href="/#proof">Proof</a><a href="/guides/">Guides</a><a href="${escapeHtml(quoteHref(path, { cta: 'header-nav' }))}">Quote</a></nav>
    <a class="header-cta" href="${escapeHtml(quoteHref(path, { cta: 'header-bid' }))}">Request a bid</a>
  </header>`
}

function footer(path) {
  return `<footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <a href="/" class="brand footer-logo" aria-label="Shynli Post-Construction Cleaning home"><span class="brand-mark">S</span><span>Shynli Post</span></a>
        <p>Post-construction cleaning for renovated and newly finished spaces that need to feel ready for walkthrough, listing, or move-in.</p>
        <a class="footer-domain" href="${domain}">shynlipostconstructioncleaning.com</a>
        <div class="footer-trust"><span>Insured crew</span><span>Chicagoland service area</span></div>
      </div>
      <div class="footer-links">
        <div><h3>Services</h3><a href="/rough-cleaning">Rough cleaning</a><a href="/final-cleaning">Final cleaning</a><a href="/touch-up-cleaning">Touch-up cleaning</a><a href="/after-renovation-cleaning">After-renovation dust removal</a><a href="/guides/">Post-construction guides</a></div>
        <div><h3>For</h3><a href="/construction-cleaning-for-contractors">General contractors</a><a href="/remodeler-final-cleaning">Remodelers</a><a href="/property-manager-construction-cleaning">Property teams</a><a href="/construction-cleaning-for-homeowners">Homeowners after renovation</a></div>
        <div><h3>Contact</h3><a href="tel:+16308127077">+1 (630) 812-7077</a><a href="mailto:${businessEmail}">${businessEmail}</a><a href="${googleReviewsUrl}" target="_blank" rel="noopener noreferrer">${googleRating} from ${googleReviewCount} Google reviews</a><a href="${escapeHtml(quoteHref(path, { cta: 'footer-contact' }))}">Request a project quote</a><a href="/service-areas">View service areas</a><a href="/what-is-included-in-post-construction-cleaning">See what is included</a><a href="/guides/">Read guides</a><a href="#top">Back to top</a></div>
      </div>
    </div>
    <div class="footer-bottom"><p>© 2026 Shynli Post-Construction Cleaning. All rights reserved.</p><div><a href="${escapeHtml(quoteHref(path, { cta: 'footer-bottom' }))}">Quote request</a><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="/cancellation-policy">Cancellation</a></div></div>
  </footer>`
}

/*
 * Каноникал для связок «город + услуга».
 *
 * Замерено 2026-07-28: две такие страницы (batavia/final-cleaning и
 * darien/final-cleaning) совпадают на 99.6%, из 714 слов отличаются ТРИ.
 * Google это уже увидел и вынес вердикт сам: в Search Console 66 страниц
 * помечены как «канонические версии, выбранные Google и пользователем, не
 * совпадают», плюс 5 «копия, каноникал не выбран». То есть мы объявляли
 * каждую связку самостоятельной, а Google с этим не соглашался.
 *
 * Решение Рамиса 2026-07-28: свести связки каноникалом на городскую
 * страницу. 210 связок перестают конкурировать между собой и с городом,
 * вес собирается на 42 городских страницах.
 *
 * Сами страницы остаются доступными, меняется только сигнал для поиска.
 */
function canonicalPathFor(path) {
  const segments = path.split('/').filter(Boolean)
  if (segments[0] === 'service-areas' && segments.length >= 3) {
    return guideRoute(`/service-areas/${segments[1]}`)
  }
  return guideRoute(path)
}

function renderPage(page) {
  const description = seoDescription(page)
  const paragraphs = categoryParagraphs(page)
  const links = relatedLinks(page)
  const guideLinks = relatedGuideLinks(page.path)
  const schema = JSON.stringify(pageSchema(page)).replaceAll('</script', '<\\/script')
  const quote = quoteHref(page.path, { cta: 'seo-hero-bid' })

  return `<!doctype html>
<html lang="en" data-route="inner">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />
    <title>${escapeHtml(page.title)} | Shynli Post-Construction Cleaning</title>
    <style>${shellStyle}</style>
    <style data-inlined-build-css>${inlinedCss}</style>
    <link rel="canonical" href="${domain}${canonicalPathFor(page.path)}" />
    <script type="application/ld+json" data-page-schema="true">${schema}</script>
    ${deferredLoader()}
  </head>
  <body>
    <div id="root">
      ${header(page.path)}
      <main>
        <section class="seo-page" id="top">
          <div class="seo-hero">
            <span class="badge hero-badge">${escapeHtml(page.eyebrow)}</span>
            <h1>${escapeHtml(page.title)}</h1>
            <p>${escapeHtml(page.intro)}</p>
            <div class="hero-actions"><a href="${escapeHtml(quote)}">Request a bid <span class="icon-arrow" aria-hidden="true">-&gt;</span></a><a href="/#scope">See scope</a></div>
          </div>
          <section class="seo-copy-band" aria-label="${escapeHtml(page.title)} details">
            <div><div class="section-kicker">Service fit</div><h2>Built for the last stage of the project, not ordinary house cleaning.</h2></div>
            <div class="seo-copy-stack">
              ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
              <p>Shynli Post-Construction Cleaning is designed for the moment when the work is almost finished and the space needs to look finished too. The request can be shaped around construction dust, cabinet interiors, fixtures, glass, floors, trim, access windows, and the handoff deadline instead of a one-size-fits-all cleaning menu.</p>
              <p>The sales conversation stays practical: what needs to be cleaned, what is already finished, what is still active on site, and what result has to be ready for the next person who walks in. That may be an owner, buyer, tenant, inspector, superintendent, leasing team, photographer, or family moving into a remodeled home.</p>
            </div>
          </section>
          <div class="seo-grid">
            <article class="seo-panel"><div class="section-kicker">Scope planning</div><h2>What this page helps quote.</h2><div class="checklist">${page.bullets.map((item) => `<div class="checkline"><span>${escapeHtml(item)}</span></div>`).join('')}</div></article>
            <article class="seo-panel seo-panel-dark"><div class="section-kicker">Cleaning phases</div><h2>Match the request to the job phase.</h2><div class="phase-list compact"><div class="mini-phase"><span>Phase 01</span><h3>Rough clean</h3><p>Bulk dust reset after trades leave, before punch work and finish protection become the bottleneck.</p></div><div class="mini-phase"><span>Phase 02</span><h3>Final clean</h3><p>Top-down detailing for owner walkthroughs, listing photos, leasing, inspections, and move-in day.</p></div><div class="mini-phase"><span>Phase 03</span><h3>Touch-up clean</h3><p>Fast return pass after punch-list work, open house traffic, or last-minute dust before handoff.</p></div></div></article>
          </div>
          <section class="seo-detail-grid"><article><div class="section-kicker">Before we quote</div><h2>What makes the estimate accurate.</h2><p>The strongest quote requests include the service address or ZIP, rough square footage, photos of the current condition, the cleaning phase, the turnover date, parking and access notes, and any fragile or specialty surfaces. These details help us understand whether the space is ready for a rough clean, final clean, or touch-up visit.</p></article><article><div class="section-kicker">What customers get</div><h2>A practical closeout clean with clear boundaries.</h2><p>The clean can focus on top-down dust removal, visible surfaces, cabinets, shelves, drawers, fixtures, switches, ledges, trim, interior glass, tracks, sills, kitchens, bathrooms, appliances, vacuuming, mopping, and final detail work. Heavy debris hauling, hazardous cleanup, mold, asbestos, lead, and restoration work need a different specialty provider unless separately confirmed in writing.</p></article></section>
          <section class="seo-links"><div class="section-kicker">Related pages</div><h2>Continue planning the right construction clean.</h2><div class="seo-link-grid">${links.map(([href, label]) => `<a href="${escapeHtml(href)}"><span>${escapeHtml(label)}</span><span class="icon-arrow" aria-hidden="true">-&gt;</span></a>`).join('')}</div></section>
          ${guideLinks.length ? `<section class="seo-links guide-crosslinks"><div class="section-kicker">Related guides</div><h2>Helpful answers before the final clean.</h2><div class="seo-link-grid">${guideLinks.map(([href, label]) => `<a href="${escapeHtml(href)}"><span>${escapeHtml(label)}</span><span class="icon-arrow" aria-hidden="true">-&gt;</span></a>`).join('')}<a href="/guides/"><span>All post-construction cleaning guides</span><span class="icon-arrow" aria-hidden="true">-&gt;</span></a></div></section>` : ''}
          <section class="seo-faq"><div class="section-kicker">Common questions</div><h2>Questions before you book.</h2><div class="faq-list">${page.faq.map((item) => `<article class="border-b last:border-b-0"><h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p></article>`).join('')}</div></section>
          <section class="seo-related"><div><div class="section-kicker">Next step</div><h2>Send photos and timing details.</h2><p>The fastest estimate path is a project ZIP, turnover date, rough square footage, cleaning phase, and a few photos showing dust, cabinets, glass, floors, and access conditions.</p></div><a href="${escapeHtml(quoteHref(page.path, { cta: 'seo-final-quote' }))}">Request a project quote <span class="icon-arrow" aria-hidden="true">-&gt;</span></a></section>
        </section>
      </main>
      ${footer(page.path)}
    </div>
  </body>
</html>`
}

function renderGuideHub() {
  const schema = JSON.stringify(guideHubSchema(guidePages)).replaceAll('</script', '<\\/script')
  const quote = quoteHref('/guides', { cta: 'guides-hub-quote' })

  return `<!doctype html>
<html lang="en" data-route="inner">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Post-construction cleaning guides for renovation dust, gritty floors, walls, furniture, odors, remediation boundaries, quote photos, and final walkthroughs." />
    <meta name="keywords" content="post construction cleaning guides, renovation cleaning questions, construction dust cleaning guide, post construction cleanup questions, renovation dust quote photos, gritty floors after renovation, renovation smells after construction, hazardous renovation dust, final cleaning guide, post renovation cleaning help" />
    <meta name="robots" content="index,follow" />
    <title>Post-Construction Cleaning Guides | Shynli Post-Construction Cleaning</title>
    <style>${shellStyle}</style>
    <style data-inlined-build-css>${inlinedCss}</style>
    <link rel="canonical" href="${domain}/guides/" />
    <script type="application/ld+json" data-page-schema="true">${schema}</script>
    ${deferredLoader()}
  </head>
  <body>
    <div id="root">
      ${header('/guides')}
      <main>
        <section class="guide-page guide-hub" id="top">
          <div class="guide-hero">
            <span class="badge hero-badge">Post-construction cleaning guides</span>
            <h1>Human answers for the questions people ask before the final clean.</h1>
            <p>Practical guides for homeowners, remodelers, property teams, and contractors dealing with renovation dust, gritty floors, dusty walls, furniture, renovation smells, remediation boundaries, quote photos, contractor cleanup, punch-list returns, residue, move-in timing, and final walkthroughs.</p>
          </div>
          <section class="guide-hub-intro">
            <div><div class="section-kicker">Why these guides exist</div><h2>Post-construction cleaning questions usually show up when the project is almost done.</h2></div>
            <div>
              <p>Most customers do not start with a perfect cleaning scope. They start with a frustrating room: dust keeps coming back, the contractor says the work is finished, the family needs to sleep in the house, or the final walkthrough is close and the space still feels like a jobsite.</p>
              <p>These guides are written around that moment. They explain what a cleaning crew can help with, what should stay on the contractor punch list, what details make a quote accurate, and when another specialty provider may be needed before ordinary post-construction cleaning is the right next step.</p>
              <p>Use the guides to name the problem before you request a bid. If the issue is fine dust, start with the dust guide. If the contractor left a mess, document the condition first. If you are living in the home, plan the cleaning around bedrooms, bathrooms, kitchen use, pets, furniture, and daily traffic instead of expecting a vacant-house reset.</p>
              <p>When you are ready to ask for pricing, send photos, square footage, the project ZIP, the cleaning deadline, and whether the clean supports move-in, owner walkthrough, listing photos, inspection, leasing, or final handoff. That context helps us recommend rough cleaning, final cleaning, touch-up cleaning, or a heavier renovation dust reset without overpromising.</p>
              <p>If the project has sharp debris, heavy trash, exposed materials, water damage, lead, asbestos, mold, or anything that feels unsafe, treat that as a separate scope first. These articles help with normal post-construction cleaning decisions; they do not replace remediation, hauling, inspection, or contractor repair work when the site is not ready for cleaners.</p>
              <p>When in doubt, send photos before moving dust, tools, or debris.</p>
            </div>
          </section>
          <section class="guide-card-grid" aria-label="Post-construction cleaning guides">
            ${guidePages
              .map(
                (page) => `<article class="guide-card">
                  <div><span>${escapeHtml(page.eyebrow)}</span><h2><a href="${escapeHtml(guideRoute(page.path))}">${escapeHtml(page.h1)}</a></h2><p>${escapeHtml(page.summary)}</p></div>
                  <div class="guide-card-meta"><span>${escapeHtml(page.readTime)}</span><a href="${escapeHtml(guideRoute(page.path))}">Read guide <span class="icon-arrow" aria-hidden="true">-&gt;</span></a></div>
                </article>`,
              )
              .join('')}
          </section>
          <section class="seo-related">
            <div><div class="section-kicker">Need a quote</div><h2>Send project photos and the handoff deadline.</h2><p>If the space is already dusty, unfinished, or close to walkthrough day, a few photos can tell us which cleaning phase fits best.</p></div>
            <a href="${escapeHtml(quote)}">Request a project quote <span class="icon-arrow" aria-hidden="true">-&gt;</span></a>
          </section>
        </section>
      </main>
      ${footer('/guides')}
    </div>
  </body>
</html>`
}

function renderGuideArticle(page) {
  const schema = JSON.stringify(guideArticleSchema(page)).replaceAll('</script', '<\\/script')
  const quote = quoteHref(page.path, { cta: 'guide-final-quote' })
  const updatedIso = guideIsoDate(page)

  return `<!doctype html>
<html lang="en" data-route="inner">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${escapeHtml(page.keywords.join(', '))}" />
    <meta name="robots" content="index,follow" />
    <title>${escapeHtml(page.title)}</title>
    <style>${shellStyle}</style>
    <style data-inlined-build-css>${inlinedCss}</style>
    <link rel="canonical" href="${domain}${guideRoute(page.path)}" />
    <script type="application/ld+json" data-page-schema="true">${schema}</script>
    ${deferredLoader()}
  </head>
  <body>
    <div id="root">
      ${header(page.path)}
      <main>
        <article class="guide-page guide-article" id="top">
          <div class="guide-article-shell">
            <div class="guide-main">
              <div class="guide-hero">
                <span class="badge hero-badge">${escapeHtml(page.eyebrow)}</span>
                <h1>${escapeHtml(page.h1)}</h1>
                <p>${escapeHtml(page.summary)}</p>
                <div class="guide-meta"><span>${escapeHtml(page.readTime)}</span><time datetime="${updatedIso}">${escapeHtml(page.updated)}</time><span>${escapeHtml(page.sourceQuestion)}</span></div>
              </div>
              <section class="guide-short-answer"><div class="section-kicker">Short answer</div><p>${escapeHtml(page.shortAnswer)}</p></section>
              ${page.sections
                .map(
                  (section) => `<section class="guide-section">
                    <h2>${escapeHtml(section.title)}</h2>
                    ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
                    ${
                      section.links
                        ? `<div class="guide-inline-links">${section.links.map((link) => `<a href="${escapeHtml(link.href)}"><span>${escapeHtml(link.label)}</span><span class="icon-arrow" aria-hidden="true">-&gt;</span></a>`).join('')}</div>`
                        : ''
                    }
                  </section>`,
                )
                .join('')}
              <section class="guide-checklist"><div class="section-kicker">Checklist</div><h2>${escapeHtml(page.checklistTitle)}</h2><div class="checklist">${page.checklist.map((item) => `<div class="checkline"><span>${escapeHtml(item)}</span></div>`).join('')}</div></section>
              <section class="seo-links guide-related-pages"><div class="section-kicker">Related pages</div><h2>Keep planning the cleanup.</h2><div class="seo-link-grid">${page.related.map((link) => `<a href="${escapeHtml(link.href)}"><span>${escapeHtml(link.label)}</span><span class="icon-arrow" aria-hidden="true">-&gt;</span></a>`).join('')}<a href="/guides/"><span>All guides</span><span class="icon-arrow" aria-hidden="true">-&gt;</span></a></div></section>
              <section class="seo-faq guide-faq"><div class="section-kicker">Common questions</div><h2>Questions people ask before booking.</h2><div class="faq-list">${page.faq.map((item) => `<article class="border-b last:border-b-0"><h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p></article>`).join('')}</div></section>
            </div>
            <aside class="guide-sidebar" aria-label="Guide planning links">
              <div><div class="section-kicker">Plan the clean</div><h2>Get the scope clear before the crew arrives.</h2><p>Send the project ZIP, photos, square footage, dust level, access notes, and the date the space has to be ready.</p></div>
              <div class="guide-sidebar-links"><a href="/post-construction-cleaning">Post-construction cleaning</a><a href="/post-construction-cleaning-cost">Cost guide</a><a href="/construction-cleaning-checklist">Cleaning checklist</a><a href="/post-construction-cleaning-faq">FAQ</a><a href="${escapeHtml(quoteHref(page.path, { cta: 'guide-sidebar-quote' }))}">Request a bid</a></div>
            </aside>
          </div>
          <section class="seo-related guide-final-cta">
            <div><div class="section-kicker">Ready to price it</div><h2>Send photos before the dust gets moved around again.</h2><p>A photo quote helps confirm whether the project needs rough cleaning, final cleaning, touch-up cleaning, or a heavier renovation dust reset.</p></div>
            <a href="${escapeHtml(quote)}">Request a project quote <span class="icon-arrow" aria-hidden="true">-&gt;</span></a>
          </section>
        </article>
      </main>
      ${footer(page.path)}
    </div>
  </body>
</html>`
}

function routeIndexPath(path) {
  return resolve(distDir, path.replace(/^\//, ''), 'index.html')
}

function routeCleanPath(path) {
  return resolve(distDir, `${path.replace(/^\//, '')}.html`)
}

function writeRoute(path, html) {
  const indexPath = routeIndexPath(path)
  const cleanPath = routeCleanPath(path)
  mkdirSync(dirname(indexPath), { recursive: true })
  mkdirSync(dirname(cleanPath), { recursive: true })
  writeFileSync(indexPath, html)
  writeFileSync(cleanPath, html)
}

for (const page of seoPages) {
  writeRoute(page.path, renderPage(page))
}

writeRoute('/guides', renderGuideHub())
for (const page of guidePages) {
  writeRoute(page.path, renderGuideArticle(page))
}

console.log(`Prerendered ${seoPages.length} SEO routes and ${guidePages.length + 1} guide routes into dist/.`)
