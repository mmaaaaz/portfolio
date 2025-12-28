---
title: "ZenMall.pk: E-commerce Platform"
projectId: "project-3"
summary: "A headless Shopify storefront built solo over 3 months while balancing university. Production-grade e-commerce without the agency price tag."
role: "Solo Developer & Designer"
timeline: "3 months"
stack: "Next.js 16, React 19, Shopify Storefront API, Tailwind CSS"
liveUrl: "https://zenmall.pk"
images: []
---

## The Project

A client needed a proper e-commerce storefront—not a template, but something that could actually compete with established Pakistani retailers. They wanted fast, mobile-first, and maintainable without needing a dev on retainer.

I built ZenMall.pk over about 3 months, solo. Took longer than usual because I was also in my 7th semester, juggling coursework and FYP deadlines. But it's done—a headless Shopify frontend with a custom UI, optimized for the Pakistani market where most users are on mid-tier Android phones with inconsistent connectivity.

---

## Architecture

The split is simple:

- **Shopify** handles inventory, checkout, and payments
- **Next.js** handles the storefront UI and performance

This setup eliminates 80% of backend complexity. I didn't build inventory tracking, payment processing, or order management—Shopify's battle-tested systems handle that. I focused entirely on the customer experience.

**Trade-off:** Checkout happens on Shopify's hosted page, so I can't customize that flow. For a standard e-commerce operation, that's fine.

---

## Tech Decisions

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 16 | Server components, streaming, Turbopack |
| State | Jotai | Atomic, persisted cart state |
| Styling | Tailwind CSS 4 | Fast iteration |
| Commerce | Shopify Storefront API | Proven, typed, no extra cost |
| UI | Radix + ShadCN | Accessible primitives |
| Hosting | Vercel (paid tier) | Global edge, reliable |

The Vercel paid tier was worth it for a production store—better reliability and no cold start worries.

---

## Performance

Initial Lighthouse was around 54. Not acceptable.

| Problem | Fix |
|---------|-----|
| LCP 5.9s | Hero image preloading with `fetchPriority="high"` |
| CLS 1.0 | Aspect ratios + skeleton loaders |
| Render blocking | Critical CSS inlined, fonts with `display: swap` |

Final score: 85-95 range. On the 3G connections common in Pakistan, that difference is noticeable.

---

## Scope

**Built:**
- 135+ reusable components
- Full Shopify API integration (products, collections, cart)
- Mobile-first responsive design
- GA4 e-commerce tracking
- Strict CSP headers

**Cut:**
- Custom auth (use Shopify's)
- Review system (deferred)
- Real-time inventory (webhook revalidation instead)
- Custom checkout

Every cut reduced surface area for bugs. Shipping faster mattered more than feature completeness.

---

## Optimistic UI

Traditional cart flow: click → spinner → wait for API → update.

I flipped it with React 19's `useOptimistic`:

1. User clicks "Add to Cart"
2. UI updates instantly
3. Server syncs in background
4. Auto-revert on failure

That perceived-instant response had more impact than any bundle optimization I did.

---

## Outcome

Three months, one developer (part-time between classes), production-ready storefront. The client has a site that performs well on Pakistani connections, looks professional, and runs on infrastructure they don't have to manage.

Cost: Vercel paid tier + Shopify subscription. No backend servers, no database maintenance, no DevOps overhead.
