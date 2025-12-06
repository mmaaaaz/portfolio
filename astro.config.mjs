// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
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
