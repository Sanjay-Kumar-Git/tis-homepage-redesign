# Tulas International School Homepage

Accessible, mobile-first reproduction of the live Tulas International School homepage, rebuilt from verified school-site copy and media.

## Stack

- Next.js 16 App Router and TypeScript in strict mode
- Tailwind CSS 4
- Framer Motion, next-themes, and lucide-react

## Development

Install dependencies and start the local server:

```bash
npm install
npm run dev
```

The available checks are:

```bash
npm run lint
npm run typecheck
npm run build
```

## Foundation

Page copy, route data, reviews, people, awards, and media records are maintained under `src/data`. The page and content sections are server components by default. Client boundaries are limited to interactive navigation, carousels, the enquiry form, theme, cursor, scroll progress, count-up, and media visibility handling. The layout includes a keyboard skip link, social metadata, and reduced-motion support.

## Image Assets

Original school photography, logos, sports cutouts, portraits, awards, partner marks, review images, and SVGs are locally stored and optimized. Their source URLs, page sections, dimensions, and alt text are catalogued in [`docs/ASSETS.md`](docs/ASSETS.md) and `src/data/assets.ts`. The original image assets belong to Tulas International School and are included for this assessment.

The five original MP4s remain remote: the three parent videos are 49-77 MB each, and ffmpeg was unavailable to transcode them under the 8 MB limit. The school-provided desktop/mobile background videos also remain remote and use muted, looped, in-view playback with a local campus poster.

The one-off extraction helper has been removed. `scripts/assets-inventory.json` is retained as the crawl manifest.