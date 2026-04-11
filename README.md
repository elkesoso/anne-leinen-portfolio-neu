# Anne Leinen – Portfolio-Website

Offizielle Portfolio-Website der Berliner Künstlerin Anne Leinen (@artful__anne).

---

## Tech-Stack

| Was | Womit |
|-----|-------|
| HTML/CSS | Tailwind CSS via CDN (kein Build-Schritt) |
| Design-Tokens | `tokens.js` (Tailwind-Config + CSS Custom Properties) |
| Kontaktformular | Vercel Serverless Function (`api/send.js`) + Resend API |
| Hosting | Vercel (automatisch deployt via Coolify → GitHub) |
| Bilder | WebP-optimiert (`INHALTE/kunstwerke/alle-gemaelde/webp/`) |

---

## Seiten

| Datei | URL | Beschreibung |
|-------|-----|--------------|
| `index.html` | `/` | Startseite: Hero, Galerie-Slider, Kontaktformular |
| `artworks.html` | `/artworks` | Vollständige Gemälde-Galerie mit Lightbox |
| `exhibitions.html` | `/exhibitions` | Aktuelle & vergangene Ausstellungen |
| `contact.html` | `/contact` | Kontaktformular + Info |
| `impressum.html` | `/impressum` | Impressum |
| `datenschutz.html` | `/datenschutz` | Datenschutzerklärung |

---

## Lokales Arbeiten

Einfach `index.html` im Browser öffnen — kein Build-Schritt nötig.  
Bilder-Pfade sind relativ (`assets/...`, `INHALTE/...`) → funktioniert lokal und auf dem Server.

---

## Deployment

Push auf `main` → Coolify deployt automatisch auf Vercel.  
GitHub-Repo: `github.com/elkesoso/anne-leinen-portfolio-neu`

---

## Projektstruktur

```
anne-leinen-portfolio/
├── index.html              Startseite
├── artworks.html           Kunstwerke-Galerie
├── exhibitions.html        Ausstellungen
├── contact.html            Kontakt
├── impressum.html
├── datenschutz.html
├── tokens.js               Design-Tokens (Farben, Schriften)
├── data.js                 Gemälde- und Ausstellungsdaten
├── gallery.js              Galerie + Lightbox-Logik
├── exhibitions.js          Ausstellungs-Rendering
├── assets/
│   └── logo.png            Logo (Ausnahme in .gitignore)
├── api/
│   └── send.js             Serverless Function (Kontaktformular)
├── INHALTE/                Rohe Bilddateien (lokal, nicht im Repo)
├── CLAUDE.md               Projektregeln für Claude Code
└── curriculum.md           Lernprotokoll: Fehler & Lösungen
```

---

## Farb-System

| Token | Hex | Verwendung |
|-------|-----|------------|
| `primary` | `#914756` | Weinrot — Buttons, Akzente |
| `secondary-fixed` | `#ffdea7` | Warmes Goldbeige — Formular-Hintergrund |
| `secondary-container` | `#fdd48d` | Gold — Hover, Highlights |
| `nav-bg` | `#77591f` | Goldbraun — Seitenhintergrund |
| `on-surface` | `#22191a` | Fast-Schwarz — Haupt-Text |
| `on-secondary-fixed` | `#271900` | Dunkelbraun — Text auf Goldbeige |
