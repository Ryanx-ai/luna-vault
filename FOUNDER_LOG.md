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
