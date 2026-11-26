<div align="center">

# Portfolio Website: Next.js, 3D Hero & SEO

**A Next.js portfolio website.** 3D animated hero, responsive project showcase, and SEO features
including a sitemap, structured data and Open Graph. The GitHub Pages deployment is static; the
contact form opens a prefilled email in the visitor's email app.

[**Live Demo**](https://chaitanya-lad.github.io) · [Documentation](docs/) · [Deploy](docs/deployment.md)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?logo=threedotjs&logoColor=white)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)

[![Portfolio website featuring a 3D animated hero](public/assets/Screenshot%20From%202026-11-26%2012-40-27.png)](https://chaitanya-lad.github.io)

</div>

## What you get

This portfolio includes a 3D animated hero, project showcase and search-engine metadata.

| | |
| --- | --- |
| **3D portfolio** | Animated GLTF hero, a GPU shader globe that travels with your scroll, a pinned horizontal case-study showcase, and scroll-driven reveals throughout |
| **Contact form** | Opens a prefilled message in the visitor's email app; the visitor sends it directly |
| **SEO ready** | `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph, Twitter cards and JSON-LD structured data, all generated from your own content |

Every string, project and experience lives in `constants/`, one typed file per domain. Fork it,
edit that folder, and it is your portfolio, with no component changes needed.

## Features

**Design:** 3D animated hero · shader globe · pinned case-study showcase · sticky service cards ·
experience timeline · skills marquee · particle field · parallax background · responsive from 320px ·
respects `prefers-reduced-motion`

**Contact:** email handoff from the static portfolio; server-backed submissions are not available
on GitHub Pages

**SEO:** sitemap · robots · canonical · Open Graph + Twitter cards · JSON-LD (`Person`, `WebSite`,
`ProfilePage`, `ProfessionalService`) · Web App Manifest · generated favicons · self-hosted fonts

**Code:** TypeScript strict · 0 lint errors · no file over 250 lines · organised by kind
(`constants/` `types/` `hooks/` `helpers/` `animations/`) · runs with an empty `.env`

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Three.js + React Three Fiber ·
Motion · GitHub Pages

## Quick start

```bash
git clone https://github.com/Chaitanya-Lad/Chaitanya-lad.github.io.git
cd Chaitanya-lad.github.io
npm install
npm run dev
```

Open <http://localhost:3000>. Requires Node 20.9+. **No environment variables needed.** The site
builds, deploys and runs with an empty `.env`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your domain. Drives the sitemap, canonical and Open Graph URLs. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console token. Renders the verification meta tag. |

Both variables are optional for the GitHub Pages deployment.

## Make it yours

1. **Content:** edit `constants/` (hero, projects, services, experience, skills, socials)
2. **Images:** `public/assets/`, and replace `public/og.jpg` with your own 1200×630 preview
3. **Colours:** the `@theme` block at the top of `app/globals.css`
4. **SEO:** `constants/seo-constants.ts`, then set `NEXT_PUBLIC_SITE_URL`
5. **3D model:** drop a `.glb` in `public/models/` and update `components/portfolio/astronaut.tsx`

Full walkthrough: [`docs/customization.md`](docs/customization.md)

## Deployment

The repository deploys to GitHub Pages through the workflow in
`.github/workflows/deploy.yml`. Select **GitHub Actions** as the Pages source in repository settings.
See [`docs/deployment.md`](docs/deployment.md) for details and static-hosting limitations.

## Documentation

| | |
| --- | --- |
| [`docs/customization.md`](docs/customization.md) | Making it your own, end to end |
| [`docs/deployment.md`](docs/deployment.md) | GitHub Pages setup and static-hosting limitations |
| [`docs/admin.md`](docs/admin.md) | Archived notes for the former server-backed admin |
| [`docs/architecture.md`](docs/architecture.md) | Project structure and the 3D layer |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Conventions and PR flow |

## Credits & licensing

Code is [MIT](LICENSE). The content and assets are **not** - see [`NOTICE`](NOTICE).
Replace them before deploying:

- Personal content (name, biography, project write-ups, work history, résumé) belongs to Chaitanya Lad
- `public/models/*.glb` is third-party fan art from Sketchfab, so **check its licence and keep the attribution**
- Project screenshots and client logos belong to their owners

3D helpers by [pmndrs](https://github.com/pmndrs), animation by [Motion](https://motion.dev).

If this helped you build your portfolio website, a ⭐ is very welcome.
