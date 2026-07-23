# Luna Vault Product Model

## Conceptual hierarchy

```text
Vault
└── Brand Family
    └── Brand
        ├── Identity
        │   ├── Logo
        │   ├── Colour
        │   ├── Typography
        ├── Assets
        └── Guide
```

**A Brand should only be defined once. Everything else references it.** Assets remain conceptually scoped to the Brand that owns and explains them.

## Core objects

### Vault

The active environment for a connected brand system. It is the administrative and navigational boundary for its Brand Family, collaborators, and Vault-level settings.

### Brand Family

The structural view of every related Brand in a Vault. The supported product model should expose no more than three visible identity levels: Parent Brand, Sub-brand, and Nested Sub-brand. Whether the third level is required will be validated through real use rather than assumed.

### Brand

The primary identity system. A brand owns its assets, documentation, collections, relationships, and activity.

Every Vault automatically owns one Parent Brand. Users create Sub-brands or Nested Sub-brands beneath the existing family; the supported hierarchy stops at three levels.

Users may also create an Independent Brand as another top-level Brand within the active Vault. Creation defaults to Sub-brand. When parent identity inheritance is enabled, only Colour and Typography inherit; Logo remains Not Configured and Assets and Guide are never inherited automatically.

### Identity

The Brand's authoritative source for Logo, Colour, and Typography. Statuses such as Inherited, Overridden, Unique, and Not Configured explain how each area is resolved without making inheritance the user's primary task.

Guide, Collections, Packages, exports, developer kits, and future generators consume Brand-owned Identity and Assets. They must not own duplicate definitions.

### Sub-brand

A product, campaign, event, regional identity, internal initiative, or related identity that may inherit from a parent brand. Inheritance and overrides must remain explicit.

### Asset

A documented brand object, not merely a file. It carries identity, purpose, status, ownership, relationships, guidance, and a version history.

Assets always belong to a Brand. Future utilities may derive approved outputs such as alternate formats, resized files, favicons, or social avatars, but those outputs must remain traceable to an unchanged approved source asset.

Each Asset also belongs to a Vault and has one primary category plus tags, lifecycle status, pinning, attribution, file metadata, description, and usage notes. Folders are queryable views of these records rather than ownership containers. Upload accepts multiple browser-selected files and collects category, tags, status, and description before a person confirms the result.

Milestone 3 implements this as deterministic fixtures plus contained session state. Multiple browser-selected files can be described, classified with a confirmed category, and added without network or storage calls. Pinning and metadata changes update the same Asset object used by the Brand library and Logo Identity gallery.

### Asset Version

A historical or current file revision belonging to an asset. Exactly one version should be clearly identifiable as current when appropriate.

### Collection

A curated group of assets for a specific use, audience, campaign, channel, vendor, or handover. A collection organises references to assets without duplicating their source of truth.

A Collection is a committed external release: an intentional, reviewable set whose contents should not drift silently when its source Assets change.

### Package

A generated technical delivery assembled from Brand-owned source data for a declared consumer or platform. Packages may serve a website, native application, game engine, developer handoff, or production vendor without becoming a second Brand definition.

### Brand Guide

A living README connected directly to the Brand's Identity and selected Assets. It owns authored material such as Brand Story, Mission, Vision, Principles, Audience Notes, Voice, usage guidance, do/don't guidance, examples, and additional documentation—but never duplicate Brand values.

### Member

A user with controlled access to a Vault or Brand. Membership determines the Vaults, Brands, and actions available to that user.

### Share Link

A controlled client-facing or vendor-facing view. It exposes an intentional subset of approved information without requiring full workspace membership.

### Timeline

A chronological record of meaningful Brand changes. Timeline helps teams understand how the active Vault and Brand Family evolved, what changed, when, and by whom.

## Product modes

### Creator mode

For designers, studios, agencies, and brand owners structuring and managing the system. Creator workflows prioritise documentation, relationships, approval, maintenance, and professional presentation.

### Consumer mode

For clients, employees, marketers, developers, vendors, and partners finding and using approved assets. Consumer workflows prioritise certainty, clear guidance, focused discovery, and safe download or sharing.

These modes describe user intent rather than separate products. A single person may move between them depending on the task.

## Cross-Vault behaviour

Luna Vault has not committed to whether Brands can be duplicated, transferred, shared, or referenced across Vaults. Kuro is the first internal MVP test environment; its use will inform which of those behaviours solves a real operational need without weakening the Vault boundary.

Milestone 3 is complete. Brand creation and Asset Library changes remain local to the browser session and reset on refresh. Milestone 4 has not started.

## Founder-review model refinement

Brand hierarchy is editable session-locally through confirmed re-parenting. Moves remain inside one Vault, reject self/circular relationships, and preserve the three visible levels of Parent Brand, Sub-brand, and Nested Sub-brand. Configure Brand provides the keyboard-accessible equivalent to drag-and-drop.

Identity prioritises three connected Logo Asset roles—Full Logo, Wordmark, and Logomark—alongside a structured Colour palette and Typography specimen. Logo references reuse Asset records; they are not duplicate files. Guide consumes these Brand and Asset records as a vertical living document. Moonlight Black is the default Brand-theme token set; Brand-adaptive appearance remains a contained preview concept.

## Commit and governance

Identity has an editing/preview state and a selected Brand state. Commit validates and applies the latter for the current browser session. Logo Commit accepts a new Asset only after deterministic duplicate review based on Brand, role, normalized filename, size, and MIME type. Configure Brand governs General details, hierarchy, ownership, access, appearance, Commit behaviour, future permissions, integrations, and high-impact controls.

The seeded Luna family is Luna, Luna Vault, Luna Cloud, Luna Studio, Luna AI, Luna API, and Luna Runtime. Cloud and API application pages are internal Vision Surfaces behind one local feature boundary; they are not domain integrations or backend services.
