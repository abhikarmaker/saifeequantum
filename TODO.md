# TODO / Checklist

## Production-readiness audit (2026-07-21)
Full pass over both pages: HTML/CSS/JS validity, internal links, images, JSON-LD, sitemap/robots,
accessibility basics, and a real headless-browser check (console errors, failed requests, visual
screenshots at desktop/laptop/mobile widths).

**All passed:**
- [x] HTML valid on both pages (no unclosed tags), CSS braces balanced, JS syntax valid.
- [x] Every internal `#anchor` link (nav + footer, both pages) resolves to an existing `id`.
- [x] Every image `src` resolves to a real file.
- [x] JSON-LD Organization schema parses correctly.
- [x] `sitemap.xml` lists both real pages; `robots.txt` and `CNAME` are consistent.
- [x] All form fields have matching `<label for>`; all `<img>` have `alt` text.
- [x] Zero console errors/warnings and zero failed network requests on either page (checked via headless Chromium).
- [x] Visually confirmed at 1400px/1024px/390px: nav no longer overlaps (see earlier fix), honeycomb tessellates cleanly with no gaps at both desktop and mobile sizes, mobile hamburger menu opens/closes correctly.

**Found and fixed during this audit:**
- [x] [index.html](index.html) footer Email icon was still `href="#"` (dead) while [our-people/index.html](our-people/index.html)'s matching icon already correctly used `mailto:info@saifeequantum.com` — brought index.html in line.
- [x] Our People flip-cards: front face (photo/name/role) was top-aligned inside the fixed-height card, leaving noticeable empty space at the bottom — added vertical centering so it looks intentional instead of unfinished.

**Still open — pre-existing, not addressed in this pass:**
- [ ] Contact form ([index.html](index.html) `#contact`) is explicitly a demo — it doesn't send anywhere. Needs wiring to a real backend/email service before launch.
- [ ] Unused image asset `assets/img/Saifee Industries_Final Logo-02.jpg` — not referenced anywhere; confirm if it's needed for something planned, otherwise remove.
- [ ] See remaining items below (phone number placeholder, LinkedIn dead links, client logo images, og:image banner, HTTPS/DNS) — all still open from earlier passes.

## Major content overhaul (new copy received 2026-07-21)
New Vision/Mission, full team bios, company story, expanded services, market specialties,
free trade agreements, expanded industries list, "Why Choose Us" bullets, and a new
"Our Clients" section were provided. Breaking into per-section tasks below, with the
supplied copy embedded so it can be dropped straight into the HTML.

### Open questions — resolved 2026-07-21
- [x] Spelling: use **"Ebrahimm"** consistently (bio text updated below to match; keep filename `Ebrahimm_bootwala.jpeg` as-is).
- [x] Abhijeet's role changes to **"Chief Research and Development Officer"**, confirmed — but keep existing spelling **"Abhijeit"** as-is (not a typo to fix).
- [x] Joseph Fernandis card is replaced by **Shane Smith** on [our-people/index.html](our-people/index.html) (not kept alongside).
- [x] Industries grid visual pattern — match the honeycomb layout from [saifeeind.com/our-clients/](https://saifeeind.com/our-clients/) (screenshot provided): hexagon tiles arranged in a pyramid/honeycomb, alternating charcoal and gold fills, one icon per hex (no text label), section header styled as small-caps eyebrow ("INDUSTRIES WE CATER") + bold title ("Tailored Solutions for Every Sector"). Replaces the current flat `icon-grid` of square chips-with-labels in [index.html](index.html) `#sectors`.

### Implemented 2026-07-21 — still need real assets
- [x] All sections below are now live in [index.html](index.html) / [our-people/index.html](our-people/index.html).
- [x] **Shane Smith** now uses the real headshot (`assets/img/shane_smith.jpeg`, renamed from `Shane Smith.jpeg` to match the existing snake_case file naming) — placeholder avatar removed.
- [ ] **Our Clients** logos are text-only wordmark cards (no logo images) — swap `.client-card` links for real logo images once assets are available.

### Vision & Mission
- [x] Added a **Vision** statement — new `.vm-card` block alongside Mission in [index.html](index.html) `#vision-mission`.
- [x] Updated the **Mission** quote to the new wording.

### Our People ([our-people/index.html](our-people/index.html))
- [x] **Ebrahimm Bootwala — Founder & CEO** — bio added.
- [x] **Abhijeit Karmaker — Chief Research and Development Officer** — role updated, bio added.
- [x] **Shane Smith — Senior Strategic Advisor, International Business & Global Partnerships** — added in place of Joseph Fernandis, bio added, placeholder avatar (see above).
- [x] Applied the same 3D flip interaction from the Industries honeycomb to these cards (per your request, "just the flip" — not the hexagon shape): front face shows photo + name + role as before; hovering flips the card 180° to reveal the full bio on the back. Card is now a fixed height (440px) with the back scrollable if a bio runs long, since both faces share one box.
- [x] Touch-device fallback added: tapping a card on phones/tablets (detected via `matchMedia('(hover: none)')`) toggles an `.is-flipped` class in [main.js](assets/js/main.js), which flips it the same as `:hover` does on desktop.

### Backed by Saifee Industries / Our Story ([index.html](index.html) `#about`)
- [x] Added "Backed by Saifee Industries" framing paragraph.
- [x] Updated "Our Story" with the specific 1993/Shabbir Bootwala/Burhani Industries/Aziz Bootwala history.

### Services ([index.html](index.html) `#services`)
- [x] Added **Market Research & Intelligence** card with the 5-point sub-list (demand & sizing, competitive landscape, regulatory & tariff review, pricing & margin benchmarks, buyer behavior & channel fit).
- [x] Updated **Compliance & Documentation** copy (licensed customs brokers, HS classification, certificates of origin).
- [x] Updated **Trade Finance** copy (banking & EDC relationships).
- [x] Added new **Cargo & Marine Insurance** card.

### Market Specialty & Free Trade Agreements — new section ([index.html](index.html) `#markets`)
- [x] Added region cards: India & South Asia, Middle East (Dubai, Saudi Arabia), USA, Southeast Asia (Vietnam, ASEAN), Europe (Switzerland, Germany & Nordics).
- [x] Added FTA list (CETA, CPTPP, Canada-UK TCA, CKFTA, EFTA, Canada-Indonesia CEPA) plus bilateral-agreement and ongoing-negotiation tag rows.

### Industries we service ([index.html](index.html) `#sectors`)
- [x] Rebuilt as a **24-item true symmetric diamond honeycomb** (5 rows: 4/5/6/5/4), alternating charcoal (`.hex--dark`) and the site's own blue→violet brand gradient (`.hex--accent`) instead of saifeeind.com's gold.
  - Went through two earlier shapes that didn't read as a honeycomb: a 7-row pyramid (1/2/3/4/5/6/5, looked like a triangle) and a 5-row cluster (5/5/6/5/5, looked disjointed/gappy).
  - Root cause of the "not a honeycomb" look: with these flat-top hexagons stacked in simple centered rows (no vertical overlap — matches saifeeind.com's actual technique), **every adjacent row's hex-count must differ by exactly 1** for the auto-centering to offset them into a true interlocking pattern. 5,5,6,5,5 breaks that (two equal-width row pairs sit flush with zero offset, reading as blocky steps instead of a honeycomb). 4,5,6,5,4 satisfies it at every step (4→5→6→5→4), which is what actually produces the diamond honeycomb look.
  - **Dropped 2 industries to make the diamond math work cleanly: "Electrical Equipment" and "Environmental Technologies"** (picked as the two with the most overlap with neighbors already on the list — Electronics and Renewable Energy, respectively). This was a judgment call, not confirmed with you — if you'd rather drop two different ones (or want a 26-item shape instead, which would need a differently-proportioned diamond), let me know and I'll swap them.
- [x] Checked saifeeind.com/our-clients/'s actual markup/CSS (fetched the live page) to see how their honeycomb behaves — it's a **3D flip card**: each hex has a front face (icon on colored background) and a back face (the industry name, uppercase, on a dark background); hovering rotates the tile 180° on the Y axis (`transform-style:preserve-3d`, `transition:transform .6s`) to reveal the name. There's no hidden filter/click behavior beyond that. Reproduced the same flip mechanic on our hexes (`.hex-inner` / `.hex-front` / `.hex-back` in [styles.css](assets/css/styles.css)) — hover a tile to see the industry name.
- [x] Also matched their actual hex geometry while investigating: flat-top orientation (wide, not tall — their CSS uses `width:150px;height:130px`), rows simply stacked with no vertical overlap trick (the "gaps" in the reference screenshot are real, not an artifact) — simpler than the true zero-gap tessellation math I'd originally built, and now it also gave the flip effect room to work (front/back faces need the hex's full box, which doesn't play well with tight vertical overlap).
- [x] Touch-device fallback added: tap-to-flip via the same `.is-flipped` class/JS as the team cards (see below).
- [ ] Flip-card back text is still unreadable at the smallest mobile hex size (50px tile, font shrinks to ~5.5px) — tap now triggers the flip correctly, but the revealed label may be too small to read at that size. Worth a bigger minimum hex size on the smallest screens, or a simpler static label under a certain width.

### Why Choose Saifee Quantum
- [x] Added the 9-point bullet checklist under the existing Why Us stats.

### Our Clients — new section ([index.html](index.html) `#clients`)
- [x] Added text-wordmark client cards linking to Sulzer, HRS Process, Phoenix Mecano, Wika Instruments, Honda Brazil, Forbes Marshall (see logo-asset note above).

### Nav
- [x] Added "Markets" and "Clients" links to the **footer** nav on both pages. Deliberately left out of the fixed-width **header** nav — it already holds 6 items and only collapses to a hamburger below 720px, so 2 more would risk overflow on laptop-width screens (900–1200px) where there's no wrap fallback.

## Content — needs real business info
- [ ] Replace placeholder phone number `+1 (416) 000-0000` (Contact section in `index.html`, and `telephone` field in the JSON-LD structured data) with the real number, or remove the field until one exists.
- [ ] Footer email icon links to `href="#"` (dead link) — point it to `mailto:info@saifeequantum.com`.
- [ ] Footer LinkedIn icon links to `href="#"` (dead link) — add the real LinkedIn company page URL, or remove the icon until one exists.

## SEO / social
- [ ] Replace `og:image` / `twitter:image` (currently the square `logo-color.png`) with a proper 1200×630 banner image for nicer social share previews.
- [ ] Consider adding `LocalBusiness`/`ProfessionalService` JSON-LD in addition to `Organization`, once real phone/hours are available.

## Hosting / DNS (GitHub Pages + Cloudflare)
- [ ] Enable "Enforce HTTPS" in repo Settings → Pages once the TLS cert finishes provisioning (was `dns_changed` as of 2026-07-19).
- [ ] Fix or remove the `www.saifeequantum.com` subdomain — TLS handshake currently fails (cert doesn't cover `www`).

## Search Console
- [x] Sitemap submitted (`sitemap.xml`).
- [ ] Confirm homepage (`https://saifeequantum.com/`) shows as indexed via URL Inspection (new domain, can take days).
