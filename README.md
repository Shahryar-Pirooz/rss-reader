# RSS Reader

Opinionated starter for a small, fast RSS/Atom reader built with Next.js and TypeScript.

## Overview

This repository contains a Next.js application that demonstrates a clean feed-reading experience.

Key ideas:

- Lightweight, client-first reading UI using Next.js app router
- Simple state with `zustand`

## Tech stack

- Next.js 16 (app router)
- React 19
- TypeScript
- Tailwind (optional starter assets included)
- Zustand for simple global state

## Scripts

The project uses npm scripts from `package.json`:

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Install and run

Install dependencies and run locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project layout

- `app/` — Next.js app entry, routes and UI components
- `public/` — static assets
- `store/` — small `zustand` store used by the app

## Contributing

This repo is intended as a development and learning workspace. If you want to contribute fixes or improvements, open a PR with a focused change and include a short description of why the change is needed.

## License

Unless otherwise specified in individual files, this repository is unlicensed. Add a `LICENSE` file if you want to make it open-source.
