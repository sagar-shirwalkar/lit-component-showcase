# Lit UI Kit — Component Showcase

A professional, interactive component library built with **Lit 3**, **TypeScript**, and **Vite**. The showcase features a Metro-inspired dashboard UI with a persistent sidebar, dark/light mode, and live demos of 17 fully self-contained web components.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Components](#components)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Preview a Production Build](#preview-a-production-build)
- [Project Structure](#project-structure)

---

## Overview

Each component in this library is a standard **Custom Element** built on top of [Lit](https://lit.dev). They rely on no external runtime beyond Lit itself and are fully encapsulated via Shadow DOM — styles and behaviour cannot leak in or out. The showcase app (`showcase-app`) acts as a living style guide, demonstrating every variant, size, and state each component supports.

Key features of the dashboard shell:

- **Sidebar navigation** — components grouped by category with active-state highlighting
- **Dark / Light mode** — toggle via the sun/moon icon in the navbar; applies globally to the page
- **Component metadata** — breadcrumb, description, and labelled demo tiles for every component
- **Zero external CSS frameworks at runtime** — Tailwind CSS is processed at build time; no stylesheet is shipped to the browser

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| [Lit](https://lit.dev) | ^3.3 | Web component base library |
| [TypeScript](https://www.typescriptlang.org) | ~6.0 | Static typing and decorator support |
| [Vite](https://vite.dev) | ^8.0 | Dev server and production bundler |
| [Tailwind CSS](https://tailwindcss.com) | ^4.3 | Utility classes (build-time only) |

---

## Components

| Category | Components |
|---|---|
| Form Controls | Button, Input, Checkbox, Toggle, Slider |
| Display | Card, Badge, Alert |
| Navigation | Tabs, Navbar, Accordion, Pagination, Dropdown |
| Overlay | Modal, Drawer |
| Data | Data Table, Calendar |

---

## Prerequisites

Before you begin, ensure the following tools are installed on your machine:

- **Node.js** ≥ 18.0.0 — [Download from nodejs.org](https://nodejs.org)
- **npm** ≥ 9.0.0 (bundled with Node.js) or **pnpm** / **yarn** if you prefer

To verify your versions:

```bash
node --version
npm --version
```

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/lit-component-showcase.git
cd lit-component-showcase
```

**2. Install dependencies**

```bash
npm install
```

This installs all runtime and development dependencies listed in `package.json`, including Lit, TypeScript, Vite, and Tailwind CSS. No additional global installs are needed — everything runs through locally installed binaries via `npm run`.

---

## Development

Start the local development server with hot module replacement (HMR):

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`). The server stays running and reflects any changes to source files instantly in the browser without a full page reload.

**What happens under the hood:**

1. Vite serves `index.html` as the entry point.
2. `src/my-element.ts` is loaded as a native ES module — no bundling step is required during development.
3. TypeScript is transpiled on-the-fly by Vite's esbuild pipeline (type-checking is intentionally skipped for speed).
4. Tailwind CSS v4 processes utility classes through the `@tailwindcss/vite` plugin on each request.
5. Shadow DOM–scoped `css` tagged template literals in each component are hot-patched by Lit's own HMR integration.

> **Note on type safety:** The dev server does not run `tsc` — it only transpiles. To catch type errors during development, run `npx tsc --noEmit` in a separate terminal or rely on your IDE's TypeScript language server.

---

## Production Build

Compile TypeScript and bundle all assets for deployment:

```bash
npm run build
```

This command runs two steps in sequence:

1. **`tsc`** — performs a full type-check against `tsconfig.json`. The build will fail if there are any type errors, ensuring no broken code reaches production. No output files are emitted by the compiler (`"noEmit": true`); it is used purely for validation.

2. **`vite build`** — bundles and optimises all source files:
   - Tree-shakes unused Lit internals and component code
   - Minifies JavaScript and inlines critical CSS
   - Hashes output filenames for long-term browser caching
   - Writes the final artefacts to the `dist/` directory

Output structure after a successful build:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js     # Bundled and minified application
│   └── index-[hash].css    # Extracted and minified styles
└── favicon.svg
```

The contents of `dist/` are fully static and can be deployed to any hosting platform — a CDN, GitHub Pages, Netlify, Vercel, or a plain nginx/Apache server — without any server-side runtime.

---

## Preview a Production Build

After running `npm run build`, you can serve the `dist/` folder locally to verify the production output before deploying:

```bash
npm run preview
```

Vite spins up a lightweight static server (typically at `http://localhost:4173`) that serves the compiled assets exactly as a production host would. This is useful for catching issues that only appear after bundling and minification, such as incorrect asset paths or missing chunks.

> `npm run preview` requires a prior `npm run build`. It does not rebuild — it only serves what is already in `dist/`.

---

## Project Structure

```
lit-component-showcase/
├── public/                  # Static assets copied verbatim to dist/
│   └── favicon.svg
├── src/
│   ├── components/          # Individual Lit web components
│   │   ├── accordion.ts
│   │   ├── alert.ts
│   │   ├── badge.ts
│   │   ├── button.ts
│   │   ├── calendar.ts
│   │   ├── card.ts
│   │   ├── checkbox.ts
│   │   ├── data-table.ts
│   │   ├── drawer.ts
│   │   ├── dropdown.ts
│   │   ├── input.ts
│   │   ├── modal.ts
│   │   ├── navbar.ts
│   │   ├── pagination.ts
│   │   ├── slider.ts
│   │   ├── tabs.ts
│   │   └── toggle.ts
│   ├── index.css            # Global base styles and Tailwind imports
│   └── my-element.ts        # Root showcase-app shell (navbar, sidebar, demos)
├── index.html               # HTML entry point
├── package.json
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite and Tailwind plugin configuration
```

Each file under `src/components/` exports exactly one (or two, where a compound element is needed) `@customElement`-decorated class. Components are self-contained: all styles live in a `static styles = css\`...\`` block and are applied inside Shadow DOM. There are no shared stylesheets between components.

The root component (`showcase-app` in `my-element.ts`) imports every component, maintains all interactive state, and renders the dashboard shell including the navbar, sidebar, and live demo tiles.
