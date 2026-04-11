# Kadence Implementierungsplan — Anne Leinen Portfolio

> Erstellt: 28.03.2026
> Status: ⚠️ ARCHIV — nicht mehr aktiv

---

> **Hinweis (April 2026):** Das Projekt wurde als **statische HTML-Website** (Tailwind CDN, Vercel Serverless Functions) umgesetzt — nicht als WordPress/Kadence-Installation. Dieser Plan dient nur noch als Referenz für das ursprüngliche Design-System und die Farb-Entscheidungen. Der aktive Tech-Stack ist in `README.md` dokumentiert.

---

---

## Übersicht

4 Seiten als separate WordPress/Kadence-Seiten:
- `index` → Portfolio / Startseite
- `artworks` → Kunstwerke
- `exhibitions` → Ausstellungen
- `contact` → Kontakt

**Gesamtaufwand:** ca. 28–47 Stunden
**Kadence Version:** Free (kein Pro nötig)
**Custom CSS:** Ja, für komplexe Layouts

---

## Phase 0 — Vorbereitung
**Aufwand:** 2–3 Std | **Schwierigkeit:** ★☆☆

- [ ] WordPress installieren
- [ ] Kadence Theme aktivieren
- [ ] Kadence Blocks Plugin installieren (kostenlos)
- [ ] WPForms Lite ODER Kadence Form Block installieren
- [ ] Smush oder ShortPixel installieren (Bildoptimierung)
- [ ] 4 leere Seiten anlegen: Portfolio, Kunstwerke, Ausstellungen, Kontakt
- [ ] Menü erstellen und alle 4 Seiten verknüpfen
- [ ] Portfolio als Startseite setzen (Settings → Reading)

---

## Phase 1 — Design-System einrichten
**Aufwand:** 2–4 Std | **Schwierigkeit:** ★☆☆
> ⚠️ IMMER ZUERST — bevor eine einzige Seite gebaut wird!

### 1.1 Farben (Appearance → Customize → Colors)

| Palette | Farbe | Verwendung |
|---|---|---|
| Palette 1 | `#77591f` | Hintergrund (Goldbraun) |
| Palette 2 | `#914756` | Primär / Buttons (Weinrot) |
| Palette 3 | `#ffdea7` | Haupttext Hell |
| Palette 4 | `#fdd48d` | Akzenttext Gold |
| Palette 5 | `#ffffff` | Weiß |
| Palette 6 | `#271900` | Dunkel / Kontrast |

### 1.2 Schriften (Appearance → Customize → Typography)

| Schrift | Verwendung | Gewicht |
|---|---|---|
| Noto Serif (Italic) | H1, H2, H3 | 400, 700 |
| Manrope | Body, Labels, Buttons | 400, 500, 600 |

### 1.3 Abstände & Borders (Appearance → Customize → Buttons)

- Border Radius überall: **0px** (keine runden Ecken!)
- Button Padding: 16px oben/unten, 32px links/rechts
- Button Farbe: Palette 2 (#914756)
- Button Text: Palette 3 (#ffdea7)

### 1.4 Globales CSS (Appearance → Customize → Additional CSS)

```css
body {
  background-color: #77591f;
  color: #ffdea7;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Noto Serif', serif;
  font-style: italic;
  color: #ffdea7;
}

p, span, label, input, textarea {
  font-family: 'Manrope', sans-serif;
}

img {
  border-radius: 0 !important;
}

.entry-content {
  max-width: 100%;
}
```

---

## Phase 2 — Navbar & Footer
**Aufwand:** 3–5 Std | **Schwierigkeit:** ★★☆

### 2.1 Navigation (Appearance → Customize → Header)

- Layout: Logo links, Menü rechts
- Hintergrund: Transparent (scrollt über Hero)
- Links Farbe: #ffdea7

**Custom CSS für Fixed Navbar mit Glaseffekt:**

```css
.site-header {
  position: fixed !important;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(119, 89, 31, 0.85) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Aktiver Menülink */
.primary-navigation .current-menu-item > a {
  text-decoration: underline;
  text-underline-offset: 4px;
  color: #ffffff !important;
}

/* Hover */
.primary-navigation a:hover {
  color: #ffffff !important;
}

/* Abstand damit Inhalt nicht unter Navbar verschwindet */
.site-main {
  padding-top: 80px;
}
```

### 2.2 Footer (Appearance → Customize → Footer)

- Hintergrund: #6b4f1b
- 3-spaltig: Logo | Copyright-Text | Links (Impressum, Datenschutz)
- Schrift: Manrope, 10px, uppercase, letter-spacing

---

## Phase 3 — Startseite (Portfolio)
**Aufwand:** 4–6 Std | **Schwierigkeit:** ★★☆

### Blöcke von oben nach unten:

- [ ] **Hero** — Kadence Cover Block
  - Großes Kunstwerk-Foto als Hintergrund
  - Overlay: rgba(119, 89, 31, 0.4)
  - H1: "Anne Leinen" (sehr groß, italic)
  - Untertitel: "Künstlerin für abstrakte Kompositionen"

- [ ] **Über mich** — Row Layout (2 Spalten, 40/60)
  - Links: Portrait-Foto (object-fit: cover)
  - Rechts: H2 + 2 Absätze + Button "Kunstwerke entdecken"
  - Sektion-Hintergrund: leicht abgedunkelt

- [ ] **Sammler-Zitate** — Row Layout (3 gleiche Spalten)
  - Jede Spalte: Icon (Anführungszeichen) + Zitat + Name
  - CSS-Klasse: `quote-card`

- [ ] **CTA-Sektion** — Row Layout, volle Breite, zentriert
  - H2 + Text + 2 Buttons (ausgefüllt + Outline)

---

## Phase 4 — Kunstwerke-Seite
**Aufwand:** 8–14 Std | **Schwierigkeit:** ★★★
> ⚠️ Schwierigste Seite — hier am meisten Zeit einplanen!

### Umgang mit 20+ Gemälden

Da es über 20 Gemälde gibt, werden diese auf zwei Ebenen verteilt:

**Startseite (Phase 3):**
- Nur 6 handverlesene Highlights anzeigen
- Button "Alle Werke ansehen" → verlinkt auf Kunstwerke-Seite

**Kunstwerke-Seite (Phase 4):**
- Alle 20+ Gemälde mit **Filterbuttons** nach Kategorie
- Empfohlene Kategorien: `Alle` | `Acryl` | `Öl` | `Mischtechnik` | nach Jahr
- Plugin: **FooGallery** (kostenlos) hat Filterbuttons eingebaut
- Bilder werden in FooGallery verwaltet → Kategorien per Tag vergeben

**Beschreibungstexte pro Gemälde:**
FooGallery speichert pro Bild:
- Titel (z.B. "Aurelia I")
- Caption (kurz: "Acryl & Blattgold, 120x120cm")
- Beschreibung (lang: Entstehungsgeschichte, Bedeutung etc.)
- Kategorie (für Filterbuttons)

**Anzeige der Beschreibung — empfohlen: Lightbox (Option A)**
- Besucher klickt auf Bild → öffnet sich groß → Beschreibung erscheint darunter
- In FooGallery eingebaut, kostenlos, funktioniert auf Mobil
- Kein Mehraufwand

**Weitere Optionen (falls gewünscht):**
- Option B: Detailseite pro Gemälde (mehr Aufwand, besser für SEO)
- Option C: Hover-Text (auf Mobil unpraktisch, nicht empfohlen)

**Für die 6 Highlights auf der Startseite:**
- Option B (Detailseite) lohnt sich hier — schöne einzelne Seite pro Highlight-Werk

**Vorteile gesamt:**
- Startseite bleibt aufgeräumt und schnell
- Kunstwerke-Seite zeigt alles, aber übersichtlich gegliedert
- Neue Gemälde einfach in FooGallery hochladen + Kategorie + Beschreibung eingeben → erscheint automatisch
- Beschreibungen pflegbar ohne Code

---

### Galerie-Ansatz wählen (einmalige Entscheidung!)

Für das asymmetrische Galerie-Grid gibt es 3 Optionen. Lies sie durch und entscheide dich **bevor** du anfängst:

---

#### Option A: Custom CSS Grid (Original-Design, eingeschränkt pflegbar)
**Aufwand:** mittel | **Pflegbarkeit:** ⚠️ Bilder tauschbar, Positionen fixiert
- Sieht exakt wie das HTML-Design aus
- Bilder können per Klick ausgetauscht werden
- Neue Bilder hinzufügen erfordert CSS-Anpassung
- Mobilansicht braucht zusätzliche @media-Regeln
- → **Empfehlung wenn Design-Treue wichtiger ist**

#### Option B: Gleichmäßiges Kadence Grid (vereinfacht, voll pflegbar)
**Aufwand:** gering | **Pflegbarkeit:** ✅ vollständig per Klick
- Alle Bilder gleich groß (z.B. 3er Grid, quadratisch)
- Bilder hinzufügen/entfernen/tauschen → alles per Klick
- Responsiv ohne extra CSS
- Sieht anders aus als das Original, aber professionell
- → **Empfehlung wenn einfache Pflege wichtiger ist**

#### Option C: FooGallery Plugin (Masonry, bester Kompromiss) ⭐ Empfohlen
**Aufwand:** gering | **Pflegbarkeit:** ✅ vollständig per Klick
- Plugin: **FooGallery** (kostenlos, wordpress.org/plugins/foogallery)
- Automatisch asymmetrisches/Masonry-Layout aus beliebig vielen Bildern
- Bilder hinzufügen, entfernen, sortieren → alles per Klick im Plugin
- Responsiv auf allen Geräten ohne extra CSS
- Looks: ähnlich asymmetrisch wie Original, aber automatisch generiert
- Installation: Plugins → Add New → "FooGallery" → Install → Activate
- → **Empfehlung für Pflegbarkeit + asymmetrisches Aussehen**

---

### Blöcke von oben nach unten:

- [ ] **Page Header** — Row Layout als Reusable Block anlegen
  - Hintergrundbild + Overlay
  - H1 "Kunstwerke" + Breadcrumb
  - ⚠️ Als Reusable Block speichern → für alle Innenseiten wiederverwenden!

- [ ] **6er Galerie-Grid** — siehe Galerie-Ansatz oben (Option A, B oder C wählen)
  - **Option A:** Row Layout + Custom CSS Grid (siehe CSS unten)
  - **Option B:** Kadence Gallery Block → Layout: Grid → Spalten: 3
  - **Option C:** FooGallery Block → Layout: Masonry → Bilder hochladen

```css
.gallery-asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
}
.gallery-asymmetric .gallery-item:first-child { grid-row: 1 / 3; }
.gallery-asymmetric img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 768px) {
  .gallery-asymmetric { grid-template-columns: 1fr 1fr; }
  .gallery-asymmetric .gallery-item:first-child { grid-row: auto; }
}
```

- [ ] **Featured-Bild mit schwebendem Textkärtchen**
  - Kadence Cover Block
  - Großes Bild als Hintergrund
  - Text-Overlay: Titel + Kurzbeschreibung
  - Alternativ: position: absolute per Custom CSS

- [ ] **2 versetzte kleinere Bilder** — Row Layout (2 Spalten, asymmetrisch)
  - CSS-Klasse: `offset-images`
  - Zweite Spalte: padding-top: 60px für Versatz-Effekt

- [ ] **Alchemie der Materialien** — Row Layout (2 Spalten)
  - Links: großes Detailfoto
  - Rechts: H2 + Zitat + nummerierte Liste (01 Gold, 02 Bronze)

- [ ] **Horizontale Scroll-Cards** — Row Layout + Custom CSS
  - CSS-Klasse Container: `horizontal-scroll-container`
  - 3 Cards mit Bild + Zitat

```css
.horizontal-scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.social-cards-row {
  display: flex;
  gap: 24px;
  min-width: max-content;
}
.social-card { width: 320px; flex-shrink: 0; }

@media (min-width: 1024px) {
  .horizontal-scroll-container { overflow-x: visible; }
  .social-cards-row { min-width: auto; display: grid; grid-template-columns: repeat(3, 1fr); }
  .social-card { width: auto; }
}
```

---

## Phase 5 — Ausstellungen-Seite
**Aufwand:** 3–5 Std | **Schwierigkeit:** ★★☆

- [ ] **Page Header** — Reusable Block einfügen, Titel anpassen
- [ ] **Ausstellung 1** — Row Layout (2 Spalten): Bild links, Text rechts
  - Badge "Vernissage" (Kadence Button, klein, #ed93a3)
  - Datum + Ort mit Icons (Kadence Icon Block)
  - RSVP-Button
- [ ] **Ausstellung 2** — Row Layout (2 Spalten umgekehrt): Text links, Bild rechts
  - "Reverse on Mobile" aktivieren!
  - Badge "Finissage"
- [ ] **Kuratoren-Zitat** — Quote Block oder Row Layout mit CSS
- [ ] **Archiv-Teaser** — Einfacher Text + Link

---

## Phase 6 — Kontakt-Seite
**Aufwand:** 3–5 Std | **Schwierigkeit:** ★☆☆

- [ ] **Page Header** — Reusable Block einfügen, Titel anpassen
- [ ] **2-spaltiges Layout** — Row Layout (55% / 45%)
  - **Linke Spalte:** Kontaktformular
    - WPForms Lite ODER Kadence Form Block
    - Felder: Name, E-Mail, Betreff, Nachricht, Senden-Button
  - **Rechte Spalte:**
    - Kadence Icon List Block (Mail, Ort, Instagram)
    - Kleines Zitat/Motto
    - Auftragsarbeiten-Box (CSS-Klasse: `commission-box`)

**CSS Formular-Felder:**
```css
.kb-form-field input,
.kb-form-field textarea {
  background: rgba(255, 222, 167, 0.08) !important;
  border: 1px solid rgba(255, 222, 167, 0.25) !important;
  border-radius: 0 !important;
  color: #ffdea7 !important;
  font-family: 'Manrope', sans-serif !important;
}
.kb-form-field label {
  font-size: 0.8rem !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  color: #fdd48d !important;
}
```

---

## Phase 7 — Feinschliff & Tests
**Aufwand:** 3–5 Std | **Schwierigkeit:** ★★☆

- [ ] Alle Bilder optimiert (max. 2000px Breite, WebP wenn möglich)
- [ ] Alle Alt-Texte ausgefüllt (SEO + Barrierefreiheit)
- [ ] Yoast SEO oder Rank Math installieren
- [ ] Meta-Titel + Beschreibungen für alle 4 Seiten
- [ ] Browser-Tests:
  - [ ] Chrome Desktop
  - [ ] Firefox Desktop
  - [ ] Safari Desktop (backdrop-filter!)
  - [ ] Chrome Mobile
  - [ ] Safari Mobile (iOS)
- [ ] Mobilansicht aller Seiten prüfen

---

## Bekannte Schwierigkeiten & Lösungen

| Problem | Lösung |
|---|---|
| `backdrop-filter` in Safari | `-webkit-backdrop-filter` Prefix → bereits im CSS oben |
| Asymmetrisches Grid | Option A (CSS), B (einfach) oder C (FooGallery) — siehe Phase 4 |
| Grid pflegbar + asymmetrisch | FooGallery Plugin (Option C) — bester Kompromiss |
| Schwebendes Textkärtchen | Kadence Cover Block als Alternative zu `position: absolute` |
| Horizontales Scrollen | `overflow-x: auto` + `min-width: max-content` per CSS |
| Buttons ohne runde Ecken | `border-radius: 0 !important` im globalen CSS |
| Mobilansicht Custom CSS Grid | Zusätzliche @media-Regeln nötig (Option A) |

---

## Empfohlene Tagesreihenfolge

```
Tag 1:  Phase 0 + Phase 1 + Phase 2  (Setup, Design, Navbar)
Tag 2:  Phase 3                       (Startseite)
Tag 3:  Phase 6                       (Kontakt — einfach, zum Üben)
Tag 4:  Phase 5                       (Ausstellungen)
Tag 5+: Phase 4                       (Kunstwerke — die meiste Zeit!)
Letzter Tag: Phase 7                  (Feinschliff & Tests)
```

---

## Nützliche Links

- Kadence Theme: https://www.kadencewp.com
- Kadence Blocks Doku: https://www.kadencewp.com/kadence-blocks/
- WPForms Lite: https://wordpress.org/plugins/wpforms-lite/
- FooGallery Plugin: https://wordpress.org/plugins/foogallery/
- Google Fonts: https://fonts.google.com (Noto Serif + Manrope)
