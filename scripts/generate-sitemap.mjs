import { writeFileSync } from 'node:fs'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/seo-pages.ts', import.meta.url), 'utf8')
const baseUrl = 'https://shynlipostconstructioncleaning.com'
const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const extractStringArray = (start, end) => {
  const match = source.match(new RegExp(`${start} = \\[([\\s\\S]*?)\\]${end}`))
  if (!match) throw new Error(`Missing ${start}`)
  return [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1])
}

const extractTupleSlugs = (name) => {
  const match = source.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\] as const`))
  if (!match) throw new Error(`Missing ${name}`)
  return [...match[1].matchAll(/\['([^']+)'/g)].map((item) => item[1])
}

const cities = extractStringArray('export const cities', '\\n\\nexport const serviceModifiers')
const serviceSlugs = [...source.matchAll(/slug: '([^']+)'/g)].map((item) => item[1])
const core = extractTupleSlugs('corePages')
const intent = extractTupleSlugs('intentPages')
const project = extractTupleSlugs('projectPages')
const support = extractTupleSlugs('supportPages')

const paths = [
  '/',
  '/privacy-policy',
  '/terms-of-service',
  '/cancellation-policy',
  ...core.map((slug) => `/${slug}`),
  ...cities.map((city) => `/service-areas/${slugify(city)}`),
  ...cities.flatMap((city) => serviceSlugs.map((service) => `/service-areas/${slugify(city)}/${service}`)),
  ...intent.map((slug) => `/${slug}`),
  ...project.map((slug) => `/${slug}`),
  ...support.map((slug) => `/${slug}`),
]

if (paths.length !== 350) {
  throw new Error(`Expected 350 sitemap URLs, got ${paths.length}`)
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path === '/' ? '' : path}</loc>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.startsWith('/service-areas/') ? '0.7' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`Wrote ${paths.length} URLs to public/sitemap.xml`)
