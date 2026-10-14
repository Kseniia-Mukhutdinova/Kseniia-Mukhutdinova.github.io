# Kseniia Mukhutdinova — Product Designer Portfolio

Static portfolio site built with [Astro](https://astro.build) from the Figma file
*Kseniia Mukhutdinova — Product Designer Portfolio*. Three pages:

| Page | URL | Source |
|---|---|---|
| Home | `/` | `src/pages/index.astro` |
| Case 01 — Multiple Recall | `/case-studies/multiple-recall/` | `src/pages/case-studies/multiple-recall.astro` |
| Case 02 — Oabat | `/case-studies/oabat/` | `src/pages/case-studies/oabat.astro` |

Every page is a real HTML file, so links can be opened or refreshed directly on GitHub Pages. No client-side
JavaScript framework is shipped — only a ~1 KB script for the scroll-in animations.

## Requirements

- Node.js 22.12 or newer (the version used for deployment is in `.nvmrc`)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321. Edits to pages, components, styles and images reload automatically.

## Production build

```bash
npm run build     # outputs the static site to dist/
npm run preview   # serves dist/ at http://localhost:4321 to check the real build
```

Images in `src/assets/` are converted at build time to responsive AVIF/WebP in several sizes, so the large
source PNGs never reach visitors.

## Deployment (GitHub Pages)

Deployment is automatic: every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages.

**One-time setup:** in the GitHub repository go to **Settings → Pages → Build and deployment → Source** and choose
**GitHub Actions**.

- Check progress under the repository's **Actions** tab ("Deploy to GitHub Pages").
- The published URL appears in the workflow summary and under **Settings → Pages**. For this repository it is
  `https://kseniia-mukhutdinova.github.io/`.
- To redeploy without changes: **Actions → Deploy to GitHub Pages → Run workflow**.

The base path is detected automatically. If the repository is ever renamed to something other than
`<username>.github.io` (e.g. `portfolio`), the site will be served from `/portfolio/` and all links keep working.
To test that locally: `BASE_PATH=/portfolio/ npm run build`.

## Updating the site

```bash
# edit files, check with `npm run dev`, then
git add .
git commit -m "Describe the change"
git push
```

The new version is live a minute or two after the workflow finishes.

## Project structure

```
src/
  pages/            one file per page (routes)
  layouts/Base.astro  <head>, meta tags, fonts, nav + footer
  components/       Nav, Footer, CaseCard, CaseIntro (hero + cover + facts), Decision,
                    Panel (before/after phone panels), Shot (gallery item + caption), Outcome
  styles/global.css design tokens (Figma variables) and all styles
  scripts/reveal.ts scroll-in animations
  assets/           images & icons (home/, case1/, case2/, icons/)
public/             files copied as-is (favicon, og.png social preview)
```

### Common edits

- **Text:** change it directly in the page file in `src/pages/`.
- **Replace an image:** overwrite the file in `src/assets/` with the same name (any size; it is resized at build).
- **Colors / fonts / type sizes:** the tokens at the top of `src/styles/global.css` mirror the Figma variables.
- **Before/after panels:** each `<Panel>` takes columns with a title, text (a string, or an array for bullet points)
  and phone images. The numeric props are the Figma measurements of that frame.
- **Animations:** add `data-reveal` to any element to fade it in on scroll. They are skipped automatically for
  visitors who prefer reduced motion.

## Notes

- Fonts (Cal Sans, Inter, Space Grotesk, Caveat) are self-hosted from npm packages — no requests to Google Fonts.
- Phone mockups in the before/after panels were exported from Figma at 3× without their text; the headings and
  bullet points are real HTML so they stay readable on phones and accessible to screen readers.
