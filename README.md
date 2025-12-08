# Portfolio

My personal portfolio. Static frontend on Cloudflare Pages, serverless backend on Workers.

## What I'm Using

**Frontend:** Astro + Tailwind CSS v4  
**Backend:** Cloudflare Worker with KV storage  
**Runtime:** Bun  
**Deploy:** GitHub Actions for backend, Cloudflare Pages for frontend

## Why These Choices

### Astro
I wanted a portfolio that's just HTML and CSS by default. No React hydration tax, no framework overhead. Astro lets me write components but ships zero JavaScript unless I explicitly need it. The visit counter is the only interactive piece, and it loads separately without blocking anything.

### Cloudflare Workers + KV
I needed somewhere to track visitor stats. Initially considered serverless functions on other platforms, but Workers are distributed globally and respond in <50ms from anywhere. KV is eventually consistent, which is fine for a visitor counter—I don't need real-time accuracy.

### Tailwind CSS v4
I've been using Tailwind for a while, but v4's Vite integration is cleaner—no PostCSS config needed. The cascade layers syntax is also nicer to work with. It's familiar, fast, and I didn't want to spend time writing custom CSS for something this simple.

### Static + API Split
The frontend is pure static files—no server rendering, no edge functions for pages. This means instant loads from Cloudflare's CDN. The visitor counter hits the Worker API asynchronously after the page is already visible.

If the API fails, the site still works perfectly. Progressive enhancement, basically.

### Bun
Faster than npm/yarn for installs and scripts. It also handles TypeScript natively, so no extra build step for the Worker. Honestly, it's just nice to use—things feel snappier.

## Project Structure

```
portfolio/
├── frontend/              # Static Astro site
│   ├── src/
│   │   ├── components/       # Header, Hero, ProjectCard, etc.
│   │   ├── data/             # JSON files (profile, projects)
│   │   ├── layouts/          # Base layout
│   │   ├── pages/            # Routes (index, 404, sitemap)
│   │   └── styles/           # Global CSS
│   └── astro.config.mjs
│
├── backend/               # Cloudflare Worker
│   ├── src/index.ts          # Visit counter API
│   └── wrangler.jsonc        # Worker config
│
└── .github/workflows/
    └── deploy-backend.yml    # Auto-deploy when backend/ changes
```

## Deployment

Frontend is connected to Cloudflare Pages via GitHub—pushes to `main` trigger automatic rebuilds.

Backend deploys via GitHub Actions, but only when files in `backend/` change. No point re-deploying the Worker if I just tweaked a style.

---
