# Portfolio - Deployment Guide

This portfolio is split into two separate deployments:

1. **Frontend**: Static Astro site (Cloudflare Pages)
2. **Backend**: Visitor counter API (Cloudflare Workers + KV)

## Quick Start

### 1. Deploy Backend First

```bash
cd backend
bun install
bun run create-kv
```

Copy the KV namespace ID from the output and update `backend/wrangler.jsonc`:
```json
"id": "YOUR_ACTUAL_KV_NAMESPACE_ID"
```

Then deploy:
```bash
bun run deploy
```

Note the deployed Worker URL (e.g., `https://portfolio-api.YOUR_SUBDOMAIN.workers.dev`)

### 2. Configure Frontend

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Update `.env` with your backend API URL:
```
PUBLIC_API_URL=https://portfolio-api.YOUR_SUBDOMAIN.workers.dev
```

### 3. Deploy Frontend

```bash
cd ..  # back to root
bun install
bun astro build
wrangler pages deploy dist --project-name=portfolio
```

## Development

### Backend Development
```bash
cd backend
bun run dev
```

### Frontend Development
```bash
bun astro dev
```

Update your `.env` to point to localhost during development:
```
PUBLIC_API_URL=http://localhost:8787
```

## Repository Structure

```
portfolio/
├── backend/              # Cloudflare Worker for visitor counter
│   ├── src/
│   │   └── index.ts     # Worker code with KV integration
│   ├── wrangler.jsonc   # Worker configuration
│   └── package.json
├── src/                 # Astro frontend source
│   ├── components/
│   │   └── VisitCounter.astro
│   └── ...
├── astro.config.mjs     # Astro config (static output)
├── wrangler.jsonc       # Frontend deployment config
└── .env                 # Frontend environment variables
```

## Key Changes from Previous Setup

- ✅ **Removed**: Upstash Redis dependency
- ✅ **Removed**: Cloudflare adapter from Astro
- ✅ **Removed**: Functions directory (Cloudflare Pages functions)
- ✅ **Added**: Standalone backend worker with KV storage
- ✅ **Changed**: Frontend is now fully static

## Troubleshooting

**Visit counter not working?**
- Verify backend is deployed and accessible
- Check `.env` has correct `PUBLIC_API_URL`
- Rebuild frontend after changing `.env`
- Check browser console for CORS or network errors

**KV showing 0 visits?**
- KV data persists across deployments
- If you created a new namespace, it starts at 0
- You can manually set values in Cloudflare dashboard
