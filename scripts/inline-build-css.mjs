import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')
const htmlPath = resolve(distDir, 'index.html')

if (!existsSync(htmlPath)) {
  throw new Error('dist/index.html was not found. Run this script after vite build.')
}

let html = readFileSync(htmlPath, 'utf8')
const stylesheetPattern = /<link rel="stylesheet" crossorigin href="\/assets\/([^"]+\.css)">/
const stylesheetMatch = html.match(stylesheetPattern)

if (!stylesheetMatch) {
  console.log('No build stylesheet link found to inline.')
  process.exit(0)
}

const cssPath = resolve(distDir, 'assets', stylesheetMatch[1])
if (!existsSync(cssPath)) {
  throw new Error(`Build stylesheet was referenced but not found: ${cssPath}`)
}

const css = readFileSync(cssPath, 'utf8').replaceAll('</style', '<\\/style')
html = html.replace(stylesheetPattern, `<style data-inlined-build-css>${css}</style>`)

const moduleScriptPattern = /<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/
const moduleScriptMatch = html.match(moduleScriptPattern)

if (moduleScriptMatch) {
  const appScriptSrc = moduleScriptMatch[1]
  const loader = `<script data-deferred-app-loader>
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
  if (window.location.pathname === '/') {
    window.addEventListener('pointerdown', load, { once: true });
    window.addEventListener('keydown', load, { once: true });
    window.setTimeout(load, 2500);
  } else {
    load();
  }
})();
</script>`

  html = html.replace(moduleScriptPattern, loader)
}

writeFileSync(htmlPath, html)
rmSync(cssPath)

console.log(`Inlined build CSS into dist/index.html and removed assets/${stylesheetMatch[1]}.`)
