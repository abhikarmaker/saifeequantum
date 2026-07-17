# Saifee Quantum — Canadian Export & Business Development Website

Marketing site for **Saifee Quantum Inc.** (Toronto) — a Canadian international business
development company helping Canadian businesses expand into international markets,
part of **[Saifee Industries](https://saifeeind.com/)** (parent, Pune, India).
Domain: `saifeequantum.com`.

Single-page structure inspired by Pazago's page layouts (one long page per URL, not
split into thin sub-pages). Logo mark and wordmark styling reference the parent
Saifee Industries brand. Palette: **Blue** (trust) · **Purple** (intelligence) ·
**Grey** (sophistication). Display font: **Montserrat**.

## Run locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

No build step — plain HTML/CSS/JS.

## Single page

Everything lives in `index.html` as one long scrolling page with anchor navigation
and scroll-spy (nav highlights the section currently in view).

| Anchor | Section |
|--------|---------|
| `#home` | Hero, Market Access/Export Fulfilled duo cards, trust stats |
| `#why-us` | Value proposition + stat band |
| `#solutions` | Exporter-stage segments, Product Exporters/Service Providers comparison, how-it-works |
| `#services` | Six export services, global network (India) feature split, mid-page CTA |
| `#sectors` | Industry coverage icon grid (21 categories) |
| `#about` | Story, values, global presence (Toronto + Pune) |
| `#contact` | Contact form (demo) + trade-desk details |

A dedicated "Our Mission" callout sits between the trust strip and `#why-us`.

## Structure

```
assets/css/styles.css              design system (colors, components, responsive)
assets/js/main.js                   sticky nav, mobile menu, scroll reveal, count-up, scroll-spy
assets/img/logo-color.png           brand mark — icon extracted from the Saifee Industries
                                     logo source file, recolored to the blue/violet brand
                                     gradient (transparent background)
assets/img/Saifee Industries_Final Logo-02.jpg   source reference file (not used at runtime)
```

The nav wordmark ("SAIFEE" / "QUANTUM") is built with live CSS text, not baked into the
logo image — sizing/alignment ratios were measured from the parent company's actual
logo file. Nav text is light-on-dark by default (sits over the dark hero) and switches
to dark-on-white once `.scrolled` adds the blurred nav background; the mobile dropdown
menu forces dark text independent of scroll state since it always has a white background.

## Before going live

- Wire the contact form (`form[data-demo]`) to email/CRM — it currently only fakes success.
- Replace placeholder stats, phone number, and testimonial with real figures.
- Add real Open Graph/social preview images and a favicon PNG fallback size set.
- Fonts load from Google Fonts CDN; self-host if you need full offline/CSP control.
