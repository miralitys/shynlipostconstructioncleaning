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
const paths = publicRoutes
const sitemapPaths = paths.map((path) => {
  if (path === '/') return ''
  return path.endsWith('/') ? path : `${path}/`
})

if (paths.length !== 361) {
  throw new Error(`Expected 361 sitemap URLs, got ${paths.length}`)
}

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
