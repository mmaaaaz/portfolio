# Portfolio

My personal portfolio. Static frontend on Cloudflare Pages, serverless backend on Workers.

The site is an **index, not a showcase**: the home page lists every entry as a single row, and the architecture, numbers and write-up for each one live on its own page. See `DESIGN.md` for the design system and `PRODUCT.md` for the positioning.

## What I'm Using

**Frontend:** Astro + Tailwind CSS v4, self-hosted typefaces
**Backend:** Cloudflare Worker with KV storage
**Runtime:** Bun
**Deploy:** Cloudflare Pages for frontend, GitHub Actions for backend

## Why These Choices

### Astro
The frontend is HTML and CSS by default, with zero framework JavaScript. The only scripts that ship are the ones that do real work: the reveal observer, the labelled cursor, the Karachi clock, the scroll spy, and the visit counter. Everything else is static markup.

### Cloudflare Workers + KV
The visitor counter needs somewhere to live. Workers respond from every region and KV's eventual consistency is fine for a hit counter. If the API fails the page is unaffected — progressive enhancement.

### Tailwind CSS v4
v4's Vite integration needs no PostCSS config, and the CSS-first `@theme` block is where the whole design system lives. There is no `tailwind.config.mjs`.

### Self-hosted fonts
Inter Tight and Geist Mono are served from `/fonts` as woff2. That removes a third-party connection from the critical path and lets the Content-Security-Policy say `font-src 'self'`. Re-download them with `bun run fonts`.

### Bun
Faster installs and scripts, and it runs the Worker's TypeScript without an extra build step.

## Project Structure

```
portfolio/
├── frontend/
│   ├── scripts/
│   │   └── fetch-fonts.mjs     # Re-downloads the self-hosted typefaces
│   ├── public/
│   │   ├── _headers            # CSP, HSTS, caching — Cloudflare Pages reads this
│   │   ├── favicon.svg
│   │   └── fonts/              # latin + latin-ext woff2
│   ├── src/
│   │   ├── components/         # Nav, Hero, WorkIndex, Plate, EmailLink…
│   │   ├── content/            # Long-form case-study markdown
│   │   ├── data/
│   │   │   ├── profile.json
│   │   │   └── work.ts         # Single source of truth for every work entry
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   ├── 404.astro
│   │   │   └── work/[slug].astro   # One detail page per entry
│   │   └── styles/global.css   # Design tokens + @font-face + components
│   └── astro.config.mjs
│
├── backend/                    # Cloudflare Worker
│   ├── src/index.ts            # Visit counter API
│   └── wrangler.jsonc
│
└── .github/workflows/
    └── deploy-backend.yml      # Auto-deploy when backend/ changes
```

## Working on it

```bash
cd frontend
bun install
bun run dev        # astro dev
bun run verify     # astro check && astro build — run before pushing
bun run fonts      # re-download the self-hosted typefaces
```

## Content

Every work entry — its slug, row label, status, stack, architecture schematic, stats and editorial copy — is defined in `frontend/src/data/work.ts`. Adding an entry is one object in that array; the ledger row, the detail page and the sitemap entry all follow from it.

Long-form write-ups live in `frontend/src/content/case-studies/*.md` and are pulled in when an entry sets `caseStudyId`.

**Holding something back:** add its slug to `UNPUBLISHED` in `work.ts`. It then produces no row, no page and no sitemap URL, while its copy stays in the file — publishing is the removal of one string.

## Deployment

Frontend: connected to Cloudflare Pages via GitHub. Pushes to `main` trigger a rebuild.

Backend: deploys via GitHub Actions, and only when files in `backend/` change.

The canonical origin comes from `SITE_URL`, defaulting to `https://maazu.dev`. Set it in the Pages project environment if the domain changes — it feeds canonicals, Open Graph URLs, the sitemap and `robots.txt`.

Legacy `/case-study/<id>` URLs redirect to `/work/<slug>` (see `redirects` in `astro.config.mjs`), so old links keep working.
