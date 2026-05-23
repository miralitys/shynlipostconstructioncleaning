import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const rootDir = process.cwd()
const distDir = resolve(rootDir, 'dist')
const sitemap = readFileSync(resolve(rootDir, 'public/sitemap.xml'), 'utf8')
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname || '/')
const innerPaths = paths.filter((path) => path !== '/')
const port = 5187
const baseUrl = `http://127.0.0.1:${port}`

if (!existsSync(resolve(distDir, 'index.html'))) {
  throw new Error('dist/index.html was not found. Run this script after vite build and CSS inlining.')
}

function waitForServer(processRef) {
  return new Promise((resolveReady, reject) => {
    let output = ''
    const timer = setTimeout(() => {
      reject(new Error(`Timed out waiting for vite preview. Output:\n${output}`))
    }, 20000)

    const onData = (chunk) => {
      output += chunk.toString()
      if (output.includes(`http://127.0.0.1:${port}`) || output.includes(`127.0.0.1:${port}`)) {
        clearTimeout(timer)
        resolveReady()
      }
    }

    processRef.stdout.on('data', onData)
    processRef.stderr.on('data', onData)
    processRef.on('exit', (code) => {
      clearTimeout(timer)
      reject(new Error(`vite preview exited before it was ready with code ${code}. Output:\n${output}`))
    })
  })
}

function routeHtmlPath(path) {
  return resolve(distDir, path.replace(/^\//, ''), 'index.html')
}

function routeCleanHtmlPath(path) {
  return resolve(distDir, `${path.replace(/^\//, '')}.html`)
}

function addDeferredLoader(html, appScriptSrc) {
  const escapedSrc = JSON.stringify(appScriptSrc)
  const loader = `<script data-deferred-app-loader>
(() => {
  const src = ${escapedSrc};
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
  window.setTimeout(load, 12000);
})();
</script>`

  return html.replace('</head>', `${loader}\n</head>`)
}

const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8')
const appScriptMatch = indexHtml.match(/const src = "([^"]+\/assets\/index-[^"]+\.js)"|const src = "(\/assets\/index-[^"]+\.js)"/)
const appScriptSrc = appScriptMatch?.[1] ?? appScriptMatch?.[2]

if (!appScriptSrc) {
  throw new Error('Could not find built app script source in dist/index.html.')
}

const preview = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: rootDir,
  stdio: ['ignore', 'pipe', 'pipe'],
})

try {
  await waitForServer(preview)

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } })

  for (const path of innerPaths) {
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: 20000 })
    await page.waitForFunction(
      () =>
        document.querySelector('h1') &&
        document.querySelector('script[type="application/ld+json"]') &&
        document.body.innerText.trim().split(/\s+/).length > 100,
      { timeout: 10000 },
    )

    const html = await page.evaluate(() => {
      document.querySelectorAll('script[src*="/assets/index-"], script[src*="/assets/seo-pages-"]').forEach((script) => script.remove())
      document.querySelectorAll('script[data-deferred-app-loader]').forEach((script) => script.remove())
      document.querySelectorAll('link[rel="modulepreload"]').forEach((link) => link.remove())
      document.querySelectorAll('link[rel="preload"][as="image"]').forEach((link) => link.remove())
      document.querySelectorAll('[data-vite-dev-id]').forEach((node) => node.removeAttribute('data-vite-dev-id'))
      return `<!doctype html>\n${document.documentElement.outerHTML}`
    })

    const finalHtml = addDeferredLoader(html, appScriptSrc)
    const targetPath = routeHtmlPath(path)
    const cleanTargetPath = routeCleanHtmlPath(path)
    mkdirSync(dirname(targetPath), { recursive: true })
    mkdirSync(dirname(cleanTargetPath), { recursive: true })
    writeFileSync(targetPath, finalHtml)
    writeFileSync(cleanTargetPath, finalHtml)
  }

  await browser.close()
  console.log(`Prerendered ${innerPaths.length} inner routes into dist/.`)
} finally {
  preview.kill('SIGTERM')
}
