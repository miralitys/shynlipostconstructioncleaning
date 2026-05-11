import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5190'
const localRenderThresholdMs = baseUrl.includes('127.0.0.1') || baseUrl.includes('localhost') ? 500 : 1500
const top30 = [
  '/',
  '/post-construction-cleaning',
  '/final-cleaning',
  '/after-renovation-cleaning',
  '/construction-dust-cleaning',
  '/post-construction-cleaning-cost',
  '/construction-cleaning-checklist',
  '/what-is-included-in-post-construction-cleaning',
  '/service-areas',
  '/service-areas/naperville',
  '/service-areas/aurora',
  '/service-areas/plainfield',
  '/service-areas/wheaton',
  '/service-areas/downers-grove',
  '/service-areas/burr-ridge',
  '/service-areas/st-charles',
  '/service-areas/oswego',
  '/service-areas/bolingbrook',
  '/service-areas/warrenville',
  '/service-areas/yorkville',
  '/service-areas/naperville/final-cleaning',
  '/service-areas/aurora/post-construction-cleaning',
  '/service-areas/plainfield/after-renovation-cleaning',
  '/service-areas/wheaton/construction-dust-cleaning',
  '/service-areas/downers-grove/final-cleaning',
  '/service-areas/burr-ridge/touch-up-cleaning',
  '/service-areas/st-charles/final-cleaning',
  '/service-areas/oswego/post-construction-cleaning',
  '/service-areas/bolingbrook/after-renovation-cleaning',
  '/service-areas/warrenville/touch-up-cleaning',
]

const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const sitemapPaths = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname || '/'))
const failures = []
const pages = []

for (const path of top30) {
  if (!sitemapPaths.has(path)) failures.push(`${path}: missing from sitemap`)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } })

for (const path of top30) {
  const started = performance.now()
  const response = await page.goto(`${baseUrl}${path === '/' ? '' : path}`, { waitUntil: 'domcontentloaded', timeout: 15000 })
  const domMs = Math.round(performance.now() - started)
  if (!response || response.status() >= 400) failures.push(`${path}: bad response ${response?.status() ?? 'none'}`)

  const data = await page.evaluate(() => {
    const text = document.body.innerText.replace(/\s+/g, ' ').trim()
    const domText = document.body.textContent?.replace(/\s+/g, ' ').trim() ?? ''
    const comparisonText = [
      ...document.querySelectorAll('.seo-copy-band, .seo-local-grid, .seo-faq, .seo-links'),
    ]
      .map((node) => node.textContent ?? '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
    const links = [...document.querySelectorAll('a[href]')].map((link) => link.getAttribute('href') ?? '')
    const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent ?? '')
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      h1Count: document.querySelectorAll('h1').length,
      h2Count: document.querySelectorAll('h2').length,
      text,
      domText,
      comparisonText,
      wordCount: text.split(/\s+/).filter(Boolean).length,
      internalLinks: [...new Set(links.filter((href) => href.startsWith('/') || href.startsWith('#')))],
      quoteLinks: links.filter((href) => href.includes('quote') || href.includes('#quote')),
      schema,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }
  })

  const lower = data.domText.toLowerCase()
  const expectedCanonical = `https://shynlipostconstructioncleaning.com${path === '/' ? '' : path}`
  if (data.h1Count !== 1) failures.push(`${path}: expected 1 H1, found ${data.h1Count}`)
  if (data.h2Count < 4 && path !== '/') failures.push(`${path}: weak section structure, only ${data.h2Count} H2s`)
  if (data.title.length < 35 || data.title.length > 90) failures.push(`${path}: title length ${data.title.length}`)
  if (data.description.length < 120 || data.description.length > 180) failures.push(`${path}: description length ${data.description.length}`)
  if (data.canonical !== expectedCanonical) failures.push(`${path}: canonical mismatch`)
  if (data.schema.length < 1) failures.push(`${path}: missing schema`)
  if (!data.schema.join(' ').includes('Shynli Post-Construction Cleaning')) failures.push(`${path}: schema missing provider brand`)
  if (path !== '/' && data.wordCount < 650) failures.push(`${path}: thin page risk ${data.wordCount} words`)
  if (data.internalLinks.length < 14) failures.push(`${path}: weak internal links ${data.internalLinks.length}`)
  if (data.quoteLinks.length < 2) failures.push(`${path}: weak quote CTA coverage`)
  if (!lower.includes('pricing') && !lower.includes('priced') && !lower.includes('estimate')) {
    failures.push(`${path}: missing pricing or estimate logic`)
  }
  if (path.startsWith('/service-areas/')) {
    const city = path.split('/')[2].replace(/-/g, ' ')
    const cityWords = city.split(' ')
    for (const word of cityWords) {
      if (!lower.includes(word)) failures.push(`${path}: missing local city word ${word}`)
    }
    if (!lower.includes('nearby')) failures.push(`${path}: missing nearby route context`)
  }
  if (path.split('/').length === 4) {
    if (!lower.includes('pricing logic')) failures.push(`${path}: missing explicit city-service pricing logic block`)
    if (!lower.includes('local relevance')) failures.push(`${path}: missing explicit local relevance block`)
  }
  if (data.scrollWidth > data.clientWidth + 2) failures.push(`${path}: horizontal overflow`)
  if (domMs > localRenderThresholdMs) failures.push(`${path}: slow DOM render ${domMs}ms`)

  pages.push({ path, domMs, ...data })
}

await browser.close()

const stopwords = new Set(
  [
    'the',
    'and',
    'for',
    'with',
    'that',
    'this',
    'cleaning',
    'clean',
    'post',
    'construction',
    'shiny',
    'service',
    'services',
    'page',
    'quote',
    'request',
    'project',
    'details',
    'before',
    'after',
    'ready',
    'final',
    'dust',
    'need',
    'needs',
    'area',
    'areas',
    'chicagoland',
    ...top30.flatMap((path) => path.split(/[/-]/g)),
  ].filter(Boolean),
)

const vectorize = (text) => {
  const vector = new Map()
  for (const token of text.toLowerCase().match(/[a-z]{4,}/g) ?? []) {
    if (stopwords.has(token)) continue
    vector.set(token, (vector.get(token) ?? 0) + 1)
  }
  return vector
}

const cosine = (a, b) => {
  let dot = 0
  let aMag = 0
  let bMag = 0
  for (const value of a.values()) aMag += value * value
  for (const value of b.values()) bMag += value * value
  for (const [key, value] of a.entries()) dot += value * (b.get(key) ?? 0)
  return dot / (Math.sqrt(aMag) * Math.sqrt(bMag))
}

const cityServicePages = pages.filter((item) => item.path.split('/').length === 4)
const similarityPairs = []
for (let i = 0; i < cityServicePages.length; i += 1) {
  for (let j = i + 1; j < cityServicePages.length; j += 1) {
    const score = cosine(vectorize(cityServicePages[i].comparisonText), vectorize(cityServicePages[j].comparisonText))
    similarityPairs.push({
      a: cityServicePages[i].path,
      b: cityServicePages[j].path,
      score: Number(score.toFixed(3)),
    })
  }
}
similarityPairs.sort((a, b) => b.score - a.score)
if (similarityPairs[0]?.score > 0.86) {
  failures.push(`doorway-risk similarity too high: ${similarityPairs[0].score} for ${similarityPairs[0].a} vs ${similarityPairs[0].b}`)
}

const report = {
  generatedAt: new Date().toISOString(),
  checked: pages.length,
  failuresCount: failures.length,
  failures,
  wordRange: {
    min: Math.min(...pages.map((item) => item.wordCount)),
    max: Math.max(...pages.map((item) => item.wordCount)),
  },
  domMs: {
    avg: Math.round(pages.reduce((sum, item) => sum + item.domMs, 0) / pages.length),
    max: Math.max(...pages.map((item) => item.domMs)),
  },
  internalLinks: {
    min: Math.min(...pages.map((item) => item.internalLinks.length)),
    max: Math.max(...pages.map((item) => item.internalLinks.length)),
  },
  topSimilarityPairs: similarityPairs.slice(0, 10),
  pages: pages.map((item) => ({
    path: item.path,
    wordCount: item.wordCount,
    domMs: item.domMs,
    internalLinks: item.internalLinks.length,
    quoteLinks: item.quoteLinks.length,
    title: item.title,
  })),
}

const reportDir = new URL('../screenshots/', import.meta.url)
mkdirSync(reportDir, { recursive: true })
writeFileSync(new URL('shiny-post-construction-top30-production-risk-2026-05-10.json', reportDir), JSON.stringify(report, null, 2))

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('Top-30 production risk audit passed.')
console.log('Report: screenshots/shiny-post-construction-top30-production-risk-2026-05-10.json')
