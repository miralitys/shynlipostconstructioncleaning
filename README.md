# shynlipostconstructioncleaning.com

Standalone shadcn/Vite website for `shynlipostconstructioncleaning.com`.

Brand: `Shynli Post-Construction Cleaning`.

Production repo: `https://github.com/miralitys/shynlipostconstructioncleaning.git`.
Hosting: Render Static Site.

## Design Inputs

- Construction-closeout positioning from ClearSite and Imperial Site Services.
- Quote form and trust-first conversion pattern from Post Construction Cleaners and Finish Cleaning Service.
- Scope/checklist emphasis for SEO and AI extraction.

## Run

```bash
npm install
npm run dev
```

## Render

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Custom domain: `shynlipostconstructioncleaning.com`
- Static SEO routes are prerendered into directory `index.html` files.
- Render redirects clean URLs without a trailing slash to their matching slash URL before the SPA fallback.
- SPA fallback: Render rewrite `/*` to `/index.html` for any route that does not have a static resource.

## Notes

- Sitemap contains 350 production SEO URLs.
- Robots file points Google to `https://shynlipostconstructioncleaning.com/sitemap.xml`.
- Heavy debris, hazardous cleanup, dumpsters, and construction waste hauling are intentionally not promised.

## Project Notes

- Production brand: `Shynli Post-Construction Cleaning`
- Lead endpoint: `https://shynlicleaningservice.com/quote`
- Sitemap: `https://shynlipostconstructioncleaning.com/sitemap.xml`
