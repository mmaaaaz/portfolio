# Portfolio Backend API

Cloudflare Worker for tracking visitor statistics using Workers KV.

## Setup

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Create KV namespace:**
   ```bash
   bun run create-kv
   ```
   
   This will output something like:
   ```
   { binding = "VISITOR_STATS", id = "abc123..." }
   ```

3. **Update wrangler.jsonc:**
   Replace `YOUR_KV_NAMESPACE_ID_HERE` with the `id` from the previous step.

## Development

Run locally with Wrangler dev server:
```bash
bun run dev
```

## Deployment

Deploy to Cloudflare Workers:
```bash
bun run deploy
```

After deployment, note the worker URL (e.g., `https://portfolio-api.YOUR_SUBDOMAIN.workers.dev`).

## API Endpoints

### POST `/`
Increments visitor count and returns statistics.

**Response:**
```json
{
  "success": true,
  "totalViews": 1234,
  "uniqueViews": 567,
  "todayUnique": 42
}
```

### GET `/`
Returns current visitor statistics without incrementing.

**Response:**
```json
{
  "success": true,
  "totalViews": 1234,
  "uniqueViews": 567,
  "todayUnique": 42
}
```

## Frontend Integration

Update your frontend's `VisitCounter.astro` to use the deployed worker URL:

```javascript
const response = await fetch("https://portfolio-api.YOUR_SUBDOMAIN.workers.dev", {
  method: "POST"
});
```

## Data Storage

Uses Cloudflare Workers KV with the following keys:

- `visitors:total` - Total page views (all time)
- `visitors:unique:total` - Total unique visitors (all time)
- `visitors:unique:YYYY-MM-DD:IP` - Daily unique visitor tracking (expires after 24h)
- `visitors:daily:YYYY-MM-DD` - Set of unique IPs for the day (expires after 7 days)
