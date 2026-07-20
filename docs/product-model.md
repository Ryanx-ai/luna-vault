# Luna Vault Product Model

## Conceptual hierarchy

```text
Workspace
└── Brand
    ├── Sub-brand
    ├── Brand Guide
    ├── Collections
    ├── Assets
    │   └── Versions
    ├── Members
    └── Activity
```

## Core objects

### Workspace

The organisation, agency, studio, or client account. It is the administrative boundary for brands, members, and workspace-level settings.

### Brand

The primary identity system. A brand owns its assets, documentation, collections, relationships, and activity.

### Sub-brand

A product, campaign, event, regional identity, internal initiative, or related identity that may inherit from a parent brand. Inheritance and overrides must remain explicit.

### Asset

A documented brand object, not merely a file. It carries identity, purpose, status, ownership, relationships, guidance, and a version history.

### Asset Version

A historical or current file revision belonging to an asset. Exactly one version should be clearly identifiable as current when appropriate.

### Collection

A curated group of assets for a specific use, audience, campaign, channel, vendor, or handover. A collection organises references to assets without duplicating their source of truth.

### Brand Guide

Living documentation connected directly to stored assets. Its guidance evolves with the identity rather than becoming a detached static document.

### Member

A user with controlled access to a workspace or brand. Membership determines the workspaces, brands, and actions available to that user.

### Share Link

A controlled client-facing or vendor-facing view. It exposes an intentional subset of approved information without requiring full workspace membership.

### Activity

A record of meaningful brand-management actions. Activity helps teams understand what changed, when, and by whom.

## Product modes

### Creator mode

For designers, studios, agencies, and brand owners structuring and managing the system. Creator workflows prioritise documentation, relationships, approval, maintenance, and professional presentation.

### Consumer mode

For clients, employees, marketers, developers, vendors, and partners finding and using approved assets. Consumer workflows prioritise certainty, clear guidance, focused discovery, and safe download or sharing.

These modes describe user intent rather than separate products. A single person may move between them depending on the task.
