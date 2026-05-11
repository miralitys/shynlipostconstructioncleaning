import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5190'
const quoteEndpoint = 'https://shynlicleaningservice.com/quote'
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname || '/')
const failures = []
const leadLinkDetails = []
const formDetails = []

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } })

async function gotoAndCollect(path) {
  const target = `${baseUrl}${path === '/' ? '' : path}`

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 15000 })
      await page.waitForTimeout(75)

      return await page.evaluate((endpoint) => {
        const isLeadText = (value) => /\b(request|quote|bid|estimate|project details|send project|start bid|quote request)\b/i.test(value)
        const anchors = [...document.querySelectorAll('a[href]')]
          .map((anchor) => ({
            text: anchor.textContent?.replace(/\s+/g, ' ').trim() ?? '',
            href: anchor.href,
          }))
          .filter((anchor) => isLeadText(anchor.text))
        const forms = [...document.querySelectorAll('form')].map((form) => {
          const fields = [...new FormData(form).keys()]
          return {
            action: form.action,
            method: form.method,
            fields,
            hasSubmit: Boolean(form.querySelector('button[type="submit"], input[type="submit"]')),
            turnoverDateType: form.querySelector('[name="turnover_date"]')?.getAttribute('type') ?? '',
            turnoverDatePlaceholder: form.querySelector('[name="turnover_date"]')?.getAttribute('placeholder') ?? '',
            turnoverDatePattern: form.querySelector('[name="turnover_date"]')?.getAttribute('pattern') ?? '',
            isQuoteForm: form.action.startsWith(endpoint),
          }
        })
        return { anchors, forms }
      }, quoteEndpoint)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const transient = message.includes('Execution context was destroyed') || message.includes('net::ERR_ABORTED')
      if (!transient || attempt === 3) throw error
    }
  }

  throw new Error(`Unable to audit ${path}`)
}

for (const path of paths) {
  const data = await gotoAndCollect(path)

  data.anchors.forEach((anchor) => {
    leadLinkDetails.push({ path, ...anchor })
    if (!anchor.href.startsWith(quoteEndpoint)) {
      failures.push(`${path}: lead CTA "${anchor.text}" points to ${anchor.href}`)
    }
  })

  data.forms.forEach((form) => {
    formDetails.push({ path, ...form })
    if (!form.action.startsWith(quoteEndpoint)) failures.push(`${path}: form action points to ${form.action}`)
    if (form.method.toLowerCase() !== 'get') failures.push(`${path}: form method is ${form.method}`)
    if (!form.hasSubmit) failures.push(`${path}: quote form missing submit button`)
    if (form.turnoverDateType !== 'text') failures.push(`${path}: turnover date should use text input for fixed US format`)
    if (form.turnoverDatePlaceholder !== 'MM/DD/YYYY') failures.push(`${path}: turnover date placeholder is ${form.turnoverDatePlaceholder}`)
    if (!form.turnoverDatePattern.includes('0[1-9]|1[0-2]')) failures.push(`${path}: turnover date pattern is not MM/DD/YYYY`)
    for (const field of ['service', 'source_page', 'landing_page_url']) {
      if (!form.fields.includes(field)) failures.push(`${path}: quote form missing ${field}`)
    }
  })
}

const formPage = formDetails[0]?.path
let submitUrl = ''
if (formPage) {
  await page.goto(`${baseUrl}${formPage === '/' ? '' : formPage}`, { waitUntil: 'domcontentloaded', timeout: 15000 })
  await page.locator('input[name="name"]').fill('QA Test')
  await page.locator('input[name="phone"]').fill('6308127077')
  await page.locator('input[name="zip"]').fill('60564')
  await page.locator('input[name="turnover_date"]').fill('05/31/2026')
  await page.locator('textarea[name="notes"]').fill('QA quote routing check')
  await Promise.all([
    page.waitForURL((url) => url.href.startsWith(quoteEndpoint), { waitUntil: 'commit', timeout: 15000 }),
    page.locator('button[type="submit"]').first().click(),
  ])
  submitUrl = page.url()
  if (!submitUrl.startsWith(quoteEndpoint)) failures.push(`form submit did not reach quote endpoint: ${submitUrl}`)
  for (const param of ['service', 'source_page', 'landing_page_url', 'zip', 'phone', 'turnover_date']) {
    if (!new URL(submitUrl).searchParams.has(param)) failures.push(`submitted quote URL missing ${param}`)
  }
  if (new URL(submitUrl).searchParams.get('turnover_date') !== '05/31/2026') {
    failures.push(`submitted turnover_date is not US MM/DD/YYYY: ${new URL(submitUrl).searchParams.get('turnover_date')}`)
  }
}

await browser.close()

const report = {
  generatedAt: new Date().toISOString(),
  checkedPages: paths.length,
  leadLinksChecked: leadLinkDetails.length,
  formsChecked: formDetails.length,
  submitUrl,
  failuresCount: failures.length,
  failures,
  leadLinkDetails,
  formDetails,
}

const reportDir = new URL('../screenshots/', import.meta.url)
mkdirSync(reportDir, { recursive: true })
writeFileSync(new URL('shiny-post-construction-quote-routing-2026-05-10.json', reportDir), JSON.stringify(report, null, 2))

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Quote routing audit passed for ${paths.length} pages.`)
console.log('Report: screenshots/shiny-post-construction-quote-routing-2026-05-10.json')
