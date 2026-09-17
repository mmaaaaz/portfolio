---
name: "Muhammad Maaz Uddin Portfolio"
description: "The Ledger — a dark, index-first portfolio that presents shipped engineering work as a typeset document: ordinals, schematics, measured claims."
colors:
  paper: "#0a0a0b"
  paper-2: "#0e0e11"
  paper-3: "#15151a"
  rule: "#212128"
  rule-strong: "#33333d"
  ink: "#f0ebe4"
  ink-2: "#a8a29b"
  ink-3: "#75706a"
  ink-4: "#4e4a46"
  ember: "oklch(0.715 0.152 47)"
  ember-deep: "oklch(0.6 0.14 45)"
  ember-veil: "oklch(0.28 0.055 47)"
  bone-ground: "#f0ebe4"
  bone-ink: "#14140f"
  bone-rule: "#cfc7bc"
  bone-dim: "#6d6862"
typography:
  display:
    fontFamily: "Inter Tight, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.3rem, 5.1vw, 4.4rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.042em"
  headline:
    fontFamily: "Inter Tight, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.7rem, 3.1vw, 2.7rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.034em"
  title:
    fontFamily: "Inter Tight, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)"
    fontWeight: 550
    lineHeight: 1.16
    letterSpacing: "-0.024em"
  lead:
    fontFamily: "Inter Tight, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.03rem, 1.25vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Inter Tight, Inter, ui-sans-serif, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 450
    letterSpacing: "0.15em"
  label-xs:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    letterSpacing: "0.18em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 3.5rem)"
  section: "clamp(4.25rem, 6.5vw, 6.5rem)"
  hero-gap-mobile: "2.75rem"
  hero-gap-desktop: "3.5rem 4rem"
  measure: "1320px"
motion:
  ease-out-quint: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-in-out-quart: "cubic-bezier(0.76, 0, 0.24, 1)"
  reveal: "950ms"
  schematic-tick: "600ms"
  hover: "380–550ms"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    minHeight: "54px"
  button-primary-hover:
    backgroundColor: "{colors.ember}"
    textColor: "#0a0a0b"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    border: "1px solid {colors.rule-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  schematic-node:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    border: "1px solid {colors.rule}"
    rounded: "{rounded.none}"
  schematic-node-signal:
    backgroundColor: "{colors.paper-3}"
    textColor: "{colors.ink}"
    marker: "{colors.ember}"
  stat-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.rule}"
  spec-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    border: "1px solid {colors.rule}"
    gridTemplateColumns: "5rem minmax(0, 1fr)"
  ledger-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    border: "1px solid {colors.rule}"
    gridTemplateColumns: "2.5rem minmax(0, 1.1fr) minmax(0, 0.9fr) minmax(0, 1.1fr) auto 1rem"
    hoverMarker: "{colors.ember}"
  navigation:
    backgroundColor: "color-mix(in oklab, {colors.paper} 76%, transparent)"
    textColor: "{colors.ink-3}"
    typography: "{typography.label}"
    height: "64px"
---

# Design System: Muhammad Maaz Uddin Portfolio

## Overview

**Creative North Star: "The Ledger"**

The site presents itself as a live engineering ledger: numbered, indexed, precise, and honest about what was cut. It is a typeset document about machines — not terminal cosplay, and not a card grid.

Three ideas carry it. **Structure is visible**: two hairlines run the full height of the page at the content boundary, every section is numbered, and every project carries an ordinal. **Claims are measured**: a schematic of the real architecture, a strip of real numbers, and an explicit list of what was deliberately not built. **Restraint is the signal**: one ember accent on a warm near-black, mono only where data lives, and no radius anywhere.

The register is cold, confident, and calm. Weight does the work instead of volume: display type is medium-weight Inter Tight at 0.94 leading, not 900-weight uppercase. When something on the page is loud, it is the only loud thing.

**Key Characteristics:**

- Warm obsidian paper, never `#000`; bone ink, never `#fff`.
- One ember accent, spent on status, ordinals, live markers, and the terminal hover.
- A visible structural spine: continuous hairlines, section ordinals, ledger rows.
- Architecture schematics as the signature artifact of every project entry.
- One fully inverted bone block (contact) that ends the page with a register change.
- Every effect has a static baseline: no-JS and reduced-motion both render the complete page.

## Colors

The palette is one family of warm neutrals plus a single warm signal. Nothing else is allowed on the page.

### Primary

- **Ember** (`oklch(0.715 0.152 47)`): the only chromatic colour. Live status dots, active ordinals, the index bar on hover, the primary button's hover fill, ordered-list markers.
- **Ember Deep** (`oklch(0.6 0.14 45)`): pressed and inverted-ground companion; used for the contact email hover.
- **Ember Veil** (`oklch(0.28 0.055 47)`): reserved for tinted accents on dark surfaces.

### Neutral

- **Paper** (`#0a0a0b`): page ground.
- **Paper 2** (`#0e0e11`): schematic node fill.
- **Paper 3** (`#15151a`): signal node fill and inline code.
- **Rule** (`#212128`): default hairlines, cell dividers.
- **Rule Strong** (`#33333d`): control borders, the structural spine, schematic ticks.
- **Ink** (`#f0ebe4`): primary text, primary button fill, focus ring on dark ground.
- **Ink 2** (`#a8a29b`): body copy and readable metadata.
- **Ink 3** (`#75706a`): micro labels, mono data, hero eyebrow.
- **Ink 4** (`#4e4a46`): ordinals, captions, the hairline-tier metadata that must never carry meaning alone.

### Inverted ground

- **Bone Ground** (`#f0ebe4`) with **Bone Ink** (`#14140f`), **Bone Rule** (`#cfc7bc`), and **Bone Dim** (`#6d6862`). The contact block only. Focus rings inside it switch to `#14140f`.

### Named Rules

**The One Signal Rule.** Ember marks one of four things: live status, an active ordinal, an interactive affordance on hover, or the primary action. It is never a background wash, never decorative, and never appears twice in the same visual cluster.

**The Warm Ground Rule.** No pure black, no pure white, at any scale. The ground carries a trace of red; the light carries a trace of yellow. This is what separates the page from a default dark theme.

**The Inverted-Once Rule.** The bone ground appears exactly once, at the end. A second inversion would make it a theme instead of an ending.

## Typography

**Display Font:** Inter Tight (variable, self-hosted, with `Inter`, `ui-sans-serif`, `-apple-system`, and `sans-serif` fallbacks)

**Body Font:** Inter Tight

**Label/Mono Font:** Geist Mono (with `ui-monospace`, `SFMono-Regular`, and `Menlo` fallbacks)

**Character:** Inter Tight at medium weight carries the argument. Its tight tracking (`-0.042em` at display scale) reads as engineered rather than shouted, which is why display type sits at weight **500**, not 900. Geist Mono is the instrumentation layer: it holds every ordinal, status, unit, stack list, schematic label, and stat key. It is never used for sentences and never used as a shorthand for technical credibility.

### Hierarchy

- **Display** (`clamp(2.3rem, 5.1vw, 4.4rem)`, 500, `0.94`, `-0.042em`): the hero statement. Composed to break into exactly two lines at every breakpoint from 360px up. `text-wrap: balance`.
- **Headline** (`clamp(1.7rem, 3.1vw, 2.7rem)`, 500, `1.04`): section headings, one per section, 7 of 12 columns.
- **Title** (`clamp(1.1rem, 1.6vw, 1.45rem)`, 550, `1.16`): project names, principle titles, index rows.
- **Lead** (`clamp(1.03rem, 1.25vw, 1.22rem)`, `1.55`): section standfirsts and the hero supporting line. Between 44 and 52 characters of measure.
- **Body** (`0.9375rem`, `1.7`): prose and list content, capped at 60–62 characters.
- **Micro** (`0.6875rem` mono, `0.15em` tracking, uppercase): eyebrow labels, nav, section numbers, buttons, stat keys.
- **Micro XS** (`0.625rem`, `0.18em`): ordinals, counts, status, schematic keys — the smallest tier, never load-bearing on its own.

### Named Rules

**The Voice Split Rule.** Inter Tight says what happened. Geist Mono says how much, how many, how fast, and which. Sentence case belongs to Inter; uppercase belongs to mono only.

**The Smallest Tier Rule.** Nothing load-bearing may live in Ink 4 or Micro XS alone. Anything a visitor needs to judge the work is at Ink 2 or above.

## Layout

- **Container:** `1320px` maximum, centred, with `padding-inline: clamp(1.25rem, 5vw, 3.5rem)` and nothing else in the shorthand, so block rhythm is never silently zeroed.
- **Spine:** `.ruled` draws two 1px hairlines at the container boundary, full section height, at `color-mix(in oklab, rule-strong 55%, transparent)`. Sections sit flush, so the lines run continuously from hero to practice. Hidden below 768px.
- **Rhythm:** one seam value — `padding-block: clamp(4.25rem, 6.5vw, 6.5rem)` on every section. Sections are separated by 208–224px at desktop; nothing else introduces vertical space at the seams.
- **Grid:** a 12-column grid with a 64px gutter for all editorial composition. Every grid declares `grid-cols-1` at mobile so no implicit `auto` track can be pushed wide by min-content.
- **Hero composition:** a 12-column grid, not a flex stack. Three ordered rows — `hero-intro` (identity, display statement, standfirst), `hero-spec` (a person read as a specimen record), and `hero-rail` (direct contact routes). `align-content: space-between` distributes the free space. Below 1024px the rows reorder to intro → rail → spec, so the contact routes always precede the record.
- **Hero height:** `clamp(38rem, 72svh, 50rem)` — deliberately shorter than the viewport. The cap stops the internal void ballooning on tall screens, and the floor lets the work section's heading peek into the first fold. A portfolio should read as a document you scroll, not a full-screen landing page.
- **Hero fold contract:** nav, identity, display statement, standfirst, and the contact rail must all complete above the fold at 1440×900, 1280×800, 1024×768, 768×1024, and 390×844. Verified by measurement, not by eye.
- **The Hero Is Not A Landing Page.** The hero carries the person, a specimen record, and contact routes. It carries no KPI strip, no capability bar, no count of the work, and no pair of equal-weight call-to-action buttons. Those are all product-page grammar.
- **Asymmetry:** work entries run `1 | 7 | 4` across the 12 columns, then a full-width schematic indented to column 2, then `5 | 6` for problem and outcome. The offset is what makes the page read as composed rather than templated.

## Elevation & Depth

There is no elevation. Depth is expressed three ways only:

1. **Tonal steps** — Paper 2 for schematic nodes, Paper 3 for the signal node, so the diagram's most important cell reads as one step closer.
2. **Hairlines** — 1px Rule for structure, 1px Rule Strong for controls and the spine.
3. **The inversion** — the bone contact block is the only large tonal event on the page.

No shadows, no glows, no gradients. The single exception is a 5px status dot that carries a `box-shadow` halo to read as a live indicator.

**The Flat Ground Rule.** If an element needs a shadow to separate from its neighbour, the neighbouring structure is wrong.

## Motion

Motion is quiet and instrument-like. Durations are long, distances are short, and easing is always decelerating.

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for entrances and reveals; `cubic-bezier(0.76, 0, 0.24, 1)` for underlines and origin-flipping sweeps.
- **Scroll reveal:** `opacity 0 → 1` with `translateY(22px → 0)` over 950ms, staggered 60–260ms per row. Applied through a `.js` class set in `<head>`, so the hidden state only ever exists when JavaScript is running.
- **Schematic draw:** each node's 1px tick scales from `scaleY(0)` to `scaleY(1)` over 600ms, staggered 90ms across the row; the signal node's ember eye fades in 300ms after its tick lands.
- **Fill sweeps:** buttons and contact links fill from the leading edge — `scaleX(0) → scaleX(1)` over 500ms on `cubic-bezier(0.76, 0, 0.24, 1)`, painted at `z-index: -1` inside an isolated stacking context so the wipe passes under the label. A wipe reads as a machine moving; a fade does not.
- **Schematic signal trace:** hovering a plate runs a signal through it. Each node's tick pulses from `scaleY(1)` to `scaleY(2.1)` and from Rule Strong to ember over 1.15s, staggered 90ms left to right; the terminal node's ember eye flares 260ms behind. The diagram animates the thing it describes. CSS restarts the run on every hover.
- **Ledger rows:** a 2px ember bar grows from the bottom edge (`scaleY` with `transform-origin: bottom`), the ordinal promotes from Ink 4 to ember, and an arrow travels in from `translate(-4px, 4px)`.
- **Cursor:** a 5px ember square tracks instantly; a 30px hairline square follows at `lerp 0.18`. Over any labelled target the ring grows to an 86px ember chip naming the action, and the dot hides. The ring contracts to `scale(0.82)` on `pointerdown` and releases on `pointerup`, so a click is felt at the pointer as well as at the target.
- **Ambient:** the status dot pulses on a 2.8s cycle; the nav progress hairline scales with scroll. The Karachi clock ticks once per second and pauses when the tab is hidden.

## Components

### Buttons

- **Primary (`.btn--solid`)**: bone fill, paper text, no radius, 54px minimum height. Hover wipes ember in from the leading edge.
- **Secondary (`.btn`)**: transparent, 1px Rule Strong border, Ink 2 text. Hover wipes bone in and flips the text to paper.
- Both are `justify-content: space-between` so the arrow anchors to the trailing edge — the label/arrow relationship stays constant at every width.
- Hover and `:focus-visible` share every state, so keyboard users get the identical affordance.

### Spec sheet (`.spec`)

The hero's person record: a `dl` of hairline rows, each a 5rem mono key against a 13px sentence-case value. Rows are Status (with the live ember dot), Now, Practice, Open to, and Based in. It is a specimen record, not a KPI strip — the keys are nouns, never metrics.

### Ledger row (`.ledger__row`)

The row. There is exactly one row component and it carries every entry — current research, live products, archived builds — in a single index. Its cells reveal themselves as width allows: ordinal · name · status · arrow below 768px; ordinal · name · kind · status · arrow from 768px; ordinal · name · kind · stack · status · arrow from 1024px. Status is ember for anything not archived. Hover or focus grows a 2px ember bar from the bottom edge, promotes the ordinal to ember, lifts the name and kind a step, and fades the arrow in. No layout shift at any point.

**The Index Rule.** The home page carries the index; the detail page carries the work. A ledger row states what a thing is and nothing more — no thesis, no schematic, no metrics. All of that is one click away, on a page that exists for that one entry.

### Schematic plate (`.plate`)

One or two rows of nodes inside a 1px Rules grid; `gap: 1px` on a Rule background produces the internal dividers, so no cell carries a double border. Each node holds a Micro XS key above a 13px value. Nodes flex at a `8.5rem` basis, so a five-node pipeline resolves to a single line at desktop and to two or three lines on mobile. The signal node takes Paper 3, an ember key, and an ember eye where its tick meets the rail.

### Stat strip (`.stats`)

`repeat(auto-fit, minmax(8.5rem, 1fr))` cells with 1px gaps on a Rule background, hairline top and bottom. Every cell is a Mono XS key over a Mono value with tabular numerals. Used identically in the hero and in every work entry, so proof reads the same everywhere.

### Capability row (`.cap-row`)

A 13rem label column against the items, hairline on top, 26px of block padding. Hover promotes the label to ember and the items from Ink 2 to Ink. Separators are ember-free mid-dots in Ink 4.

### Contact link (`.contact__link`)

On the bone ground: 1px Bone Rule dividers, 68px minimum height, mono label with a diagonal arrow. Hover inverts cell and text entirely. Focus rings switch to Bone Ink, since the global bone ring would vanish.

### Email link (`EmailLink.astro`)

The address is never rendered as text and never appears in the HTML. `EmailLink` emits two base64 fragments as data attributes and a neutral `#contact` href; a small script assembles `mailto:` at runtime, then deletes the fragments. Without JavaScript the href keeps its fallback — `#contact` on the home page, LinkedIn inside the contact block — so the control is never dead.

This defeats address-harvesting regexes. It is not encryption: the address remains recoverable by anyone reading the page source or the network tab. A form posting to a Worker is the only way to remove it from the client entirely.

### Cursor

Two fixed elements. The dot is 5px of ember and moves on the next frame; the ring is a 30px hairline square that lags. Any `a`, `button`, or `[data-cursor]` target switches the ring to a labelled ember chip — `OPEN`, `EMAIL`, `READ`, `SOURCE`, `BACK` — and hides the dot. Only enabled for `(hover: hover) and (pointer: fine)` and never under reduced motion.

## Delivery

The site is a static build on Cloudflare Pages. Four decisions govern how it ships:

**Typefaces are self-hosted.** Inter Tight and Geist Mono live in `public/fonts` as latin and latin-ext woff2, declared with `@font-face` and scoped by `unicode-range`. Only the two latin faces are preloaded; latin-ext is fetched lazily and, at the time of writing, never — no content falls inside it. This removes two third-party connections from the critical path and is what makes `font-src 'self'` possible. Regenerate with `bun run fonts`.

**No inline styles, so `style-src` can be strict.** Reveal and tick delays are utility classes (`.stagger-*`, `.tick-*`) rather than `style` attributes, the contact block's tones are classes rather than hex literals in markup, and Shiki syntax highlighting is switched off because it emits an inline `style` on every `<pre>`. `style-src 'self'` therefore holds, and a CSP violation means a real regression. Scripts are the one concession: Astro inlines its component scripts, so `script-src` carries `'unsafe-inline'` — the directive still blocks third-party script origins and `eval`.

**Headers and caching are declared in `public/_headers`.** CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy` apply to every response. Content-hashed output under `/assets`, `/_astro` and `/fonts` is `immutable` for a year; `resume.pdf` and `favicon.svg` are not fingerprinted and get a week.

**Publishing is a code change, not a deploy.** `UNPUBLISHED` in `src/data/work.ts` lists slugs held back from the build. A hidden entry produces no ledger row, no sitemap URL and no generated page — the copy stays in the file, so publishing is the deletion of one string.

**Known third-party dependency: arrows.** Neither typeface covers `U+2192` (`→`), `U+2197` (`↗`) or `U+2190` (`←`), because Google's subsets omit them. Arrows therefore render in the platform symbol font. It is consistent within a platform and looks deliberate, but it is a fallback rather than a choice. Replacing them with inline SVG is the fix if cross-platform pixel parity ever matters.

## Accessibility

- Skip link is the first tab stop, visible on focus, and moves real focus into `<main tabindex="-1">`.
- Focus rings are 2px Ink at 3px offset, switching to Bone Ink inside the inverted block.
- Reduced motion removes the cursor entirely, forces every reveal to its final state, forces schematic ticks and ember eyes visible, and collapses all durations to 0.001ms.
- Without JavaScript the `.js` class never lands, so no hidden state exists: the reveal attribute becomes inert and the full page renders.
- Status is never colour-only — live/research/archived always carry a text label; ember is redundant with meaning.
- Every `target="_blank"` link carries `rel="noopener noreferrer"`. All interactive targets are at least 44px tall.
- Heading order is one `<h1>` per page — the statement on the home page, the project name on a detail page.

## Content architecture

- **Home** — identity, the work index, capabilities, practice, contact. No project detail.
- **`/work/<slug>`** — everything about one entry: the schematic, the problem, what shipped, the measured stats, and the long-form write-up when one exists. Eight of these exist, one per ledger row.
- `/case-study/<id>` redirects to `/work/<slug>`. The slugs are identical, so nothing that pointed at the old routes breaks.
- **Name.** The visible brand is `M. Maaz`, and it appears twice on the home page: the nav wordmark and the footer colophon. The full name survives only where it helps and cannot be seen — `<meta name="author">`, the `Person` structured data, and the nav link's accessible label, so search engines and screen readers still get it in full.

## Anti-Patterns

- **Don't** put a page-load animation on the display type. The statement reveals once, on scroll, with everything else.
- **Don't** re-run a hover animation on a timer. Hover motion fires on hover, and only on hover.
- **Don't** add a KPI strip, a capability bar, a work count, or a pair of equal-weight CTA buttons to the hero. It immediately becomes a landing page for a product that does not exist.
- **Don't** move text on hover. Sweeps, colour, and arrows travel; the words stay where the reader left them.
- **Don't** print the email address as text, in the meta description, or in structured data. The full name may live in machine-readable metadata; the address does not.
- **Don't** put a project's thesis, schematic or metrics on the index. A ledger row that argues is no longer a ledger.
- **Don't** add a second accent colour, or use ember as a background wash.
- **Don't** raise display type to 800–900 weight or all-caps; the medium weight is the voice.
- **Don't** use Geist Mono for sentences, or uppercase it into body copy.
- **Don't** introduce a card with a shadow, a radius, or a gradient.
- **Don't** add a decorative border-left rail to sections — the `.ruled` spine and the ordinals already carry the structure.
- **Don't** stack two loud elements in one viewport; the ember chip, the inverted block, and the primary button each need their own air.
- **Don't** let a schematic exceed two rows of nodes, or add nodes that are not part of the real architecture.
