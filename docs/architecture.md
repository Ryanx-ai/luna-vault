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

The overview is a working local-data experience. The remaining product pages are static placeholders composed with the shared page scaffold.

### Component categories

- `components/layout/` contains the application shell, sidebar, top bar, and shared page scaffold.
- `components/providers/` contains the client-side selected-vault boundary.
- `components/overview/` contains the workspace overview presentation.
- `components/ui/` contains general-purpose Button and Badge primitives.
- `components/brand/` contains Luna-specific identity rendering.
- `lib/` contains shared utilities and typed navigation configuration.

### Shared layout

`app/layout.tsx` loads deterministic shell and Brand data and wraps every route in `AppShell`. The shell occupies the viewport, offsets its desktop main column from the fixed sidebar, and assigns vertical overflow to the `main` content region. `VaultProvider` owns only the selected local Vault and `BrandProvider` owns session-local Brand state; neither implies persistence or authentication. Persistent top-bar behaviour remains recorded technical debt and is not considered resolved by this architecture.

### UI primitives and styling

Button variants use Class Variance Authority; class names are composed with `clsx` and `tailwind-merge`. Global semantic colour tokens are CSS custom properties exposed through Tailwind. The interface currently has one fixed dark theme.

### Navigation

`lib/navigation.ts` is the source of truth for Workspace and utility navigation items. It associates each route with a label and Lucide icon. The sidebar renders a separate Vaults section above Workspace navigation and exposes the seeded Luna, Kuro, Pangea, and Tethr vaults. Selecting a vault updates shell context deterministically without changing routes or persisting state.

The sticky top bar separates global shell concerns from page content:

- the left region identifies the selected vault and current route
- the centre provides the future-facing Search Vault entry point
- the right region contains Updates, Notifications, and the profile menu

Updates deliberately separates workspace activity from recently updated assets. Notifications represents actionable requests rather than a second activity feed.

### Public assets

Founder-supplied high-resolution brand originals are preserved outside the production bundle in `assets/source/brand/`. Proportionally scaled application copies live in `public/brand/`; the full Luna Vault logo is used in the sidebar brand area and the Luna logomark is used for compact marks and `app/icon.png`. The full production logo is a deterministic derivative with transparent outer canvas trimmed to improve interface scaling; its visible artwork and aspect ratio remain untouched. Source files are never modified, redrawn, distorted, or reinterpreted.

### Current mock-data strategy

Milestone 1 introduces a small deterministic local-data boundary for the workspace overview:

- `lib/types/workspace.ts` defines the workspace, brand, asset, activity, metric, and attention domain summaries.
- `lib/fixtures/luna-workspace.ts` contains the seeded vaults, notifications, profile, Luna workspace, and brand family. Dates and values are fixed; no data is generated at runtime.
- `lib/data/workspace.ts` is the local access boundary consumed by the root shell and overview route.

`app/overview/page.tsx` obtains its data through that access function and passes it to the overview presentation. Its visible hierarchy is intentionally limited to the vault header, compact metrics, creation actions, and Brand Family. Activity and recently updated assets live in Updates, while actionable requests live in Notifications. Brands routes are working local-data experiences; the remaining product routes are static placeholders. There is still no database, authentication, cloud storage, or persistent mutation.

### Brand Architecture

Milestone 2 adds a focused Brand domain boundary:

- `lib/types/brand.ts` models Brand type, lifecycle, ownership, collaborators, relationships, operational counts, guide completion, and identity-rule inheritance.
- `lib/fixtures/luna-brands.ts` contains the deterministic Luna Parent Brand and four child Brand records.
- `lib/data/brands.ts` is the Brand query boundary used by the root layout and route metadata.
- `components/providers/brand-provider.tsx` contains session-only Brand creation state. Created Brands disappear on refresh and never make a network request.

`/brands` renders the structural Brands index. `/brands/[brandSlug]` renders seeded and session-created Brand details through the shared provider. Unknown slugs show a polished in-product not-found state. Switching away from a Vault while viewing one of its Brand routes returns the user to the Brands index so Brand data does not leak across Vaults.

Reusable Brand components live in `components/brands/` and cover hierarchy, cards, lifecycle and inheritance badges, the inheritance matrix, Brand detail composition, and the Create Brand dialog. Overview Brand Family items and the Brands index share the same detail routes.

## Planned architecture

The following boundaries are directional and do not yet represent files in the repository.

### Mock application state

Milestones 3–6 should extend the typed domain model and deterministic fixtures through the established local access boundaries. Fixture objects should remain outside React components so early workflows stay reviewable without prematurely adding backend infrastructure.

### Future data-service boundary

UI components should depend on application-level queries and commands rather than a storage vendor. The boundary should own loading, errors, object mapping, and mutations so local mock implementations can later be replaced without rewriting presentation components.

### Future Supabase boundary

Supabase is deferred to Milestone 7. Its eventual integration should remain behind the data-service boundary and own authentication, relational persistence, storage, and row-level security. Supabase client calls should not be distributed directly through reusable UI components.

The exact modules and schema will be decided when their milestone begins; they are intentionally not scaffolded today.
