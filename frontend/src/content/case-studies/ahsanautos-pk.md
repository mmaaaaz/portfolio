---
title: "AhsanAutos.pk: Headless E-commerce Rebuild"
projectId: "project-2"
summary: "Second time building this automotive e-commerce site headless. Here's what happened with BigCommerce and why we're on Shopify now."
role: "Solo Developer"
timeline: "8 weeks (ongoing)"
stack: "Next.js 16, React 19, Shopify Storefront API, Tailwind CSS 4, Jotai"
liveUrl: "https://ahsanautos.pk"
images: []
---

## The History

This is the second time I'm building this site headless. Understanding why requires some context.

**Before 2022: WooCommerce**

When the client first approached me, the site was already running on WordPress/WooCommerce. Standard setup, worked fine, but slow and limited in what we could do with the UI.

**2022: Headless BigCommerce**

I built a headless version using BigCommerce's Storefront API with a custom Next.js frontend. The performance improvement was significant—faster load times, better UX, and impressions grew substantially.

Then BigCommerce's pricing became a problem.

BigCommerce charges based on sales volume, with automatic tier upgrades as your GMV increases. The issue: they calculate everything in USD. In Pakistan, a motorcycle costs around 150,000 PKR—roughly $500. But their system was reading it as $150,000 in sales.

A few orders like that and suddenly we're on the $40-50/month Pro plan. For a Pakistani retailer selling vehicles where margins are tight, that wasn't sustainable. Add to that: BigCommerce didn't actually support PKR as a transactional currency. No native payment gateways for the Pakistani market.

**2023: Back to WooCommerce**

The client moved back to WordPress/WooCommerce. Not because it was better, but because it was affordable and worked with local payment gateways.

**2024: Headless Shopify**

The client came back. This time they wanted Shopify as the backend—better PKR support, more payment gateway options, pricing that doesn't scale weirdly with high PKR values.

So I'm building it headless again. Second time.

---

## Current Architecture

```
Next.js 16 (React 19 Server Components)
    ↓
Jotai State Layer (cart, payment mode, UI)
    ↓
Shopify GraphQL Client
    ↓
Shopify Storefront API
```

Same pattern as before, different commerce backend.

---

## The Dual Payment Mode Thing

This client sells vehicles. Some customers pay cash, some want installment plans. Standard e-commerce platforms don't handle this cleanly.

My solution: products carry `installment` or `cash` tags. The frontend filters based on the active mode (stored in a Jotai atom, persisted to localStorage). For installments, there's an interactive calculator that derives monthly payments from configurable markup rates.

**Trade-off:** Tag-based filtering is less structured than metafields, but it's simpler for staff to manage.

---

## What's Different This Time

| Aspect | BigCommerce (2022) | Shopify (2024) |
|--------|-------------------|----------------|
| PKR support | None (USD only) | Native |
| Pricing model | Sales volume tiers | Fixed subscription |
| Local gateways | None | Multiple options |
| GraphQL API | Decent | Better documented |

Shopify's Storefront API is more mature now. The ecosystem is better. And critically, they don't inflate your bill because your currency has more zeros.

---

## Technical Choices

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 | RSCs stream content, minimal client JS |
| State | Jotai | Atomic updates, RSC-compatible |
| Styling | Tailwind CSS 4 + OKLCH | Perceptually uniform colors for dark mode |
| Commerce | Shopify Storefront API | PKR support, stable pricing |

OKLCH colors were a good call. Traditional HSL shifts perceived hue when you change lightness—reds drift pink in dark mode. OKLCH doesn't. Dark mode worked on the first try.

---

## Optimistic Cart

Same pattern as my other e-commerce builds:

1. User clicks "Add to Cart"
2. UI updates immediately
3. Server syncs in background
4. Rollback on failure

Shopify's API responds in ~200ms, which is fine for page loads but feels sluggish for cart actions. Optimistic updates fix that.

---

## Status

Currently in development. The site is still running on WooCommerce while I build out the Shopify version. Once it's ready, we'll migrate.

Hosting will be Vercel paid tier once live. After three versions of this project, I've learned that cutting corners on infrastructure costs more in debugging time than it saves in hosting bills.

---

## What I Learned (Three Versions Later)

**Platform pricing models matter.** BigCommerce's sales-volume pricing is designed for USD markets. It breaks badly when your currency has more digits.

**Headless isn't always the answer.** WooCommerce worked fine when "fine" was all the client needed. But when they wanted performance and custom UX, headless made sense.

**Some clients come back.** Building a good relationship matters more than any single project. This client came back because the first headless version worked well—they just needed a platform with better pricing.
