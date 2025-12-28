// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "https://maazu.dev", // Can be overridden with SITE_URL env var
  output: "static",

  integrations: [sitemap()],
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
