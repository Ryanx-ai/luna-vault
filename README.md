# Luna Vault

> The living workspace for your brand.

Luna Vault is a living workspace for organising, documenting, handing over, and managing brand systems.

The product is in active early development. Milestone 3 — Brand-Scoped Asset Library is complete and ready for founder review. Brands is the primary Vault workspace, Timeline records Brand evolution, and Brand creation and Asset Library workflows run in contained browser-session state. Persistent data remains intentionally deferred.

## Product vision

A logo is a file. A brand is a system.

Luna Vault is where brands live after they are designed. It brings approved assets, usage guidance, history, ownership, and brand relationships into one structured workspace so creators can hand over identities professionally and teams can use them with confidence.

Read the [product vision](docs/vision.md), [product principles](docs/principles.md), and [founder note](FOUNDER.md) for more context.

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/brands`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run typecheck` | Check TypeScript without emitting files |

## Current routes

- `/overview` (compatibility redirect to `/brands`)
- `/assets`
- `/brands`
- `/brands/[brandSlug]`
- `/collections`
- `/packages`
- `/guide`
- `/timeline`
- `/activity` (compatibility redirect to `/timeline`)
- `/archive`
- `/settings`

## Documentation

- [Vision](docs/vision.md)
- [Product principles](docs/principles.md)
- [Product model](docs/product-model.md)
- [Build roadmap](docs/roadmap.md)
- [Application architecture](docs/architecture.md)
- [Architecture decisions](docs/decisions/README.md)
- [Founder note](FOUNDER.md)

## Technology

Next.js 15, React 19, TypeScript, Tailwind CSS, and the Next.js App Router.

**Current milestone:** Milestone 3 — Brand-Scoped Asset Library (complete, pending founder approval). Milestone 4 has not started. See the [roadmap](docs/roadmap.md) for the planned sequence of reviewable product increments.
