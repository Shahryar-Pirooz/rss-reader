# RSS Reader

A compact RSS/Atom reader built with Next.js, React, TypeScript, and Zustand. It lets you save feed sources in the browser, fetch their latest articles through a server-side RSS API route, and read feed content in a focused three-pane interface.

## Features

- Add RSS/Atom feed URLs with a custom sidebar title
- Persist feed sources in `localStorage`
- Fetch multiple feeds through `app/api/rss/route.ts` using `rss-parser`
- Show all articles or filter by a single feed source
- Sort articles newest-first when publication dates are available
- Preview feed content in an in-app reader pane
- Open original articles in a new tab
- Remove saved feeds from the sidebar
- Toggle light and dark themes
- Use a collapsible navigation sidebar on smaller screens

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19 |
| Language | TypeScript |
| State | Zustand |
| Feed parsing | rss-parser |
| Styling | Tailwind CSS 4 |
| Icons | react-icons |
| Package manager | pnpm |

## Getting Started

This project enforces `pnpm` through the `preinstall` script.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `pnpm dev` — start the local development server
- `pnpm build` — create a production build
- `pnpm start` — run the production server
- `pnpm lint` — run ESLint

## Project Structure

```text
app/
  api/rss/route.ts              Server route that parses feed URLs
  components/content/           Article reader pane
  components/listSide/          Article list and list items
  components/navSide/           Feed navigation and add-feed dialog
  store/                        Zustand stores for UI, sources, and feeds
  types/                        RSS and store TypeScript types
  globals.css                   Global styles
  tokens.css                    Theme tokens
source/frontpage-feed-reader-main/
  data/                         Sample feed data from the product brief
  guidance/                     Design and accessibility guidance
  spec/                         Original product challenge requirements
```

## How It Works

1. Add a feed title and RSS URL from the sidebar.
2. The source is stored in `localStorage` under the `sources` key.
3. The client posts saved feed URLs to `/api/rss`.
4. The API route parses each URL with `rss-parser` and returns successful feeds plus per-feed errors.
5. The article list flattens all feed items, filters by selected source, and sorts by date.
6. Selecting an article opens its available feed HTML or description in the reader pane.

## Current Limitations

- Feed sources are stored only in the current browser.
- There is no authentication, database persistence, OPML import, categories, or read/unread tracking yet.
- Feed content is rendered from feed-provided HTML, so production use should add stricter sanitization.
- The app fetches feeds on source changes and does not yet cache parsed responses server-side.

## Development Notes

- The app currently uses client-side state for the reading experience and a server-side route only for feed fetching.
- `source/frontpage-feed-reader-main/` contains challenge reference material and is not part of the runtime application.
- If you add Next.js-specific code, check the local Next.js documentation in `node_modules/next/dist/docs/` first because this project uses Next.js 16.
