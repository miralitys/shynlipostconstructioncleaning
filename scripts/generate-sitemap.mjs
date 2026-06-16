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

if (paths.length !== 356) {
  throw new Error(`Expected 356 sitemap URLs, got ${paths.length}`)
}

const uniquePaths = new Set(paths)
if (uniquePaths.size !== paths.length) {
  throw new Error(`Sitemap contains duplicate URLs: ${paths.length - uniquePaths.size} duplicates`)
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path === '/' ? '' : path}</loc>
    <changefreq>${path === '/' ? 'weekly' : path.startsWith('/guides') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path === '/guides' ? '0.8' : path.startsWith('/guides/') ? '0.7' : path.startsWith('/service-areas/') ? '0.7' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`Wrote ${paths.length} URLs to public/sitemap.xml`)
