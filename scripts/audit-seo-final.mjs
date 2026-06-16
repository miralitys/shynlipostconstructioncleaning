import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5190'
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname || '/')
const uniqueUrls = new Set(urls)
const bannedVisibleText = [
  'prototype',
  'placeholder',
  'lorem',
  'todo',
  'competitor',
  'seo asset',
  'technical text',
  'clearphase',
]

const failures = []
const stats = {
  checked: 0,
  minWords: Infinity,
  maxWords: 0,
  minNonLegalWords: Infinity,
  maxNonLegalWords: 0,
  minSeoLandingWords: Infinity,
  maxSeoLandingWords: 0,
  minInternalLinks: Infinity,
  maxInternalLinks: 0,
}

if (urls.length !== 356) failures.push(`Sitemap should contain 356 URLs, found ${urls.length}`)
if (uniqueUrls.size !== urls.length) failures.push('Sitemap contains duplicate URLs')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } })

for (const path of urls) {
  const target = `${baseUrl}${path === '/' ? '' : path}`
  const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 15000 })
  if (!response || response.status() >= 400) {
    failures.push(`${path}: route returned ${response?.status() ?? 'no response'}`)
    continue
  }

  if (path === '/') {
    await page.mouse.wheel(0, 600)
  }

  await page.waitForFunction(
    () =>
      document.querySelector('h1') &&
      document.querySelector('script[type="application/ld+json"]') &&
      document.body.innerText.trim().split(/\s+/).length > 50,
    { timeout: 10000 },
  )

  const data = await page.evaluate(() => {
    const bodyText = document.body.innerText.replace(/\s+/g, ' ').trim()
    const internalLinks = [...document.querySelectorAll('a[href]')]
      .map((link) => link.getAttribute('href') ?? '')
      .filter((href) => href.startsWith('/') || href.startsWith('#'))
    return {
      title: document.title,
      h1Count: document.querySelectorAll('h1').length,
      h1: document.querySelector('h1')?.textContent?.trim() ?? '',
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      schemaCount: document.querySelectorAll('script[type="application/ld+json"]').length,
      text: bodyText.toLowerCase(),
      wordCount: bodyText.split(/\s+/).filter(Boolean).length,
      internalLinkCount: new Set(internalLinks).size,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }
  })

  if (data.h1Count !== 1) failures.push(`${path}: expected exactly one H1, found ${data.h1Count}`)
  if (data.title.length < 35 || data.title.length > 90) failures.push(`${path}: title length is ${data.title.length}`)
  if (data.description.length < 120 || data.description.length > 180) {
    failures.push(`${path}: meta description length is ${data.description.length}`)
  }
  const expectedCanonical = `https://shynlipostconstructioncleaning.com${path === '/' ? '' : path}`
  if (data.canonical !== expectedCanonical) failures.push(`${path}: canonical mismatch`)
  if (data.schemaCount < 1) failures.push(`${path}: missing JSON-LD schema`)
  const isLegal = path.includes('policy') || path.includes('terms')
  if (path !== '/' && !isLegal && data.wordCount < 650) {
    failures.push(`${path}: thin page risk, only ${data.wordCount} visible words`)
  }
  if (path !== '/' && data.internalLinkCount < 10) failures.push(`${path}: weak internal linking, ${data.internalLinkCount} internal links`)
  if (!data.text.includes('request') && !data.text.includes('quote') && !data.text.includes('bid')) {
    failures.push(`${path}: missing commercial quote language`)
  }
  for (const phrase of bannedVisibleText) {
    if (data.text.includes(phrase)) failures.push(`${path}: contains banned visible text "${phrase}"`)
  }
  if (data.scrollWidth > data.clientWidth + 2) {
    failures.push(`${path}: horizontal overflow ${data.scrollWidth}px > ${data.clientWidth}px`)
  }

  stats.checked += 1
  stats.minWords = Math.min(stats.minWords, data.wordCount)
  stats.maxWords = Math.max(stats.maxWords, data.wordCount)
  if (!isLegal) {
    stats.minNonLegalWords = Math.min(stats.minNonLegalWords, data.wordCount)
    stats.maxNonLegalWords = Math.max(stats.maxNonLegalWords, data.wordCount)
  }
  if (path !== '/' && !isLegal) {
    stats.minSeoLandingWords = Math.min(stats.minSeoLandingWords, data.wordCount)
    stats.maxSeoLandingWords = Math.max(stats.maxSeoLandingWords, data.wordCount)
  }
  stats.minInternalLinks = Math.min(stats.minInternalLinks, data.internalLinkCount)
  stats.maxInternalLinks = Math.max(stats.maxInternalLinks, data.internalLinkCount)
}

await browser.close()

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  sitemapUrls: urls.length,
  uniqueSitemapUrls: uniqueUrls.size,
  failuresCount: failures.length,
  failures,
  stats,
}

const reportDir = new URL('../screenshots/', import.meta.url)
mkdirSync(reportDir, { recursive: true })
writeFileSync(new URL('shynli-post-construction-final-seo-audit-2026-05-10.json', reportDir), JSON.stringify(report, null, 2))

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Final SEO audit passed for ${urls.length} sitemap URLs.`)
console.log(`Report: screenshots/shynli-post-construction-final-seo-audit-2026-05-10.json`)
