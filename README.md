# mz__ Portfolio

A personal developer portfolio built to showcase my work, skills, and projects in a clean, brutalist style.

## Live Demo
https://mmaaaaz.github.io/portfolio

## Features
- Minimal brutalist design with a strong, monochrome look  
- Smooth scrolling and subtle animations  
- Custom desktop cursor  
- Fully responsive layout  
- Fast performance  
- Simple JSON-based project management  
- Visit counter powered by Upstash Redis  
- Grayscale dark mode

## Tech Stack
- Astro  
- TailwindCSS v4  
- Lenis  
- Bun  
- Upstash Redis
- Cloudflare Pages (Hosting & Serverless)

## Installation

```bash
git clone https://github.com/mmaaaaz/portfolio.git
cd portfolio
bun install
# Set up environment variables (.env) for Upstash Redis if running locally
bun run dev
```

## Deployment

Deploy to **Cloudflare Pages**:
1. Connect your GitHub repository.
2. Select **Framework Preset**: `Astro`.
3. Add environment variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Deploy!

