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

Optimised Luna combination-mark, wordmark, and symbol PNGs live in `public/brand/`. Next.js Image renders the navigation mark.

### Current mock-data strategy

There is no mock-data layer yet. Placeholder copy is local to each route, and shared page presentation is passed through typed `PageScaffold` props. There is no database, authentication, storage, or simulated product state.

## Planned architecture

The following boundaries are directional and do not yet represent files in the repository.

### Mock application state

Milestones 1–6 should introduce a small typed domain model and deterministic local demo data. Pages should consume that state through a clear service or repository boundary rather than importing scattered fixture objects. This keeps early workflows reviewable without prematurely adding backend infrastructure.

### Future data-service boundary

UI components should depend on application-level queries and commands rather than a storage vendor. The boundary should own loading, errors, object mapping, and mutations so local mock implementations can later be replaced without rewriting presentation components.

### Future Supabase boundary

Supabase is deferred to Milestone 7. Its eventual integration should remain behind the data-service boundary and own authentication, relational persistence, storage, and row-level security. Supabase client calls should not be distributed directly through reusable UI components.

The exact modules and schema will be decided when their milestone begins; they are intentionally not scaffolded today.
