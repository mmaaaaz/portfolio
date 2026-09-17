/**
 * The work index.
 *
 * One source of truth for every entry: the row that appears in the ledger on the
 * home page, and the detail page behind it. Nothing here is invented — every
 * number is either from the project itself or from a case study in
 * src/content/case-studies.
 */

export type PlateNode = { k: string; v: string; signal?: boolean };
export type Plate = { caption: string; rows: PlateNode[][] };
export type Stat = { k: string; v: string };
export type WorkStatus = "live" | "research" | "archived";
export type WorkLink = { label: string; href: string };

export type WorkEntry = {
  slug: string;
  index: string;
  name: string;
  /** The one-line descriptor that sits in the ledger row. */
  kind: string;
  status: WorkStatus;
  /** The primary external link, when the thing is still reachable. */
  liveUrl?: string;
  host?: string;
  /** Any further public links, rendered on the detail page. */
  links: WorkLink[];
  stack: string[];
  role: string;
  timeline?: string;
  surface: string;
  thesis: string;
  problem: string;
  shipped: string[];
  plate: Plate;
  stats: Stat[];
  /** Matches an id in the case-studies content collection, when one exists. */
  caseStudyId?: string;
};

const STATUS_LABEL: Record<WorkStatus, string> = {
  live: "live",
  research: "research",
  archived: "archived",
};

export function statusLabel(status: WorkStatus): string {
  return STATUS_LABEL[status];
}

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

type Draft = Omit<WorkEntry, "index" | "host"> & { index?: string };

const DRAFTS: Draft[] = [
  {
    slug: "grip-eval",
    name: "GRIP-Benchmark-34",
    kind: "Geometric reasoning benchmark",
    status: "research",
    liveUrl: "https://grip-eval.pages.dev/",
    links: [{ label: "Open the benchmark", href: "https://grip-eval.pages.dev/" }],
    stack: ["Synthetic data generation", "Ground-truth validation", "TypeScript", "Cloudflare Pages"],
    role: "Researcher & engineer",
    timeline: "Ongoing",
    surface: "Benchmark construction + publishing",
    thesis:
      "A 600,000-question instrument for measuring geometric reasoning in multimodal models — 100,000 synthetic images across 34 independently validated sub-benchmarks.",
    problem:
      "Geometry is where vision models quietly fail, and the benchmarks in circulation tend to hide it: small samples, unlabelled difficulty, and ground truth that is never checked independently of the generator. There was no instrument with enough questions per category to say where a model breaks, and why.",
    shipped: [
      "500,000 closed questions at five difficulty levels, plus 100,000 open-ended questions over 100,000 synthetic images",
      "34 sub-benchmarks spanning 28 geometric and 6 physical reasoning categories, 3,000 images each",
      "Ground truth validated independently of the generator that produced the images",
      "Per-category mean difficulty published openly, so a score can be read against the difficulty of what was asked",
      "A public ledger with the full category tree, per-sample browsing and an open-model listing",
    ],
    plate: {
      caption: "Fig. 01 — Benchmark construction",
      rows: [
        [
          { k: "Generate", v: "100,000 images" },
          { k: "Validate", v: "Independent ground truth", signal: true },
          { k: "Author", v: "600,000 questions" },
          { k: "Publish", v: "Public, versioned" },
        ],
        [
          { k: "Closed", v: "500,000 · L1–L5" },
          { k: "Open-ended", v: "100,000" },
          { k: "Categories", v: "34 sub-benchmarks" },
          { k: "Per level", v: "100,000" },
        ],
      ],
    },
    stats: [
      { k: "Questions", v: "600,000" },
      { k: "Images", v: "100,000" },
      { k: "Sub-benchmarks", v: "34" },
      { k: "Difficulty levels", v: "L1–L5" },
    ],
  },

  {
    slug: "agi-eval-data",
    name: "AGI-Eval Data",
    kind: "Vision failure dataset",
    status: "research",
    liveUrl: "https://agi-eval-data.pages.dev/",
    links: [
      { label: "Open the ledger", href: "https://agi-eval-data.pages.dev/" },
      { label: "Source on GitHub", href: "https://github.com/mmaaaaz/agi-eval-data" },
    ],
    stack: ["Cloudflare Pages", "Dataset tooling", "TypeScript", "Checksum dedup"],
    role: "Researcher & engineer",
    timeline: "Ongoing",
    surface: "Dataset pipeline + public ledger",
    thesis:
      "A live ledger of the real-world images that break vision models — 55,969 unique pictures, syncing daily, with every duplicate accounted for.",
    problem:
      "Synthetic benchmarks measure what a model does with clean inputs. They say nothing about the ordinary photographs people actually upload. Nothing maintained a public record of where real-world vision fails, or of how much of a contributed dataset is duplicate material.",
    shipped: [
      "56,184 raw images reduced to 55,969 unique by md5 checksum, with all 215 duplicates logged rather than silently dropped",
      "Automated insights over orientation, resolution, file types and cameras across 21.8 GB of material",
      "A gallery with byte-level duplicate triage, so contributors can see exactly what was merged",
      "A contribution flow where people author the questions the dataset should be asking",
      "Metadata only — no dataset bytes are served from the public site",
    ],
    plate: {
      caption: "Fig. 02 — Dataset ledger",
      rows: [
        [
          { k: "Contribute", v: "7 contributors" },
          { k: "Scan", v: "Synced daily" },
          { k: "Dedupe", v: "md5 · first occurrence", signal: true },
          { k: "Publish", v: "Counts + insights" },
        ],
        [
          { k: "Raw", v: "56,184 images" },
          { k: "Unique", v: "55,969" },
          { k: "Duplicates", v: "215 logged" },
          { k: "Stored", v: "21.8 GB" },
        ],
      ],
    },
    stats: [
      { k: "Unique images", v: "55,969" },
      { k: "Duplicates pruned", v: "215" },
      { k: "Contributors", v: "7" },
      { k: "Stored", v: "21.8 GB" },
    ],
  },

  {
    slug: "askshu",
    name: "AskSHU",
    kind: "RAG chatbot",
    status: "live",
    liveUrl: "https://askshu.vercel.app",
    links: [{ label: "Open the chatbot", href: "https://askshu.vercel.app" }],
    stack: ["Cloudflare Workers", "Next.js 15", "TypeScript", "Vectorize", "D1", "LangChain"],
    role: "Solo developer",
    timeline: "2 weeks",
    surface: "Chat interface + edge pipeline",
    thesis:
      "An entire university, searchable in plain language. A retrieval-augmented chatbot that answers from real institutional content — or says it doesn't know.",
    problem:
      "Admission deadlines, fee structures and faculty contacts are buried across hundreds of pages and PDFs. Students were burning twenty minutes on questions that should take five seconds.",
    shipped: [
      "A Python crawler that walks 408 university pages and turns them into 2,500+ embedded chunks",
      "Retrieval on Cloudflare Vectorize, generation on Llama 3.3 70B — grounded in retrieved context, never invented",
      "Streaming responses, because time-to-first-token is what users actually feel",
      "The whole stack on the edge — Workers, D1, Vectorize, KV — running at zero monthly cost",
    ],
    plate: {
      caption: "Fig. 03 — Retrieval pipeline",
      rows: [
        [
          { k: "Input", v: "Student question" },
          { k: "Embed", v: "Query vector" },
          { k: "Retrieve", v: "Top 20 chunks", signal: true },
          { k: "Generate", v: "Llama 3.3 70B" },
          { k: "Stream", v: "Token by token" },
        ],
        [
          { k: "Crawl", v: "408 pages" },
          { k: "Index", v: "2,500+ chunks" },
          { k: "Store", v: "D1 · SQLite" },
          { k: "Sessions", v: "KV" },
          { k: "Cost", v: "$0 / month", signal: true },
        ],
      ],
    },
    stats: [
      { k: "Sources", v: "408 pages" },
      { k: "Index", v: "2,500+ chunks" },
      { k: "Time to first token", v: "<400 ms" },
      { k: "Monthly cost", v: "$0" },
    ],
    caseStudyId: "askshu",
  },

  {
    slug: "ahsanautos-pk",
    name: "AhsanAutos.pk",
    kind: "Headless storefront",
    status: "live",
    liveUrl: "https://ahsanautos.pk",
    links: [{ label: "Open the store", href: "https://ahsanautos.pk" }],
    stack: ["Next.js 16", "React 19", "Shopify Storefront API", "Tailwind CSS 4", "Jotai"],
    role: "Solo developer",
    timeline: "8 weeks",
    surface: "Headless commerce + payments",
    thesis:
      "An automotive storefront rebuilt headless and PKR-native, with cash and installment buying side by side on one catalogue.",
    problem:
      "BigCommerce billed the retailer in USD and read a PKR 150,000 motorcycle as $150,000 of revenue, auto-upgrading them onto a $50/month plan. It could not transact in PKR at all. This was the second headless rebuild of the same storefront.",
    shipped: [
      "Tag-driven dual payment modes — cash or installment — held in a Jotai store persisted to localStorage",
      "An installment calculator deriving monthly payments from configurable markup rates",
      "Shopify Storefront API behind a typed GraphQL client, so no backend stayed behind to maintain",
      "Survived WooCommerce → BigCommerce → WooCommerce → Shopify without the frontend noticing",
    ],
    plate: {
      caption: "Fig. 04 — Storefront architecture",
      rows: [
        [
          { k: "Client", v: "Next.js 16 RSC" },
          { k: "State", v: "Jotai atoms" },
          { k: "Data", v: "Typed GraphQL" },
          { k: "Commerce", v: "Storefront API" },
        ],
        [
          { k: "Mode A", v: "Cash" },
          { k: "Mode B", v: "Installment", signal: true },
          { k: "Currency", v: "PKR-native" },
          { k: "Checkout", v: "Shopify hosted" },
        ],
      ],
    },
    stats: [
      { k: "Payment modes", v: "2" },
      { k: "Currency", v: "PKR" },
      { k: "Headless rebuilds", v: "2" },
      { k: "Owned backend", v: "None" },
    ],
    caseStudyId: "ahsanautos-pk",
  },

  {
    slug: "shuff",
    name: "SHUFF",
    kind: "Festival site",
    status: "live",
    liveUrl: "https://filmfest.shu.edu.pk",
    links: [{ label: "Open the festival site", href: "https://filmfest.shu.edu.pk" }],
    stack: ["Next.js", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Three.js"],
    role: "Solo developer",
    surface: "Festival identity + submissions",
    thesis:
      "A cinematic site for a university film festival — 3D scenes, a live programme, and a submission flow filmmakers can finish without instructions.",
    problem:
      "A film festival has to feel like one online. Static brochure pages undersell the programme and turn submissions into paperwork.",
    shipped: [
      "Three.js hero scenes carrying the festival identity",
      "A programme built to be scanned on a phone in a dark theatre",
      "A submission pipeline filmmakers complete without reading instructions",
      "Framer Motion throughout, with a fully static reduced-motion baseline",
    ],
    plate: {
      caption: "Fig. 05 — Festival flow",
      rows: [
        [
          { k: "Scene", v: "Three.js hero" },
          { k: "Programme", v: "Screenings & schedule" },
          { k: "Submissions", v: "Filmmaker intake", signal: true },
          { k: "Line-up", v: "Published selection" },
        ],
        [
          { k: "Motion", v: "Framer Motion" },
          { k: "Fallback", v: "Static, reduced-motion" },
          { k: "Audience", v: "Filmmakers, attendees" },
        ],
      ],
    },
    stats: [
      { k: "Role", v: "Solo build" },
      { k: "Motion", v: "Three.js + Framer" },
      { k: "Audience", v: "Filmmakers" },
      { k: "Status", v: "Live" },
    ],
  },

  {
    slug: "zenmall-pk",
    name: "ZenMall.pk",
    kind: "E-commerce storefront",
    status: "archived",
    links: [],
    stack: ["Next.js 16", "React 19", "Shopify Storefront API", "Tailwind CSS 4", "Radix UI"],
    role: "Solo developer & designer",
    timeline: "3 months",
    surface: "Storefront system",
    thesis:
      "A production e-commerce storefront built solo in three months and tuned for mid-tier Android phones on 3G.",
    problem:
      "The client needed something that could compete with established Pakistani retailers — fast, mobile-first, and maintainable without an agency on retainer. The first Lighthouse run scored 54.",
    shipped: [
      "135+ reusable components over a headless Shopify architecture",
      "LCP pulled down from 5.9s with a prioritised hero and inlined critical CSS",
      "Layout shift taken from 1.0 to effectively zero with locked aspect ratios and skeleton loaders",
      "Optimistic cart mutations, so the interface never waits on the network",
    ],
    plate: {
      caption: "Fig. 06 — Commerce split",
      rows: [
        [
          { k: "Commerce", v: "Shopify — inventory, checkout" },
          { k: "Interface", v: "Next.js edge rendering" },
          { k: "Delivery", v: "Global CDN" },
        ],
        [
          { k: "Cart", v: "Optimistic, Jotai" },
          { k: "Analytics", v: "GA4 e-commerce" },
          { k: "Headers", v: "Strict CSP" },
          { k: "Cut", v: "Auth, reviews, custom checkout", signal: true },
        ],
      ],
    },
    stats: [
      { k: "Lighthouse", v: "54 → 85+" },
      { k: "Components", v: "135+" },
      { k: "Audience", v: "Mobile-first" },
      { k: "Shipped in", v: "3 months, solo" },
    ],
    caseStudyId: "zenmall-pk",
  },

  {
    slug: "smartinsure",
    name: "SmartInsure",
    kind: "Insurance comparison",
    status: "archived",
    links: [],
    stack: ["Next.js", "React", "Firebase", "SWR", "Tailwind CSS"],
    role: "Solo developer",
    surface: "Quote engine + provider listings",
    thesis:
      "A vehicle insurance comparison platform for the Pakistani market — bike and car quotes, provider listings, and a Firebase backend.",
    problem:
      "Comparing vehicle insurance in Pakistan meant ringing providers one at a time, or reading comparison pages that had gone stale. The client wanted one place to price a bike or a car and see who was offering what.",
    shipped: [
      "Structured quote forms covering bike and car insurance separately",
      "Provider listings with per-insurer detail and pricing",
      "Firebase for submissions and catalogue data, with SWR caching the provider list",
    ],
    plate: {
      caption: "Fig. 07 — Quote flow",
      rows: [
        [
          { k: "Cover", v: "Bike / Car" },
          { k: "Quote", v: "Structured form" },
          { k: "Compare", v: "Provider listings" },
          { k: "Outcome", v: "Client pivoted", signal: true },
        ],
      ],
    },
    stats: [
      { k: "Coverage", v: "Bike · Car" },
      { k: "Backend", v: "Firebase" },
      { k: "Role", v: "Solo build" },
      { k: "Outcome", v: "Retired" },
    ],
  },

  {
    slug: "cozmik-engineering",
    name: "Cozmik Engineering",
    kind: "Corporate site",
    status: "archived",
    links: [],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sass"],
    role: "Solo developer",
    surface: "Multi-page marketing site",
    thesis:
      "A multi-page corporate site for an engineering firm, built for search visibility and a responsive read on any screen.",
    problem:
      "The firm's work was invisible to search. They needed a credible multi-page presence that described their services clearly and ranked for the terms their clients were already typing.",
    shipped: [
      "A multi-page structure with a landing page per service",
      "On-page and technical SEO across every route",
      "A responsive layout system built to hold up on phones in the field",
      "Sass for a stylesheet the client's team could maintain",
    ],
    plate: {
      caption: "Fig. 08 — Site structure",
      rows: [
        [
          { k: "Structure", v: "Service pages" },
          { k: "Discoverability", v: "SEO · on-page", signal: true },
          { k: "Layout", v: "Responsive" },
          { k: "Styling", v: "Sass" },
        ],
      ],
    },
    stats: [
      { k: "Type", v: "Corporate site" },
      { k: "Focus", v: "Search visibility" },
      { k: "Role", v: "Solo build" },
      { k: "Outcome", v: "Retired" },
    ],
  },
];

/**
 * Held back from the build until the paper is public.
 *
 * Anything listed here is filtered out of `entries`, so it appears in no ledger
 * row, no sitemap entry, and gets no detail page generated. The editorial copy
 * below stays intact — delete a slug from this set to publish that entry.
 */
const UNPUBLISHED = new Set<string>(["grip-eval", "agi-eval-data"]);

export const entries: WorkEntry[] = DRAFTS.filter((draft) => !UNPUBLISHED.has(draft.slug)).map((draft, position) => ({
  ...draft,
  index: String(position + 1).padStart(2, "0"),
  host: draft.liveUrl ? hostOf(draft.liveUrl) : undefined,
}));

export function entryBySlug(slug: string): WorkEntry | undefined {
  return entries.find((entry) => entry.slug === slug);
}

export const capabilities: { label: string; items: string[] }[] = [
  {
    label: "Interface",
    items: ["React", "Next.js", "TypeScript", "Astro", "Tailwind CSS", "Framer Motion", "Design systems"],
  },
  {
    label: "Systems",
    items: ["Node.js", "Cloudflare Workers", "PostgreSQL", "D1", "KV", "REST", "GraphQL"],
  },
  {
    label: "AI / ML",
    items: [
      "RAG pipelines",
      "Vector search",
      "Multimodal evaluation",
      "Benchmark construction",
      "LangChain",
      "Workers AI",
    ],
  },
  {
    label: "Commerce",
    items: [
      "Shopify Storefront API",
      "BigCommerce",
      "Headless architecture",
      "Optimistic cart flows",
      "PKR / local payment rails",
    ],
  },
  {
    label: "Craft",
    items: ["Performance budgets", "Accessibility", "Core Web Vitals", "Dataset tooling", "Technical writing"],
  },
];

export const practice: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Decide in the open",
    body: "Trade-offs get written down instead of hidden. If something was cut from a build, the case study says so — and says why.",
  },
  {
    n: "02",
    title: "Ship the smallest honest version",
    body: "A live product with four real features beats a roadmap with twenty. Scope is a design decision, not a compromise.",
  },
  {
    n: "03",
    title: "Measure before claiming",
    body: "Load time, question counts, duplicate rates, cost per month. If a claim cannot be measured, it is an opinion, not an outcome.",
  },
];

export const currentFocus: string[] = [
  "Benchmarking where multimodal models actually fail",
  "Full-stack products that stay fast under real use",
  "AI features that remove work instead of adding noise",
  "Dataset tooling that stays honest about its own numbers",
];
