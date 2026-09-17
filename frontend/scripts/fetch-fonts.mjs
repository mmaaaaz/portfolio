/**
 * Re-downloads the self-hosted typefaces.
 *
 * Google splits each family into subsets by unicode-range. The site only ever
 * renders latin and latin-ext, so the other subsets are skipped; each face is
 * scoped by unicode-range in the output, so a browser fetches latin-ext only if
 * a character actually lands in it.
 *
 * Run from frontend/:  bun run fonts
 * Then paste the generated rule block into src/styles/global.css.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "public/fonts");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const FAMILIES = [
  { query: "Inter+Tight:wght@100..900", slug: "inter-tight" },
  { query: "Geist+Mono:wght@100..900", slug: "geist-mono" },
];

const KEEP = new Set(["latin", "latin-ext"]);

await mkdir(OUT, { recursive: true });
const rules = [];

for (const family of FAMILIES) {
  const response = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.query}&display=swap`,
    { headers: { "User-Agent": UA } },
  );
  const css = await response.text();

  for (const block of css.split("/*").slice(1)) {
    const subset = block.slice(0, block.indexOf("*/")).trim();
    if (!KEEP.has(subset)) continue;

    const remote = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim();
    const weight = block.match(/font-weight:\s*([^;]+);/)?.[1]?.trim() ?? "400";
    const style = block.match(/font-style:\s*([^;]+);/)?.[1]?.trim() ?? "normal";
    const name = block.match(/font-family:\s*'([^']+)'/)?.[1];
    if (!remote || !range || !name) continue;

    const file = `${family.slug}-${subset}.woff2`;
    await writeFile(`${OUT}/${file}`, new Uint8Array(await (await fetch(remote)).arrayBuffer()));

    rules.push(
      [
        `/* ${name} — ${subset} */`,
        "@font-face {",
        `  font-family: "${name}";`,
        `  font-style: ${style};`,
        `  font-weight: ${weight};`,
        "  font-display: swap;",
        `  src: url("/fonts/${file}") format("woff2");`,
        `  unicode-range: ${range};`,
        "}",
      ].join("\n"),
    );
  }
}

console.log(rules.join("\n\n"));
console.error(`\nwrote ${rules.length} faces to public/fonts/`);
