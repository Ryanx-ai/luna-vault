# Luna Vault Founder Log

This log records what changed in the founder's understanding of the product, what surprised us, what should intentionally not be built next, and why each milestone matters beyond the code. It complements the technical development log with the product reasoning that should guide future decisions.

## Standard milestone reflection workflow

Before a milestone is marked complete, require:

1. implementation complete
2. visual review complete
3. validation complete
4. commit complete
5. push complete
6. development log updated
7. founder log updated

Append a reflection here and a technical record in [`docs/devlog.md`](docs/devlog.md) at the end of every future milestone. Preserve earlier reflections; they are part of the product's decision history.

## Milestone 1 — Workspace Overview

### What this milestone proved

Milestone 1 proved that Luna Vault can feel like a real operational workspace rather than a static asset folder. The overview now begins to answer:

- what brands exist
- what assets changed
- what needs attention
- how the brand family is structured
- what the user should do next

### What changed in the product understanding

The overview is not primarily an analytics dashboard. Its real role is to give users operational clarity and confidence across their brand workspace. Metrics support that understanding, but they are not the centre of the product.

The core product surfaces are:

- recent assets
- brand family
- needs attention
- activity
- next actions

### What surprised us

The Luna brand-family model already feels like one of the product's strongest differentiators. Luna Vault begins to feel distinct from Google Drive or Dropbox when it shows relationships between a parent brand and sub-brands rather than only folders.

### What should intentionally not be built next

- no Supabase yet
- no real uploads yet
- no AI
- no automatic resizing
- no permissions
- no advanced analytics
- no visual over-polishing before the workflow is validated

### Founder principle reinforced

**Storage is not the product. Confidence is.**

**A brand is not a folder.**

### Next product question

For Milestone 2, the next question is:

**How is my brand structured?**

## Milestone 1.1 — Overview and Navigation Refinement

### What this refinement clarified

**Vault** is a deliberate product noun. It distinguishes Luna Vault from folders and generic workspaces: a vault is the operational home for a brand system, while brands and sub-brands describe the identity family living inside it.

The simplified overview is more useful for designers because it answers the essential questions quickly instead of presenting every available data point at once. Brand Family now carries the page because structure, inheritance, and relationships are the product's clearest point of difference.

### Product-language decisions

- use **collaborators**, not members, because participation is creative and operational
- place Activity and Recent assets inside **Updates** as two related but distinct views
- reserve **Notifications** for actionable requests rather than duplicating the activity feed
- keep **Brand Family** central to how a vault is understood

### Founder principle reinforced

Clarity does not come from adding more modules. It comes from giving each piece of information one clear home and making the most important relationship impossible to miss.

The interface should help a designer understand the state of a brand system at a glance, then move with confidence. Feature quantity is not the measure of progress.

### What remains intentionally deferred

Milestone 1.1 does not begin Milestone 2. Real vault management, persistent switching, search, notification workflows, uploads, authentication, storage, and brand hierarchy editing remain future work.

## Milestone 1 closure fix — Essential actions remain visible

The simplified Overview should remain quiet without hiding the actions that establish how the product will be used. Create Brand and Upload Assets belong in the Vault header because they are essential entry points, not dashboard content. Create Vault belongs beside the Vaults label as a compact signal that Luna Vault will support multiple brand environments.

The global top bar is infrastructure: breadcrumb, search, updates, notifications, and profile must remain available while the user explores long content. This correction preserves the simplified canvas while restoring those essential controls. Milestone 2 has not started.

## LV.MS.001-B — Creation belongs in the workflow

Create Brand and Upload Assets now sit between the Vault's metrics and Brand Family. Manage Vault remains in the header because it governs the Vault; creation actions belong in the working flow because they move the brand system forward.

The resulting hierarchy is clearer: **Vault identity → Vault state → creation → brand structure.** This closes Milestone 1 without beginning Milestone 2.

## LV.SHELL.001 — Shell prerequisite closure

The desktop shell no longer allows the top-bar surface to overlap the sidebar logo and header area. The main column now begins with a real offset at the right edge of the fixed 240px sidebar, preserving a clearer boundary between global navigation and workspace content.

The top bar still visually scrolls with the page in founder testing. That behaviour remains an explicit technical-debt item rather than a solved claim: **the top bar shell offset is corrected, but persistent top-bar behaviour still requires a future focused investigation against the actual browser scroll container.** It is intentionally deferred so Milestone 2 can proceed, and no Milestone 2 product implementation has started.

## Milestone 2 — Brand Architecture

Milestone 2 turned Brand Family from a useful Overview element into navigable Brand Architecture. The core question was simple: **How is my Brand structured?** The answer now includes where a Brand sits, who owns it, what it inherits, what it overrides, and which rules are uniquely its own.

Inheritance is a defining difference between Luna Vault and ordinary storage. A folder can contain a logo, but it cannot explain whether a child Brand shares the Parent Brand's typography, replaces its colour system, or has no imagery rule yet. Those relationships and decisions are part of the Brand itself.

**A Brand is not a folder.** A Brand is defined by relationships and rules, not only by its assets.

### What should intentionally not be built next

- no persistence or Supabase yet
- no authentication or permissions
- no real uploads
- no guide editing
- no approval workflow
- no complex Brand health score
- no top-bar redesign inside a product milestone

Milestone 3 should focus on discovering and understanding assets inside this established Brand structure, without weakening the architecture into a generic file browser.

## LV.IA.001 — The workspace follows the Brand system

This refinement made the product hierarchy explicit: **Vault → Brand Family → Brand → Assets.** The sidebar now selects the environment instead of displaying every Vault as permanent navigation, and Overview is once again a quiet statement of Vault identity, state, and Brand structure.

The most important product correction is that assets no longer read as a peer of Brands. An asset only becomes useful when its Brand gives it context, purpose, approval, and history. Upload therefore begins from Brand detail, while the preserved direct Assets route explains that relationship instead of implying a generic file library.

Each surrounding surface now has one job:

- Collections prepares controlled external handover.
- Packages supports development delivery.
- Guide is living brand documentation.
- Activity is the history of meaningful Brand change.
- Archive preserves shelved identities and their context.
- Settings governs the active Vault.

Kuro will be the first internal MVP test environment. It should teach us whether a third Brand level is genuinely needed and whether cross-Vault duplication, transfer, sharing, or references solve real work. Those behaviours remain intentionally uncommitted until that use produces evidence.

Future asset automation should protect designer intent: approved source assets remain unchanged, while resized files, alternate formats, favicons, and social avatars become traceable approved outputs.

### What should intentionally not be built in this refinement

- no Milestone 3 Asset Library
- no real upload or storage flow
- no cross-Vault operations
- no speculative hierarchy beyond three visible levels
- no persistence, authentication, permissions, or Supabase
- no top-bar redesign

The unresolved persistent top-bar behaviour remains technical debt and was not claimed as solved. This pass establishes where things belong; the next milestone can now design asset discovery within that architecture.

## LV.MS.002-D — The Brand owns the truth

The final Milestone 2 pass clarifies Luna Vault's defining product rule: **the Brand owns its Identity once.** Logo, Colour, Typography, and Graphic Assets are Brand variables. Guide, Collections, Packages, exports, developer kits, future AI, and future website generation should reference those variables rather than create parallel identity records.

Brand detail is therefore a workspace, not a dashboard. Its job is to configure and understand the Brand. Inheritance remains visible through status badges, but it is an implementation detail—not the task users believe they are performing.

Every Vault now begins with its own automatic Parent Brand. Users add Brands beneath that root in a familiar family structure, and the product deliberately stops at three levels. This protects clarity while leaving enough room for Parent Brand, Sub-brand, and Nested Sub-brand relationships.

Create Brand should take seconds. A name is sufficient; parent placement, description, owner, and inheritance mode are refinements rather than gates.

The Guide owns language and explanation: story, mission, vision, voice, usage guidance, do/don't guidance, examples, and additional documentation. It does not own another copy of the logo, palette, type system, or graphic assets.

No Milestone 3 workflow was started. The next founder review should confirm that the Brand workspace feels like the operating centre of the system before any asset library is built.

## Milestone 2 — Final Founder Reflection

### What changed

Milestone 2 turned Luna Vault from a workspace with Brand cards into a living Brand-system model.

### What became clear

A Brand is not a dashboard, folder, or collection of files.

A Brand owns its Identity System. Guide, Collections, Packages, exports, and future utilities should consume that Identity rather than duplicate it. Every Vault automatically owns a Parent Brand; users do not manually create root Brands, and the MVP hierarchy stops at three levels. Brand name is the only required creation field, while Assets remain conceptually scoped to Brands. Kuro will be the founder's first internal MVP test case.

### Product principle established

**A Brand should only be defined once. Everything else references it.**

### What should intentionally wait

- real uploads
- Supabase
- persistence
- automatic resizing
- cross-Vault asset transfer
- Guide editing
- Packages
- Collections
- Milestone 3 implementation

### Next founder action

Test Milestone 2 tomorrow before making additional product changes.

## LV.MS.002-E — Asset Library Architecture Refinement

Founder review clarified that Graphic Assets is not a fourth Identity rule. Identity is Logo, Colour, and Typography; Assets is the Brand-owned library beside it, and Guide is the living README that references both.

The library is intentionally metadata-first. An Asset belongs to a Vault and Brand, while folders are views driven by category and metadata. Future upload suggestions must be deterministic, inspectable, and confirmed by a person. Collections represent committed external releases; Packages generate technical deliveries, including the demanding case of assets prepared for games and applications.

This is a computer-engineering boundary pass, not Milestone 3. It establishes types, empty fixture access, and interaction language without adding storage, persistence, AI, or working uploads. The persistent top-bar issue remains untouched technical debt.

## LV.MS.002-F — Milestone 2 Closure

Milestone 2 received its final user-facing copy polish. Internal architecture and development language has been removed from the product interface so Luna Vault now speaks plainly to designers, Brand owners, clients, and collaborators.

The underlying Brand architecture remains unchanged. This pass improves what people read: clear names, states, available actions, hierarchy, and useful empty-state guidance. Milestone 2 is approved and complete. Milestone 3 has not started.

## Milestone 3 — From structure to daily Asset work

The LVMH mental-model test made Brand creation clearer: a new Brand is either a Sub-brand within a family or an Independent Brand at the top of a Vault. Sub-brand is the default because it reflects the most common family-building action. The `Inherit parent identity` switch deliberately carries only Colour and Typography; Logo remains unique and begins unconfigured.

Milestone 3 shifts Luna Vault from defining structure to doing daily Asset work. Kuro now has a realistic Brand-scoped library where a creator can find, filter, pin, select, preview, and add Assets. Categories remain metadata-driven views. Upload suggestions are simple and explainable, and the creator always confirms the destination.

The automatic root remains controlled by the Vault owner. Collaborator permissions are recorded but not implemented. All Brand and Asset mutations remain in the browser session, and Milestone 4 has not started.
