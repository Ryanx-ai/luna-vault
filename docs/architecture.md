# Luna Vault Application Architecture

This document distinguishes the repository as it exists today from the boundaries planned for later milestones.

## Current architecture

### Framework and versions

- Next.js 15.5.20
- React 19.1
- TypeScript 5.7 in strict mode
- Tailwind CSS 3.4
- Next.js App Router
- npm with `package-lock.json`

### Routes

The `app/` directory contains the root layout, global CSS, a root redirect to `/overview`, and one page module for each current route:

- `/overview`
- `/assets`
- `/brands`
- `/collections`
- `/guide`
- `/activity`
- `/archive`
- `/settings`

All product pages are currently static placeholders composed with the shared page scaffold.

### Component categories

- `components/layout/` contains the application shell, sidebar, top bar, and shared page scaffold.
- `components/ui/` contains general-purpose Button and Badge primitives.
- `components/brand/` contains Luna-specific identity rendering.
- `lib/` contains shared utilities and typed navigation configuration.

### Shared layout

`app/layout.tsx` wraps every route in `AppShell`. The shell provides a fixed desktop sidebar, mobile navigation drawer, top navigation, and the main content region. Client state is limited to navigation presentation.

### UI primitives and styling

Button variants use Class Variance Authority; class names are composed with `clsx` and `tailwind-merge`. Global semantic colour tokens are CSS custom properties exposed through Tailwind. The interface currently has one fixed dark theme.

### Navigation

`lib/navigation.ts` is the source of truth for primary and utility navigation items. It associates each route with a label and Lucide icon. The sidebar and top bar consume the same typed configuration.

### Public assets

Founder-supplied high-resolution brand originals are preserved outside the production bundle in `assets/source/brand/`. Proportionally scaled application copies live in `public/brand/`; the full Luna Vault logo is used in the sidebar brand area and the Luna logomark is used for compact marks and `app/icon.png`. The application copies preserve the source aspect ratio without cropping or reinterpretation.

### Current mock-data strategy

Milestone 1 introduces a small deterministic local-data boundary for the workspace overview:

- `lib/types/workspace.ts` defines the workspace, brand, asset, activity, metric, and attention domain summaries.
- `lib/fixtures/luna-workspace.ts` contains the seeded Luna workspace and brand family. Dates and values are fixed; no data is generated at runtime.
- `lib/data/workspace.ts` is the local access boundary consumed by the overview route.

`app/overview/page.tsx` obtains its data through that access function and passes it to the overview presentation. Other product routes remain static placeholders. There is still no database, authentication, cloud storage, or persistent mutation.

## Planned architecture

The following boundaries are directional and do not yet represent files in the repository.

### Mock application state

Milestones 2–6 should extend the typed domain model and deterministic fixtures through the established local access boundary. Fixture objects should remain outside React components so early workflows stay reviewable without prematurely adding backend infrastructure.

### Future data-service boundary

UI components should depend on application-level queries and commands rather than a storage vendor. The boundary should own loading, errors, object mapping, and mutations so local mock implementations can later be replaced without rewriting presentation components.

### Future Supabase boundary

Supabase is deferred to Milestone 7. Its eventual integration should remain behind the data-service boundary and own authentication, relational persistence, storage, and row-level security. Supabase client calls should not be distributed directly through reusable UI components.

The exact modules and schema will be decided when their milestone begins; they are intentionally not scaffolded today.
