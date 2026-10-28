# Norah Zhou — Portfolio

A personal portfolio showcasing product design, UX research, service design, business analysis, and web development projects.

## Experience

- Illustrated day and night homepage with an animated introduction and project selector.
- Full-page navigation connecting Home, About, Experience, Work, and Contact.
- Three ways to explore projects: interactive Drawers, Gallery, and Table.
- Individual project case studies, skills, tools, experience, and resume access.
- Responsive layouts, dark mode, and reduced-motion support.

## Stack

Next.js App Router, React, TypeScript/JavaScript, Tailwind CSS, CSS Modules, Motion, and GSAP. Fonts are bundled locally with their licenses in `app/fonts/`.

## Local development

Use Node.js 20, matching the deployment workflow.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Build and deployment

```bash
npm run build
```

The build checks types and generates a static site in `out/`. Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/`, which builds and deploys the site to GitHub Pages.

## Project structure

| Location | Contents |
| --- | --- |
| `app/page.tsx` | Homepage entry point |
| `app/components/` | Navigation, homepage interactions, project views, and shared components |
| `app/projects/` | Individual project case studies |
| `app/globals.css` | Global styles and theme colors |
| `app/fonts/` | Local font files and licenses |
| `assets/assets.js` | Project listings and About section data |
| `assets/` | Imported images and supporting assets |
| `public/` | Public previews, banners, resume, and case-study media |

## Updating content

Update project listings in `assets/assets.js`, case-study pages in `app/projects/`, and their referenced images in `public/`. Theme colors live in `app/globals.css`; component styling uses both Tailwind utilities and CSS Modules.

Local tool configuration and temporary working directories under `.claude/` are ignored and are not required to build or deploy the site.
