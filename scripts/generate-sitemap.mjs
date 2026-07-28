import { readFileSync, writeFileSync } from 'node:fs'
import ts from 'typescript'

const source = readFileSync(new URL('../src/seo-pages.ts', import.meta.url), 'utf8')
const baseUrl = 'https://shynlipostconstructioncleaning.com'

const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText

const { publicRoutes } = await import(`data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`)

/*
 * Связки «город + услуга» (/service-areas/{город}/{услуга}) в карту сайта
 * НЕ попадают.
 *
 * С 2026-07-28 они сведены каноникалом на городскую страницу (см.
 * prerender-static-routes.mjs, canonicalPathFor). Держать неканоническую
 * страницу в sitemap значит посылать поиску два противоречивых сигнала:
 * карта говорит «индексируй меня», каноникал говорит «индексируй другую».
 *
 * Второй довод: в Search Console на 2026-07-28 висело 140 страниц
 * «обнаружена, не проиндексирована», то есть краулинговый бюджет и так
 * исчерпан. Убрав 210 неканонических адресов, освобождаем его для
 * страниц, которые действительно должны попасть в индекс.
 *
 * Сами страницы остаются доступными по прямым ссылкам и по внутренней
 * перелинковке, из карты убран только сигнал на индексацию.
 */
const isCityServiceCombo = (path) => {
  const segments = path.split('/').filter(Boolean)
  return segments[0] === 'service-areas' && segments.length >= 3
}

const paths = publicRoutes.filter((path) => !isCityServiceCombo(path))
const excluded = publicRoutes.length - paths.length
const sitemapPaths = paths.map((path) => {
  if (path === '/') return ''
  return path.endsWith('/') ? path : `${path}/`
})

if (publicRoutes.length !== 366) {
  throw new Error(`Expected 366 public routes, got ${publicRoutes.length}`)
}

console.log(`Sitemap: ${paths.length} URLs (${excluded} city+service combos excluded as non-canonical).`)

const uniquePaths = new Set(sitemapPaths)
if (uniquePaths.size !== sitemapPaths.length) {
  throw new Error(`Sitemap contains duplicate URLs: ${sitemapPaths.length - uniquePaths.size} duplicates`)
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map(
    (path) => {
      const routePath = path || '/'
      return `  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>${routePath === '/' ? 'weekly' : routePath.startsWith('/guides') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${routePath === '/' ? '1.0' : routePath === '/guides/' ? '0.8' : routePath.startsWith('/guides/') ? '0.7' : routePath.startsWith('/service-areas/') ? '0.7' : '0.8'}</priority>
  </url>`
    },
  )
  .join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`Wrote ${paths.length} URLs to public/sitemap.xml`)
