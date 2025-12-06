// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  image: {
    service: {
      entrypoint: "astro/assets/services/no-op",
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
  compressHTML: true,
  prefetch: {
    defaultStrategy: "hover",
  },
});
