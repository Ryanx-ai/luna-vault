# Luna Vault Build Roadmap

Each milestone is intentionally narrow enough to produce one reviewable product increment and one meaningful Git commit.

## Milestone 0 — Foundation

**Status:** Complete

**Objective:** Establish the application architecture and visual language.

**Included scope:** Next.js, TypeScript, Tailwind, responsive application shell, sidebar, top navigation, design tokens, placeholder routes, Luna brand assets, and production-build validation.

**Explicit non-goals:** Product workflows, application data, authentication, database, uploads, storage, and versioning.

**Definition of done:** All shell routes render successfully at desktop and mobile widths, type checking and the production build pass, and the foundation is committed. This milestone will not be expanded further.

## Milestone 1 — Workspace Overview

**Status:** Complete

**Objective:** Create a convincing working workspace using realistic local mock data.

**Included scope:** Workspace identity and switcher, overview metrics, recent assets, recent brands, recent activity, quick actions, meaningful empty states, and a seeded Luna demo workspace.

**Explicit non-goals:** Database, authentication, persistence, uploads, and complete brand or asset workflows.

**Definition of done:** The overview communicates the state of a realistic workspace, all displayed data comes from deterministic typed local state through a dedicated access boundary, and desktop and mobile views pass validation. Completed with the seeded Luna brand family, operational metrics, recent assets and activity, attention items, quick actions, and reusable empty-state treatment.

## Milestone 1.1 — Overview and Navigation Refinement

**Status:** Complete

**Objective:** Refine the founder-reviewed overview into a quieter, clearer vault command centre before expanding the product surface.

**Included scope:** Simplified overview hierarchy, compact metrics, central Brand Family list and grid views, multi-vault sidebar context, sticky top bar, Search Vault entry point, separated Updates and Notifications, profile controls, collaborator terminology, and production logo scaling refinement.

**Explicit non-goals:** New product workflows, persistent vault switching, real search, real notifications, uploads, authentication, Supabase, storage, and Milestone 2 brand-management features.

**Definition of done:** The overview contains only the vault header, metrics, and Brand Family; shell navigation communicates vault context consistently; activity, assets, and actionable requests are clearly separated; desktop and mobile validation pass; and the refinement is committed and pushed without beginning Milestone 2.

## Milestone 2 — Brands and Brand Families

**Status:** Complete

**Objective:** Establish navigable Brand Families and make each Brand the single source of truth for its Identity System.

**Included scope:** Brands index, brand detail, create-brand interface, sub-brand hierarchy, inherited versus overridden indicators, ownership, metadata, brand switching, and local mock state.

**Explicit non-goals:** Persistent creation, asset-library implementation, guide editing, permissions, and real collaboration.

**Definition of done:** A user can navigate a representative three-level Brand Family, create a session-local Brand with only its name required, and understand Logo, Colour, Typography, and Graphic Assets as one Brand-owned Identity System. Completed with automatic Parent Brands, Identity/Graphic Assets/Guide workspace navigation, visible identity states, Vault isolation, and deterministic local state.

## LV.IA.001 — Workspace architecture refinement

**Status:** Complete

**Objective:** Clarify the product hierarchy and give every top-level surface one deliberate role before Asset Library work begins.

**Included scope:** Compact active-Vault switcher, simplified Overview, Brand-scoped mock upload entry, revised primary navigation, Packages placeholder, contextual purpose copy, and product-model documentation.

**Explicit non-goals:** Milestone 3 product implementation, real uploads, cross-Vault operations, hierarchy expansion, persistence, storage, authentication, and top-bar redesign.

**Definition of done:** The application consistently communicates Vault → Brand Family → Brand → Assets; all routes and responsive shell behaviours validate; and the refinement is committed without beginning Milestone 3.

## LV.MS.002-D — Brand System Refinement

**Status:** Complete

**Objective:** Establish the Brand as the single source of truth and close Milestone 2 with a workspace model rather than a Brand dashboard.

**Included scope:** Name-first Brand creation, automatic Parent Brands, three-level hierarchy preparation, simplified Brand Family presentation, Identity/Graphic Assets/Guide workspace navigation, four expandable Identity System sections, and presentation-only future structures.

**Explicit non-goals:** Milestone 3, real uploads, storage, persistence, Guide editing, asset galleries, automatic outputs, shell changes, and top-bar technical-debt work.

**Definition of done:** Each Vault owns one root Brand; identity data has one Brand-owned home; consumers reference that source; creation remains fast and local; responsive and production validation pass.

## Milestone 3 — Asset Library

**Status:** Not started

**Objective:** Build the primary asset-management experience.

**Included scope:** Asset grid and list, search, filters, sorting, status badges, categories, selection, metadata, mock upload flow, and local preview assets.

**Explicit non-goals:** Cloud storage, persistent uploads, detailed asset documentation, version history, and automated conversion.

**Definition of done:** Users can discover, filter, inspect, and select representative local assets, and complete a clearly labelled mock upload flow across supported viewport sizes.

## LV.MS.002-E — Asset Library Architecture Refinement

**Status:** Complete

**Objective:** Simplify the Brand workspace and prepare a disciplined Brand-scoped Asset Library boundary before Milestone 3.

**Included scope:** Identity/Assets/Guide navigation, structured Identity placeholders, category-view Asset Library presentation, typed Asset metadata, empty fixture/data boundaries, workspace Guide navigation removal, and product-model records.

**Explicit non-goals:** Milestone 3 implementation, real upload, storage, persistence, AI interfaces, automated classification, Guide editing, shell changes, and top-bar debt investigation.

**Definition of done:** The repository clearly separates Identity, Assets, and Guide; assets remain owned by Brand and Vault rather than folders; downstream Collection and Package roles are recorded; validation passes.

## Milestone 4 — Asset Documentation and Versioning

**Objective:** Turn files into documented brand objects.

**Included scope:** Asset detail, usage guidance, formats, dimensions, owner, approver, related assets, version timeline, current-version clarity, archived and superseded states, and mock version replacement.

**Explicit non-goals:** Real file replacement, approval notifications, storage integration, bulk workflows, and automated metadata extraction.

**Definition of done:** Every demo asset exposes meaningful context, its current version and status are unmistakable, and a local replacement flow updates the presented version timeline.

## Milestone 5 — Living Brand Guide

**Objective:** Connect brand documentation directly to stored assets.

**Included scope:** Guide-section navigation, logo guidance, colours, typography, iconography, imagery, patterns, templates, linked asset previews, inherited guide rules, and editable mock content.

**Explicit non-goals:** Multi-user editing, publishing workflow, revision history, public sharing, and persistent content.

**Definition of done:** A representative guide can be navigated and locally edited, its sections reference existing assets, and inherited guidance is visibly distinct from brand-specific rules.

## Milestone 6 — Collections and Professional Handover

**Objective:** Deliver Luna Vault's initial acquisition wedge: professional brand handover.

**Included scope:** Collections, core logo pack, social media pack, press kit, presentation templates, client handover page, approved-assets-only presentation, designer or studio attribution, polished public-facing layout, and mock sharing controls.

**Explicit non-goals:** Real public URLs, authentication, access enforcement, download analytics, payments, and cloud-backed sharing.

**Definition of done:** A designer can assemble a representative handover from approved local assets and preview a polished, focused client-facing experience.

## Milestone 7 — Application State and Supabase

**Objective:** Replace mock state with persistent infrastructure.

**Included scope:** Supabase project setup, database schema, authentication, workspaces, brands, sub-brands, assets, asset versions, collections, guide sections, activity records, storage buckets, and row-level security.

**Explicit non-goals:** Advanced permissions, broad public sharing, operational approval workflows, asset intelligence, and billing.

**Definition of done:** Core product objects persist across sessions, authorised users can access only permitted records and files, migrations are reproducible, and existing milestone workflows use the data-service boundary.

## Milestone 8 — Permissions and Sharing

**Objective:** Support real teams and controlled external access.

**Included scope:** Owner, admin, editor, and viewer roles; invitations; brand-level access; private and public shares; password protection; expiry controls; and vendor and client views.

**Explicit non-goals:** Enterprise identity providers, custom role builders, advanced audit exports, billing, and automated provisioning.

**Definition of done:** Role and brand boundaries are enforced end to end, invitations work, and each supported share mode exposes only its intended content under tested access conditions.

## Milestone 9 — Operational Brand Management

**Objective:** Make Luna Vault useful after initial handover.

**Included scope:** Approval flows, activity history, archived assets, replacement notices, ownership, asset review dates, download activity, notification foundations, and brand-health indicators.

**Explicit non-goals:** AI recommendations, complex workflow builders, enterprise compliance tooling, and automatic asset transformation.

**Definition of done:** Teams can identify work requiring attention, approve or retire assets, trace meaningful changes, and understand the operational health of a representative brand.

## Milestone 10 — Intelligent Asset Utilities

**Objective:** Introduce automation only after the core product is proven.

**Included scope:** Candidate utilities include automatic resizing, format conversion, favicon and social-avatar generation, duplicate detection, missing-format detection, metadata extraction, and brand-consistency checks.

**Explicit non-goals:** Generative brand design, replacing designer judgement, open-ended AI generation, and bundling every candidate utility into one release.

**Definition of done:** A separately prioritised utility solves a validated user problem, preserves source assets, produces reviewable output, and strengthens rather than bypasses Luna Vault's structured brand model.

These utilities are explicitly post-MVP. Each should be evaluated and scoped as its own reviewable increment before implementation.

## LV.MS.002-F — Milestone 2 Closure

**Status:** Complete

Milestone 2 received its final user-facing copy polish. Active product surfaces now prioritise plain Brand language and no longer expose internal architecture or development-stage explanations. Milestone 2 is approved and complete; Milestone 3 remains not started.

## LV.MS.003 — Brand-Scoped Asset Library

**Status:** Complete

**Objective:** Let users add, organise, preview, and confidently reuse Assets inside a Brand.

**Completed scope:** Revised Brand creation, deterministic Kuro Assets, metadata-driven category views, grid/list presentation, search, filters, sorting, pinning, detail preview, bulk actions, confirmed multi-file upload, shared Logo Asset references, responsive layouts, and strict Brand/Vault isolation.

**Local-only limitations:** Brand and Asset changes reset on refresh. No cloud storage, authentication, permissions, production downloads, deletion, generated variants, Guide editing, Collections, Packages, or Milestone 4 versioning was added.
