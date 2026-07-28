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

/*
 * Раньше здесь у главной был особый случай: приложение подгружалось только
 * после keydown, pointerdown, pointermove, hashchange, scroll, touchstart
 * или wheel, а если ничего не происходило, то через 12 секунд.
 *
 * Проблема: главная НЕ пре-рендерится, в отличие от остальных 362 маршрутов.
 * В сыром HTML у неё только каркас, а Googlebot страницы отрисовывает, но не
 * кликает, не прокручивает и мышь не двигает. Замерено 2026-07-28: главная
 * отдавала 51 видимое слово, при том что /guides/ отдаёт 1082, а городские
 * страницы по 749. Таймаут в 12 секунд теоретически спасал, но краулер
 * столько не ждёт.
 *
 * Теперь главная грузится сразу, как все остальные страницы. На
 * пре-рендеренных маршрутах отложенная загрузка осталась (см.
 * prerender-static-routes.mjs) и там она безвредна: текст уже лежит в HTML,
 * скрипт нужен только для интерактивности.
 */
if (moduleScriptMatch) {
  const appScriptSrc = moduleScriptMatch[1]
  const loader = `<script data-deferred-app-loader>
(() => {
  const path = window.location.pathname;
  const lastSegment = path.split('/').pop() || '';
  if (path !== '/' && !path.endsWith('/') && !lastSegment.includes('.')) {
    window.location.replace(path + '/' + window.location.search + window.location.hash);
    return;
  }
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
  load();
})();
</script>`

  html = html.replace(moduleScriptPattern, loader)
}

writeFileSync(htmlPath, html)
rmSync(cssPath)

console.log(`Inlined build CSS into dist/index.html and removed assets/${stylesheetMatch[1]}.`)
