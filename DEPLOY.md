# AllstarSteven Hub — Deploy & DNS

The parent-brand hub for `allstarsteven.com`. Routes visitors to Japan Finds
and the (coming) Shop, and captures email leads.

## Where it lives

| | |
|---|---|
| **Live now** | https://allstarsteven-hub.vercel.app/ |
| **Production domain (target)** | https://allstarsteven.com — the apex |
| **Repo** | https://github.com/allstarstack/allstarsteven-hub (branch `main`) |
| **Host** | Vercel — its own project, separate from `japan-finds`. Push to `main` auto-deploys. |

`astro.config.mjs` already has `site: 'https://allstarsteven.com'`, so the
canonical URL and Open Graph tags are correct the moment DNS resolves.

---

## Going live — point allstarsteven.com at the hub

Two steps. **Vercel first** — it shows you the exact DNS record.

### a. Add the domain in Vercel

1. Vercel → the **allstarsteven-hub** project → **Settings → Domains**.
2. Add **`allstarsteven.com`**. (If Vercel also offers `www.allstarsteven.com`
   redirecting to the apex, that's fine to accept — optional.)
3. Vercel shows the DNS record it wants for the apex — note the exact value.
   For an apex it's an **A record**, typically pointing at `76.76.21.21`. Use
   whatever Vercel actually displays.

> ⚠️ **Apex only.** This project must own **only** `allstarsteven.com`. The
> `japan.allstarsteven.com` subdomain belongs to the separate **japan-finds**
> Vercel project — do not add `japan` here, and don't move it.

### b. Update Porkbun DNS

1. Porkbun → **Domain Management → `allstarsteven.com` → DNS Records**.
2. **Delete** the existing apex record (the Porkbun parking-page `A`/`ALIAS`
   record on host `@`).
3. **Add** the record Vercel showed:

   | Field | Value |
   |---|---|
   | Type | `A` |
   | Host | `@` (blank — the apex) |
   | Answer / Value | `76.76.21.21` — *or exactly what Vercel displayed* |
   | TTL | leave default (600) |

4. **Leave the `japan` CNAME alone** — host `japan` → `cname.vercel-dns.com`
   stays exactly as is. It serves Japan Finds from a different Vercel project.
   (A future `shop` CNAME for Shopify is out of scope here.)

### c. Wait

DNS propagation is usually under an hour, occasionally up to 24h. Vercel
auto-issues the HTTPS certificate once it sees the record resolve. Check
progress with `dig allstarsteven.com` or whatsmydns.net — **don't panic if the
old parking page lingers at hour 2.** The site stays reachable at the
`.vercel.app` URL throughout.

---

## Deploys

- **Deploy:** push to `main` → Vercel builds and deploys (~1 min).
- **Roll back:** Vercel → project → **Deployments** → pick the last good one →
  **⋯ → Promote to Production** (instant, no rebuild).
- **Run locally:** `npm install`, then `npm run dev`.

---

## Open follow-ups

Placeholders shipped per the build owner's call — swap real values anytime
(edit the component, commit, push):

- **Social handles** — `src/components/SocialRow.astro` has Instagram + TikTok
  `@allstarsteven`. Confirm the handles; add YouTube (and any others) when the
  channel handle is known.
- **Shop description** — `src/pages/index.astro` reads *"Things I actually use.
  Late 2026."* Confirm the wording / launch timing.
- **OG image** — `public/og-image.png` is a text-only placeholder (the wordmark
  on Rice White). Swap in a creator-shot image when ready.
- **Kit list** — the email form reuses the **Japan Finds** Kit list
  (form `9451873`), not a separate parent-brand list. Hub and Japan Finds
  subscribers share one list. To split them later, create a new inline Kit
  form and replace the embed in `src/components/KitForm.astro`.
- **Favicon** — `public/favicon.svg` is an `AS` text monogram; it renders in a
  system bold face (an SVG `<text>` favicon can't load the web font). Swap for
  an outlined-path version if exact Space Grotesk is wanted.
