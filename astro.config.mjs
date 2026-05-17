// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Apex domain — used for canonical URL, Open Graph, sitemap.
  site: 'https://allstarsteven.com',
  // Inline CSS into the page — removes the render-blocking stylesheet request.
  build: { inlineStylesheets: 'always' },
});
