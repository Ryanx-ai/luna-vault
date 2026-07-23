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

The `app/` directory contains the root layout, global CSS, a root redirect to `/brands`, and one page module for each current route:

- `/overview` (compatibility redirect)
- `/assets`
- `/brands`
- `/collections`
- `/guide`
- `/timeline`
- `/activity` (compatibility redirect)
- `/archive`
- `/settings`
- `/packages`

The overview is a working local-data experience. The remaining product pages are static placeholders composed with the shared page scaffold.

### Component categories

- `components/layout/` contains the application shell, sidebar, top bar, and shared page scaffold.
- `components/providers/` contains the client-side selected-vault boundary.
- `components/ui/` contains general-purpose Button and Badge primitives.
- `components/brand/` contains Luna-specific identity rendering.
- `lib/` contains shared utilities and typed navigation configuration.

### Shared layout

`app/layout.tsx` loads deterministic shell and Brand data and wraps every route in `AppShell`. The shell occupies the viewport, offsets its desktop main column from the fixed sidebar, and assigns vertical overflow to the `main` content region. `VaultProvider` owns only the selected local Vault and `BrandProvider` owns session-local Brand state; neither implies persistence or authentication. Persistent top-bar behaviour remains recorded technical debt and is not considered resolved by this architecture.

### UI primitives and styling

Button variants use Class Variance Authority; class names are composed with `clsx` and `tailwind-merge`. Global semantic colour tokens are CSS custom properties exposed through Tailwind. The interface currently has one fixed dark theme.

### Navigation

`lib/navigation.ts` is the source of truth for primary and utility navigation items. Primary navigation is ordered Brands, Collections, Packages, and Timeline; Archive and Settings remain utility destinations. Brands is the active Vault home. Overview redirects to Brands, Activity redirects to Timeline, and Assets and Guide remain inside Brands.

The sidebar exposes one compact active-Vault switcher near its top. Its accessible menu lists the seeded Luna, Kuro, Pangea, and Tethr Vaults, communicates the selected state, and preserves a deferred Create new Vault affordance. Selection updates shell context deterministically without changing routes or persisting state.

The top bar separates global shell concerns from page content. Its persistent-scroll behaviour remains known technical debt:

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

`/brands` is the primary Vault landing experience and answers which Brands exist and where work continues. The former Overview interface is retired; `/overview` remains only as a redirect and no dashboard metrics are duplicated onto Brands. Recent Changes and recent Assets remain in Updates, while actionable requests live in Notifications. There is still no database, authentication, cloud storage, or persistent mutation.

### Brand Architecture

Milestone 2 adds a focused Brand domain boundary:

- `lib/types/brand.ts` models Brand type, lifecycle, hierarchy, ownership, and the three authoritative Identity areas.
- `lib/types/asset.ts` models Brand- and Vault-owned Asset metadata and default category views without storage concerns.
- `lib/fixtures/luna-assets.ts` and `lib/data/assets.ts` establish an empty, typed local data boundary for the next milestone.
- `lib/fixtures/luna-brands.ts` contains the deterministic Luna Brand Family plus one automatic Parent Brand for every other seeded Vault.
- `lib/data/brands.ts` is the Brand query boundary used by the root layout and route metadata.
- `components/providers/brand-provider.tsx` contains session-only Brand creation state. Created Brands disappear on refresh and never make a network request.

`/brands` renders the structural Brands index. `/brands/[brandSlug]` renders seeded and session-created Brand details through the shared provider. Unknown slugs show a polished in-product not-found state. Switching away from a Vault while viewing one of its Brand routes returns the user to the Brands index so Brand data does not leak across Vaults.

Reusable Brand components live in `components/brands/` and cover the three-level hierarchy, simplified cards, lifecycle and identity-state badges, expandable Identity System sections, Brand workspace composition, and the Create Brand dialog. The Brands index and Brand workspaces share the same detail routes.

Brand detail is a workspace rather than a dashboard. Its primary local navigation is Identity, Assets, and Guide. Identity owns Logo, Colour, and Typography; the Asset Library owns documented Brand assets; Guide presents authored documentation and references both without duplicating them.

The architectural rule is: **A Brand should only be defined once. Everything else references it.** Assets remain Brand-scoped, while Guide consumes Brand-owned identity and stores authored documentation only.

Each seeded Vault automatically owns one Parent Brand. Session-created Brands must select an eligible parent and the UI excludes parents that would create a hierarchy deeper than Parent Brand → Sub-brand → Nested Sub-brand. Users do not manually create root Brands.

`components/brands/asset-library.tsx` presents the Brand-scoped working library. Category selection is local presentation state; multiple-file upload, pinning, selection, detail preview, and metadata changes use contained session state. Folder creation remains unavailable, and no cloud storage or persistence is implied.

### Milestone 3 local Asset state

`AssetProvider` owns deterministic fixture Assets and browser-session mutations behind a focused context boundary. It supports adding Assets, pinning, and restrained metadata updates without persistence. `AssetLibrary` provides category views, search, filters, sorting, grid/list presentation, selection, bulk actions, previews, and a real multiple-file input. Uploaded files remain in memory and are scoped by `vaultId` and `brandId`.

Brand creation now distinguishes Sub-brand from Independent Brand. Parent eligibility uses the existing depth calculation, Ryan Chin is the prototype default owner, and inheritance maps only Colour and Typography to the selected parent. The Logo rule always begins Not Configured.

Kuro is the founder's first internal MVP test case. Milestone 3 is complete and awaiting founder review; Milestone 4 has not started.

## Planned architecture

The following boundaries are directional and do not yet represent files in the repository.

### Mock application state

Milestones 3–6 should extend the typed domain model and deterministic fixtures through the established local access boundaries. Fixture objects should remain outside React components so early workflows stay reviewable without prematurely adding backend infrastructure.

### Future data-service boundary

UI components should depend on application-level queries and commands rather than a storage vendor. The boundary should own loading, errors, object mapping, and mutations so local mock implementations can later be replaced without rewriting presentation components.

### Future Supabase boundary

Supabase is deferred to Milestone 7. Its eventual integration should remain behind the data-service boundary and own authentication, relational persistence, storage, and row-level security. Supabase client calls should not be distributed directly through reusable UI components.

The exact modules and schema will be decided when their milestone begins; they are intentionally not scaffolded today.

## LV.MS.003-G architecture refinement

`BrandProvider` now owns session-local hierarchy validation and mutation. The validator enforces Vault isolation, prevents self/circular moves, protects the automatic Parent Brand, and measures the destination plus subtree against the three-level limit. `BrandHierarchy` initiates drag intent, while Brands and Configure Brand require explicit confirmation before mutation.

`IdentityWorkspace` composes Logo, Colour, Typography, and a contained appearance preview. Core Logo roles point to Brand-scoped Asset IDs; local image selection enters the same `AssetProvider`. Supported image previews use object URLs tracked and revoked by the provider. Colour and Typography changes remain component-local.

`BrandThemeTokens` establishes Moonlight Black as the safe default and prepares future Brand-scoped adaptation without changing Luna’s shell or system typography. The desktop sidebar collapse remains session-local and leaves the mobile drawer independent. The known persistent top-bar scrolling issue is unchanged.

## Living Brand boundaries

`BrandProvider.commitIdentity` updates shared Brand rule state in memory. Identity controls keep edits local until Commit. New Logo files remain pending and outside `AssetProvider` while deterministic duplicate review runs; accepted files enter the same Brand-scoped Asset collection used by Guide. Content hashing, SVG structure analysis, and visual similarity remain future work.

Guide sections now use an ordered typed model with section type, source, and tone, preparing page or slide composition without copying Identity or Asset records. `/brands/[brandSlug]/configure` is the dedicated session-local governance surface.

`SHOW_VISION_SURFACES` gates `/cloud` and `/api` navigation for internal development. Both routes are static UI only: no handlers, network calls, OAuth, keys, jobs, or integrations. The shell remains Luna-owned; press-and-hold Brand appearance affects only the Brand header and restores on pointer, key, leave, or blur.
