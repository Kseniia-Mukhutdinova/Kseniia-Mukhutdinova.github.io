// @ts-check
import { defineConfig } from 'astro/config';

// The site is published by GitHub Pages. For a user site (<user>.github.io) it lives at the
// domain root, so BASE_PATH stays "/". If the repo is ever renamed (e.g. to "portfolio"),
// the deploy workflow passes BASE_PATH=/portfolio/ and every link and asset follows it.
const site = process.env.SITE_URL ?? 'https://kseniia-mukhutdinova.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    // /case-studies/oabat/index.html — a real file per page, so refreshing never 404s.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});
