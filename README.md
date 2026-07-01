# Astro Starlight example with Encatch

Sample Astro Starlight docs site with Encatch page feedback in the footer.

<table>
<tr>
<td valign="top">
<p><strong>Don't have the feedback form yet?</strong></p>
<p>Click the button to install a ready-made documentation feedback form in your Encatch workspace. It creates the combined form used in this example — helpful votes, suggest edits, and issue reports — with no manual form builder setup.</p>
</td>
<td align="center" valign="middle" width="210">
<a href="https://templates.encatch.com/templates/preview/documentation-frameworks/docs-feedback"><img src="https://encatch.com/button" alt="Encatch it" width="210" height="42"></a>
</td>
</tr>
</table>

## Setup

```bash
pnpm install
```

**Option A — Install the form:** use the button above if you need the feedback form created in Encatch.

**Option B — Wire this site:** Copy `.env.example` → `.env` and set your Encatch publishable key and combined form slug / question slugs.

**Publishable key:** [admin.encatch.com](https://admin.encatch.com) → **Settings** → **Publishable key**.

## Run

```bash
pnpm dev
```

Docs at http://localhost:3000/

## Encatch integration

This example uses the same pattern as the Fumadocs examples:

1. **`.env`** — publishable key + combined form slug and question slugs (from `.env.example`).
2. **`src/components/encatch.ts`** — SDK init, env, and form helpers.
3. **`src/components/DocsPageFeedback.tsx`** — footer UI (React island).
4. **`src/components/EncatchPageFrame.astro`** — mounts `<EncatchInit locale={...} />`.
5. **`src/components/EncatchFooter.astro`** — renders `<DocsPageFeedback />` on doc pages.

Environment variables use Astro’s `PUBLIC_ENCATCH_*` prefix.
