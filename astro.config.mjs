// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
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
