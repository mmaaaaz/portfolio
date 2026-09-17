## Design Context

### Users
- **Primary Audience:** Recruiters, fellow developers, and potential freelance clients.
- **Context & Job to be Done:** Visitors are evaluating technical capability, design sensibilities, and past projects to make hiring or networking decisions.
- **Emotional Resonance:** The interface should evoke a strong sense of **confidence** and **technical mastery**.

### Brand Personality
- **3-Word Personality:** Sleek, minimalist, crafty, aesthetical.
- **Vibe:** Highly polished, deliberate, and built by someone who cares deeply about the craft of software and design.

### Aesthetic Direction
- **Visual Tone:** Natural neo-brutalism/minimalism. Rather than harsh #000000 and #ffffff, the palette relies on **natural, softened darks** (deep charcoals/obsidians) and **natural lights** (bone/alabaster) to create a premium, slightly organic, and less fatiguing dark mode.
- **Styling:** Sharp geometry (0px border radius everywhere), asymmetric layouts, and a two-voice type system: **Inter Tight** for display and body, **Geist Mono** for every label, ordinal, and data point. The cursor is a labelled ember chip that names the action (`OPEN`, `EMAIL`, `READ`, `SOURCE`) rather than a decorative dot.
- **UI Elements:** High contrast components with micro-animations that make the site feel "alive" without being overwhelming.

### Design Principles
1. **Craft Over Clutter:** Interfaces must remain sleek and minimalist. Only include elements that serve a clear purpose in demonstrating expertise or guiding the user.
2. **Natural Contrast:** Avoid pure black and pure white. Use a deeply saturated natural dark baseline paired with soft, off-white accents to maintain readability while elevating the aesthetical quality.
3. **Showcase Technical Mastery:** Use structural rigor—like visible grids, monospace data points, and terminal-like subtle accents—to reinforce the developer identity.
4. **Inclusive Polish (Accessibility):** Ensure high contrast for all critical text against the natural dark backgrounds. Since the site utilizes custom cursors and CSS animations, prioritize `prefers-reduced-motion` safety nets and maintain functional focus states for keyboard-only navigation.
