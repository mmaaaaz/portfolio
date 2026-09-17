// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "https://maazu.dev", // Can be overridden with SITE_URL env var
  output: "static",

  // Work now lives at /work/<slug>. The old /case-study/<id> routes used the same
  // slugs, so these keep any existing links alive.
  redirects: {
    "/case-study/askshu": "/work/askshu",
    "/case-study/ahsanautos-pk": "/work/ahsanautos-pk",
    "/case-study/zenmall-pk": "/work/zenmall-pk",
  },

  integrations: [sitemap()],

  /*
   * Shiki emits its own inline `style` on every <pre>, which would force
   * style-src to allow inline styles. The only fenced block on the site is a
   * plain-text architecture diagram, so highlighting earns nothing and
   * src/styles/global.css already styles .prose pre properly.
   */
  markdown: {
    syntaxHighlight: false,
  },
  compressHTML: true,
  prefetch: { defaultStrategy: "hover" },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: "esbuild", // fastest minifier
      cssCodeSplit: true, // split CSS per page
      cssMinify: true,
      sourcemap: false, // remove sourcemaps for production
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor"; // external deps separate
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
  },
});
