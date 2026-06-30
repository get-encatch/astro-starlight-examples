# Astro Starlight example with Encatch

Sample Astro Starlight docs site with Encatch page feedback in the footer.

## Setup

```bash
pnpm install
```

Copy `.env.example` → `.env` and set your Encatch publishable key and combined form slug / question slugs.

**Publishable key:** [admin.encatch.com](https://admin.encatch.com) → **Settings** → **Publishable key**.

## Run

```bash
pnpm dev
```

Docs at http://localhost:3000/ (English) and http://localhost:3000/es/ (Spanish).

## Encatch integration

This example uses the same pattern as the Fumadocs examples:

1. **`.env`** — publishable key + combined form slug and question slugs (from `.env.example`).
2. **`src/components/encatch.ts`** — SDK init, env, and form helpers.
3. **`src/components/DocsPageFeedback.tsx`** — footer UI (React island).
4. **`src/components/EncatchPageFrame.astro`** — mounts `<EncatchInit locale={...} />`.
5. **`src/components/EncatchFooter.astro`** — renders `<DocsPageFeedback />` on doc pages.

Environment variables use Astro’s `PUBLIC_ENCATCH_*` prefix.
