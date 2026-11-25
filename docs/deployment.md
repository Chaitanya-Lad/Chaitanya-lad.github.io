# Deployment

The portfolio is deployed to GitHub Pages at
[`https://chaitanya-lad.github.io/`](https://chaitanya-lad.github.io/) using a
static Next.js export. The workflow in `.github/workflows/deploy.yml` builds
the site and publishes it whenever changes are pushed to `main`.

## Enable GitHub Pages

In the repository's **Settings → Pages**, set **Build and deployment → Source**
to **GitHub Actions**. After that, pushes to `main` deploy automatically. The
published site is available at the URL above once the Actions workflow finishes.

## Limits of static hosting

GitHub Pages serves static files and cannot run Next.js server routes or
middleware. The Pages build therefore contains the public portfolio only: the
private admin dashboard and server-side contact API are not available. The
contact form opens a prefilled email in the visitor's email app; the visitor
must send it there.

The existing server-backed contact and admin code is not part of the static
deployment. To use those features, restore the server routes and deploy to a
Node.js host such as Vercel; the `github.io` URL cannot run a Next.js server.

## Local verification

```bash
npm ci
npm run build
```

The static site is generated in `out/`, the directory published by GitHub Pages.
