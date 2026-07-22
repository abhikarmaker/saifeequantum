# TODO / Checklist

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
